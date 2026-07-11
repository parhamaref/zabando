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
      language = "English",
      cefr = "A1",
      accuracy = "85%",
      speed = "normal",
      streak = "5",
      xp = "320",
      weakSkills = "listening",
      strongSkills = "vocabulary",
      recentMistakes = "verb conjugations",
      streakStatus = "healthy"
    } = await req.json();

    const { adaptiveLearningPathPrompt } = getPromptTemplates();

    const systemInstruction = `${adaptiveLearningPathPrompt}
    
Current User Status Details to process:
- Learning Language: ${language}
- CEFR Level: ${cefr}
- Accuracy: ${accuracy}
- Speed: ${speed}
- Streak: ${streak}
- XP: ${xp}
- Weak Skills: ${weakSkills}
- Strong Skills: ${strongSkills}
- Recent Mistakes: ${recentMistakes}
- Streak Status: ${streakStatus}`;

    const prompt = `Generate a personalized, adaptive learning path for learning ${language} considering the user performance stats. Follow the requested output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    const sections: Record<string, string> = {};
    const lines = text.split("\n");
    let currentSection = "";
    let sectionContent = "";

    const sectionHeaders = [
      "CEFR_Level",
      "NextSkill",
      "Lessons",
      "Exercises",
      "Review",
      "Challenge",
      "Gamification"
    ];

    for (const line of lines) {
      let matched = false;
      for (const sh of sectionHeaders) {
        if (line.trim().startsWith(`${sh}:`)) {
          if (currentSection) {
            sections[currentSection] = sectionContent.trim();
          }
          currentSection = sh;
          sectionContent = line.substring(line.indexOf(":") + 1) + "\n";
          matched = true;
          break;
        }
      }
      if (!matched) {
        sectionContent += line + "\n";
      }
    }
    if (currentSection) {
      sections[currentSection] = sectionContent.trim();
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: Object.keys(sections).length > 0 ? sections : null,
    });
  } catch (error: any) {
    console.error("Error in generate-adaptive-learning-path:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Adaptive Learning Path.",
    }, { status: 500 });
  }
}
