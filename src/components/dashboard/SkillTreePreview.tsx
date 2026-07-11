"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GameIcon } from "../GameIcon";

interface SkillNode {
  id: string;
  name: string;
  level: string;
  isLocked: boolean;
  score: number; // 0 to 100
  icon: string;
}

interface SkillTreePreviewProps {
  skills: SkillNode[];
}

export function SkillTreePreview({ skills }: SkillTreePreviewProps) {
  return (
    <div className="bubble-card p-1 text-slate-800 select-none">
      <div className="bubble-card-inner p-6 bg-gradient-to-b from-blue-50/70 to-purple-50/70">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display font-black text-xs text-slate-400 uppercase tracking-wider">
              Your Skills Path
            </h3>
            <h2 className="font-display font-black text-xl text-slate-800">
              Active Learning Paths
            </h2>
          </div>
          <Link
            href="/skill-tree"
            className="text-xs font-black text-[#1CB0F6] hover:text-[#1899D6] uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>View Full Tree</span>
            <GameIcon name="skill_path" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => {
            // Determine cartoon icon based on state
            let iconName = "skill_node";
            if (skill.isLocked) {
              iconName = "skill_locked";
            } else if (skill.score === 100) {
              iconName = "skill_completed";
            }

            return (
              <div
                key={skill.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  skill.isLocked
                    ? "bg-slate-100/80 border-slate-300 text-slate-400 opacity-65 shadow-[2px_2px_0px_rgba(0,0,0,0.05)]"
                    : "bg-white border-slate-700 hover:bg-[#F9F9F9] text-slate-700 shadow-[3px_3px_0px_0px_rgba(30,62,98,0.9)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 bg-slate-50 p-1.5 rounded-xl border border-slate-100 shadow-sm select-none">
                    <GameIcon name={iconName} size={36} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-sm tracking-wide text-slate-800">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      {skill.level} {skill.isLocked ? "• Locked" : `• ${skill.score}% Mastered`}
                    </span>
                  </div>
                </div>

                <div>
                  {skill.isLocked ? (
                    <GameIcon name="skill_locked" size={20} />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50/50 flex items-center justify-center text-xs font-mono font-black text-emerald-600 shadow-[0_2px_0_rgba(16,185,129,0.2)]">
                      {skill.score}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
