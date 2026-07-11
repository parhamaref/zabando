"use client";

import Link from "next/link";

interface NextLesson {
  id: string;
  title: string;
  skill_name?: string;
  estimated_duration_min?: number;
}

interface ContinueLessonCardProps {
  lesson: NextLesson;
}

export function ContinueLessonCard({ lesson }: ContinueLessonCardProps) {
  return (
    <Link href={`/lesson/${lesson.id}`} className="block">
      <div id="continue-lesson-card" className="bg-[#DDF4FF] border-2 border-[#84D8FF] border-b-6 rounded-2xl p-5 flex flex-col justify-between h-full transition-all hover:translate-y-[-2px] hover:shadow-md cursor-pointer group active:translate-y-[2px] active:border-b-4">
        <div>
          <div className="flex items-center gap-3 border-b-2 border-[#B8E6FF] pb-3 mb-4">
            <span className="text-3xl">🚀</span>
            <div>
              <h3 className="font-display font-black text-sm text-[#1899D6] uppercase tracking-wider">
                Up Next
              </h3>
              <h2 className="font-display font-black text-lg text-[#1CB0F6] uppercase">
                Continue Pathway
              </h2>
            </div>
          </div>

          <h4 className="font-display font-black text-base text-[#4B4B4B] group-hover:text-[#1CB0F6] transition-colors leading-snug">
            {lesson.title}
          </h4>
          
          {lesson.skill_name && (
            <span className="inline-block mt-2 font-mono text-[10px] font-black text-[#1899D6] bg-white border border-[#B8E6FF] px-2 py-0.5 rounded-full uppercase">
              {lesson.skill_name}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-bold text-[#777777] font-mono">
            ⏱️ {lesson.estimated_duration_min || 5} min read
          </span>
          <span className="bg-[#1CB0F6] text-white font-black text-xs uppercase px-4 py-2 rounded-xl border-b-4 border-[#1899D6] group-hover:bg-[#1899D6] transition-all">
            Start Now
          </span>
        </div>
      </div>
    </Link>
  );
}
