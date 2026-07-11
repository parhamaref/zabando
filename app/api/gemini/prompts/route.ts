import { NextRequest, NextResponse } from "next/server";
import { getPromptTemplates, updatePromptTemplates } from "@/lib/promptTemplates";

export async function GET() {
  return NextResponse.json(getPromptTemplates());
}

export async function POST(req: NextRequest) {
  try {
    const {
      lessonPrompt,
      exercisePrompt,
      skillTreePrompt,
      notificationPrompt,
      dialogPrompt,
      challengePrompt,
      listeningPrompt,
      vocabularyPrompt,
      listeningTestPrompt,
      conversationPrompt,
      storyPrompt,
      speakingPrompt,
      bossFightPrompt,
      readingPrompt,
      a1FinalExamPrompt,
      adaptiveLearningPathPrompt,
      cutsceneDialogPrompt,
      miniGamePrompt,
      dailyMissionPrompt,
      evolutionSystemPrompt,
      specialPowerPrompt,
      cinematicLevelUpPrompt,
      gameEconomyPrompt,
      collectiblesSystemPrompt,
      shopSystemPrompt,
      seasonalEventsPrompt,
      uiStylePrompt,
      omNomProfilePrompt,
      skillTreeUiPrompt,
      bossFightUiPrompt,
      placementTestPrompt,
      courseRecommendationPrompt,
      courseBuilderPrompt,
      lessonGeneratorPrompt,
      endOfCourseTestPrompt,
      cartoonSpeakingListeningPrompt,
      progressAnalyticsPrompt,
      parentDashboardPrompt,
      teacherDashboardPrompt
    } = await req.json();
    const updated = updatePromptTemplates({
      lessonPrompt,
      exercisePrompt,
      skillTreePrompt,
      notificationPrompt,
      dialogPrompt,
      challengePrompt,
      listeningPrompt,
      vocabularyPrompt,
      listeningTestPrompt,
      conversationPrompt,
      storyPrompt,
      speakingPrompt,
      bossFightPrompt,
      readingPrompt,
      a1FinalExamPrompt,
      adaptiveLearningPathPrompt,
      cutsceneDialogPrompt,
      miniGamePrompt,
      dailyMissionPrompt,
      evolutionSystemPrompt,
      specialPowerPrompt,
      cinematicLevelUpPrompt,
      gameEconomyPrompt,
      collectiblesSystemPrompt,
      shopSystemPrompt,
      seasonalEventsPrompt,
      uiStylePrompt,
      omNomProfilePrompt,
      skillTreeUiPrompt,
      bossFightUiPrompt,
      placementTestPrompt,
      courseRecommendationPrompt,
      courseBuilderPrompt,
      lessonGeneratorPrompt,
      endOfCourseTestPrompt,
      cartoonSpeakingListeningPrompt,
      progressAnalyticsPrompt,
      parentDashboardPrompt,
      teacherDashboardPrompt
    });
    return NextResponse.json({ success: true, ...updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
