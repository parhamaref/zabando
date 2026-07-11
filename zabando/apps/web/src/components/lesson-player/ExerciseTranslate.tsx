"use client";

import { useState } from "react";

interface ExerciseTranslateProps {
  exercise: {
    question_text: string;
    answer_text: string;
  };
  onAnswer: (result: { correct: boolean; tip: string }) => void;
}

export function ExerciseTranslate({ exercise, onAnswer }: ExerciseTranslateProps) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;
    const correct = text.trim().toLowerCase() === exercise.answer_text.trim().toLowerCase();
    const tip = correct
      ? "ترجمه کاملاً روان و درست است!"
      : `پاسخ درست: "${exercise.answer_text}"`;
    onAnswer({ correct, tip });
  }

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div>
        <span className="font-black text-[10px] uppercase tracking-wider text-[#FF9600] bg-[#FFE8D6] px-2.5 py-1 rounded-full">
          ترجمه متن | Translate
        </span>
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#4B4B4B] mt-4 leading-snug">
          {exercise.question_text}
        </h2>

        <div className="mt-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ترجمه را بنویسید..."
            rows={4}
            className="w-full text-right p-4 rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] focus:bg-white focus:border-[#FF9600] font-bold text-sm sm:text-base outline-none resize-none transition-all placeholder-[#AFAFAF]"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-[#E5E5E5] mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`font-black text-sm uppercase px-8 py-3.5 rounded-2xl border-b-4 transition-all ${
            text.trim()
              ? "bg-[#58CC02] hover:bg-[#46A302] text-white border-[#46A302] hover:border-b-2 active:translate-y-[2px] active:border-b-0 cursor-pointer"
              : "bg-[#E5E5E5] text-[#AFAFAF] border-[#BDBDBD] cursor-not-allowed"
          }`}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
