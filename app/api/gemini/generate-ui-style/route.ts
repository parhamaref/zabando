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
    const { screenType = "Lesson Screen", mood = "Playful & Bright" } = await req.json();
    const { uiStylePrompt } = getPromptTemplates();

    const systemInstruction = `${uiStylePrompt}
    
Current Context:
- Target Screen: ${screenType}
- Vibe / Mood: ${mood}`;

    const prompt = `Generate a child-friendly cartoon-style lesson screen description for a "${screenType}" with a "${mood}" vibe. Ensure you describe fonts, colors, glossy elements, thick borders, animations, Om Nom's custom character reaction, and use registered icons. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse YAML-like raw text format based on the LessonScreenUI schema
    const lines = text.split("\n");
    let header = "";
    let explanationCard = "";
    let examples = "";
    let exercises = "";
    let footer = "";
    let visualStyle = "";
    let typography = "";
    let omNomIntegration = "";

    let currentField = "";

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("LessonScreenUI:")) {
        continue;
      }

      if (trimmed.startsWith("Header:")) {
        currentField = "header";
        header = trimmed.substring(7).trim();
        continue;
      }
      if (trimmed.startsWith("ExplanationCard:")) {
        currentField = "explanationCard";
        explanationCard = trimmed.substring(16).trim();
        continue;
      }
      if (trimmed.startsWith("Examples:")) {
        currentField = "examples";
        examples = trimmed.substring(9).trim();
        continue;
      }
      if (trimmed.startsWith("Exercises:")) {
        currentField = "exercises";
        exercises = trimmed.substring(10).trim();
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
      } else if (currentField === "explanationCard") {
        explanationCard += (explanationCard ? "\n" : "") + line;
      } else if (currentField === "examples") {
        examples += (examples ? "\n" : "") + line;
      } else if (currentField === "exercises") {
        exercises += (exercises ? "\n" : "") + line;
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
        Header: header || `Title: "درس امروز: سلام و احوالپرسی"\nIcons: xp_orb, streak_flame, badge_medal\nOm Nom waving in corner`,
        ExplanationCard: explanationCard || `Color: Mint Green\nObjective: learn greetings and introductions\nOm Nom pointing to text`,
        Examples: examples || `Card 1: Hello!\nCard 2: My name is Sara.\nCard 3: Nice to meet you!`,
        Exercises: exercises || `Exercise 1: MCQ (Hello / Goodbye / Thanks)\nExercise 2: Speaking (Say: "Hello!")\nExercise 3: Drag & Drop`,
        Footer: footer || `Icons: ui_home, ui_back, ui_next, ui_settings`,
        VisualStyle: visualStyle || `Rounded corners (24px), Soft shadows, Bounce animations, Float effect`,
        Typography: typography || `English: Bebas Neue (Title), Poppins Rounded (Body)\nPersian: Iran Yekan Bold (Title), Iran Sans Regular (Body)`,
        OmNomIntegration: omNomIntegration || `Expressive reactions (happy, smiling, surprised, excited) next to main content`
      }
    });
  } catch (error: any) {
    console.error("Error in generate-ui-style:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate UI Style description.",
    }, { status: 500 });
  }
}
