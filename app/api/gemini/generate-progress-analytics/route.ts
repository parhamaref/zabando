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
    const { 
      cefr = "A1", 
      schoolLevel = "Middle", 
      courseProgress = "65%", 
      strengths = "Vocabulary recall, basic speaking patterns",
      weaknesses = "Irregular plurals, complex spelling",
      xp = 2450,
      streak = 12,
      badges = "Vocabulary Champion, 10-Day Streak",
      behavioralMetrics = "Highly consistent, 15 mins daily time-on-task"
    } = await req.json();
    
    const { progressAnalyticsPrompt } = getPromptTemplates();

    const systemInstruction = `${progressAnalyticsPrompt}
    
Ensure the analysis covers these parameters:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- CourseProgress: ${courseProgress}
- Strengths: ${strengths}
- Weaknesses: ${weaknesses}
- XP: ${xp}, Streak: ${streak}, Badges: ${badges}
- BehavioralMetrics: ${behavioralMetrics}`;

    const prompt = `Analyze the student performance data and generate the CEFR-aligned Progress Analytics & parent report (ParentReport). 
Inputs:
- CEFRLevel: ${cefr}
- SchoolLevel: ${schoolLevel}
- CourseProgress: ${courseProgress}
- Strengths: ${strengths}
- Weaknesses: ${weaknesses}
- XP: ${xp}
- Streak: ${streak}
- Badges: ${badges}
- BehavioralMetrics: ${behavioralMetrics}

Generate output matching the requested ProgressAnalytics and ParentReport YAML-like structures exactly. Provide friendly, supportive language in Farsi for the parent report sections, maintaining a warm and professional tone. Ensure child-safe motivating messaging.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const text = response.text || "";

    return NextResponse.json({
      success: true,
      rawText: text,
      parsed: null,
    });
  } catch (error: any) {
    console.error("Error in generate-progress-analytics:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate progress analytics & parent report.",
    }, { status: 500 });
  }
}
