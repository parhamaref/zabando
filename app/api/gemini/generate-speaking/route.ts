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
    const { speakingPrompt } = getPromptTemplates();

    const systemInstruction = `${speakingPrompt}
    
Ensure the speaking item is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned Speaking and Pronunciation item for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented SpeakingItem format
    const lines = text.split("\n");
    let cefrLevel = cefr;
    let speakingText = "";
    let ipa = "";
    let slowPron = "";
    let normPron = "";
    let mouthHint = "";
    let speakingPromptVal = "";
    let cartoonFeedback = "";
    let gamification = "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Text:")) {
        speakingText = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("IPA:")) {
        ipa = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("SlowPronunciation:")) {
        slowPron = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("NormalPronunciation:")) {
        normPron = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("MouthHint:")) {
        mouthHint = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("SpeakingPrompt:")) {
        speakingPromptVal = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CartoonFeedback:")) {
        cartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Gamification:")) {
        gamification = line.substring(line.indexOf(":") + 1).trim();
      }
    }

    const parsed = {
      CEFR_Level: cefrLevel,
      Text: speakingText || "Repeat after me!",
      IPA: ipa,
      SlowPronunciation: slowPron,
      NormalPronunciation: normPron,
      MouthHint: mouthHint,
      SpeakingPrompt: speakingPromptVal,
      CartoonFeedback: cartoonFeedback,
      Gamification: gamification || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: speakingText ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-speaking:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate speaking content.",
    }, { status: 500 });
  }
}
