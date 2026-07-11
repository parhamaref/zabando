"use client";

interface SkillPosition {
  id: string;
  x: number;
  y: number;
}

interface SkillConnectionsProps {
  skills: SkillPosition[];
}

export function SkillConnections({ skills }: SkillConnectionsProps) {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
      {skills.map((skill, i) => {
        const next = skills[i + 1];
        if (!next) return null;

        return (
          <line
            key={`conn-${skill.id}-${next.id}`}
            x1={skill.x}
            y1={skill.y}
            x2={next.x}
            y2={next.y}
            stroke="#93C5FD"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="4 8"
            className="animate-[dash_2s_linear_infinite]"
          />
        );
      })}
    </svg>
  );
}
