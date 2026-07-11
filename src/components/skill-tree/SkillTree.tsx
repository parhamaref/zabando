"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  Flame, 
  Shield, 
  Lock, 
  HelpCircle, 
  RefreshCw, 
  Sword, 
  CheckCircle,
  Play
} from "lucide-react";
import { GameIcon } from "../GameIcon";

interface SkillNode {
  id: string;
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  cefr: string;
  icon: string;
  completedQuizzes: number;
  totalQuizzes: number;
  status: "completed" | "active" | "locked" | "boss";
  row: number; // Row coordinate for visual map
  col: number; // Col coordinate for staggered zigzag curve layout
  pathType: string;
  rewardXp: number;
  rewardStreak: number;
}

const CARTOON_SKILLS: SkillNode[] = [
  {
    id: "vocab-basics",
    nameEn: "Vocabulary Path (Basics)",
    nameFa: "مسیر واژگان (احوالپرسی)",
    descriptionEn: "Learn standard greetings, polite words, and essential nouns in Persian script. Meet Om Nom's favorite candy names!",
    descriptionFa: "آموزش واژه‌های کاربردی، تعارف‌های روزمره، احوالپرسی اولیه و الفبای پایه‌ای فارسی به همراه خوراکی‌ها.",
    cefr: "A1",
    icon: "🌸",
    completedQuizzes: 5,
    totalQuizzes: 5,
    status: "completed",
    row: 1,
    col: 0,
    pathType: "Vocabulary Path",
    rewardXp: 120,
    rewardStreak: 1,
  },
  {
    id: "grammar-dining",
    nameEn: "Grammar Path (Hospitality)",
    nameFa: "مسیر گرامر (تعارف ایرانی)",
    descriptionEn: "Dive into dining habits, cafe conversation formulas, and the world-famous Persian art of Ta'arof (hospitality).",
    descriptionFa: "تسلط بر جملات کاربردی در رستوران، تعارف‌های ایرانی سر سفره و مهمانی، و ساختار جملات ساده.",
    cefr: "A2",
    icon: "🍕",
    completedQuizzes: 4,
    totalQuizzes: 4,
    status: "completed",
    row: 2,
    col: 1,
    pathType: "Grammar Path",
    rewardXp: 150,
    rewardStreak: 2,
  },
  {
    id: "listening-slang",
    nameEn: "Listening Path (Street Slang)",
    nameFa: "مسیر شنیداری (اصطلاحات عامیانه)",
    descriptionEn: "Train your ears with everyday colloquial simplifications, audio tasks, and direct Persian street idioms.",
    descriptionFa: "تقویت مهارت‌های شنیداری با گویش عامیانه و تند تهرانی، فایل‌های صوتی و ضرب‌المثل‌های صمیمی.",
    cefr: "B1",
    icon: "🤠",
    completedQuizzes: 2,
    totalQuizzes: 6,
    status: "active",
    row: 3,
    col: -1,
    pathType: "Listening Path",
    rewardXp: 200,
    rewardStreak: 3,
  },
  {
    id: "speaking-verbs",
    nameEn: "Speaking Path (Interactive)",
    nameFa: "مسیر گفتاری (مکالمه تعاملی)",
    descriptionEn: "Build high-frequency compound verbs. Express your desires, hopes, and opinions aloud.",
    descriptionFa: "آموزش و تکرار افعال ترکیبی پرکاربرد (مثل کردن و شدن) و تمرین‌های صوتی تعاملی برای صحبت روان.",
    cefr: "B2",
    icon: "🗣️",
    completedQuizzes: 0,
    totalQuizzes: 5,
    status: "locked",
    row: 4,
    col: 0,
    pathType: "Speaking Path",
    rewardXp: 250,
    rewardStreak: 4,
  },
  {
    id: "reading-poetry",
    nameEn: "Reading Path (Persian Lyrics)",
    nameFa: "مسیر خوانش (شعر و ادبیات)",
    descriptionEn: "Explore classical Persian literature, brief poetry metrics from Hafez, and simplified modern news headlines.",
    descriptionFa: "روخوانی متن‌های شیرین ادبی، تک بیت‌های برگزیده حافظ، و تیتر خبرهای کوتاه روزمره.",
    cefr: "C1",
    icon: "📜",
    completedQuizzes: 0,
    totalQuizzes: 8,
    status: "locked",
    row: 5,
    col: 1,
    pathType: "Reading Path",
    rewardXp: 300,
    rewardStreak: 5,
  },
  {
    id: "boss-fight",
    nameEn: "Boss Path (Ultimate Challenge)",
    nameFa: "مسیر غول آخر (مبارزه نهایی)",
    descriptionEn: "The ultimate final exam! Use all your accumulated skills to defeat the giant boss spider and protect the golden candy!",
    descriptionFa: "نبرد نهایی با عنکبوت غول‌آسا! تمام آموخته‌های خود را به چالش بکشید تا آب‌نبات طلایی را مال خود کنید!",
    cefr: "C2",
    icon: "🔥",
    completedQuizzes: 0,
    totalQuizzes: 1,
    status: "boss",
    row: 6,
    col: 0,
    pathType: "Boss Path",
    rewardXp: 500,
    rewardStreak: 10,
  }
];

const GENERAL_TIPS = [
  "اوم‌نام می‌گه: روی هر درس بزن تا جزئیات جذابش رو بهت بگم! 🍭",
  "هر نود کامل‌شده به رنگ زرد لیمویی می‌درخشه و نشانه افتخار ماست! 🌟",
  "درس‌های فعال به رنگ سبز نعناعی چشمک می‌زنند! کارهات عالیه! 💚",
  "مواظب غول آخر نارنجی باش! باید تمام درس‌ها رو بخونی تا باهاش بجنگی! 🦸‍♂️",
  "برای تکامل سریع‌تر، هر روز به شعله زنجیره رسیدگی کن! 🔥"
];

export function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(CARTOON_SKILLS[2]); // Default selection to the active node
  const [guideText, setGuideText] = useState("سلام! به نقشه راه کارتونی من خوش اومدی. این مسیرها تو رو به یک استاد واقعی تبدیل می‌کنه! 🍬");
  const [activeTab, setActiveTab] = useState<"map" | "ai">("map");

  // AI Generated Layout specification
  const [aiGeneratedUI, setAiGeneratedUI] = useState<any>(null);
  const [isGeneratingUI, setIsGeneratingUI] = useState(false);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
    
    // Change Om Nom dialogue advice based on node status
    if (node.status === "completed") {
      setGuideText(`آفرین! درس "${node.nameFa}" رو کاملاً درو کردی! به من بگو لباس جادوگری یا ابرقهرمانی چطوره؟ 👑🍬`);
    } else if (node.status === "active") {
      setGuideText(`بجنب دوست من! درس "${node.nameFa}" منتظرته. کلی امتیاز شیرین (XP) توی این راه برامون آماده شده! ⚡😋`);
    } else if (node.status === "locked") {
      setGuideText(`اووووه! درس "${node.nameFa}" هنوز قفله! اول باید درس‌های قبلی رو بگذرونی تا کلید طلایی بهت بدم! 🔒🍿`);
    } else if (node.status === "boss") {
      setGuideText(`وای! این غول آخره! عنکبوت بزرگ منتظر مبارزه‌ست. حواست رو خوب جمع کن تا سکه‌ها رو نبازی! ⚔️🔥`);
    }
  };

  const generateAiLayout = async () => {
    setIsGeneratingUI(true);
    try {
      const response = await fetch("/api/gemini/generate-skilltree-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenType: "Cartoon Skill Tree", mood: "Vibrant, Energetic & Child-Focused" })
      });
      const data = await response.json();
      if (data.success) {
        setAiGeneratedUI(data.parsed);
        setGuideText("هورااا! هوش مصنوعی جمینی ۳.۵ فلاش نقشه راه ما رو تحلیل کرد و زیباترین استایل کارتونی رو کشید! 🎨🤖");
      }
    } catch (e) {
      console.error("AI Skilltree UI generation failed:", e);
    } finally {
      setIsGeneratingUI(false);
    }
  };

  // Periodic fun guide lines from Om Nom
  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedNode) {
        setGuideText(GENERAL_TIPS[Math.floor(Math.random() * GENERAL_TIPS.length)]);
      }
    }, 18000);
    return () => clearInterval(interval);
  }, [selectedNode]);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto select-none">
      
      {/* 1. TITLE HEADER WIDGET (PLAYFUL GLOSSY GRADIENT) */}
      <div 
        className="relative bg-gradient-to-r from-[#5BC0BE] via-[#48CAE4] to-[#0096C7] border-4 border-gray-950 border-b-8 p-6 rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white"
      >
        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-white/10 skew-y-2 pointer-events-none" />

        <div className="flex items-center gap-4 text-center md:text-left z-10">
          {/* Animated Om Nom avatar in Header */}
          <motion.div 
            animate={{ rotate: [0, 8, -8, 0], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-18 h-18 bg-white/10 rounded-2xl p-1 border-2 border-white/30 flex items-center justify-center relative cursor-pointer"
            onClick={() => setGuideText("سلام دنیا! بزن بریم درس بعدی! من خیلی گرسنه‌ام، درس بخونیم تا آب‌نبات بگیریم! 🍬💚")}
          >
            <GameIcon name="profile_avatar" size={64} />
          </motion.div>
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="font-display font-black text-3xl uppercase tracking-wider text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                Learning Road Map
              </h1>
              <span className="text-[10px] bg-yellow-400 border border-gray-950 text-gray-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                CEFR A1 - C2
              </span>
            </div>
            <p className="font-display text-sm font-semibold text-sky-50 mt-1 max-w-md">
              نقشه راه یادگیری کارتونی با راهنمایی Om Nom! نودها را تکمیل کنید تا مراحل جدید باز شوند.
            </p>
          </div>
        </div>

        {/* Quick Info Badges */}
        <div className="flex flex-wrap gap-3 items-center justify-center z-10">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border-2 border-white/40 px-3.5 py-1.5 rounded-2xl shadow-md">
            <GameIcon name="xp_orb" size={24} />
            <span className="font-mono font-black text-xs text-white">450 XP</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border-2 border-white/40 px-3.5 py-1.5 rounded-2xl shadow-md">
            <GameIcon name="streak_flame" size={24} />
            <span className="font-mono font-black text-xs text-white">5 Days</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border-2 border-white/40 px-3.5 py-1.5 rounded-2xl shadow-md">
            <GameIcon name="badge_medal" size={24} />
            <span className="font-mono font-black text-xs text-white">2 Badges</span>
          </div>
        </div>
      </div>

      {/* CORE NAVIGATION TAB */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("map")}
          className={`flex items-center gap-2 font-display font-black text-xs uppercase px-5 py-3 rounded-2xl border-2 border-b-6 border-gray-950 transition-all ${
            activeTab === "map"
              ? "bg-[#58CC02] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[2px] border-b-2"
              : "bg-white text-gray-800 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]"
          }`}
        >
          🗺️ Map Road
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 font-display font-black text-xs uppercase px-5 py-3 rounded-2xl border-2 border-b-6 border-gray-950 transition-all ${
            activeTab === "ai"
              ? "bg-[#FFC542] text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[2px] border-b-2"
              : "bg-white text-gray-800 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]"
          }`}
        >
          <Sparkles className="w-4 h-4 fill-amber-500 text-amber-600" /> AI Style Advice
        </button>
      </div>

      {/* 2. MAIN MAP TAB CONTENT */}
      {activeTab === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* THE TREE COLUMN (Winding Curves) */}
          <div className="lg:col-span-7 bg-white border-4 border-gray-950 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[640px]">
            
            {/* Background Sky & Cartoon Atmosphere Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            
            {/* Dynamic curve background representation (Cartoon curves) */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
              <svg className="w-full h-full max-w-lg stroke-sky-300" viewBox="0 0 400 800" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="16 12">
                {/* Winding path curve connecting rows */}
                <path d="M 200 60 C 350 160, 350 220, 200 300 C 50 380, 50 440, 200 520 C 350 600, 350 660, 200 740" />
              </svg>
            </div>

            {/* Winding Flow animation for Active Node connections */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
              <svg className="w-full h-full max-w-lg stroke-[#58CC02]" viewBox="0 0 400 800" fill="none" strokeWidth="8" strokeLinecap="round">
                {/* Highlight curve path for completed/active connections */}
                <path 
                  d="M 200 60 C 350 160, 350 220, 200 300" 
                  className="animate-[dash_4s_linear_infinite]" 
                  style={{ strokeDasharray: "20, 15" }}
                />
              </svg>
            </div>

            {/* THE NODES MAP */}
            <div className="relative space-y-14 z-10 py-6">
              {[1, 2, 3, 4, 5, 6].map((rowNum) => {
                const node = CARTOON_SKILLS.find(s => s.row === rowNum);
                if (!node) return null;

                const isCompleted = node.status === "completed";
                const isActive = node.status === "active";
                const isLocked = node.status === "locked";
                const isBoss = node.status === "boss";

                // Map offsets for child-friendly staggered layout
                const alignmentClass = 
                  node.col === -1 ? "justify-start pl-8 md:pl-16" : 
                  node.col === 1 ? "justify-end pr-8 md:pr-16" : 
                  "justify-center";

                return (
                  <div key={node.id} className={`flex ${alignmentClass} items-center relative`}>
                    
                    {/* Node Visual Group */}
                    <div className="flex flex-col items-center group relative">
                      
                      {/* Interactive Ripple rings for active nodes */}
                      {isActive && (
                        <div className="absolute -inset-2 rounded-full bg-emerald-400/20 border-2 border-emerald-400 animate-ping pointer-events-none" style={{ animationDuration: "2.5s" }} />
                      )}

                      {/* Sparkles overlay on completed nodes */}
                      {isCompleted && (
                        <div className="absolute -top-3 -right-3 text-lg animate-bounce select-none pointer-events-none">✨</div>
                      )}

                      {/* Main Jelly Bubble Button */}
                      <motion.button
                        onClick={() => handleNodeClick(node)}
                        whileHover={{ scale: isLocked ? 1 : 1.15, rotate: isBoss ? [-2, 2, -2] : 0 }}
                        whileTap={{ scale: isLocked ? 1 : 0.95 }}
                        className={`w-20 h-20 rounded-full border-b-6 flex items-center justify-center p-1 shadow-md cursor-pointer relative z-10 transition-all ${
                          isLocked 
                            ? "bg-[#E5E5E5] border-[#CCCCCC] cursor-not-allowed"
                            : isCompleted
                            ? "bg-[#FFD900] border-[#E6B800] hover:bg-yellow-400 hover:border-yellow-500 shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
                            : isBoss
                            ? "bg-[#FF7A00] border-[#D65900] hover:bg-orange-500 shadow-[4px_4px_0_rgba(0,0,0,0.2)] animate-pulse"
                            : "bg-[#58CC02] border-[#388002] hover:bg-[#46A302] hover:border-[#388002] shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
                        }`}
                      >
                        {/* Custom visual icons for each state */}
                        {isLocked ? (
                          <div className="relative">
                            <span className="text-2xl filter grayscale opacity-50">{node.icon}</span>
                            <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full p-0.5 border border-white">
                              <Lock className="w-3 h-3" />
                            </div>
                          </div>
                        ) : isCompleted ? (
                          <div className="text-3xl filter drop-shadow-[1px_2px_0_rgba(0,0,0,0.2)]">⭐</div>
                        ) : isBoss ? (
                          <div className="text-3xl filter drop-shadow-[1px_2px_0_rgba(0,0,0,0.2)] flex items-center justify-center animate-bounce" style={{ animationDuration: "1.2s" }}>
                            👹
                          </div>
                        ) : (
                          <span className="text-3xl filter drop-shadow-[1px_2px_0_rgba(0,0,0,0.2)] animate-pulse">{node.icon}</span>
                        )}

                        {/* Done ribbon or level badge */}
                        {isCompleted && (
                          <span className="absolute -bottom-1.5 bg-yellow-400 text-yellow-950 font-black text-[8px] uppercase px-1.5 py-0.5 rounded-full border border-yellow-600 shadow-sm flex items-center gap-0.5">
                            Done ✓
                          </span>
                        )}
                        {isActive && (
                          <span className="absolute -bottom-1.5 bg-[#58CC02] text-white font-black text-[8px] uppercase px-2 py-0.5 rounded-full border border-green-700 shadow-sm animate-bounce">
                            Active
                          </span>
                        )}
                      </motion.button>

                      {/* Character Avatar reactions overlay matching the state */}
                      <div className="absolute top-2 -left-14 select-none pointer-events-none z-20">
                        {isCompleted && (
                          <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-10 h-10 bg-yellow-50 border border-yellow-300 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-lg" title="Om Nom proud!">🎖️</span>
                          </motion.div>
                        )}
                        {isActive && (
                          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-10 h-10 bg-emerald-50 border border-emerald-300 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-lg" title="Om Nom cheering!">🥳</span>
                          </motion.div>
                        )}
                        {isLocked && (
                          <div className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center shadow-sm opacity-50">
                            <span className="text-lg" title="Om Nom curious!">🤔</span>
                          </div>
                        )}
                        {isBoss && (
                          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 bg-orange-50 border border-orange-300 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-lg" title="Om Nom excited!">⚔️</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Node Label Card */}
                      <div className="text-center mt-3 bg-slate-50 border-2 border-gray-950/10 px-3 py-1 rounded-2xl max-w-[150px] shadow-sm">
                        <p className="font-display font-black text-xs text-gray-900 leading-tight">
                          {node.nameEn.split(" ")[0]} Path
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold leading-none mt-0.5 truncate">
                          {node.nameFa.split(" ")[1]}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* DETAIL DESCRIPTION CARD PANEL (SOFT PINK / JELLY BUTTONS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* CHARACTER LIVE DIALOGUE BAR */}
            <div className="bg-emerald-50 border-4 border-emerald-800 rounded-[28px] p-4.5 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right">
              <div className="w-12 h-12 bg-white border-2 border-emerald-800 rounded-2xl flex items-center justify-center p-1">
                <GameIcon name="profile_avatar" size={40} />
              </div>
              <div className="flex-1">
                <span className="text-[9px] bg-emerald-200 text-emerald-800 font-black px-2 py-0.5 rounded-full uppercase">Om Nom's Advice</span>
                <p className="text-xs font-bold text-emerald-950 leading-relaxed mt-1">
                  {guideText}
                </p>
              </div>
            </div>

            {/* SELECTION DETAIL BOX */}
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FFF0F5] border-4 border-[#FF8FA3] border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-right relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-full h-10 bg-white/20 skew-y-3 pointer-events-none" />

                  {/* Header visual icon */}
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#FFCCD5] pb-3.5 mb-4">
                    <span className="text-xs bg-white text-pink-600 border border-pink-200 px-3 py-1 rounded-full font-black font-mono">
                      {selectedNode.cefr} CEFR LEVEL
                    </span>
                    <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                      {selectedNode.pathType} 🗺️
                    </h3>
                  </div>

                  <div className="flex items-start gap-3.5 justify-end">
                    <div className="text-right flex-1">
                      <h4 className="font-display font-black text-lg text-gray-900 leading-tight">
                        {selectedNode.nameEn}
                      </h4>
                      <p className="text-sm font-bold text-pink-900 mt-1" dir="rtl">
                        {selectedNode.nameFa}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-white border-2 border-[#FF8FA3] rounded-2xl flex items-center justify-center text-3xl filter drop-shadow-sm shadow-inner">
                      {selectedNode.icon}
                    </div>
                  </div>

                  {/* Objective Description */}
                  <div className="mt-4 p-4 bg-white/60 border border-pink-200 rounded-2xl">
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed text-left">
                      {selectedNode.descriptionEn}
                    </p>
                    <p className="text-xs font-bold text-gray-800 leading-relaxed mt-2" dir="rtl">
                      {selectedNode.descriptionFa}
                    </p>
                  </div>

                  {/* Rewards Row */}
                  <div className="mt-4 p-3 bg-white/40 rounded-2xl border border-pink-100/50 flex items-center justify-between text-xs font-black uppercase">
                    <span className="text-[10px] text-pink-800">MILestone Rewards</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#E8F8FF] border border-sky-200 px-2.5 py-1 rounded-full">
                        <span className="w-4 h-4 flex items-center justify-center"><GameIcon name="xp_orb" size={14} /></span>
                        <span className="font-mono text-sky-800 font-bold">{selectedNode.rewardXp} XP</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#FFF0F5] border border-pink-200 px-2.5 py-1 rounded-full">
                        <span className="w-4 h-4 flex items-center justify-center"><GameIcon name="streak_flame" size={14} /></span>
                        <span className="font-mono text-pink-800 font-bold">+{selectedNode.rewardStreak}d</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Launch Buttons */}
                  <div className="mt-6">
                    {selectedNode.status === "locked" ? (
                      <div className="w-full text-center py-4.5 bg-gray-200 text-gray-500 border-2 border-dashed border-gray-300 rounded-2xl text-xs font-black uppercase select-none flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>این مرحله قفل است (مسیر را ادامه دهید)</span>
                      </div>
                    ) : selectedNode.status === "boss" ? (
                      <Link
                        href="/lesson/boss-fight"
                        className="w-full text-center py-4 bg-[#FF7A00] hover:bg-orange-500 border-b-6 border-orange-800 rounded-2xl font-display font-black text-white uppercase tracking-wider text-xs transition-all active:translate-y-1 active:border-b-0 cursor-pointer flex items-center justify-center gap-2 shadow-md"
                      >
                        <Sword className="w-4 h-4 animate-bounce" />
                        <span>نبرد با غول آخر نهایی! START BOSS FIGHT</span>
                      </Link>
                    ) : (
                      <Link
                        href={`/lesson/${selectedNode.id}`}
                        className="w-full text-center py-4 bg-[#58CC02] hover:bg-[#46A302] border-b-6 border-green-800 rounded-2xl font-display font-black text-white uppercase tracking-wider text-xs transition-all active:translate-y-1 active:border-b-0 cursor-pointer flex items-center justify-center gap-2 shadow-md"
                      >
                        <Play className="w-4.5 h-4.5 fill-white text-white" />
                        <span>شروع درس و تمرین! START PATH LESSON</span>
                      </Link>
                    )}
                  </div>

                </motion.div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-8 text-center text-gray-400 font-black text-xs uppercase select-none">
                  🔍 نودی را از نقشه سمت چپ انتخاب کنید
                </div>
              )}
            </AnimatePresence>

            {/* QUICK LEGEND PANEL */}
            <div className="bg-white border-4 border-gray-950 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-right">
              <h4 className="font-display font-black text-xs text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 mb-3">
                راهنمای رنگ‌ها و وضعیت نودها
              </h4>
              <div className="grid grid-cols-2 gap-3.5 text-xs font-black">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-gray-500 font-bold">تکمیل شده</span>
                  <span className="w-5 h-5 bg-[#FFD900] border-2 border-[#E6B800] rounded-full inline-block" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-gray-500 font-bold">درس فعال</span>
                  <span className="w-5 h-5 bg-[#58CC02] border-2 border-[#388002] rounded-full inline-block animate-pulse" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-gray-500 font-bold">قفل شده</span>
                  <span className="w-5 h-5 bg-[#E5E5E5] border-2 border-[#CCCCCC] rounded-full inline-block" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-gray-500 font-bold">مبارزه غول</span>
                  <span className="w-5 h-5 bg-[#FF7A00] border-2 border-[#D65900] rounded-full inline-block" />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 3. AI DYNAMIC STYLING ADVICE PLAYGROUND */}
      {activeTab === "ai" && (
        <div className="bg-[#FFFDF9] border-4 border-[#FFC542] border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#FFE3B3] pb-3 mb-4">
            <h3 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF8A00]" /> دستیار طراحی جمینی ۳.۵ فلش
            </h3>
            <span className="text-[9px] bg-[#FFF5E0] text-[#FF8A00] border border-[#FFE3B3] px-2 py-0.5 rounded-full font-bold">AI_SKILL_TREE_GENERATOR</span>
          </div>

          <p className="text-xs text-gray-600 font-bold leading-relaxed mb-4 text-right" dir="rtl">
            با کلیک بر روی دکمه زیر، دستیار طراحی جمینی ۳.۵ فلاش، ساختار و چیدمان بصری نقشه راه را تحلیل کرده و پیشنهادها و کدهای استایل جدید به شکل کارتونی ارائه می‌دهد:
          </p>

          <button
            onClick={generateAiLayout}
            disabled={isGeneratingUI}
            className="w-full flex items-center justify-center gap-2 bg-[#FFC542] hover:bg-[#F0B429] disabled:bg-gray-200 border-2 border-b-6 border-gray-950 text-gray-900 font-display font-black text-xs uppercase px-4 py-3.5 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer"
          >
            {isGeneratingUI ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>در حال طراحی مجدد نقشه راه...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-gray-950" />
                <span>طراحی مجدد فانتزی نقشه راه توسط جمینی</span>
              </>
            )}
          </button>

          <AnimatePresence>
            {aiGeneratedUI && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-6 bg-amber-50/80 border-2 border-dashed border-[#FFC542] rounded-2xl p-4.5 space-y-4"
              >
                <div className="text-right space-y-3">
                  <div>
                    <span className="text-[9px] bg-amber-200 border border-amber-300 text-amber-800 px-2 py-0.5 rounded-full font-black uppercase">Header Layout Specs</span>
                    <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Header}</p>
                  </div>
                  <hr className="border-amber-200" />
                  <div>
                    <span className="text-[9px] bg-emerald-200 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-full font-black uppercase">Nodes Config</span>
                    <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Nodes}</p>
                  </div>
                  <hr className="border-amber-200" />
                  <div>
                    <span className="text-[9px] bg-blue-200 border border-blue-300 text-blue-800 px-2 py-0.5 rounded-full font-black uppercase">Curved Paths</span>
                    <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Paths}</p>
                  </div>
                  <hr className="border-amber-200" />
                  <div>
                    <span className="text-[9px] bg-pink-200 border border-pink-300 text-pink-800 px-2 py-0.5 rounded-full font-black uppercase">Skill Info Card</span>
                    <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.SkillInfoPanel}</p>
                  </div>
                  <hr className="border-amber-200" />
                  <div>
                    <span className="text-[9px] bg-purple-200 border border-purple-300 text-purple-800 px-2 py-0.5 rounded-full font-black uppercase">Om Nom Guide Roles</span>
                    <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.OmNomIntegration}</p>
                  </div>
                  <hr className="border-amber-200" />
                  <div className="text-[10px] text-gray-500 font-bold flex items-center justify-end gap-1">
                    <span>قوانین استایل بصری: {aiGeneratedUI.VisualStyle}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-[#FF8A00]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 4. LESSON SCREEN FOOTER NAVIGATION BAR */}
      <div className="bg-white border-4 border-gray-950 border-b-8 rounded-[24px] p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-cover">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-[#F1F1F1] hover:bg-slate-200 border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black text-gray-900 active:translate-y-[1px] active:border-b-2 transition-all uppercase"
        >
          <span>🏠</span> Home
        </Link>

        <span className="text-[10px] font-mono text-gray-400 font-bold hidden sm:inline">
          Zabando Skill Tree Map • UI Version 3.5-flash
        </span>

        <Link
          href="/profile"
          className="flex items-center gap-2 bg-[#1CB0F6] hover:bg-[#1899D6] border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black text-white active:translate-y-[1px] active:border-b-2 transition-all uppercase shadow-sm"
        >
          <span>👤</span> Profile ➔
        </Link>
      </div>

    </div>
  );
}
