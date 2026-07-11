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
      layoutMode = "Tablet"
    } = await req.json();
    
    const { teacherDashboardPrompt } = getPromptTemplates();

    const systemInstruction = `${teacherDashboardPrompt}
    
Ensure the teacher dashboard & virtual classroom is optimized for these parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- ActiveLayoutMode: ${layoutMode}`;

    const prompt = `Generate a modern, responsive Teacher Dashboard & cartoon-style Virtual Classroom UI. 
Parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- LayoutMode: ${layoutMode}

Ensure the teacher dashboard is professional with clean styles, and the student-facing virtual classroom has the cartoon layout featuring Om Nom. Use Farsi titles and text gracefully. Match the requested TeacherDashboardUI output format exactly.`;

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
    console.error("Error in generate-teacher-dashboard:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate teacher dashboard.",
    }, { status: 500 });
  }
}
