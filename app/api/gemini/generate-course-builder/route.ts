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
      cefr = "A1", 
      schoolLevel = "Middle", 
      targetDuration = "medium", 
      focusSkills = "Listening, Speaking", 
      textbookStyle = "Prospect" 
    } = await req.json();
    
    const { courseBuilderPrompt } = getPromptTemplates();

    const systemInstruction = `${courseBuilderPrompt}
    
Ensure the course is for:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- TargetDuration: ${targetDuration}
- FocusSkills: ${focusSkills}
- TextbookStyle: ${textbookStyle}`;

    const prompt = `Generate a comprehensive Course Package package using the requested YAML-like format based on CEFR level ${cefr}, SchoolLevel ${schoolLevel}, TargetDuration ${targetDuration}, FocusSkills ${focusSkills}, and TextbookStyle ${textbookStyle}. Match the exact output format requested.`;

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
      parsed: null, // Client can render YAML/Text
    });
  } catch (error: any) {
    console.error("Error in generate-course-builder:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate course design.",
    }, { status: 500 });
  }
}
