import { NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";

function extractJsonText(payload: any): string | null {
  const output = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (part?.type === "output_text" || part?.type === "text") {
        return part?.text ?? null;
      }
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fishName = body?.fishName;
    if (typeof fishName !== "string" || !fishName.trim()) {
      return NextResponse.json(
        { error: "fishName is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  "You are a quiz writer for children. Create 3 multiple-choice questions, each with exactly 4 options. Each question should include 3 true fun facts and 1 false fun fact about the fish, and ask which fun fact is NOT true.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Fish species: ${fishName}.`,
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "fish_quiz",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                questions: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      question: { type: "string" },
                      options: {
                        type: "array",
                        items: { type: "string" },
                        minItems: 4,
                        maxItems: 4,
                      },
                      answerIndex: { type: "integer", minimum: 0, maximum: 3 },
                    },
                    required: ["question", "options", "answerIndex"],
                  },
                },
              },
              required: ["questions"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "OpenAI API error",
          details: errorText,
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const jsonText = extractJsonText(data);
    if (!jsonText) {
      return NextResponse.json(
        { error: "Invalid OpenAI response" },
        { status: 502 }
      );
    }

    const quiz = JSON.parse(jsonText);
    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
