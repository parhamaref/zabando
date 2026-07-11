"use client";

import { ExerciseMCQ } from "./ExerciseMCQ";
import { ExerciseTranslate } from "./ExerciseTranslate";
import { ExerciseReorder } from "./ExerciseReorder";
import { ExerciseListening } from "./ExerciseListening";

interface ExerciseRendererProps {
  exercise: any;
  onAnswer: (result: { correct: boolean; tip: string }) => void;
}

export function ExerciseRenderer({ exercise, onAnswer }: ExerciseRendererProps) {
  switch (exercise.type) {
    case "mcq":
      return <ExerciseMCQ exercise={exercise} onAnswer={onAnswer} />;
    case "translate":
      return <ExerciseTranslate exercise={exercise} onAnswer={onAnswer} />;
    case "reorder":
      return <ExerciseReorder exercise={exercise} onAnswer={onAnswer} />;
    case "listening":
      return <ExerciseListening exercise={exercise} onAnswer={onAnswer} />;
    default:
      return (
        <div className="p-6 text-center text-[#777777] font-bold">
          نوع تمرین شناسایی نشد یا پشتیبانی نمی‌شود.
        </div>
      );
  }
}
