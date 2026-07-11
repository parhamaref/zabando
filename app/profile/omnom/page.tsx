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
  Heart, 
  Smile, 
  Gift, 
  Lock, 
  RefreshCw, 
  HelpCircle 
} from "lucide-react";
import { GameIcon } from "../../../src/components/GameIcon";

// Static data representation matching the gamification ecosystem
const STAGES_OF_EVOLUTION = [
  { level: 1, name: "Baby Om Nom", nameFa: "بچه اوم‌نام", minXp: 0, maxXp: 100, color: "bg-blue-100 border-blue-400 text-blue-700" },
  { level: 2, name: "Learner Om Nom", nameFa: "اوم‌نام نوآموز", minXp: 101, maxXp: 300, color: "bg-teal-100 border-teal-400 text-teal-700" },
  { level: 3, name: "Skilled Om Nom", nameFa: "اوم‌نام ماهر", minXp: 301, maxXp: 600, color: "bg-emerald-100 border-emerald-400 text-emerald-700" },
  { level: 4, name: "Advanced Om Nom", nameFa: "اوم‌نام پیشرفته", minXp: 601, maxXp: 1000, color: "bg-orange-100 border-orange-400 text-orange-700" },
  { level: 5, name: "Hero Om Nom", nameFa: "اوم‌نام قهرمان", minXp: 1001, maxXp: 9999, color: "bg-purple-100 border-purple-400 text-purple-700" },
];

const OUTFITS = [
  { id: "classic", name: "Classic Green", nameFa: "سبز کلاسیک", color: "#58CC02", icon: "🟢", description: "The original cute candy lover.", cost: 0, unlocked: true },
  { id: "superhero", name: "Super Hero", nameFa: "ابرقهرمان", color: "#EF4444", icon: "🦸‍♂️", description: "Saves candies from the evil spiders!", cost: 150, unlocked: true },
  { id: "wizard", name: "Cute Wizard", nameFa: "جادوگر بامزه", color: "#8B5CF6", icon: "🧙‍♂️", description: "Spells to summon giant sweet lollipops.", cost: 300, unlocked: false },
  { id: "scarf", name: "Warm Scarf", nameFa: "شال‌گردن گرم", color: "#F59E0B", icon: "🧣", description: "Cosy winter style for cold days.", cost: 100, unlocked: true },
];

const SPECIAL_POWERS = [
  { id: "xp_burst", name: "XP Burst", nameFa: "انفجار امتیاز", icon: "⚡", description: "Doubles learning XP for the next lesson.", cooldown: "2 hours", active: true },
  { id: "streak_shield", name: "Streak Shield", nameFa: "سپر زنجیره", icon: "🛡️", description: "Protects your study streak for 24 hours.", cooldown: "1 day", active: false },
  { id: "listening_radar", name: "Listening Radar", nameFa: "رادار شنیداری", icon: "📡", description: "Highlights correct options in tricky audio tasks.", cooldown: "Instant", active: false },
];

const COLLECTIBLE_STICKERS = [
  { id: "s1", name: "Sweet Dreamer", nameFa: "رویای شیرین", icon: "🍭", rarity: "Common", color: "from-pink-100 to-pink-200 border-pink-400" },
  { id: "s2", name: "Ta'arof Master", nameFa: "استاد تعارف", icon: "🌸", rarity: "Epic", color: "from-purple-100 to-purple-200 border-purple-400" },
  { id: "s3", name: "Spider Dodger", nameFa: "فرار از عنکبوت", icon: "🕷️", rarity: "Rare", color: "from-amber-100 to-amber-200 border-amber-400" },
  { id: "s4", name: "Golden Star", nameFa: "ستاره طلایی", icon: "⭐", rarity: "Legendary", color: "from-yellow-100 to-yellow-300 border-yellow-500 animate-pulse" },
];

const OM_NOM_DIALOUGES = [
  "سلام دوست من! امروز چه کلمه‌های جدیدی قراره یاد بگیریم؟ 🌟",
  "من عاشق آب‌نبات و زبان فارسی هستم! تعارف نمی‌کنم، واقعاً خوشمزه‌ست! 🍭",
  "با هم می‌تونیم تمام درس‌ها رو عالی یاد بگیریم! بدو بریم درس بعدی! 🚀",
  "وای! لباس جدیدم بهم میاد؟ حس می‌کنم خیلی خوش‌تیپ شدم! 😎",
  "هر وقت خسته شدی، من اینجام تا با هم بازی کنیم و انرژی بگیریم! 💚",
];

export default function OmNomProfilePage() {
  const [xp, setXp] = useState(320);
  const [streak, setStreak] = useState(5);
  const [hearts, setHearts] = useState(5);
  const [coins, setCoins] = useState(450);
  const [activeOutfit, setActiveOutfit] = useState("classic");
  const [dialogText, setDialogText] = useState("به پروفایل من خوش اومدی! روی شال‌گردن یا کلاهم بزن تا لباسم عوض شه! 🍬");
  const [activePowers, setActivePowers] = useState<string[]>(["xp_burst"]);
  const [isFeeding, setIsFeeding] = useState(false);
  const [chewing, setChewing] = useState(false);
  const [droppingCandies, setDroppingCandies] = useState<{ id: number; left: number }[]>([]);
  const [candyCounter, setCandyCounter] = useState(0);

  // AI Generated Style state
  const [aiGeneratedUI, setAiGeneratedUI] = useState<any>(null);
  const [isGeneratingUI, setIsGeneratingUI] = useState(false);

  // Dynamic feedback when changing outfit
  const handleOutfitChange = (outfitId: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      setDialogText("اووه! این لباس قفله. باید با سکه‌های طلایی‌ت از فروشگاه بازش کنی! 🔒");
      return;
    }
    setActiveOutfit(outfitId);
    const selected = OUTFITS.find(o => o.id === outfitId);
    if (outfitId === "classic") {
      setDialogText("آخیش! دوباره برگشتم به همون پوست سبز کلاسیک و راحت خودم! 💚");
    } else if (outfitId === "superhero") {
      setDialogText("من اوم‌نام قهرمانم! آماده‌ام تا با هیولاها مبارزه کنم و آب‌نبات‌ها رو نجات بدم! 🦸‍♂️💥");
    } else if (outfitId === "scarf") {
      setDialogText("به‌به! این شال‌گردن پشمی خیلی گرم و نرمه، مخصوصاً توی زمستون! 🧣✨");
    }
  };

  // Toggle dynamic special powers
  const togglePower = (powerId: string) => {
    if (activePowers.includes(powerId)) {
      setActivePowers(activePowers.filter(id => id !== powerId));
      setDialogText("قدرت مورد نظر غیرفعال شد. هر زمان خواستی می‌تونی دوباره فعالش کنی! 📡");
    } else {
      setActivePowers([...activePowers, powerId]);
      const p = SPECIAL_POWERS.find(power => power.id === powerId);
      setDialogText(`قدرت ${p?.nameFa} فعال شد! حالا درس بعدی برات جذاب‌تر می‌شه! ⚡`);
    }
  };

  // Dynamic feed candy interaction
  const feedCandy = () => {
    if (isFeeding) return;
    setIsFeeding(true);
    
    // Create dropping candy
    const newId = Date.now();
    const randomLeft = 40 + Math.random() * 20; // center-ish random
    setDroppingCandies(prev => [...prev, { id: newId, left: randomLeft }]);
    
    setTimeout(() => {
      // Candy hits mouth
      setChewing(true);
      setDroppingCandies(prev => prev.filter(c => c.id !== newId));
      setXp(prev => prev + 15);
      setCoins(prev => prev + 5);
      setCandyCounter(prev => prev + 1);
      
      const soundTexts = [
        "بوم! چه آب‌نبات خوشمزه‌ای بود! مرسی دوست خوبم! 🍭😋",
        "اوم نوم نوم! طعم نعناعی داشت! احساس می‌کنم قوی‌تر شدم! 🌱✨",
        "وای! تعارف نمی‌کنم، ولی بازم از اینا می‌خوام! 🍬💝",
        "به‌به! این آب‌نبات مستقیم رفت توی شکمم! دمت گرم! 🎈🍒",
      ];
      setDialogText(soundTexts[Math.floor(Math.random() * soundTexts.length)]);

      setTimeout(() => {
        setChewing(false);
        setIsFeeding(false);
      }, 1000);
    }, 800);
  };

  // Fetch dynamic profile recommendations from AI Model
  const generateAiProfileStyle = async () => {
    setIsGeneratingUI(true);
    try {
      const response = await fetch("/api/gemini/generate-omnom-profile-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenType: "Om Nom Profile Screen", mood: "Playful, Cartoon, Interactive" })
      });
      const data = await response.json();
      if (data.success) {
        setAiGeneratedUI(data.parsed);
        setDialogText("هورااا! هوش مصنوعی جمینی استایل فانتزی جدیدی برای پروفایل من طراحی کرد! 🎨🤖");
      } else {
        console.error("AI UI Style generation failed:", data.error);
      }
    } catch (e) {
      console.error("Error generating AI UI profile style:", e);
    } finally {
      setIsGeneratingUI(false);
    }
  };

  // Auto trigger a dialog bubble periodically for cartoon dynamic presence
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFeeding && !chewing) {
        setDialogText(OM_NOM_DIALOUGES[Math.floor(Math.random() * OM_NOM_DIALOUGES.length)]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isFeeding, chewing]);

  // Current stage computation
  const currentStage = STAGES_OF_EVOLUTION.find(stage => xp >= stage.minXp && xp <= stage.maxXp) || STAGES_OF_EVOLUTION[0];
  const progressPercent = Math.min(100, Math.max(0, ((xp - currentStage.minXp) / (currentStage.maxXp - currentStage.minXp)) * 100));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#81D4FA] to-[#A7F3D0] text-[#4B4B4B] py-10 px-4 sm:px-6 lg:px-8 font-sans select-none pb-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* TOP NAVIGATION BREADCRUMBS & INTER-PAGE LINK */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="w-10 h-10 bg-white border-2 border-b-4 border-gray-950 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all active:translate-y-[2px] active:border-b-2"
              id="back_btn"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </Link>
            <div className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-wider bg-white/60 backdrop-blur-sm border-2 border-gray-950/20 px-3.5 py-1.5 rounded-full">
              <Link href="/dashboard" className="hover:text-black">Zabando</Link>
              <span>/</span>
              <Link href="/profile" className="hover:text-black">Profile</Link>
              <span>/</span>
              <span className="text-emerald-800">Om Nom Profile</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link 
              href="/profile" 
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border-2 border-b-6 border-gray-900 text-gray-900 font-display font-black text-xs uppercase px-4.5 py-2.5 rounded-2xl active:translate-y-[2px] active:border-b-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              👤 My Stats & Badges
            </Link>
            <span className="text-[10px] bg-[#58CC02] border-2 border-gray-950 text-white font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Om Nom Live 🟢
            </span>
          </div>
        </div>

        {/* 1. CARTOON STATUS HEADER PANEL */}
        <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-cover" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0.1%, rgba(233, 226, 226, 0.28) 90.1%)" }}>
          <div className="flex items-center gap-4.5 flex-col sm:flex-row text-center sm:text-left z-10">
            <div className="w-20 h-20 bg-emerald-100 border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex items-center justify-center p-1.5 animate-bounce" style={{ animationDuration: "3s" }}>
              <GameIcon name="profile_avatar" size={72} />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-display font-black text-3xl text-gray-900 tracking-wide uppercase">
                  Om Nom Profile
                </h1>
                <span className="text-xs bg-[#FF9600] border-2 border-gray-900 text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {currentStage.name}
                </span>
              </div>
              <p className="text-sm font-bold text-emerald-800 mt-1 max-w-md">
                همسفر باهوش و فانتزی شما در یادگیری زبان فارسی! برای تکامل و ارتقای اوم‌نام درس‌ها رو ادامه بدید.
              </p>
            </div>
          </div>

          {/* Quick Metrics Icons Grid */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2 bg-[#E8F8FF] border-2 border-gray-900 px-4 py-2 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-7 h-7 flex items-center justify-center"><GameIcon name="xp_orb" size={28} /></div>
              <div className="text-left leading-none">
                <span className="font-mono font-black text-sm text-[#1CB0F6] block">{xp} XP</span>
                <span className="text-[9px] text-gray-500 font-bold block uppercase">Earned</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#FFF0F5] border-2 border-gray-900 px-4 py-2 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-7 h-7 flex items-center justify-center"><GameIcon name="streak_flame" size={28} /></div>
              <div className="text-left leading-none">
                <span className="font-mono font-black text-sm text-[#FF4B4B] block">{streak} Days</span>
                <span className="text-[9px] text-gray-500 font-bold block uppercase">Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#FFFDE7] border-2 border-gray-900 px-4 py-2 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-2xl select-none filter drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">🪙</span>
              <div className="text-left leading-none">
                <span className="font-mono font-black text-sm text-[#FF9600] block">{coins}</span>
                <span className="text-[9px] text-gray-500 font-bold block uppercase">Coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* CORE INTERACTIVE TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL: OM NOM CHARACTER VIEW (Interactive Canvas Area) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* CHARACTER MAIN CARD WITH COSTUME PREVIEW & CANDY GAME */}
            <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-h-[440px]">
              {/* Dynamic falling candies container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {droppingCandies.map(candy => (
                  <motion.div
                    key={candy.id}
                    initial={{ y: -50, rotate: 0 }}
                    animate={{ y: 280, rotate: 360 }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="absolute text-4xl"
                    style={{ left: `${candy.left}%` }}
                  >
                    🍭
                  </motion.div>
                ))}
              </div>

              {/* Gloss highlight on card */}
              <div className="absolute top-0 left-0 w-full h-12 bg-white/10 skew-y-6 pointer-events-none" />

              {/* Character State Status Indicator Badge */}
              <div className="absolute top-4 right-4 bg-emerald-50 border-2 border-gray-900 px-3 py-1 rounded-full text-xs font-black text-emerald-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {currentStage.nameFa} (لول {currentStage.level})
              </div>

              {/* XP LEVEL EVOLUTION BAR */}
              <div className="w-full max-w-sm bg-gray-100 border-2 border-gray-900 h-6 rounded-full relative overflow-hidden shadow-inner mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-[#58CC02] h-full"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-900 uppercase">
                  {xp} / {currentStage.maxXp} XP (تکامل)
                </span>
              </div>

              {/* INTERACTIVE AVATAR DISPLAY (Dynamic Costumes SVG / Animation) */}
              <div className="relative w-52 h-52 flex items-center justify-center select-none my-4">
                {/* Visual Glow effect */}
                <div className="absolute w-44 h-44 bg-green-200 rounded-full filter blur-xl opacity-60 animate-pulse" />

                {/* ANIMATED OM NOM COMPONENT (SVG-based) */}
                <motion.div
                  animate={
                    chewing
                      ? { scale: [1, 1.15, 0.95, 1.05, 1], y: [0, -10, 5, -2, 0] }
                      : { y: [0, -8, 0] }
                  }
                  transition={
                    chewing
                      ? { duration: 0.8, ease: "easeInOut" }
                      : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                  }
                  className="relative z-10 w-44 h-44 cursor-pointer"
                  onClick={feedCandy}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_6px_0_rgba(0,0,0,0.15)]">
                    <defs>
                      {/* Body gradient based on active costume */}
                      <radialGradient id="omNomBody" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor={activeOutfit === "classic" ? "#A3E635" : activeOutfit === "superhero" ? "#FF6B6B" : activeOutfit === "scarf" ? "#A3E635" : "#A3E635"} />
                        <stop offset="60%" stopColor={activeOutfit === "classic" ? "#58CC02" : activeOutfit === "superhero" ? "#EF4444" : activeOutfit === "scarf" ? "#46A302" : "#58CC02"} />
                        <stop offset="100%" stopColor={activeOutfit === "classic" ? "#22C55E" : activeOutfit === "superhero" ? "#991B1B" : activeOutfit === "scarf" ? "#166534" : "#22C55E"} />
                      </radialGradient>
                    </defs>

                    {/* SUPERHERO CAPE (Behind body) */}
                    {activeOutfit === "superhero" && (
                      <path d="M 15 65 L 5 95 L 30 90 L 50 68 L 70 90 L 95 95 L 85 65 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
                    )}

                    {/* MAIN ROUNDED BODY */}
                    <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#omNomBody)" stroke="#1E293B" strokeWidth="4" />

                    {/* GLOSS OVERLAY */}
                    <ellipse cx="38" cy="38" rx="10" ry="5" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 38 38)" />

                    {/* CUTE EXPRESSIVE GOOGLY EYES */}
                    {chewing ? (
                      // Chewing closed happy eyes
                      <g>
                        <path d="M 30 44 Q 38 36 44 44" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M 56 44 Q 62 36 70 44" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                      </g>
                    ) : (
                      // Normal giant cartoon eyes
                      <g>
                        {/* Left Eye */}
                        <circle cx="38" cy="42" r="11" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
                        <circle cx="39" cy="43" r="6" fill="#1E293B" />
                        <circle cx="36" cy="40" r="2.5" fill="#FFFFFF" />
                        
                        {/* Right Eye */}
                        <circle cx="62" cy="42" r="11" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
                        <circle cx="61" cy="43" r="6" fill="#1E293B" />
                        <circle cx="58" cy="40" r="2.5" fill="#FFFFFF" />
                      </g>
                    )}

                    {/* CUTE MOUTH */}
                    {chewing ? (
                      // Chewing mouth
                      <path d="M 40 64 Q 50 56 60 64" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                    ) : (
                      // Normal cute wide smile with tooth
                      <g>
                        <path d="M 38 62 Q 50 74 62 62 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2.5" />
                        {/* Little single baby tooth */}
                        <path d="M 43 62 L 46 66 L 49 62 Z" fill="#FFFFFF" />
                        <path d="M 51 62 L 54 66 L 57 62 Z" fill="#FFFFFF" />
                      </g>
                    )}

                    {/* CUTE MINI FEET */}
                    <ellipse cx="28" cy="85" rx="8" ry="6" fill="#15803D" stroke="#1E293B" strokeWidth="3.5" />
                    <ellipse cx="72" cy="85" rx="8" ry="6" fill="#15803D" stroke="#1E293B" strokeWidth="3.5" />

                    {/* SUPERHERO EYE MASK */}
                    {activeOutfit === "superhero" && (
                      <path d="M 22 42 Q 38 30 50 42 Q 62 30 78 42 Q 72 54 50 48 Q 28 54 22 42 Z" fill="#1E293B" opacity="0.9" />
                    )}

                    {/* WARM COSY WINTER SCARF */}
                    {activeOutfit === "scarf" && (
                      <g>
                        {/* Scarf loop around neck */}
                        <path d="M 22 68 Q 50 82 78 68 C 82 72 74 85 50 84 C 26 85 18 72 22 68 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />
                        {/* Stripes on scarf */}
                        <path d="M 34 74 Q 38 78 42 74" stroke="#EF4444" strokeWidth="3.5" fill="none" />
                        <path d="M 58 74 Q 62 78 66 74" stroke="#3B82F6" strokeWidth="3.5" fill="none" />
                        {/* Scarf tail hanging */}
                        <path d="M 68 76 L 78 95 L 86 92 L 76 74 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
                      </g>
                    )}
                  </svg>
                </motion.div>

                {/* Dynamic candy icon above Om Nom if idle */}
                {!isFeeding && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-0 text-3xl cursor-pointer bg-white border-2 border-gray-900 rounded-2xl p-1 shadow-sm hover:scale-110 active:scale-95 transition-all z-20"
                    onClick={feedCandy}
                    title="برای غذا دادن به اوم‌نام کلیک کنید!"
                  >
                    🍬 Feed
                  </motion.div>
                )}
              </div>

              {/* OM NOM TALK BUBBLE / CHAT LOG */}
              <div className="relative bg-emerald-50 border-4 border-gray-900 rounded-3xl p-4.5 w-full max-w-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-right">
                {/* Talk bubble arrow decoration */}
                <div className="absolute left-1/2 -top-4 w-4 h-4 bg-emerald-50 border-t-4 border-l-4 border-gray-900 transform -rotate-45 -translate-x-1/2" />
                
                <p className="font-display font-bold text-sm text-emerald-950 leading-relaxed">
                  {dialogText}
                </p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-emerald-900/10">
                  <span className="text-[10px] text-emerald-800 font-mono font-black uppercase">Candy Counter: {candyCounter} Eaten</span>
                  <button 
                    onClick={() => {
                      const randIndex = Math.floor(Math.random() * OM_NOM_DIALOUGES.length);
                      setDialogText(OM_NOM_DIALOUGES[randIndex]);
                    }}
                    className="text-[10px] text-emerald-900 hover:underline font-bold"
                  >
                    بگو یه حرف دیگه! 🗣️
                  </button>
                </div>
              </div>
            </div>

            {/* ACHIEVEMENTS & UNLOCKED BADGES */}
            <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-3 mb-4">
                <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> دستاوردهای اوم‌نام
                </h3>
                <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2.5 py-1 rounded-full font-black">BADGES & TROPHIES</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border-2 border-gray-900 rounded-2xl p-3 flex flex-col items-center text-center bg-[#FFFDE7] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all cursor-pointer" onClick={() => setDialogText("این مدال شروع استارت یادگیریته! کارت خیلی عالی بود دوست من! 🌱")}>
                  <GameIcon name="badge_medal" size={44} />
                  <p className="font-display font-black text-xs text-gray-900 mt-2">First Steps</p>
                  <p className="text-[10px] font-bold text-[#FF9600]">A1 Started</p>
                </div>

                <div className="border-2 border-gray-900 rounded-2xl p-3 flex flex-col items-center text-center bg-[#FFF0F5] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all cursor-pointer" onClick={() => setDialogText("زنجیره ۵ روزه مطالعه مستمر! شعله آتشین تلاشت خاموش نشه! 🔥")}>
                  <div className="w-11 h-11 flex items-center justify-center"><GameIcon name="streak_flame" size={38} /></div>
                  <p className="font-display font-black text-xs text-gray-900 mt-2">Flame Keeper</p>
                  <p className="text-[10px] font-bold text-[#FF4B4B]">5 Day Streak</p>
                </div>

                <div className="border-2 border-gray-900 rounded-2xl p-3 flex flex-col items-center text-center bg-[#E8F8FF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all cursor-pointer" onClick={() => setDialogText("ستاره طلایی قهرمان لول بالا! با پیشرفت توی جدول قهرمانان لول می‌گیری! ⭐")}>
                  <div className="w-11 h-11 flex items-center justify-center"><GameIcon name="level_star" size={38} /></div>
                  <p className="font-display font-black text-xs text-gray-900 mt-2">Level Master</p>
                  <p className="text-[10px] font-bold text-[#1CB0F6]">Reach Level 8</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-3 flex flex-col items-center justify-center text-center bg-gray-50 opacity-65">
                  <Lock className="w-8 h-8 text-gray-400 mb-1" />
                  <p className="font-display font-black text-xs text-gray-400">Candy King</p>
                  <p className="text-[9px] font-bold text-gray-400">Eat 50 Candies</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: POWER-UPS, CUSTOM SKIN SHOP, & AI GENERATOR */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* POWER-UPS MODULE (Toggles Specials) */}
            <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-3 mb-4">
                <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky-500" /> قدرت‌های فعال اوم‌نام
                </h3>
                <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full font-black">ACTIVE POWERS</span>
              </div>

              <div className="space-y-3">
                {SPECIAL_POWERS.map(power => {
                  const isActive = activePowers.includes(power.id);
                  return (
                    <div 
                      key={power.id}
                      onClick={() => togglePower(power.id)}
                      className={`flex items-center justify-between border-2 border-gray-900 p-3 rounded-2xl cursor-pointer transition-all active:translate-y-[1px] ${isActive ? "bg-emerald-50 border-emerald-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-gray-50 border-gray-300 opacity-80"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{power.icon}</span>
                        <div className="text-right">
                          <p className="font-display font-black text-sm text-gray-900">{power.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold leading-none mt-0.5">{power.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-gray-200 px-2 py-0.5 rounded-full font-mono text-gray-600 font-bold">{power.cooldown}</span>
                        <span className={`w-3 h-3 rounded-full border border-gray-900 ${isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SKIN & CUSTOMIZATION SHOP */}
            <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-3 mb-4">
                <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Smile className="w-5 h-5 text-purple-500" /> کمد لباس و پوسته‌ها
                </h3>
                <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full font-black">COSTUME SHOP</span>
              </div>

              <p className="text-xs text-gray-500 font-bold mb-4">
                با انتخاب پوسته‌های فانتزی، استایل اوم‌نام را به سلیقه خود تغییر دهید! بعضی از پوسته‌ها نیاز به باز کردن دارند.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {OUTFITS.map(outfit => {
                  const isActive = activeOutfit === outfit.id;
                  return (
                    <button
                      key={outfit.id}
                      onClick={() => handleOutfitChange(outfit.id, outfit.unlocked)}
                      className={`flex flex-col items-center p-3.5 border-2 rounded-2xl relative select-none transition-all ${
                        isActive
                          ? "bg-purple-100 border-purple-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                          : "bg-gray-50 border-gray-900 hover:bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]"
                      }`}
                    >
                      {/* Ribbon / Status Badge inside outfit card */}
                      {isActive && (
                        <span className="absolute -top-2.5 -right-1 bg-[#58CC02] border-2 border-gray-900 text-white font-black text-[8px] px-1.5 py-0.5 rounded-full uppercase">
                          wearing
                        </span>
                      )}
                      
                      {!outfit.unlocked && (
                        <div className="absolute inset-0 bg-gray-100/85 rounded-2xl flex items-center justify-center flex-col gap-1 z-10">
                          <Lock className="w-5 h-5 text-gray-600" />
                          <span className="font-mono text-[9px] bg-yellow-400 border border-gray-900 px-1.5 py-0.5 rounded-md font-black">{outfit.cost} 🪙</span>
                        </div>
                      )}

                      <span className="text-3xl filter drop-shadow-[1px_2px_0_rgba(0,0,0,0.15)] mb-1.5">{outfit.icon}</span>
                      <span className="font-display font-black text-xs text-gray-900 block">{outfit.nameFa}</span>
                      <span className="text-[9px] text-gray-400 font-bold block text-center leading-tight mt-1">{outfit.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLLECTIBLES (STICKER BOOKLET) */}
            <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-3 mb-4">
                <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-500" /> دفترچه استیکرهای من
                </h3>
                <span className="text-xs bg-pink-50 text-pink-700 border border-pink-200 px-2.5 py-1 rounded-full font-black">STICKER BOOK</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {COLLECTIBLE_STICKERS.map(sticker => (
                  <div
                    key={sticker.id}
                    onClick={() => setDialogText(`استیکر "${sticker.nameFa}"! این استیکر درجه ${sticker.rarity} هست و با یادگیری بدست میاد! 🧸`)}
                    className={`bg-gradient-to-br ${sticker.color} border-2 border-gray-900 p-2.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    <span className="text-2xl filter drop-shadow-[1px_2px_0_rgba(0,0,0,0.1)]">{sticker.icon}</span>
                    <span className="text-[8px] font-black uppercase text-gray-800 tracking-wide mt-1.5">{sticker.nameFa}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. DYNAMIC AI STYLING RULES PLAYGROUND (GEMINI INTEGRATION) */}
            <div className="bg-[#FFFDF9] border-4 border-[#FFC542] border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#FFE3B3] pb-3 mb-4">
                <h3 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF8A00]" /> دستیار طراحی جمینی ۳.۵ فلش
                </h3>
                <span className="text-[9px] bg-[#FFF5E0] text-[#FF8A00] border border-[#FFE3B3] px-2 py-0.5 rounded-full font-bold">AI_PROMPT_ENGINE</span>
              </div>

              <p className="text-[11px] text-gray-600 font-bold leading-relaxed mb-4">
                با ارسال دستور به جمینی ۳.۵ فلاش، بگذارید تا المان‌ها و رنگ‌های دلخواه کودک‌پسند شما را تحلیل و طراحی مجدد کند:
              </p>

              <button
                onClick={generateAiProfileStyle}
                disabled={isGeneratingUI}
                className="w-full flex items-center justify-center gap-2 bg-[#FFC542] hover:bg-[#F0B429] disabled:bg-gray-200 border-2 border-b-6 border-gray-900 text-gray-900 font-display font-black text-xs uppercase px-4 py-3 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:border-b-2 transition-all"
              >
                {isGeneratingUI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>در حال طراحی مجدد توسط هوش مصنوعی...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-gray-900" />
                    <span>طراحی فانتزی هوش مصنوعی برای اوم‌نام</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {aiGeneratedUI && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="mt-4 bg-amber-50/80 border-2 border-dashed border-[#FFC542] rounded-2xl p-4.5 space-y-3"
                  >
                    <div className="text-right space-y-2">
                      <div>
                        <span className="text-[9px] bg-amber-200 border border-amber-300 text-amber-800 px-2 py-0.5 rounded-full font-black uppercase">Header Layout</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Header}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-emerald-200 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-full font-black uppercase">Character Card Specs</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.CharacterCard}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-purple-200 border border-purple-300 text-purple-800 px-2 py-0.5 rounded-full font-black uppercase">Dynamic Integration</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.OmNomIntegration}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div className="text-[10px] text-gray-500 font-bold flex items-center justify-end gap-1">
                        <span>قوانین استایل: {aiGeneratedUI.VisualStyle}</span>
                        <HelpCircle className="w-3.5 h-3.5 text-[#FF8A00]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3. LESSON SCREEN FOOTER NAVIGATION BAR */}
        <div className="bg-white border-4 border-gray-900 border-b-8 rounded-[24px] p-4.5 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-cover">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-[#F1F1F1] hover:bg-slate-200 border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black text-gray-900 active:translate-y-[1px] active:border-b-2 transition-all uppercase"
          >
            <span>🏠</span> Home
          </Link>

          <span className="text-[10px] font-mono text-gray-400 font-bold">
            Om Nom Profile Screen • UI Version 3.5-flash
          </span>

          <Link
            href="/lesson/vocab-basics"
            className="flex items-center gap-2 bg-[#58CC02] hover:bg-[#46A302] border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black text-white active:translate-y-[1px] active:border-b-2 transition-all uppercase"
          >
            Practice ➔
          </Link>
        </div>

      </div>
    </main>
  );
}
