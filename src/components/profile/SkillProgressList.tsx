"use client";

import React from "react";
import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface SkillProgressListProps {
  skills: Array<{
    id: string;
    name: string;
    nameFa: string;
    progress: number;
    level: string;
    status: string;
    icon: string;
  }>;
}

export function SkillProgressList({ skills }: SkillProgressListProps) {
  return (
    <div className="space-y-4 select-none">
      <div className="px-1">
        <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider">
          CEFR Syllabus Progress
        </h3>
        <h2 className="font-display font-black text-lg text-[#3C3C3C] mt-0.5">
          Language Competencies
        </h2>
      </div>

      <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 sm:p-6 space-y-4">
        {skills.map((skill, idx) => {
          const isMastered = skill.progress === 100;
          const isLocked = skill.status === "Locked";

          return (
            <div
              key={skill.id}
              className={`p-3 rounded-2xl border border-transparent transition-colors ${
                isLocked ? "opacity-60 bg-[#FAFAFA]" : "hover:bg-[#F9F9F9]"
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <GameIcon name="skill_progress_leaf" size={28} />
                  <div>
                    <h4 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-2">
                      {skill.name}
                      <span className="text-xs bg-[#58CC02]/10 text-[#58CC02] border border-[#58CC02]/20 font-black px-1.5 py-0.5 rounded uppercase tracking-wide">
                        {skill.level}
                      </span>
                    </h4>
                    <p className="text-xs font-bold text-[#AFAFAF] tracking-wide mt-0.5">
                      {skill.nameFa}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isMastered
                      ? "bg-[#DFFFD6] text-[#58CC02] border-[#58CC02]"
                      : isLocked
                      ? "bg-[#E5E5E5] text-[#777777] border-[#CCCCCC]"
                      : "bg-[#FFF0E6] text-[#FF9600] border-[#FF9600]"
                  }`}
                >
                  {skill.status}
                </span>
              </div>

              {/* Progress Line */}
              <div className="relative">
                <div className="h-3.5 bg-[#E5E5E5] rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ type: "spring", stiffness: 70, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${
                      isMastered
                        ? "bg-[#58CC02]"
                        : "bg-gradient-to-r from-[#FF9600] to-[#FFC499]"
                    }`}
                  />
                  {/* Subtle glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </div>
                <div className="flex justify-between items-center mt-1.5 px-0.5">
                  <span className="text-[10px] font-black text-[#777777]">
                    Syllabus Mastery
                  </span>
                  <span className="text-[10px] font-black text-[#3C3C3C]">
                    {skill.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
