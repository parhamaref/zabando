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
    const { bossFightPrompt } = getPromptTemplates();

    const systemInstruction = `${bossFightPrompt}
    
Ensure the boss fight challenge is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned game-style Boss Fight Challenge for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented BossFight format
    const lines = text.split("\n");
    let bossName = "";
    let description = "";
    let cefrLevel = cefr;
    let objective = "";
    let finalBossQuestion = "";
    let rewards = "";
    const stages: any[] = [];
    let currentStage: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("BossName:")) {
        bossName = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Description:")) {
        description = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Objective:")) {
        objective = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("FinalBossQuestion:")) {
        finalBossQuestion = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- StageNumber:") || trimmed.startsWith("StageNumber:")) {
        if (currentStage) {
          stages.push(currentStage);
        }
        currentStage = {
          StageNumber: line.substring(line.indexOf(":") + 1).trim(),
          ExerciseType: "",
          Prompt: "",
          Options: "",
          CorrectAnswer: "",
          CartoonFeedback: ""
        };
      } else if (currentStage) {
        if (trimmed.startsWith("ExerciseType:")) {
          currentStage.ExerciseType = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Prompt:")) {
          currentStage.Prompt = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Options:")) {
          currentStage.Options = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CorrectAnswer:")) {
          currentStage.CorrectAnswer = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CartoonFeedback:")) {
          currentStage.CartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentStage) {
      stages.push(currentStage);
    }

    const parsed = {
      BossName: bossName || "Om Nom Boss Duel",
      Description: description,
      CEFR_Level: cefrLevel,
      Objective: objective,
      Stages: stages.length > 0 ? stages : null,
      FinalBossQuestion: finalBossQuestion,
      Rewards: rewards || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: stages.length > 0 ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-boss-fight:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate boss fight content.",
    }, { status: 500 });
  }
}
