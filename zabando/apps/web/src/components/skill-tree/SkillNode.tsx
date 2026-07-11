"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface Skill {
  id: string;
  name: string;
  order_index: number;
  cefr_level: string;
  mastery_level: number;
  is_locked: boolean;
  firstLessonId?: string;
  x?: number;
  y?: number;
}

interface SkillNodeProps {
  skill: Skill;
}

export function SkillNode({ skill }: SkillNodeProps) {
  const status =
    skill.is_locked ? "locked" :
    skill.mastery_level >= 100 ? "completed" :
    "active";

  // Base styled Tailwind classes matching the Duolingo aesthetic
  const baseClasses = "w-[90px] h-[90px] rounded-full flex flex-col justify-center items-center font-bold text-center select-none shadow-md transition-all duration-250 border-b-6 relative";

  const statusClasses =
    status === "locked"
      ? "bg-[#E5E5E5] text-[#AFAFAF] border-[#BDBDBD] cursor-not-allowed"
      : status === "completed"
      ? "bg-[#58CC02] text-white border-[#46A302] ring-4 ring-[#FFC800] hover:scale-105 cursor-pointer"
      : "bg-[#1CB0F6] text-white border-[#1899D6] hover:scale-105 cursor-pointer";

  // Define Duolingo animations locally to satisfy strict Type constraints of motion/react
  const bounceAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  };

  const pulseAnimation = {
    animate: { scale: [1, 1.05, 1] },
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const }
  };

  const completeAnimation = {
    animate: { rotate: [0, 5, -5, 0] },
    transition: { duration: 0.6, ease: "easeInOut" as const }
  };

  const animation =
    status === "locked" ? bounceAnimation :
    status === "completed" ? completeAnimation :
    pulseAnimation;

  const content = (
    <div className="flex flex-col items-center">
      <motion.div
        className={`${baseClasses} ${statusClasses}`}
        initial={"initial" in animation ? animation.initial : undefined}
        animate={animation.animate}
        transition={animation.transition}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">
            {status === "locked" ? "🔒" : status === "completed" ? "👑" : "🦉"}
          </span>
          <span className="text-[10px] font-black uppercase tracking-tight leading-tight px-1 text-center">
            {skill.name}
          </span>
          <span className="text-[8px] font-mono font-black opacity-80">
            {skill.cefr_level}
          </span>
        </div>
      </motion.div>

      {/* Progress Badge */}
      {status !== "locked" && (
        <div className="mt-2 text-[9px] font-black text-[#777777] bg-white border-2 border-[#E5E5E5] px-2 py-0.5 rounded-full shadow-sm">
          {skill.mastery_level}%
        </div>
      )}
    </div>
  );

  if (status === "locked") {
    return content;
  }

  return (
    <Link href={`/lesson/${skill.firstLessonId ?? skill.id}`} className="block">
      {content}
    </Link>
  );
}
