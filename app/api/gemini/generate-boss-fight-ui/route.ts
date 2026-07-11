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
    const { screenType = "Shadow Nom Boss Fight", mood = "Playful & Cinematic" } = await req.json();
    const { bossFightUiPrompt } = getPromptTemplates();

    const systemInstruction = `${bossFightUiPrompt}
    
Current Context:
- Target Boss Screen: ${screenType}
- Tone / Atmosphere: ${mood}`;

    const prompt = `Generate a cinematic, child-friendly boss fight screen description for "${screenType}" with a "${mood}" vibe. Include details for:
- Header style & Flame animations
- Boss intro card & Boss avatar description
- Three distinct battle stages (Listening, Speaking, Combo)
- Boss & Player health bar styles
- End victory/defeat layout specifications
- Footer buttons
- Om Nom's custom expressive reactions

Return the raw text in the exact YAML-like format requested. Do not wrap inside root markdown code fences. Start directly with the 'BossFightUI:' field.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse the fields
    const lines = text.split("\n");
    let header = "";
    let bossIntro = "";
    let stages = "";
    let bossHealth = "";
    let playerHealth = "";
    let endScreen = "";
    let footer = "";
    let visualStyle = "";
    let typography = "";
    let omNomIntegration = "";

    let currentField = "";

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("BossFightUI:")) {
        continue;
      }

      if (trimmed.startsWith("Header:")) {
        currentField = "header";
        header = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("BossIntro:")) {
        currentField = "bossIntro";
        bossIntro = trimmed.substring(10).trim();
        continue;
      }
      if (trimmed.startsWith("Stages:")) {
        currentField = "stages";
        stages = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("BossHealth:")) {
        currentField = "bossHealth";
        bossHealth = trimmed.substring(11).trim();
        continue;
      }
      if (trimmed.startsWith("PlayerHealth:")) {
        currentField = "playerHealth";
        playerHealth = trimmed.substring(13).trim();
        continue;
      }
      if (trimmed.startsWith("EndScreen:")) {
        currentField = "endScreen";
        endScreen = trimmed.substring(10).trim();
        continue;
      }
      if (trimmed.startsWith("Footer:")) {
        currentField = "footer";
        footer = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("VisualStyle:")) {
        currentField = "visualStyle";
        visualStyle = trimmed.substring(12).trim();
        continue;
      }
      if (trimmed.startsWith("Typography:")) {
        currentField = "typography";
        typography = trimmed.substring(11).trim();
        continue;
      }
      if (trimmed.startsWith("OmNomIntegration:")) {
        currentField = "omNomIntegration";
        omNomIntegration = trimmed.substring(17).trim();
        continue;
      }

      // Accumulate lines
      if (currentField === "header") {
        header += (header ? "\n" : "") + line;
      } else if (currentField === "bossIntro") {
        bossIntro += (bossIntro ? "\n" : "") + line;
      } else if (currentField === "stages") {
        stages += (stages ? "\n" : "") + line;
      } else if (currentField === "bossHealth") {
        bossHealth += (bossHealth ? "\n" : "") + line;
      } else if (currentField === "playerHealth") {
        playerHealth += (playerHealth ? "\n" : "") + line;
      } else if (currentField === "endScreen") {
        endScreen += (endScreen ? "\n" : "") + line;
      } else if (currentField === "footer") {
        footer += (footer ? "\n" : "") + line;
      } else if (currentField === "visualStyle") {
        visualStyle += (visualStyle ? "\n" : "") + line;
      } else if (currentField === "typography") {
        typography += (typography ? "\n" : "") + line;
      } else if (currentField === "omNomIntegration") {
        omNomIntegration += (omNomIntegration ? "\n" : "") + line;
      }
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        Header: header || `Title: "نبرد با رئیس!"\nEnglish: "Boss Battle!"\nIcons: xp_orb, streak_flame, badge_medal\nOm Nom waving in top corner pointing at tree`,
        BossIntro: bossIntro || `Avatar: Shadow Nom (Dark, cute cartoon spider with a crown)\nDescription: Defeat the spider with Persian grammar formulas!`,
        Stages: stages || `1. Listening Challenge: Listen to the Persian audio and guess the correct Ta'arof greeting.\n2. Speaking Challenge: Repeat after Om Nom!\n3. Combo: Arrange vocabulary cards into a beautiful hospitable Persian sentence.`,
        BossHealth: bossHealth || `Style: Bright red jelly health bar with custom notif_warning warning sign`,
        PlayerHealth: playerHealth || `Style: Green mint candy hearts indicator. Warning trigger when health is low.`,
        EndScreen: endScreen || `Victory: Om Nom performs a victory roll and eats the giant golden lollipop!\nDefeat: Om Nom is sad but encourages you to try again.`,
        Footer: footer || `Icons: ui_home, ui_back, ui_next, ui_settings`,
        VisualStyle: visualStyle || `Rounded corners (32px), Red/Orange fire gradients, Glow animations on active challenges`,
        Typography: typography || `English: Bebas Neue (Title), Poppins Rounded (Body)\nPersian: Iran Yekan Bold (Title), Iran Sans Regular (Body)`,
        OmNomIntegration: omNomIntegration || `Wielding a tiny wooden sword, wears a red superhero cape, reacts instantly to stage transitions!`
      }
    });
  } catch (error: any) {
    console.error("Error in generate-boss-fight-ui:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Boss Fight UI description.",
    }, { status: 500 });
  }
}
