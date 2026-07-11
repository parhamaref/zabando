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
    const { category = "XP Powers", level = 1 } = await req.json();
    const { specialPowerPrompt } = getPromptTemplates();

    const systemInstruction = `${specialPowerPrompt}
    
Current Context:
- Requested Category: ${category}
- Power Level: Level ${level}`;

    const prompt = `Generate a unique Special Power under the category "${category}" at Level ${level}. Follow the output format exactly.`;

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
    let powerName = "";
    let parsedCategory = "";
    let visualDescription = "";
    let ability = "";
    let powerLevel = "";
    let unlockCondition = "";
    let duration = "";
    let cooldown = "";
    let rewards = "";
    let cartoonReaction = "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("PowerName:")) {
        powerName = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Category:")) {
        parsedCategory = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("VisualDescription:")) {
        visualDescription = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Ability:")) {
        ability = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("PowerLevel:")) {
        powerLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("UnlockCondition:")) {
        unlockCondition = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Duration:")) {
        duration = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Cooldown:")) {
        cooldown = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CartoonReaction:")) {
        cartoonReaction = line.substring(line.indexOf(":") + 1).trim();
      }
    }

    // Fallbacks if colon parsing missed due to markdown formatting or nesting
    const extractField = (fieldName: string): string => {
      const regex = new RegExp(`${fieldName}:\\s*(.*)`, "i");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    if (!powerName) powerName = extractField("PowerName");
    if (!parsedCategory) parsedCategory = extractField("Category") || category;
    if (!visualDescription) visualDescription = extractField("VisualDescription");
    if (!ability) ability = extractField("Ability");
    if (!powerLevel) powerLevel = extractField("PowerLevel") || String(level);
    if (!unlockCondition) unlockCondition = extractField("UnlockCondition");
    if (!duration) duration = extractField("Duration");
    if (!cooldown) cooldown = extractField("Cooldown");
    if (!rewards) rewards = extractField("Rewards");
    if (!cartoonReaction) cartoonReaction = extractField("CartoonReaction");

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        PowerName: powerName,
        Category: parsedCategory,
        VisualDescription: visualDescription,
        Ability: ability,
        PowerLevel: powerLevel,
        UnlockCondition: unlockCondition,
        Duration: duration,
        Cooldown: cooldown,
        Rewards: rewards,
        CartoonReaction: cartoonReaction,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-special-power:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Special Power.",
    }, { status: 500 });
  }
}
