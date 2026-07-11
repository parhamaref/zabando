import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini with the API Key and the custom headers as required
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
    const body = await req.json();
    const { language = "Spanish", cefr = "A1", skill = "vocabulary" } = body;

    const systemInstruction = `You are the content generation core of Zabando, an elite language learning system.
Generate exactly 5 different exercises for learning ${language} at CEFR level ${cefr}, focusing on the skill of ${skill}.
The output must strictly be a JSON array, with no markdown wrappers or backticks. Each element in the array must strictly match this exact JSON structure:
{
  "type": "mcq" | "translate" | "reorder" | "listening" | "roleplay",
  "question": "The instruction or prompt for the student, written in Persian or English depending on their context. E.g., 'Translate this sentence: ...' or 'Select the correct word for: ...'",
  "options": ["option A", "option B", "option C", "option D"], // Always provide 4 distinct options if the type is mcq, translate, or listening. For reorder, options should be the words to reorder (e.g. ["Apple", "is", "red"]).
  "answer": "The exact correct option or correct full answer string.",
  "difficulty": 1-5,
  "skill": "${skill}",
  "cefr": "${cefr}"
}

Ensure the exercises are educational, creative, age-appropriate, avoid political/sensitive themes, and use standard common names. Always provide high-quality distractors that are plausible but incorrect.
Keep your output clean and strictly parseable JSON.`;

    const prompt = `Generate exactly 5 exercises in ${language} at CEFR level ${cefr} for skill ${skill}. Return ONLY the raw JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                description: "Type of exercise: mcq, translate, reorder, listening, or roleplay",
              },
              question: {
                type: Type.STRING,
                description: "Question prompt text",
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of options or words to reorder",
              },
              answer: {
                type: Type.STRING,
                description: "The exact correct answer or reordered string",
              },
              difficulty: {
                type: Type.INTEGER,
                description: "Difficulty level from 1 to 5",
              },
              skill: {
                type: Type.STRING,
                description: "Skill tag",
              },
              cefr: {
                type: Type.STRING,
                description: "CEFR level",
              },
            },
            required: ["type", "question", "options", "answer", "difficulty", "skill", "cefr"],
          },
        },
      },
    });

    const text = response.text || "[]";
    const exercises = JSON.parse(text);

    return NextResponse.json({ success: true, exercises });
  } catch (error: any) {
    console.error("Error in gemini/exercise API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate exercises.",
      },
      { status: 500 }
    );
  }
}
