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
      streak = 5,
      accuracy = "85%",
      weakSkills = "listening",
      strongSkills = "vocabulary"
    } = await req.json();
    
    const { dailyMissionPrompt } = getPromptTemplates();

    const systemInstruction = `${dailyMissionPrompt}
    
Current User Status:
- CEFR Level: ${cefr}
- Current Streak: ${streak} days
- Recent Accuracy: ${accuracy}
- Weak Skills: ${weakSkills}
- Strong Skills: ${strongSkills}`;

    const prompt = `Generate a personalized daily mission for a student in CEFR level ${cefr} with streak ${streak} days, accuracy ${accuracy}, weak skills ${weakSkills} and strong skills ${strongSkills}. Follow the requested output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse values for easy visual display
    const lines = text.split("\n");
    let title = "";
    let objective = "";
    let steps = "";
    let estimatedTime = "";
    let rewards = "";
    let cartoonMotivation = "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Objective:")) {
        objective = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Steps:")) {
        steps = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("EstimatedTime:")) {
        estimatedTime = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CartoonMotivation:")) {
        cartoonMotivation = line.substring(line.indexOf(":") + 1).trim();
      }
    }

    // fallback check if steps are nested or multi-line
    if (!steps) {
      const stepsIdx = text.indexOf("Steps:");
      const estIdx = text.indexOf("EstimatedTime:");
      if (stepsIdx !== -1 && estIdx !== -1 && estIdx > stepsIdx) {
        steps = text.substring(stepsIdx + 6, estIdx).trim();
      }
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        Title: title || "Om Nom Daily Mission",
        CEFR_Level: cefr,
        Objective: objective,
        Steps: steps,
        EstimatedTime: estimatedTime,
        Rewards: rewards,
        CartoonMotivation: cartoonMotivation
      }
    });
  } catch (error: any) {
    console.error("Error in generate-daily-mission:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Daily Mission.",
    }, { status: 500 });
  }
}
