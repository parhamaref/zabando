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
    const { skillTreePrompt } = getPromptTemplates();

    const systemInstruction = `${skillTreePrompt}
    
Ensure the Skill Tree is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a full, CEFR ${cefr} aligned Skill Tree for learning ${language}. Match the exact output format requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse skills
    const skillsList: any[] = [];
    const lines = text.split("\n");
    let currentSkill: any = null;
    let inLessons = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- Skill ") || trimmed.startsWith("Skill ")) {
        if (currentSkill) {
          skillsList.push(currentSkill);
        }
        currentSkill = {
          name: "",
          objective: "",
          lessons: [],
          challenge: "",
          miniTest: "",
          badge: "",
        };
        inLessons = false;
      } else if (currentSkill) {
        if (trimmed.startsWith("SkillName:")) {
          currentSkill.name = trimmed.replace("SkillName:", "").trim();
          inLessons = false;
        } else if (trimmed.startsWith("Objective:")) {
          currentSkill.objective = trimmed.replace("Objective:", "").trim();
          inLessons = false;
        } else if (trimmed.startsWith("Lessons:")) {
          inLessons = true;
        } else if (trimmed.startsWith("Challenge:")) {
          currentSkill.challenge = trimmed.replace("Challenge:", "").trim();
          inLessons = false;
        } else if (trimmed.startsWith("MiniTest:")) {
          currentSkill.miniTest = trimmed.replace("MiniTest:", "").trim();
          inLessons = false;
        } else if (trimmed.startsWith("Badge:")) {
          currentSkill.badge = trimmed.replace("Badge:", "").trim();
          inLessons = false;
        } else if (inLessons && (trimmed.startsWith("-") || trimmed.startsWith("*"))) {
          currentSkill.lessons.push(trimmed.substring(1).trim());
        }
      }
    }

    if (currentSkill) {
      skillsList.push(currentSkill);
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: skillsList.length > 0 ? skillsList : null,
    });
  } catch (error: any) {
    console.error("Error in generate-skilltree:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate skill tree.",
    }, { status: 500 });
  }
}
