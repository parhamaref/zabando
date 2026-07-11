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
      textbookStyle = "Prospect", 
      cefr = "A1", 
      schoolLevel = "Middle", 
      topic = "Daily Routines", 
      focusSkills = "Reading & Vocabulary",
      lessonNumber = "Lesson 3"
    } = await req.json();
    
    const { lessonGeneratorPrompt } = getPromptTemplates();

    const systemInstruction = `${lessonGeneratorPrompt}
    
Ensure the lesson meets these parameters:
- TextbookStyle: ${textbookStyle}
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- Topic: ${topic}
- FocusSkills: ${focusSkills}
- LessonNumber: ${lessonNumber}`;

    const prompt = `Generate an original CEFR lesson based on textbook style ${textbookStyle}, CEFR level ${cefr}, SchoolLevel ${schoolLevel}, Topic: ${topic}, and FocusSkills: ${focusSkills}. Do not copy existing textbook pages. Output format must match the requested YAML structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: null,
    });
  } catch (error: any) {
    console.error("Error in generate-lesson-generator:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate lesson.",
    }, { status: 500 });
  }
}
