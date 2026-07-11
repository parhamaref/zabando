"use client";

interface XPProgressBarProps {
  xp: number;
  goal: number;
}

export function XPProgressBar({ xp, goal }: XPProgressBarProps) {
  const percent = goal > 0 ? Math.min((xp / goal) * 100, 100) : 0;

  return (
    <div className="w-full">
      <div className="w-full bg-[#E5E5E5] h-3.5 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-[#1CB0F6] rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${percent}%` }}
        >
          {/* Gleam highlight */}
          <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/25 rounded-full" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2.5 text-xs font-bold text-[#AFAFAF]">
        <span>{xp} XP Earned</span>
        <span>{goal} XP Weekly Goal</span>
      </div>
    </div>
  );
}
