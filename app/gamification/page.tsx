"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  UserStats,
  UserBadge,
  LeagueMember,
  SystemEvent,
  ExerciseType,
  calculateXP,
  calculateLevel,
  processGamificationEvent
} from "../../lib/gamificationEngine";

export default function GamificationLab() {
  // 1. Initial State Definitions
  const initialStats: UserStats = {
    userId: "parham-aref",
    xpTotal: 320,
    level: 1,
    currentStreak: 4,
    longestStreak: 4,
    lastActiveDate: "2026-07-05", // Yesterday relative to the default 2026-07-06
    completedLessons: 6,
    perfectLessons: 1,
    completedExercises: 18,
  };

  const initialBadges: UserBadge[] = [
    { id: "first-steps", name: "First Steps", description: "Completed your very first lesson!", icon: "🌱", tier: "Locked", unlockedAt: null },
    { id: "flame-keeper", name: "Flame Keeper", description: "Maintained a 5-day study streak.", icon: "🔥", tier: "Locked", unlockedAt: null },
    { id: "xp-champ", name: "XP Champion", description: "Reached a lifetime accumulation of 1000 XP.", icon: "👑", tier: "Locked", unlockedAt: null },
    { id: "perfect-run", name: "Perfect Run", description: "Earned 3 flawless lesson completions.", icon: "⚡", tier: "Locked", unlockedAt: null },
    { id: "vocab-master", name: "Vocabulary Master", description: "Completed 50 active exercises.", icon: "📚", tier: "Locked", unlockedAt: null },
  ];

  const initialLeague: LeagueMember = {
    userId: "parham-aref",
    leagueId: "ruby",
    weeklyXp: 120,
    rank: 4,
  };

  // 2. React States
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [badges, setBadges] = useState<UserBadge[]>(initialBadges);
  const [league, setLeague] = useState<LeagueMember>(initialLeague);
  const [logs, setLogs] = useState<Array<{ timestamp: string; message: string; type: "info" | "success" | "warn" }>>([
    { timestamp: "17:27:00", message: "Gamification Engine initialized in Sandbox Mode.", type: "info" },
    { timestamp: "17:27:01", message: "Loaded user_stats, user_badges, and league_members tables.", type: "info" }
  ]);

  const [activeTab, setActiveTab] = useState<"simulator" | "schema" | "rules" | "nestjs" | "admin">("simulator");
  const [selectedNestFile, setSelectedNestFile] = useState<string>("gamification.service.ts");
  const [simulatedDate, setSimulatedDate] = useState("2026-07-06"); // Standard simulated "today"

  // Event parameters
  const [exerciseType, setExerciseType] = useState<ExerciseType>("mcq");
  const [exerciseCorrect, setExerciseCorrect] = useState(true);
  const [responseTime, setResponseTime] = useState(3);
  const [comboCount, setComboCount] = useState(4);
  const [lessonPerfect, setLessonPerfect] = useState(false);

  // Level Up & Badge unlocked triggers for micro-reward celebrations
  const [celebration, setCelebration] = useState<{ type: "level" | "badge"; title: string; subtitle: string } | null>(null);

  // 3. Helpers
  const addLog = (message: string, type: "info" | "success" | "warn" = "info") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => [{ timestamp: timeStr, message, type }, ...prev]);
  };

  const handleReset = () => {
    setStats(initialStats);
    setBadges(initialBadges);
    setLeague(initialLeague);
    setSimulatedDate("2026-07-06");
    setCelebration(null);
    setLogs([
      { timestamp: "17:27:00", message: "Gamification database state rolled back to default.", type: "warn" }
    ]);
  };

  const handleTriggerEvent = (type: "ExerciseCompleted" | "LessonCompleted" | "DailyLogin") => {
    // Construct system event payload
    const event: SystemEvent = {
      type,
      timestamp: new Date().toISOString(),
      payload: {
        simulateDate: simulatedDate,
        ...(type === "ExerciseCompleted" && {
          exerciseType,
          isCorrect: exerciseCorrect,
          responseTime,
          comboCount,
        }),
        ...(type === "LessonCompleted" && {
          lessonId: "vocab-basics",
          isPerfectRun: lessonPerfect,
        }),
      }
    };

    // Process event using pure business rules
    const outcome = processGamificationEvent(stats, badges, league, event);

    // Apply outcomes to state
    setStats(outcome.updatedStats);
    setBadges(outcome.updatedBadges);
    setLeague(outcome.updatedLeague);

    // Log outcomes
    addLog(`Event triggered: ${type}`, "info");
    addLog(outcome.log, outcome.levelUp || outcome.newBadges.length > 0 ? "success" : "info");

    // Celebrations trigger
    if (outcome.levelUp) {
      setCelebration({
        type: "level",
        title: `Level Up! 🧠`,
        subtitle: `Awesome work! You reached Level ${outcome.updatedStats.level}. Keep pushing!`
      });
    } else if (outcome.newBadges.length > 0) {
      const unlockedBadgeNames = outcome.newBadges.map(id => outcome.updatedBadges.find(b => b.id === id)?.name).join(", ");
      setCelebration({
        type: "badge",
        title: `Achievement Unlocked! 🏆`,
        subtitle: `You earned the badge: ${unlockedBadgeNames}!`
      });
    }
  };

  const handleAdvanceDay = () => {
    const currentDate = new Date(simulatedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDateStr = currentDate.toISOString().split("T")[0];
    setSimulatedDate(nextDateStr);
    addLog(`Simulation calendar advanced by +1 day. Simulated date is now: ${nextDateStr}`, "warn");
  };

  const currentLevelInfo = calculateLevel(stats.xpTotal);

  return (
    <main className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Hero section */}
      <div className="max-w-5xl mx-auto text-center mb-10 select-none">
        <span className="text-xs bg-purple-100 text-purple-700 border border-purple-200 font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Gamification Rule Engine Lab
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#3C3C3C] mt-3">
          Zabando Gamification Playground
        </h1>
        <p className="text-sm font-bold text-[#777777] mt-1.5 max-w-xl mx-auto">
          An interactive, high-fidelity playground to design, verify, and simulate XP, Streak, Level Up, and Badge business logic.
        </p>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mt-8 select-none">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 transition-all active:translate-y-[1px] ${
              activeTab === "simulator"
                ? "bg-[#DDF4FF] border-[#84D8FF] text-[#1899D6]"
                : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            🕹️ Simulator Sandbox
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 transition-all active:translate-y-[1px] ${
              activeTab === "schema"
                ? "bg-[#F3E8FF] border-[#D8B4FE] text-[#9333EA]"
                : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            🗄️ Database Schemas
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 transition-all active:translate-y-[1px] ${
              activeTab === "rules"
                ? "bg-[#FCF0E6] border-[#FFD2DF] text-[#FF4B4B]"
                : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            📝 Engine Code Rules
          </button>
          <button
            onClick={() => setActiveTab("nestjs")}
            className={`px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 transition-all active:translate-y-[1px] ${
              activeTab === "nestjs"
                ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]"
                : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            🦅 NestJS Rule Module
          </button>
          
          <Link href="/admin/rules">
            <button
              className="px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 border-[#FDE68A] transition-all active:translate-y-[1px] bg-[#FEF3C7] text-[#D97706] hover:bg-[#FCD34D]"
            >
              🎛️ Admin Rule Editor
            </button>
          </Link>

          <Link href="/notifications">
            <button
              className="px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 border-[#A5F3FC] transition-all active:translate-y-[1px] bg-[#ECFEFF] text-[#0891B2] hover:bg-[#CFFAFE]"
            >
              🔔 Notification Center
            </button>
          </Link>

          <Link href="/admin/rules/simulator">
            <button
              className="px-5 py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 border-[#C084FC] transition-all active:translate-y-[1px] bg-[#FAF5FF] text-[#9333EA] hover:bg-[#F3E8FF]"
            >
              ⚙️ Rule Sandbox
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INTERACTIVE SIMULATOR */}
          {activeTab === "simulator" && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              
              {/* Column 1 & 2: Controls & Simulation logs */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Simulated Time Controller */}
                <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 select-none">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-widest">CALENDAR TIMELINE</span>
                    <p className="text-sm font-black text-[#3C3C3C]">
                      Simulated Today: <span className="text-[#1899D6]">{simulatedDate}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAdvanceDay}
                      className="px-4 py-2 bg-white border-2 border-[#E5E5E5] border-b-4 rounded-xl font-display font-black text-xs uppercase tracking-wider text-[#777777] hover:bg-[#F7F7F7] active:border-b-0 active:translate-y-[2px]"
                    >
                      📅 Advance +1 Day
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-[#FF4B4B]/10 hover:bg-[#FF4B4B]/15 border-2 border-[#FFC4C4] rounded-xl font-display font-black text-xs uppercase tracking-wider text-[#FF4B4B]"
                    >
                      🔄 Reset State
                    </button>
                  </div>
                </div>

                {/* Event Injectors */}
                <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-6">
                  <div>
                    <h2 className="font-display font-black text-lg text-[#3C3C3C]">
                      System Event Triggers
                    </h2>
                    <p className="text-xs font-bold text-[#777777]">
                      Inject production-level events directly into the rule engine to test real-time state mutations.
                    </p>
                  </div>

                  {/* 1. ExerciseCompleted Form */}
                  <div className="border-2 border-[#F1F1F1] rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#58CC02] uppercase tracking-wider">
                        ⚡ Event: ExerciseCompleted
                      </span>
                      <button
                        onClick={() => handleTriggerEvent("ExerciseCompleted")}
                        className="px-4 py-1.5 bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#388002] active:border-b-0 active:translate-y-[2px] rounded-xl text-white font-display font-black text-xs uppercase tracking-wider"
                      >
                        Fire Event
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-[#4B4B4B]">
                      {/* Exercise Type */}
                      <div className="space-y-1.5">
                        <label className="block text-[#777777]">Exercise Type</label>
                        <select
                          value={exerciseType}
                          onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
                          className="w-full bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-xl px-3 py-2 outline-none font-bold text-sm text-[#4B4B4B]"
                        >
                          <option value="mcq">MCQ Option (10 XP)</option>
                          <option value="reorder">Reorder Sentence (12 XP)</option>
                          <option value="translate">Translate Sentence (15 XP)</option>
                          <option value="listening">Listening Practice (15 XP)</option>
                          <option value="roleplay">AI Roleplay Conversation (20 XP)</option>
                        </select>
                      </div>

                      {/* Correct / Incorrect Toggle */}
                      <div className="space-y-1.5">
                        <label className="block text-[#777777]">Accuracy</label>
                        <div className="flex bg-[#F7F7F7] border-2 border-[#E5E5E5] p-1 rounded-xl">
                          <button
                            onClick={() => setExerciseCorrect(true)}
                            className={`flex-1 text-center py-1.5 rounded-lg font-black transition-all ${
                              exerciseCorrect ? "bg-[#58CC02] text-white" : "text-[#777777]"
                            }`}
                          >
                            Correct
                          </button>
                          <button
                            onClick={() => setExerciseCorrect(false)}
                            className={`flex-1 text-center py-1.5 rounded-lg font-black transition-all ${
                              !exerciseCorrect ? "bg-[#FF4B4B] text-white" : "text-[#777777]"
                            }`}
                          >
                            Incorrect
                          </button>
                        </div>
                      </div>

                      {/* Response Time Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="text-[#777777]">Response Time</label>
                          <span className="text-[#1899D6]">{responseTime}s</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          value={responseTime}
                          onChange={(e) => setResponseTime(Number(e.target.value))}
                          className="w-full accent-[#1899D6]"
                        />
                        <span className="text-[10px] text-[#AFAFAF] block">
                          &lt; 4s rewards +5 XP speed bonus. &lt; 8s rewards +3 XP.
                        </span>
                      </div>

                      {/* Combo Count */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="text-[#777777]">Combo Chain</label>
                          <span className="text-[#FF9600]">{comboCount} Correct</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={comboCount}
                          onChange={(e) => setComboCount(Number(e.target.value))}
                          className="w-full accent-[#FF9600]"
                        />
                        <span className="text-[10px] text-[#AFAFAF] block">
                          &ge;3 (+1 XP), &ge;5 (+3 XP), &ge;10 (+5 XP) bonuses.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. LessonCompleted Form */}
                  <div className="border-2 border-[#F1F1F1] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-[#1CB0F6] uppercase tracking-wider block">
                        🎓 Event: LessonCompleted
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="perfectLesson"
                          checked={lessonPerfect}
                          onChange={(e) => setLessonPerfect(e.target.checked)}
                          className="w-4 h-4 rounded text-[#1CB0F6] focus:ring-[#1CB0F6]"
                        />
                        <label htmlFor="perfectLesson" className="text-xs font-bold text-[#777777] cursor-pointer">
                          Flawless/Perfect Run (+15 XP Bonus)
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTriggerEvent("LessonCompleted")}
                      className="px-4 py-2 bg-[#1CB0F6] hover:bg-[#1899D6] border-b-4 border-[#147FB3] active:border-b-0 active:translate-y-[2px] rounded-xl text-white font-display font-black text-xs uppercase tracking-wider self-stretch sm:self-auto text-center"
                    >
                      Trigger Lesson Complete
                    </button>
                  </div>

                  {/* 3. DailyLogin Form */}
                  <div className="border-2 border-[#F1F1F1] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-[#FF9600] uppercase tracking-wider block">
                        🗓️ Event: DailyLogin
                      </span>
                      <p className="text-xs font-semibold text-[#777777]">
                        Simulates user logging in to claim daily XP and refresh their streak.
                      </p>
                    </div>
                    <button
                      onClick={() => handleTriggerEvent("DailyLogin")}
                      className="px-4 py-2 bg-[#FF9600] hover:bg-[#E08500] border-b-4 border-[#B86D00] active:border-b-0 active:translate-y-[2px] rounded-xl text-white font-display font-black text-xs uppercase tracking-wider self-stretch sm:self-auto text-center"
                    >
                      Trigger Daily Login
                    </button>
                  </div>

                </div>

                {/* Console Logs */}
                <div className="bg-[#1E1E1E] border-2 border-[#333333] rounded-3xl p-5 select-none font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#333333] pb-3 mb-3">
                    <span className="text-[#AFAFAF] font-black tracking-wider uppercase text-[10px]">
                      💻 Sandbox Engine Execution Logs
                    </span>
                    <button
                      onClick={() => setLogs([])}
                      className="text-[10px] text-gray-500 hover:text-gray-300 font-bold"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="h-44 overflow-y-auto space-y-2.5 scrollbar-none pr-2">
                    {logs.length === 0 ? (
                      <p className="text-gray-500 italic">No logs available. Run events above.</p>
                    ) : (
                      logs.map((log, i) => (
                        <div key={i} className="flex gap-2.5 items-start">
                          <span className="text-[#777777] select-none">{log.timestamp}</span>
                          <span className={
                            log.type === "success"
                              ? "text-[#58CC02]"
                              : log.type === "warn"
                              ? "text-[#FF9600]"
                              : "text-[#E5E5E5]"
                          }>
                            {log.message}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Column 3: Mock DB Table views */}
              <div className="space-y-6">
                
                {/* 1. user_stats database view */}
                <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 select-none">
                  <div className="border-b border-[#F1F1F1] pb-3 mb-4">
                    <span className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-widest">TABLE RELATION</span>
                    <h3 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#58CC02] rounded-full" />
                      user_stats
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs font-bold text-[#4B4B4B]">
                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">xp_total</span>
                      <span className="font-mono text-[#58CC02]">{stats.xpTotal} XP</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">level</span>
                      <span className="font-mono text-purple-600">LVL {stats.level}</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">current_streak</span>
                      <span className="font-mono text-[#FF4B4B]">🔥 {stats.currentStreak} Days</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">longest_streak</span>
                      <span className="font-mono text-gray-600">🔥 {stats.longestStreak} Max</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">last_active_date</span>
                      <span className="font-mono text-gray-500">{stats.lastActiveDate || "null"}</span>
                    </div>

                    {/* Level Progress Visual Bar */}
                    <div className="pt-2 border-t border-[#F1F1F1]">
                      <div className="flex justify-between text-[10px] font-black text-[#AFAFAF] uppercase mb-1">
                        <span>XP Progress to Level {stats.level + 1}</span>
                        <span>{stats.xpTotal % 500} / 500</span>
                      </div>
                      <div className="h-3 bg-[#E5E5E5] rounded-full overflow-hidden relative">
                        <div
                          style={{ width: `${currentLevelInfo.progressPercent}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. league_members database view */}
                <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 select-none">
                  <div className="border-b border-[#F1F1F1] pb-3 mb-4">
                    <span className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-widest">TABLE RELATION</span>
                    <h3 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#1CB0F6] rounded-full" />
                      league_members
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs font-bold text-[#4B4B4B]">
                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">league_id</span>
                      <span className="font-mono uppercase text-[#1CB0F6]">{league.leagueId} League</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#F7F7F7] px-3 py-2 rounded-xl border border-[#E5E5E5]">
                      <span className="text-[#777777]">weekly_xp</span>
                      <span className="font-mono text-[#FF9600]">{league.weeklyXp} XP</span>
                    </div>
                  </div>
                </div>

                {/* 3. user_badges database view */}
                <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 select-none">
                  <div className="border-b border-[#F1F1F1] pb-3 mb-4">
                    <span className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-widest">TABLE RELATION</span>
                    <h3 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      user_badges
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                    {badges.map((badge) => {
                      const isUnlocked = !!badge.unlockedAt;
                      return (
                        <div
                          key={badge.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border-2 ${
                            isUnlocked
                              ? "bg-[#FFFDF0] border-yellow-300"
                              : "bg-[#FAFAFA] border-[#E5E5E5] opacity-65"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{isUnlocked ? badge.icon : "🔒"}</span>
                            <div>
                              <p className="text-xs font-black text-[#3C3C3C]">{badge.name}</p>
                              <p className="text-[9px] font-bold text-[#777777] line-clamp-1 max-w-[130px]">
                                {badge.description}
                              </p>
                            </div>
                          </div>
                          {isUnlocked && (
                            <span className="text-[8px] bg-yellow-100 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded font-black">
                              {badge.tier}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: DATABASE SCHEMAS */}
          {activeTab === "schema" && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div>
                <h2 className="font-display font-black text-2xl text-[#3C3C3C]">
                  Gamification DB Schema (PostgreSQL DDL)
                </h2>
                <p className="text-xs font-bold text-[#777777] mt-1">
                  Design schemas and indexes mapping precisely to the microservices ecosystem.
                </p>
              </div>

              <div className="space-y-6 font-mono text-xs text-gray-300">
                {/* DDL 1 */}
                <div className="bg-[#1E1E1E] rounded-2xl p-5 border border-gray-800 space-y-2">
                  <p className="text-[#58CC02] font-black border-b border-gray-800 pb-2 mb-2">1. STATS TABLE FOR PROGRESSION</p>
                  <pre className="overflow-x-auto text-left whitespace-pre">
{`CREATE TABLE user_stats (
  user_id VARCHAR(255) PRIMARY KEY,
  xp_total INTEGER DEFAULT 0 NOT NULL,
  level INTEGER DEFAULT 1 NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_active_date DATE,
  completed_lessons INTEGER DEFAULT 0 NOT NULL,
  perfect_lessons INTEGER DEFAULT 0 NOT NULL,
  completed_exercises INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for searching top achievers
CREATE INDEX idx_user_stats_xp ON user_stats(xp_total DESC);`}
                  </pre>
                </div>

                {/* DDL 2 */}
                <div className="bg-[#1E1E1E] rounded-2xl p-5 border border-gray-800 space-y-2">
                  <p className="text-[#1CB0F6] font-black border-b border-gray-800 pb-2 mb-2">2. BADGES & ACHIEVEMENTS LOG</p>
                  <pre className="overflow-x-auto text-left whitespace-pre">
{`CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  badge_id VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  tier VARCHAR(50) DEFAULT 'Bronze' NOT NULL,
  UNIQUE(user_id, badge_id)
);

-- Index on badges for user-specific counts
CREATE INDEX idx_user_badges_user ON user_badges(user_id);`}
                  </pre>
                </div>

                {/* DDL 3 */}
                <div className="bg-[#1E1E1E] rounded-2xl p-5 border border-gray-800 space-y-2">
                  <p className="text-[#FF9600] font-black border-b border-gray-800 pb-2 mb-2">3. LEAGUE TOURNAMENT ASSIGNMENT</p>
                  <pre className="overflow-x-auto text-left whitespace-pre">
{`CREATE TABLE league_members (
  user_id VARCHAR(255) NOT NULL,
  league_id VARCHAR(100) NOT NULL,
  weekly_xp INTEGER DEFAULT 0 NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, league_id)
);

-- Fast lookup of league divisions and rank indices
CREATE INDEX idx_league_weekly_xp ON league_members(league_id, weekly_xp DESC);`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ENGINE CODE RULES */}
          {activeTab === "rules" && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div>
                <h2 className="font-display font-black text-2xl text-[#3C3C3C]">
                  Gamification Rule Engine Logic (TypeScript)
                </h2>
                <p className="text-xs font-bold text-[#777777] mt-1">
                  Engine code that executes calculations and state transitions on completed lesson events.
                </p>
              </div>

              <div className="space-y-6 font-mono text-xs text-gray-300">
                {/* Logic 1 */}
                <div className="bg-[#1E1E1E] rounded-2xl p-5 border border-gray-800 space-y-2">
                  <p className="text-[#58CC02] font-black border-b border-gray-800 pb-2 mb-2">XP CALCULATION RULE ALGORITHM</p>
                  <pre className="overflow-x-auto text-left whitespace-pre-wrap">
{`export function calculateXP(
  exerciseType: "mcq" | "translate" | "reorder" | "listening" | "roleplay",
  isCorrect: boolean,
  responseTime: number,
  comboCount: number = 0
) {
  if (!isCorrect) return { base: 0, speedBonus: 0, comboBonus: 0, total: 0 };

  let base = 10;
  if (exerciseType === "reorder") base = 12;
  else if (exerciseType === "translate" || exerciseType === "listening") base = 15;
  else if (exerciseType === "roleplay") base = 20;

  // Speed Bonus Under 4s: +5 XP; Under 8s: +3 XP
  const speedBonus = responseTime < 4 ? 5 : responseTime < 8 ? 3 : 0;

  // Combo Bonus Chain >= 10: +5 XP; >= 5: +3 XP; >= 3: +1 XP
  const comboBonus = comboCount >= 10 ? 5 : comboCount >= 5 ? 3 : comboCount >= 3 ? 1 : 0;

  return { base, speedBonus, comboBonus, total: base + speedBonus + comboBonus };
}`}
                  </pre>
                </div>

                {/* Logic 2 */}
                <div className="bg-[#1E1E1E] rounded-2xl p-5 border border-gray-800 space-y-2">
                  <p className="text-[#1CB0F6] font-black border-b border-gray-800 pb-2 mb-2">STREAK RECOVERY & RETENTION LOGIC</p>
                  <pre className="overflow-x-auto text-left whitespace-pre-wrap">
{`export function updateStreak(currentStreak: number, longestStreak: number, lastActiveStr: string | null, todayStr: string) {
  if (!lastActiveStr) return { currentStreak: 1, longestStreak: Math.max(longestStreak, 1), status: "incremented" };

  const lastActiveDate = new Date(lastActiveStr);
  const todayDate = new Date(todayStr);

  lastActiveDate.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round((todayDate.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { currentStreak, longestStreak, status: "same_day" };
  if (diffDays === 1) {
    const newStreak = currentStreak + 1;
    return { currentStreak: newStreak, longestStreak: Math.max(longestStreak, newStreak), status: "incremented" };
  }
  
  // Gap of > 1 day resets streak
  return { currentStreak: 1, longestStreak, status: "reset" };
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: NESTJS RULE MODULE */}
          {activeTab === "nestjs" && (
            <motion.div
              key="nestjs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-display font-black text-2xl text-[#3C3C3C]">
                    NestJS Microservices Module Explorer
                  </h2>
                  <p className="text-xs font-bold text-[#777777] mt-1">
                    Explore the production-grade NestJS Module, Rule Service, event schemas, and RPC clients on disk.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-black">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Active Service
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* File Tree Selector */}
                <div className="md:col-span-1 bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-2xl p-4 space-y-4 select-none">
                  <div className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-wider pb-1.5 border-b border-[#E5E5E5]">
                    📁 gamification-service/
                  </div>

                  <div className="space-y-2">
                    
                    {/* Events directory */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 events
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("learning-events.interface.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "learning-events.interface.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 events.interface.ts
                      </button>
                    </div>

                    {/* Event Bus directory */}
                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 event-bus
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("event-bus.module.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "event-bus.module.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 event-bus.module.ts
                      </button>
                    </div>

                    {/* Learning Service directory */}
                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 learning-service
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("learning.service.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "learning.service.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 learning.service.ts
                      </button>
                    </div>

                    {/* Consumers directory */}
                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 consumers
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("gamification-consumer.controller.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "gamification-consumer.controller.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 gamification-consumer.controller.ts
                      </button>
                    </div>

                    {/* Clients directory */}
                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 clients
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("stats.client.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "stats.client.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 stats.client.ts
                      </button>
                      <button
                        onClick={() => setSelectedNestFile("badges.client.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "badges.client.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 badges.client.ts
                      </button>
                      <button
                        onClick={() => setSelectedNestFile("leagues.client.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "leagues.client.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 leagues.client.ts
                      </button>
                    </div>

                    {/* Rule Engine directory */}
                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-black text-gray-500 flex items-center gap-1 pl-1">
                        📁 rule-engine
                      </div>
                      <button
                        onClick={() => setSelectedNestFile("rule.interface.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "rule.interface.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 rule.interface.ts
                      </button>
                      <button
                        onClick={() => setSelectedNestFile("rule-loader.service.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "rule-loader.service.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 rule-loader.service.ts
                      </button>
                      <button
                        onClick={() => setSelectedNestFile("rule-engine.service.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "rule-engine.service.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 rule-engine.service.ts
                      </button>
                      <button
                        onClick={() => setSelectedNestFile("rule-engine.module.ts")}
                        className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "rule-engine.module.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 rule-engine.module.ts
                      </button>
                      
                      <div className="pl-4 space-y-1 pt-1">
                        <div className="text-[10px] font-black text-gray-400 pl-1">📁 rules</div>
                        <button
                          onClick={() => setSelectedNestFile("xp.rules.json")}
                          className={`w-full text-left pl-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                            selectedNestFile === "xp.rules.json"
                              ? "bg-[#D1FAE5] text-[#047857]"
                              : "hover:bg-gray-200 text-[#555555]"
                          }`}
                        >
                          📄 xp.rules.json
                        </button>
                      </div>
                    </div>

                    {/* Root Module / Service files */}
                    <div className="space-y-1 pt-2 border-t border-[#E5E5E5] mt-2">
                      <button
                        onClick={() => setSelectedNestFile("gamification.service.ts")}
                        className={`w-full text-left pl-1 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "gamification.service.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 gamification.service.ts
                      </button>

                      <button
                        onClick={() => setSelectedNestFile("gamification.module.ts")}
                        className={`w-full text-left pl-1 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          selectedNestFile === "gamification.module.ts"
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "hover:bg-gray-200 text-[#555555]"
                        }`}
                      >
                        📄 gamification.module.ts
                      </button>
                    </div>

                  </div>
                </div>

                {/* Code Window Display */}
                <div className="md:col-span-3 space-y-4">
                  
                  {/* File Header Tab */}
                  <div className="flex items-center justify-between bg-[#1E1E1E] text-[#AFAFAF] px-4 py-2.5 rounded-t-2xl font-mono text-xs border-b border-[#333333] select-none">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">📄</span>
                      <span className="font-bold text-gray-200">{selectedNestFile}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      NestJS TypeSafe File
                    </span>
                  </div>

                  {/* Code Editor Body */}
                  <div className="bg-[#1E1E1E] p-5 rounded-b-2xl border-x-2 border-b-2 border-t-0 border-[#333333] font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="text-left whitespace-pre">
                      {selectedNestFile === "gamification.service.ts" && (
`import { Injectable } from "@nestjs/common";
import { ExerciseCompletedEvent, LessonCompletedEvent } from "./events/learning-events.interface";
import { StatsClient } from "./clients/stats.client";
import { BadgesClient } from "./clients/badges.client";
import { LeaguesClient } from "./clients/leagues.client";
import { RuleEngineService } from "./rule-engine/rule-engine.service";

@Injectable()
export class GamificationService {
  constructor(
    private readonly statsClient: StatsClient,
    private readonly badgesClient: BadgesClient,
    private readonly leaguesClient: LeaguesClient,
    private readonly ruleEngine: RuleEngineService,
  ) {}

  // Event: Exercise Completed (Rule Engine calculations)
  async handleExerciseCompleted(event: ExerciseCompletedEvent) {
    // 1. Run dynamic configurable rules first
    await this.ruleEngine.run("exercise.completed", event);

    // 2. Fallback to standard business rules
    const baseXp = event.isCorrect ? 10 : 2;
    const difficultyBonus = event.difficulty * (event.isCorrect ? 2 : 0);
    const totalXp = baseXp + difficultyBonus;

    // Trigger state changes via RPC clients to separate stats microservice
    await this.statsClient.addXp(event.userId, totalXp);
    await this.leaguesClient.addWeeklyXp(event.userId, totalXp);
    await this.statsClient.updateStreak(event.userId);

    // Simple Badge rule
    if (event.isCorrect && event.difficulty >= 4) {
      await this.badgesClient.awardBadge(event.userId, "HARD_EXERCISE");
    }
  }

  // Event: Lesson Completed (Rule Engine calculations)
  async handleLessonCompleted(event: LessonCompletedEvent) {
    const lessonXp = 30;

    await this.statsClient.addXp(event.userId, lessonXp);
    await this.leaguesClient.addWeeklyXp(event.userId, lessonXp);
    await this.statsClient.updateStreak(event.userId);

    // Lesson Badge rule
    await this.badgesClient.awardBadge(event.userId, "LESSON_COMPLETED");
  }
}`
                      )}

                      {selectedNestFile === "gamification.module.ts" && (
`import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GamificationService } from "./gamification.service";
import { StatsClient } from "./clients/stats.client";
import { BadgesClient } from "./clients/badges.client";
import { LeaguesClient } from "./clients/leagues.client";
import { RuleEngineModule } from "./rule-engine/rule-engine.module";
import { EventBusModule } from "./event-bus/event-bus.module";
import { GamificationConsumerController } from "./gamification-consumer.controller";

@Module({
  imports: [HttpModule, RuleEngineModule, EventBusModule],
  providers: [GamificationService, StatsClient, BadgesClient, LeaguesClient],
  controllers: [GamificationConsumerController],
  exports: [GamificationService],
})
export class GamificationModule {}`
                      )}

                      {selectedNestFile === "event-bus.module.ts" && (
`import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EVENT_BUS",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
          queue: "learning_events",
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class EventBusModule {}`
                      )}

                      {selectedNestFile === "learning.service.ts" && (
`import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class LearningService {
  constructor(
    @Inject("EVENT_BUS") private readonly eventBus: ClientProxy,
  ) {}

  async completeExercise(userId: string, exercise: { id: string; difficulty: number }, isCorrect: boolean) {
    await this.eventBus.emit("exercise.completed", {
      userId,
      exerciseId: exercise.id,
      isCorrect,
      difficulty: exercise.difficulty,
    });
  }

  async completeLesson(userId: string, lesson: { id: string }) {
    await this.eventBus.emit("lesson.completed", {
      userId,
      lessonId: lesson.id,
    });
  }
}`
                      )}

                      {selectedNestFile === "gamification-consumer.controller.ts" && (
`import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RuleEngineService } from "./rule-engine/rule-engine.service";

@Controller()
export class GamificationConsumerController {
  constructor(private readonly ruleEngine: RuleEngineService) {}

  @EventPattern("exercise.completed")
  async onExerciseCompleted(@Payload() event: any) {
    await this.ruleEngine.run("exercise.completed", event);
  }

  @EventPattern("lesson.completed")
  async onLessonCompleted(@Payload() event: any) {
    await this.ruleEngine.run("lesson.completed", event);
  }
}`
                      )}

                      {selectedNestFile === "learning-events.interface.ts" && (
`export interface ExerciseCompletedEvent {
  userId: string;
  exerciseId: string;
  isCorrect: boolean;
  difficulty: number; // 1–5
}

export interface LessonCompletedEvent {
  userId: string;
  lessonId: string;
}`
                      )}

                      {selectedNestFile === "stats.client.ts" && (
`import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class StatsClient {
  constructor(private readonly http: HttpService) {}

  async addXp(userId: string, xp: number) {
    return this.http.post(\`\${process.env.STATS_SERVICE_URL}/xp/add\`, {
      userId,
      xp,
    });
  }

  async updateStreak(userId: string) {
    return this.http.post(\`\${process.env.STATS_SERVICE_URL}/streak/update\`, {
      userId,
    });
  }
}`
                      )}

                      {selectedNestFile === "badges.client.ts" && (
`import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class BadgesClient {
  constructor(private readonly http: HttpService) {}

  async awardBadge(userId: string, badgeCode: string) {
    return this.http.post(\`\${process.env.BADGE_SERVICE_URL}/award\`, {
      userId,
      badgeCode,
    });
  }
}`
                      )}

                      {selectedNestFile === "leagues.client.ts" && (
`import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LeaguesClient {
  constructor(private readonly http: HttpService) {}

  async addWeeklyXp(userId: string, xp: number) {
    return this.http.post(\`\${process.env.LEAGUE_SERVICE_URL}/xp/add\`, {
      userId,
      xp,
    });
  }
}`
                      )}

                      {selectedNestFile === "rule.interface.ts" && (
`export interface Rule {
  id: string;
  trigger: string;
  condition: Record<string, any>;
  action: string;
  params: Record<string, any>;
}`
                      )}

                      {selectedNestFile === "rule-loader.service.ts" && (
`import { Injectable } from "@nestjs/common";
import { Rule } from "./rule.interface";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class RuleLoaderService {
  private rules: Rule[] = [];

  constructor() {
    this.loadRules();
  }

  loadRules() {
    try {
      const directPath = path.join(__dirname, "rules", "xp.rules.json");
      const srcPath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "xp.rules.json");
      const filePath = fs.existsSync(directPath) ? directPath : srcPath;
      
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8");
        this.rules = JSON.parse(raw);
      } else {
        this.rules = [
          {
            id: "xp_correct_answer",
            trigger: "exercise.completed",
            condition: { isCorrect: true },
            action: "addXp",
            params: { xp: 10 }
          }
        ];
      }
    } catch (err) {
      console.warn("Failed to load dynamic rules, using defaults.", err);
    }
  }

  getRulesForTrigger(trigger: string): Rule[] {
    return this.rules.filter(rule => rule.trigger === trigger);
  }
}`
                      )}

                      {selectedNestFile === "rule-engine.service.ts" && (
`import { Injectable } from "@nestjs/common";
import { RuleLoaderService } from "./rule-loader.service";
import { StatsClient } from "../clients/stats.client";
import { BadgesClient } from "../clients/badges.client";

@Injectable()
export class RuleEngineService {
  constructor(
    private readonly loader: RuleLoaderService,
    private readonly stats: StatsClient,
    private readonly badges: BadgesClient,
  ) {}

  async run(trigger: string, event: any) {
    const rules = this.loader.getRulesForTrigger(trigger);

    for (const rule of rules) {
      if (this.matches(rule.condition, event)) {
        await this.execute(rule.action, rule.params, event);
      }
    }
  }

  private matches(condition: any, event: any): boolean {
    for (const key of Object.keys(condition)) {
      if (key.endsWith("_gte")) {
        const field = key.replace("_gte", "");
        if (!(event[field] >= condition[key])) return false;
      } else {
        if (event[key] !== condition[key]) return false;
      }
    }
    return true;
  }

  private async execute(action: string, params: any, event: any) {
    switch (action) {
      case "addXp":
        return this.stats.addXp(event.userId, params.xp);

      case "awardBadge":
        return this.badges.awardBadge(event.userId, params.badge);

      default:
        console.log("Unknown action:", action);
    }
  }
}`
                      )}

                      {selectedNestFile === "rule-engine.module.ts" && (
`import { Module } from "@nestjs/common";
import { RuleEngineService } from "./rule-engine.service";
import { RuleLoaderService } from "./rule-loader.service";
import { StatsClient } from "../clients/stats.client";
import { BadgesClient } from "../clients/badges.client";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [
    RuleEngineService,
    RuleLoaderService,
    StatsClient,
    BadgesClient
  ],
  exports: [RuleEngineService]
})
export class RuleEngineModule {}`
                      )}

                      {selectedNestFile === "xp.rules.json" && (
`[
  {
    "id": "xp_correct_answer",
    "trigger": "exercise.completed",
    "condition": {
      "isCorrect": true
    },
    "action": "addXp",
    "params": {
      "xp": 10
    }
  },
  {
    "id": "xp_difficulty_bonus",
    "trigger": "exercise.completed",
    "condition": {
      "difficulty_gte": 4,
      "isCorrect": true
    },
    "action": "addXp",
    "params": {
      "xp": 8
    }
  },
  {
    "id": "award_hard_badge",
    "trigger": "exercise.completed",
    "condition": {
      "difficulty_gte": 5,
      "isCorrect": true
    },
    "action": "awardBadge",
    "params": {
      "badge": "HARD_MASTER"
    }
  }
]`
                      )}
                    </pre>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 4. Celebratory Micro-modal overlay */}
      <AnimatePresence>
        {celebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-b-8 border-[#E5E5E5] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti decoration */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/10 to-transparent pointer-events-none" />

              <span className="text-6xl block select-none animate-bounce">
                {celebration.type === "level" ? "🧠" : "🏆"}
              </span>

              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl text-[#3C3C3C]">
                  {celebration.title}
                </h3>
                <p className="text-xs font-bold text-[#777777] leading-relaxed">
                  {celebration.subtitle}
                </p>
              </div>

              <button
                onClick={() => setCelebration(null)}
                className="w-full py-3 bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#388002] active:border-b-0 active:translate-y-[2px] rounded-2xl text-white font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                AWESOME! LET&apos;S CONTINUE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Dashboard bar */}
      <div className="max-w-5xl mx-auto mt-10 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-black text-[#AFAFAF] uppercase tracking-widest hover:text-[#3C3C3C] transition-colors"
        >
          <span>←</span>
          <span>Back to Zabando Dashboard</span>
        </Link>
      </div>

    </main>
  );
}
