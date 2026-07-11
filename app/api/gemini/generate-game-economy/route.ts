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
    const { cefr = "A1", category = "All Items" } = await req.json();
    const { gameEconomyPrompt } = getPromptTemplates();

    const systemInstruction = `${gameEconomyPrompt}
    
Current Context:
- Target CEFR Level: ${cefr}
- Focus Item Category: ${category}`;

    const prompt = `Design a balanced, motivating game economy suited for ${cefr} level, specifically focusing on ${category}. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Let's write a flexible parser for the generated Game Economy content.
    const lines = text.split("\n");
    const currencies: Array<{ Name: string; Type: string; BaseValue: string; Usage: string }> = [];
    const earnableSources: Array<{ SourceName: string; BaseReward: string; Description: string }> = [];
    const spendableItems: Array<{ ItemName: string; ItemType: string; Cost: string; Ability: string; UnlockCondition: string; CartoonReaction: string; Icon: string }> = [];
    const balancingRules: string[] = [];
    const progressionScaling: Array<{ CEFR: string; Pacing: string }> = [];
    const events: Array<{ EventName: string; Bonus: string }> = [];

    let activeSection: "currencies" | "earnable" | "spendable" | "rules" | "scaling" | "events" | null = null;
    let currentCurrency: any = null;
    let currentSource: any = null;
    let currentItem: any = null;
    let currentScaling: any = null;
    let currentEvent: any = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Section markers
      if (trimmed.toLowerCase().startsWith("currencies:")) {
        activeSection = "currencies";
        continue;
      } else if (trimmed.toLowerCase().startsWith("earnablesources:")) {
        activeSection = "earnable";
        continue;
      } else if (trimmed.toLowerCase().startsWith("spendableitems:")) {
        activeSection = "spendable";
        continue;
      } else if (trimmed.toLowerCase().startsWith("balancingrules:")) {
        activeSection = "rules";
        continue;
      } else if (trimmed.toLowerCase().startsWith("progressionscaling:")) {
        activeSection = "scaling";
        continue;
      } else if (trimmed.toLowerCase().startsWith("events:")) {
        activeSection = "events";
        continue;
      }

      if (activeSection === "currencies") {
        if (trimmed.startsWith("- Name:") || trimmed.startsWith("Name:")) {
          if (currentCurrency) currencies.push(currentCurrency);
          currentCurrency = { Name: trimmed.substring(trimmed.indexOf(":") + 1).trim(), Type: "", BaseValue: "", Usage: "" };
        } else if (currentCurrency) {
          if (trimmed.startsWith("Type:")) {
            currentCurrency.Type = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("BaseValue:")) {
            currentCurrency.BaseValue = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("Usage:")) {
            currentCurrency.Usage = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          }
        }
      } else if (activeSection === "earnable") {
        if (trimmed.startsWith("- SourceName:") || trimmed.startsWith("SourceName:")) {
          if (currentSource) earnableSources.push(currentSource);
          currentSource = { SourceName: trimmed.substring(trimmed.indexOf(":") + 1).trim(), BaseReward: "", Description: "" };
        } else if (currentSource) {
          if (trimmed.startsWith("BaseReward:")) {
            currentSource.BaseReward = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("Description:")) {
            currentSource.Description = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          }
        }
      } else if (activeSection === "spendable") {
        if (trimmed.startsWith("- ItemName:") || trimmed.startsWith("ItemName:")) {
          if (currentItem) spendableItems.push(currentItem);
          currentItem = { ItemName: trimmed.substring(trimmed.indexOf(":") + 1).trim(), ItemType: "", Cost: "", Ability: "", UnlockCondition: "", CartoonReaction: "", Icon: "" };
        } else if (currentItem) {
          if (trimmed.startsWith("ItemType:")) {
            currentItem.ItemType = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("Cost:")) {
            currentItem.Cost = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("Ability:")) {
            currentItem.Ability = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("UnlockCondition:")) {
            currentItem.UnlockCondition = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("CartoonReaction:")) {
            currentItem.CartoonReaction = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          } else if (trimmed.startsWith("Icon:")) {
            currentItem.Icon = trimmed.substring(trimmed.indexOf(":") + 1).trim();
          }
        }
      } else if (activeSection === "rules") {
        if (trimmed.startsWith("- Rule:") || trimmed.startsWith("Rule:")) {
          balancingRules.push(trimmed.substring(trimmed.indexOf(":") + 1).trim());
        } else if (trimmed.startsWith("-") && trimmed.length > 2) {
          balancingRules.push(trimmed.substring(1).trim());
        }
      } else if (activeSection === "scaling") {
        if (trimmed.startsWith("- CEFR:") || trimmed.startsWith("CEFR:")) {
          if (currentScaling) progressionScaling.push(currentScaling);
          currentScaling = { CEFR: trimmed.substring(trimmed.indexOf(":") + 1).trim(), Pacing: "" };
        } else if (currentScaling && (trimmed.startsWith("Pacing:") || trimmed.startsWith("PacingDescription:"))) {
          currentScaling.Pacing = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        }
      } else if (activeSection === "events") {
        if (trimmed.startsWith("- EventName:") || trimmed.startsWith("EventName:")) {
          if (currentEvent) events.push(currentEvent);
          currentEvent = { EventName: trimmed.substring(trimmed.indexOf(":") + 1).trim(), Bonus: "" };
        } else if (currentEvent && (trimmed.startsWith("Bonus:") || trimmed.startsWith("BonusReward:"))) {
          currentEvent.Bonus = trimmed.substring(trimmed.indexOf(":") + 1).trim();
        }
      }
    }

    // Push the remaining items
    if (currentCurrency) currencies.push(currentCurrency);
    if (currentSource) earnableSources.push(currentSource);
    if (currentItem) spendableItems.push(currentItem);
    if (currentScaling) progressionScaling.push(currentScaling);
    if (currentEvent) events.push(currentEvent);

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        Currencies: currencies,
        EarnableSources: earnableSources,
        SpendableItems: spendableItems,
        BalancingRules: balancingRules,
        ProgressionScaling: progressionScaling,
        Events: events,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-game-economy:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Game Economy configuration.",
    }, { status: 500 });
  }
}
