"use client";

interface UserStats {
  daily_xp: number;
  daily_goal_xp: number;
}

interface DailyGoalCardProps {
  stats: UserStats;
}

export function DailyGoalCard({ stats }: DailyGoalCardProps) {
  const percent = stats.daily_goal_xp > 0 
    ? Math.min((stats.daily_xp / stats.daily_goal_xp) * 100, 100) 
    : 0;

  return (
    <div id="daily-goal-card" className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-2xl p-5 flex flex-col justify-between transition-all hover:translate-y-[-2px] hover:shadow-md">
      <div>
        <div className="flex items-center gap-3 border-b-2 border-[#F1F1F1] pb-3 mb-4">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="font-display font-black text-sm text-[#AFAFAF] uppercase tracking-wider">
              Daily Goal
            </h3>
            <h2 className="font-display font-black text-lg text-[#4B4B4B] uppercase">
              Today&apos;s Challenge
            </h2>
          </div>
        </div>

        <p className="text-sm font-bold text-[#777777] leading-relaxed mb-4">
          Complete lessons to gain XP and finish your daily learning objective.
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-5 bg-[#E5E5E5] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#FF9600] rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${percent}%` }}
          >
            {/* Glossy sheen highlight */}
            <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="font-mono font-black text-sm text-[#FF9600]">
            {stats.daily_xp} / {stats.daily_goal_xp} XP
          </span>
          <span className="text-xs font-black text-[#58CC02] bg-[#E2F6D5] px-2.5 py-1 rounded-full uppercase">
            {percent >= 100 ? "Goal Met! 🎉" : `${Math.round(percent)}%`}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F1F1F1] text-[11px] text-[#AFAFAF] font-bold text-center">
        Meeting your daily goals maintains your learning momentum!
      </div>
    </div>
  );
}
