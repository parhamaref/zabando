"use client";

interface FeedbackBubbleProps {
  correct: boolean;
  tip: string;
}

export function FeedbackBubble({ correct, tip }: FeedbackBubbleProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-300 transform translate-y-0 flex flex-col sm:flex-row items-center justify-between gap-4 z-50 ${
        correct
          ? "bg-[#D7FFB8] border-t-4 border-[#58CC02] text-[#46A302]"
          : "bg-[#FFDFDF] border-t-4 border-[#FF4B4B] text-[#EA2B2B]"
      }`}
    >
      <div className="max-w-xl mx-auto w-full flex items-center gap-4">
        <span className="text-3xl sm:text-4xl shrink-0">
          {correct ? "🦉" : "💡"}
        </span>
        <div className="text-right sm:text-left flex-1">
          <h4 className="font-display font-black text-lg sm:text-xl">
            {correct ? "عالی بود! درست گفتی" : "اشتباه کوچک!"}
          </h4>
          <p className="text-xs sm:text-sm font-bold text-[#4B4B4B] mt-1">
            {tip}
          </p>
        </div>
      </div>
    </div>
  );
}
