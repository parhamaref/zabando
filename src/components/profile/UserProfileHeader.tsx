"use client";

import React from "react";
import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface UserProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    email: string;
    joinedDate: string;
    role: string;
    languages: Array<{ name: string; level: string; flag: string }>;
  };
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 select-none relative overflow-hidden">
      {/* Background soft color blob */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#1CB0F6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left z-10">
        {/* Animated Avatar bubble with hover state */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F1F1F1] border-4 border-white shadow-md rounded-full flex items-center justify-center p-2 select-none cursor-pointer"
        >
          <GameIcon name="profile_avatar" size={80} />
        </motion.div>
 
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#3C3C3C] tracking-tight leading-none">
              {user.name}
            </h1>
            <span className="bg-[#DDF4FF] border border-[#84D8FF] text-[#1899D6] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider self-center sm:self-auto">
              {user.role}
            </span>
          </div>

          <p className="text-sm font-black text-[#AFAFAF] uppercase tracking-wider">
            @{user.username}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs font-bold text-[#777777] justify-center sm:justify-start">
            <span className="flex items-center gap-1">
              <span>📧</span> {user.email}
            </span>
            <span className="hidden sm:inline text-[#E5E5E5]">•</span>
            <span className="flex items-center gap-1">
              <span>📅</span> Joined {user.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Languages Display Section */}
      <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-[#F1F1F1] pt-6 sm:pt-0 sm:pl-8 flex flex-col items-center sm:items-start gap-2.5 select-none w-full sm:w-auto">
        <span className="text-[10px] font-black uppercase text-[#AFAFAF] tracking-widest">
          STUDYING LANGUAGES
        </span>
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {user.languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-2 bg-[#F7F7F7] border border-[#E5E5E5] px-3.5 py-1.5 rounded-2xl shadow-sm"
            >
              <GameIcon name="language_flag" size={28} />
              <div className="text-left">
                <p className="text-xs font-black text-[#3C3C3C]">{lang.name}</p>
                <p className="text-[9px] font-bold text-[#777777] uppercase tracking-wider">
                  {lang.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
