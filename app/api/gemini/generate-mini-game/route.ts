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
    const { cefr = "A1", gameType = "Word Match" } = await req.json();
    const { miniGamePrompt } = getPromptTemplates();

    const systemInstruction = `${miniGamePrompt}
    
Current Request Context:
- CEFR Level: ${cefr}
- Game Type: ${gameType}`;

    const prompt = `Generate an educational mini-game of type "${gameType}" for CEFR level ${cefr}. Follow the requested output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Simple Parsing of the output block for visual rendering
    const lines = text.split("\n");
    let title = "";
    let objective = "";
    let mechanics = "";
    let rewards = "";
    const rounds: Array<{ roundNumber: string; prompt: string; options: string[]; correctAnswer: string; cartoonFeedback: string }> = [];

    let currentRound: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Objective:")) {
        objective = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Mechanics:")) {
        mechanics = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- RoundNumber:") || trimmed.startsWith("RoundNumber:")) {
        if (currentRound) {
          rounds.push(currentRound);
        }
        currentRound = {
          roundNumber: line.substring(line.indexOf(":") + 1).trim(),
          prompt: "",
          options: [],
          correctAnswer: "",
          cartoonFeedback: ""
        };
      } else if (trimmed.startsWith("Prompt:") && currentRound) {
        currentRound.prompt = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Options:") && currentRound) {
        const optsText = line.substring(line.indexOf(":") + 1).trim();
        currentRound.options = optsText.split(",").map(o => o.trim()).filter(Boolean);
      } else if (trimmed.startsWith("CorrectAnswer:") && currentRound) {
        currentRound.correctAnswer = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CartoonFeedback:") && currentRound) {
        currentRound.cartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
      }
    }
    if (currentRound) {
      rounds.push(currentRound);
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        Title: title || "Om Nom Mini-Game",
        CEFR_Level: cefr,
        Objective: objective,
        Mechanics: mechanics,
        Rounds: rounds.length > 0 ? rounds : null,
        Rewards: rewards
      }
    });
  } catch (error: any) {
    console.error("Error in generate-mini-game:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Mini-Game.",
    }, { status: 500 });
  }
}
