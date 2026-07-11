"use client";

import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface DailyGoalProps {
  currentXP: number;
  targetXP: number;
  streakDays: number;
}

export function DailyGoalCard({ currentXP, targetXP, streakDays }: DailyGoalProps) {
  const percentage = Math.min((currentXP / targetXP) * 100, 100);

  return (
    <div className="bubble-card p-1 text-slate-800 select-none">
      <div className="bubble-card-inner p-6 bg-gradient-to-b from-amber-50/80 to-orange-50/80 relative overflow-hidden">
        {/* Flame glow behind */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9600]/5 rounded-full blur-xl" />

        <div className="flex justify-between items-start mb-4 z-10 relative">
          <div>
            <h3 className="font-display font-black text-xs text-slate-400 uppercase tracking-wider">
              Daily Goal
            </h3>
            <h2 className="font-display font-black text-xl text-slate-800 mt-0.5">
              Keep the flame hot!
            </h2>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-1.5 bg-[#FFF0E6] border-2 border-[#FFC499] text-[#FF9600] px-3 py-1 rounded-2xl shadow-[0_2px_0_#FFC499]"
          >
            <GameIcon name="streak_flame" size={24} className="flex-shrink-0" />
            <span className="font-display font-black text-sm">{streakDays} Day Streak</span>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mt-4 z-10 relative">
          <div className="flex justify-between text-xs font-black text-slate-600 uppercase tracking-wide">
            <span className="flex items-center gap-1">
              <GameIcon name="xp_orb" size={16} className="inline-block" />
              <span>{currentXP} / {targetXP} XP Completed</span>
            </span>
            <span className="text-[#FF9600]">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden relative border border-slate-300 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.15)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="h-full bg-gradient-to-r from-[#FF9600] to-[#FFC499] rounded-full relative"
            >
              {/* Glossy shine */}
              <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/20 rounded-full" />
            </motion.div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 items-center text-[11px] font-bold text-slate-400 z-10 relative">
          <GameIcon name="xp_orb" size={12} />
          <span>Earn 15 more XP today to maintain your daily streak!</span>
        </div>
      </div>
    </div>
  );
}
