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
    const { language = "English", cefr = "A1" } = await req.json();
    const { listeningTestPrompt } = getPromptTemplates();

    const systemInstruction = `${listeningTestPrompt}
    
Ensure the listening test is for learning: ${language}
At CEFR Level: ${cefr}`;

    const prompt = `Generate a CEFR-aligned Listening Test for learning ${language} at CEFR level ${cefr}. Follow the required output format exactly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    // Parse YAML/Indented-style block cleanly
    const lines = text.split("\n");
    let testTitle = "";
    let cefrLevel = cefr;
    let numberOfQuestions = "5";
    let difficultyCurve = "easy -> medium -> hard";
    let rewards = "";
    const questions: any[] = [];
    let currentQuestion: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("TestTitle:")) {
        testTitle = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("CEFR_Level:")) {
        cefrLevel = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("NumberOfQuestions:")) {
        numberOfQuestions = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("DifficultyCurve:")) {
        difficultyCurve = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("Rewards:")) {
        rewards = line.substring(line.indexOf(":") + 1).trim();
      } else if (trimmed.startsWith("- AudioText:") || trimmed.startsWith("AudioText:")) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          AudioText: line.substring(line.indexOf(":") + 1).trim(),
          IPA: "",
          SlowVersion: "",
          NormalVersion: "",
          QuestionType: "",
          Prompt: "",
          Options: "",
          CorrectAnswer: "",
          Feedback: ""
        };
      } else if (currentQuestion) {
        if (trimmed.startsWith("IPA:")) {
          currentQuestion.IPA = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("SlowVersion:")) {
          currentQuestion.SlowVersion = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("NormalVersion:")) {
          currentQuestion.NormalVersion = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("QuestionType:")) {
          currentQuestion.QuestionType = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Prompt:")) {
          currentQuestion.Prompt = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Options:")) {
          currentQuestion.Options = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("CorrectAnswer:")) {
          currentQuestion.CorrectAnswer = line.substring(line.indexOf(":") + 1).trim();
        } else if (trimmed.startsWith("Feedback:")) {
          currentQuestion.Feedback = line.substring(line.indexOf(":") + 1).trim();
        }
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    const parsed = {
      TestTitle: testTitle || "CEFR Listening Test Challenge",
      CEFR_Level: cefrLevel,
      NumberOfQuestions: numberOfQuestions,
      DifficultyCurve: difficultyCurve,
      Questions: questions.length > 0 ? questions : null,
      Rewards: rewards || "xp_orb, streak_flame, badge_medal"
    };

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: questions.length > 0 ? parsed : null,
    });
  } catch (error: any) {
    console.error("Error in generate-listening-test:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate listening test.",
    }, { status: 500 });
  }
}
