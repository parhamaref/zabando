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
    const { storyPrompt } = getPromptTemplates();

    const systemInstruction = `${storyPrompt}
    
Ensure the short story is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned Om Nom-themed Cartoon Short Story for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented Story format
    const lines = text.split("\n");
    let title = "";
    let cefrLevel = cefr;
    let gamification = "";
    const paragraphs: any[] = [];
    let currentParagraph: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Gamification:")) {
        gamification = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- Text:") || trimmed.startsWith("Text:")) {
        if (currentParagraph) {
          paragraphs.push(currentParagraph);
        }
        currentParagraph = {
          Text: line.substring(line.indexOf(":") + 1).trim(),
          IPA: "",
          Translation: "",
          CartoonFeedback: ""
        };
      } else if (currentParagraph) {
        if (trimmed.startsWith("IPA:")) {
          currentParagraph.IPA = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Translation:")) {
          currentParagraph.Translation = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CartoonFeedback:")) {
          currentParagraph.CartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentParagraph) {
      paragraphs.push(currentParagraph);
    }

    const parsed = {
      Title: title || "Om Nom Short Story",
      CEFR_Level: cefrLevel,
      Paragraphs: paragraphs.length > 0 ? paragraphs : null,
      Gamification: gamification || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: paragraphs.length > 0 ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-story:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate cartoon story content.",
    }, { status: 500 });
  }
}
