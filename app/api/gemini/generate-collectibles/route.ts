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
    const { category = "All Categories", rarity = "All Rarities" } = await req.json();
    const { collectiblesSystemPrompt } = getPromptTemplates();

    const systemInstruction = `${collectiblesSystemPrompt}
    
Current Context:
- Focus Category: ${category}
- Focus Rarity: ${rarity}`;

    const prompt = `Design 4 unique, highly motivating, and cute collectibles inspired by Om Nom, suited for ${category} category and ${rarity} rarity. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse the output: CollectibleItem: list of items
    const lines = text.split("\n");
    const items: Array<{ Name: string; Category: string; Rarity: string; VisualDescription: string; UnlockCondition: string; AbilityEffect: string; Icon: string; CartoonReaction: string }> = [];
    
    let currentItem: any = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("- Name:") || trimmed.startsWith("Name:")) {
        if (currentItem) items.push(currentItem);
        currentItem = { Name: trimmed.substring(trimmed.indexOf(":") + 1).trim(), Category: "", Rarity: "", VisualDescription: "", UnlockCondition: "", AbilityEffect: "", Icon: "", CartoonReaction: "" };
      } else if (currentItem) {
        if (trimmed.startsWith("Category:")) {
          currentItem.Category = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Rarity:")) {
          currentItem.Rarity = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("VisualDescription:")) {
          currentItem.VisualDescription = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("UnlockCondition:")) {
          currentItem.UnlockCondition = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("AbilityEffect:")) {
          currentItem.AbilityEffect = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Icon:")) {
          currentItem.Icon = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CartoonReaction:")) {
          currentItem.CartoonReaction = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentItem) items.push(currentItem);

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        CollectibleItems: items,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-collectibles:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate collectibles configuration.",
    }, { status: 500 });
  }
}
