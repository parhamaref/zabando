"use client";

import { useState } from "react";

interface Option {
  id: string;
  option_text: string;
  is_correct: boolean;
}

interface ExerciseMCQProps {
  exercise: {
    question_text: string;
    options: Option[];
  };
  onAnswer: (result: { correct: boolean; tip: string }) => void;
}

export function ExerciseMCQ({ exercise, onAnswer }: ExerciseMCQProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSubmit() {
    if (!selectedId) return;
    const selectedOption = exercise.options.find(opt => opt.id === selectedId);
    if (!selectedOption) return;

    const correct = selectedOption.is_correct;
    const tip = correct
      ? "تلفظ و معنی کلمه کاملاً دقیق انتخاب شد."
      : "پاسخ صحیح گزینه دیگری بود. مجدد بررسی کنید.";
    onAnswer({ correct, tip });
  }

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div>
        <span className="font-black text-[10px] uppercase tracking-wider text-[#1CB0F6] bg-[#DDF4FF] px-2.5 py-1 rounded-full">
          چند گزینه‌ای | MCQ
        </span>
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#4B4B4B] mt-4 leading-snug">
          {exercise.question_text}
        </h2>

        <div className="grid grid-cols-1 gap-3 mt-8">
          {exercise.options.map((option, idx) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedId(option.id)}
                className={`w-full text-right p-4 rounded-2xl border-2 border-b-4 font-bold transition-all text-sm sm:text-base cursor-pointer ${
                  isSelected
                    ? "bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6] border-b-2 translate-y-[2px]"
                    : "bg-white border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#4B4B4B]"
                }`}
              >
                <span className="font-mono text-xs text-[#AFAFAF] ml-2 font-black">
                  {idx + 1}
                </span>
                {option.option_text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-[#E5E5E5] mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className={`font-black text-sm uppercase px-8 py-3.5 rounded-2xl border-b-4 transition-all ${
            selectedId
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
