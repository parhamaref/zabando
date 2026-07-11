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
    const { level = 1 } = await req.json();
    const { cinematicLevelUpPrompt } = getPromptTemplates();

    const systemInstruction = `${cinematicLevelUpPrompt}
    
Current Context:
- Target Level: Level ${level}`;

    const prompt = `Generate an expressive, cinematic Level-Up sequence for Level ${level}. Follow the output format exactly.`;

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
    let levelNumber = String(level);
    let cinematicTitle = "";
    let setting = "";
    let mood = "";
    let rewards = "";
    const dialog: Array<{
      Speaker: string;
      Text: string;
      Emotion: string;
      CartoonFeedback: string;
      Icon?: string;
    }> = [];

    let currentDialogItem: any = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith("LevelNumber:")) {
        levelNumber = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CinematicTitle:")) {
        cinematicTitle = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("SettingDescription:") || trimmed.startsWith("Setting:")) {
        setting = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Mood:")) {
        mood = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- Speaker:") || trimmed.startsWith("Speaker:")) {
        if (currentDialogItem) {
          dialog.push(currentDialogItem);
        }
        currentDialogItem = {
          Speaker: line.substring(line.indexOf(":") + 1).trim(),
          Text: "",
          Emotion: "",
          CartoonFeedback: "",
          Icon: "",
        };
      } else if (trimmed.startsWith("Text:") && currentDialogItem) {
        currentDialogItem.Text = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Emotion:") && currentDialogItem) {
        currentDialogItem.Emotion = line.substring(line.indexOf(":") + 1).trim();
      } else if ((trimmed.startsWith("CartoonFeedback:") || trimmed.startsWith("CartoonReaction:")) && currentDialogItem) {
        currentDialogItem.CartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Icon:") && currentDialogItem) {
        currentDialogItem.Icon = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:") && !currentDialogItem) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:") && currentDialogItem) {
        // If Rewards line was hit, we're likely done with Dialog block
        if (currentDialogItem) {
          dialog.push(currentDialogItem);
          currentDialogItem = null;
        }
        rewards = line.substring(line.indexOf(":") + 1).trim();
      }
    }

    if (currentDialogItem) {
      dialog.push(currentDialogItem);
    }

    // Fallbacks via regex if line-by-line parsing had quirks
    const extractField = (fieldName: string): string => {
      const regex = new RegExp(`${fieldName}:\\s*(.*)`, "i");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    if (!cinematicTitle) cinematicTitle = extractField("CinematicTitle");
    if (!setting) setting = extractField("SettingDescription") || extractField("Setting");
    if (!mood) mood = extractField("Mood");
    if (!rewards) rewards = extractField("Rewards");

    // Clean up empty lines or markdown formatting around fields if any
    cinematicTitle = cinematicTitle.replace(/^["']|["']$/g, "");
    setting = setting.replace(/^["']|["']$/g, "");
    mood = mood.replace(/^["']|["']$/g, "");

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        LevelNumber: levelNumber,
        CinematicTitle: cinematicTitle,
        Setting: setting,
        Mood: mood,
        Dialog: dialog,
        Rewards: rewards,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-cinematic-level-up:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Cinematic Level-Up.",
    }, { status: 500 });
  }
}
