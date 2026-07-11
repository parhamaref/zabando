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
      courseName = "English Basics for Iranian Schools", 
      cefr = "A1", 
      schoolLevel = "Middle", 
      focusSkills = "Vocabulary, Reading", 
      topics = "School, Friends, Everyday Life",
      lessonCount = 10
    } = await req.json();
    
    const { endOfCourseTestPrompt } = getPromptTemplates();

    const systemInstruction = `${endOfCourseTestPrompt}
    
Ensure the assessment covers these parameters:
- CourseName: ${courseName}
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- FocusSkills: ${focusSkills}
- Topics: ${topics}
- LessonCount: ${lessonCount}`;

    const prompt = `Generate an End-of-Course final assessment based on Course: ${courseName}, CEFR level ${cefr}, SchoolLevel ${schoolLevel}, Topics: ${topics}, and FocusSkills: ${focusSkills}. Design original, child-friendly questions. Match the requested YAML-like structure exactly.`;

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
    console.error("Error in generate-end-of-course-test:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate assessment.",
    }, { status: 500 });
  }
}
