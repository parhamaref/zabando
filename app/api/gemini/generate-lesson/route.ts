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
    const { language = "English", cefr = "A2", skill = "Grammar" } = await req.json();
    const { lessonPrompt } = getPromptTemplates();

    const systemInstruction = `${lessonPrompt}
    
Ensure the lesson is for learning: ${language}
At CEFR Level: ${cefr}
Specifically teaching the skill: ${skill}`;

    const prompt = `Generate a comprehensive lesson for learning ${language} at CEFR level ${cefr} (Skill: ${skill}). Match the exact output format requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse the output format into structured parts for rendering with rich cards if possible,
    // otherwise fallback to raw text. Let's do a simple parse:
    const parsed: Record<string, string> = {};
    const lines = text.split("\n");
    let currentKey = "";
    let currentVal = "";

    const keysToLook = [
      "LessonTitle",
      "CEFR_Level",
      "Skill",
      "Objective",
      "Explanation",
      "Examples",
      "Challenge",
      "Feedback",
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
    console.error("Error in generate-lesson:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate lesson.",
    }, { status: 500 });
  }
}
