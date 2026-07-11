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
    const { theme = "Spring Festival", duration = "2 weeks" } = await req.json();
    const { seasonalEventsPrompt } = getPromptTemplates();

    const systemInstruction = `${seasonalEventsPrompt}
    
Current Context:
- Theme: ${theme}
- Duration: ${duration}`;

    const prompt = `Design a fully detailed seasonal event based on the "${theme}" theme with a duration of "${duration}". Ensure there are 3-5 themed missions, at least 3 unique collectibles, 2 mini-games, an optional boss fight description, and 3-5 exclusive rewards. Follow the output format exactly. Do not use markdown backticks in the root output; output direct raw text structured as requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const text = response.text || "";

    // Parse YAML-like raw text format
    const lines = text.split("\n");
    let eventName = "";
    let themeDescription = "";
    let eventDuration = "";
    
    const missions: Array<{ MissionName: string; Description: string }> = [];
    const collectibles: Array<{ ItemName: string; Description: string }> = [];
    const miniGames: Array<{ GameName: string; Description: string }> = [];
    const bossFight = { BossName: "", Objective: "" };
    const rewards: Array<{ RewardName: string; RewardType: string; Icon: string }> = [];

    let currentSection = ""; // "missions", "collectibles", "minigames", "bossfight", "rewards"
    let currentMission: any = null;
    let currentCollectible: any = null;
    let currentMiniGame: any = null;
    let currentReward: any = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Section detectors
      if (trimmed.startsWith("EventName:")) {
        eventName = trimmed.substring(10).trim();
        continue;
      }
      if (trimmed.startsWith("ThemeDescription:")) {
        themeDescription = trimmed.substring(17).trim();
        continue;
      }
      if (trimmed.startsWith("Duration:")) {
        eventDuration = trimmed.substring(9).trim();
        continue;
      }

      if (trimmed.toLowerCase().startsWith("missions:")) {
        currentSection = "missions";
        continue;
      }
      if (trimmed.toLowerCase().startsWith("collectibles:")) {
        currentSection = "collectibles";
        continue;
      }
      if (trimmed.toLowerCase().startsWith("minigames:")) {
        currentSection = "minigames";
        continue;
      }
      if (trimmed.toLowerCase().startsWith("bossfight:")) {
        currentSection = "bossfight";
        continue;
      }
      if (trimmed.toLowerCase().startsWith("rewards:")) {
        currentSection = "rewards";
        continue;
      }

      // Inside sections parsing
      if (currentSection === "missions") {
        if (trimmed.startsWith("- MissionName:") || trimmed.startsWith("MissionName:")) {
          if (currentMission) {
            missions.push(currentMission);
          }
          currentMission = {
            MissionName: trimmed.substring(trimmed.indexOf(":") + 1).trim(),
            Description: "",
          };
        } else if (trimmed.startsWith("Description:") && currentMission) {
          currentMission.Description = trimmed.substring(12).trim();
        }
      } else if (currentSection === "collectibles") {
        if (trimmed.startsWith("- ItemName:") || trimmed.startsWith("ItemName:")) {
          if (currentCollectible) {
            collectibles.push(currentCollectible);
          }
          currentCollectible = {
            ItemName: trimmed.substring(trimmed.indexOf(":") + 1).trim(),
            Description: "",
          };
        } else if (trimmed.startsWith("Description:") && currentCollectible) {
          currentCollectible.Description = trimmed.substring(12).trim();
        }
      } else if (currentSection === "minigames") {
        if (trimmed.startsWith("- GameName:") || trimmed.startsWith("GameName:")) {
          if (currentMiniGame) {
            miniGames.push(currentMiniGame);
          }
          currentMiniGame = {
            GameName: trimmed.substring(trimmed.indexOf(":") + 1).trim(),
            Description: "",
          };
        } else if (trimmed.startsWith("Description:") && currentMiniGame) {
          currentMiniGame.Description = trimmed.substring(12).trim();
        }
      } else if (currentSection === "bossfight") {
        if (trimmed.startsWith("BossName:")) {
          bossFight.BossName = trimmed.substring(9).trim();
        } else if (trimmed.startsWith("Objective:")) {
          bossFight.Objective = trimmed.substring(10).trim();
        }
      } else if (currentSection === "rewards") {
        if (trimmed.startsWith("- RewardName:") || trimmed.startsWith("RewardName:")) {
          if (currentReward) {
            rewards.push(currentReward);
          }
          currentReward = {
            RewardName: trimmed.substring(trimmed.indexOf(":") + 1).trim(),
            RewardType: "",
            Icon: "badge_medal",
          };
        } else if (trimmed.startsWith("RewardType:") && currentReward) {
          currentReward.RewardType = trimmed.substring(11).trim();
        } else if (trimmed.startsWith("Icon:") && currentReward) {
          currentReward.Icon = trimmed.substring(5).trim();
        }
      }
    }

    // Push the final items if any
    if (currentMission) missions.push(currentMission);
    if (currentCollectible) collectibles.push(currentCollectible);
    if (currentMiniGame) miniGames.push(currentMiniGame);
    if (currentReward) rewards.push(currentReward);

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        EventName: eventName || `جشنواره ${theme}`,
        ThemeDescription: themeDescription || "یک رویداد هیجان‌انگیز فصلی به همراه جوایز دوست‌داشتنی اوم نام.",
        Duration: eventDuration || duration,
        Missions: missions,
        Collectibles: collectibles,
        MiniGames: miniGames,
        BossFight: bossFight.BossName ? bossFight : null,
        Rewards: rewards,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-seasonal-events:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate seasonal event configuration.",
    }, { status: 500 });
  }
}
