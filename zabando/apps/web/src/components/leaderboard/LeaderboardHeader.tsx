"use client";

import { motion } from "motion/react";

interface LeaderboardHeaderProps {
  leagueName: string;
  leagueIcon: string;
}

export function LeaderboardHeader({ leagueName, leagueIcon }: LeaderboardHeaderProps) {
  return (
    <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Glow effect backdrop */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDF4FF]/40 rounded-full blur-2xl -z-10" />

      <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-[#DDF4FF] border-2 border-[#84D8FF] flex items-center justify-center text-3xl shadow-sm select-none"
        >
          {leagueIcon}
        </motion.div>
        <div>
          <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider">
            Weekly Leaderboard
          </h3>
          <h2 className="font-display font-black text-2xl text-[#4B4B4B] uppercase tracking-tight">
            {leagueName} League
          </h2>
          <p className="text-xs font-bold text-[#777777] mt-1">
            Top 3 learners promote to the next tier on Sunday night! 🏆
          </p>
        </div>
      </div>

      {/* Countdown timer */}
      <div className="bg-[#FFF8E7] border-2 border-[#FFD97D] px-4 py-2.5 rounded-2xl flex flex-col items-center select-none">
        <span className="text-[9px] font-black text-[#FF9600] uppercase tracking-wider">Time Remaining</span>
        <span className="font-mono font-black text-sm text-[#FF9600]">
          2d : 14h : 42m
        </span>
      </div>
    </div>
  );
}
