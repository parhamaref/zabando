"use client";

import React from "react";
import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface UserBadgesProps {
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string | null;
    tier: string;
  }>;
}

export function UserBadges({ badges }: UserBadgesProps) {
  return (
    <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 select-none relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute right-0 bottom-0 w-36 h-36 bg-[#FFD700]/5 rounded-full pointer-events-none" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider">
            Zabando Achievements
          </h3>
          <h2 className="font-display font-black text-xl text-[#3C3C3C] mt-0.5">
            Unlocked Badges & Trophies
          </h2>
        </div>
        <span className="text-xs bg-[#FFD700]/10 text-[#FF9600] border border-[#FFD700]/25 font-black px-2.5 py-1 rounded-full uppercase tracking-wider select-none flex items-center gap-1">
          <GameIcon name="badge_medal" size={14} />
          <span>{badges.filter((b) => b.unlockedAt).length} / {badges.length} Unlocked</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {badges.map((badge, idx) => {
          const isUnlocked = !!badge.unlockedAt;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-2xl border-2 border-b-4 flex items-center gap-4 transition-all relative overflow-hidden ${
                isUnlocked
                  ? badge.tier === "Gold"
                    ? "bg-[#FFFDF0] border-[#FFD700] hover:bg-[#FFFDF0]/80"
                    : "bg-[#F9FAFB] border-[#D1D5DB] hover:bg-[#F3F4F6]"
                  : "bg-[#FAFAFA] border-[#E5E5E5] opacity-50"
              }`}
            >
              {/* Badge Icon circle */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center p-1 shadow-sm border-2 ${
                  isUnlocked
                    ? badge.tier === "Gold"
                      ? "bg-gradient-to-tr from-[#FFF7C2] to-white border-[#FFD700]"
                      : "bg-gradient-to-tr from-[#E5E7EB] to-white border-[#D1D5DB]"
                    : "bg-[#E5E5E5] border-[#CCCCCC]"
                }`}
              >
                {isUnlocked ? (
                  <GameIcon name="badge_medal" size={42} />
                ) : (
                  <GameIcon name="skill_locked" size={32} />
                )}
              </div>

              {/* Badge Metadata */}
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-display font-black text-sm text-[#3C3C3C]">
                    {badge.name}
                  </h4>
                  {isUnlocked && (
                    <span
                      className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                        badge.tier === "Gold"
                          ? "bg-[#FEF08A] text-[#A16207] border-[#FDE047]"
                          : "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]"
                      }`}
                    >
                      {badge.tier}
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-[#777777] leading-tight pr-2">
                  {badge.description}
                </p>

                {isUnlocked && badge.unlockedAt && (
                  <p className="text-[9px] font-bold text-[#AFAFAF] uppercase tracking-wider mt-1 block">
                    🔓 Unlocked {badge.unlockedAt}
                  </p>
                )}
                {!isUnlocked && (
                  <p className="text-[9px] font-bold text-[#AFAFAF] uppercase tracking-wider mt-1 block">
                    🔒 Currently Locked
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
