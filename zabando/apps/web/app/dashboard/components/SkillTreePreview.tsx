"use client";

import Link from "next/link";
import { SkillNode } from "../../../src/components/skill-tree/SkillNode";

interface Skill {
  id: string;
  name: string;
  order_index: number;
  cefr_level: string;
  mastery_level: number;
  is_locked: boolean;
  firstLessonId?: string;
}

interface SkillTreePreviewProps {
  skills: Skill[];
}

export function SkillTreePreview({ skills }: SkillTreePreviewProps) {
  // Take up to 4 elements for a neat preview strip
  const previewSkills = [...skills]
    .sort((a, b) => a.order_index - b.order_index)
    .slice(0, 4);

  return (
    <div id="skill-tree-preview" className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-2xl p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-[#F1F1F1]">
        <div>
          <h3 className="font-display font-black text-sm text-[#AFAFAF] uppercase tracking-wider">
            Learning Path
          </h3>
          <h2 className="font-display font-black text-lg text-[#4B4B4B] uppercase">
            Your Course Map
          </h2>
        </div>
        <Link 
          href="/skill-tree" 
          className="text-xs font-black text-[#1CB0F6] bg-[#DDF4FF] hover:bg-[#B8E6FF] border-2 border-[#84D8FF] px-4 py-2 rounded-xl uppercase tracking-wide transition-all"
        >
          View Full Tree
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-8 py-4">
        {previewSkills.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center">
            <SkillNode skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
}
