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
    const { language = "English", cefr = "A1", category = "Daily life" } = await req.json();
    const { vocabularyPrompt } = getPromptTemplates();

    const systemInstruction = `${vocabularyPrompt}
    
Ensure the vocabulary list/example is for learning: ${language}
At CEFR Level: ${cefr}
Category: ${category}`;

    const prompt = `Generate a CEFR-aligned vocabulary list item and sentences for learning ${language} at CEFR level ${cefr} (Category: ${category}). Match the exact output format requested.`;

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
      "VocabularyItem",
      "CEFR_Level",
      "Word",
      "IPA",
      "PartOfSpeech",
      "Definition",
      "Example_A1",
      "Example_A2",
      "Translation",
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
    console.error("Error in generate-vocabulary:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate vocabulary content.",
    }, { status: 500 });
  }
}
