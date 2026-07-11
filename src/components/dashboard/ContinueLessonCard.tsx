"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface ContinueLessonProps {
  unitTitle: string;
  unitNumber: number;
  lessonName: string;
  completedQuizzes: number;
  totalQuizzes: number;
  lessonId: string;
}

export function ContinueLessonCard({
  unitTitle,
  unitNumber,
  lessonName,
  completedQuizzes,
  totalQuizzes,
  lessonId,
}: ContinueLessonProps) {
  const percent = (completedQuizzes / totalQuizzes) * 100;

  return (
    <div className="bubble-card p-1 text-slate-800 select-none">
      <div className="bubble-card-inner p-6 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-indigo-50/80">
        {/* Decorative background shape */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-400/5 rounded-full pointer-events-none" />

        <div className="flex-1 space-y-3 text-center sm:text-left z-10">
          <div>
            <span className="bubble-title-pill px-3 py-1 text-[10px] font-black uppercase tracking-wider inline-block">
              Unit {unitNumber}
            </span>
            <h2 className="font-display font-black text-2xl mt-2 tracking-tight leading-none text-slate-800">
              {unitTitle}
            </h2>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-500">
              Current Module: <span className="font-black text-slate-700">{lessonName}</span>
            </p>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" style={{ width: `${percent}%` }} />
              </div>
              <span className="text-[11px] font-black uppercase text-slate-600">
                {completedQuizzes} / {totalQuizzes} Lessons
              </span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto z-10">
          <Link
            href={`/lesson/${lessonId}`}
            className="bubble-btn-green block w-full text-center sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider"
          >
            CONTINUE PATH 🎯
          </Link>
        </div>
      </div>
    </div>
  );
}
