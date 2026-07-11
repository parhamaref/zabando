"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 h-4 bg-[#E5E5E5] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-[#58CC02] rounded-full transition-all duration-300 ease-out relative"
          style={{ width: `${percent}%` }}
        >
          {/* Light gleam highlight to give it a 3D glass look */}
          <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
      <span className="font-mono font-black text-xs text-[#AFAFAF] shrink-0">
        {current}/{total}
      </span>
    </div>
  );
}
