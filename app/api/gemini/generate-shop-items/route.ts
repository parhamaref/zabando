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
    const { category = "All Categories", rotation = "daily rotation" } = await req.json();
    const { shopSystemPrompt } = getPromptTemplates();

    const systemInstruction = `${shopSystemPrompt}
    
Current Context:
- Focus Category: ${category}
- Shop Rotation: ${rotation}`;

    const prompt = `Design 4 unique and interesting shop items inspired by Om Nom, suited for the "${category}" category during a "${rotation}". Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse the output: ShopItem: list of items
    const lines = text.split("\n");
    const items: Array<{ ItemName: string; ItemType: string; Cost: string; Rarity: string; VisualDescription: string; AbilityDescription: string; Icon: string; CartoonReaction: string }> = [];
    
    let currentItem: any = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("- ItemName:") || trimmed.startsWith("ItemName:")) {
        if (currentItem) items.push(currentItem);
        currentItem = { ItemName: trimmed.substring(trimmed.indexOf(":") + 1).trim(), ItemType: "", Cost: "", Rarity: "", VisualDescription: "", AbilityDescription: "", Icon: "", CartoonReaction: "" };
      } else if (currentItem) {
        if (trimmed.startsWith("ItemType:")) {
          currentItem.ItemType = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Cost:")) {
          currentItem.Cost = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Rarity:")) {
          currentItem.Rarity = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("VisualDescription:")) {
          currentItem.VisualDescription = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("AbilityDescription:")) {
          currentItem.AbilityDescription = trimmed.substring(trimmed.indexOf(":") + 1).trim();
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
        ShopItems: items,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-shop-items:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate shop items configuration.",
    }, { status: 500 });
  }
}
