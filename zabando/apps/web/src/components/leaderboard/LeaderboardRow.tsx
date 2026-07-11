"use client";

import { motion } from "motion/react";

interface User {
  id: string;
  display_name: string;
  level: number;
  weekly_xp: number;
  avatar_emoji: string;
}

interface LeaderboardRowProps {
  user: User;
  isMe: boolean;
  rank: number;
}

export function LeaderboardRow({ user, isMe, rank }: LeaderboardRowProps) {
  // Define crowns or medals for the top 3
  const medal =
    rank === 1 ? "🥇" :
    rank === 2 ? "🥈" :
    rank === 3 ? "🥉" :
    null;

  // Spring animation for entering rows
  const rowEnter = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 100, damping: 15, delay: rank * 0.05 }
  };

  return (
    <motion.div
      initial={rowEnter.initial}
      animate={rowEnter.animate}
      transition={rowEnter.transition}
      className={`flex items-center justify-between p-4 rounded-2xl border-2 border-b-4 transition-all ${
        isMe
          ? "bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6]"
          : "bg-white border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#4B4B4B]"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Rank/Medal slot */}
        <div className="w-8 flex justify-center items-center font-mono font-black text-sm">
          {medal ? <span className="text-xl">{medal}</span> : <span>{rank}</span>}
        </div>

        {/* User Avatar & Info */}
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-slate-100 p-1.5 rounded-xl select-none">
            {user.avatar_emoji || "🦉"}
          </span>
          <div className="flex flex-col text-right sm:text-left">
            <span className="font-display font-black text-sm sm:text-base">
              {user.display_name} {isMe && <span className="text-[10px] bg-[#1CB0F6] text-white px-1.5 py-0.5 rounded-full uppercase ml-1">You</span>}
            </span>
            <span className="text-[10px] font-black text-[#AFAFAF] uppercase tracking-wide">
              Level {user.level}
            </span>
          </div>
        </div>
      </div>

      {/* Weekly XP Count */}
      <div className="text-right">
        <span className="font-mono font-black text-sm sm:text-base">
          {user.weekly_xp}
        </span>
        <span className="text-[9px] font-black text-[#AFAFAF] block uppercase tracking-wide">
          XP This Week
        </span>
      </div>
    </motion.div>
  );
}
