"use client";

import { useState } from "react";

interface ExerciseListeningProps {
  exercise: {
    question_text: string;
    answer_text: string;
    question_audio_url?: string;
  };
  onAnswer: (result: { correct: boolean; tip: string }) => void;
}

export function ExerciseListening({ exercise, onAnswer }: ExerciseListeningProps) {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayAudio() {
    setIsPlaying(true);
    // Simulate vocal narration
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(exercise.question_text);
      speech.lang = "en-US";
      speech.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(speech);
    } else {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  }

  function handleSubmit() {
    if (!text.trim()) return;
    const correct = text.trim().toLowerCase() === exercise.answer_text.trim().toLowerCase();
    const tip = correct
      ? "شنیداری عالی! املای کلمات کاملاً دقیق نوشته شد."
      : `پاسخ درست: "${exercise.answer_text}"`;
    onAnswer({ correct, tip });
  }

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div>
        <span className="font-black text-[10px] uppercase tracking-wider text-[#2B6CB0] bg-[#EBF8FF] px-2.5 py-1 rounded-full">
          تمرین شنیداری | Listening
        </span>
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#4B4B4B] mt-4 leading-snug">
          گوش بدهید و همان کلمات را بنویسید:
        </h2>

        {/* Tactile Audio speaker button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePlayAudio}
            className={`w-28 h-28 rounded-full flex items-center justify-center border-b-8 transition-all ${
              isPlaying
                ? "bg-[#DDF4FF] border-[#84D8FF] text-[#1CB0F6] border-b-2 translate-y-1 animate-pulse"
                : "bg-[#1CB0F6] border-[#1899D6] text-white hover:translate-y-[2px] active:translate-y-[6px]"
            } cursor-pointer`}
          >
            <span className="text-4xl">
              {isPlaying ? "🔊" : "📣"}
            </span>
          </button>
        </div>

        <div className="mt-8">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="کلمات شنیده‌شده را تایپ کنید..."
            className="w-full text-center p-4 rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] focus:bg-white focus:border-[#1CB0F6] font-bold text-sm sm:text-base outline-none transition-all placeholder-[#AFAFAF]"
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
