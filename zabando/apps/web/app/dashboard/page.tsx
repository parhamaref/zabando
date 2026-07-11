import { UserStatsCard } from "./components/UserStatsCard";
import { DailyGoalCard } from "./components/DailyGoalCard";
import { ContinueLessonCard } from "./components/ContinueLessonCard";
import { SkillTreePreview } from "./components/SkillTreePreview";
import { NotificationsCard } from "./components/NotificationsCard";

// Mock data reflecting Duolingo standard courses and CEFR progressions
const simulatedStats = {
  xp_total: 820,
  current_streak_days: 14,
  longest_streak_days: 35,
  level: 8,
  display_name: "Parham Aref",
  daily_xp: 40,
  daily_goal_xp: 50,
};

const simulatedNextLesson = {
  id: "lesson-basics-1",
  title: "A1: Basic Introductions & Coffee Talk",
  skill_name: "Greetings",
  estimated_duration_min: 5,
};

const simulatedSkills = [
  {
    id: "skill-vocab-1",
    name: "Greetings",
    order_index: 1,
    cefr_level: "A1",
    mastery_level: 100,
    is_locked: false,
    firstLessonId: "lesson-greet-1"
  },
  {
    id: "skill-vocab-2",
    name: "Basics 1",
    order_index: 2,
    cefr_level: "A1",
    mastery_level: 60,
    is_locked: false,
    firstLessonId: "lesson-basics-1"
  },
  {
    id: "skill-grammar-1",
    name: "Present Tense",
    order_index: 3,
    cefr_level: "A2",
    mastery_level: 0,
    is_locked: false,
    firstLessonId: "lesson-present-1"
  },
  {
    id: "skill-listening-1",
    name: "Travel Talk",
    order_index: 4,
    cefr_level: "B1",
    mastery_level: 0,
    is_locked: true,
    firstLessonId: "lesson-travel-1"
  }
];

const simulatedNotifications = [
  {
    id: "notif-1",
    message: "🔥 Your daily streak is at risk! Complete 1 lesson now to keep it active.",
    timestamp: "2 hours ago",
    type: "warning" as const,
  },
  {
    id: "notif-2",
    message: "🏆 You unlocked the 'Fluent Conversationalist' achievement badge!",
    timestamp: "Yesterday",
    type: "success" as const,
  },
  {
    id: "notif-3",
    message: "🦉 Tip of the day: Tap on any word inside lessons to get its instant translation.",
    timestamp: "2 days ago",
    type: "info" as const,
  }
];

export default async function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#4B4B4B] py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Banner Row */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-[#E5E5E5] pb-6 mb-8 gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-[#4B4B4B] uppercase tracking-wide">
            🦉 Your Dashboard
          </h1>
          <p className="text-sm font-bold text-[#777777] mt-1">
            Welcome back! Let&apos;s hit today&apos;s targets and unlock new CEFR milestones.
          </p>
        </div>
        <div className="bg-[#58CC02] text-white border-2 border-b-4 border-[#46A302] px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wide shadow-sm hover:translate-y-[2px] hover:border-b-2 transition-all">
          🔥 {simulatedStats.current_streak_days} Day Streak
        </div>
      </div>

      {/* Grid Layout of the Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 cards */}
        <UserStatsCard stats={simulatedStats} />
        <DailyGoalCard stats={simulatedStats} />
        <ContinueLessonCard lesson={simulatedNextLesson} />

        {/* Row 2 - Wide content layout */}
        <div className="md:col-span-2 lg:col-span-2">
          <SkillTreePreview skills={simulatedSkills} />
        </div>
        
        {/* Row 2 - Side panel notifications */}
        <div className="md:col-span-1">
          <NotificationsCard notifications={simulatedNotifications} />
        </div>
      </div>
    </main>
  );
}
