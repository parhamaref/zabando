export interface ExerciseCompletedEvent {
  userId: string;
  exerciseId: string;
  isCorrect: boolean;
  difficulty: number; // 1–5
}

export interface LessonCompletedEvent {
  userId: string;
  lessonId: string;
}
