"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  Flame, 
  Sparkles, 
  Shield, 
  Zap, 
  Award, 
  ChevronRight, 
  Plus, 
  Trash, 
  Settings, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Lock,
  Volume2,
  Tv,
  Smartphone,
  Tablet as TabletIcon,
  Laptop,
  Check,
  Star,
  RefreshCw,
  Sliders,
  Bell,
  ArrowRight
} from "lucide-react";
import { GameIcon } from "../../src/components/GameIcon";

// Sound effects using Web Audio Synthesis
function playTone(freq: number, type: OscillatorType, duration: number) {
  if (typeof window === "undefined" || !window.AudioContext) return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio Synthesis error", e);
  }
}

const playSuccessSound = () => {
  playTone(523.25, "sine", 0.15); // C5
  setTimeout(() => playTone(659.25, "sine", 0.15), 100); // E5
  setTimeout(() => playTone(783.99, "sine", 0.3), 200); // G5
};

const playUpgradeSound = () => {
  playTone(440, "sine", 0.1); // A4
  setTimeout(() => playTone(554.37, "sine", 0.1), 80); // C#5
  setTimeout(() => playTone(659.25, "sine", 0.1), 160); // E5
  setTimeout(() => playTone(880, "sine", 0.4), 240); // A5
};

const playErrorSound = () => {
  playTone(220, "sawtooth", 0.2); // A3
  setTimeout(() => playTone(147, "sawtooth", 0.3), 150); // D3
};

const playTapSound = () => {
  playTone(600, "sine", 0.05);
};

export default function EvolutionPage() {
  // Device Preview Mode: "responsive" | "mobile" | "tablet" | "admin"
  const [previewMode, setPreviewMode] = useState<"responsive" | "mobile" | "tablet" | "admin">("responsive");
  
  // Real layout state based on actual window size (for responsive mode)
  const [actualMode, setActualMode] = useState<"mobile" | "tablet" | "admin">("admin");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActualMode("mobile");
      } else if (window.innerWidth < 1024) {
        setActualMode("tablet");
      } else {
        setActualMode("admin");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentMode = previewMode === "responsive" ? actualMode : previewMode;

  // Evolution User State
  const [omNomStage, setOmNomStage] = useState(3); // 1, 2, 3, 4
  const [isEvolving, setIsEvolving] = useState(false);
  const [showEvolutionCelebration, setShowEvolutionCelebration] = useState(false);
  
  // Powers upgrade levels
  const [powers, setPowers] = useState({
    xpBurst: { name: "XP Burst ⚡", level: 2, max: 5, cost: 150, desc: "افزایش امتیاز دریافتی از تمام سوالات صحیح" },
    streakShield: { name: "Streak Shield 🛡️", level: 1, max: 3, cost: 250, desc: "محافظت خودکار از زنجیره روزانه در صورت غیبت" },
    listeningRadar: { name: "Listening Radar 📡", level: 3, max: 5, cost: 180, desc: "دقت بالاتر در تحلیل لهجه و تلفظ شنیداری" }
  });

  // Requirements for Stage 3 -> 4
  const [reqs, setReqs] = useState({
    lessons: { text: "تکمیل ۳ درس جدید زباندو", done: false, current: 1, target: 3 },
    streak: { text: "حفظ زنجیره ۵ روزه فعالیت", done: true, current: 5, target: 5 },
    boss: { text: "شکست دادن رئیس عنکبوتی (Shadow Nom)", done: false, current: 0, target: 1 }
  });

  // Stats
  const [coins, setCoins] = useState(480);
  const [xp, setXp] = useState(850);
  const [streak, setStreak] = useState(5);

  // Admin Dashboard States
  const [adminActiveTab, setAdminActiveTab] = useState<"stages" | "powers" | "rewards" | "users">("stages");
  const [adminStages, setAdminStages] = useState([
    { id: 1, name: "Baby Nom 🥚", xpNeeded: 0, status: "completed", reward: "Default Skin" },
    { id: 2, name: "Novice Nom 🍬", xpNeeded: 300, status: "completed", reward: "Candy Detector" },
    { id: 3, name: "Skilled Nom 🦸‍♂️", xpNeeded: 800, status: "active", reward: "Star Shield" },
    { id: 4, name: "Master Nom 👑", xpNeeded: 1500, status: "locked", reward: "Royal Cape Skin" }
  ]);
  const [selectedAdminStage, setSelectedAdminStage] = useState<number | null>(3);
  const [adminLog, setAdminLog] = useState<string[]>([
    "سامانه مدیریت تکامل بارگذاری شد.",
    "پارامترهای ارتقای سطح کاربران هماهنگ شدند."
  ]);

  // Action: Upgrade power
  const handleUpgradePower = (key: keyof typeof powers) => {
    const power = powers[key];
    if (power.level >= power.max) {
      playErrorSound();
      alert("این قدرت به حداکثر سطح رسیده است!");
      return;
    }
    if (coins < power.cost) {
      playErrorSound();
      alert("سکه‌ کافی برای ارتقای این قدرت ندارید!");
      return;
    }

    setCoins(prev => prev - power.cost);
    setPowers(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        level: prev[key].level + 1,
        cost: Math.round(prev[key].cost * 1.5)
      }
    }));
    playUpgradeSound();
  };

  // Action: Toggle requirements for simulation
  const toggleReq = (key: keyof typeof reqs) => {
    playTapSound();
    setReqs(prev => {
      const item = prev[key];
      const nextVal = item.current === item.target ? 0 : item.target;
      return {
        ...prev,
        [key]: {
          ...item,
          current: nextVal,
          done: nextVal === item.target
        }
      };
    });
  };

  // Action: Attempt Evolution to Stage 4!
  const triggerEvolution = () => {
    if (omNomStage >= 4) {
      playErrorSound();
      return;
    }
    const allDone = Object.values(reqs).every(r => r.done);
    if (!allDone) {
      playErrorSound();
      alert("لطفاً ابتدا تمام پیش‌نیازهای تکامل را تکمیل کنید! (روی خانه‌های پیش‌نیاز کلیک کنید تا سبز شوند)");
      return;
    }

    setIsEvolving(true);
    playTone(300, "sawtooth", 0.5);
    setTimeout(() => {
      playTone(450, "sawtooth", 0.5);
    }, 400);
    setTimeout(() => {
      playTone(600, "sawtooth", 0.8);
    }, 800);

    setTimeout(() => {
      setIsEvolving(false);
      setOmNomStage(4);
      setShowEvolutionCelebration(true);
      playSuccessSound();
      // Update admin stage status too
      setAdminStages(prev => prev.map(s => s.id === 3 ? { ...s, status: "completed" } : s.id === 4 ? { ...s, status: "active" } : s));
    }, 1800);
  };

  const resetEvolution = () => {
    playTapSound();
    setOmNomStage(3);
    setShowEvolutionCelebration(false);
    setReqs(prev => ({
      lessons: { ...prev.lessons, current: 1, done: false },
      streak: { ...prev.streak, current: 5, done: true },
      boss: { ...prev.boss, current: 0, done: false }
    }));
    setAdminStages(prev => prev.map(s => s.id === 3 ? { ...s, status: "active" } : s.id === 4 ? { ...s, status: "locked" } : s));
  };

  return (
    <div className="min-h-screen bg-[#110D1A] text-white p-3 md:p-6 font-sans relative overflow-x-hidden selection:bg-[#FF4B4B] selection:text-white">
      
      {/* Cartoon Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      {/* TOP CONTROLLERS: PREVIEW SELECTOR */}
      <div className="max-w-7xl mx-auto mb-6 bg-gradient-to-r from-[#211B2E] via-[#2F2445] to-[#211B2E] border-4 border-gray-950 p-4 rounded-3xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-4 z-50 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 border border-purple-400/30 rounded-2xl">
            <Tv className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="font-display font-black text-sm uppercase tracking-wider text-purple-200">
              Zabando Device Simulator
            </h2>
            <p className="text-[10px] text-gray-400 font-bold">
              تغییر حالت پیش‌نمایش دستگاه برای ارزیابی رسپانسیو کارتونی
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex bg-black/40 border-2 border-purple-950 p-1 rounded-2xl">
          <button
            onClick={() => { playTapSound(); setPreviewMode("responsive"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "responsive" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Responsive ({actualMode})</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("mobile"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "mobile" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 Mobile</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("tablet"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "tablet" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <TabletIcon className="w-3.5 h-3.5" />
            <span>📟 Tablet</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("admin"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "admin" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>💻 Admin</span>
          </button>
        </div>
      </div>

      {/* RENDER SIMULATED CANVAS */}
      <div className="max-w-7xl mx-auto flex justify-center items-start min-h-[750px]">
        
        {/* CONTAINER CONDITIONAL STYLE BASED ON CHOSEN SIMULATION */}
        <div 
          className={`w-full transition-all duration-500 ease-out ${
            currentMode === "mobile" 
              ? "max-w-[410px] bg-[#1E172E] border-[12px] border-gray-950 rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] h-[820px] overflow-y-auto overflow-x-hidden relative flex flex-col scrollbar-none" 
              : currentMode === "tablet"
              ? "max-w-[768px] bg-[#1E172E] border-[12px] border-gray-950 rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] h-[840px] overflow-y-auto overflow-x-hidden relative flex flex-col scrollbar-none"
              : "w-full bg-[#171221] border-4 border-gray-950 rounded-[36px] p-6 shadow-2xl flex flex-col"
          }`}
        >
          
          {/* ========================================================= */}
          {/* 📱 MOBILE VIEW SCREEN */}
          {/* ========================================================= */}
          {currentMode === "mobile" && (
            <div className="flex-1 flex flex-col text-right justify-between p-4 bg-[#140F21]">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-purple-950/60 pb-3 mb-4 select-none">
                {/* User status icons */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 bg-black/40 px-2 py-1 rounded-xl border border-purple-500/20 text-[10px]">
                    <GameIcon name="badge_medal" size={14} />
                    <span className="font-mono font-black text-amber-400">12</span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-black/40 px-2 py-1 rounded-xl border border-purple-500/20 text-[10px]">
                    <GameIcon name="streak_flame" size={14} />
                    <span className="font-mono font-black text-orange-400">{streak}d</span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-black/40 px-2 py-1 rounded-xl border border-purple-500/20 text-[10px]">
                    <GameIcon name="xp_orb" size={14} />
                    <span className="font-mono font-black text-emerald-400">{xp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <h1 className="font-display font-black text-sm text-purple-200">تکامل Om Nom</h1>
                    <span className="text-[8px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded-full uppercase">Zabando Evolution</span>
                  </div>
                  <div className="w-8 h-8 bg-purple-500/20 rounded-xl border border-purple-500/30 flex items-center justify-center p-0.5">
                    <GameIcon name="profile_avatar" size={26} />
                  </div>
                </div>
              </div>

              {/* Main Content Areas */}
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-none pr-0.5">
                
                {/* 1. Evolution Stage Card */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="bg-[#1C2C20] border-4 border-[#58CC02] border-b-8 p-4 rounded-[28px] text-right shadow-[3px_3px_0_rgba(0,0,0,1)] flex flex-col items-center relative overflow-hidden"
                >
                  <div className="absolute top-2 left-2 bg-[#58CC02]/20 border border-[#58CC02]/30 px-2 py-0.5 rounded-full text-[8px] font-bold text-[#58CC02]">
                    STAGE {omNomStage}
                  </div>

                  {/* Character visual based on stage */}
                  <div className="relative w-28 h-28 flex items-center justify-center bg-black/20 rounded-full border-2 border-dashed border-[#58CC02]/40 p-2 mt-2">
                    <motion.div 
                      animate={isEvolving ? { rotate: 360, scale: [1, 1.3, 1] } : { scale: [1, 1.05, 1] }}
                      transition={{ duration: isEvolving ? 0.6 : 2.5, repeat: isEvolving ? 3 : Infinity }}
                      className="text-5xl"
                    >
                      {omNomStage === 1 ? "🥚" : omNomStage === 2 ? "👶" : omNomStage === 3 ? "🦸‍♂️" : "👑"}
                    </motion.div>
                    {/* Tiny visual indicators */}
                    <div className="absolute -bottom-1 bg-[#58CC02] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                      {omNomStage === 1 ? "Baby Nom" : omNomStage === 2 ? "Novice Nom" : omNomStage === 3 ? "Skilled Nom" : "Master Nom"}
                    </div>
                  </div>

                  <div className="w-full mt-3 text-center">
                    <h3 className="font-display font-black text-sm text-[#B8FF4B]">
                      {omNomStage === 3 ? "تکامل سطح ۳: اوم‌نام قهرمان" : "تکامل نهایی: پادشاه اوم‌نام"}
                    </h3>
                    <p className="text-[10px] text-gray-300 mt-1" dir="rtl">
                      پاداش ارتقا: {omNomStage === 3 ? "دریافت نشان سپر طلایی و ۲۰۰ امتیاز" : "دریافت زره باشکوه و تاج طلایی پادشاهی"}
                    </p>
                  </div>

                  {/* Progress bar to Stage 4 */}
                  <div className="w-full mt-3 bg-black/40 border border-[#58CC02]/30 p-2.5 rounded-xl">
                    <div className="flex justify-between items-center text-[9px] mb-1">
                      <span className="font-mono text-gray-400">XP {xp}/1500</span>
                      <span className="font-bold text-[#B8FF4B]">پیشرفت تکامل</span>
                    </div>
                    <div className="w-full bg-gray-950 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-[#58CC02] to-[#B8FF4B] rounded-full transition-all duration-500" 
                        style={{ width: `${omNomStage >= 4 ? 100 : (xp / 1500) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* 2. Powers Section (Orange) */}
                <div className="bg-[#2E1B15] border-4 border-[#FF9600] border-b-8 p-4 rounded-[28px] text-right shadow-[3px_3px_0_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center border-b border-orange-950/50 pb-2 mb-3">
                    <span className="text-[9px] bg-orange-500/20 text-[#FF9600] font-black px-2 py-0.5 rounded-full">UPGRADE POWERS</span>
                    <h3 className="font-display font-black text-xs text-[#FF9600]">قدرت‌های شگفت‌انگیز اوم‌نام</h3>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(powers).map(([key, power]) => (
                      <div key={key} className="bg-black/30 p-2 rounded-xl border border-orange-500/10 flex items-center justify-between text-left">
                        <button
                          onClick={() => handleUpgradePower(key as keyof typeof powers)}
                          disabled={coins < power.cost || power.level >= power.max}
                          className="bg-[#FF9600] hover:bg-orange-600 disabled:bg-gray-800 border-b-4 border-orange-950 text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg transition-all active:translate-y-0.5 active:border-b-0 cursor-pointer flex items-center gap-1"
                        >
                          <span>{power.cost} 🍬</span>
                          <span className="border-l border-orange-950/40 pl-1">ارتقا</span>
                        </button>
                        <div className="text-right flex-1 pr-3">
                          <p className="text-[10px] font-black text-orange-200">{power.name}</p>
                          <div className="flex justify-end gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <div 
                                key={lvl} 
                                className={`w-3 h-1.5 rounded-full ${
                                  lvl <= power.level ? "bg-[#FF9600]" : "bg-gray-800"
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Requirements Section (Pink) */}
                {omNomStage < 4 && (
                  <div className="bg-[#2D1621] border-4 border-[#FF66A1] border-b-8 p-4 rounded-[28px] text-right shadow-[3px_3px_0_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center border-b border-pink-950/50 pb-2 mb-3">
                      <span className="text-[8px] bg-pink-500/20 text-[#FF66A1] font-black px-2 py-0.5 rounded-full">REQUIREMENTS</span>
                      <h3 className="font-display font-black text-xs text-[#FF66A1]">پیش‌نیازهای تکامل بعدی</h3>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(reqs).map(([key, req]) => (
                        <div 
                          key={key} 
                          onClick={() => toggleReq(key as keyof typeof reqs)}
                          className={`p-2.5 rounded-xl border border-pink-500/10 text-right cursor-pointer flex items-center justify-between transition-all ${
                            req.done ? "bg-[#182C1F] border-[#58CC02]/40" : "bg-black/30 hover:bg-[#341C29]"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 ${
                            req.done ? "bg-[#58CC02] border-[#58CC02]" : "border-pink-500/40 bg-transparent"
                          }`}>
                            {req.done && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-200">{req.text}</p>
                            <span className="text-[8px] font-mono text-pink-400 font-bold block text-right mt-0.5">
                              {req.current} / {req.target} تکمیل شده
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Evolute Button */}
                    <button
                      onClick={triggerEvolution}
                      className="w-full mt-3.5 bg-[#FF66A1] hover:bg-pink-600 border-b-6 border-pink-950 p-2.5 rounded-xl text-center font-display font-black text-xs uppercase tracking-wider text-white transition-all active:translate-y-1 active:border-b-2 cursor-pointer"
                    >
                      🚀 دگرگونی بزرگ اوم‌نام! EVOLVE NOW
                    </button>
                  </div>
                )}

              </div>

              {/* Bottom Nav Bar */}
              <div className="mt-4 bg-white border-2 border-gray-950 border-b-4 rounded-xl p-2 flex items-center justify-around select-none text-gray-900">
                <Link href="/dashboard" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_home" size={24} />
                </Link>
                <Link href="/skill-tree" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_back" size={24} />
                </Link>
                <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-mono font-black text-xs shadow-inner">
                  {omNomStage}
                </div>
                <Link href="/shop" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_next" size={24} />
                </Link>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 📟 TABLET VIEW SCREEN */}
          {/* ========================================================= */}
          {currentMode === "tablet" && (
            <div className="flex-1 flex flex-col text-right justify-between p-6 bg-[#161125]">
              {/* Header */}
              <div className="flex items-center justify-between border-b-4 border-dashed border-purple-950/80 pb-4 mb-4 select-none">
                {/* User status icons */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-2xl border border-purple-500/20 text-xs">
                    <GameIcon name="badge_medal" size={16} />
                    <span className="font-mono font-black text-amber-400">12 Badges</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-2xl border border-purple-500/20 text-xs">
                    <GameIcon name="streak_flame" size={16} />
                    <span className="font-mono font-black text-orange-400">{streak} Days</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-2xl border border-purple-500/20 text-xs">
                    <GameIcon name="xp_orb" size={16} />
                    <span className="font-mono font-black text-emerald-400">{xp} XP</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h1 className="font-display font-black text-lg text-purple-200">کمیته عالی تکامل اوم‌نام</h1>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full uppercase">Zabando Evolution Board • Tablet View</span>
                  </div>
                  <div className="w-10 h-10 bg-purple-500/20 rounded-2xl border-2 border-purple-500/30 flex items-center justify-center p-1">
                    <GameIcon name="profile_avatar" size={32} />
                  </div>
                </div>
              </div>

              {/* Main Content Areas - Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-y-auto scrollbar-none pr-0.5 py-2">
                
                {/* LEFT COLUMN: Stage details + requirements */}
                <div className="md:col-span-7 space-y-4">
                  {/* Stage Card */}
                  <div className="bg-[#1C2C20] border-4 border-[#58CC02] border-b-8 p-4.5 rounded-[32px] text-right shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-between relative overflow-hidden h-[330px]">
                    <div className="absolute top-3 left-3 bg-[#58CC02]/20 border border-[#58CC02]/30 px-3 py-1 rounded-full text-xs font-black text-[#58CC02]">
                      STAGE {omNomStage} OF 4
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-4">
                      {/* Character visual */}
                      <div className="w-32 h-32 flex items-center justify-center bg-black/30 rounded-full border-2 border-dashed border-[#58CC02]/40 relative">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className="text-6xl"
                        >
                          {omNomStage === 1 ? "🥚" : omNomStage === 2 ? "👶" : omNomStage === 3 ? "🦸‍♂️" : "👑"}
                        </motion.div>
                        <div className="absolute -bottom-2 bg-[#58CC02] text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg">
                          {omNomStage === 3 ? "Skilled Nom" : "Master Nom"}
                        </div>
                      </div>

                      <div className="flex-1 text-right">
                        <h3 className="font-display font-black text-lg text-[#B8FF4B]">
                          اوم‌نام در آستانه جهش تکامل
                        </h3>
                        <p className="text-xs text-gray-300 mt-2 leading-relaxed" dir="rtl">
                          با حل تمرین‌های تلفظ و شرکت در مبارزه حماسی با عنکبوت سایه، اوم‌نام را به قدرتمندترین فرم خود تبدیل کنید!
                        </p>
                        <div className="flex justify-end gap-2 mt-3">
                          <span className="text-[10px] bg-black/40 border border-purple-500/20 px-2.5 py-1 rounded-lg text-yellow-400 font-bold">
                            +500 XP پاداش دگرگونی
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full bg-black/40 border border-[#58CC02]/30 p-3 rounded-2xl mt-4">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono text-gray-400">XP {xp} / 1500 (Stage Up Requirement)</span>
                        <span className="font-black text-[#B8FF4B]">امتیاز ارتقای اوم‌نام</span>
                      </div>
                      <div className="w-full bg-gray-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div 
                          className="h-full bg-gradient-to-r from-[#58CC02] to-[#B8FF4B] rounded-full transition-all duration-500" 
                          style={{ width: `${omNomStage >= 4 ? 100 : (xp / 1500) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Requirements Card */}
                  {omNomStage < 4 ? (
                    <div className="bg-[#2D1621] border-4 border-[#FF66A1] border-b-8 p-4.5 rounded-[32px] text-right shadow-[4px_4px_0_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center border-b border-pink-950/50 pb-2.5 mb-3">
                        <span className="text-xs bg-pink-500/20 text-[#FF66A1] font-black px-2.5 py-0.5 rounded-full uppercase">Requirements Checklist</span>
                        <h3 className="font-display font-black text-sm text-[#FF66A1]">پیش‌نیازهای تکامل به سطح ۴ (Master Nom)</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(reqs).map(([key, req]) => (
                          <div 
                            key={key} 
                            onClick={() => toggleReq(key as keyof typeof reqs)}
                            className={`p-3.5 rounded-2xl border text-right cursor-pointer flex flex-col justify-between h-28 transition-all ${
                              req.done ? "bg-[#182C1F] border-[#58CC02]/40" : "bg-black/30 hover:bg-[#341C29] border-pink-500/10"
                            }`}
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className="text-[9px] font-mono font-black text-pink-400">
                                {req.current}/{req.target}
                              </span>
                              <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 ${
                                req.done ? "bg-[#58CC02] border-[#58CC02]" : "border-pink-500/40 bg-transparent"
                              }`}>
                                {req.done && <Check className="w-3 h-3 text-white stroke-[3]" />}
                              </div>
                            </div>
                            <div>
                              <p className="text-[11px] font-black text-gray-200 mt-2 leading-tight">{req.text}</p>
                              <span className="text-[8px] text-gray-500 block text-right mt-1">تغییر وضعیت شبیه‌ساز</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={triggerEvolution}
                        className="w-full mt-4 bg-[#FF66A1] hover:bg-pink-600 border-b-6 border-pink-950 p-3 rounded-2xl text-center font-display font-black text-sm uppercase tracking-wider text-white transition-all active:translate-y-1 active:border-b-2 cursor-pointer"
                      >
                        🚀 آغاز دگرگونی به فرم جادویی پادشاه! EVOLVE OM NOM
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#1C2C20] border-4 border-[#58CC02] border-b-8 p-6 rounded-[32px] text-center shadow-[4px_4px_0_rgba(0,0,0,1)] space-y-4">
                      <span className="text-5xl animate-bounce inline-block">👑✨🍭</span>
                      <h3 className="font-display font-black text-xl text-[#B8FF4B]">پادشاه اوم‌نام به اوج تکامل خود رسید!</h3>
                      <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed" dir="rtl">
                        شما تمام پیش‌نیازهای تکامل را با موفقیت شبیه‌سازی کردید. اوم‌نام قهرمان اکنون تاج‌گذاری کرده و به فرمانروای کهکشان زباندو تبدیل شده است!
                      </p>
                      <button 
                        onClick={resetEvolution}
                        className="bg-black/40 hover:bg-black/60 border border-[#58CC02]/40 text-[#58CC02] font-black text-xs uppercase px-4 py-2 rounded-xl cursor-pointer"
                      >
                        🔄 بازنشانی شبیه‌سازی تکامل
                      </button>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Powers management + sidebar */}
                <div className="md:col-span-5 space-y-4">
                  {/* Powers Card */}
                  <div className="bg-[#2E1B15] border-4 border-[#FF9600] border-b-8 p-4.5 rounded-[32px] text-right shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center border-b border-orange-950/50 pb-2.5 mb-3">
                      <span className="text-xs bg-orange-500/20 text-[#FF9600] font-black px-2.5 py-0.5 rounded-full uppercase">Powers & Buffs</span>
                      <h3 className="font-display font-black text-sm text-[#FF9600]">ارتقای مهارت‌های جنگی اوم‌نام</h3>
                    </div>

                    <p className="text-xs text-gray-400 mb-3" dir="rtl">
                      با سکه‌هایی که از تکمیل درس‌های زباندو به دست می‌آورید، قدرت‌های جانبی را ارتقا دهید:
                    </p>

                    <div className="space-y-2.5">
                      {Object.entries(powers).map(([key, power]) => (
                        <div key={key} className="bg-black/40 p-3 rounded-2xl border border-orange-500/10 flex items-center justify-between gap-2 text-left">
                          <button
                            onClick={() => handleUpgradePower(key as keyof typeof powers)}
                            disabled={coins < power.cost || power.level >= power.max}
                            className="bg-[#FF9600] hover:bg-orange-600 disabled:bg-gray-800 border-b-4 border-orange-950 text-white font-black text-xs px-3 py-2 rounded-xl transition-all active:translate-y-0.5 active:border-b-0 cursor-pointer flex flex-col items-center"
                          >
                            <span className="font-mono text-[10px]">{power.cost} 🍬</span>
                            <span className="font-bold text-[9px] uppercase tracking-wider mt-0.5">Upgrade</span>
                          </button>
                          
                          <div className="text-right flex-1 pr-3">
                            <div className="flex items-center justify-between flex-row-reverse mb-1">
                              <span className="text-xs font-black text-orange-200">{power.name}</span>
                              <span className="text-[10px] text-orange-400 font-mono font-black">LVL {power.level}/{power.max}</span>
                            </div>
                            <p className="text-[9px] text-gray-400 mb-1.5" dir="rtl">{power.desc}</p>
                            <div className="flex justify-end gap-1">
                              {[1, 2, 3, 4, 5].map((lvl) => (
                                <div 
                                  key={lvl} 
                                  className={`w-4 h-2 rounded-full ${
                                    lvl <= power.level ? "bg-[#FF9600]" : "bg-gray-800"
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Economy brief */}
                    <div className="mt-4 pt-3 border-t border-orange-950/40 flex items-center justify-between text-xs">
                      <span className="font-mono text-orange-300 font-bold">{coins} Coins 🍬</span>
                      <span className="text-gray-400 font-bold">باقیمانده موجودی سکه شما</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Tablet Bottom Nav */}
              <div className="mt-4 bg-white border-4 border-gray-950 border-b-8 rounded-2xl p-3 flex items-center justify-between select-none text-gray-900">
                <Link
                  href="/skill-tree"
                  className="flex items-center gap-1.5 bg-[#F1F1F1] hover:bg-slate-200 border-2 border-b-4 border-gray-950 px-3.5 py-1.5 rounded-xl text-[10px] font-display font-black active:translate-y-[1px] active:border-b-2 transition-all uppercase cursor-pointer"
                >
                  <span>⬅️</span> Back Map
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400 font-black uppercase">Zabando Tablet Navigation</span>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 bg-[#1CB0F6] hover:bg-[#1899D6] border-2 border-b-4 border-gray-950 px-3.5 py-1.5 rounded-xl text-[10px] font-display font-black text-white active:translate-y-[1px] active:border-b-2 transition-all uppercase shadow-sm cursor-pointer"
                >
                  <span>🏠</span> Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 💻 ADMIN DASHBOARD PANEL VIEW */}
          {/* ========================================================= */}
          {currentMode === "admin" && (
            <div className="flex flex-col text-right justify-between flex-1">
              
              {/* TOP BAR */}
              <div className="flex items-center justify-between bg-[#211B2E] border-4 border-gray-950 p-4 rounded-2xl shadow-[3px_3px_0_rgba(0,0,0,1)] mb-6 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#122A1E] text-green-400 border border-green-500/30 px-3 py-1 rounded-xl text-xs font-black">
                    <GameIcon name="notif_success" size={14} />
                    <span>سرویس تکامل فعال است (Active)</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#2C1014] text-red-400 border border-red-500/30 px-3 py-1 rounded-xl text-xs font-black">
                    <GameIcon name="notif_warning" size={14} />
                    <span>نسخه ۱.۴-نهایی</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h2 className="font-display font-black text-sm text-purple-200">کنسول مدیریت پیشرفته زباندو</h2>
                    <span className="text-[10px] text-gray-400 font-bold font-mono">Evolution System Admin Workspace • Touch Tablet Ready</span>
                  </div>
                  <div className="w-10 h-10 bg-purple-500/30 rounded-xl border border-purple-500/30 flex items-center justify-center text-lg">
                    🛡️
                  </div>
                </div>
              </div>

              {/* DUAL PANELS LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
                
                {/* SIDEBAR NAVIGATION */}
                <div className="lg:col-span-3 bg-[#1C1726] border-4 border-gray-950 p-4 rounded-[28px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-2 select-none">
                  <span className="text-[9px] font-mono text-purple-400 font-black block text-right tracking-wider uppercase border-b border-purple-950 pb-2 mb-3">
                    SYSTEM CONTROL MODULES
                  </span>
                  
                  {[
                    { id: "stages", label: "مراحل تکامل (Stages)", icon: "🧬" },
                    { id: "powers", label: "تنظیم قدرت‌ها (Powers)", icon: "⚡" },
                    { id: "rewards", label: "جوایز و نشان‌ها (Rewards)", icon: "🏆" },
                    { id: "users", label: "پیشرفت کاربران (Users)", icon: "👥" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { playTapSound(); setAdminActiveTab(tab.id as any); }}
                      className={`w-full p-3 rounded-xl font-bold text-xs text-right flex items-center justify-between transition-all cursor-pointer ${
                        adminActiveTab === tab.id 
                          ? "bg-purple-600 text-white shadow-md border-b-4 border-purple-800" 
                          : "bg-black/20 text-gray-300 hover:bg-black/40"
                      }`}
                    >
                      <span className="font-mono text-xs">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}

                  <div className="pt-4 border-t border-purple-950/60 mt-4 text-right">
                    <span className="text-[8px] text-gray-500 font-bold block mb-1">شبیه‌ساز وضعیت کاربر</span>
                    <button 
                      onClick={resetEvolution}
                      className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl text-red-400 font-black text-[10px] uppercase cursor-pointer"
                    >
                      🔄 ریست تکامل زباندو کاربر
                    </button>
                  </div>
                </div>

                {/* MAIN PANEL CONTENT */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* TAB 1: STAGES */}
                  {adminActiveTab === "stages" && (
                    <div className="bg-[#211B2E] border-4 border-gray-950 p-5 rounded-[32px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Evolution Stages config
                        </span>
                        <h3 className="font-display font-black text-sm text-[#FFB703]">مدیریت مراحل رشد و تکامل اوم‌نام</h3>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed" dir="rtl">
                        در این بخش می‌توانید آستانه حد نصاب امتیاز (XP) مورد نیاز برای عبور کاربر از هر مرحله را تنظیم کرده و جوایز دوره‌ای را اضافه یا ویرایش کنید:
                      </p>

                      {/* TABLE OF STAGES */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-right text-xs">
                          <thead>
                            <tr className="border-b border-purple-950/60 text-purple-400 font-black">
                              <th className="py-2.5 px-3">مرحله (Stage)</th>
                              <th className="py-2.5 px-3 text-center">شناسه تکامل</th>
                              <th className="py-2.5 px-3 text-center">امتیاز مورد نیاز</th>
                              <th className="py-2.5 px-3 text-center">پاداش ویژه بازشدن</th>
                              <th className="py-2.5 px-3 text-center">وضعیت شبیه‌ساز</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-950/30 font-bold">
                            {adminStages.map((stage) => (
                              <tr 
                                key={stage.id} 
                                onClick={() => setSelectedAdminStage(stage.id)}
                                className={`hover:bg-purple-900/10 cursor-pointer transition-colors ${
                                  selectedAdminStage === stage.id ? "bg-purple-900/20 text-yellow-300" : "text-gray-200"
                                }`}
                              >
                                <td className="py-3 px-3">{stage.name}</td>
                                <td className="py-3 px-3 text-center font-mono text-purple-400">STG-00{stage.id}</td>
                                <td className="py-3 px-3 text-center font-mono">{stage.xpNeeded} XP</td>
                                <td className="py-3 px-3 text-center text-gray-300">{stage.reward}</td>
                                <td className="py-3 px-3 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                    stage.status === "completed" 
                                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                                      : stage.status === "active"
                                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse"
                                      : "bg-gray-800 text-gray-500 border border-gray-700"
                                  }`}>
                                    {stage.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* SELECTED STAGE SETTINGS CARD */}
                      {selectedAdminStage !== null && (
                        <div className="bg-black/30 border border-purple-950 p-4 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-purple-400">STAGE ID: {selectedAdminStage}</span>
                            <span className="font-black text-gray-200">ویرایش پارامترهای مرحله برگزیده</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-300">
                            <div className="space-y-1.5 text-right">
                              <label className="block text-gray-400">عنوان مرحله تکامل</label>
                              <input 
                                type="text"
                                value={adminStages.find(s => s.id === selectedAdminStage)?.name || ""}
                                onChange={(e) => {
                                  const text = e.target.value;
                                  setAdminStages(prev => prev.map(s => s.id === selectedAdminStage ? { ...s, name: text } : s));
                                }}
                                className="w-full bg-[#1C1726] border border-purple-950 rounded-xl px-3 py-2 outline-none text-white focus:border-purple-500 font-bold"
                              />
                            </div>

                            <div className="space-y-1.5 text-right">
                              <label className="block text-gray-400">امتیاز مورد نیاز (XP threshold)</label>
                              <input 
                                type="number"
                                value={adminStages.find(s => s.id === selectedAdminStage)?.xpNeeded || 0}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setAdminStages(prev => prev.map(s => s.id === selectedAdminStage ? { ...s, xpNeeded: val } : s));
                                }}
                                className="w-full bg-[#1C1726] border border-purple-950 rounded-xl px-3 py-2 outline-none text-white focus:border-purple-500 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TAB 2: POWERS */}
                  {adminActiveTab === "powers" && (
                    <div className="bg-[#211B2E] border-4 border-gray-950 p-5 rounded-[32px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
                        <span className="text-[9px] bg-orange-500/20 text-[#FF9600] font-black px-2.5 py-0.5 rounded-full uppercase">
                          Powers & multipliers config
                        </span>
                        <h3 className="font-display font-black text-sm text-[#FF9600]">پیکربندی ضرایب قدرت و محافظ‌های اوم‌نام</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(powers).map(([key, power]) => (
                          <div key={key} className="bg-black/30 border border-purple-950 p-4 rounded-2xl flex flex-col justify-between h-48 text-right">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono text-orange-400">MAX: {power.max}</span>
                              <h4 className="font-black text-xs text-orange-200">{power.name}</h4>
                            </div>

                            <p className="text-[10px] text-gray-400 leading-normal mt-2">
                              {power.desc}
                            </p>

                            <div className="space-y-2.5 mt-3">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-mono text-gray-400">{power.cost} 🍬</span>
                                <span className="text-gray-300">هزینه ارتقای سطح</span>
                              </div>
                              <input 
                                type="range"
                                min="50"
                                max="1000"
                                step="50"
                                value={power.cost}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setPowers(prev => ({
                                    ...prev,
                                    [key]: { ...prev[key as keyof typeof powers], cost: val }
                                  }));
                                }}
                                className="w-full accent-[#FF9600]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* TAB 3: REWARDS */}
                  {adminActiveTab === "rewards" && (
                    <div className="bg-[#211B2E] border-4 border-gray-950 p-5 rounded-[32px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 font-black px-2.5 py-0.5 rounded-full uppercase">
                          System Loot & Badges
                        </span>
                        <h3 className="font-display font-black text-sm text-purple-300">توزیع جوایز فصلی و مدال‌های حماسی</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-black/30 border border-purple-950 p-4 rounded-2xl space-y-3 text-right">
                          <span className="text-2xl">🏆</span>
                          <h4 className="font-black text-xs text-purple-200">پاداش‌های متصل به دگرگونی</h4>
                          <p className="text-[10px] text-gray-400 leading-relaxed">
                            در صورت رسیدن به تکامل نهایی پادشاهی، نشان سپر طلایی ویژه در جدول رده‌بندی زباندو کاربران فعال به عنوان مدال افتخار درج خواهد شد.
                          </p>
                        </div>

                        <div className="bg-black/30 border border-purple-950 p-4 rounded-2xl space-y-3 text-right">
                          <span className="text-2xl">🔥</span>
                          <h4 className="font-black text-xs text-purple-200">افزایش ضریب بوست موقت</h4>
                          <p className="text-[10px] text-gray-400 leading-relaxed">
                            کاربرانی که در سطح ۳ به بالا قرار می‌گیرند، ۳۵٪ امتیاز (XP) بیشتری در چالش‌های گفتاری شیراز به دست خواهند آورد.
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: USERS PROGRESS */}
                  {adminActiveTab === "users" && (
                    <div className="bg-[#211B2E] border-4 border-gray-950 p-5 rounded-[32px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 font-black px-2.5 py-0.5 rounded-full uppercase">
                          Analytics and Telemetry
                        </span>
                        <h3 className="font-display font-black text-sm text-purple-200">نمودار پیشرفت کاربران فعال سامانه</h3>
                      </div>

                      {/* Mock Chart Area */}
                      <div className="bg-black/40 border border-purple-950 p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                          <span className="text-[10px] text-purple-400">مجموع تکامل‌ها: ۲,۴۵۰ اوم‌نام پادشاه</span>
                          <span>آمار هفته جاری</span>
                        </div>
                        
                        {/* Bars representing weeks */}
                        <div className="flex items-end justify-between h-32 pt-4">
                          {[
                            { day: "شنبه", count: 40 },
                            { day: "یکشنبه", count: 65 },
                            { day: "دوشنبه", count: 90 },
                            { day: "سه‌شنبه", count: 120 },
                            { day: "چهارشنبه", count: 85 },
                            { day: "پنج‌شنبه", count: 145 },
                            { day: "جمعه", count: 210 }
                          ].map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group">
                              <div className="w-full max-w-[24px] bg-purple-950 h-full rounded-t-md relative flex items-end">
                                <motion.div 
                                  initial={{ height: 0 }}
                                  animate={{ height: `${(d.count / 210) * 100}%` }}
                                  transition={{ duration: 1, delay: i * 0.05 }}
                                  className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md hover:brightness-125"
                                />
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] bg-black px-1 rounded text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {d.count}
                                </span>
                              </div>
                              <span className="text-[9px] text-gray-400 font-black">{d.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ADMIN OPERATIONS LOGGER */}
                  <div className="bg-[#1C1726] border-4 border-gray-950 p-4.5 rounded-[24px] shadow-[3px_3px_0_rgba(0,0,0,1)] text-right space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold border-b border-purple-950 pb-2 mb-1.5">
                      <span>ZABANDO EVENT LOGGER</span>
                      <span>وقایع‌نگار امنیتی سیستم</span>
                    </div>

                    <div className="space-y-1.5 text-[10px] font-mono text-[#58CC02] h-20 overflow-y-auto scrollbar-none pr-1">
                      {adminLog.map((log, i) => (
                        <div key={i} className="flex gap-2 items-start flex-row-reverse">
                          <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Back links */}
              <div className="mt-8 pt-4 border-t-2 border-purple-950 flex flex-wrap items-center justify-between text-xs font-bold text-gray-400 select-none">
                <span>کنترل پنل ویژه مدیران زباندو • طراحی تبلت اولویت بالا</span>
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    داشبورد اصلی زباندو
                  </Link>
                  <span>•</span>
                  <Link href="/skill-tree" className="hover:text-white transition-colors">
                    نقشه راه مهارت‌ها
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* CELEBRATION OVERLAYS (SHARED OR MODE-SPECIFIC) */}
          {/* ========================================================= */}
          <AnimatePresence>
            {showEvolutionCelebration && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-center"
              >
                <motion.div 
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  className="bg-[#2E162D] border-4 border-[#FF66A1] p-8 rounded-[36px] max-w-sm space-y-5 shadow-2xl relative overflow-hidden"
                >
                  {/* Confetti effect simulation */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ff66a1_2px,transparent_1.5px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                  <div className="text-7xl animate-bounce">👑💚🍭</div>

                  <div className="space-y-1 text-center">
                    <h2 className="font-display font-black text-2xl text-yellow-300 uppercase tracking-wide">
                      Om Nom Evolved!
                    </h2>
                    <p className="font-display text-base font-black text-white" dir="rtl">
                      اوم‌نام به پادشاه تبدیل شد!
                    </p>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed max-w-xs mx-auto text-center" dir="rtl">
                    آفرین! با کوشش مستمر و حل تعارف‌های شیرازی، اوم‌نام را با موفقیت ارتقا دادید. او حالا پادشاه زباندو است!
                  </p>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowEvolutionCelebration(false)}
                      className="bg-[#58CC02] hover:bg-[#46A302] border-b-6 border-green-950 text-white font-display font-black text-xs uppercase p-3 rounded-xl cursor-pointer"
                    >
                      بستن و ادامه چالش‌ها CLOSE CELEBRATION
                    </button>
                    <button
                      onClick={resetEvolution}
                      className="text-gray-400 hover:text-white font-bold text-[10px] uppercase underline mt-2"
                    >
                      تلاش مجدد (شبیه‌سازی رشد دوباره)
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
