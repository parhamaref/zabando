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
    const { language = "English", cefr = "A1", audioType = "Daily conversation snippets" } = await req.json();
    const { listeningPrompt } = getPromptTemplates();

    const systemInstruction = `${listeningPrompt}
    
Ensure the listening item is for learning: ${language}
At CEFR Level: ${cefr}
Audio Type: ${audioType}`;

    const prompt = `Generate a gamified listening content / audio item for learning ${language} at CEFR level ${cefr} (Type: ${audioType}). Match the exact output format requested.`;

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
      "AudioItem",
      "CEFR_Level",
      "Text",
      "IPA",
      "SlowVersion",
      "NormalVersion",
      "Tone",
      "CartoonFeedback",
      "Gamification"
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
    console.error("Error in generate-listening:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate listening content.",
    }, { status: 500 });
  }
}
