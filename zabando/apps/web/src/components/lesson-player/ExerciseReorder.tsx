"use client";

import { useState } from "react";

interface ExerciseReorderProps {
  exercise: {
    question_text: string;
    answer_text: string;
  };
  onAnswer: (result: { correct: boolean; tip: string }) => void;
}

export function ExerciseReorder({ exercise, onAnswer }: ExerciseReorderProps) {
  // Extract words from answer key and shuffle purely within a state initializer
  const [pool, setPool] = useState<string[]>(() => {
    return exercise.answer_text.split(" ").sort(() => Math.random() - 0.5);
  });
  const [selected, setSelected] = useState<string[]>([]);

  function handleTileClick(word: string, isFromPool: boolean) {
    if (isFromPool) {
      setPool(prev => prev.filter(w => w !== word));
      setSelected(prev => [...prev, word]);
    } else {
      setSelected(prev => prev.filter(w => w !== word));
      setPool(prev => [...prev, word]);
    }
  }

  function handleSubmit() {
    const combinedSentence = selected.join(" ");
    const correct = combinedSentence === exercise.answer_text;
    const tip = correct
      ? "ترتیب کلمات کاملاً دقیق و گرامر رعایت شد!"
      : `پاسخ درست: "${exercise.answer_text}"`;
    onAnswer({ correct, tip });
  }

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div>
        <span className="font-black text-[10px] uppercase tracking-wider text-[#784BA0] bg-[#F3E8FF] px-2.5 py-1 rounded-full">
          مرتب‌سازی | Reorder
        </span>
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#4B4B4B] mt-4 leading-snug">
          {exercise.question_text}
        </h2>

        {/* Selected Tiles Slot (The workspace) */}
        <div className="mt-8 min-h-[60px] p-3 rounded-2xl border-2 border-dashed border-[#E5E5E5] flex flex-wrap gap-2 items-center justify-start bg-[#F7F7F7]/30">
          {selected.map((word, i) => (
            <button
              key={`sel-${i}`}
              onClick={() => handleTileClick(word, false)}
              className="bg-white hover:bg-[#F7F7F7] text-[#4B4B4B] border-2 border-b-4 border-[#E5E5E5] px-3.5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all active:translate-y-[2px]"
            >
              {word}
            </button>
          ))}
          {selected.length === 0 && (
            <span className="text-xs font-bold text-[#AFAFAF] mx-auto select-none">
              کلمات را از لیست پایین انتخاب کنید
            </span>
          )}
        </div>

        {/* Word Pool (Available tiles) */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {pool.map((word, i) => (
            <button
              key={`pool-${i}`}
              onClick={() => handleTileClick(word, true)}
              className="bg-white hover:bg-[#F7F7F7] text-[#4B4B4B] border-2 border-b-4 border-[#E5E5E5] px-3.5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all active:translate-y-[2px]"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#E5E5E5] mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className={`font-black text-sm uppercase px-8 py-3.5 rounded-2xl border-b-4 transition-all ${
            selected.length > 0
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
