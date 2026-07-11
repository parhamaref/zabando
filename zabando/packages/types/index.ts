export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type SkillType = "vocabulary" | "grammar" | "listening" | "speaking" | "reading";

export type ExerciseType = "mcq" | "translate" | "reorder" | "listening" | "roleplay";

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string;
  difficulty: number; // 1 (Very Easy) to 5 (Very Hard)
  skill: SkillType;
  cefr: CEFRLevel;
}

export interface UserProgress {
  userId: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  currentLeague: string;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  scenario: string;
  characterAi: string;
  characterUser: string;
  cefr: CEFRLevel;
}
