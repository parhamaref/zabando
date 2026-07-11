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
    const { language = "English", cefr = "A1" } = await req.json();
    const { conversationPrompt } = getPromptTemplates();

    const systemInstruction = `${conversationPrompt}
    
Ensure the daily conversation is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned Daily Conversation for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented conversation format
    const lines = text.split("\n");
    let title = "";
    let cefrLevel = cefr;
    let gamification = "";
    const conversationLines: any[] = [];
    let currentLine: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Gamification:")) {
        gamification = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- Speaker:") || trimmed.startsWith("Speaker:")) {
        if (currentLine) {
          conversationLines.push(currentLine);
        }
        currentLine = {
          Speaker: line.substring(line.indexOf(":") + 1).trim(),
          Text: "",
          IPA: "",
          Translation: "",
          Emotion: "",
          CartoonFeedback: ""
        };
      } else if (currentLine) {
        if (trimmed.startsWith("Text:")) {
          currentLine.Text = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("IPA:")) {
          currentLine.IPA = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Translation:")) {
          currentLine.Translation = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Emotion:")) {
          currentLine.Emotion = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CartoonFeedback:")) {
          currentLine.CartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentLine) {
      conversationLines.push(currentLine);
    }

    const parsed = {
      Title: title || "Daily Conversation",
      CEFR_Level: cefrLevel,
      Lines: conversationLines.length > 0 ? conversationLines : null,
      Gamification: gamification || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: conversationLines.length > 0 ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-conversation:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate conversation content.",
    }, { status: 500 });
  }
}
