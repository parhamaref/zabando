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
    const { screenType = "Om Nom Skill Tree", mood = "Playful & Interactive" } = await req.json();
    const { skillTreeUiPrompt } = getPromptTemplates();

    const systemInstruction = `${skillTreeUiPrompt}
    
Current Context:
- Target Screen: ${screenType}
- Vibe / Mood: ${mood}`;

    const prompt = `Generate a child-friendly cartoon-style skill tree screen description for "${screenType}" with a "${mood}" vibe. Ensure you describe active, locked, completed, and boss nodes, cartoon-style curved paths, info panel specifications, footer buttons, and Om Nom's custom reactions. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse YAML-like raw text format based on the SkillTreeUI schema
    const lines = text.split("\n");
    let header = "";
    let nodes = "";
    let paths = "";
    let skillInfoPanel = "";
    let footer = "";
    let visualStyle = "";
    let typography = "";
    let omNomIntegration = "";

    let currentField = "";

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("SkillTreeUI:")) {
        continue;
      }

      if (trimmed.startsWith("Header:")) {
        currentField = "header";
        header = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("Nodes:")) {
        currentField = "nodes";
        nodes = trimmed.substring(6).trim();
        continue;
      }
      if (trimmed.startsWith("Paths:")) {
        currentField = "paths";
        paths = trimmed.substring(6).trim();
        continue;
      }
      if (trimmed.startsWith("SkillInfoPanel:")) {
        currentField = "skillInfoPanel";
        skillInfoPanel = trimmed.substring(15).trim();
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
      } else if (currentField === "nodes") {
        nodes += (nodes ? "\n" : "") + line;
      } else if (currentField === "paths") {
        paths += (paths ? "\n" : "") + line;
      } else if (currentField === "skillInfoPanel") {
        skillInfoPanel += (skillInfoPanel ? "\n" : "") + line;
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
        Header: header || `Title: "نقشه راه یادگیری"\nEnglish: "Learning Road Map"\nIcons: xp_orb, streak_flame, badge_medal\nOm Nom waving in top corner pointing at tree`,
        Nodes: nodes || `🟢 Active: Mint green, thick white border, float + glow animations, cheering Om Nom\n🔒 Locked: Light gray, needs more XP, curious Om Nom\n⭐ Completed: Lemon yellow, sparkles, proud Om Nom\n🔥 Boss Fight: Orange, shake + glow, excited Om Nom`,
        Paths: paths || `Description: curved paths connecting nodes\nNodes interconnected in a beautiful cartoon route.\nPaths represented: Vocabulary, Grammar, Listening, Speaking, Reading, Boss Fight`,
        SkillInfoPanel: skillInfoPanel || `Color: Soft Pink\nRounded: 24px\nTitle: "سلام و احوالپرسی" (Bebas / Iran Yekan Bold)\nDescription: "در این درس یاد میگیری سلام کنی..."\nRewards: xp_orb, streak_flame, badge_medal\nJelly Button: "شروع درس"`,
        Footer: footer || `Icons: ui_home, ui_back, ui_next, ui_settings`,
        VisualStyle: visualStyle || `Rounded corners (24px), Soft shadows (0px 4px 12px), Bright colors, Bounce buttons, Float animations`,
        Typography: typography || `English: Bebas Neue (Title), Poppins Rounded (Body)\nPersian: Iran Yekan Bold (Title), Iran Sans Regular (Body)`,
        OmNomIntegration: omNomIntegration || `Waving in header, Cheering active nodes, Curious locked nodes, Proud completed nodes, Excited boss nodes`
      }
    });
  } catch (error: any) {
    console.error("Error in generate-skilltree-ui:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Skill Tree UI description.",
    }, { status: 500 });
  }
}
