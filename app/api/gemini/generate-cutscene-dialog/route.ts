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
    const { cutsceneType = "celebration", emotion = "excited" } = await req.json();
    const { cutsceneDialogPrompt } = getPromptTemplates();

    const systemInstruction = `${cutsceneDialogPrompt}
    
Current Request Context:
- Cutscene Type: ${cutsceneType}
- Target Primary Emotion: ${emotion}`;

    const prompt = `Generate an expressive Om Nom cutscene dialogue of type ${cutsceneType} with target primary emotion ${emotion}. Match the exact output format requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse the Title and Lines in a simple format
    const lines = text.split("\n");
    let title = "";
    const parsedLines: Array<{ speaker: string; text: string; emotion: string; cartoonFeedback: string; icon: string }> = [];
    
    let currentLine: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Title:")) {
        title = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- Speaker:") || trimmed.startsWith("Speaker:")) {
        if (currentLine) {
          parsedLines.push(currentLine);
        }
        currentLine = {
          speaker: line.substring(line.indexOf(":") + 1).trim(),
          text: "",
          emotion: "",
          cartoonFeedback: "",
          icon: ""
        };
      } else if (trimmed.startsWith("Text:") && currentLine) {
        currentLine.text = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Emotion:") && currentLine) {
        currentLine.emotion = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CartoonFeedback:") && currentLine) {
        currentLine.cartoonFeedback = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Icon:") && currentLine) {
        currentLine.icon = line.substring(line.indexOf(":") + 1).trim();
      }
    }
    if (currentLine) {
      parsedLines.push(currentLine);
    }

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        Title: title || "Om Nom Cutscene",
        Lines: parsedLines.length > 0 ? parsedLines : null
      }
    });
  } catch (error: any) {
    console.error("Error in generate-cutscene-dialog:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Cutscene Dialogue.",
    }, { status: 500 });
  }
}
