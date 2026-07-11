"use client";

import React from "react";
import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface WeeklyActivityChartProps {
  weekly: Array<{ day: string; xp: number }>;
}

export function WeeklyActivityChart({ weekly }: WeeklyActivityChartProps) {
  const maxXP = Math.max(...weekly.map((d) => d.xp), 50); // Avoid divide by zero, default min scale limit

  return (
    <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 select-none relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -left-12 -top-12 w-32 h-32 bg-[#58CC02]/5 rounded-full pointer-events-none" />

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <GameIcon name="activity_bar" size={36} />
          <div>
            <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider">
              Weekly Activity Log
            </h3>
            <h2 className="font-display font-black text-xl text-[#3C3C3C] mt-0.5">
              Daily XP Performance
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FFF0E6] border border-[#FFD9BF] px-3 py-1 rounded-full text-[10px] font-black text-[#FF9600] uppercase tracking-wider">
          <GameIcon name="xp_orb" size={12} />
          <span>Avg: {Math.round(weekly.reduce((acc, d) => acc + d.xp, 0) / weekly.length)} XP/Day</span>
        </div>
      </div>

      {/* Grid of Columns for Days */}
      <div className="grid grid-cols-7 gap-3 sm:gap-4 h-48 items-end px-2 pt-4 relative">
        {/* Horizontal grid lines */}
        <div className="absolute left-0 right-0 top-1/4 border-b border-[#F1F1F1] -z-10 pointer-events-none" />
        <div className="absolute left-0 right-0 top-2/4 border-b border-[#F1F1F1] -z-10 pointer-events-none" />
        <div className="absolute left-0 right-0 top-3/4 border-b border-[#F1F1F1] -z-10 pointer-events-none" />

        {weekly.map((item, idx) => {
          const heightPercent = Math.min((item.xp / maxXP) * 100, 100);
          const isHighest = item.xp === maxXP;

          return (
            <div key={item.day} className="flex flex-col items-center gap-2.5 h-full justify-end group">
              {/* Floating Tooltip Label on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-[#3C3C3C] text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md pointer-events-none z-10">
                {item.xp} XP
              </div>

              {/* Animated Bar Column */}
              <div className="w-full bg-[#F1F1F1] rounded-2xl h-full flex items-end overflow-hidden relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 12, delay: idx * 0.05 }}
                  className={`w-full rounded-b-2xl relative transition-all ${
                    isHighest
                      ? "bg-gradient-to-t from-[#FF9600] to-[#FFC499]"
                      : "bg-gradient-to-t from-[#58CC02] to-[#8BE942]"
                  }`}
                >
                  {/* Glassy reflection top shine */}
                  <div className="absolute top-1 left-1.5 right-1.5 h-1 bg-white/25 rounded-full" />
                </motion.div>
              </div>

              {/* Day Label text */}
              <span className="font-display font-black text-xs text-[#777777] tracking-wide uppercase">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom informational bar */}
      <div className="mt-6 pt-4 border-t-2 border-[#F1F1F1] flex items-center justify-between text-[11px] font-bold text-[#AFAFAF]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#58CC02] rounded-full" />
          <span>Completed Days</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF9600] rounded-full" />
          <span>Weekly Peak Day</span>
        </div>
      </div>
    </div>
  );
}
