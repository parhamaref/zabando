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
    const {
      language = "English",
      cefr = "A1",
    } = await req.json();

    const { placementTestPrompt } = getPromptTemplates();

    const systemInstruction = `${placementTestPrompt}
    
Current Request Context:
- Target Language: ${language}
- Target CEFR Level range: up to ${cefr}`;

    const prompt = `Generate a CEFR-aligned placement test structure for school-age learners in Iran, focusing on the target language: ${language}. Align with the requested output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    const sections: Record<string, string> = {};
    const lines = text.split("\n");
    let currentSection = "";
    let sectionContent = "";

    const sectionHeaders = [
      "Sections",
      "Scoring"
    ];

    for (const line of lines) {
      let matched = false;
      for (const sh of sectionHeaders) {
        if (line.trim().startsWith(`${sh}:`) || line.trim().startsWith(`- Name:`)) {
          if (currentSection) {
            sections[currentSection] = sectionContent.trim();
          }
          currentSection = line.trim().startsWith(`- Name:`) ? "Sections" : sh;
          sectionContent = line + "\n";
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
    console.error("Error in generate-placement-test:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Placement Test design.",
    }, { status: 500 });
  }
}
