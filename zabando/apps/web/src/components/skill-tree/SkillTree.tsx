"use client";

import { useMemo } from "react";
import { SkillNode } from "./SkillNode";
import { SkillConnections } from "./SkillConnections";

interface Skill {
  id: string;
  name: string;
  order_index: number;
  cefr_level: string;
  mastery_level: number;
  is_locked: boolean;
  firstLessonId?: string;
}

interface SkillTreeProps {
  skills: Skill[];
}

export function SkillTree({ skills }: SkillTreeProps) {
  // Sort by order_index to present a clean learning map
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => a.order_index - b.order_index);
  }, [skills]);

  // Dynamically compute exact layout coordinates (relative to standard 400px container)
  // for drawing the SVG lines accurately.
  const positionedSkills = useMemo(() => {
    return sortedSkills.map((skill, index) => {
      // Offset left, center, right to simulate the legendary snake path of Duolingo
      const remStep = index % 3;
      let xOffset = 200; // Center (for a 400px wide wrapper)
      
      if (remStep === 1) {
        xOffset = 270; // Offset Right
      } else if (remStep === 2) {
        xOffset = 130; // Offset Left
      }

      return {
        ...skill,
        x: xOffset,
        y: index * 140 + 60, // Spacing of 140px vertically
      };
    });
  }, [sortedSkills]);

  return (
    <div className="relative w-full max-w-[400px] mx-auto py-12 flex flex-col items-center">
      {/* Skill connections path behind nodes */}
      <div className="absolute inset-0 z-0">
        <SkillConnections skills={positionedSkills} />
      </div>

      {/* Rendered Skill nodes */}
      <div className="relative z-10 w-full flex flex-col gap-[50px] items-center">
        {positionedSkills.map((skill, index) => {
          const remStep = index % 3;
          const translateClass = 
            remStep === 1 
              ? "translate-x-[70px]" 
              : remStep === 2 
              ? "-translate-x-[70px]" 
              : "";

          return (
            <div 
              key={skill.id} 
              className={`transition-all duration-300 transform ${translateClass}`}
            >
              <SkillNode skill={skill} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
