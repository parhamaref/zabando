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
      schoolLevel = "Primary",
      score = "75",
      strengths = "Vocabulary, Grammar",
      weaknesses = "Listening, Speaking",
    } = await req.json();

    const { courseRecommendationPrompt } = getPromptTemplates();

    const systemInstruction = `${courseRecommendationPrompt}
    
Current Request Context:
- Target Language: ${language}
- User CEFR Level: ${cefr}
- School Level: ${schoolLevel}
- Placement Score: ${score}
- Strengths: ${strengths}
- Weaknesses: ${weaknesses}`;

    const prompt = `Generate a personalized course recommendation and learning path for learning ${language} considering the placement score of ${score} at CEFR level ${cefr}. Follow the requested output format exactly.`;

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
      "RecommendedTrack",
      "Courses",
      "MotivationalMessage"
    ];

    for (const line of lines) {
      let matched = false;
      for (const sh of sectionHeaders) {
        if (line.trim().startsWith(`${sh}:`) || line.trim().startsWith(`- CourseName:`)) {
          if (currentSection) {
            sections[currentSection] = sectionContent.trim();
          }
          currentSection = line.trim().startsWith(`- CourseName:`) ? "Courses" : sh;
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
    console.error("Error in generate-course-recommendation:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Course Recommendations.",
    }, { status: 500 });
  }
}
