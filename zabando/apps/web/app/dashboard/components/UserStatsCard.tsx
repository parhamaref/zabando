"use client";

interface UserStats {
  xp_total: number;
  current_streak_days: number;
  longest_streak_days: number;
  level: number;
  display_name?: string;
  avatar_url?: string;
}

interface UserStatsCardProps {
  stats: UserStats;
}

export function UserStatsCard({ stats }: UserStatsCardProps) {
  return (
    <div id="user-stats-card" className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-2xl p-5 flex flex-col justify-between transition-all hover:translate-y-[-2px] hover:shadow-md">
      <div className="flex items-center gap-3 border-b-2 border-[#F1F1F1] pb-3 mb-4">
        <span className="text-3xl">🦉</span>
        <div>
          <h3 className="font-display font-black text-sm text-[#AFAFAF] uppercase tracking-wider">
            User Statistics
          </h3>
          <h2 className="font-display font-black text-lg text-[#4B4B4B] uppercase">
            {stats.display_name || "Zabando Learner"}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* XP Total */}
        <div className="bg-[#FFF8E7] border-2 border-[#FFD97D] border-b-4 rounded-xl p-3 text-center">
          <span className="text-2xl">⭐</span>
          <span className="block font-mono font-black text-xl text-[#FF9600] mt-1">
            {stats.xp_total}
          </span>
          <span className="text-[10px] font-black text-[#FF9600]/80 uppercase tracking-tight">
            Total XP
          </span>
        </div>

        {/* Streak */}
        <div className="bg-[#FFE8D6] border-2 border-[#FFA366] border-b-4 rounded-xl p-3 text-center">
          <span className="text-2xl">🔥</span>
          <span className="block font-mono font-black text-xl text-[#FF9600] mt-1">
            {stats.current_streak_days}
          </span>
          <span className="text-[10px] font-black text-[#E07B00]/80 uppercase tracking-tight">
            Days Streak
          </span>
        </div>

        {/* Level */}
        <div className="bg-[#EBF8FF] border-2 border-[#90CDF4] border-b-4 rounded-xl p-3 text-center">
          <span className="text-2xl">👑</span>
          <span className="block font-mono font-black text-xl text-[#2B6CB0] mt-1">
            {stats.level}
          </span>
          <span className="text-[10px] font-black text-[#2B6CB0]/80 uppercase tracking-tight">
            Level
          </span>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-[#AFAFAF] font-bold text-center">
        Longest streak: {stats.longest_streak_days} days! Keep it burning 🔥
      </div>
    </div>
  );
}
