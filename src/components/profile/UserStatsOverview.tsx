"use client";

import React from "react";
import { motion } from "motion/react";

interface UserStatsOverviewProps {
  stats: {
    xp: number;
    level: number;
    streak: number;
    hearts: number;
    completedLessons: number;
    totalStudyTimeMinutes: number;
    league: {
      name: string;
      icon: string;
      rank: number;
    };
  };
}

export function UserStatsOverview({ stats }: UserStatsOverviewProps) {
  const statsList = [
    {
      label: "TOTAL XP",
      value: `${stats.xp} XP`,
      icon: "⚡",
      bgClass: "bg-[#FFF0E6] border-[#FFC499] text-[#FF9600]",
    },
    {
      label: "STREAK",
      value: `${stats.streak} Days`,
      icon: "🔥",
      bgClass: "bg-[#FFF0F5] border-[#FFD2DF] text-[#FF4B4B]",
    },
    {
      label: "CURRENT LEVEL",
      value: `LVL ${stats.level}`,
      icon: "🧠",
      bgClass: "bg-[#F3E8FF] border-[#D8B4FE] text-[#9333EA]",
    },
    {
      label: "LEAGUE DIVISION",
      value: `${stats.league.name}`,
      icon: stats.league.icon,
      bgClass: "bg-[#E8F8FF] border-[#B3E5FC] text-[#1CB0F6]",
      subtext: `Rank #${stats.league.rank} in Division`,
    },
    {
      label: "LESSONS FINISHED",
      value: `${stats.completedLessons}`,
      icon: "👑",
      bgClass: "bg-[#F0FDF4] border-[#BBF7D0] text-[#16A34A]",
    },
    {
      label: "TOTAL TIME",
      value: `${Math.round(stats.totalStudyTimeMinutes / 60)} Hrs`,
      icon: "⏳",
      bgClass: "bg-[#FEF9C3] border-[#FEF08A] text-[#CA8A04]",
      subtext: `${stats.totalStudyTimeMinutes} minutes active`,
    }
  ];

  return (
    <div className="space-y-4 select-none">
      <div className="px-1">
        <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider">
          Learning Statistics
        </h3>
        <h2 className="font-display font-black text-lg text-[#3C3C3C] mt-0.5">
          Progress Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        {statsList.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className={`p-4 rounded-2xl border-2 border-b-4 flex items-center justify-between ${stat.bgClass}`}
          >
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-wider block opacity-75">
                {stat.label}
              </span>
              <span className="font-display font-black text-xl tracking-tight block">
                {stat.value}
              </span>
              {stat.subtext && (
                <span className="text-[9px] font-bold opacity-80 block uppercase tracking-wide">
                  {stat.subtext}
                </span>
              )}
            </div>
            <span className="text-3xl select-none">{stat.icon}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
