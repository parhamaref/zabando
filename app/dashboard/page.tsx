"use client";

import { motion } from "motion/react";
import { DailyGoalCard } from "../../src/components/dashboard/DailyGoalCard";
import { ContinueLessonCard } from "../../src/components/dashboard/ContinueLessonCard";
import { SkillTreePreview } from "../../src/components/dashboard/SkillTreePreview";
import { NotificationsCard } from "../../src/components/dashboard/NotificationsCard";
import Link from "next/link";

const PROFILE_DATA = {
  name: "Parham Aref",
  avatar: "🦊",
  level: 8,
  leagueName: "Ruby League",
  leagueIcon: "❤️",
  hearts: 5,
};

const DUMMY_SKILLS = [
  { id: "basics", name: "Basics & Greeting", level: "CEFR A1", isLocked: false, score: 100, icon: "🌸" },
  { id: "dining", name: "Food & Dining", level: "CEFR A2", isLocked: false, score: 45, icon: "🍕" },
  { id: "slang", name: "Slang & Idioms", level: "CEFR B1", isLocked: true, score: 0, icon: "🤠" },
  { id: "grammar", name: "Compound Verbs", level: "CEFR B2", isLocked: true, score: 0, icon: "📝" },
];

const DUMMY_ALERTS = [
  {
    id: "a-1",
    type: "achievement" as const,
    textEn: "Phenomenal effort! Your conversational listening accuracy has increased by 15% this week.",
    textFa: "تلاش فوق‌العاده! دقت شنیداری مکالمه شما این هفته ۱۵٪ افزایش یافته است.",
    date: "TODAY",
    icon: "🎉",
  },
  {
    id: "a-2",
    type: "tip" as const,
    textEn: "Grammar Tip: Persian adjectives usually follow the noun they modify, linked with an 'Ezafe' sound (e.g. ketâb-e xub = good book).",
    textFa: "نکته گرامری: صفت‌ها در فارسی معمولاً بعد از اسم می‌آیند و با صدای کسره (اضافه) متصل می‌شوند (مثال: کتابِ خوب).",
    date: "2 DAYS AGO",
    icon: "💡",
  }
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#4B4B4B] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* User Profile Welcome Header */}
        <div className="bubble-card p-1 select-none">
          <div className="bubble-card-inner p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 to-purple-50/70">
            {/* Subtle decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />

            <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left z-10">
              <span className="text-5xl bg-white p-3 rounded-[24px] border-2 border-slate-700 select-none shadow-[3px_3px_0px_0px_rgba(30,62,98,0.9)]">
                {PROFILE_DATA.avatar}
              </span>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="font-display font-black text-2xl text-slate-800">
                    Welcome back, {PROFILE_DATA.name}!
                  </h1>
                  <span className="bubble-title-pill px-3 py-0.5 text-[10px]">
                    Level {PROFILE_DATA.level}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 mt-1">
                  You are competing in the <span className="text-[#FF9600] font-black">{PROFILE_DATA.leagueName} {PROFILE_DATA.leagueIcon}</span> this week.
                </p>
              </div>
            </div>

            {/* Quick stats items */}
            <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start z-10">
              <Link
                href="/profile/omnom"
                className="flex items-center gap-1.5 bg-[#EAFBEA] border-2 border-slate-700 px-3 py-1.5 rounded-2xl hover:bg-[#D4FCD4] transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.15)] text-slate-700 font-bold active:translate-y-[1px] active:shadow-none"
              >
                <span className="text-lg">🟢</span>
                <span className="font-mono font-black text-xs text-[#2EA42E]">Om Nom Profile</span>
              </Link>
              <Link
                href="/skill-tree"
                className="flex items-center gap-1.5 bg-[#FFFCE3] border-2 border-slate-700 px-3 py-1.5 rounded-2xl hover:bg-[#FFF5D0] transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.15)] text-slate-700 font-bold active:translate-y-[1px] active:shadow-none"
              >
                <span className="text-lg">🗺️</span>
                <span className="font-mono font-black text-xs text-[#D68200]">Skill Tree Map</span>
              </Link>
              <div className="flex items-center gap-1 bg-[#FFF0F5] border-2 border-slate-700 px-3 py-1.5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)] text-slate-700 font-bold">
                <span className="text-lg">❤️</span>
                <span className="font-mono font-black text-xs text-[#FF4B4B]">{PROFILE_DATA.hearts} Hearts</span>
              </div>
              <Link
                href="/leaderboard"
                className="flex items-center gap-1 bg-[#E8F8FF] border-2 border-slate-700 px-3 py-1.5 rounded-2xl hover:bg-[#DDF4FF] transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.15)] text-slate-700 font-bold active:translate-y-[1px] active:shadow-none"
              >
                <span className="text-lg">🏆</span>
                <span className="font-mono font-black text-xs text-[#1CB0F6]">Ruby #2</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions / Suggested Quiz Launcher */}
        <ContinueLessonCard
          unitNumber={1}
          unitTitle="Introductory Persian & Basic Conversations"
          lessonName="Greetings & Common Polite Terms (تعارف)"
          completedQuizzes={2}
          totalQuizzes={5}
          lessonId="vocab-basics"
        />

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Daily Goal Card */}
            <DailyGoalCard
              currentXP={320}
              targetXP={500}
              streakDays={5}
            />

            {/* Smart notifications */}
            <NotificationsCard notifications={DUMMY_ALERTS} />
          </div>

          <div>
            {/* Skill path list */}
            <SkillTreePreview skills={DUMMY_SKILLS} />
          </div>
        </div>

      </div>
    </main>
  );
}
