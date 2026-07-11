"use client";

import { useState } from "react";
import { ExerciseRenderer } from "./ExerciseRenderer";
import { ProgressBar } from "./ProgressBar";
import { FeedbackBubble } from "./FeedbackBubble";
import Link from "next/link";

interface LessonPlayerProps {
  lessonTitle: string;
  exercises: any[];
}

export function LessonPlayer({ lessonTitle, exercises }: LessonPlayerProps) {
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [feedback, setFeedback] = useState<null | { correct: boolean; tip: string }>(null);
  const [completed, setCompleted] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const currentExercise = exercises[index];
  const isLast = index === exercises.length - 1;

  function handleAnswer(result: { correct: boolean; tip: string }) {
    setFeedback(result);

    if (result.correct) {
      setXpGained(prev => prev + 10);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }

    // Auto dismiss feedback and progress after a brief satisfied moment
    setTimeout(() => {
      setFeedback(null);
      if (hearts <= 1 && !result.correct) {
        // Run out of hearts
        setCompleted(true);
      } else if (!isLast) {
        setIndex(prev => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 2800);
  }

  if (completed) {
    const passed = hearts > 0;
    return (
      <div className="max-w-xl mx-auto w-full bg-white border-2 border-[#E5E5E5] rounded-3xl p-8 sm:p-12 text-center my-12 shadow-sm">
        <span className="text-6xl">{passed ? "👑" : "💔"}</span>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-[#4B4B4B] mt-6">
          {passed ? "درس کامل شد!" : "فرصت‌ها تمام شد!"}
        </h2>
        <p className="text-sm font-bold text-[#777777] mt-2">
          {passed
            ? "شما با موفقیت مهارت این بخش را کسب کردید و به سطح بالاتری رفتید!"
            : "نگران نباشید، با تمرین بیشتر می‌توانید مجدد شروع کنید."}
        </p>

        {passed && (
          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-[#FFF8E7] border-2 border-[#FFC800] rounded-2xl p-4">
              <span className="block font-black text-2xl text-[#FF9600]">+{xpGained}</span>
              <span className="text-[10px] font-black text-[#FF9600] uppercase tracking-wide">کل XP</span>
            </div>
            <div className="bg-[#DDF4FF] border-2 border-[#84D8FF] rounded-2xl p-4">
              <span className="block font-black text-2xl text-[#1CB0F6]">
                {Math.round((xpGained / (exercises.length * 10)) * 100)}%
              </span>
              <span className="text-[10px] font-black text-[#1CB0F6] uppercase tracking-wide">دقت پاسخ</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/skill-tree"
            className="w-full bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-sm uppercase py-4 rounded-2xl border-b-4 border-[#46A302] hover:border-b-2 active:translate-y-[2px] active:border-b-0 cursor-pointer text-center block transition-all"
          >
            {passed ? "ادامه مسیر یادگیری" : "بازگشت به درخت مهارت"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#4B4B4B] py-8 px-4 flex flex-col justify-between relative overflow-hidden">
      {/* Top Header Row with dynamic progress and stats */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between gap-6">
        <Link href="/skill-tree" className="text-2xl font-black text-[#AFAFAF] hover:text-[#4B4B4B] transition-colors">
          ✕
        </Link>

        <ProgressBar current={index + 1} total={exercises.length} />

        <div className="flex items-center gap-1.5 shrink-0 select-none">
          <span className="text-lg">❤️</span>
          <span className="font-mono font-black text-sm text-[#FF4B4B]">
            {hearts}
          </span>
        </div>
      </div>

      {/* Main active exercise card wrapper */}
      <div className="max-w-xl mx-auto w-full bg-white border-2 border-[#E5E5E5] rounded-3xl p-6 sm:p-10 shadow-sm my-8 flex-1 flex flex-col justify-between">
        <ExerciseRenderer exercise={currentExercise} onAnswer={handleAnswer} />
      </div>

      {/* Bottom helper tip footer */}
      <div className="max-w-xl mx-auto w-full text-center">
        <p className="text-[11px] text-[#AFAFAF] font-bold">
          نکته: با تمرین روزانه زنجیره خود را حفظ کرده و در جدول لیگ‌ها صعود کنید!
        </p>
      </div>

      {/* Slide-up active feedback drawer overlay */}
      {feedback && (
        <FeedbackBubble correct={feedback.correct} tip={feedback.tip} />
      )}
    </div>
  );
}
