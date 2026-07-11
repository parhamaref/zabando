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
    const { readingPrompt } = getPromptTemplates();

    const systemInstruction = `${readingPrompt}
    
Ensure the reading item is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned Reading & Comprehension item for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented ReadingItem format
    const lines = text.split("\n");
    let title = "";
    let cefrLevel = cefr;
    let readingText = "";
    let ipa = "";
    let translation = "";
    let gamification = "";
    const questions: any[] = [];
    let currentQuestion: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Text:")) {
        readingText = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("IPA:")) {
        ipa = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Translation:")) {
        translation = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Gamification:")) {
        gamification = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- Question:") || trimmed.startsWith("Question:")) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          Question: line.substring(line.indexOf(":") + 1).trim(),
          Options: "",
          CorrectAnswer: "",
          CartoonFeedback: ""
        };
      } else if (currentQuestion) {
        if (trimmed.startsWith("Options:")) {
          currentQuestion.Options = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CorrectAnswer:")) {
          currentQuestion.CorrectAnswer = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CartoonFeedback:")) {
          currentQuestion.CartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    const parsed = {
      Title: title || "Reading Comprehension Challenge",
      CEFR_Level: cefrLevel,
      Text: readingText || "Read the passage carefully.",
      IPA: ipa,
      Translation: translation,
      Questions: questions.length > 0 ? questions : null,
      Gamification: gamification || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: readingText ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-reading:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate reading content.",
    }, { status: 500 });
  }
}
