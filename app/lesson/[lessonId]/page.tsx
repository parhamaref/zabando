"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import Link from "next/link";

interface ExampleCardProps {
  english: string;
  ipa: string;
  persian: string;
  color: string;
  omNomState: string;
  omNomEmoji: string;
  onSelect: () => void;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  // Page States: "intro" | "exercise-1" | "exercise-2" | "exercise-3" | "celebration"
  const [stage, setStage] = useState<"intro" | "ex-mcq" | "ex-speaking" | "ex-dragdrop" | "celebration">("intro");
  
  // Game metrics
  const [xp, setXp] = useState(120);
  const [streak, setStreak] = useState(3);
  const [hearts, setHearts] = useState(5);
  
  // Example selection state
  const [activeExampleIdx, setActiveExampleIdx] = useState<number | null>(null);
  
  // MCQ state
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [mcqChecked, setMcqChecked] = useState(false);
  const [mcqIsCorrect, setMcqIsCorrect] = useState(false);

  // Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  // Drag & Drop / Reorder State
  const initialWordBank = ["is", "My", "Sara", "name"];
  const correctOrder = ["My", "name", "is", "Sara"];
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [dragChecked, setDragChecked] = useState(false);
  const [dragIsCorrect, setDragIsCorrect] = useState(false);

  // Om Nom's custom floating bubble dialog text
  const [omNomBubble, setOmNomBubble] = useState<string>("سلام دوست من! آماده‌ای امروز با هم انگلیسی یاد بگیریم؟ 🟢");

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  useEffect(() => {
    if (stage === "celebration") {
      // Big celebration confetti
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#58CC02", "#1CB0F6", "#FF9600", "#FF4B4B", "#FFD900"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#58CC02", "#1CB0F6", "#FF9600", "#FF4B4B", "#FFD900"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [stage]);

  const handleNextStage = () => {
    if (stage === "intro") {
      setStage("ex-mcq");
      setOmNomBubble("تمرین اول: به من بگو کدوم گزینه یعنی «سلام»؟ 🕵️‍♂️");
    } else if (stage === "ex-mcq") {
      setStage("ex-speaking");
      setOmNomBubble("حالا نوبت توئه! دکمه بلندگو رو بزن و کلمه 'Hello' رو بلند تکرار کن! 🎤");
    } else if (stage === "ex-speaking") {
      setStage("ex-dragdrop");
      setOmNomBubble("آفرین! حالا کلمات زیر رو مرتب کن تا جمله 'من سارا هستم' ساخته بشه! 🧩");
    } else if (stage === "ex-dragdrop") {
      setStage("celebration");
      setXp(prev => prev + 35);
      setStreak(prev => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (stage === "ex-mcq") {
      setStage("intro");
      setOmNomBubble("بیا دوباره درس رو مرور کنیم! رو کارت‌ها بزن تا تلفظشون رو بشنوی.");
    } else if (stage === "ex-speaking") {
      setStage("ex-mcq");
    } else if (stage === "ex-dragdrop") {
      setStage("ex-speaking");
    } else if (stage === "celebration") {
      setStage("ex-dragdrop");
    }
  };

  // Handle MCQ Submission
  const handleCheckMCQ = () => {
    if (!mcqSelected) return;
    setMcqChecked(true);
    if (mcqSelected === "Hello") {
      setMcqIsCorrect(true);
      triggerConfetti();
      setOmNomBubble("درسته! تو فوق‌العاده‌ای! بزن بریم چالش بعدی! 🎉");
    } else {
      setMcqIsCorrect(false);
      setHearts(prev => Math.max(prev - 1, 0));
      setOmNomBubble("اوه! نزدیک بود، ولی جواب درست Hello هست. دوباره تلاش کنیم؟ 💡");
    }
  };

  // Handle Simulated Voice Recording
  const handleStartRecording = () => {
    if (isRecording || recordingSuccess) return;
    setIsRecording(true);
    setOmNomBubble("دارم با گوش‌های بزرگم می‌شنوم... بگو Hello! 🟢👂");
    setTimeout(() => {
      setIsRecording(false);
      setRecordingSuccess(true);
      triggerConfetti();
      setXp(prev => prev + 10);
      setOmNomBubble("صدات عالی بود! لهجه بیست! بزن بریم بخش آخر! 🌟");
    }, 2500);
  };

  // Handle Reordering / Draggable click
  const handleToggleWord = (word: string) => {
    if (assembledWords.includes(word)) {
      setAssembledWords(assembledWords.filter(w => w !== word));
    } else {
      setAssembledWords([...assembledWords, word]);
    }
  };

  const handleCheckDrag = () => {
    setDragChecked(true);
    const isCorrect = JSON.stringify(assembledWords) === JSON.stringify(correctOrder);
    if (isCorrect) {
      setDragIsCorrect(true);
      triggerConfetti();
      setOmNomBubble("وای! کلمات رو کاملاً درست مرتب کردی! تو قهرمانی! 🏆");
    } else {
      setDragIsCorrect(false);
      setHearts(prev => Math.max(prev - 1, 0));
      setOmNomBubble("ترتیب کلمات اشتباه بود! اول فاعل، بعد فعل و مفعول. دوباره بچین! 🧩");
    }
  };

  // If the user runs out of hearts
  if (hearts <= 0) {
    return (
      <main className="min-h-screen bg-[#FFF0F0] flex flex-col items-center justify-center p-6 text-center select-none max-w-md mx-auto border-x-4 border-gray-900" dir="rtl">
        <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-900 flex items-center justify-center text-5xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 animate-bounce">
          💔
        </div>
        <h1 className="font-display font-black text-3xl text-rose-600 border-b-4 border-gray-900 pb-2">قلب‌هات تموم شد!</h1>
        <p className="text-sm font-bold text-gray-700 mt-4 leading-relaxed">
          اشکالی نداره دوست خوبم! اشتباه کردن بخشی از یادگیریه. بیا برگردیم به نقشه، کمی انرژی بگیریم و دوباره پرقدرت شروع کنیم!
        </p>
        
        {/* Om Nom comforting */}
        <div className="bg-white border-4 border-gray-900 rounded-3xl p-4 mt-6 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
          <span className="text-4xl">🟢⚆_⚆🟢</span>
          <p className="text-xs text-gray-800 font-bold text-right leading-relaxed">
            اوم نام میگه: «اشکال نداره قهرمان! من منتظرتم تا دوباره با هم آبنبات یادگیری بگیریم!»
          </p>
        </div>

        <Link
          href="/dashboard"
          className="mt-8 px-8 py-4 bg-sky-400 hover:bg-sky-500 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 text-white rounded-2xl font-display font-black text-sm uppercase tracking-wider cursor-pointer transition-all w-full text-center"
        >
          بازگشت به خانه 🏠
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F9FF] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-xl mx-auto select-none border-x-4 border-gray-900 relative overflow-hidden" dir="rtl">
      
      {/* 1. Custom Sky Blue Header */}
      <div className="bg-gradient-to-b from-sky-300 to-sky-400 border-4 border-gray-900 rounded-3xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white relative">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="w-10 h-10 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-800 text-lg font-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all">
            ✕
          </Link>
          <div>
            <h1 className="font-sans font-black text-sm tracking-wide text-gray-900 leading-tight">درس امروز: سلام کردن</h1>
            <p className="text-[9px] font-mono font-black tracking-wider text-sky-950/75" dir="ltr">TODAY&apos;S LESSON: GREETINGS</p>
          </div>
        </div>

        {/* Gamified Status Indicators */}
        <div className="flex items-center gap-2">
          {/* XP Orb */}
          <div className="flex items-center gap-1 bg-emerald-400 border-2 border-gray-900 px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-emerald-950 font-mono font-black text-xs">
            <span>🟢</span>
            <span>{xp} XP</span>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 bg-amber-400 border-2 border-gray-900 px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-amber-950 font-mono font-black text-xs">
            <span>🔥</span>
            <span>{streak}</span>
          </div>

          {/* Hearts Saved */}
          <div className="flex items-center gap-1 bg-rose-400 border-2 border-gray-900 px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-rose-950 font-mono font-black text-xs">
            <span>❤️</span>
            <span>{hearts}</span>
          </div>
        </div>

        {/* Small Om Nom mascot inside header waving */}
        <div className="absolute -bottom-2 right-4 w-10 h-10 bg-emerald-500 border-2 border-gray-900 rounded-full flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
          🟢
        </div>
      </div>

      {/* 2. Interactive Character Dialog (Om Nom Guide) */}
      <div className="my-5 flex items-center gap-4 bg-white border-4 border-gray-900 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="text-5xl animate-bounce shrink-0 select-none">
          {stage === "intro" ? "🟢‿🟢" : stage === "celebration" ? "🟢☉_☉🟢" : "🟢⚆_⚆🟢"}
        </div>
        <div className="flex-1 bg-emerald-50 border-2 border-gray-900 rounded-2xl p-3 relative text-right">
          <div className="absolute right-[-8px] top-4 w-3.5 h-3.5 bg-emerald-50 border-r-2 border-b-2 border-gray-900 rotate-135" />
          <span className="text-[9px] bg-emerald-400 border border-gray-900 px-1.5 py-0.5 rounded-full font-black text-emerald-950 block w-fit mb-1">راهنمای یادگیری دوست‌داشتنی شما</span>
          <p className="text-xs font-bold text-gray-800 leading-relaxed">
            {omNomBubble}
          </p>
        </div>
      </div>

      {/* 3. Main Stage Container with animations */}
      <div className="flex-1 flex flex-col justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          
          {/* INTRO STAGE */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="space-y-6"
            >
              {/* Mint Green Lesson Explanation Card */}
              <div className="bg-[#E3FCF2] border-4 border-gray-900 rounded-[28px] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🏁</span>
                  <div>
                    <h2 className="font-sans font-black text-base text-emerald-950">هدف درس امروز (Lesson Goal)</h2>
                    <p className="text-[10px] font-bold text-emerald-800" dir="ltr">Learn how to greet others and say your name!</p>
                  </div>
                </div>
                <div className="h-0.5 bg-emerald-900/10 w-full" />
                <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                  امروز یاد می‌گیریم چطوری خیلی باادبانه به دوست‌هامون سلام کنیم و خودمون رو معرفی کنیم. اوم نام هم کلی برات انیمیشن و آبنبات کنار گذاشته!
                </p>
              </div>

              {/* 3 Example Cards in different colors */}
              <div className="space-y-2.5">
                <h3 className="font-sans font-black text-xs text-gray-800 mr-1">مثال‌های صوتی و تلفظی (برای شنیدن ضربه بزن):</h3>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Hello Card (Lemon Yellow) */}
                  <button
                    onClick={() => {
                      setActiveExampleIdx(0);
                      setOmNomBubble("کلمه 'Hello' یعنی 'سلام'. خیلی راحت و شاد تلفظش کن! 🟢‿🟢");
                    }}
                    className={`border-4 border-gray-900 rounded-2xl p-4 flex items-center justify-between text-right transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      activeExampleIdx === 0 ? "bg-[#FFF999] ring-4 ring-emerald-400" : "bg-[#FFFCE0] hover:bg-[#FFF9CC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🟢 Smile</span>
                      <div>
                        <span className="font-sans font-black text-sm text-yellow-950 block">Hello!</span>
                        <span className="text-[10px] font-mono font-black text-yellow-800 block" dir="ltr">/həˈloʊ/</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-sans font-black text-sm text-gray-800">سلام</span>
                      <span className="text-[9px] text-gray-500 font-bold block">کلیک کنید 🔊</span>
                    </div>
                  </button>

                  {/* My Name is Sara Card (Soft Pink) */}
                  <button
                    onClick={() => {
                      setActiveExampleIdx(1);
                      setOmNomBubble("وقتی می‌خوای خودت رو معرفی کنی، می‌گی 'My name is ...' و بعد اسمت رو می‌گی! 🟢✨");
                    }}
                    className={`border-4 border-gray-900 rounded-2xl p-4 flex items-center justify-between text-right transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      activeExampleIdx === 1 ? "bg-[#FFAAD4] ring-4 ring-emerald-400" : "bg-[#FFEBF5] hover:bg-[#FFE0F0]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🟢 Wave</span>
                      <div>
                        <span className="font-sans font-black text-sm text-pink-950 block">My name is Sara.</span>
                        <span className="text-[10px] font-mono font-black text-pink-800 block" dir="ltr">/maɪ neɪm ɪz ˈsærə/</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-sans font-black text-sm text-gray-800">اسم من سارا است</span>
                      <span className="text-[9px] text-gray-500 font-bold block">کلیک کنید 🔊</span>
                    </div>
                  </button>

                  {/* Nice to Meet You Card (Sky Blue) */}
                  <button
                    onClick={() => {
                      setActiveExampleIdx(2);
                      setOmNomBubble("جمله 'Nice to meet you' یعنی 'از آشنایی با شما خوشحالم'. یک دوست جدید پیدا کردی! 🟢💖");
                    }}
                    className={`border-4 border-gray-900 rounded-2xl p-4 flex items-center justify-between text-right transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      activeExampleIdx === 2 ? "bg-[#A3D9FF] ring-4 ring-emerald-400" : "bg-[#E0F3FF] hover:bg-[#CCEAFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🟢 Love</span>
                      <div>
                        <span className="font-sans font-black text-sm text-sky-950 block">Nice to meet you!</span>
                        <span className="text-[10px] font-mono font-black text-sky-800 block" dir="ltr">/naɪs tə miːt juː/</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-sans font-black text-sm text-gray-800">از آشنایی با شما خوشحالم</span>
                      <span className="text-[9px] text-gray-500 font-bold block">کلیک کنید 🔊</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* EXERCISE 1: MCQ (Orange Card) */}
          {stage === "ex-mcq" && (
            <motion.div
              key="ex-mcq"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-[#FFEFE5] border-4 border-gray-900 rounded-[28px] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <span className="text-[10px] bg-amber-400 border-2 border-gray-900 px-2 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block text-amber-950">
                  تمرین اول: چند گزینه‌ای (Multiple Choice Challenge)
                </span>
                
                <h3 className="font-sans font-black text-base text-gray-800">کدام جمله انگلیسی معنی «سلام» می‌دهد؟</h3>

                <div className="space-y-2 text-left" dir="ltr">
                  {[
                    { val: "Hello", label: "Hello (سلام)" },
                    { val: "Goodbye", label: "Goodbye (خداحافظ)" },
                    { val: "Thanks", label: "Thanks (ممنون)" }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      disabled={mcqChecked}
                      onClick={() => setMcqSelected(opt.val)}
                      className={`w-full p-3.5 border-4 border-gray-900 rounded-2xl font-sans font-black text-sm transition-all text-left flex justify-between items-center ${
                        mcqSelected === opt.val
                          ? "bg-amber-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[2px]"
                          : "bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {mcqSelected === opt.val && <span className="text-lg">🍭</span>}
                    </button>
                  ))}
                </div>

                {mcqChecked && (
                  <div className={`p-4 rounded-xl border-2 font-bold text-xs ${
                    mcqIsCorrect ? "bg-green-100 border-green-400 text-green-700" : "bg-rose-100 border-rose-400 text-rose-700"
                  }`}>
                    {mcqIsCorrect ? "🎉 آفرین قهرمان! جواب شما کاملاً درست بود!" : "💡 اوه! جواب درست Hello بود. بیا بریم چالش بعدی!"}
                  </div>
                )}

                <div className="pt-2">
                  {!mcqChecked ? (
                    <button
                      disabled={!mcqSelected}
                      onClick={handleCheckMCQ}
                      className={`w-full py-3.5 rounded-2xl border-4 border-gray-900 font-sans font-black text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-white ${
                        !mcqSelected ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#FF9600] hover:bg-[#FF8500]"
                      }`}
                    >
                      بررسی پاسخ و ثبت 🚀
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStage}
                      className="w-full py-3.5 rounded-2xl border-4 border-gray-900 font-sans font-black text-sm bg-emerald-400 hover:bg-emerald-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      ادامه و چالش بعدی ➜
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* EXERCISE 2: SPEAKING (Blue Card) */}
          {stage === "ex-speaking" && (
            <motion.div
              key="ex-speaking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-[#EBF7FF] border-4 border-gray-900 rounded-[28px] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4 text-center">
                <span className="text-[10px] bg-sky-400 border-2 border-gray-900 px-2.5 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block text-sky-950">
                  تمرین دوم: چالش تلفظ و گفتار (Speaking Mastery)
                </span>

                <h3 className="font-sans font-black text-base text-gray-800">جمله زیر را با صدای بلند تکرار کنید:</h3>
                
                <div className="bg-white border-2 border-gray-900 rounded-2xl py-4 px-6 inline-block font-sans font-black text-xl text-sky-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  &ldquo;Hello!&rdquo;
                </div>

                {/* Simulated Audio Visualizer during recording */}
                {isRecording && (
                  <div className="flex justify-center items-center gap-1.5 py-3">
                    <span className="w-2 h-8 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-2 h-12 bg-emerald-500 rounded-full animate-pulse delay-75" />
                    <span className="w-2 h-16 bg-emerald-600 rounded-full animate-pulse delay-150" />
                    <span className="w-2 h-10 bg-emerald-500 rounded-full animate-pulse delay-75" />
                    <span className="w-2 h-6 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                )}

                {recordingSuccess && (
                  <div className="p-3.5 bg-emerald-100 border-2 border-emerald-400 rounded-xl text-emerald-700 font-bold text-xs">
                    🏆 آفرین! لهجه و تلفظ عالی بود! سیستم صدای شما را تایید کرد. (+10 امتیاز)
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleStartRecording}
                    disabled={isRecording || recordingSuccess}
                    className={`flex-1 py-4 rounded-2xl border-4 border-gray-900 font-sans font-black text-xs text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 ${
                      recordingSuccess
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border-gray-400"
                        : isRecording
                        ? "bg-rose-500 animate-pulse cursor-wait"
                        : "bg-sky-400 hover:bg-sky-500"
                    }`}
                  >
                    <span>🎤</span>
                    <span>{isRecording ? "در حال ضبط... بلند بگویید" : recordingSuccess ? "ضبط با موفقیت ثبت شد" : "شروع ضبط صدا و تلفظ"}</span>
                  </button>

                  {recordingSuccess && (
                    <button
                      onClick={handleNextStage}
                      className="py-4 px-6 bg-emerald-400 hover:bg-emerald-500 border-4 border-gray-900 rounded-2xl font-sans font-black text-xs text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                    >
                      بعدی ➜
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* EXERCISE 3: DRAG & DROP / REORDER (Green Card) */}
          {stage === "ex-dragdrop" && (
            <motion.div
              key="ex-dragdrop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-[#E8FCE8] border-4 border-gray-900 rounded-[28px] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <span className="text-[10px] bg-emerald-400 border-2 border-gray-900 px-2.5 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block text-emerald-950">
                  تمرین سوم: پازل جمله‌سازی (Drag & Drop Sentence Puzzle)
                </span>

                <h3 className="font-sans font-black text-base text-gray-800">کلمات زیر را مرتب کنید تا جمله «اسم من سارا است» ساخته شود:</h3>

                {/* Target assembled Area */}
                <div className="min-h-16 p-3 border-4 border-dashed border-emerald-300 bg-white rounded-2xl flex flex-wrap gap-2 items-center justify-center">
                  {assembledWords.length === 0 ? (
                    <span className="text-xs text-gray-400 font-bold">روی کلمه‌های پایین ضربه بزن تا اینجا چیده بشن! 👇</span>
                  ) : (
                    assembledWords.map((word) => (
                      <button
                        key={word}
                        disabled={dragChecked}
                        onClick={() => handleToggleWord(word)}
                        className="px-4 py-2 bg-emerald-100 border-2 border-gray-900 rounded-xl font-sans font-black text-xs text-emerald-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>

                {/* Scrambled source area */}
                <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                  {initialWordBank.map((word) => {
                    const isSelected = assembledWords.includes(word);
                    return (
                      <button
                        key={word}
                        disabled={isSelected || dragChecked}
                        onClick={() => handleToggleWord(word)}
                        className={`px-4 py-2.5 border-2 rounded-xl font-sans font-black text-xs transition-all ${
                          isSelected
                            ? "bg-gray-200 border-transparent text-gray-400 cursor-not-allowed scale-95"
                            : "bg-white border-gray-900 border-b-4 text-gray-800 hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {dragChecked && (
                  <div className={`p-4 rounded-xl border-2 font-bold text-xs ${
                    dragIsCorrect ? "bg-green-100 border-green-400 text-green-700" : "bg-rose-100 border-rose-400 text-rose-700"
                  }`}>
                    {dragIsCorrect ? "🎉 بی‌نظیره! پازل جمله رو به صورت کاملاً حرفه‌ای چیدی!" : "💡 اوه! ترتیب صحیح کلمات My name is Sara بود. بیا ادامه بدیم!"}
                  </div>
                )}

                <div className="pt-2">
                  {!dragChecked ? (
                    <button
                      disabled={assembledWords.length === 0}
                      onClick={handleCheckDrag}
                      className={`w-full py-3.5 rounded-2xl border-4 border-gray-900 font-sans font-black text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-white ${
                        assembledWords.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-emerald-400 hover:bg-emerald-500"
                      }`}
                    >
                      بررسی صحت جمله 🧩
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStage}
                      className="w-full py-3.5 rounded-2xl border-4 border-gray-900 font-sans font-black text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      تکمیل درس و دریافت مدال قهرمانی 🏆
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* CELEBRATION / COMPLETE STAGE */}
          {stage === "celebration" && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6 text-center py-6"
            >
              {/* Spinning Trophy */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-8xl mb-4 select-none"
              >
                🏆
              </motion.div>

              <div className="space-y-2">
                <h2 className="font-sans font-black text-3xl text-amber-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">درس با موفقیت تمام شد!</h2>
                <h3 className="font-sans font-black text-lg text-emerald-600">کارت عالی بود قهرمان آبنبات‌ها!</h3>
                <p className="text-xs font-bold text-gray-700 max-w-sm mx-auto leading-relaxed">
                  امروز یاد گرفتی چطور خودت رو معرفی کنی و به بقیه سلام کنی! مهارت‌های CEFR تو ارتقا پیدا کرد و قفل سطوح بعدی باز شد.
                </p>
              </div>

              {/* Reward stats cards */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-[#FFFCE0] border-4 border-gray-900 rounded-2xl p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-3xl block">⚡</span>
                  <span className="font-mono font-black text-lg text-amber-600 block mt-1">+35 XP</span>
                  <span className="text-[9px] font-black text-amber-800 uppercase block tracking-wider">امتیاز یادگیری</span>
                </div>

                <div className="bg-[#EAF9FF] border-4 border-gray-900 rounded-2xl p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-3xl block">🔥</span>
                  <span className="font-mono font-black text-lg text-sky-600 block mt-1">{streak} روزه</span>
                  <span className="text-[9px] font-black text-sky-800 uppercase block tracking-wider">زنجیره پشتکار</span>
                </div>
              </div>

              <div className="pt-4 max-w-sm mx-auto">
                <Link
                  href="/dashboard"
                  className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 border-4 border-gray-900 rounded-2xl font-sans font-black text-sm text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 block text-center"
                >
                  بازگشت به نقشه بازی 🗺️
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 4. Playful Bottom Navigation (Footer) */}
      <div className="mt-6 pt-4 border-t-4 border-gray-900 flex items-center justify-between">
        <div className="flex gap-2">
          {/* Back Button */}
          {stage !== "intro" && stage !== "celebration" && (
            <button
              onClick={handlePrevStage}
              className="px-4 py-2.5 bg-[#FFEFE5] hover:bg-[#FFE0CD] border-2 border-gray-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all text-orange-950"
            >
              ⬅️ قبلی
            </button>
          )}
          
          <Link
            href="/dashboard"
            className="w-10 h-10 bg-[#FFFCE0] hover:bg-[#FFF9CC] border-2 border-gray-900 rounded-xl flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all"
            title="خانه"
          >
            🏠
          </Link>
        </div>

        {/* Jelly Action Buttons */}
        {stage === "intro" && (
          <button
            onClick={handleNextStage}
            className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-500 border-2 border-gray-900 text-white rounded-xl font-sans font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>شروع چالش‌ها 🚀</span>
          </button>
        )}

        <div className="w-10 h-10 bg-[#E0F3FF] hover:bg-[#CCEAFF] border-2 border-gray-900 rounded-xl flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all" title="تنظیمات">
          ⚙️
        </div>
      </div>

    </main>
  );
}
