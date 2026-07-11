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
    const { language = "English" } = await req.json();
    const { a1FinalExamPrompt } = getPromptTemplates();

    const systemInstruction = `${a1FinalExamPrompt}
    
Ensure the final exam is for learning: ${language}
At CEFR Level: A1`;

    const prompt = `Generate a complete CEFR A1 final exam for learning ${language} with all five sections. Follow the requested output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse Sections for easy visual rendering
    const sections: Record<string, string> = {};
    const lines = text.split("\n");
    let currentSection = "";
    let sectionContent = "";

    const sectionHeaders = [
      "Section_1_Listening",
      "Section_2_Reading",
      "Section_3_Vocabulary",
      "Section_4_Grammar",
      "Section_5_Speaking",
      "Rewards"
    ];

    for (const line of lines) {
      let matched = false;
      for (const sh of sectionHeaders) {
        if (line.trim().startsWith(`${sh}:`)) {
          if (currentSection) {
            sections[currentSection] = sectionContent.trim();
          }
          currentSection = sh;
          sectionContent = "";
          matched = true;
          break;
        }
      }
      if (!matched) {
        sectionContent += line + "\n";
      }
    }
    if (currentSection) {
      sections[currentSection] = sectionContent.trim();
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: Object.keys(sections).length > 0 ? sections : null,
    });
  } catch (error: any) {
    console.error("Error in generate-a1-final-exam:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate A1 Final Exam.",
    }, { status: 500 });
  }
}
