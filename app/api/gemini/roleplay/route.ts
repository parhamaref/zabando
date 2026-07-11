import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

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
    const {
      language = "German",
      cefr = "B1",
      scenario = "Ordering Coffee",
      messages = [],
      userInput = "",
    } = body;

    const systemInstruction = `You are the core AI Roleplay Companion for Zabando.
Your task is to analyze the student's latest turn in the roleplay scenario: "${scenario}" in the language: "${language}" at CEFR level: "${cefr}".
You must return a JSON response containing two elements:
1. "feedback": A thorough check of the student's spelling, grammar, and usage.
2. "next_reply": Your natural conversational reply in ${language}, keeping the roleplay active and inviting, tailored to CEFR level ${cefr}.

The JSON response schema must strictly be:
{
  "feedback": {
    "correct": boolean, // whether the user's sentence was correct, natural, and free of major errors
    "explanation": "Clear explanation in Persian and English pointing out any errors, corrections, or why it was good.",
    "tip": "A quick educational tip or alternative way to say it in ${language} matching ${cefr} level."
  },
  "next_reply": "The AI's character response in ${language}."
}

Example scenario response for Ordering Coffee in German:
{
  "feedback": {
    "correct": false,
    "explanation": "You said 'Ich möchte ein Kaffee', but Kaffee is masculine accusative, so it should be 'einen Kaffee'.",
    "tip": "You can also say 'Ich hätte gerne einen Kaffee, bitte' to sound more polite."
  },
  "next_reply": "Alles klar! Möchten Sie auch ein Stück Kuchen dazu haben?"
}

Keep the conversations immersive, warm, and highly educational. Align the character's vocabulary and complexity strictly with the CEFR level: ${cefr}.`;

    // Format chat history for context
    const conversationContext = messages
      .map((m: any) => `${m.role === "user" ? "User" : "AI Character"}: ${m.text}`)
      .join("\n");

    const prompt = `Conversation History:\n${conversationContext}\n\nUser's latest turn to evaluate: "${userInput}"\n\nProvide the feedback and the next response as a valid JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: {
              type: Type.OBJECT,
              properties: {
                correct: { type: Type.BOOLEAN },
                explanation: { type: Type.STRING },
                tip: { type: Type.STRING },
              },
              required: ["correct", "explanation", "tip"],
            },
            next_reply: { type: Type.STRING },
          },
          required: ["feedback", "next_reply"],
        },
      },
    });

    const text = response.text || "{}";
    const result = JSON.parse(text);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error in gemini/roleplay API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate roleplay response.",
      },
      { status: 500 }
    );
  }
}
