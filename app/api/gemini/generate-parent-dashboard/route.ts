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
      schoolLevel = "Primary", 
      layoutMode = "All-in-One"
    } = await req.json();
    
    const { parentDashboardPrompt } = getPromptTemplates();

    const systemInstruction = `${parentDashboardPrompt}
    
Ensure the parent dashboard is optimized for these parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- ActiveLayoutMode: ${layoutMode}`;

    const prompt = `Generate a modern, responsive, cartoon-style Parent Dashboard UI. 
Parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- LayoutMode: ${layoutMode}

Ensure Farsi descriptions are warm, clear, and supportive, using the requested typography rules (such as Iran Yekan / Iran Sans). Match the output format ParentDashboardUI YAML structure exactly.`;

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
    console.error("Error in generate-parent-dashboard:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate parent dashboard.",
    }, { status: 500 });
  }
}
