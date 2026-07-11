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
      topic = "Daily Routines with Om Nom", 
      mode = "Both", 
      textbookStyle = "Prospect-like"
    } = await req.json();
    
    const { cartoonSpeakingListeningPrompt } = getPromptTemplates();

    const systemInstruction = `${cartoonSpeakingListeningPrompt}
    
Ensure the content is optimized for these parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- Topic: ${topic}
- Mode: ${mode}
- TextbookStyle: ${textbookStyle}`;

    const prompt = `Generate cartoon-based Speaking & Listening activities featuring Om Nom, matching the requested format. Level: ${cefr}, SchoolLevel: ${schoolLevel}, Topic: ${topic}, Mode: ${mode}, TextbookStyle: ${textbookStyle}. Output format must match the requested SpeakingListeningContent structure exactly.`;

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
    console.error("Error in generate-cartoon-speaking-listening:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate speaking and listening tasks.",
    }, { status: 500 });
  }
}
