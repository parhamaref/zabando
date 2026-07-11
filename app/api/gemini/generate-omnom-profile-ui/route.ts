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
    const { screenType = "Om Nom Profile", mood = "Playful & Bright" } = await req.json();
    const { omNomProfilePrompt } = getPromptTemplates();

    const systemInstruction = `${omNomProfilePrompt}
    
Current Context:
- Target Screen: ${screenType}
- Vibe / Mood: ${mood}`;

    const prompt = `Generate a child-friendly cartoon-style profile screen description for "${screenType}" with a "${mood}" vibe. Ensure you describe fonts, colors, active powers, evolution bars, stickers, achievements, footers, animations, and Om Nom's custom reactions. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse YAML-like raw text format based on the OmNomProfileUI schema
    const lines = text.split("\n");
    let header = "";
    let characterCard = "";
    let achievements = "";
    let collectibles = "";
    let customization = "";
    let footer = "";
    let visualStyle = "";
    let typography = "";
    let omNomIntegration = "";

    let currentField = "";

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("OmNomProfileUI:")) {
        continue;
      }

      if (trimmed.startsWith("Header:")) {
        currentField = "header";
        header = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("CharacterCard:")) {
        currentField = "characterCard";
        characterCard = trimmed.substring(14).trim();
        continue;
      }
      if (trimmed.startsWith("Achievements:")) {
        currentField = "achievements";
        achievements = trimmed.substring(13).trim();
        continue;
      }
      if (trimmed.startsWith("Collectibles:")) {
        currentField = "collectibles";
        collectibles = trimmed.substring(13).trim();
        continue;
      }
      if (trimmed.startsWith("Customization:")) {
        currentField = "customization";
        customization = trimmed.substring(14).trim();
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
      } else if (currentField === "characterCard") {
        characterCard += (characterCard ? "\n" : "") + line;
      } else if (currentField === "achievements") {
        achievements += (achievements ? "\n" : "") + line;
      } else if (currentField === "collectibles") {
        collectibles += (collectibles ? "\n" : "") + line;
      } else if (currentField === "customization") {
        customization += (customization ? "\n" : "") + line;
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
        Header: header || `Title: "پروفایل Om Nom"\nIcons: xp_orb, streak_flame, badge_medal\nOm Nom waving in header`,
        CharacterCard: characterCard || `Color: Mint Green\nStage: Learner Om Nom\nPowers: XP Burst, Streak Shield, Listening Radar\nEvolution progress bar active`,
        Achievements: achievements || `Title: "دستاوردهای من"\nBadges: A1 Starter Badge, Streak 7 Days, Boss Fight Winner\nOm Nom proud next to achievements`,
        Collectibles: collectibles || `Title: "آیتم‌های جمع‌آوری‌شده"\nItems: Sticker Pack 1, Grammar Token, Evolution Shard, Mini-game Badge\nOm Nom collecting items`,
        Customization: customization || `Title: "شخصی‌سازی Om Nom"\nControls: Edit Outfit, Edit Background, Face Expression, Idle Animation\nJelly Button: "ویرایش ظاهر"`,
        Footer: footer || `Icons: ui_home, ui_back, ui_next, ui_settings`,
        VisualStyle: visualStyle || `Rounded corners (32px), Soft shadows (0px 4px 12px), Bright colors, Bounce buttons, Float animations`,
        Typography: typography || `English: Bebas Neue (Title), Poppins Rounded (Body)\nPersian: Iran Yekan Bold (Title), Iran Sans Regular (Body)`,
        OmNomIntegration: omNomIntegration || `Waving in header, Proud in achievements, Collecting in items, Cheerful and responsive cartoon guide`
      }
    });
  } catch (error: any) {
    console.error("Error in generate-omnom-profile-ui:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Om Nom Profile UI description.",
    }, { status: 500 });
  }
}
