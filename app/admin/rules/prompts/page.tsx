"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { GameIcon } from "@/src/components/GameIcon";
import {
  ArrowLeft,
  Sparkles,
  Settings,
  Code,
  Play,
  Save,
  Check,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Flame,
  Award,
  Book,
  Terminal,
  RefreshCw,
  Bell,
  TreeDeciduous,
  Smile,
  Zap,
  Volume2,
  BookOpenText,
  MessageSquare,
  Film,
  Coins,
  Gem,
  ShoppingBag,
  Calendar,
  Palette,
  Layers,
  TrendingUp,
  Users,
  GraduationCap,
} from "lucide-react";

type PromptTab = "lesson" | "exercise" | "skillTree" | "notification" | "dialog" | "challenge" | "listening" | "vocabulary" | "listeningTest" | "conversation" | "story" | "speaking" | "bossFight" | "reading" | "a1FinalExam" | "adaptiveLearningPath" | "cutsceneDialog" | "miniGame" | "dailyMission" | "evolutionSystem" | "specialPower" | "cinematicLevelUp" | "gameEconomy" | "collectiblesSystem" | "shopSystem" | "seasonalEvents" | "uiStyle" | "placementTest" | "courseRecommendation" | "courseBuilder" | "lessonGenerator" | "endOfCourseTest" | "cartoonSpeakingListening" | "progressAnalytics" | "parentDashboard" | "teacherDashboard";

export default function PromptsAdminPage() {
  // Prompt States
  const [lessonPrompt, setLessonPrompt] = useState("");
  const [exercisePrompt, setExercisePrompt] = useState("");
  const [skillTreePrompt, setSkillTreePrompt] = useState("");
  const [notificationPrompt, setNotificationPrompt] = useState("");
  const [dialogPrompt, setDialogPrompt] = useState("");
  const [challengePrompt, setChallengePrompt] = useState("");
  const [listeningPrompt, setListeningPrompt] = useState("");
  const [vocabularyPrompt, setVocabularyPrompt] = useState("");
  const [listeningTestPrompt, setListeningTestPrompt] = useState("");
  const [conversationPrompt, setConversationPrompt] = useState("");
  const [storyPrompt, setStoryPrompt] = useState("");
  const [speakingPrompt, setSpeakingPrompt] = useState("");
  const [bossFightPrompt, setBossFightPrompt] = useState("");
  const [readingPrompt, setReadingPrompt] = useState("");
  const [a1FinalExamPrompt, setA1FinalExamPrompt] = useState("");
  const [adaptiveLearningPathPrompt, setAdaptiveLearningPathPrompt] = useState("");
  const [cutsceneDialogPrompt, setCutsceneDialogPrompt] = useState("");
  const [miniGamePrompt, setMiniGamePrompt] = useState("");
  const [dailyMissionPrompt, setDailyMissionPrompt] = useState("");
  const [evolutionSystemPrompt, setEvolutionSystemPrompt] = useState("");
  const [specialPowerPrompt, setSpecialPowerPrompt] = useState("");
  const [cinematicLevelUpPrompt, setCinematicLevelUpPrompt] = useState("");
  const [gameEconomyPrompt, setGameEconomyPrompt] = useState("");
  const [collectiblesSystemPrompt, setCollectiblesSystemPrompt] = useState("");
  const [shopSystemPrompt, setShopSystemPrompt] = useState("");
  const [seasonalEventsPrompt, setSeasonalEventsPrompt] = useState("");
  const [uiStylePrompt, setUiStylePrompt] = useState("");
  const [placementTestPrompt, setPlacementTestPrompt] = useState("");
  const [courseRecommendationPrompt, setCourseRecommendationPrompt] = useState("");
  const [courseBuilderPrompt, setCourseBuilderPrompt] = useState("");
  const [lessonGeneratorPrompt, setLessonGeneratorPrompt] = useState("");
  const [endOfCourseTestPrompt, setEndOfCourseTestPrompt] = useState("");
  const [cartoonSpeakingListeningPrompt, setCartoonSpeakingListeningPrompt] = useState("");
  const [progressAnalyticsPrompt, setProgressAnalyticsPrompt] = useState("");
  const [parentDashboardPrompt, setParentDashboardPrompt] = useState("");
  const [teacherDashboardPrompt, setTeacherDashboardPrompt] = useState("");

  const [originalLessonPrompt, setOriginalLessonPrompt] = useState("");
  const [originalExercisePrompt, setOriginalExercisePrompt] = useState("");
  const [originalSkillTreePrompt, setOriginalSkillTreePrompt] = useState("");
  const [originalNotificationPrompt, setOriginalNotificationPrompt] = useState("");
  const [originalDialogPrompt, setOriginalDialogPrompt] = useState("");
  const [originalChallengePrompt, setOriginalChallengePrompt] = useState("");
  const [originalListeningPrompt, setOriginalListeningPrompt] = useState("");
  const [originalVocabularyPrompt, setOriginalVocabularyPrompt] = useState("");
  const [originalListeningTestPrompt, setOriginalListeningTestPrompt] = useState("");
  const [originalConversationPrompt, setOriginalConversationPrompt] = useState("");
  const [originalStoryPrompt, setOriginalStoryPrompt] = useState("");
  const [originalSpeakingPrompt, setOriginalSpeakingPrompt] = useState("");
  const [originalBossFightPrompt, setOriginalBossFightPrompt] = useState("");
  const [originalReadingPrompt, setOriginalReadingPrompt] = useState("");
  const [originalA1FinalExamPrompt, setOriginalA1FinalExamPrompt] = useState("");
  const [originalAdaptiveLearningPathPrompt, setOriginalAdaptiveLearningPathPrompt] = useState("");
  const [originalCutsceneDialogPrompt, setOriginalCutsceneDialogPrompt] = useState("");
  const [originalMiniGamePrompt, setOriginalMiniGamePrompt] = useState("");
  const [originalDailyMissionPrompt, setOriginalDailyMissionPrompt] = useState("");
  const [originalEvolutionSystemPrompt, setOriginalEvolutionSystemPrompt] = useState("");
  const [originalSpecialPowerPrompt, setOriginalSpecialPowerPrompt] = useState("");
  const [originalCinematicLevelUpPrompt, setOriginalCinematicLevelUpPrompt] = useState("");
  const [originalGameEconomyPrompt, setOriginalGameEconomyPrompt] = useState("");
  const [originalCollectiblesSystemPrompt, setOriginalCollectiblesSystemPrompt] = useState("");
  const [originalShopSystemPrompt, setOriginalShopSystemPrompt] = useState("");
  const [originalSeasonalEventsPrompt, setOriginalSeasonalEventsPrompt] = useState("");
  const [originalUiStylePrompt, setOriginalUiStylePrompt] = useState("");
  const [originalPlacementTestPrompt, setOriginalPlacementTestPrompt] = useState("");
  const [originalCourseRecommendationPrompt, setOriginalCourseRecommendationPrompt] = useState("");
  const [originalCourseBuilderPrompt, setOriginalCourseBuilderPrompt] = useState("");
  const [originalLessonGeneratorPrompt, setOriginalLessonGeneratorPrompt] = useState("");
  const [originalEndOfCourseTestPrompt, setOriginalEndOfCourseTestPrompt] = useState("");
  const [originalCartoonSpeakingListeningPrompt, setOriginalCartoonSpeakingListeningPrompt] = useState("");
  const [originalProgressAnalyticsPrompt, setOriginalProgressAnalyticsPrompt] = useState("");
  const [originalParentDashboardPrompt, setOriginalParentDashboardPrompt] = useState("");
  const [originalTeacherDashboardPrompt, setOriginalTeacherDashboardPrompt] = useState("");

  const [editorTab, setEditorTab] = useState<PromptTab>("lesson");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulator States
  const [simLanguage, setSimLanguage] = useState("English");
  const [simCefr, setSimCefr] = useState("A1");
  const [simSkill, setSimSkill] = useState("Vocabulary");
  const [simNotificationType, setSimNotificationType] = useState("XP earned");
  const [simDialogContext, setSimDialogContext] = useState("Correct answer reaction");
  const [simChallengeType, setSimChallengeType] = useState("Boss challenge (Om Nom-style)");
  const [simListeningType, setSimListeningType] = useState("Daily conversation snippets");
  const [simVocabularyCategory, setSimVocabularyCategory] = useState("Daily life");
  const [simSpecialPowerCategory, setSimSpecialPowerCategory] = useState("XP Powers");
  const [simSpecialPowerLevel, setSimSpecialPowerLevel] = useState(1);
  const [simCinematicLevelUpLevel, setSimCinematicLevelUpLevel] = useState(1);
  const [simEconomyCefr, setSimEconomyCefr] = useState("A1");
  const [simEconomyCategory, setSimEconomyCategory] = useState("All Items");
  const [simCollectibleCategory, setSimCollectibleCategory] = useState("All Categories");
  const [simCollectibleRarity, setSimCollectibleRarity] = useState("All Rarities");
  const [simShopCategory, setSimShopCategory] = useState("All Categories");
  const [simShopRotation, setSimShopRotation] = useState("daily rotation");
  const [simSeasonalTheme, setSimSeasonalTheme] = useState("Spring Festival");
  const [simSeasonalDuration, setSimSeasonalDuration] = useState("2 weeks");
  const [simUiScreenType, setSimUiScreenType] = useState("Lesson Screen");
  const [simUiMood, setSimUiMood] = useState("Playful & Bright");

  const [isGenerating, setIsGenerating] = useState(false);
  const [genType, setGenType] = useState<PromptTab | null>(null);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "raw">("visual");

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/gemini/prompts");
      const data = await res.json();
      setLessonPrompt(data.lessonPrompt || "");
      setExercisePrompt(data.exercisePrompt || "");
      setSkillTreePrompt(data.skillTreePrompt || "");
      setNotificationPrompt(data.notificationPrompt || "");
      setDialogPrompt(data.dialogPrompt || "");
      setChallengePrompt(data.challengePrompt || "");
      setListeningPrompt(data.listeningPrompt || "");
      setVocabularyPrompt(data.vocabularyPrompt || "");
      setListeningTestPrompt(data.listeningTestPrompt || "");
      setConversationPrompt(data.conversationPrompt || "");
      setStoryPrompt(data.storyPrompt || "");
      setSpeakingPrompt(data.speakingPrompt || "");
      setBossFightPrompt(data.bossFightPrompt || "");
      setReadingPrompt(data.readingPrompt || "");
      setA1FinalExamPrompt(data.a1FinalExamPrompt || "");
      setAdaptiveLearningPathPrompt(data.adaptiveLearningPathPrompt || "");
      setCutsceneDialogPrompt(data.cutsceneDialogPrompt || "");
      setMiniGamePrompt(data.miniGamePrompt || "");
      setDailyMissionPrompt(data.dailyMissionPrompt || "");
      setEvolutionSystemPrompt(data.evolutionSystemPrompt || "");
      setSpecialPowerPrompt(data.specialPowerPrompt || "");
      setCinematicLevelUpPrompt(data.cinematicLevelUpPrompt || "");
      setGameEconomyPrompt(data.gameEconomyPrompt || "");
      setCollectiblesSystemPrompt(data.collectiblesSystemPrompt || "");
      setShopSystemPrompt(data.shopSystemPrompt || "");
      setSeasonalEventsPrompt(data.seasonalEventsPrompt || "");
      setUiStylePrompt(data.uiStylePrompt || "");
      setPlacementTestPrompt(data.placementTestPrompt || "");
      setCourseRecommendationPrompt(data.courseRecommendationPrompt || "");
      setCourseBuilderPrompt(data.courseBuilderPrompt || "");
      setLessonGeneratorPrompt(data.lessonGeneratorPrompt || "");
      setEndOfCourseTestPrompt(data.endOfCourseTestPrompt || "");
      setCartoonSpeakingListeningPrompt(data.cartoonSpeakingListeningPrompt || "");
      setProgressAnalyticsPrompt(data.progressAnalyticsPrompt || "");
      setParentDashboardPrompt(data.parentDashboardPrompt || "");
      setTeacherDashboardPrompt(data.teacherDashboardPrompt || "");
 
      setOriginalLessonPrompt(data.lessonPrompt || "");
      setOriginalExercisePrompt(data.exercisePrompt || "");
      setOriginalSkillTreePrompt(data.skillTreePrompt || "");
      setOriginalNotificationPrompt(data.notificationPrompt || "");
      setOriginalDialogPrompt(data.dialogPrompt || "");
      setOriginalChallengePrompt(data.challengePrompt || "");
      setOriginalListeningPrompt(data.listeningPrompt || "");
      setOriginalVocabularyPrompt(data.vocabularyPrompt || "");
      setOriginalListeningTestPrompt(data.listeningTestPrompt || "");
      setOriginalConversationPrompt(data.conversationPrompt || "");
      setOriginalStoryPrompt(data.storyPrompt || "");
      setOriginalSpeakingPrompt(data.speakingPrompt || "");
      setOriginalBossFightPrompt(data.bossFightPrompt || "");
      setOriginalReadingPrompt(data.readingPrompt || "");
      setOriginalA1FinalExamPrompt(data.a1FinalExamPrompt || "");
      setOriginalAdaptiveLearningPathPrompt(data.adaptiveLearningPathPrompt || "");
      setOriginalCutsceneDialogPrompt(data.cutsceneDialogPrompt || "");
      setOriginalMiniGamePrompt(data.miniGamePrompt || "");
      setOriginalDailyMissionPrompt(data.dailyMissionPrompt || "");
      setOriginalEvolutionSystemPrompt(data.evolutionSystemPrompt || "");
      setOriginalSpecialPowerPrompt(data.specialPowerPrompt || "");
      setOriginalCinematicLevelUpPrompt(data.cinematicLevelUpPrompt || "");
      setOriginalGameEconomyPrompt(data.gameEconomyPrompt || "");
      setOriginalCollectiblesSystemPrompt(data.collectiblesSystemPrompt || "");
      setOriginalShopSystemPrompt(data.shopSystemPrompt || "");
      setOriginalSeasonalEventsPrompt(data.seasonalEventsPrompt || "");
      setOriginalUiStylePrompt(data.uiStylePrompt || "");
      setOriginalPlacementTestPrompt(data.placementTestPrompt || "");
      setOriginalCourseRecommendationPrompt(data.courseRecommendationPrompt || "");
      setOriginalCourseBuilderPrompt(data.courseBuilderPrompt || "");
      setOriginalLessonGeneratorPrompt(data.lessonGeneratorPrompt || "");
      setOriginalEndOfCourseTestPrompt(data.endOfCourseTestPrompt || "");
      setOriginalCartoonSpeakingListeningPrompt(data.cartoonSpeakingListeningPrompt || "");
      setOriginalProgressAnalyticsPrompt(data.progressAnalyticsPrompt || "");
      setOriginalParentDashboardPrompt(data.parentDashboardPrompt || "");
      setOriginalTeacherDashboardPrompt(data.teacherDashboardPrompt || "");
    } catch (err: any) {
      setError("Failed to fetch prompt templates.");
    }
  };
 
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/gemini/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          placementTestPrompt,
          courseRecommendationPrompt,
          courseBuilderPrompt,
          lessonGeneratorPrompt,
          endOfCourseTestPrompt,
          cartoonSpeakingListeningPrompt,
          progressAnalyticsPrompt,
          parentDashboardPrompt,
          teacherDashboardPrompt
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setOriginalLessonPrompt(lessonPrompt);
        setOriginalExercisePrompt(exercisePrompt);
        setOriginalSkillTreePrompt(skillTreePrompt);
        setOriginalNotificationPrompt(notificationPrompt);
        setOriginalDialogPrompt(dialogPrompt);
        setOriginalChallengePrompt(challengePrompt);
        setOriginalListeningPrompt(listeningPrompt);
        setOriginalVocabularyPrompt(vocabularyPrompt);
        setOriginalListeningTestPrompt(listeningTestPrompt);
        setOriginalConversationPrompt(conversationPrompt);
        setOriginalStoryPrompt(storyPrompt);
        setOriginalSpeakingPrompt(speakingPrompt);
        setOriginalBossFightPrompt(bossFightPrompt);
        setOriginalReadingPrompt(readingPrompt);
        setOriginalA1FinalExamPrompt(a1FinalExamPrompt);
        setOriginalAdaptiveLearningPathPrompt(adaptiveLearningPathPrompt);
        setOriginalCutsceneDialogPrompt(cutsceneDialogPrompt);
        setOriginalMiniGamePrompt(miniGamePrompt);
        setOriginalDailyMissionPrompt(dailyMissionPrompt);
        setOriginalEvolutionSystemPrompt(evolutionSystemPrompt);
        setOriginalSpecialPowerPrompt(specialPowerPrompt);
        setOriginalCinematicLevelUpPrompt(cinematicLevelUpPrompt);
        setOriginalGameEconomyPrompt(gameEconomyPrompt);
        setOriginalCollectiblesSystemPrompt(collectiblesSystemPrompt);
        setOriginalShopSystemPrompt(shopSystemPrompt);
        setOriginalSeasonalEventsPrompt(seasonalEventsPrompt);
        setOriginalUiStylePrompt(uiStylePrompt);
        setOriginalPlacementTestPrompt(placementTestPrompt);
        setOriginalCourseRecommendationPrompt(courseRecommendationPrompt);
        setOriginalCourseBuilderPrompt(courseBuilderPrompt);
        setOriginalLessonGeneratorPrompt(lessonGeneratorPrompt);
        setOriginalEndOfCourseTestPrompt(endOfCourseTestPrompt);
        setOriginalCartoonSpeakingListeningPrompt(cartoonSpeakingListeningPrompt);
        setOriginalProgressAnalyticsPrompt(progressAnalyticsPrompt);
        setOriginalParentDashboardPrompt(parentDashboardPrompt);
        setOriginalTeacherDashboardPrompt(teacherDashboardPrompt);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        throw new Error(data.error || "Failed to update prompts");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while saving prompts.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLessonPrompt(originalLessonPrompt);
    setExercisePrompt(originalExercisePrompt);
    setSkillTreePrompt(originalSkillTreePrompt);
    setNotificationPrompt(originalNotificationPrompt);
    setDialogPrompt(originalDialogPrompt);
    setChallengePrompt(originalChallengePrompt);
    setListeningPrompt(originalListeningPrompt);
    setVocabularyPrompt(originalVocabularyPrompt);
    setListeningTestPrompt(originalListeningTestPrompt);
    setConversationPrompt(originalConversationPrompt);
    setStoryPrompt(originalStoryPrompt);
    setSpeakingPrompt(originalSpeakingPrompt);
    setBossFightPrompt(originalBossFightPrompt);
    setReadingPrompt(originalReadingPrompt);
    setA1FinalExamPrompt(originalA1FinalExamPrompt);
    setAdaptiveLearningPathPrompt(originalAdaptiveLearningPathPrompt);
    setCutsceneDialogPrompt(originalCutsceneDialogPrompt);
    setMiniGamePrompt(originalMiniGamePrompt);
    setDailyMissionPrompt(originalDailyMissionPrompt);
    setEvolutionSystemPrompt(originalEvolutionSystemPrompt);
    setSpecialPowerPrompt(originalSpecialPowerPrompt);
    setCinematicLevelUpPrompt(originalCinematicLevelUpPrompt);
    setGameEconomyPrompt(originalGameEconomyPrompt);
    setCollectiblesSystemPrompt(originalCollectiblesSystemPrompt);
    setShopSystemPrompt(originalShopSystemPrompt);
    setSeasonalEventsPrompt(originalSeasonalEventsPrompt);
    setUiStylePrompt(originalUiStylePrompt);
    setPlacementTestPrompt(originalPlacementTestPrompt);
    setCourseRecommendationPrompt(originalCourseRecommendationPrompt);
    setCourseBuilderPrompt(originalCourseBuilderPrompt);
    setLessonGeneratorPrompt(originalLessonGeneratorPrompt);
    setEndOfCourseTestPrompt(originalEndOfCourseTestPrompt);
    setCartoonSpeakingListeningPrompt(originalCartoonSpeakingListeningPrompt);
    setProgressAnalyticsPrompt(originalProgressAnalyticsPrompt);
    setParentDashboardPrompt(originalParentDashboardPrompt);
    setTeacherDashboardPrompt(originalTeacherDashboardPrompt);
    setError(null);
  };

  const handleGenerate = async (type: PromptTab) => {
    setIsGenerating(true);
    setGenType(type);
    setGenerationResult(null);
    setError(null);

    let endpoint = "";
    let bodyPayload: any = { language: simLanguage };

    if (type === "lesson") {
      endpoint = "/api/gemini/generate-lesson";
      bodyPayload.cefr = simCefr;
      bodyPayload.skill = simSkill;
    } else if (type === "exercise") {
      endpoint = "/api/gemini/generate-exercise";
      bodyPayload.cefr = simCefr;
      bodyPayload.skill = simSkill;
    } else if (type === "skill-tree") {
      endpoint = "/api/gemini/generate-skilltree";
      bodyPayload.cefr = simCefr; // Generally A1
    } else if (type === "notification") {
      endpoint = "/api/gemini/generate-notification";
      bodyPayload.type = simNotificationType;
    } else if (type === "dialog") {
      endpoint = "/api/gemini/generate-dialog";
      bodyPayload.cefr = simCefr;
      bodyPayload.contextType = simDialogContext;
    } else if (type === "challenge") {
      endpoint = "/api/gemini/generate-challenge";
      bodyPayload.cefr = simCefr;
      bodyPayload.challengeType = simChallengeType;
    } else if (type === "listening") {
      endpoint = "/api/gemini/generate-listening";
      bodyPayload.cefr = simCefr;
      bodyPayload.audioType = simListeningType;
    } else if (type === "vocabulary") {
      endpoint = "/api/gemini/generate-vocabulary";
      bodyPayload.cefr = simCefr;
      bodyPayload.category = simVocabularyCategory;
    } else if (type === "listeningTest") {
      endpoint = "/api/gemini/generate-listening-test";
      bodyPayload.cefr = simCefr;
    } else if (type === "conversation") {
      endpoint = "/api/gemini/generate-conversation";
      bodyPayload.cefr = simCefr;
    } else if (type === "story") {
      endpoint = "/api/gemini/generate-story";
      bodyPayload.cefr = simCefr;
    } else if (type === "speaking") {
      endpoint = "/api/gemini/generate-speaking";
      bodyPayload.cefr = simCefr;
    } else if (type === "bossFight") {
      endpoint = "/api/gemini/generate-boss-fight";
      bodyPayload.cefr = simCefr;
    } else if (type === "reading") {
      endpoint = "/api/gemini/generate-reading";
      bodyPayload.cefr = simCefr;
    } else if (type === "a1FinalExam") {
      endpoint = "/api/gemini/generate-a1-final-exam";
    } else if (type === "adaptiveLearningPath") {
      endpoint = "/api/gemini/generate-adaptive-learning-path";
      bodyPayload.cefr = simCefr;
    } else if (type === "cutsceneDialog") {
      endpoint = "/api/gemini/generate-cutscene-dialog";
    } else if (type === "miniGame") {
      endpoint = "/api/gemini/generate-mini-game";
      bodyPayload.cefr = simCefr;
      bodyPayload.gameType = "Word Match";
    } else if (type === "dailyMission") {
      endpoint = "/api/gemini/generate-daily-mission";
      bodyPayload.cefr = simCefr;
      bodyPayload.streak = 5;
      bodyPayload.accuracy = "85%";
      bodyPayload.weakSkills = "listening";
      bodyPayload.strongSkills = "vocabulary";
    } else if (type === "evolutionSystem") {
      endpoint = "/api/gemini/generate-evolution-system";
      bodyPayload.cefr = simCefr;
      bodyPayload.targetStage = "Stage 2: Learner Om Nom";
    } else if (type === "specialPower") {
      endpoint = "/api/gemini/generate-special-power";
      bodyPayload.category = simSpecialPowerCategory;
      bodyPayload.level = simSpecialPowerLevel;
    } else if (type === "cinematicLevelUp") {
      endpoint = "/api/gemini/generate-cinematic-level-up";
      bodyPayload.level = simCinematicLevelUpLevel;
    } else if (type === "gameEconomy") {
      endpoint = "/api/gemini/generate-game-economy";
      bodyPayload.cefr = simEconomyCefr;
      bodyPayload.category = simEconomyCategory;
    } else if (type === "collectiblesSystem") {
      endpoint = "/api/gemini/generate-collectibles";
      bodyPayload.category = simCollectibleCategory;
      bodyPayload.rarity = simCollectibleRarity;
    } else if (type === "shopSystem") {
      endpoint = "/api/gemini/generate-shop-items";
      bodyPayload.category = simShopCategory;
      bodyPayload.rotation = simShopRotation;
    } else if (type === "seasonalEvents") {
      endpoint = "/api/gemini/generate-seasonal-events";
      bodyPayload.theme = simSeasonalTheme;
      bodyPayload.duration = simSeasonalDuration;
    } else if (type === "uiStyle") {
      endpoint = "/api/gemini/generate-ui-style";
      bodyPayload.screenType = simUiScreenType;
      bodyPayload.mood = simUiMood;
    } else if (type === "placementTest") {
      endpoint = "/api/gemini/generate-placement-test";
      bodyPayload.cefr = simCefr;
    } else if (type === "courseRecommendation") {
      endpoint = "/api/gemini/generate-course-recommendation";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = simCefr === "A1" ? "Primary" : simCefr === "A2" ? "Middle" : "High";
    } else if (type === "courseBuilder") {
      endpoint = "/api/gemini/generate-course-builder";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.targetDuration = "medium";
      bodyPayload.focusSkills = "Listening, Speaking";
      bodyPayload.textbookStyle = "Prospect";
    } else if (type === "lessonGenerator") {
      endpoint = "/api/gemini/generate-lesson-generator";
      bodyPayload.textbookStyle = "Prospect";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.topic = "Daily Routines";
      bodyPayload.focusSkills = "Reading & Vocabulary";
      bodyPayload.lessonNumber = "Lesson 3";
    } else if (type === "endOfCourseTest") {
      endpoint = "/api/gemini/generate-end-of-course-test";
      bodyPayload.courseName = "English Basics for Iranian Schools";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.focusSkills = "Vocabulary, Reading";
      bodyPayload.topics = "School, Friends, Everyday Life";
      bodyPayload.lessonCount = 10;
    } else if (type === "cartoonSpeakingListening") {
      endpoint = "/api/gemini/generate-cartoon-speaking-listening";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.topic = "Daily Routines with Om Nom";
      bodyPayload.mode = "Both";
      bodyPayload.textbookStyle = "Prospect-like";
    } else if (type === "progressAnalytics") {
      endpoint = "/api/gemini/generate-progress-analytics";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.courseProgress = "75%";
      bodyPayload.strengths = "Excellent listening retention, enthusiastic speaking pronunciation";
      bodyPayload.weaknesses = "Spelling errors in writing, hesitance during readings";
      bodyPayload.xp = 3200;
      bodyPayload.streak = 15;
      bodyPayload.badges = "Speech Hero, Super Consistent";
      bodyPayload.behavioralMetrics = "Consistent study routine, stays on task";
    } else if (type === "parentDashboard") {
      endpoint = "/api/gemini/generate-parent-dashboard";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Primary";
      bodyPayload.layoutMode = "All-in-One";
    } else if (type === "teacherDashboard") {
      endpoint = "/api/gemini/generate-teacher-dashboard";
      bodyPayload.cefr = simCefr;
      bodyPayload.schoolLevel = "Middle";
      bodyPayload.layoutMode = "Tablet";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });
      const data = await res.json();
      if (data.success) {
        setGenerationResult(data);
      } else {
        throw new Error(data.error || "Failed to generate content.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during AI content generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#3C3C3C] pb-24" dir="rtl">
      {/* Top Banner & Navigation */}
      <div className="bg-white border-b-2 border-[#E5E5E5] px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/rules">
            <button className="flex items-center gap-1 text-xs font-black text-gray-500 hover:text-gray-700 bg-gray-100 border-2 border-transparent hover:border-gray-300 px-3.5 py-2 rounded-xl transition-all">
              <ArrowLeft className="w-3.5 h-3.5 ml-1" />
              بازگشت به پنل قوانین
            </button>
          </Link>
          <div className="h-6 w-0.5 bg-[#E5E5E5] hidden sm:block" />
          <div>
            <h1 className="font-display font-black text-lg text-[#3C3C3C] flex items-center gap-2">
              مرکز مدیریت پرامپت‌ها و هوش مصنوعی <GameIcon name="rule_book" size={24} className="inline-block" />
            </h1>
            <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">
              مهندسی پرامپت‌های تولید درس، تمرین، درخت مهارت و نوتیفیکیشن‌های گیمیفیکیشن
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-black text-[#777777] hover:text-gray-900 bg-[#F3F4F6] border-2 border-[#E5E5E5] px-4 py-2.5 rounded-xl transition-all active:translate-y-[1px]"
          >
            <RefreshCw className="w-4 h-4 ml-1" />
            ریست تغییرات
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
          >
            {isSaving ? (
              <span className="flex items-center gap-1">در حال ذخیره...</span>
            ) : (
              <>
                <Save className="w-4 h-4 ml-1" />
                ذخیره قالب پرامپت‌ها
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* RIGHT COLUMN: Prompt Editors with beautiful Tabs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Notifications/Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </motion.div>
            )}

            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#E5F9E5] border-2 border-[#58CC02] text-[#3B8A01] px-4 py-3 rounded-2xl flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-[#58CC02] flex-shrink-0" />
                <span className="text-xs font-bold">تمام قالب‌های پرامپت با موفقیت به روز رسانی شدند!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Selection */}
          <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl p-2 flex gap-1 overflow-x-auto">
            <button
              onClick={() => setEditorTab("lesson")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "lesson"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 ml-1" />
              تولید درس (Lesson)
            </button>
            <button
              onClick={() => setEditorTab("exercise")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "exercise"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Code className="w-4 h-4 ml-1" />
              تولید تمرین (Exercise)
            </button>
            <button
              onClick={() => setEditorTab("skillTree")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "skillTree"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TreeDeciduous className="w-4 h-4 ml-1" />
              درخت مهارت (Skill Tree)
            </button>
            <button
              onClick={() => setEditorTab("notification")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "notification"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bell className="w-4 h-4 ml-1" />
              اعلان‌ها (Notifications)
            </button>
            <button
              onClick={() => setEditorTab("dialog")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "dialog"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Smile className="w-4 h-4 ml-1" />
              دیالوگ‌های اوم نام (Dialog)
            </button>
            <button
              onClick={() => setEditorTab("challenge")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "challenge"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Award className="w-4 h-4 ml-1" />
              آزمون‌ها و چالش‌ها (Challenge)
            </button>
            <button
              onClick={() => setEditorTab("listening")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "listening"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Volume2 className="w-4 h-4 ml-1" />
              محتوای صوتی و شنیداری (Listening)
            </button>
            <button
              onClick={() => setEditorTab("vocabulary")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "vocabulary"
                  ? "bg-orange-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpenText className="w-4 h-4 ml-1" />
              واژگان و جملات A1-A2 (Vocabulary)
            </button>
            <button
              onClick={() => setEditorTab("listeningTest")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "listeningTest"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Volume2 className="w-4 h-4 ml-1" />
              آزمون‌های شنیداری (Listening Tests)
            </button>
            <button
              onClick={() => setEditorTab("conversation")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "conversation"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4 ml-1" />
              مکالمه‌های روزمره (Conversations)
            </button>
            <button
              onClick={() => setEditorTab("story")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "story"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 ml-1" />
              داستان‌های کوتاه (Short Stories)
            </button>
            <button
              onClick={() => setEditorTab("speaking")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "speaking"
                  ? "bg-pink-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Volume2 className="w-4 h-4 ml-1" />
              تلفظ و گفتار (Speaking)
            </button>
            <button
              onClick={() => setEditorTab("bossFight")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "bossFight"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Award className="w-4 h-4 ml-1" />
              چالش Boss Fight
            </button>
            <button
              onClick={() => setEditorTab("reading")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "reading"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpenText className="w-4 h-4 ml-1" />
              درک مطلب (Reading)
            </button>
            <button
              onClick={() => setEditorTab("a1FinalExam")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "a1FinalExam"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Award className="w-4 h-4 ml-1" />
              آزمون نهایی A1 (A1 Final Exam)
            </button>
            <button
              onClick={() => setEditorTab("adaptiveLearningPath")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "adaptiveLearningPath"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Zap className="w-4 h-4 ml-1" />
              مسیر یادگیری انطباقی (Adaptive Path)
            </button>
            <button
              onClick={() => setEditorTab("cutsceneDialog")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "cutsceneDialog"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Smile className="w-4 h-4 ml-1" />
              دیالوگ‌های Cutscene (Cutscene Dialogs)
            </button>
            <button
              onClick={() => setEditorTab("miniGame")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "miniGame"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Code className="w-4 h-4 ml-1" />
              مینی‌گیم‌ها (Mini-Games)
            </button>
            <button
              onClick={() => setEditorTab("dailyMission")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "dailyMission"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Award className="w-4 h-4 ml-1" />
              ماموریت‌های روزانه (Daily Missions)
            </button>
            <button
              onClick={() => setEditorTab("evolutionSystem")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "evolutionSystem"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Zap className="w-4 h-4 ml-1" />
              سیستم تکامل اوم نام (Evolution System)
            </button>
            <button
              onClick={() => setEditorTab("specialPower")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "specialPower"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Flame className="w-4 h-4 ml-1" />
              سیستم قدرت‌های ویژه (Special Powers)
            </button>
            <button
              onClick={() => setEditorTab("cinematicLevelUp")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "cinematicLevelUp"
                  ? "bg-fuchsia-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Film className="w-4 h-4 ml-1" />
              سطوح سینماتیک ارتقا (Cinematic Level-Up)
            </button>
            <button
              onClick={() => setEditorTab("gameEconomy")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "gameEconomy"
                  ? "bg-[#FFC000] text-[#3C3C3C] shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Coins className="w-4 h-4 ml-1" />
              اقتصاد بازی (Game Economy)
            </button>
            <button
              onClick={() => setEditorTab("collectiblesSystem")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "collectiblesSystem"
                  ? "bg-[#FF5757] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Gem className="w-4 h-4 ml-1" />
              سیستم کالکتیبل‌ها (Collectibles System)
            </button>
             <button
              onClick={() => setEditorTab("shopSystem")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "shopSystem"
                  ? "bg-[#10B981] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="w-4 h-4 ml-1" />
              سیستم فروشگاه (Shop System)
            </button>
            <button
              onClick={() => setEditorTab("seasonalEvents")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "seasonalEvents"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Calendar className="w-4 h-4 ml-1" />
              رویدادهای فصلی (Seasonal Events)
            </button>
            <button
              onClick={() => setEditorTab("uiStyle")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "uiStyle"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Palette className="w-4 h-4 ml-1" />
              استایل رابط کاربری (UI Style)
            </button>
            <button
              onClick={() => setEditorTab("placementTest")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "placementTest"
                  ? "bg-[#FF5757] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HelpCircle className="w-4 h-4 ml-1" />
              آزمون تعیین سطح (Placement Test)
            </button>
            <button
              onClick={() => setEditorTab("courseRecommendation")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "courseRecommendation"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Book className="w-4 h-4 ml-1" />
              پیشنهاد مسیر آموزشی (Course Recommendation)
            </button>
            <button
              onClick={() => setEditorTab("courseBuilder")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "courseBuilder"
                  ? "bg-[#10B981] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 ml-1" />
              طراحی دوره‌ آموزشی (Course Builder)
            </button>
            <button
              onClick={() => setEditorTab("lessonGenerator")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "lessonGenerator"
                  ? "bg-[#FFC000] text-[#3C3C3C] shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Layers className="w-4 h-4 ml-1" />
              تولید کننده درس (Lesson Generator)
            </button>
            <button
              onClick={() => setEditorTab("endOfCourseTest")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "endOfCourseTest"
                  ? "bg-[#FF5757] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HelpCircle className="w-4 h-4 ml-1" />
              آزمون پایان دوره (End-of-Course Test)
            </button>
            <button
              onClick={() => setEditorTab("cartoonSpeakingListening")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "cartoonSpeakingListening"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Film className="w-4 h-4 ml-1" />
              اسپیکینگ و لیسنینگ کارتونی (Cartoon Speaking)
            </button>
            <button
              onClick={() => setEditorTab("progressAnalytics")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "progressAnalytics"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-4 h-4 ml-1" />
              گزارش به والدین و تحلیل پیشرفت (Progress Analytics)
            </button>
            <button
              onClick={() => setEditorTab("parentDashboard")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "parentDashboard"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users className="w-4 h-4 ml-1" />
              داشبورد والدین (Parent Dashboard)
            </button>
            <button
              onClick={() => setEditorTab("teacherDashboard")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-black text-xs transition-all whitespace-nowrap ${
                editorTab === "teacherDashboard"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <GraduationCap className="w-4 h-4 ml-1" />
              داشبورد معلم و کلاس مجازی (Teacher Dashboard)
            </button>
          </div>

          {/* Active Editor Pane */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-4">
            {editorTab === "lesson" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-100 border-2 border-purple-300 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید درس (Lesson Generator Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">ساختار تولید محتوای آموزشی خرد و تعاملی CEFR</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">LESSON_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-purple-400 transition-all leading-relaxed"
                  value={lessonPrompt}
                  onChange={(e) => setLessonPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>این پرامپت فیلدهای عنوان، هدف، توضیح صمیمی، مثال‌های کوتاه و چالشهای کارتونی را مهندسی می‌کند.</span>
                </div>
              </div>
            )}

            {editorTab === "exercise" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید تمرین (Exercise Generator Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">فرمول‌بندی انواع سوالات تستی، ترجمه، صوتی و پرکردن جای‌خالی</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">EXERCISE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={exercisePrompt}
                  onChange={(e) => setExercisePrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>برای سناریوهای Om Nom، بازخورد درست/نادرست کارتونی و تخصیص امتیازات xp_orb تعبیه شده است.</span>
                </div>
              </div>
            )}

            {editorTab === "skillTree" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <TreeDeciduous className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت درخت مهارت سطح A1 (Skill Tree Generator)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید ساختار درختی کامل دوره‌های مقدماتی زبان با گیمیفیکیشن</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">SKILLTREE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-emerald-400 transition-all leading-relaxed"
                  value={skillTreePrompt}
                  onChange={(e) => setSkillTreePrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>این پرامپت ۸ الی ۱۲ مهارت را برای کل دوره A1 به همراه اهداف، دروس، چالش، مینی تست و نشان طراحی می‌کند.</span>
                </div>
              </div>
            )}

            {editorTab === "notification" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-cyan-100 border-2 border-cyan-300 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید نوتیفیکیشن (Notification Generator)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">پیام‌های انگیزشی هوشمند، یادآورهای تکرار متباعد و چالش‌های روزانه</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded-full font-bold">NOTIF_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-cyan-400 transition-all leading-relaxed"
                  value={notificationPrompt}
                  onChange={(e) => setNotificationPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>پیام‌های خنده‌دار کارتونی با شخصیت Om Nom و معرفی آیکون‌هایی مانند streak_flame و xp_orb.</span>
                </div>
              </div>
            )}

            {editorTab === "dialog" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-rose-100 border-2 border-rose-300 rounded-xl flex items-center justify-center">
                      <Smile className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید دیالوگ‌های اوم نام (Om Nom Dialog Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">دیالوگ‌های بامزه، کوتاه، انگیزشی و واکنش‌های گیمیفیکیشن</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">OM_NOM_DIALOG_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-rose-400 transition-all leading-relaxed"
                  value={dialogPrompt}
                  onChange={(e) => setDialogPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی بازخوردهای متناظر با احساسات خوشحال، هیجان‌زده، غافلگیرشده و افتخار برای تشویق زبان‌آموز.</span>
                </div>
              </div>
            )}

            {editorTab === "challenge" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-indigo-100 border-2 border-indigo-300 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید چالش‌ها و مینی‌تست‌ها (Challenge Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید آزمون‌های زمان‌بندی شده، مبارزات باس اوم‌نام و بسته‌های آزمون CEFR</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">CHALLENGE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-indigo-400 transition-all leading-relaxed"
                  value={challengePrompt}
                  onChange={(e) => setChallengePrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی شیب سختی آزمون به کمک موتور قوانین و اعطای xp_orb، streak_flame و badge_medal.</span>
                </div>
              </div>
            )}

            {editorTab === "listening" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-100 border-2 border-purple-300 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تولید محتوای صوتی و شنیداری (Listening Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید تلفظ واژگان، عبارات کوتاه، گفتگوهای روزمره و پاداش‌های صوتی با استانداردهای CEFR</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">LISTENING_AUDIO_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-purple-400 transition-all leading-relaxed"
                  value={listeningPrompt}
                  onChange={(e) => setListeningPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید محتوای شنیداری با تفکیک تلفظ کند و معمولی و احساسات صوتی خوشحال، طبیعی و هیجان‌زده.</span>
                </div>
              </div>
            )}

            {editorTab === "vocabulary" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-orange-100 border-2 border-orange-300 rounded-xl flex items-center justify-center">
                      <BookOpenText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت واژگان و جملات سطح A1–A2 (Vocabulary Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید واژه‌نامه‌های گیمیفای شده، ترنسکریپشن IPA، تعاریف ساده و جفت جملات A1/A2 همراه با بازخورد کارتونی</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-bold">VOCAB_SENTENCE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-orange-400 transition-all leading-relaxed"
                  value={vocabularyPrompt}
                  onChange={(e) => setVocabularyPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>دسته‌بندی واژگان بر اساس موضوعات زندگی روزمره، غذا، خانواده، خرید و احساسات با پاداش‌های xp_orb و streak_flame.</span>
                </div>
              </div>
            )}

            {editorTab === "listeningTest" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-violet-100 border-2 border-violet-300 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت آزمون‌های شنیداری (Listening Tests Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید مجموعه‌سوالات آزمون شنیداری، شیب سختی و انواع سوالات تستی و جای خالی</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5 rounded-full font-bold">LISTENING_TEST_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-violet-400 transition-all leading-relaxed"
                  value={listeningTestPrompt}
                  onChange={(e) => setListeningTestPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید خودکار آزمون‌های شنیداری متمرکز بر گیمیفیکیشن، تلفظ کند و معمولی به همراه کلیدهای پاسخ و توضیحات زنده.</span>
                </div>
              </div>
            )}

            {editorTab === "conversation" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-teal-100 border-2 border-teal-300 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت مکالمه‌های روزمره (Daily Conversations Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی دیالوگ‌های دونفره تعاملی بین زبان‌آموز و کاراکترهای کارتونی اوم‌نام با راهنمای IPA</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-bold">CONVERSATION_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-teal-400 transition-all leading-relaxed"
                  value={conversationPrompt}
                  onChange={(e) => setConversationPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید سناریوهای صوتی دونفره به همراه احساسات صوتی، ترنسکریپت صوتی و ری‌اکشن‌های انیمیشنی اوم‌نام.</span>
                </div>
              </div>
            )}

            {editorTab === "story" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت داستان‌های کوتاه اوم نام (Short Stories Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید داستان‌های کوتاه کارتونی و جذاب برای تقویت مهارت‌های خواندن و شنیدن زبان‌آموزان</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">STORY_MODE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-emerald-400 transition-all leading-relaxed"
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>روایت ماجراجویی‌های اوم‌نام با ساختار گام‌به‌گام و ری‌اکشن‌های عاطفی و جوایز badge_medal و xp_orb.</span>
                </div>
              </div>
            )}

            {editorTab === "speaking" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-pink-100 border-2 border-pink-300 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت تلفظ و گفتار (Speaking & Pronunciation Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید محتوای تمرینی تلفظ کلمات، ترنسکریپت IPA، راهنمای حرکتی لب و پاداش‌های گیمیفیکیشن</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded-full font-bold">SPEAKING_PRONUNCIATION_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-pink-400 transition-all leading-relaxed"
                  value={speakingPrompt}
                  onChange={(e) => setSpeakingPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید آیتم‌های صوتی تمرینی به همراه راهنمای تصویری حرکت لب و پاداش‌های xp_orb و streak_flame.</span>
                </div>
              </div>
            )}

            {editorTab === "bossFight" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-red-100 border-2 border-red-300 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت چالش‌های Boss Fight اوم نام (Boss Fight Challenges Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید چالش‌های سخت‌تر چندمرحله‌ای، نجات اوم‌نام، بازی‌های زمان‌دار و ترجمه گیمیفای شده</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold">BOSS_CHALLENGE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-red-400 transition-all leading-relaxed"
                  value={bossFightPrompt}
                  onChange={(e) => setBossFightPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی باس فایت‌های تعاملی و مینی‌تست‌های نجات با ساختار ۳ الی ۵ مرحله‌ای و نشان‌های ویژه.</span>
                </div>
              </div>
            )}

            {editorTab === "reading" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-sky-100 border-2 border-sky-300 rounded-xl flex items-center justify-center">
                      <BookOpenText className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت درک مطلب و خواندن (Reading & Comprehension Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید متون توصیفی کوتاه، مینی‌داستان‌های روزمره، سوالات درک مطلب و گیمیفیکیشن</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold">READING_COMPREHENSION_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-sky-400 transition-all leading-relaxed"
                  value={readingPrompt}
                  onChange={(e) => setReadingPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی متون خواندنی کوتاه همراه با ترجمه موازی، سوالات ارزیابی چندگزینه‌ای و جوایز و آیکون‌های گیمیفیکیشن.</span>
                </div>
              </div>
            )}

            {editorTab === "a1FinalExam" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-indigo-100 border-2 border-indigo-300 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت آزمون نهایی سطح A1 (A1 Final Exam Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید آزمون جامع پایانی سطح A1 شامل شنیداری، خوانداری، واژگان، گرامر و گفتار</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">FINAL_EXAM_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-indigo-400 transition-all leading-relaxed"
                  value={a1FinalExamPrompt}
                  onChange={(e) => setA1FinalExamPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید آزمون جامع پایان‌بخش به همراه پاداش‌های xp_orb، streak_flame و نشان ویژه badge_medal.</span>
                </div>
              </div>
            )}

            {editorTab === "adaptiveLearningPath" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت مسیر یادگیری انطباقی (Adaptive Learning Path Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید مسیر یادگیری شخصی‌سازی شده بر اساس سطح عملکرد، نقاط ضعف، سرعت و شادابی استریک</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">ADAPTIVE_PATH_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={adaptiveLearningPathPrompt}
                  onChange={(e) => setAdaptiveLearningPathPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی مسیر پیشرفت پویای کاربر با ارائه دروس، تمرینات، مرورها، و پاداش‌های انگیزشی.</span>
                </div>
              </div>
            )}

            {editorTab === "cutsceneDialog" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-teal-100 border-2 border-teal-300 rounded-xl flex items-center justify-center">
                      <Smile className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت دیالوگ‌های Cutscene اوم نام (Cutscene Dialogues Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید کات‌سین‌ها و دیالوگ‌های داستانی، پرتحرک و گیمیفای شده شخصیت کارتونی اوم‌نام</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-bold">CUTSCENE_DIALOGUE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-teal-400 transition-all leading-relaxed"
                  value={cutsceneDialogPrompt}
                  onChange={(e) => setCutsceneDialogPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید مکالمات پرعاطفه و پرانرژی اوم نام با احساسات چندگانه شاد، شگفت‌زده، غمگین، یا حماسی.</span>
                </div>
              </div>
            )}

            {editorTab === "miniGame" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت مینی‌گیم‌های تعاملی اوم نام (Mini-Games Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید مینی‌گیم‌های هیجان‌انگیز گیمیفای شده مانند مرتب‌سازی کلمات، جورچین‌ها و پاداش‌ها</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">MINI_GAME_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-emerald-400 transition-all leading-relaxed"
                  value={miniGamePrompt}
                  onChange={(e) => setMiniGamePrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید چالش‌های مینی‌گیم چندمرحله‌ای برای ارزیابی سریع و خلاقانه زبان‌آموز.</span>
                </div>
              </div>
            )}

            {editorTab === "dailyMission" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-100 border-2 border-purple-300 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت ماموریت‌های روزانه شخصی‌سازی شده (Daily Missions Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید ماموریت‌های پویای شخصی‌ساز روزانه بر اساس استریک، دقت و نقاط ضعف کاربر</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">DAILY_MISSION_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-purple-400 transition-all leading-relaxed"
                  value={dailyMissionPrompt}
                  onChange={(e) => setDailyMissionPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی هوشمند ماموریت با گام‌های مشخص و پاداش‌های xp_orb و streak_flame جهت افزایش نگهداشت کاربر.</span>
                </div>
              </div>
            )}

            {editorTab === "evolutionSystem" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم تکامل چندمرحله‌ای اوم نام (Evolution System Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید مراحل پویای ارتقا و تکامل شخصیت کارتونی بر اساس دستاوردها و تریگرهای آموزشی</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">EVOLUTION_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={evolutionSystemPrompt}
                  onChange={(e) => setEvolutionSystemPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید سناریوی تکامل، ویژگی‌ها، جوایز xp_orb و دیالوگ‌های داستانی شاد و هیجان‌انگیز اوم‌نام.</span>
                </div>
              </div>
            )}

            {editorTab === "specialPower" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-rose-100 border-2 border-rose-300 rounded-xl flex items-center justify-center">
                      <Flame className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم قدرت‌های ویژه اوم نام (Special Powers Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید سیستم قدرت‌های ویژه و پاداش‌های چندسطحی اوم نام بر اساس دستاوردهای آموزشی کاربر</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">POWER_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-rose-400 transition-all leading-relaxed"
                  value={specialPowerPrompt}
                  onChange={(e) => setSpecialPowerPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید جزئیات قدرت، سطح، شرایط بازگشایی، زمان ماندگاری، کول‌دان و پاداش‌های فانتزی xp_orb و streak_flame.</span>
                </div>
              </div>
            )}

            {editorTab === "cinematicLevelUp" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-fuchsia-100 border-2 border-fuchsia-300 rounded-xl flex items-center justify-center">
                      <Film className="w-5 h-5 text-fuchsia-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سطوح سینماتیک ارتقا اوم نام (Cinematic Level-Up Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید سناریوهای داستانی کارتونی جذاب ارتقای سطح، دیالوگ‌ها، محیط و جوایز</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 px-2 py-0.5 rounded-full font-bold">LEVELUP_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-fuchsia-400 transition-all leading-relaxed"
                  value={cinematicLevelUpPrompt}
                  onChange={(e) => setCinematicLevelUpPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید سناریوی کامل ارتقای سطح، محیط کارتونی، دیالوگ‌های پر از احساس، عکس‌العمل‌های شاد اوم‌نام و پاداش‌ها.</span>
                </div>
              </div>
            )}

            {editorTab === "gameEconomy" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Coins className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت اقتصاد بازی اوم نام (Game Economy Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی اقتصاد بازی متوازن، پاداش‌ها، آیتم‌های خریدنی، ارزهای بازی و مکانیسم‌های یادگیری بر اساس سطح CEFR</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">ECONOMY_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={gameEconomyPrompt}
                  onChange={(e) => setGameEconomyPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تعیین متغیرهای ارزهای نرم و سخت، آیتم‌های فروشگاهی، واکنش‌های شاد اوم‌نام به خرید، قوانین تعادل و پاداش‌های فانتزی xp_orb و streak_flame.</span>
                </div>
              </div>
            )}

            {editorTab === "collectiblesSystem" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-rose-100 border-2 border-rose-300 rounded-xl flex items-center justify-center">
                      <Gem className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم کالکتیبل‌ها اوم نام (Collectibles System Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی آیتم‌های جمع‌کردنی (collectibles) الهام‌گرفته از اوم‌نام برای ایجاد انگیزه در فراگیران</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">COLLECTIBLES_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-rose-400 transition-all leading-relaxed"
                  value={collectiblesSystemPrompt}
                  onChange={(e) => setCollectiblesSystemPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تعیین دسته‌بندی‌های کارت‌های واژگان، نشان‌های بازی، شاردها، قوانین شانس، راه‌های کسب و تعاملات دوست‌داشتنی و کارتونی اوم‌نام.</span>
                </div>
              </div>
            )}

            {editorTab === "shopSystem" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم فروشگاه اوم نام (Shop System Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی فروشگاه چرخشی، آیتم‌های تزیینی، بوسترها و نیروهای ویژه الهام‌گرفته از اوم‌نام</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">SHOP_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-emerald-400 transition-all leading-relaxed"
                  value={shopSystemPrompt}
                  onChange={(e) => setShopSystemPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تعیین دسته‌بندی‌ها، قوانین قیمت‌گذاری با سکه یا جم، بوسترهای پیشرفت، واکنش‌های طنز اوم‌نام به خرید هر دسته از کالاها و الگوهای تکرارشونده.</span>
                </div>
              </div>
            )}

            {editorTab === "seasonalEvents" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم رویدادهای فصلی اوم نام (Seasonal Events Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی چالش‌ها، رویدادها، ماموریت‌های محدود فصلی و جوایز ویژه الهام‌گرفته از اوم‌نام</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">SEASONAL_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={seasonalEventsPrompt}
                  onChange={(e) => setSeasonalEventsPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تعیین تم‌ها (بهار، تابستان، پاییز، زمستان، تفریحات تولد اوم نام)، ماموریت‌های محدود، جوایز انحصاری با آیکون‌های xp_orb، streak_flame و badge_medal.</span>
                </div>
              </div>
            )}

            {editorTab === "uiStyle" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-sky-100 border-2 border-sky-300 rounded-xl flex items-center justify-center">
                      <Palette className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت هوش مصنوعی طراح استایل رابط کاربری (UI Style Generator Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی استایل کارتونی، رنگ‌های پاستلی و پرجنب‌وجوش، گوشه‌های گرد، دکمه‌های ژله‌ای بانس و تلفیق واکنش‌های اوم‌نام در رابط کاربری</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold">UI_STYLE_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-sky-400 transition-all leading-relaxed"
                  value={uiStylePrompt}
                  onChange={(e) => setUiStylePrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید استایل بر اساس فونت‌های Bebas Neue، Nunito و ایران یکان با دکمه‌های ژله‌ای، پالت پاستلی فانتزی و واکنش‌های شاد و هیجان‌زده کاراکتر اوم‌نام.</span>
                </div>
              </div>
            )}

            {editorTab === "placementTest" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#FFECEC] border-2 border-[#FFC5C5] rounded-xl flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-[#FF5757]" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت طراحی آزمون تعیین‌سطح (Placement Test Generator Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی سوالات آزمون تعیین‌سطح هماهنگ با CEFR و کتاب‌های درسی مدارس ایران با سناریوهای جذاب کودکانه</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold">PLACEMENT_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-red-400 transition-all leading-relaxed"
                  value={placementTestPrompt}
                  onChange={(e) => setPlacementTestPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید خودکار سناریوهای آزمون با بازخورد گیمیفیکیشن نظیر xp_orb، streak_flame و جوایز انحصاری برای کودک.</span>
                </div>
              </div>
            )}

            {editorTab === "courseRecommendation" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-100 border-2 border-purple-300 rounded-xl flex items-center justify-center">
                      <Book className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت سیستم پیشنهاد مسیر یادگیری (Course Recommendation Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تحلیل نمرات آزمون کودک و پیشنهاد بسته‌های آموزشی شخصی‌سازی شده به همراه مسیر ارتقای مهارت‌های ضعیف</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">RECOMMENDER_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-purple-400 transition-all leading-relaxed"
                  value={courseRecommendationPrompt}
                  onChange={(e) => setCourseRecommendationPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تحلیل هوشمند و ارائه مسیر پیشرفت کودک بر اساس کتاب‌های Prospect و Vision با تشویق‌های گیمیفیکیشن.</span>
                </div>
              </div>
            )}

            {editorTab === "courseBuilder" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت دوره‌ساز هوشمند (Course Builder AI Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی بسته‌های آموزشی کامل و هماهنگ با CEFR و کتاب‌های درسی مدارس ایران</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">COURSE_BUILDER</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-emerald-400 transition-all leading-relaxed"
                  value={courseBuilderPrompt}
                  onChange={(e) => setCourseBuilderPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید خودکار سیلابس، لیست دروس، ساختار هر درس و بخش‌های گیمیفیکیشن متناسب با مقطع تحصیلی کودک.</span>
                </div>
              </div>
            )}

            {editorTab === "lessonGenerator" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت هوشمند تولید درس (Lesson Generator AI Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید محتوای درس‌های اصیل و جذاب الهام‌گرفته از کتب درسی مدارس و هماهنگ با CEFR</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">LESSON_GENERATOR</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-amber-400 transition-all leading-relaxed"
                  value={lessonGeneratorPrompt}
                  onChange={(e) => setLessonGeneratorPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی سناریوهای جذاب، لغات جدید، گرامر در بستر متن، مکالمه کوتاه و چالش‌های بازی‌گونه برای تفهیم بهتر درس.</span>
                </div>
              </div>
            )}

            {editorTab === "endOfCourseTest" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-red-100 border-2 border-red-300 rounded-xl flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت آزمون پایان دوره (End-of-Course Test AI Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی آزمون‌های جامع سنجش نهایی مهارت‌های کودک پس از اتمام موفق دوره</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold">EOC_TEST_GENERATOR</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-red-400 transition-all leading-relaxed"
                  value={endOfCourseTestPrompt}
                  onChange={(e) => setEndOfCourseTestPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی سوالات سنجش لغات، گرامر، خواندن، شنیداری و گفتاری به همراه جدول امتیازدهی و پیشنهادهای سطح بعدی.</span>
                </div>
              </div>
            )}

            {editorTab === "cartoonSpeakingListening" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-sky-100 border-2 border-[#82D9FF] rounded-xl flex items-center justify-center">
                      <Film className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت مهارت‌های گفتاری کارتونی (Cartoon Speaking & Listening Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تولید تمرین‌های شنیداری و مکالمه داستان‌محور کودکانه با تم کاراکترهای اوم‌نام</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold">CARTOON_SPEAKING_ENGINE</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-sky-400 transition-all leading-relaxed"
                  value={cartoonSpeakingListeningPrompt}
                  onChange={(e) => setCartoonSpeakingListeningPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>تولید سناریوهای کارتونی جذاب، لیسنینگ با متن داستان، سوالات درک مطلب و سناریوهای اسپیکینگ متناسب با کودک.</span>
                </div>
              </div>
            )}

            {editorTab === "progressAnalytics" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-indigo-100 border-2 border-indigo-300 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت موتور تحلیل پیشرفت و گزارش به والدین (Progress Analytics & Parent Report AI)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">تحلیل داده‌های آماری کودک، پیشرفت CEFR و ایجاد گزارش‌های فارسی صمیمی برای والدین</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">PROGRESS_ANALYTICS</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-indigo-400 transition-all leading-relaxed"
                  value={progressAnalyticsPrompt}
                  onChange={(e) => setProgressAnalyticsPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>ارائه تحلیل گیمیفای شده لیسنینگ، اسپیکینگ، ریدینگ، رایتینگ، گزارش نقاط قوت/ضعف به زبان ملموس و غیرفنی و پیام‌های انگیزشی دوزبانه.</span>
                </div>
              </div>
            )}

            {editorTab === "parentDashboard" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-rose-100 border-2 border-rose-300 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت داشبورد تعاملی والدین (Parent Dashboard UI Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی داشبورد تعاملی و مانیتورینگ صمیمی رسپانسیو متناسب با نیازهای اولیا</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">PARENT_DASHBOARD</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-rose-400 transition-all leading-relaxed"
                  value={parentDashboardPrompt}
                  onChange={(e) => setParentDashboardPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی پروفایل کودکان، تخمین پیشرفت CEFR، نقاط قوت و ضعف کودک، کنترل والدین، برنامه زمان‌بندی و گزارش‌های انگیزه با تم کودکانه.</span>
                </div>
              </div>
            )}

            {editorTab === "teacherDashboard" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-100 border-2 border-blue-300 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-md text-[#3C3C3C]">
                        پرامپت داشبورد معلمان و کلاس آنلاین (Teacher & Virtual Classroom Prompt)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold">طراحی پنل مدیریت معلمان مدارس، پایش کلاسی و هدایت کلاس مجازی کارتونی گیمیفای شده</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-bold">TEACHER_DASHBOARD</span>
                </div>
                <textarea
                  dir="ltr"
                  className="w-full h-110 bg-gray-900 text-gray-100 p-4 rounded-2xl font-mono text-xs focus:outline-none border-2 border-transparent focus:border-blue-400 transition-all leading-relaxed"
                  value={teacherDashboardPrompt}
                  onChange={(e) => setTeacherDashboardPrompt(e.target.value)}
                />
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>طراحی مدیریت کلاس‌ها، رصد نمرات، حضور و غیاب، مشق شب، پیام اولیا، پلتفرم کلاس آنلاین پویا با تم اوم‌نام و مربیار هوشمند.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LEFT COLUMN: Universal Simulator & Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prompt Testing & Simulator Panel */}
          <div className="bg-[#FFFDF9] border-2 border-[#FFC542] border-b-6 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-dashed border-[#FFE3B3] pb-4">
              <div className="w-10 h-10 bg-[#FFF5E0] rounded-xl flex items-center justify-center border-2 border-[#FFC542]">
                <Play className="w-5 h-5 text-[#FF8A00] fill-[#FF8A00]" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm text-[#3C3C3C]">
                  شبیه‌ساز و تستر زنده موتور هوش مصنوعی
                </h3>
                <p className="text-[10px] font-bold text-[#A17C30]">
                  انتخاب سناریو، شخصی‌سازی پارامترها و تولید خروجی زنده با Gemini
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <GameIcon name="language_flag" size={14} />
                  <span>زبان مورد آموزش (Language)</span>
                </label>
                <select
                  value={simLanguage}
                  onChange={(e) => setSimLanguage(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="English">انگلیسی (English)</option>
                  <option value="Spanish">اسپانیایی (Spanish)</option>
                  <option value="French">فرانسوی (French)</option>
                  <option value="German">آلمانی (German)</option>
                  <option value="Persian">فارسی (Persian)</option>
                </select>
              </div>

              {/* CEFR Level & Skill */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                    <GameIcon name="level_star" size={14} />
                    <span>سطح CEFR</span>
                  </label>
                  <select
                    value={simCefr}
                    onChange={(e) => setSimCefr(e.target.value)}
                    className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                  >
                    <option value="A1">A1 (مبتدی)</option>
                    <option value="A2">A2 (پیش متوسطه)</option>
                    <option value="B1">B1 (متوسطه)</option>
                    <option value="B2">B2 (فوق متوسطه)</option>
                    <option value="C1">C1 (پیشرفته)</option>
                    <option value="C2">C2 (تسلط کامل)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                    <GameIcon name="skill_node" size={14} />
                    <span>مهارت (Skill)</span>
                  </label>
                  <select
                    value={simSkill}
                    onChange={(e) => setSimSkill(e.target.value)}
                    className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                  >
                    <option value="Vocabulary">واژگان (Vocabulary)</option>
                    <option value="Grammar">گرامر (Grammar)</option>
                    <option value="Speaking">مکالمه (Speaking)</option>
                    <option value="Listening">شنیداری (Listening)</option>
                    <option value="Reading">درک مطلب (Reading)</option>
                    <option value="Writing">نوشتاری (Writing)</option>
                  </select>
                </div>
              </div>

              {/* Notification Category Selector */}
              <div className="space-y-2 border-t pt-3 border-dashed border-[#FFE3B3]">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <GameIcon name="notif_bell" size={14} />
                  <span>نوع اعلان (Notification Category)</span>
                </label>
                <select
                  value={simNotificationType}
                  onChange={(e) => setSimNotificationType(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="XP earned">کسب امتیاز (XP earned)</option>
                  <option value="Streak updates">به‌روزرسانی زنجیره (Streak updates)</option>
                  <option value="Skill completion">تکمیل مهارت (Skill completion)</option>
                  <option value="Lesson reminders">یادآور درس روزانه (Lesson reminders)</option>
                  <option value="Challenge alerts">هشدار چالش زنده (Challenge alerts)</option>
                  <option value="League progress">پیشرفت در لیگ (League progress)</option>
                  <option value="Motivational boosts">تقویت انگیزه (Motivational boosts)</option>
                  <option value="Review reminders">یادآور مرور کلمات (Review reminders)</option>
                </select>
              </div>

              {/* Dialog Context Selector */}
              <div className="space-y-2 border-t pt-3 border-dashed border-[#FFE3B3]">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <GameIcon name="profile_avatar" size={14} />
                  <span>زمینه دیالوگ (Dialog Context)</span>
                </label>
                <select
                  value={simDialogContext}
                  onChange={(e) => setSimDialogContext(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="Lesson introduction">معرفی درس (Lesson introduction)</option>
                  <option value="Exercise start">شروع تمرین (Exercise start)</option>
                  <option value="Correct answer reaction">پاسخ صحیح (Correct answer reaction)</option>
                  <option value="Wrong answer reaction">پاسخ نادرست (Wrong answer reaction)</option>
                  <option value="Skill completion celebration">جشن پایان مهارت (Skill completion celebration)</option>
                  <option value="Streak encouragement">تشویق استریک (Streak encouragement)</option>
                  <option value="XP reward celebration">جشن پاداش XP (XP reward celebration)</option>
                </select>
              </div>

              {/* Challenge Type Selector */}
              <div className="space-y-2 border-t pt-3 border-dashed border-[#FFE3B3]">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <GameIcon name="rank_crown_gold" size={14} />
                  <span>نوع چالش و تست (Challenge Type)</span>
                </label>
                <select
                  value={simChallengeType}
                  onChange={(e) => setSimChallengeType(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="Boss challenge (Om Nom-style)">مبارزه با باس (Boss challenge)</option>
                  <option value="Timed challenge">چالش زمان‌دار (Timed challenge)</option>
                  <option value="Hard exercise set">مجموعه تمرین سخت (Hard exercise set)</option>
                  <option value="Mixed exercise pack">بسته تمرینی ترکیبی (Mixed exercise pack)</option>
                  <option value="Skill completion test">تست تکمیل مهارت (Skill completion test)</option>
                </select>
              </div>

              {/* Listening Type Selector */}
              <div className="space-y-2 border-t pt-3 border-dashed border-[#FFE3B3]">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-purple-600" />
                  <span>نوع آیتم صوتی (Listening Content Type)</span>
                </label>
                <select
                  value={simListeningType}
                  onChange={(e) => setSimListeningType(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="Single word pronunciation">تلفظ تک واژه (Single word)</option>
                  <option value="Short phrase pronunciation">تلفظ عبارت کوتاه (Short phrase)</option>
                  <option value="Daily conversation snippets">مکالمه کوتاه روزمره (Conversation)</option>
                  <option value="Listening comprehension mini-clips">مینی‌کلیپ درک مطلب (Comprehension)</option>
                  <option value="Repeat after me speaking prompts">تکرار جمله (Repeat after me)</option>
                </select>
              </div>

              {/* Vocabulary Category Selector */}
              <div className="space-y-2 border-t pt-3 border-dashed border-[#FFE3B3]">
                <label className="text-xs font-black text-[#777777] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpenText className="w-4 h-4 text-orange-600" />
                  <span>دسته‌بندی واژگان (Vocabulary Category)</span>
                </label>
                <select
                  value={simVocabularyCategory}
                  onChange={(e) => setSimVocabularyCategory(e.target.value)}
                  className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                >
                  <option value="Daily life">زندگی روزمره (Daily life)</option>
                  <option value="Food">غذا و خوراکی (Food)</option>
                  <option value="Family">خانواده (Family)</option>
                  <option value="Travel">سفر (Travel)</option>
                  <option value="Shopping">خرید (Shopping)</option>
                  <option value="Emotions">احساسات (Emotions)</option>
                  <option value="Basic verbs">افعال پایه (Basic verbs)</option>
                  <option value="Common adjectives">صفات رایج (Common adjectives)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">دسته‌بندی قدرت (Power Category)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                  value={simSpecialPowerCategory}
                  onChange={(e) => setSimSpecialPowerCategory(e.target.value)}
                >
                  <option value="XP Powers">قدرت‌های امتیاز (XP Powers)</option>
                  <option value="Streak Powers">قدرت‌های استریک (Streak Powers)</option>
                  <option value="Skill Powers">قدرت‌های مهارت (Skill Powers)</option>
                  <option value="Boss Powers">قدرت‌های غول‌آخر (Boss Powers)</option>
                  <option value="Daily Powers">قدرت‌های روزانه (Daily Powers)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">سطح قدرت (Power Level)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                  value={simSpecialPowerLevel}
                  onChange={(e) => setSimSpecialPowerLevel(Number(e.target.value))}
                >
                  <option value={1}>سطح ۱ (Level 1)</option>
                  <option value={2}>سطح ۲ (Level 2)</option>
                  <option value={3}>سطح ۳ (Level 3)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">سطح ارتقای سینماتیک (Cinematic Level-Up Level)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400 transition-all"
                  value={simCinematicLevelUpLevel}
                  onChange={(e) => setSimCinematicLevelUpLevel(Number(e.target.value))}
                >
                  <optgroup label="Beginner Progression (سطوح ۱ تا ۵)">
                    <option value={1}>سطح ۱ - ورود به دنیای بازی</option>
                    <option value={2}>سطح ۲ - اولین گام‌ها</option>
                    <option value={3}>سطح ۳ - ماجراجوی جوان</option>
                    <option value={4}>سطح ۴ - همسفر با اوم نام</option>
                    <option value={5}>سطح ۵ - قهرمان نوپا</option>
                  </optgroup>
                  <optgroup label="A1 Mastery Progression (سطوح ۶ تا ۱۰)">
                    <option value={6}>سطح ۶ - تسلط بر مفاهیم پایه A1</option>
                    <option value={8}>سطح ۸ - سخنور ماهر سطح ۱</option>
                    <option value={10}>سطح ۱۰ - قهرمان بزرگ A1</option>
                  </optgroup>
                  <optgroup label="A2 Progression (سطوح ۱۱ تا ۱۵)">
                    <option value={12}>سطح ۱۲ - کاشف دنیای بزرگ‌تر A2</option>
                    <option value={15}>سطح ۱۵ - استاد گفتگوی روان A2</option>
                  </optgroup>
                  <optgroup label="Advanced Levels (سطوح ۱۶ به بالا)">
                    <option value={16}>سطح ۱۶ - قهرمان افسانه‌ای سینماتیک</option>
                    <option value={20}>سطح ۲۰ - اسطوره زبان و عقل</option>
                  </optgroup>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">سطح CEFR اقتصاد بازی (Economy CEFR Level)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400 transition-all"
                  value={simEconomyCefr}
                  onChange={(e) => setSimEconomyCefr(e.target.value)}
                >
                  <option value="A1">سطح A1 (مبتدی نوپا)</option>
                  <option value="A2">سطح A2 (مبتدی پیشرفته)</option>
                  <option value="B1">سطح B1 (متوسط)</option>
                  <option value="B2">سطح B2 (فوق متوسط)</option>
                  <option value="C1">سطح C1 (پیشرفته)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">دسته‌بندی اقتصاد (Economy Category)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400 transition-all"
                  value={simEconomyCategory}
                  onChange={(e) => setSimEconomyCategory(e.target.value)}
                >
                  <option value="All Items">همه آیتم‌ها و مکانیسم‌ها (All Items)</option>
                  <option value="Soft & Hard Currencies">ارزهای نرم و سخت (Currencies)</option>
                  <option value="Earnable Sources">منابع کسب درآمد و پاداش‌ها (Earnable Sources)</option>
                  <option value="Spendable Items">آیتم‌های خریدنی فروشگاه (Spendable Items)</option>
                  <option value="Balancing & Scaling">تعادل و درجه‌بندی پیشرفت (Balancing Rules)</option>
                  <option value="Seasonal Events">رویدادها و تخفیف‌ها (Seasonal Events)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">دسته‌بندی کالکتیبل (Collectible Category)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                  value={simCollectibleCategory}
                  onChange={(e) => setSimCollectibleCategory(e.target.value)}
                >
                  <option value="All Categories">همه دسته‌بندی‌ها (All Categories)</option>
                  <option value="Vocabulary Cards (A1–A2)">کارت واژگان (Vocabulary Cards)</option>
                  <option value="Grammar Tokens">توکن‌های گرامر (Grammar Tokens)</option>
                  <option value="Om Nom Stickers">استیکرهای اوم‌نام (Om Nom Stickers)</option>
                  <option value="Evolution Shards">شارد ارتقا (Evolution Shards)</option>
                  <option value="Mini-game Badges">نشان‌های مینی‌گیم (Mini-game Badges)</option>
                  <option value="Seasonal Event Collectibles">کالکتیبل‌های فصلی (Seasonal Event)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">درجه کمیابی کالکتیبل (Collectible Rarity)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                  value={simCollectibleRarity}
                  onChange={(e) => setSimCollectibleRarity(e.target.value)}
                >
                  <option value="All Rarities">همه سطوح کمیابی (All Rarities)</option>
                  <option value="common">معمولی (Common)</option>
                  <option value="rare">کمیاب (Rare)</option>
                  <option value="epic">حماسی (Epic)</option>
                  <option value="legendary">افسانه‌ای (Legendary)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">دسته‌بندی فروشگاه (Shop Category)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-400 transition-all"
                  value={simShopCategory}
                  onChange={(e) => setSimShopCategory(e.target.value)}
                >
                  <option value="All Categories">همه دسته‌بندی‌ها (All Categories)</option>
                  <option value="Cosmetic skins">پوسته‌های تزئینی (Cosmetic skins)</option>
                  <option value="Background themes">تم‌های پس‌زمینه (Background themes)</option>
                  <option value="Evolution boosters">بوسترهای ارتقا (Evolution boosters)</option>
                  <option value="Special powers">قدرت‌های ویژه (Special powers)</option>
                  <option value="Mini-game tickets">بلیط‌های مینی‌گیم (Mini-game tickets)</option>
                  <option value="Seasonal items">آیتم‌های فصلی (Seasonal items)</option>
                  <option value="Collectible packs">پک‌های کالکتیبل (Collectible packs)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">چرخش فروشگاه (Shop Rotation)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-400 transition-all"
                  value={simShopRotation}
                  onChange={(e) => setSimShopRotation(e.target.value)}
                >
                  <option value="daily rotation">چرخش روزانه (Daily rotation)</option>
                  <option value="weekly featured items">پیشنهادات ویژه هفتگی (Weekly featured)</option>
                  <option value="seasonal exclusive items">انحصاری فصلی (Seasonal exclusive)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">تم رویداد فصلی (Seasonal Event Theme)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400 transition-all"
                  value={simSeasonalTheme}
                  onChange={(e) => setSimSeasonalTheme(e.target.value)}
                >
                  <option value="Spring Festival">جشنواره بهاره (Spring Festival)</option>
                  <option value="Summer Adventure">ماجراجویی تابستانه (Summer Adventure)</option>
                  <option value="Autumn Harvest">برداشت پاییزی (Autumn Harvest)</option>
                  <option value="Winter Wonderland">سرزمین عجایب زمستانی (Winter Wonderland)</option>
                  <option value="Om Nom Birthday">جشن تولد اوم‌نام (Om Nom Birthday)</option>
                  <option value="Language Week Celebration">جشن هفته زبان (Language Week)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">مدت رویداد فصلی (Seasonal Event Duration)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400 transition-all"
                  value={simSeasonalDuration}
                  onChange={(e) => setSimSeasonalDuration(e.target.value)}
                >
                  <option value="1 week">۱ هفته (1 week)</option>
                  <option value="2 weeks">۲ هفته (2 weeks)</option>
                  <option value="3 weeks">۳ هفته (3 weeks)</option>
                  <option value="1 month">۱ ماه (1 month)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">نوع صفحه رابط کاربری (UI Screen Type)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-sky-400 transition-all"
                  value={simUiScreenType}
                  onChange={(e) => setSimUiScreenType(e.target.value)}
                >
                  <option value="Lesson Screen">صفحه آموزش (Lesson Screen)</option>
                  <option value="Exercise Screen">صفحه تمرین (Exercise Screen)</option>
                  <option value="Skill Tree Screen">صفحه درخت مهارت (Skill Tree Screen)</option>
                  <option value="Shop Screen">صفحه فروشگاه اوم نام (Shop Screen)</option>
                  <option value="Seasonal Events Hub">صفحه هاب رویدادهای فصلی (Seasonal Events Hub)</option>
                  <option value="Evolution Hub">صفحه هاب ارتقا و تکامل (Evolution Hub)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">تم / حس و حال صفحه (UI Mood & Vibe)</label>
                <select
                  className="w-full bg-white border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-sky-400 transition-all"
                  value={simUiMood}
                  onChange={(e) => setSimUiMood(e.target.value)}
                >
                  <option value="Playful & Bright">بازیگوش و درخشان (Playful & Bright)</option>
                  <option value="Neon Jelly Night">شبه‌ژله‌ای نئونی شب (Neon Jelly Night)</option>
                  <option value="Forest Candy Adventure">ماجراجویی جنگل نباتی (Forest Candy)</option>
                  <option value="Sweet Tooth Pink">تم فانتزی صورتی شیرین (Sweet Tooth Pink)</option>
                  <option value="Galaxy Magic Sparkle">تم جادویی کهکشانی (Galaxy Magic Sparkle)</option>
                </select>
              </div>

              {/* Grid of Simulation Triggers */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#FFE3B3]">
                <button
                  onClick={() => handleGenerate("lesson")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-[#9333EA] bg-[#FAF5FF] hover:bg-[#F3E8FF] border-2 border-[#E9D5FF] border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <BookOpen className="w-4 h-4 ml-1" />
                  <span>تولید درس آزمایشی</span>
                </button>

                <button
                  onClick={() => handleGenerate("exercise")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-600 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Code className="w-4 h-4 ml-1" />
                  <span>تولید تمرین آزمایشی</span>
                </button>

                <button
                  onClick={() => handleGenerate("skill-tree")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <TreeDeciduous className="w-4 h-4 ml-1" />
                  <span>تولید درخت مهارت A1</span>
                </button>

                <button
                  onClick={() => handleGenerate("notification")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border-2 border-cyan-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Bell className="w-4 h-4 ml-1" />
                  <span>تولید نوتیفیکیشن</span>
                </button>

                <button
                  onClick={() => handleGenerate("dialog")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Smile className="w-4 h-4 ml-1" />
                  <span>تولید دیالوگ اوم‌نام</span>
                </button>

                <button
                  onClick={() => handleGenerate("challenge")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Award className="w-4 h-4 ml-1" />
                  <span>تولید چالش / مینی‌تست</span>
                </button>

                <button
                  onClick={() => handleGenerate("listening")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-purple-700 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Volume2 className="w-4 h-4 ml-1" />
                  <span>تولید محتوای صوتی</span>
                </button>

                <button
                  onClick={() => handleGenerate("vocabulary")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-orange-700 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <BookOpenText className="w-4 h-4 ml-1" />
                  <span>تولید واژه‌نامه A1-A2</span>
                </button>

                <button
                  onClick={() => handleGenerate("listeningTest")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-violet-700 bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Volume2 className="w-4 h-4 ml-1" />
                  <span>تولید آزمون شنیداری</span>
                </button>

                <button
                  onClick={() => handleGenerate("conversation")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-teal-700 bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <MessageSquare className="w-4 h-4 ml-1" />
                  <span>تولید مکالمه روزمره</span>
                </button>

                <button
                  onClick={() => handleGenerate("story")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <BookOpen className="w-4 h-4 ml-1" />
                  <span>تولید داستان کوتاه</span>
                </button>

                <button
                  onClick={() => handleGenerate("speaking")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-pink-700 bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Volume2 className="w-4 h-4 ml-1" />
                  <span>تولید آیتم گفتاری</span>
                </button>

                <button
                  onClick={() => handleGenerate("bossFight")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-red-700 bg-red-50 hover:bg-red-100 border-2 border-red-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Award className="w-4 h-4 ml-1" />
                  <span>تولید Boss Fight</span>
                </button>

                <button
                  onClick={() => handleGenerate("reading")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-sky-700 bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <BookOpenText className="w-4 h-4 ml-1" />
                  <span>تولید درک مطلب</span>
                </button>

                <button
                  onClick={() => handleGenerate("a1FinalExam")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Award className="w-4 h-4 ml-1" />
                  <span>تولید آزمون A1</span>
                </button>

                <button
                  onClick={() => handleGenerate("adaptiveLearningPath")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Zap className="w-4 h-4 ml-1" />
                  <span>تولید مسیر یادگیری</span>
                </button>

                <button
                  onClick={() => handleGenerate("cutsceneDialog")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-teal-700 bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Smile className="w-4 h-4 ml-1" />
                  <span>تولید کات‌سین</span>
                </button>

                <button
                  onClick={() => handleGenerate("miniGame")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Code className="w-4 h-4 ml-1" />
                  <span>تولید مینی‌گیم</span>
                </button>

                <button
                  onClick={() => handleGenerate("dailyMission")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-purple-700 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Award className="w-4 h-4 ml-1" />
                  <span>تولید ماموریت روزانه</span>
                </button>

                <button
                  onClick={() => handleGenerate("evolutionSystem")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Zap className="w-4 h-4 ml-1" />
                  <span>تولید سیستم تکامل</span>
                </button>

                <button
                  onClick={() => handleGenerate("specialPower")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Flame className="w-4 h-4 ml-1" />
                  <span>تولید قدرت ویژه</span>
                </button>

                <button
                  onClick={() => handleGenerate("cinematicLevelUp")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 border-2 border-fuchsia-200 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Film className="w-4 h-4 ml-1" />
                  <span>تولید ارتقای سینماتیک</span>
                </button>

                <button
                  onClick={() => handleGenerate("gameEconomy")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Coins className="w-4 h-4 ml-1" />
                  <span>تولید اقتصاد بازی</span>
                </button>

                <button
                  onClick={() => handleGenerate("collectiblesSystem")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Gem className="w-4 h-4 ml-1" />
                  <span>تولید کالکتیبل‌ها</span>
                </button>

                <button
                  onClick={() => handleGenerate("shopSystem")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <ShoppingBag className="w-4 h-4 ml-1" />
                  <span>تولید آیتم‌های فروشگاه</span>
                </button>

                <button
                  onClick={() => handleGenerate("seasonalEvents")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Calendar className="w-4 h-4 ml-1" />
                  <span>تولید رویداد فصلی</span>
                </button>

                <button
                  onClick={() => handleGenerate("uiStyle")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 text-xs font-black text-sky-700 bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 border-b-4 hover:border-b-2 py-3 rounded-2xl transition-all"
                >
                  <Palette className="w-4 h-4 ml-1" />
                  <span>تولید استایل رابط کاربری</span>
                </button>
              </div>
            </div>
          </div>

          {/* Execution Result Box */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl overflow-hidden min-h-[350px]">
            {/* Header Tabs */}
            <div className="bg-gray-50 border-b border-[#E5E5E5] px-4 py-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>نمایش خروجی هوش مصنوعی</span>
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveTab("visual")}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === "visual"
                      ? "bg-purple-600 text-white"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  پیش‌نمایش بصری
                </button>
                <button
                  onClick={() => setActiveTab("raw")}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === "raw"
                      ? "bg-purple-600 text-white"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  خروجی خام
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                  <div className="text-xs font-black text-[#777777] text-center">
                    <p>در حال فراخوانی مدل زنده Gemini-3.5-Flash...</p>
                    <p className="text-[10px] mt-1 font-bold text-gray-400">تحلیل قالب پرامپت‌ها و ساختار خروجی</p>
                  </div>
                </div>
              ) : generationResult ? (
                activeTab === "visual" ? (
                  <div className="space-y-6">
                    {/* Lesson Output Visual Representation */}
                    {genType === "lesson" && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            CEFR {generationResult.parsed?.CEFR_Level || simCefr} • {generationResult.parsed?.Skill || simSkill}
                          </span>
                          <h4 className="font-display font-black text-lg text-purple-900 mt-2">
                            {generationResult.parsed?.LessonTitle || "عنوان درس تولید شده"}
                          </h4>
                        </div>

                        {generationResult.parsed?.Objective && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">هدف درس</span>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold">
                              {generationResult.parsed.Objective}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Explanation && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">توضیح کوتاه و صمیمی (Micro-Learning)</span>
                            <p className="text-xs font-semibold leading-relaxed bg-white border border-gray-200 p-3 rounded-xl text-gray-600">
                              {generationResult.parsed.Explanation}
                            </p>
                          </div>
                        )}

                        {generationResult.parsed?.Examples && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">مثال‌ها (Examples)</span>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-mono whitespace-pre-line leading-relaxed">
                              {generationResult.parsed.Examples}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Challenge && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">چالش درس (Mini Challenge)</span>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-bold text-amber-900 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{generationResult.parsed.Challenge}</span>
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Feedback && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">بازخورد کارتونی Om Nom</span>
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-bold text-emerald-800">
                              {generationResult.parsed.Feedback}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Gamification && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-purple-600 block">سیستم جوایز گیمیفیکیشن</span>
                            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex flex-wrap gap-3">
                              {generationResult.parsed.Gamification.includes("xp_orb") && (
                                <span className="flex items-center gap-1.5 text-xs font-black text-indigo-700 bg-indigo-100/50 px-2.5 py-1 rounded-lg">
                                  <GameIcon name="xp_orb" size={16} />
                                  <span>XP Reward</span>
                                </span>
                              )}
                              {generationResult.parsed.Gamification.includes("streak_flame") && (
                                <span className="flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-100/50 px-2.5 py-1 rounded-lg">
                                  <GameIcon name="streak_flame" size={16} />
                                  <span>Streak Reward</span>
                                </span>
                              )}
                              {generationResult.parsed.Gamification.includes("badge_medal") && (
                                <span className="flex items-center gap-1.5 text-xs font-black text-yellow-700 bg-yellow-100/50 px-2.5 py-1 rounded-lg">
                                  <GameIcon name="badge_medal" size={16} />
                                  <span>Badge Suggestion</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Exercise Output Visual Representation */}
                    {genType === "exercise" && (
                      <div className="space-y-4">
                        <div className="bg-[#ECFEFF] border border-[#A5F3FC] rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-[#CFFAFE] text-[#0891B2] font-bold px-2.5 py-1 rounded-full uppercase">
                            CEFR {generationResult.parsed?.CEFR_Level || simCefr} • {generationResult.parsed?.Difficulty || "متوسط"}
                          </span>
                          <h4 className="font-display font-black text-lg text-cyan-900 mt-2">
                            نوع تمرین: {generationResult.parsed?.ExerciseType || "تمرین انتخابی"}
                          </h4>
                        </div>

                        {generationResult.parsed?.Prompt && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-cyan-600 block">سوال یا صورت تمرین</span>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold leading-relaxed">
                              {generationResult.parsed.Prompt}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Options && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-cyan-600 block">گزینه‌ها</span>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-mono whitespace-pre-line leading-relaxed">
                              {generationResult.parsed.Options}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.CorrectAnswer && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-[#58CC02] block">پاسخ صحیح</span>
                            <div className="bg-[#E5F9E5] border border-[#58CC02] rounded-xl p-3 text-xs font-bold text-[#3B8A01]">
                              {generationResult.parsed.CorrectAnswer}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Feedback && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-cyan-600 block">انیمیشن و فیدبک Om Nom</span>
                            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs font-bold text-cyan-800">
                              {generationResult.parsed.Feedback}
                            </div>
                          </div>
                        )}

                        {generationResult.parsed?.Gamification && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-cyan-600 block">امتیازات گیمیفیکیشن</span>
                            <div className="bg-cyan-50/50 border border-cyan-200 rounded-xl p-3 flex flex-wrap gap-3">
                              {generationResult.parsed.Gamification.includes("xp_orb") && (
                                <span className="flex items-center gap-1.5 text-xs font-black text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-lg">
                                  <GameIcon name="xp_orb" size={16} />
                                  <span>XP Reward</span>
                                </span>
                              )}
                              {generationResult.parsed.Gamification.includes("streak_flame") && (
                                <span className="flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-100 px-2.5 py-1 rounded-lg">
                                  <GameIcon name="streak_flame" size={16} />
                                  <span>Streak Update</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skill Tree Output Visual Representation */}
                    {genType === "skill-tree" && (
                      <div className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase">
                            ساختار درخت مهارت کامل CEFR A1
                          </span>
                          <h4 className="font-display font-black text-md text-emerald-900 mt-2 flex items-center justify-center gap-1.5">
                            <TreeDeciduous className="w-5 h-5 text-emerald-600" />
                            درخت مهارت تولید شده برای زبان {simLanguage}
                          </h4>
                        </div>

                        {generationResult.parsed ? (
                          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                            {generationResult.parsed.map((skill: any, idx: number) => (
                              <div key={idx} className="border-2 border-[#E5E5E5] rounded-2xl p-4 bg-white space-y-2">
                                <div className="flex items-center justify-between border-b pb-1.5">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-center font-black text-xs text-emerald-700">
                                      {idx + 1}
                                    </div>
                                    <h5 className="font-display font-black text-xs text-[#3C3C3C]">
                                      {skill.name || "بدون نام"}
                                    </h5>
                                  </div>
                                  <span className="flex items-center gap-1 text-[10px] font-black text-[#E25C3D] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                                    <GameIcon name="badge_medal" size={12} />
                                    <span>{skill.badge || "badge_medal"}</span>
                                  </span>
                                </div>

                                <p className="text-[10px] font-semibold text-gray-500 leading-relaxed">
                                  {skill.objective}
                                </p>

                                {skill.lessons && skill.lessons.length > 0 && (
                                  <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                    <span className="text-[9px] font-black text-emerald-600 block">دروس میکرو (Micro-Lessons)</span>
                                    <ul className="text-[10px] font-semibold text-gray-600 space-y-1 list-disc list-inside">
                                      {skill.lessons.map((lesson: string, lIdx: number) => (
                                        <li key={lIdx}>{lesson}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="grid grid-cols-2 gap-2 pt-1.5 text-[9px] font-bold">
                                  <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-lg p-1.5">
                                    <span className="font-black text-amber-600 block">چالش نهایی:</span>
                                    <span className="truncate block">{skill.challenge || "طراحی نشده"}</span>
                                  </div>
                                  <div className="bg-purple-50 text-purple-800 border border-purple-200 rounded-lg p-1.5">
                                    <span className="font-black text-purple-600 block">مینی تست:</span>
                                    <span className="truncate block">{skill.miniTest || "طراحی نشده"}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 border-2 border-dashed border-gray-200 text-center text-xs font-semibold text-gray-500">
                            فرمت بازگردانده شده ناهمگون است، لطفاً به خروجی خام مراجعه کنید.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notification Output Visual Representation */}
                    {genType === "notification" && (
                      <div className="space-y-4">
                        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-cyan-200 text-cyan-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            اعلان کارتونی هوشمند Om Nom
                          </span>
                          <h4 className="font-display font-black text-lg text-cyan-900 mt-2">
                            نوع نوتیفیکیشن: {generationResult.parsed?.NotificationType || simNotificationType}
                          </h4>
                        </div>

                        {/* Duolingo / Om Nom Style Notification Box */}
                        <div className="relative bg-white border-3 border-gray-900 rounded-3xl p-5 shadow-lg flex items-center gap-4 border-b-6 max-w-sm mx-auto my-4 overflow-hidden">
                          {/* Emotional Om Nom Visual */}
                          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-400 flex flex-col items-center justify-center flex-shrink-0">
                            {generationResult.parsed?.Emotion?.toLowerCase().includes("happy") || generationResult.parsed?.Emotion?.toLowerCase().includes("excited") ? (
                              <div className="text-3xl animate-bounce">😋</div>
                            ) : generationResult.parsed?.Emotion?.toLowerCase().includes("confused") ? (
                              <div className="text-3xl">🤔</div>
                            ) : (
                              <div className="text-3xl">🟢</div>
                            )}
                            <span className="text-[7px] font-black text-emerald-800 uppercase tracking-widest mt-0.5">
                              {generationResult.parsed?.Emotion || "HAPPY"}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                                Om Nom Reaction
                              </span>
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            </div>
                            <p className="text-xs font-black text-gray-800 leading-relaxed leading-tight">
                              {generationResult.parsed?.Message || "متن پیام اعلان تولید شده است."}
                            </p>
                          </div>

                          {/* Float Badge/Icon indicator */}
                          <div className="absolute top-2 left-2 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <GameIcon name={generationResult.parsed?.Icon || "notif_bell"} size={10} />
                            <span className="text-[7px] font-black text-amber-800 uppercase">
                              {generationResult.parsed?.Icon || "notif_bell"}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                          <span className="text-[10px] font-black text-gray-500 block">فیلدهای تحلیلی پیام:</span>
                          <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-600">
                            <div>
                              <span className="font-bold text-gray-400">آیکون گیمیفیکیشن:</span>{" "}
                              <code className="text-[11px] bg-gray-200 px-1.5 py-0.5 rounded font-mono">
                                {generationResult.parsed?.Icon || "notif_bell"}
                              </code>
                            </div>
                            <div>
                              <span className="font-bold text-gray-400">احساس (Emotion):</span>{" "}
                              <code className="text-[11px] bg-gray-200 px-1.5 py-0.5 rounded font-mono">
                                {generationResult.parsed?.Emotion || "Happy"}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dialog Output Visual Representation */}
                    {genType === "dialog" && (
                      <div className="space-y-4">
                        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            دیالوگ پویای Om Nom • CEFR {simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-rose-900 mt-2">
                            زمینه: {generationResult.parsed?.DialogType || simDialogContext}
                          </h4>
                        </div>

                        {/* Interactive Character Dialogue Bubble */}
                        <div className="relative bg-white border-3 border-rose-400 rounded-3xl p-5 shadow-md flex items-center gap-4 max-w-md mx-auto my-4">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex flex-col items-center justify-center flex-shrink-0 animate-bounce">
                            {generationResult.parsed?.Emotion?.toLowerCase().includes("happy") || generationResult.parsed?.Emotion?.toLowerCase().includes("excited") ? (
                              <span className="text-3xl">😋</span>
                            ) : generationResult.parsed?.Emotion?.toLowerCase().includes("confused") ? (
                              <span className="text-3xl">🤔</span>
                            ) : generationResult.parsed?.Emotion?.toLowerCase().includes("proud") || generationResult.parsed?.Emotion?.toLowerCase().includes("cool") ? (
                              <span className="text-3xl">😎</span>
                            ) : generationResult.parsed?.Emotion?.toLowerCase().includes("surprised") ? (
                              <span className="text-3xl">😮</span>
                            ) : (
                              <span className="text-3xl">🥰</span>
                            )}
                            <span className="text-[8px] font-black text-emerald-800 uppercase mt-0.5">
                              {generationResult.parsed?.Emotion || "HAPPY"}
                            </span>
                          </div>

                          <div className="flex-1">
                            <p className="text-xs font-black text-gray-800 leading-relaxed bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                              « {generationResult.parsed?.Message || "دیالوگ تولید شده خالی است."} »
                            </p>
                          </div>

                          <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full border border-white">
                            <Smile className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                          <span className="text-[10px] font-black text-gray-500 block">مشخصات دیالوگ:</span>
                          <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-600">
                            <div>
                              <span className="font-bold text-gray-400">آیکون فعال:</span>{" "}
                              <span className="inline-flex items-center gap-1 bg-rose-100 px-2 py-0.5 rounded text-rose-800">
                                <GameIcon name={generationResult.parsed?.Icon || "xp_orb"} size={12} />
                                <code className="text-[10px] font-mono">{generationResult.parsed?.Icon || "xp_orb"}</code>
                              </span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-400">احساس (Emotion):</span>{" "}
                              <code className="text-[11px] bg-gray-200 px-1.5 py-0.5 rounded font-mono">
                                {generationResult.parsed?.Emotion || "Excited"}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Challenge Output Visual Representation */}
                    {genType === "challenge" && (
                      <div className="space-y-4">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-indigo-200 text-indigo-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            چالش نهایی و مینی‌تست ویژه • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-indigo-950 mt-2">
                            {generationResult.parsed?.ChallengeTitle || "عنوان آزمون ویژه"}
                          </h4>
                        </div>

                        {/* Challenge Dashboard Box */}
                        <div className="border-3 border-indigo-600 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 -z-10" />

                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] font-black text-indigo-500 uppercase">هدف یادگیری چالش</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed">
                                {generationResult.parsed?.Objective || "هدف چالش مشخص نشده است."}
                              </p>
                            </div>
                            <div className="bg-indigo-600 text-white p-2.5 rounded-2xl border-b-4 border-indigo-800 flex flex-col items-center justify-center min-w-[70px]">
                              <span className="text-xs font-black">{generationResult.parsed?.NumberOfQuestions || "5"}</span>
                              <span className="text-[7px] font-bold uppercase tracking-widest text-indigo-200">سوال فعال</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                              <span className="text-[9px] font-black text-gray-500 block">انواع تمرین‌های مجاز:</span>
                              <p className="text-xs font-semibold text-gray-700 leading-relaxed whitespace-pre-line">
                                {generationResult.parsed?.ExerciseTypes || "تنوع تمرینی مشخص نشده"}
                              </p>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                              <span className="text-[9px] font-black text-gray-500 block">شیب سختی و طراحی تست:</span>
                              <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                                {generationResult.parsed?.DifficultyCurve || "طراحی نشده"}
                              </p>
                            </div>
                          </div>

                          {generationResult.parsed?.Rewards && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-1.5">
                              <span className="text-[9px] font-black text-amber-700 block flex items-center gap-1">
                                <GameIcon name="badge_medal" size={12} />
                                <span>جوایز گیمیفیکیشن چالش</span>
                              </span>
                              <div className="flex flex-wrap gap-2 text-xs font-bold text-amber-900">
                                {generationResult.parsed.Rewards.includes("xp_orb") && (
                                  <span className="flex items-center gap-1 bg-amber-200/50 px-2.5 py-1 rounded-lg">
                                    <GameIcon name="xp_orb" size={14} />
                                    <span>XP Orb Reward</span>
                                  </span>
                                )}
                                {generationResult.parsed.Rewards.includes("streak_flame") && (
                                  <span className="flex items-center gap-1 bg-orange-200/50 px-2.5 py-1 rounded-lg">
                                    <GameIcon name="streak_flame" size={14} />
                                    <span>Streak Boost</span>
                                  </span>
                                )}
                                {generationResult.parsed.Rewards.includes("badge_medal") && (
                                  <span className="flex items-center gap-1 bg-yellow-200/50 px-2.5 py-1 rounded-lg">
                                    <GameIcon name="badge_medal" size={14} />
                                    <span>Badge Medal</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {generationResult.parsed?.CartoonFeedback && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
                              <div className="text-xl">🦖</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">فیدبک کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonFeedback}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Listening Output Visual Representation */}
                    {genType === "listening" && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            محتوای صوتی هوشمند • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-purple-950 mt-2">
                            {generationResult.parsed?.AudioItem || "آیتم شنیداری"}
                          </h4>
                        </div>

                        {/* Interactive Audio Card Widget */}
                        <div className="border-3 border-purple-600 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {/* Audio Player Header */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-purple-600 uppercase tracking-wider">پخش صوتی آزمایشی (Mock Player)</span>
                            <span className="text-[9px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span>لحن: {generationResult.parsed?.Tone || "happy"}</span>
                              {generationResult.parsed?.Tone?.toLowerCase().includes("excited") ? "🤩" : "😊"}
                            </span>
                          </div>

                          {/* Sound wave & Control mock */}
                          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                            <div className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 flex-shrink-0">
                              <Volume2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1 flex items-center gap-1">
                              {/* Mock sound waves */}
                              <div className="h-4 w-1 bg-purple-300 rounded-full animate-pulse" />
                              <div className="h-6 w-1 bg-purple-400 rounded-full animate-pulse delay-75" />
                              <div className="h-8 w-1 bg-purple-600 rounded-full" />
                              <div className="h-5 w-1 bg-purple-400 rounded-full" />
                              <div className="h-7 w-1 bg-purple-500 rounded-full animate-pulse" />
                              <div className="h-3 w-1 bg-purple-300 rounded-full" />
                              <div className="h-6 w-1 bg-purple-400 rounded-full animate-pulse delay-100" />
                              <div className="h-8 w-1 bg-purple-600 rounded-full" />
                              <div className="h-4 w-1 bg-purple-300 rounded-full" />
                            </div>
                            <div className="flex gap-1.5">
                              <span className="text-[9px] bg-white border border-purple-200 text-purple-700 font-bold px-1.5 py-0.5 rounded cursor-pointer hover:bg-purple-100">1.0x Normal</span>
                              {generationResult.parsed?.SlowVersion && (
                                <span className="text-[9px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer hover:bg-purple-700">0.7x Slow</span>
                              )}
                            </div>
                          </div>

                          {/* Transcription & IPA */}
                          <div className="space-y-2">
                            <div>
                              <span className="text-[9px] font-black text-gray-400 block">متن عبارت (Text):</span>
                              <p className="text-sm font-black text-gray-800 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed?.Text || "متن خالی است."}
                              </p>
                            </div>

                            {generationResult.parsed?.IPA && (
                              <div>
                                <span className="text-[9px] font-black text-gray-400 block">تلفظ فونتیک (IPA Phonetic):</span>
                                <code className="text-xs font-mono font-bold text-purple-800 bg-purple-50/50 px-2.5 py-1 rounded-lg border border-purple-100 inline-block">
                                  {generationResult.parsed.IPA}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Slow and Normal version descriptions */}
                          <div className="grid grid-cols-2 gap-3 text-[10px] border-t border-purple-100 pt-3">
                            <div>
                              <span className="font-black text-gray-400 block">نسخه معمولی (Normal):</span>
                              <p className="font-bold text-gray-600 italic">"{generationResult.parsed?.NormalVersion || "نامشخص"}"</p>
                            </div>
                            <div>
                              <span className="font-black text-gray-400 block">نسخه آرام (Slow):</span>
                              <p className="font-bold text-gray-600 italic">"{generationResult.parsed?.SlowVersion || "ندارد"}"</p>
                            </div>
                          </div>

                          {/* Cartoon Feedback */}
                          {generationResult.parsed?.CartoonFeedback && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">🦖</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">ری‌اکشن کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonFeedback}</span>
                              </div>
                            </div>
                          )}

                          {/* Gamification */}
                          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-amber-900">
                            <span className="text-[9px] font-black text-amber-700 uppercase flex items-center gap-1">
                              <GameIcon name="xp_orb" size={12} />
                              <span>جوایز گیمیفیکیشن صوتی</span>
                            </span>
                            <div className="flex gap-2">
                              <span className="flex items-center gap-1 bg-yellow-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="xp_orb" size={12} />
                                <span>XP Earned</span>
                              </span>
                              <span className="flex items-center gap-1 bg-orange-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="streak_flame" size={12} />
                                <span>Streak Boosted</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Vocabulary Output Visual Representation */}
                    {genType === "vocabulary" && (
                      <div className="space-y-4">
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-orange-200 text-orange-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            واژه و جملات طلایی • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-orange-950 mt-2">
                            {generationResult.parsed?.VocabularyItem || "آیتم واژه‌نامه"}
                          </h4>
                        </div>

                        {/* Interactive Vocab Card Widget */}
                        <div className="border-3 border-orange-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {/* Main word display */}
                          <div className="flex items-end justify-between border-b pb-3 border-dashed border-orange-100">
                            <div>
                              <span className="text-[8px] font-black text-orange-600 block uppercase tracking-wider">واژه جدید (New Word)</span>
                              <h2 className="text-2xl font-black text-orange-900 tracking-tight">
                                {generationResult.parsed?.Word || "English Word"}
                              </h2>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] bg-orange-100 text-orange-800 font-black px-2 py-0.5 rounded-full inline-block">
                                {generationResult.parsed?.PartOfSpeech || "Noun"}
                              </span>
                              {generationResult.parsed?.IPA && (
                                <code className="text-[11px] font-mono text-gray-400 block mt-1">{generationResult.parsed.IPA}</code>
                              )}
                            </div>
                          </div>

                          {/* Definition & Translation */}
                          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl border">
                            <div>
                              <span className="text-[8px] font-black text-gray-400 block">تعریف ساده (Definition):</span>
                              <p className="text-xs font-bold text-gray-700 leading-normal">{generationResult.parsed?.Definition || "تعریف به انگلیسی"}</p>
                            </div>
                            <div className="border-r pr-3 border-gray-200">
                              <span className="text-[8px] font-black text-gray-400 block">ترجمه (Translation):</span>
                              <p className="text-xs font-bold text-orange-800 leading-normal">{generationResult.parsed?.Translation || "معنی فارسی"}</p>
                            </div>
                          </div>

                          {/* Dynamic CEFR-aligned Example Sentences */}
                          <div className="space-y-2.5">
                            <span className="text-[9px] font-black text-gray-400 block">نمونه جملات کاربردی در سطوح مختلف:</span>

                            {generationResult.parsed?.Example_A1 && (
                              <div className="bg-yellow-50/50 border border-yellow-200 p-3 rounded-xl space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[8px] bg-yellow-400 text-yellow-950 font-black px-1.5 py-0.5 rounded-md">سطح A1 (آسان)</span>
                                  <span className="text-[8px] text-gray-400">شنیداری مجاز 🎧</span>
                                </div>
                                <p className="text-xs font-black text-gray-800 italic">"{generationResult.parsed.Example_A1}"</p>
                              </div>
                            )}

                            {generationResult.parsed?.Example_A2 && (
                              <div className="bg-amber-50/50 border border-amber-200 p-3 rounded-xl space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[8px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-md">سطح A2 (متوسط)</span>
                                  <span className="text-[8px] text-gray-400">شنیداری مجاز 🎧</span>
                                </div>
                                <p className="text-xs font-black text-gray-800 italic">"{generationResult.parsed.Example_A2}"</p>
                              </div>
                            )}
                          </div>

                          {/* Cartoon Feedback */}
                          {generationResult.parsed?.CartoonFeedback && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">🦕</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">ری‌اکشن کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonFeedback}</span>
                              </div>
                            </div>
                          )}

                          {/* Gamification rewards */}
                          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 space-y-1.5">
                            <span className="text-[9px] font-black text-orange-700 block flex items-center gap-1">
                              <GameIcon name="badge_medal" size={12} />
                              <span>پاداش‌های گیمیفیکیشن واژه‌نامه</span>
                            </span>
                            <div className="flex flex-wrap gap-2 text-[10px] font-black text-orange-950">
                              <span className="flex items-center gap-1 bg-yellow-200/50 px-2.5 py-1 rounded-lg">
                                <GameIcon name="xp_orb" size={13} />
                                <span>XP Orb Reward</span>
                              </span>
                              <span className="flex items-center gap-1 bg-orange-200/50 px-2.5 py-1 rounded-lg">
                                <GameIcon name="streak_flame" size={13} />
                                <span>Streak Boost</span>
                              </span>
                              <span className="flex items-center gap-1 bg-yellow-300/40 px-2.5 py-1 rounded-lg">
                                <GameIcon name="badge_medal" size={13} />
                                <span>Medal Badge</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Listening Test Output Visual Representation */}
                    {genType === "listeningTest" && (
                      <div className="space-y-4">
                        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-violet-200 text-violet-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            آزمون شنیداری • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-violet-950 mt-2">
                            {generationResult.parsed?.TestTitle || "آزمون شنیداری"}
                          </h4>
                          <div className="flex justify-center gap-4 mt-2 text-[10px] font-bold text-violet-700">
                            <span>تعداد سوالات: {generationResult.parsed?.NumberOfQuestions || "5"}</span>
                            <span>•</span>
                            <span>شیب سختی: {generationResult.parsed?.DifficultyCurve || "easy -> hard"}</span>
                          </div>
                        </div>

                        {generationResult.parsed?.Questions && generationResult.parsed.Questions.map((q: any, idx: number) => (
                          <div key={idx} className="border-3 border-violet-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-full -mr-16 -mt-16 -z-10" />

                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-violet-700">سوال {idx + 1} ({q.QuestionType || "چند گزینه‌ای"})</span>
                            </div>

                            <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                              <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md">
                                <Volume2 className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <span className="text-[8px] font-black text-gray-400 block">عبارت صوتی:</span>
                                <p className="text-xs font-black text-violet-950 font-mono">"{q.AudioText}"</p>
                                {q.IPA && <code className="text-[10px] bg-white border px-1.5 py-0.5 rounded text-gray-500">{q.IPA}</code>}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[9px] border-b pb-2.5 border-dashed">
                              <div><span className="text-gray-400">معمولی:</span> <span className="font-bold text-gray-600">"{q.NormalVersion || "بله"}"</span></div>
                              <div><span className="text-gray-400">آرام:</span> <span className="font-bold text-gray-600">"{q.SlowVersion || "بله"}"</span></div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[9px] font-black text-gray-400 block">صورت سوال:</span>
                              <p className="text-xs font-bold text-gray-800 bg-gray-50 p-2.5 rounded-xl border">{q.Prompt}</p>
                            </div>

                            {q.Options && (
                              <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-gray-400 block">گزینه‌ها:</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {typeof q.Options === "string" ? q.Options.split(",").map((opt: string, oIdx: number) => {
                                    const trimmedOpt = opt.trim();
                                    const isCorrect = trimmedOpt === (q.CorrectAnswer || "").trim();
                                    return (
                                      <div key={oIdx} className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                                        isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-gray-200 text-gray-700"
                                      }`}>
                                        {trimmedOpt} {isCorrect && "✅"}
                                      </div>
                                    );
                                  }) : Array.isArray(q.Options) ? q.Options.map((opt: any, oIdx: number) => {
                                    const isCorrect = opt === q.CorrectAnswer;
                                    return (
                                      <div key={oIdx} className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                                        isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-gray-200 text-gray-700"
                                      }`}>
                                        {opt} {isCorrect && "✅"}
                                      </div>
                                    );
                                  }) : null}
                                </div>
                              </div>
                            )}

                            {q.Feedback && (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                                <div className="text-2xl animate-bounce">🦖</div>
                                <div>
                                  <span className="text-[9px] font-black text-emerald-600 block">ری‌اکشن کارتونی Om Nom:</span>
                                  <span>{q.Feedback}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Gamification */}
                        <div className="bg-[#FFFDF9] border border-[#FFC542] rounded-3xl p-4 flex items-center justify-between text-xs font-bold text-amber-900">
                          <span className="text-[9px] font-black text-amber-700 uppercase flex items-center gap-1">
                            <GameIcon name="badge_medal" size={14} />
                            <span>پاداش‌های گیمیفیکیشن آزمون</span>
                          </span>
                          <div className="flex gap-2 text-[10px]">
                            <span className="flex items-center gap-1 bg-yellow-200/50 px-2.5 py-1 rounded-lg">
                              <GameIcon name="xp_orb" size={12} />
                              <span>XP Orb</span>
                            </span>
                            <span className="flex items-center gap-1 bg-orange-200/50 px-2.5 py-1 rounded-lg">
                              <GameIcon name="streak_flame" size={12} />
                              <span>Streak</span>
                            </span>
                            <span className="flex items-center gap-1 bg-yellow-300/40 px-2.5 py-1 rounded-lg">
                              <GameIcon name="badge_medal" size={12} />
                              <span>Badge Medal</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Conversation Output Visual Representation */}
                    {genType === "conversation" && (
                      <div className="space-y-4">
                        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-teal-200 text-teal-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            مکالمه روزمره • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-teal-950 mt-2">
                            {generationResult.parsed?.Title || "مکالمه دونفره"}
                          </h4>
                        </div>

                        {/* Dialogue Lines simulated Chat interface */}
                        <div className="bg-white border-3 border-teal-500 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          <span className="text-[8px] font-black text-teal-600 block uppercase tracking-wider">شبیه‌ساز مکالمه تعاملی</span>

                          <div className="space-y-3.5 max-h-[450px] overflow-y-auto p-1">
                            {generationResult.parsed?.Lines && generationResult.parsed.Lines.map((line: any, idx: number) => {
                              const isLearner = (line.Speaker || "").toLowerCase().includes("learner") || (line.Speaker || "").toLowerCase().includes("user");
                              return (
                                <div key={idx} className={`flex flex-col ${isLearner ? "items-start" : "items-end"}`}>
                                  <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-sm ${
                                    isLearner ? "bg-teal-50 border-2 border-teal-200 text-teal-950" : "bg-gray-50 border border-gray-200 text-gray-800"
                                  }`}>
                                    <div className="flex items-center justify-between gap-4 text-[9px] font-black text-teal-700">
                                      <span>{line.Speaker || "Speaker"}</span>
                                      <span className="bg-teal-100 px-1.5 py-0.5 rounded text-[8px] uppercase">
                                        {line.Emotion || "happy"}
                                      </span>
                                    </div>
                                    <p className="text-sm font-black font-mono leading-relaxed">"{line.Text}"</p>
                                    {line.IPA && <code className="text-[10px] block font-mono text-purple-700">{line.IPA}</code>}
                                    <p className="text-xs border-t pt-1 border-dashed mt-1 text-gray-500">
                                      {line.Translation}
                                    </p>
                                    {line.CartoonFeedback && (
                                      <div className="text-[9px] bg-emerald-50 text-emerald-800 p-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5 mt-2">
                                        <span>🦖</span>
                                        <span>{line.CartoonFeedback}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Gamification rewards */}
                          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 space-y-1.5 mt-3">
                            <span className="text-[9px] font-black text-teal-700 block flex items-center gap-1">
                              <GameIcon name="xp_orb" size={12} />
                              <span>جوایز تکمیل مکالمه</span>
                            </span>
                            <div className="flex flex-wrap gap-2 text-[9px] font-black text-teal-950">
                              <span className="flex items-center gap-1 bg-yellow-200/50 px-2 py-0.5 rounded-lg">
                                <GameIcon name="xp_orb" size={12} />
                                <span>XP Rewards</span>
                              </span>
                              <span className="flex items-center gap-1 bg-orange-200/50 px-2 py-0.5 rounded-lg">
                                <GameIcon name="streak_flame" size={12} />
                                <span>Streak Boost</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cartoon Story Output Visual Representation */}
                    {genType === "story" && (
                      <div className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            داستان کوتاه اوم نام • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-emerald-950 mt-2">
                            {generationResult.parsed?.Title || "داستان کارتونی"}
                          </h4>
                        </div>

                        {/* Cartoon Story narrative card */}
                        <div className="border-3 border-emerald-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 -z-10" />

                          <div className="space-y-4">
                            {generationResult.parsed?.Paragraphs && generationResult.parsed.Paragraphs.map((para: any, idx: number) => (
                              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2 relative">
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                                  {idx + 1}
                                </span>
                                <p className="text-sm font-black text-gray-800 leading-relaxed font-sans">{para.Text}</p>
                                {para.IPA && <code className="text-xs font-mono text-purple-700 block">{para.IPA}</code>}
                                <p className="text-xs text-gray-500 italic border-t border-dashed pt-1.5">{para.Translation}</p>
                                {para.CartoonFeedback && (
                                  <div className="bg-emerald-100/50 text-emerald-900 text-[10px] font-bold p-2 rounded-xl flex items-center gap-2">
                                    <span>🦖</span>
                                    <span>{para.CartoonFeedback}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Gamification */}
                          <div className="bg-[#FFFDF9] border border-[#FFC542] rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-amber-900">
                            <span className="text-[9px] font-black text-amber-700 uppercase flex items-center gap-1">
                              <GameIcon name="badge_medal" size={12} />
                              <span>جوایز گیمیفیکیشن پایان داستان</span>
                            </span>
                            <div className="flex gap-2">
                              <span className="flex items-center gap-1 bg-yellow-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="xp_orb" size={12} />
                                <span>XP Awarded</span>
                              </span>
                              <span className="flex items-center gap-1 bg-orange-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="streak_flame" size={12} />
                                <span>Streak Kept</span>
                              </span>
                              <span className="flex items-center gap-1 bg-yellow-300/40 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="badge_medal" size={12} />
                                <span>Badge Medal</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Speaking Output Visual Representation */}
                    {genType === "speaking" && (
                      <div className="space-y-4">
                        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-pink-200 text-pink-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            تلفظ و گفتار • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-pink-950 mt-2">
                            {generationResult.parsed?.Text || generationResult.parsed?.Word || "تلفظ و گفتار"}
                          </h4>
                        </div>

                        <div className="border-3 border-pink-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {generationResult.parsed?.IPA && (
                            <div className="space-y-1">
                              <span className="text-[8px] font-black text-gray-400 block uppercase tracking-wider">تلفظ آوایی (IPA)</span>
                              <code className="text-sm font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-100 block w-max">
                                {generationResult.parsed.IPA}
                              </code>
                            </div>
                          )}

                          {generationResult.parsed?.Translation && (
                            <div className="space-y-1">
                              <span className="text-[8px] font-black text-gray-400 block">ترجمه فارسی:</span>
                              <p className="text-xs font-bold text-gray-800 bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.Translation}
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                            {generationResult.parsed?.NormalPronunciation && (
                              <div className="bg-pink-50/50 border border-pink-100 rounded-xl p-3">
                                <span className="font-black text-pink-700 block">سرعت معمولی:</span>
                                <span className="text-gray-600 block">{generationResult.parsed.NormalPronunciation}</span>
                              </div>
                            )}
                            {generationResult.parsed?.SlowPronunciation && (
                              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                                <span className="font-black text-amber-700 block">سرعت آرام (Slow):</span>
                                <span className="text-gray-600 block">{generationResult.parsed.SlowPronunciation}</span>
                              </div>
                            )}
                          </div>

                          {generationResult.parsed?.MouthShapeHint && (
                            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 text-xs font-bold text-orange-800">
                              <span className="text-[9px] font-black text-orange-600 block">راهنمای تصویری حرکت دهان و لب‌ها:</span>
                              <span>{generationResult.parsed.MouthShapeHint}</span>
                            </div>
                          )}

                          {generationResult.parsed?.CartoonFeedback && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">🦕</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">ری‌اکشن کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonFeedback}</span>
                              </div>
                            </div>
                          )}

                          {/* Gamification */}
                          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-pink-900">
                            <span className="text-[9px] font-black text-pink-700 uppercase flex items-center gap-1">
                              <GameIcon name="xp_orb" size={12} />
                              <span>جوایز تکمیل گفتار</span>
                            </span>
                            <div className="flex gap-2">
                              <span className="flex items-center gap-1 bg-yellow-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="xp_orb" size={12} />
                                <span>XP Awarded</span>
                              </span>
                              <span className="flex items-center gap-1 bg-orange-200/50 px-2 py-0.5 rounded-lg text-[10px]">
                                <GameIcon name="streak_flame" size={12} />
                                <span>Streak Keep</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Boss Fight Output Visual Representation */}
                    {genType === "bossFight" && (
                      <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-red-200 text-red-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            چالش ویژه Boss Fight • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-red-950 mt-2 flex items-center justify-center gap-1.5">
                            ⚔️ {generationResult.parsed?.BossName || "رئیس چالش"}
                          </h4>
                          <p className="text-xs text-red-700 font-bold mt-1">
                            {generationResult.parsed?.Description || "نجات اوم‌نام در مقابل باس قدرتمند!"}
                          </p>
                        </div>

                        {generationResult.parsed?.Stages && generationResult.parsed.Stages.map((stage: any, idx: number) => (
                          <div key={idx} className="border-3 border-red-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 -z-10" />
                            <div className="flex items-center justify-between border-b pb-2">
                              <span className="text-xs font-black text-red-700">مرحله {idx + 1}: {stage.StageTitle || "مبارزه زنده"}</span>
                              <span className="text-[9px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">{stage.Difficulty || "سخت"}</span>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[9px] font-black text-gray-400 block">صورت سوال / مأموریت:</span>
                              <p className="text-xs font-bold text-gray-800 bg-gray-50 p-2.5 rounded-xl border">{stage.Prompt}</p>
                            </div>

                            {stage.Options && (
                              <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-gray-400 block">گزینه‌ها:</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {Array.isArray(stage.Options) ? stage.Options.map((opt: any, oIdx: number) => {
                                    const isCorrect = opt === stage.CorrectAnswer;
                                    return (
                                      <div key={oIdx} className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                                        isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-gray-200 text-gray-700"
                                      }`}>
                                        {opt} {isCorrect && "✅"}
                                      </div>
                                    );
                                  }) : null}
                                </div>
                              </div>
                            )}

                            {stage.Translation && (
                              <div className="text-[10px] bg-gray-50 border p-2.5 rounded-xl font-bold">
                                <span className="text-gray-400">ترجمه کمکی:</span> <span className="text-gray-700">"{stage.Translation}"</span>
                              </div>
                            )}

                            {stage.BossReaction && (
                              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-800">
                                <span className="text-[9px] font-black text-red-600 block">واکنش باس فایت:</span>
                                <span>{stage.BossReaction}</span>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Gamification */}
                        <div className="bg-[#FFFDF9] border border-[#FFC542] rounded-3xl p-4 flex items-center justify-between text-xs font-bold text-amber-900">
                          <span className="text-[9px] font-black text-amber-700 uppercase flex items-center gap-1">
                            <GameIcon name="badge_medal" size={14} />
                            <span>نشان ویژه و پاداش‌های Boss Fight</span>
                          </span>
                          <div className="flex gap-2 text-[10px]">
                            <span className="flex items-center gap-1 bg-yellow-200/50 px-2.5 py-1 rounded-lg">
                              <GameIcon name="xp_orb" size={12} />
                              <span>{generationResult.parsed?.XPReward || "100"} XP</span>
                            </span>
                            <span className="flex items-center gap-1 bg-yellow-300/40 px-2.5 py-1 rounded-lg">
                              <GameIcon name="badge_medal" size={12} />
                              <span>نشان {generationResult.parsed?.BadgeName || "حماسی"}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reading & Comprehension Output Visual Representation */}
                    {genType === "reading" && (
                      <div className="space-y-4">
                        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-sky-200 text-sky-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            درک مطلب و خواندن • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-sky-950 mt-2">
                            📖 {generationResult.parsed?.StoryTitle || "عنوان متن خواندنی"}
                          </h4>
                        </div>

                        <div className="border-3 border-sky-500 rounded-3xl p-5 bg-white space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 -z-10" />

                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-sky-700 block uppercase">متن خواندنی (Reading Text):</span>
                            <p className="text-sm font-black text-gray-800 leading-relaxed font-sans bg-gray-50 border p-4 rounded-2xl">{generationResult.parsed?.Text || generationResult.parsed?.StoryText}</p>
                          </div>

                          {generationResult.parsed?.Translation && (
                            <div className="space-y-1">
                              <span className="text-[9px] font-black text-gray-400 block">ترجمه روان فارسی:</span>
                              <p className="text-xs font-semibold text-gray-600 leading-relaxed">{generationResult.parsed.Translation}</p>
                            </div>
                          )}

                          {generationResult.parsed?.VocabularyList && (
                            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[10px] font-black text-sky-700 block">واژگان مهم درس (Vocabulary):</span>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                {Array.isArray(generationResult.parsed.VocabularyList) && generationResult.parsed.VocabularyList.map((item: any, idx: number) => (
                                  <div key={idx} className="bg-white border p-2 rounded-xl">
                                    <strong className="text-sky-900 font-mono">{item.Word}</strong>
                                    <span className="text-gray-400 font-bold mx-1">({item.IPA})</span>: <span className="text-gray-600">{item.Translation}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {generationResult.parsed?.Questions && generationResult.parsed.Questions.map((q: any, idx: number) => (
                            <div key={idx} className="bg-gray-50 border rounded-2xl p-4 space-y-3">
                              <span className="text-[10px] font-black text-sky-600 block">سوال درک مطلب {idx + 1}:</span>
                              <p className="text-xs font-black text-gray-800">{q.QuestionText || q.Prompt}</p>

                              {q.Options && (
                                <div className="grid grid-cols-2 gap-2">
                                  {Array.isArray(q.Options) ? q.Options.map((opt: any, oIdx: number) => {
                                    const isCorrect = opt === q.CorrectAnswer;
                                    return (
                                      <div key={oIdx} className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                                        isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-gray-200 text-gray-700"
                                      }`}>
                                        {opt} {isCorrect && "✅"}
                                      </div>
                                    );
                                  }) : null}
                                </div>
                              )}

                              {q.Explanation && (
                                <p className="text-[10px] text-gray-400 font-bold border-t pt-1.5 border-dashed">{q.Explanation}</p>
                              )}
                            </div>
                          ))}

                          {generationResult.parsed?.CartoonFeedback && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">🦕</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">ری‌اکشن کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonFeedback}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* A1 Final Exam Output Visual Representation */}
                    {genType === "a1FinalExam" && (
                      <div className="space-y-4">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-indigo-200 text-indigo-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            آزمون پایانی جامع سطح A1
                          </span>
                          <h4 className="font-display font-black text-lg text-indigo-950 mt-2 flex items-center justify-center gap-1.5">
                            🎓 سنجش نهایی و فارغ‌التحصیلی!
                          </h4>
                          <p className="text-xs text-indigo-700 font-bold mt-1">
                            یک مینی‌آزمون چندمهارتی برای سنجش تمام یادگیری‌ها
                          </p>
                        </div>

                        {generationResult.parsed && Object.entries(generationResult.parsed).map(([secName, content]: any, idx: number) => {
                          if (secName === "Rewards" || secName === "Gamification") {
                            return (
                              <div key={idx} className="bg-[#FFFDF9] border border-[#FFC542] rounded-3xl p-4 space-y-2">
                                <span className="text-[10px] font-black text-amber-700 uppercase flex items-center gap-1">
                                  <GameIcon name="badge_medal" size={14} />
                                  <span>پاداش‌های اتمام موفقیت‌آمیز آزمون A1</span>
                                </span>
                                <div className="text-xs font-bold text-amber-900 bg-white p-3 rounded-xl border border-amber-100">
                                  {typeof content === "object" ? JSON.stringify(content, null, 2) : String(content)}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div key={idx} className="border-3 border-indigo-500 rounded-3xl p-5 bg-white space-y-3 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 -z-10" />
                              <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-xs font-black text-indigo-700">بخش {idx + 1}: {secName.replace(/_/g, " ")}</span>
                              </div>
                              <div className="text-xs font-mono text-gray-700 bg-gray-50 p-3.5 rounded-2xl border leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                {typeof content === "object" ? JSON.stringify(content, null, 2) : String(content)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Adaptive Learning Path Output Visual Representation */}
                    {genType === "adaptiveLearningPath" && (
                      <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-amber-200 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            مسیر یادگیری شخصی‌سازی شده (Adaptive Path)
                          </span>
                          <h4 className="font-display font-black text-lg text-amber-950 mt-2 flex items-center justify-center gap-1.5">
                            ⚡ مسیر پیشرفت هوشمند بر اساس عملکرد شما
                          </h4>
                          <p className="text-xs text-amber-700 font-bold mt-1">
                            بهینه‌سازی نقاط ضعف با محتوای تعاملی خرد
                          </p>
                        </div>

                        {generationResult.parsed && Object.entries(generationResult.parsed).map(([section, content]: any, idx: number) => {
                          const isCEFR = section === "CEFR_Level";
                          const isSkill = section === "NextSkill";
                          const isGami = section === "Gamification" || section === "Rewards";
                          
                          if (isCEFR || isSkill) {
                            return (
                              <div key={idx} className="bg-white border rounded-2xl p-3 flex items-center justify-between text-xs font-bold shadow-sm">
                                <span className="text-gray-500">{section}:</span>
                                <span className="text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">{String(content)}</span>
                              </div>
                            );
                          }
                          
                          if (isGami) {
                            return (
                              <div key={idx} className="bg-[#FFFDF9] border border-[#FFC542] rounded-3xl p-4 flex items-center justify-between text-xs font-bold text-amber-900">
                                <span className="text-[10px] font-black text-amber-700 uppercase flex items-center gap-1">
                                  <GameIcon name="xp_orb" size={14} />
                                  <span>جوایز مسیر انطباقی پیشنهادی</span>
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border">
                                  {typeof content === "object" ? JSON.stringify(content, null, 2) : String(content)}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div key={idx} className="border-3 border-amber-500 rounded-3xl p-5 bg-white space-y-3 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 -z-10" />
                              <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-xs font-black text-amber-700">{section}</span>
                              </div>
                              <div className="text-xs font-mono text-gray-700 bg-gray-50 p-3.5 rounded-2xl border leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                {typeof content === "object" ? JSON.stringify(content, null, 2) : String(content)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Cutscene Dialogue Output Visual Representation */}
                    {genType === "cutsceneDialog" && (
                      <div className="space-y-4">
                        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-teal-200 text-teal-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            کات‌سین داستانی اوم‌نام • {generationResult.parsed?.Title || "بدون عنوان"}
                          </span>
                          <h4 className="font-display font-black text-lg text-teal-950 mt-2 flex items-center justify-center gap-1.5">
                            🎬 دیالوگ‌های پرتحرک و عاطفی Om Nom
                          </h4>
                        </div>

                        {generationResult.parsed?.Lines && Array.isArray(generationResult.parsed.Lines) && generationResult.parsed.Lines.map((line: any, idx: number) => {
                          const isOmNom = line.Speaker?.toLowerCase().includes("om nom") || line.Speaker?.toLowerCase().includes("اوم نام") || line.speaker?.toLowerCase().includes("om nom") || line.speaker?.toLowerCase().includes("اوم نام");
                          const speakerName = line.Speaker || line.speaker || "شخصیت";
                          const lineText = line.Text || line.text || "";
                          const emotionName = line.Emotion || line.emotion || "";
                          const feedbackText = line.CartoonFeedback || line.cartoonFeedback || "";
                          const iconName = line.Icon || line.icon || "";
                          return (
                            <div key={idx} className={`border-3 rounded-3xl p-5 bg-white space-y-3 relative overflow-hidden transition-all ${
                              isOmNom ? "border-emerald-500 bg-emerald-50/10" : "border-teal-500"
                            }`}>
                              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/20 rounded-full -mr-16 -mt-16 -z-10" />
                              <div className="flex items-center justify-between border-b pb-2">
                                <span className={`text-xs font-black ${isOmNom ? "text-emerald-700" : "text-teal-700"}`}>
                                  {isOmNom ? "🦖" : "👤"} {speakerName}
                                </span>
                                {emotionName && (
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    isOmNom ? "bg-emerald-100 text-emerald-800" : "bg-teal-100 text-teal-800"
                                  }`}>
                                    احساس: {emotionName}
                                  </span>
                                )}
                              </div>

                              <p className="text-sm font-black text-gray-800 leading-relaxed font-sans bg-white border p-3.5 rounded-2xl shadow-sm">
                                {lineText}
                              </p>

                              {feedbackText && (
                                <div className="text-[11px] font-bold text-gray-500 bg-gray-50 p-2.5 rounded-xl border flex items-center gap-2">
                                  <span>🎨 ری‌اکشن:</span>
                                  <span className="text-gray-700">"{feedbackText}"</span>
                                </div>
                              )}

                              {iconName && (
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                  <span>آیکون متصل:</span>
                                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-mono">{iconName}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Mini-Game Output Visual Representation */}
                    {genType === "miniGame" && (
                      <div className="space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            CEFR {generationResult.parsed?.CEFR_Level || simCefr} • مینی‌گیم هوشمند
                          </span>
                          <h4 className="font-display font-black text-lg text-emerald-950 mt-2 flex items-center justify-center gap-1.5">
                            🎮 {generationResult.parsed?.Title || "بدون عنوان"}
                          </h4>
                        </div>

                        <div className="bg-white border-3 border-emerald-500 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {generationResult.parsed?.Objective && (
                            <div>
                              <span className="text-[9px] font-black text-emerald-600 block uppercase">هدف یادگیری مینی‌گیم:</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.Objective}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.Mechanics && (
                            <div>
                              <span className="text-[9px] font-black text-emerald-600 block uppercase">مکانیک بازی (Mechanics):</span>
                              <p className="text-xs font-semibold text-gray-600 leading-relaxed bg-emerald-50/10 p-2.5 rounded-xl border border-dashed border-emerald-200">
                                {generationResult.parsed.Mechanics}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.Rounds && Array.isArray(generationResult.parsed.Rounds) && (
                            <div className="space-y-3">
                              <span className="text-[10px] font-black text-emerald-700 block">مراحل و دورهای بازی (Game Rounds):</span>
                              {generationResult.parsed.Rounds.map((round: any, rIdx: number) => (
                                <div key={rIdx} className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 space-y-3">
                                  <div className="flex items-center justify-between border-b pb-1.5">
                                    <span className="text-xs font-black text-emerald-700">راند {round.roundNumber || rIdx + 1}</span>
                                    {round.correctAnswer && (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                        پاسخ صحیح: {round.correctAnswer}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-black text-gray-800 bg-white p-2.5 rounded-xl border shadow-sm">
                                    {round.prompt}
                                  </p>

                                  {round.options && Array.isArray(round.options) && round.options.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2">
                                      {round.options.map((opt: any, oIdx: number) => {
                                        const isCorrect = opt === round.correctAnswer;
                                        return (
                                          <div key={oIdx} className={`p-2 rounded-xl border-2 font-bold text-[10px] transition-all text-center ${
                                            isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-gray-200 text-gray-700"
                                          }`}>
                                            {opt} {isCorrect && "✅"}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {round.cartoonFeedback && (
                                    <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1.5">
                                      <span>🎨 بازخورد اوم‌نام:</span>
                                      <span className="text-gray-700 font-semibold">"{round.cartoonFeedback}"</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {generationResult.parsed?.Rewards && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-emerald-950 mt-4">
                              <span className="text-[9px] font-black text-emerald-700 uppercase flex items-center gap-1">
                                <GameIcon name="xp_orb" size={14} />
                                <span>جوایز گیمیفیکیشن مینی‌گیم</span>
                              </span>
                              <div className="flex gap-2">
                                <span className="flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-lg text-[10px] text-emerald-800">
                                  <GameIcon name="xp_orb" size={12} />
                                  <span>{generationResult.parsed.Rewards}</span>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Daily Mission Output Visual Representation */}
                    {genType === "dailyMission" && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            مأموریت روزانه ویژه • CEFR {generationResult.parsed?.CEFR_Level || simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-purple-950 mt-2 flex items-center justify-center gap-1.5">
                            🎯 {generationResult.parsed?.Title || "ماموریت روزانه پویای اوم نام"}
                          </h4>
                        </div>

                        <div className="bg-white border-3 border-purple-500 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {generationResult.parsed?.Objective && (
                            <div>
                              <span className="text-[9px] font-black text-purple-600 block uppercase">هدف مأموریت (Objective):</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.Objective}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.Steps && (
                            <div>
                              <span className="text-[9px] font-black text-purple-600 block uppercase">گام‌های اجرایی مأموریت (Steps):</span>
                              <div className="text-xs font-semibold text-gray-700 leading-relaxed bg-purple-50/10 p-3 rounded-xl border border-dashed border-purple-200 whitespace-pre-wrap">
                                {generationResult.parsed.Steps}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                            {generationResult.parsed?.EstimatedTime && (
                              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <span className="font-black text-amber-700 block">زمان تخمینی:</span>
                                <span className="text-gray-600 block">{generationResult.parsed.EstimatedTime}</span>
                              </div>
                            )}

                            {generationResult.parsed?.Rewards && (
                              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                                <span className="font-black text-purple-700 block">پاداش‌های مأموریت:</span>
                                <span className="text-gray-600 block flex items-center gap-1 mt-0.5 font-mono">
                                  <GameIcon name="xp_orb" size={12} />
                                  <span>{generationResult.parsed.Rewards}</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {generationResult.parsed?.CartoonMotivation && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">😋</div>
                              <div>
                                <span className="text-[9px] font-black text-emerald-600 block">انگیزه کارتونی Om Nom:</span>
                                <span>{generationResult.parsed.CartoonMotivation}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Evolution System Output Visual Representation */}
                    {genType === "evolutionSystem" && (
                      <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-amber-200 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            سیستم تکامل اوم نام • CEFR {simCefr}
                          </span>
                          <h4 className="font-display font-black text-lg text-amber-950 mt-2 flex items-center justify-center gap-1.5">
                            🧬 {generationResult.parsed?.StageName || "مرحله تکاملی جدید"}
                          </h4>
                        </div>

                        <div className="bg-white border-3 border-amber-500 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {generationResult.parsed?.VisualDescription && (
                            <div>
                              <span className="text-[9px] font-black text-amber-600 block uppercase">توصیف ظاهری کارتونی:</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.VisualDescription}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.PersonalityTraits && (
                            <div>
                              <span className="text-[9px] font-black text-amber-600 block uppercase">ویژگی‌های شخصیتی (Traits):</span>
                              <p className="text-xs font-semibold text-gray-700 leading-relaxed bg-amber-50/10 p-2.5 rounded-xl border border-dashed border-amber-200">
                                {generationResult.parsed.PersonalityTraits}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.Abilities && (
                            <div>
                              <span className="text-[9px] font-black text-amber-600 block uppercase">توانایی‌ها و واکنش‌های انگیزشی:</span>
                              <p className="text-xs font-semibold text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.Abilities}
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                            {generationResult.parsed?.UnlockCondition && (
                              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                <span className="font-black text-blue-700 block">شرط بازگشایی (Unlock):</span>
                                <span className="text-gray-600 block mt-0.5">{generationResult.parsed.UnlockCondition}</span>
                              </div>
                            )}

                            {generationResult.parsed?.Rewards && (
                              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <span className="font-black text-amber-700 block">جوایز تکامل:</span>
                                <span className="text-gray-600 block flex items-center gap-1 mt-0.5 font-mono">
                                  <GameIcon name="xp_orb" size={12} />
                                  <span>{generationResult.parsed.Rewards}</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {generationResult.parsed?.CutsceneIntro && (
                            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-xs">
                              <span className="text-[9px] font-black text-violet-700 block uppercase mb-1">🎬 کات‌سین شروع (Intro Cutscene):</span>
                              <p className="text-gray-700 leading-relaxed font-semibold">{generationResult.parsed.CutsceneIntro}</p>
                            </div>
                          )}

                          {generationResult.parsed?.CutsceneOutro && (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-xs">
                              <span className="text-[9px] font-black text-emerald-700 block uppercase mb-1">🎉 کات‌سین پایان (Outro Cutscene):</span>
                              <p className="text-gray-700 leading-relaxed font-semibold">{generationResult.parsed.CutsceneOutro}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Special Power Output Visual Representation */}
                    {genType === "specialPower" && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
                          <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2.5 py-1 rounded-full uppercase">
                            قدرت ویژه اوم نام • {generationResult.parsed?.Category || "دسته‌بندی جدید"} • سطح {generationResult.parsed?.PowerLevel || "1"}
                          </span>
                          <h4 className="font-display font-black text-lg text-rose-950 mt-2 flex items-center justify-center gap-1.5">
                            🔥 {generationResult.parsed?.PowerName || "قدرت ویژه جدید"}
                          </h4>
                        </div>

                        <div className="bg-white border-3 border-rose-500 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 -z-10" />

                          {generationResult.parsed?.VisualDescription && (
                            <div>
                              <span className="text-[9px] font-black text-rose-600 block uppercase">توصیف ظاهری کارتونی (Visual):</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-xl border">
                                {generationResult.parsed.VisualDescription}
                              </p>
                            </div>
                          )}

                          {generationResult.parsed?.AbilityDescription && (
                            <div>
                              <span className="text-[9px] font-black text-rose-600 block uppercase">قابلیت ویژه (Ability):</span>
                              <p className="text-xs font-semibold text-gray-700 leading-relaxed bg-rose-50/10 p-2.5 rounded-xl border border-dashed border-rose-200">
                                {generationResult.parsed.AbilityDescription}
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                            {generationResult.parsed?.UnlockCondition && (
                              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                <span className="font-black text-blue-700 block">شرط بازگشایی (Unlock):</span>
                                <span className="text-gray-600 block mt-0.5">{generationResult.parsed.UnlockCondition}</span>
                              </div>
                            )}

                            {generationResult.parsed?.Duration && (
                              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <span className="font-black text-amber-700 block">زمان ماندگاری (Duration):</span>
                                <span className="text-gray-600 block mt-0.5">{generationResult.parsed.Duration}</span>
                              </div>
                            )}

                            {generationResult.parsed?.Cooldown && (
                              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                                <span className="font-black text-purple-700 block">زمان خنک‌شدن (Cooldown):</span>
                                <span className="text-gray-600 block mt-0.5">{generationResult.parsed.Cooldown}</span>
                              </div>
                            )}

                            {generationResult.parsed?.Rewards && (
                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                                <span className="font-black text-emerald-700 block">جوایز کسب قدرت:</span>
                                <span className="text-gray-600 block flex items-center gap-1 mt-0.5 font-mono">
                                  <GameIcon name="xp_orb" size={12} />
                                  <span>{generationResult.parsed.Rewards}</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {generationResult.parsed?.CartoonReaction && (
                            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 text-xs font-bold text-rose-800 flex items-center gap-3">
                              <div className="text-2xl animate-bounce">🐸</div>
                              <div>
                                <span className="text-[9px] font-black text-rose-600 block">عکس‌العمل اوم نام (Cartoon Reaction):</span>
                                <span>{generationResult.parsed.CartoonReaction}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cinematic Level-Up Output Visual Representation */}
                    {genType === "cinematicLevelUp" && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl p-4 text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600" />
                          <span className="text-[10px] bg-fuchsia-200 text-fuchsia-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            🎬 سناریوی سینماتیک ارتقا • سطح {generationResult.parsed?.LevelNumber || "جدید"}
                          </span>
                          <h4 className="font-display font-black text-xl text-fuchsia-950 mt-3 flex items-center justify-center gap-2">
                            ✨ {generationResult.parsed?.CinematicTitle || "عنوان ارتقا"} ✨
                          </h4>
                          <p className="text-xs font-bold text-fuchsia-700/80 mt-1">حس و حال: {generationResult.parsed?.Mood || "جذاب و شاد"}</p>
                        </div>

                        <div className="bg-white border-3 border-fuchsia-500 rounded-3xl p-6 space-y-5 relative overflow-hidden">
                          {/* Decorative Background Glows */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-100/50 rounded-full -mr-16 -mt-16 -z-10 blur-xl" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100/50 rounded-full -ml-16 -mb-16 -z-10 blur-xl" />

                          {/* Setting Description */}
                          {generationResult.parsed?.SettingDescription && (
                            <div className="bg-gradient-to-br from-fuchsia-50/50 to-indigo-50/50 border border-fuchsia-100 rounded-2xl p-4">
                              <span className="text-[10px] font-black text-fuchsia-700 block uppercase mb-1">🌍 محیط و صحنه فانتزی (Setting):</span>
                              <p className="text-xs font-bold text-gray-700 leading-relaxed">
                                {generationResult.parsed.SettingDescription}
                              </p>
                            </div>
                          )}

                          {/* Dialog Timeline */}
                          {generationResult.parsed?.Dialog && Array.isArray(generationResult.parsed.Dialog) && (
                            <div className="space-y-3.5">
                              <span className="text-[10px] font-black text-fuchsia-700 block uppercase">💬 دیالوگ‌های پر فراز و نشیب کارتونی (Emotional Dialogs):</span>
                              <div className="relative border-r-2 border-dashed border-fuchsia-200 pr-5 mr-3 space-y-4">
                                {generationResult.parsed.Dialog.map((line: any, idx: number) => {
                                  const isOmNom = line.Speaker?.toLowerCase().includes("nom") || line.Speaker?.includes("نام");
                                  return (
                                    <div key={idx} className="relative animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                                      {/* Timeline Marker */}
                                      <div className={`absolute -right-[27px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[9px] ${
                                        isOmNom ? "bg-emerald-500" : "bg-fuchsia-500"
                                      }`}>
                                        {isOmNom ? "🐸" : "👤"}
                                      </div>

                                      <div className={`rounded-2xl p-3 text-xs shadow-sm border-2 ${
                                        isOmNom 
                                          ? "bg-emerald-50/60 border-emerald-100 text-emerald-950" 
                                          : "bg-fuchsia-50/40 border-fuchsia-100 text-fuchsia-950"
                                      }`}>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-extrabold text-[11px] flex items-center gap-1.5">
                                            {line.Speaker}
                                            <span className="text-[9px] font-bold opacity-60 bg-white border px-1.5 py-0.2 rounded-full">
                                              {line.Emotion}
                                            </span>
                                          </span>
                                          {line.Icon && (
                                            <div className="bg-white px-2 py-0.5 rounded-full border shadow-sm flex items-center gap-1 scale-90">
                                              <GameIcon name={line.Icon} size={13} />
                                              <span className="text-[8px] font-mono font-bold text-gray-500">{line.Icon}</span>
                                            </div>
                                          )}
                                        </div>
                                        <p className="font-semibold text-gray-800 leading-relaxed pr-1">{line.Text}</p>
                                        
                                        {line.CartoonFeedback && (
                                          <div className="mt-1.5 pt-1.5 border-t border-dashed border-black/5 text-[10px] text-gray-500 font-bold flex items-center gap-1">
                                            <span>🎬 عکس‌العمل اوم نام:</span>
                                            <span className="text-gray-700">{line.CartoonFeedback}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Details grid */}
                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                            {generationResult.parsed?.EmotionalArc && (
                              <div className="bg-pink-50 border border-pink-100 rounded-xl p-3 col-span-2">
                                <span className="font-black text-pink-700 block">📈 منحنی تکامل احساسات (Emotional Arc):</span>
                                <span className="text-gray-700 block mt-1 leading-relaxed">{generationResult.parsed.EmotionalArc}</span>
                              </div>
                            )}

                            {generationResult.parsed?.VisualElements && (
                              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                                <span className="font-black text-indigo-700 block">✨ جلوه‌های بصری و افکت‌ها (Visual FX):</span>
                                <span className="text-gray-700 block mt-1 leading-relaxed">{generationResult.parsed.VisualElements}</span>
                              </div>
                            )}

                            {generationResult.parsed?.CartoonReactions && (
                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                                <span className="font-black text-emerald-700 block">🐸 واکنش ویژه اوم‌نام (Om Nom Style):</span>
                                <span className="text-gray-700 block mt-1 leading-relaxed">{generationResult.parsed.CartoonReactions}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Game Economy Output Visual Representation */}
                    {genType === "gameEconomy" && (
                      <div className="space-y-6 animate-fadeIn text-right" dir="rtl">
                        {/* Header Banner */}
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
                          <span className="text-[10px] bg-amber-200 text-amber-950 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            🪙 مدیریت اقتصاد بازی • سطح {simEconomyCefr}
                          </span>
                          <h4 className="font-display font-black text-xl text-amber-950 mt-3 flex items-center justify-center gap-2">
                            💰 ساختار اقتصادی و توازن «اوم نام» 💰
                          </h4>
                          <p className="text-xs font-bold text-amber-800/80 mt-1">تمرکز: {simEconomyCategory}</p>
                        </div>

                        {/* Currencies Section */}
                        {generationResult.parsed?.Currencies && generationResult.parsed.Currencies.length > 0 && (
                          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 space-y-3.5">
                            <h5 className="font-display font-black text-sm text-amber-950 flex items-center gap-1.5 border-b pb-2">
                              <Coins className="w-5 h-5 text-amber-500" />
                              ارزهای بازی (Currencies)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {generationResult.parsed.Currencies.map((currency: any, idx: number) => (
                                <div key={idx} className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-extrabold text-xs text-amber-900">{currency.Name}</span>
                                      <span className="text-[9px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-bold">{currency.Type}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 font-bold leading-relaxed">{currency.Usage}</p>
                                  </div>
                                  <div className="mt-3 pt-2 border-t border-dashed border-amber-100 flex items-center justify-between text-[10px] font-bold text-gray-500">
                                    <span>ارزش پایه:</span>
                                    <span className="font-mono text-amber-700">{currency.BaseValue}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Earnable Sources Section */}
                        {generationResult.parsed?.EarnableSources && generationResult.parsed.EarnableSources.length > 0 && (
                          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 space-y-3.5">
                            <h5 className="font-display font-black text-sm text-emerald-950 flex items-center gap-1.5 border-b pb-2">
                              <Sparkles className="w-5 h-5 text-emerald-500" />
                              منابع کسب پاداش و ارز (Earnable Sources)
                            </h5>
                            <div className="grid grid-cols-1 gap-2.5">
                              {generationResult.parsed.EarnableSources.map((source: any, idx: number) => (
                                <div key={idx} className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex items-start gap-3">
                                  <div className="w-8 h-8 bg-emerald-100 border border-emerald-200 rounded-lg flex items-center justify-center text-lg shrink-0">
                                    🎁
                                  </div>
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                      <span className="font-extrabold text-xs text-emerald-900">{source.SourceName}</span>
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded-full font-mono font-bold">
                                        {source.BaseReward}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-bold leading-relaxed">{source.Description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Spendable Store Items Section */}
                        {generationResult.parsed?.SpendableItems && generationResult.parsed.SpendableItems.length > 0 && (
                          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 space-y-3.5">
                            <h5 className="font-display font-black text-sm text-indigo-950 flex items-center gap-1.5 border-b pb-2">
                              <Award className="w-5 h-5 text-indigo-500" />
                              آیتم‌های خریدنی فروشگاه (Spendable Items)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {generationResult.parsed.SpendableItems.map((item: any, idx: number) => (
                                <div key={idx} className="bg-gradient-to-br from-indigo-50/40 to-purple-50/40 border border-indigo-100 rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden">
                                  <div className="absolute top-1 left-1 opacity-10">
                                    <Coins className="w-16 h-16 text-indigo-600" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="font-black text-xs text-indigo-950 flex items-center gap-1.5">
                                        {item.Icon && <GameIcon name={item.Icon} size={14} />}
                                        {item.ItemName}
                                      </span>
                                      <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                                        {item.ItemType}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-bold leading-relaxed">{item.Ability}</p>
                                    <div className="text-[9px] text-indigo-600 font-bold">
                                      🔒 شرط بازگشایی: <span className="text-gray-700">{item.UnlockCondition}</span>
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-dashed border-indigo-100 flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-1">
                                      <span className="text-amber-500">🪙</span>
                                      <span className="font-mono text-indigo-950">{item.Cost}</span>
                                    </div>
                                    {item.CartoonReaction && (
                                      <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                                        🐸 {item.CartoonReaction}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Balancing & Scaling Column Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Balancing Rules */}
                          {generationResult.parsed?.BalancingRules && generationResult.parsed.BalancingRules.length > 0 && (
                            <div className="bg-white border-2 border-rose-200 rounded-3xl p-5 space-y-3">
                              <h5 className="font-display font-black text-sm text-rose-950 flex items-center gap-1.5 border-b pb-2">
                                <AlertCircle className="w-5 h-5 text-rose-500" />
                                قوانین توازن اقتصاد (Balancing Rules)
                              </h5>
                              <ul className="space-y-2 text-[11px] font-bold text-gray-700 leading-relaxed list-disc pr-4">
                                {generationResult.parsed.BalancingRules.map((rule: string, idx: number) => (
                                  <li key={idx} className="hover:text-rose-900 transition-colors">
                                    {rule}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Progression Scaling */}
                          {generationResult.parsed?.ProgressionScaling && generationResult.parsed.ProgressionScaling.length > 0 && (
                            <div className="bg-white border-2 border-sky-200 rounded-3xl p-5 space-y-3">
                              <h5 className="font-display font-black text-sm text-sky-950 flex items-center gap-1.5 border-b pb-2">
                                <Zap className="w-5 h-5 text-sky-500" />
                                درجه‌بندی پیشرفت CEFR (Scaling)
                              </h5>
                              <div className="space-y-2">
                                {generationResult.parsed.ProgressionScaling.map((scale: any, idx: number) => (
                                  <div key={idx} className="bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 flex items-center justify-between text-[10px] font-bold">
                                    <span className="bg-sky-200 text-sky-950 px-2 py-0.5 rounded-lg">{scale.CEFR}</span>
                                    <span className="text-gray-700">{scale.Pacing}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Events Section */}
                        {generationResult.parsed?.Events && generationResult.parsed.Events.length > 0 && (
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-3xl p-5 space-y-3">
                            <h5 className="font-display font-black text-sm text-orange-950 flex items-center gap-1.5 border-b pb-2 border-orange-200">
                              <Flame className="w-5 h-5 text-orange-500" />
                              رویدادهای اقتصادی فصلی و دوره‌ای (Events)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {generationResult.parsed.Events.map((evt: any, idx: number) => (
                                <div key={idx} className="bg-white/80 border border-orange-100 rounded-xl p-3 flex items-center justify-between text-xs font-bold shadow-sm">
                                  <span className="text-orange-950">{evt.EventName}</span>
                                  <span className="text-[10px] bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full">
                                    {evt.Bonus}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collectibles System Output Visual Representation */}
                    {genType === "collectiblesSystem" && (
                      <div className="space-y-6 animate-fadeIn text-right" dir="rtl">
                        {/* Header Banner */}
                        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600" />
                          <span className="text-[10px] bg-rose-200 text-rose-950 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            💎 سیستم کالکتیبل‌ها • شبیه‌سازی زنده 💎
                          </span>
                          <h4 className="font-display font-black text-xl text-rose-950 mt-3 flex items-center justify-center gap-2">
                            🎁 آیتم‌های جمع‌کردنی و جوایز «اوم نام» 🎁
                          </h4>
                          <p className="text-xs font-bold text-rose-800/80 mt-1">
                            دسته‌بندی: {simCollectibleCategory} • کمیابی: {simCollectibleRarity}
                          </p>
                        </div>

                        {/* Collectible Items Grid */}
                        {generationResult.parsed?.CollectibleItems && generationResult.parsed.CollectibleItems.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {generationResult.parsed.CollectibleItems.map((item: any, idx: number) => {
                              const rarityLower = (item.Rarity || "").toLowerCase();
                              let rarityBg = "from-slate-50 to-gray-50 border-gray-200 text-gray-700 bg-gray-50";
                              let rarityLabel = "معمولی";
                              let rarityBadgeColor = "bg-gray-100 text-gray-800 border-gray-200";

                              if (rarityLower.includes("legendary")) {
                                rarityBg = "from-amber-50 to-yellow-100/60 border-amber-300 text-amber-950 bg-amber-50";
                                rarityLabel = "🏆 افسانه‌ای (Legendary)";
                                rarityBadgeColor = "bg-amber-200 text-amber-950 border-amber-300";
                              } else if (rarityLower.includes("epic")) {
                                rarityBg = "from-purple-50 to-fuchsia-100/60 border-purple-300 text-purple-950 bg-purple-50";
                                rarityLabel = "🔮 حماسی (Epic)";
                                rarityBadgeColor = "bg-purple-200 text-purple-950 border-purple-300";
                              } else if (rarityLower.includes("rare")) {
                                rarityBg = "from-blue-50 to-indigo-100/60 border-blue-300 text-blue-950 bg-blue-50";
                                rarityLabel = "⭐ کمیاب (Rare)";
                                rarityBadgeColor = "bg-blue-200 text-blue-950 border-blue-300";
                              } else {
                                rarityBg = "from-emerald-50 to-teal-50/60 border-emerald-200 text-emerald-950 bg-emerald-50";
                                rarityLabel = "🍃 معمولی (Common)";
                                rarityBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                              }

                              return (
                                <div
                                  key={idx}
                                  className={`bg-gradient-to-br ${rarityBg} border-2 rounded-3xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-md`}
                                >
                                  {/* Rarity Tag */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] bg-white/80 border px-2.5 py-0.5 rounded-full font-bold">
                                      📁 {item.Category}
                                    </span>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black border ${rarityBadgeColor}`}>
                                      {rarityLabel}
                                    </span>
                                  </div>

                                  {/* Collectible Icon & Name */}
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-white/90 border-2 border-rose-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm relative">
                                      {item.Icon && <GameIcon name={item.Icon} size={24} />}
                                      <div className="absolute -bottom-1 -right-1 text-[10px]">🎁</div>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="font-display font-black text-sm text-[#3C3C3C]">
                                        {item.CollectibleName || item.Name}
                                      </h5>
                                      <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                                        {item.VisualDescription}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Unlock condition & Ability effects */}
                                  <div className="bg-white/60 rounded-2xl p-3 space-y-2 border border-white/40">
                                    <div className="text-[10px] text-gray-700 font-bold">
                                      🔑 <span className="text-gray-500">شرط بازگشایی:</span> <span className="text-rose-950 font-black">{item.UnlockCondition}</span>
                                    </div>
                                    {item.AbilityEffect && (
                                      <div className="text-[10px] text-[#FF8A00] font-black">
                                        ⚡ <span className="text-gray-500">قابلیت فعال:</span> {item.AbilityEffect}
                                      </div>
                                    )}
                                  </div>

                                  {/* Om Nom reaction */}
                                  {item.CartoonReaction && (
                                    <div className="pt-2 border-t border-dashed border-rose-200 flex items-center justify-between text-[10px] font-bold text-emerald-800 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
                                      <span>🐸 عکس‌العمل اوم‌نام:</span>
                                      <span className="font-extrabold">{item.CartoonReaction}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="bg-white border-2 border-rose-100 rounded-3xl p-10 text-center text-gray-400 font-bold text-xs">
                            هیچ کالکتیبلی یافت نشد. دکمه تولید کالکتیبل‌ها را مجدداً فشار دهید.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Shop System Output Visual Representation */}
                    {genType === "shopSystem" && (
                      <div className="space-y-6 animate-fadeIn text-right" dir="rtl">
                        {/* Header Banner */}
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
                          <span className="text-[10px] bg-emerald-200 text-emerald-950 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            🛒 فروشگاه درون‌بازی چرخشی • شبیه‌سازی زنده 🛒
                          </span>
                          <h4 className="font-display font-black text-xl text-emerald-950 mt-3 flex items-center justify-center gap-2">
                            🍭 آیتم‌های تزیینی، بوسترها و نیروهای «اوم نام» 🍭
                          </h4>
                          <p className="text-xs font-bold text-emerald-800/80 mt-1">
                            دسته‌بندی: {simShopCategory} • مدل چرخش: {simShopRotation}
                          </p>
                        </div>

                        {/* Shop Items Grid */}
                        {generationResult.parsed?.ShopItems && generationResult.parsed.ShopItems.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {generationResult.parsed.ShopItems.map((item: any, idx: number) => {
                              const rarityLower = (item.Rarity || "").toLowerCase();
                              let rarityBg = "from-slate-50 to-gray-50 border-gray-200 text-gray-700 bg-gray-50";
                              let rarityLabel = "معمولی";
                              let rarityBadgeColor = "bg-gray-100 text-gray-800 border-gray-200";

                              if (rarityLower.includes("legendary")) {
                                rarityBg = "from-amber-50 to-yellow-100/60 border-amber-300 text-amber-950 bg-amber-50";
                                rarityLabel = "🏆 افسانه‌ای (Legendary)";
                                rarityBadgeColor = "bg-amber-200 text-amber-950 border-amber-300";
                              } else if (rarityLower.includes("epic")) {
                                rarityBg = "from-purple-50 to-fuchsia-100/60 border-purple-300 text-purple-950 bg-purple-50";
                                rarityLabel = "🔮 حماسی (Epic)";
                                rarityBadgeColor = "bg-purple-200 text-purple-950 border-purple-300";
                              } else if (rarityLower.includes("rare")) {
                                rarityBg = "from-blue-50 to-indigo-100/60 border-blue-300 text-blue-950 bg-blue-50";
                                rarityLabel = "⭐ کمیاب (Rare)";
                                rarityBadgeColor = "bg-blue-200 text-blue-950 border-blue-300";
                              } else {
                                rarityBg = "from-emerald-50 to-teal-50/60 border-emerald-200 text-emerald-950 bg-emerald-50";
                                rarityLabel = "🍃 معمولی (Common)";
                                rarityBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                              }

                              return (
                                <div
                                  key={idx}
                                  className={`bg-gradient-to-br ${rarityBg} border-2 rounded-3xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-md`}
                                >
                                  {/* Rarity & Type Tag */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] bg-white/80 border px-2.5 py-0.5 rounded-full font-bold">
                                      📦 {item.ItemType}
                                    </span>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black border ${rarityBadgeColor}`}>
                                      {rarityLabel}
                                    </span>
                                  </div>

                                  {/* Shop Item Icon & Name */}
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-white/90 border-2 border-emerald-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm relative">
                                      {item.Icon && <GameIcon name={item.Icon} size={24} />}
                                      <div className="absolute -bottom-1 -right-1 text-[10px]">🛍️</div>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="font-display font-black text-sm text-[#3C3C3C]">
                                        {item.ItemName}
                                      </h5>
                                      <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                                        {item.VisualDescription}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Cost & Ability descriptions */}
                                  <div className="bg-white/60 rounded-2xl p-3 space-y-2 border border-white/40">
                                    <div className="text-[11px] text-emerald-900 font-extrabold flex items-center gap-1">
                                      💰 <span className="text-gray-500 ml-1">قیمت:</span> <span className="bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-200">{item.Cost}</span>
                                    </div>
                                    {item.AbilityDescription && (
                                      <div className="text-[10px] text-teal-800 font-black">
                                        ⚡ <span className="text-gray-500">قابلیت و ویژگی:</span> {item.AbilityDescription}
                                      </div>
                                    )}
                                  </div>

                                  {/* Om Nom cartoon reaction */}
                                  {item.CartoonReaction && (
                                    <div className="pt-2 border-t border-dashed border-emerald-200 flex items-center justify-between text-[10px] font-bold text-emerald-800 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
                                      <span>🐸 انیمیشن اوم‌نام هنگام خرید:</span>
                                      <span className="font-extrabold">{item.CartoonReaction}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="bg-white border-2 border-emerald-100 rounded-3xl p-10 text-center text-gray-400 font-bold text-xs">
                            هیچ آیتمی یافت نشد. دکمه تولید آیتم‌های فروشگاه را مجدداً فشار دهید.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Seasonal Events Output Visual Representation */}
                    {genType === "seasonalEvents" && (
                      <div className="space-y-6 animate-fadeIn text-right font-sans" dir="rtl">
                        {/* Dynamic Banner based on the active theme */}
                        {(() => {
                          const theme = simSeasonalTheme;
                          let bannerBg = "bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600";
                          let accentColor = "text-emerald-950 bg-emerald-100 border-emerald-200";
                          let themeIcon = "🌸";
                          let headerTextColor = "text-white";
                          let subTextColor = "text-emerald-100";

                          if (theme.includes("Summer")) {
                            bannerBg = "bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500";
                            accentColor = "text-amber-950 bg-amber-100 border-amber-200";
                            themeIcon = "☀️";
                          } else if (theme.includes("Autumn")) {
                            bannerBg = "bg-gradient-to-r from-red-500 via-orange-500 to-amber-600";
                            accentColor = "text-red-950 bg-red-100 border-red-200";
                            themeIcon = "🍁";
                          } else if (theme.includes("Winter")) {
                            bannerBg = "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600";
                            accentColor = "text-cyan-950 bg-cyan-100 border-cyan-200";
                            themeIcon = "❄️";
                          } else if (theme.includes("Birthday")) {
                            bannerBg = "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-600";
                            accentColor = "text-pink-950 bg-pink-100 border-pink-200";
                            themeIcon = "🎂";
                          } else if (theme.includes("Language")) {
                            bannerBg = "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600";
                            accentColor = "text-indigo-950 bg-indigo-100 border-indigo-200";
                            themeIcon = "🌍";
                          }

                          const parsed = generationResult.parsed || {};

                          return (
                            <div className="space-y-6">
                              {/* Event Header Card */}
                              <div className={`${bannerBg} rounded-3xl p-6 text-center relative overflow-hidden shadow-lg border-2 border-white/20`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl" />
                                
                                <span className={`text-[10px] uppercase font-black px-3.5 py-1 rounded-full border shadow-sm inline-flex items-center gap-1 ${accentColor}`}>
                                  <span>{themeIcon}</span>
                                  <span>رویداد فصلی زنده</span>
                                </span>
                                
                                <h4 className={`font-display font-black text-2xl mt-3 ${headerTextColor}`}>
                                  {parsed.EventName || `رویداد فصلی ${theme}`}
                                </h4>
                                
                                <p className={`text-xs font-medium mt-2 max-w-xl mx-auto leading-relaxed ${subTextColor}`}>
                                  {parsed.ThemeDescription}
                                </p>
                                
                                <div className="mt-4 flex items-center justify-center gap-1">
                                  <span className="text-[10px] bg-black/20 text-white border border-white/10 px-3 py-1 rounded-full font-bold">
                                    ⏱️ مدت زمان رویداد: {parsed.Duration || simSeasonalDuration}
                                  </span>
                                </div>
                              </div>

                              {/* Special Missions Section */}
                              <div className="space-y-3">
                                <h5 className="font-display font-black text-sm text-gray-800 flex items-center gap-2">
                                  <span>🎯</span>
                                  <span>ماموریت‌های ویژه رویداد (Special Missions)</span>
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {parsed.Missions && parsed.Missions.length > 0 ? (
                                    parsed.Missions.map((mission: any, idx: number) => (
                                      <div key={idx} className="bg-white border-2 border-gray-200 border-b-4 hover:border-amber-400 rounded-2xl p-4 transition-all space-y-2 flex flex-col justify-between">
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-black text-amber-600 flex items-center gap-1">
                                              <span>⭐</span>
                                              <span>ماموریت {idx + 1}</span>
                                            </span>
                                            <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-black border border-amber-100">
                                              پاداش ویژه
                                            </span>
                                          </div>
                                          <h6 className="font-display font-black text-xs text-gray-800 mt-1">
                                            {mission.MissionName}
                                          </h6>
                                          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                                            {mission.Description}
                                          </p>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-400 font-bold col-span-2 text-center py-4">ماموریتی یافت نشد.</p>
                                  )}
                                </div>
                              </div>

                              {/* Collectibles & Mini Games Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Collectibles */}
                                <div className="space-y-3">
                                  <h5 className="font-display font-black text-sm text-gray-800 flex items-center gap-2">
                                    <span>🎁</span>
                                    <span>کالکتیبل‌های فصلی (Seasonal Collectibles)</span>
                                  </h5>
                                  <div className="bg-white border-2 border-gray-200 border-b-4 rounded-3xl p-4 space-y-3">
                                    {parsed.Collectibles && parsed.Collectibles.length > 0 ? (
                                      parsed.Collectibles.map((col: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                                          <div className="w-8 h-8 bg-pink-50 border border-pink-200 rounded-xl flex items-center justify-center shrink-0">
                                            <span>🍭</span>
                                          </div>
                                          <div>
                                            <h6 className="font-bold text-xs text-gray-800">{col.ItemName}</h6>
                                            <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{col.Description}</p>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-xs text-gray-400 font-bold text-center">کالکتیبلی ثبت نشده است.</p>
                                    )}
                                  </div>
                                </div>

                                {/* Mini Games */}
                                <div className="space-y-3">
                                  <h5 className="font-display font-black text-sm text-gray-800 flex items-center gap-2">
                                    <span>🎮</span>
                                    <span>مینی‌گیم‌های فصلی (Seasonal Mini-Games)</span>
                                  </h5>
                                  <div className="bg-white border-2 border-gray-200 border-b-4 rounded-3xl p-4 space-y-3">
                                    {parsed.MiniGames && parsed.MiniGames.length > 0 ? (
                                      parsed.MiniGames.map((game: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                                          <div className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center shrink-0">
                                            <span>🕹️</span>
                                          </div>
                                          <div>
                                            <h6 className="font-bold text-xs text-gray-800">{game.GameName}</h6>
                                            <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{game.Description}</p>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-xs text-gray-400 font-bold text-center">مینی‌گیمی ثبت نشده است.</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Boss Fight (If exists) */}
                              {parsed.BossFight && parsed.BossFight.BossName && (
                                <div className="bg-rose-50 border-2 border-rose-300 border-b-6 rounded-3xl p-5 space-y-2.5 relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-2 h-full bg-rose-500" />
                                  <div className="flex items-center gap-2 text-rose-700 font-black text-xs">
                                    <span>👹</span>
                                    <span>چالش غول‌آخر فصلی (Seasonal Boss Fight)</span>
                                  </div>
                                  <h6 className="font-display font-black text-sm text-rose-950">
                                    {parsed.BossFight.BossName}
                                  </h6>
                                  <p className="text-[11px] text-rose-900/80 leading-relaxed font-bold">
                                    <span className="text-gray-500 font-medium">هدف اصلی: </span>
                                    {parsed.BossFight.Objective}
                                  </p>
                                </div>
                              )}

                              {/* Exclusive Rewards Row */}
                              <div className="space-y-3">
                                <h5 className="font-display font-black text-sm text-gray-800 flex items-center gap-2">
                                  <span>🏆</span>
                                  <span>جوایز انحصاری فصلی (Exclusive Rewards)</span>
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  {parsed.Rewards && parsed.Rewards.length > 0 ? (
                                    parsed.Rewards.map((reward: any, idx: number) => (
                                      <div key={idx} className="bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-4 text-center space-y-2 flex flex-col items-center hover:shadow-sm transition-all">
                                        <div className="w-12 h-12 bg-white border-2 border-amber-300 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                          {reward.Icon ? (
                                            <GameIcon name={reward.Icon} size={24} />
                                          ) : (
                                            <span>🎁</span>
                                          )}
                                        </div>
                                        <div>
                                          <h6 className="font-black text-xs text-gray-800 leading-tight">{reward.RewardName}</h6>
                                          <span className="text-[9px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold border mt-1.5 inline-block">
                                            {reward.RewardType}
                                          </span>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-400 font-bold col-span-3 text-center">جایزه‌ای ثبت نشده است.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* UI Style Output Visual Representation */}
                    {genType === "uiStyle" && (
                      <div className="space-y-6 animate-fadeIn text-right font-sans" dir="rtl">
                        {(() => {
                          const parsed = generationResult.parsed || {};
                          
                          return (
                            <div className="space-y-6">
                              {/* Header Card */}
                              <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-3xl p-6 text-center relative overflow-hidden shadow-lg border-4 border-gray-900 text-white">
                                <span className="absolute -top-3 -right-3 text-4xl opacity-15 rotate-12 select-none">🟢</span>
                                <span className="absolute -bottom-3 -left-3 text-4xl opacity-15 -rotate-12 select-none">🍬</span>
                                
                                <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1 bg-amber-300 text-gray-900">
                                  <span>🎨</span>
                                  <span>تست استایل رابط کاربری درس (Lesson UI Preview)</span>
                                </span>
                                
                                <h4 className="font-display font-black text-2xl mt-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
                                  شبیه‌ساز صفحه آموزش کارتونی
                                </h4>
                                
                                <div className="text-[11px] font-bold mt-2 bg-black/15 py-1.5 px-3 rounded-xl inline-block text-sky-50 leading-relaxed">
                                  <strong>تایپوگرافی تولیدی:</strong> {parsed.Typography || "Bebas Neue / Iran Yekan Bold"}
                                </div>
                              </div>

                              {/* Interactive Simulated Device Mockup */}
                              <div className="bg-[#EBF7FF] border-4 border-gray-900 rounded-[32px] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto space-y-4">
                                
                                {/* 1. Simulated Header */}
                                <div className="bg-sky-300 border-4 border-gray-900 rounded-2xl p-3 flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold">
                                      ✕
                                    </div>
                                    <div className="bg-white px-2 py-1 border-2 border-gray-900 rounded-xl text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-[#3C3C3C]">
                                      درس امروز
                                    </div>
                                  </div>

                                  {/* Stats */}
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-0.5 bg-amber-100 border-2 border-gray-900 px-2 py-0.5 rounded-xl text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-amber-700">
                                      <span>⚡</span>
                                      <span>120</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 bg-rose-100 border-2 border-gray-900 px-2 py-0.5 rounded-xl text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-rose-600">
                                      <span>❤️</span>
                                      <span>5</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Header Style Details */}
                                <div className="bg-white border-2 border-gray-900 rounded-xl p-2.5 text-[10px] text-gray-700 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-sky-600 font-black">ℹ️ جزئیات بخش هدر:</span>
                                  <p className="mt-1 whitespace-pre-line">{parsed.Header}</p>
                                </div>

                                {/* 2. Explanation Card */}
                                <div className="bg-[#E3FCF2] border-4 border-gray-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex items-start gap-3">
                                  <div className="text-4xl select-none pt-1">🟢 Waving</div>
                                  <div className="space-y-1 flex-1">
                                    <span className="text-[10px] bg-emerald-400 border-2 border-gray-900 text-gray-900 px-2 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block">
                                      هدف آموزش (Objective)
                                    </span>
                                    <h5 className="font-display font-black text-sm text-emerald-950 mt-1">یادگیری سلام کردن و معرفی خود به زبان ساده!</h5>
                                    <p className="text-[10px] text-emerald-800 font-semibold leading-relaxed">
                                      کودک در این بخش با همراهی اوم نام (Om Nom) کلمات کلیدی اولیه را تمرین می‌کند.
                                    </p>
                                  </div>
                                </div>

                                {/* Explanation style details */}
                                <div className="bg-white border-2 border-gray-900 rounded-xl p-2.5 text-[10px] text-gray-700 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-emerald-600 font-black">ℹ️ جزئیات کارت توضیح درس:</span>
                                  <p className="mt-1 whitespace-pre-line">{parsed.ExplanationCard}</p>
                                </div>

                                {/* 3. Examples Section */}
                                <div className="space-y-2">
                                  <h6 className="font-display font-black text-xs text-gray-800 mr-1 flex items-center gap-1">
                                    <span>🌟</span>
                                    <span>بخش مثال‌ها (Examples Section)</span>
                                  </h6>

                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-[#FFFCE0] border-2 border-gray-900 rounded-2xl p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-24">
                                      <span className="text-xl">🟢 Happy</span>
                                      <div>
                                        <span className="font-black text-xs block text-yellow-950">Hello!</span>
                                        <span className="text-[9px] text-yellow-800 font-bold block">سلام</span>
                                      </div>
                                    </div>

                                    <div className="bg-[#FFEBF5] border-2 border-gray-900 rounded-2xl p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-24">
                                      <span className="text-xl">🟢 Introduce</span>
                                      <div>
                                        <span className="font-black text-xs block text-pink-950">My Name...</span>
                                        <span className="text-[9px] text-pink-800 font-bold block">اسم من...</span>
                                      </div>
                                    </div>

                                    <div className="bg-[#E0F3FF] border-2 border-gray-900 rounded-2xl p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-24">
                                      <span className="text-xl">🟢 Excited</span>
                                      <div>
                                        <span className="font-black text-xs block text-sky-950">Nice to...</span>
                                        <span className="text-[9px] text-sky-800 font-bold block">از آشنایی...</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Examples Style Details */}
                                <div className="bg-white border-2 border-gray-900 rounded-xl p-2.5 text-[10px] text-gray-700 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-amber-600 font-black">ℹ️ جزئیات کارت‌های مثال:</span>
                                  <p className="mt-1 whitespace-pre-line">{parsed.Examples}</p>
                                </div>

                                {/* 4. Exercises Section */}
                                <div className="bg-[#FFEFE5] border-4 border-gray-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                                  <span className="text-[9px] bg-orange-400 border-2 border-gray-900 text-gray-900 px-2 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block">
                                    تمرین تعاملی شماره ۱ (Interactive MCQ)
                                  </span>
                                  
                                  <div className="text-xs font-black text-gray-800">کدام گزینه به معنی «سلام» است؟</div>
                                  
                                  <div className="space-y-1.5 text-left" dir="ltr">
                                    <button className="w-full bg-white border-2 border-b-4 border-gray-900 p-2 rounded-xl text-xs font-black text-gray-800 hover:bg-gray-50 flex items-center justify-between">
                                      <span>Hello</span>
                                      <span className="text-emerald-500">🟢</span>
                                    </button>
                                    <button className="w-full bg-white border-2 border-b-4 border-gray-900 p-2 rounded-xl text-xs font-black text-gray-400 flex items-center justify-between">
                                      <span>Goodbye</span>
                                      <span className="text-gray-300">⚪</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Exercises Style Details */}
                                <div className="bg-white border-2 border-gray-900 rounded-xl p-2.5 text-[10px] text-gray-700 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-orange-600 font-black">ℹ️ جزئیات بخش تمرین‌ها:</span>
                                  <p className="mt-1 whitespace-pre-line">{parsed.Exercises}</p>
                                </div>

                                {/* 5. Footer Menu */}
                                <div className="bg-white border-4 border-gray-900 rounded-2xl p-2.5 flex items-center justify-around shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                  <button className="w-10 h-10 rounded-xl bg-sky-100 border-2 border-gray-900 flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold text-sm">
                                    🏠
                                  </button>
                                  <button className="w-10 h-10 rounded-xl bg-[#FFF5CC] border-2 border-gray-900 flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold text-sm">
                                    ⬅️
                                  </button>
                                  <button className="w-20 h-10 rounded-xl bg-[#CCFFD5] border-2 border-gray-900 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-green-950">
                                    بعدی ➡️
                                  </button>
                                </div>

                                {/* Footer style details */}
                                <div className="bg-white border-2 border-gray-900 rounded-xl p-2.5 text-[10px] text-gray-700 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-gray-600 font-black">ℹ️ جزئیات بخش پاورقی:</span>
                                  <p className="mt-1 whitespace-pre-line">{parsed.Footer}</p>
                                </div>

                              </div>

                              {/* General style rules and Om Nom Integration cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border-4 border-gray-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                                  <h6 className="font-display font-black text-xs text-gray-800 flex items-center gap-1.5">
                                    <span>🛡️</span>
                                    <span>قوانین استایل بصری (Visual Style Guidelines)</span>
                                  </h6>
                                  <p className="text-[11px] text-gray-700 font-semibold leading-relaxed whitespace-pre-line">
                                    {parsed.VisualStyle}
                                  </p>
                                </div>

                                <div className="bg-[#E6FFE6] border-4 border-gray-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                                  <h6 className="font-display font-black text-xs text-[#063E06] flex items-center gap-1.5">
                                    <span>🟢</span>
                                    <span>یکپارچه‌سازی اوم‌نام (Om Nom Companion)</span>
                                  </h6>
                                  <p className="text-[11px] text-green-800 font-semibold leading-relaxed whitespace-pre-line">
                                    {parsed.OmNomIntegration}
                                  </p>
                                </div>
                              </div>

                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Placement Test Output Visual Representation */}
                    {genType === "placementTest" && (
                      <div className="space-y-6 animate-fadeIn text-right font-sans" dir="rtl">
                        {(() => {
                          const parsed = generationResult.parsed || {};
                          return (
                            <div className="space-y-6">
                              {/* Header Card */}
                              <div className="bg-gradient-to-r from-red-400 to-[#FF5757] rounded-3xl p-6 text-center relative overflow-hidden shadow-lg border-4 border-gray-900 text-white">
                                <span className="absolute -top-3 -right-3 text-4xl opacity-15 rotate-12 select-none">🧪</span>
                                <span className="absolute -bottom-3 -left-3 text-4xl opacity-15 -rotate-12 select-none">🎯</span>
                                
                                <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1 bg-amber-300 text-gray-900">
                                  <span>✨</span>
                                  <span>شبیه‌ساز ساختار آزمون تعیین‌سطح (Placement Test Design)</span>
                                </span>
                                
                                <h4 className="font-display font-black text-2xl mt-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
                                  آزمون تعیین سطح هوشمند اوم نام
                                </h4>
                                
                                <p className="text-xs font-semibold mt-2 text-red-50 max-w-xl mx-auto leading-relaxed">
                                  یک آزمون جامع کودک‌پسند، هماهنگ با استانداردهای CEFR و کتاب‌های مدارس ایران (Prospect / Vision) جهت کشف نقطه شروع ایده‌آل پیشرفت کودک.
                                </p>
                              </div>

                              {/* Structured Sections list */}
                              <div className="bg-[#FFF8F8] border-4 border-gray-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                <h5 className="font-display font-black text-sm text-gray-800 border-b-2 border-dashed border-red-200 pb-2 flex items-center gap-2">
                                  <span>📝</span>
                                  <span>بخش‌های طراحی‌شده آزمون (Test Sections)</span>
                                </h5>
                                
                                <div className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-semibold bg-white p-4 border-2 border-gray-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  {parsed.Sections || "بخش‌بندی آزمون در حال تحلیل و تولید..."}
                                </div>
                              </div>

                              {/* Scoring Rules list */}
                              <div className="bg-[#FFFDF3] border-4 border-gray-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                <h5 className="font-display font-black text-sm text-amber-900 border-b-2 border-dashed border-amber-200 pb-2 flex items-center gap-2">
                                  <span>📊</span>
                                  <span>سیستم محاسبه نمره و سطح‌بندی (Scoring System)</span>
                                </h5>
                                
                                <div className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-semibold bg-white p-4 border-2 border-gray-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  {parsed.Scoring || "قوانین نمره‌دهی آزمون در حال تحلیل و تولید..."}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Course Recommendation Output Visual Representation */}
                    {genType === "courseRecommendation" && (
                      <div className="space-y-6 animate-fadeIn text-right font-sans" dir="rtl">
                        {(() => {
                          const parsed = generationResult.parsed || {};
                          return (
                            <div className="space-y-6">
                              {/* Header Card */}
                              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-6 text-center relative overflow-hidden shadow-lg border-4 border-gray-900 text-white">
                                <span className="absolute -top-3 -right-3 text-4xl opacity-15 rotate-12 select-none">🗺️</span>
                                <span className="absolute -bottom-3 -left-3 text-4xl opacity-15 -rotate-12 select-none">🌟</span>
                                
                                <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1 bg-amber-300 text-gray-900">
                                  <span>🎓</span>
                                  <span>مسیر یادگیری کودک (Personalized Learning Trajectory)</span>
                                </span>
                                
                                <h4 className="font-display font-black text-2xl mt-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
                                  پیشنهاد دوره و مسیر آموزشی اختصاصی
                                </h4>
                                
                                <p className="text-xs font-semibold mt-2 text-purple-100 max-w-xl mx-auto leading-relaxed">
                                  تحلیل هوشمند نمرات برای هدایت تحصیلی کودک به سوی بهترین دوره‌های سازگار با سطح کتاب‌های درسی ایران.
                                </p>
                              </div>

                              {/* Recommended Track detail */}
                              <div className="bg-[#FAF5FF] border-4 border-gray-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                <h5 className="font-display font-black text-sm text-purple-950 border-b-2 border-dashed border-purple-200 pb-2 flex items-center gap-2">
                                  <span>🚀</span>
                                  <span>مسیر یادگیری توصیه شده (Recommended Track)</span>
                                </h5>
                                
                                <div className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-semibold bg-white p-4 border-2 border-gray-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  {parsed.RecommendedTrack || "پیشنهاد مسیر آموزشی در حال تولید..."}
                                </div>
                              </div>

                              {/* Course Recommendations */}
                              <div className="bg-[#F5F8FF] border-4 border-gray-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                <h5 className="font-display font-black text-sm text-indigo-950 border-b-2 border-dashed border-indigo-200 pb-2 flex items-center gap-2">
                                  <span>📚</span>
                                  <span>دوره‌های پیشنهادی گام‌به‌گام (Suggested Courses)</span>
                                </h5>
                                
                                <div className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-semibold bg-white p-4 border-2 border-gray-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  {parsed.Courses || "جزئیات دوره‌های آموزشی مناسب در حال تحلیل..."}
                                </div>
                              </div>

                              {/* Motivational Card */}
                              {parsed.MotivationalMessage && (
                                <div className="bg-[#EBFDF0] border-4 border-gray-900 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3 relative overflow-hidden">
                                  <div className="absolute -top-6 -left-6 text-6xl opacity-10">💚</div>
                                  <h5 className="font-display font-black text-sm text-emerald-950 flex items-center gap-2">
                                    <span>🍬</span>
                                    <span>پیام تشویق اوم نام (Motivational Message)</span>
                                  </h5>
                                  <p className="text-xs font-semibold text-emerald-900 leading-relaxed whitespace-pre-wrap bg-white p-4 border-2 border-gray-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    {parsed.MotivationalMessage}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-[10px] overflow-x-auto whitespace-pre-wrap max-h-[500px]">
                      {generationResult.rawText}
                    </pre>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 space-y-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-500">خروجی خالی است</h5>
                    <p className="text-[10px] text-gray-400 mt-1">یکی از دکمه‌های تستر زنده را فشار دهید تا خروجی هوش مصنوعی تولید شود.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
