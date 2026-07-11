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
    const { language = "English", type = "XP earned" } = await req.json();
    const { notificationPrompt } = getPromptTemplates();

    const systemInstruction = `${notificationPrompt}
    
Ensure the notification encourages learning: ${language}
Specifically for notification category: ${type}`;

    const prompt = `Generate a motivating, Om Nom-style notification of type ${type} for a student learning ${language}. Match the exact output format requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse the output format:
    const parsed: Record<string, string> = {};
    const lines = text.split("\n");
    let currentKey = "";
    let currentVal = "";

    const keysToLook = [
      "NotificationType",
      "Message",
      "Icon",
      "Emotion"
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
    console.error("Error in generate-notification:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate notification.",
    }, { status: 500 });
  }
}
