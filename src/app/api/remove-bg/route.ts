import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const PYTHON_PATH = "/Users/sharon/Desktop/unihack_fishpedia/.venv-fish3d/bin/python";
const SCRIPT_PATH = "/Users/sharon/Desktop/unihack_fishpedia/tools/fish_id/remove_bg.py";

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

    const { stdout } = await execFileAsync(PYTHON_PATH, [SCRIPT_PATH, imagePath], {
      timeout: 120000,
      maxBuffer: 1024 * 1024,
    });

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
