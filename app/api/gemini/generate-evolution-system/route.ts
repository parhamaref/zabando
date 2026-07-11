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
    const { cefr = "A1", targetStage = "Stage 2: Learner Om Nom" } = await req.json();
    const { evolutionSystemPrompt } = getPromptTemplates();

    const systemInstruction = `${evolutionSystemPrompt}
    
Current Evolution Context:
- Target Stage: ${targetStage}
- Learner's current CEFR level: ${cefr}`;

    const prompt = `Generate a single stage detail for the Evolution System corresponding to: "${targetStage}" under CEFR Level ${cefr}. Follow the output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse the fields
    const lines = text.split("\n");
    let stageName = "";
    let visualDescription = "";
    let personalityTraits = "";
    let abilities = "";
    let unlockCondition = "";
    let rewards = "";
    let cutsceneIntro = "";
    let cutsceneOutro = "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("StageName:")) {
        stageName = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("VisualDescription:")) {
        visualDescription = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("PersonalityTraits:")) {
        personalityTraits = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Abilities:")) {
        abilities = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("UnlockCondition:")) {
        unlockCondition = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CutsceneIntro:")) {
        cutsceneIntro = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CutsceneOutro:")) {
        cutsceneOutro = line.substring(line.indexOf(":") + 1).trim();
      }
    }

    // Fallbacks if colon parsing missed due to nested lists or markdown formatting
    const extractField = (fieldName: string): string => {
      const regex = new RegExp(`${fieldName}:\\s*(.*)`, "i");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    if (!stageName) stageName = extractField("StageName") || targetStage;
    if (!visualDescription) visualDescription = extractField("VisualDescription");
    if (!personalityTraits) personalityTraits = extractField("PersonalityTraits");
    if (!abilities) abilities = extractField("Abilities");
    if (!unlockCondition) unlockCondition = extractField("UnlockCondition");
    if (!rewards) rewards = extractField("Rewards");
    if (!cutsceneIntro) cutsceneIntro = extractField("CutsceneIntro");
    if (!cutsceneOutro) cutsceneOutro = extractField("CutsceneOutro");

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: {
        StageName: stageName,
        VisualDescription: visualDescription,
        PersonalityTraits: personalityTraits,
        Abilities: abilities,
        UnlockCondition: unlockCondition,
        Rewards: rewards,
        CutsceneIntro: cutsceneIntro,
        CutsceneOutro: cutsceneOutro,
      }
    });
  } catch (error: any) {
    console.error("Error in generate-evolution-system:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate Evolution Stage.",
    }, { status: 500 });
  }
}
