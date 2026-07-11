import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getPromptTemplates } from "@/lib/promptTemplates";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { language = "English", cefr = "A1", contextType = "Correct answer reaction" } = await req.json();
    const { dialogPrompt } = getPromptTemplates();

    const systemInstruction = `${dialogPrompt}
    
Ensure the dialog is for learning: ${language}
For lesson at CEFR Level: ${cefr}
Specifically for context: ${contextType}`;

    const prompt = `Generate an Om Nom cartoon dialog line for learning ${language} at CEFR level ${cefr} during context "${contextType}". Match the exact output format requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    const parsed: Record<string, string> = {};
    const lines = text.split("\n");
    let currentKey = "";
    let currentVal = "";

    const keysToLook = [
      "DialogType",
      "Emotion",
      "Message",
      "Icon"
    ];

    for (const line of lines) {
      let matched = false;
      for (const k of keysToLook) {
        if (line.trim().startsWith(`${k}:`)) {
          if (currentKey) {
            parsed[currentKey] = currentVal.trim();
          }
          currentKey = k;
          currentVal = line.substring(line.indexOf(":") + 1);
          matched = true;
          break;
        }
      }
      if (!matched && currentKey) {
        currentVal += "\n" + line;
      }
    }
    if (currentKey) {
      parsed[currentKey] = currentVal.trim();
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: Object.keys(parsed).length > 0 ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-dialog:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate dialog.",
    }, { status: 500 });
  }
}
