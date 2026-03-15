import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { mkdtemp, writeFile, rm, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const PROJECT_PATH = process.env.PROJECT_PATH ?? process.cwd();
const FALLBACK_PYTHON = resolve(PROJECT_PATH, ".venv-fish3d", "bin", "python");
const PYTHON_PATH = process.env.FISH_PYTHON_PATH
  ? process.env.FISH_PYTHON_PATH
  : existsSync(FALLBACK_PYTHON)
    ? FALLBACK_PYTHON
    : "python3";
const SCRIPT_PATH = resolve(PROJECT_PATH, "tools", "fish_id", "remove_bg.py");

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return null;
  return { data: Buffer.from(match[2], "base64") };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dataUrl = body?.imageDataUrl;
    if (typeof dataUrl !== "string") {
      return NextResponse.json(
        { error: "imageDataUrl is required" },
        { status: 400 }
      );
    }

    const parsed = parseDataUrl(dataUrl);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const workDir = await mkdtemp(join(tmpdir(), "fish-rmbg-"));
    const imagePath = join(workDir, "input.png");
    await writeFile(imagePath, parsed.data);
    const tempRoot = join(tmpdir(), "fish-rembg-tmp");
    const u2netCache = join(PROJECT_PATH, ".cache", "u2net");
    await mkdir(tempRoot, { recursive: true });
    await mkdir(u2netCache, { recursive: true });

    let stdout = "";
    try {
      const result = await execFileAsync(PYTHON_PATH, [SCRIPT_PATH, imagePath], {
        timeout: 120000,
        maxBuffer: 1024 * 1024,
        env: {
          ...process.env,
          TMPDIR: tempRoot,
          TEMP: tempRoot,
          TMP: tempRoot,
          U2NET_HOME: u2netCache,
          ORT_CACHE_DIR: tempRoot,
        },
      });
      stdout = result.stdout;
    } catch (error: any) {
      await rm(workDir, { recursive: true, force: true });
      return NextResponse.json(
        {
          error: "remove-bg failed",
          details:
            error?.stderr ||
            error?.message ||
            "Unknown error running remove-bg",
        },
        { status: 500 }
      );
    }

    await rm(workDir, { recursive: true, force: true });

    const result = JSON.parse(stdout);
    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({
      imageDataUrl: `data:image/png;base64,${result.imageBase64}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
