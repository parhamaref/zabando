"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  Flame, 
  Sparkles, 
  Sword, 
  Volume2, 
  Mic, 
  Check, 
  RefreshCw, 
  X, 
  HelpCircle,
  Play,
  Heart,
  ArrowRight,
  Shield,
  Trophy,
  AlertTriangle
} from "lucide-react";
import { GameIcon } from "../../../src/components/GameIcon";

// Static audio files are simulated with Web Audio Synthesis so it works 100% out of the box in the iframe!
function playTone(freq: number, type: OscillatorType, duration: number) {
  if (typeof window === "undefined" || !window.AudioContext) return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Smooth envelope
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

// Custom sound effects
const playSuccessSound = () => {
  playTone(523.25, "sine", 0.15); // C5
  setTimeout(() => playTone(659.25, "sine", 0.15), 100); // E5
  setTimeout(() => playTone(783.99, "sine", 0.3), 200); // G5
};

const playFailureSound = () => {
  playTone(220, "sawtooth", 0.2); // A3
  setTimeout(() => playTone(147, "sawtooth", 0.4), 150); // D3
};

const playAttackSound = () => {
  playTone(880, "triangle", 0.1); // A5
  setTimeout(() => playTone(440, "triangle", 0.15), 80); // A4
};

const playBossGrowlSound = () => {
  playTone(90, "sawtooth", 0.5); // Deep growl bass
};

export default function BossFightPage() {
  // Game States
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [currentStage, setCurrentStage] = useState(1); // 1, 2, 3
  const [gameState, setGameState] = useState<"intro" | "playing" | "victory" | "defeat">("intro");
  
  // Animation Triggers
  const [bossAnimationState, setBossAnimationState] = useState<"idle" | "shaking" | "growling">("idle");
  const [omNomMood, setOmNomMood] = useState<"ready" | "excited" | "happy" | "worried" | "dancing" | "sad">("ready");
  const [dialogueText, setDialogueText] = useState("سلام رفیق! من آماده‌ام که با Shadow Nom مبارزه کنیم. تو با یادگیری زبان بهم قدرت میدی! 🍬💚");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);
  const [shakePlayer, setShakePlayer] = useState(false);

  // Audio Playback simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Stage 1 options
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [stage1Submitted, setStage1Submitted] = useState(false);

  // Stage 3 cards reordering
  const initialCards = ["خیلی", "ممنون", "هستم"];
  const [cards, setCards] = useState<string[]>(["ممنون", "هستم", "خیلی"]);
  const [stage3Submitted, setStage3Submitted] = useState(false);

  // AI Generated Layout specification
  const [aiGeneratedUI, setAiGeneratedUI] = useState<any>(null);
  const [isGeneratingUI, setIsGeneratingUI] = useState(false);

  // Start the actual fight
  const startFight = () => {
    setGameState("playing");
    setBossHp(100);
    setPlayerHp(100);
    setCurrentStage(1);
    setOmNomMood("excited");
    setDialogueText("بیا از مرحله اول شروع کنیم! به این تعارف قشنگ ایرانی خوب گوش کن و گزینه‌ی درست رو برام پیدا کن. 🎧🍬");
    playSuccessSound();
  };

  // Growl effect
  const triggerBossGrowl = () => {
    setBossAnimationState("growling");
    playBossGrowlSound();
    setDialogueText("شدو نام داره غرغر می‌کنه! چنگال‌های عنکبوتیش رو به رخ می‌کشه. باید زودتر شکستش بدیم! 👹🔥");
    setTimeout(() => setBossAnimationState("idle"), 1200);
  };

  // Stage 1: Listening
  const playListeningAudio = () => {
    setIsPlayingAudio(true);
    playTone(392, "sine", 0.4); // G4
    setTimeout(() => playTone(440, "sine", 0.4), 250); // A4
    setTimeout(() => playTone(349.23, "sine", 0.5), 500); // F4
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1200);
  };

  const handleStage1Option = (index: number) => {
    if (stage1Submitted) return;
    setSelectedOption(index);
  };

  const submitStage1 = () => {
    if (selectedOption === null || stage1Submitted) return;
    setStage1Submitted(true);

    if (selectedOption === 0) {
      // Correct: "بفرمایید سر سفره" (Welcome to the table!)
      playAttackSound();
      setBossAnimationState("shaking");
      setBossHp((prev) => Math.max(0, prev - 35));
      setOmNomMood("happy");
      setDialogueText("آفرین قهرمان! جواب درست بود! شدو نام ضربه‌ی اول رو خورد. بریم سراغ گفتار! 💚🔥");
      playSuccessSound();
      setTimeout(() => {
        setBossAnimationState("idle");
      }, 1000);
    } else {
      // Incorrect
      playFailureSound();
      setShakePlayer(true);
      setPlayerHp((prev) => Math.max(0, prev - 25));
      setOmNomMood("worried");
      setDialogueText("وای! این جواب درست نبود. شدو نام بهمون آب‌نبات‌های بیخود پرتاب کرد! دوباره تلاش کن! 🥺💔");
      setTimeout(() => {
        setShakePlayer(false);
        setStage1Submitted(false);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const nextToStage2 = () => {
    setCurrentStage(2);
    setOmNomMood("ready");
    setDialogueText("حالا وقتشه صدامون رو رسا کنیم! دکمه میکروفون رو بزن و این جمله رو شمرده و با صدای بلند تکرار کن! 🎙️💚");
  };

  // Stage 2: Speaking
  const startRecording = () => {
    if (isRecording) return;
    setIsRecording(true);
    playTone(600, "sine", 0.1);
    
    // Simulate speech detection
    setTimeout(() => {
      setIsRecording(false);
      setRecordingSuccess(true);
      playAttackSound();
      setBossAnimationState("shaking");
      setBossHp((prev) => Math.max(0, prev - 35));
      setOmNomMood("excited");
      setDialogueText("صدات عالی بود! لهجه‌ات مثل یک بلبل شیرازی شیرین بود! شدو نام ضعیف‌تر شد! 🗣️✨");
      playSuccessSound();
      setTimeout(() => setBossAnimationState("idle"), 1000);
    }, 3000);
  };

  const nextToStage3 = () => {
    setCurrentStage(3);
    setOmNomMood("ready");
    setDialogueText("مرحله نهایی رسید! این واژه‌ها رو مرتب کن تا یک تشکر صمیمی بسازی و ضربه‌ی نهایی رو بزنی! 🦸‍♂️💥");
  };

  // Stage 3: Combo
  const moveCard = (index: number) => {
    if (stage3Submitted) return;
    const newCards = [...cards];
    // Simple cycle shift left
    const [removed] = newCards.splice(index, 1);
    newCards.push(removed);
    setCards(newCards);
    playTone(400, "sine", 0.05);
  };

  const submitStage3 = () => {
    if (stage3Submitted) return;
    setStage3Submitted(true);

    const isCorrect = cards[0] === "خیلی" && cards[1] === "ممنون" && cards[2] === "هستم";

    if (isCorrect) {
      playAttackSound();
      setBossAnimationState("shaking");
      setBossHp(0);
      setOmNomMood("dancing");
      setDialogueText("هورااااا! جمله‌ی طلایی رو مرتب کردی! شدو نام شکست خورد و به یک عنکبوت بی‌خطر مهربان تبدیل شد! 🎉💚🍭");
      playSuccessSound();
      setTimeout(() => {
        setGameState("victory");
      }, 2500);
    } else {
      playFailureSound();
      setShakePlayer(true);
      setPlayerHp((prev) => Math.max(0, prev - 30));
      setOmNomMood("worried");
      setDialogueText("اوپس! جمله‌ی چیده شده نامفهوم بود. شدو نام دوباره بهمون حمله کرد! دوباره تلاش کن! 😢");
      setTimeout(() => {
        setShakePlayer(false);
        setStage3Submitted(false);
      }, 1500);
    }
  };

  // Check health for loss
  useEffect(() => {
    if (playerHp <= 0) {
      setGameState("defeat");
      setOmNomMood("sad");
      setDialogueText("آخ جانم! قلب‌هامون تموم شد و شکست خوردیم. اما اشکالی نداره، با تمرین بیشتر قوی‌تر برمی‌گردیم! 💪💔");
      playFailureSound();
    }
  }, [playerHp]);

  // AI Prompt Call
  const generateAiBossStyle = async () => {
    setIsGeneratingUI(true);
    try {
      const response = await fetch("/api/gemini/generate-boss-fight-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenType: "Cinematic Spider Shadow Nom", mood: "Sparks, Fire and Epic Cartoon Sounds" })
      });
      const data = await response.json();
      if (data.success) {
        setAiGeneratedUI(data.parsed);
        setDialogueText("هورااا! جمینی ۳.۵ فلاش استایل این نبرد حماسی رو برای ما بازنویسی کرد! چقدر جذاب‌تر شد! 🤖🎨");
        playSuccessSound();
      }
    } catch (e) {
      console.error("AI Boss UI generation failed:", e);
    } finally {
      setIsGeneratingUI(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E0F1C] text-white p-4 md:p-8 flex flex-col gap-6 relative select-none overflow-x-hidden font-sans">
      
      {/* Cartoon Particle Spark Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* 1. CINEMATIC GRADIENT HEADER */}
      <div 
        className="relative bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#F77F00] border-4 border-gray-950 border-b-8 p-5 rounded-[28px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white"
      >
        <div className="absolute inset-0 bg-white/10 skew-y-1 pointer-events-none" />
        
        {/* Title */}
        <div className="flex items-center gap-3.5 z-10 text-center md:text-left">
          <motion.div 
            animate={{ 
              scale: bossAnimationState === "growling" ? [1, 1.2, 1] : [1, 1.05, 1],
              rotate: bossAnimationState === "growling" ? [0, -10, 10, 0] : 0
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center p-1 border-2 border-white/20"
          >
            <GameIcon name="profile_avatar" size={56} />
          </motion.div>
          <div>
            <h1 className="font-display font-black text-2xl uppercase tracking-wider text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              Boss Battle!
            </h1>
            <p className="font-display text-[15px] font-black text-amber-200 mt-0.5">
              نبرد با رئیس نهایی: شدو نام
            </p>
          </div>
        </div>

        {/* Level indicators */}
        <div className="flex flex-wrap gap-2.5 items-center justify-center z-10">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border-2 border-white/20 px-3 py-1.5 rounded-xl shadow-md">
            <GameIcon name="xp_orb" size={20} />
            <span className="font-mono font-black text-xs text-white">450 XP</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border-2 border-white/20 px-3 py-1.5 rounded-xl shadow-md">
            <GameIcon name="streak_flame" size={20} />
            <span className="font-mono font-black text-xs text-white">5 Days</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border-2 border-white/20 px-3 py-1.5 rounded-xl shadow-md">
            <GameIcon name="badge_medal" size={20} />
            <span className="font-mono font-black text-xs text-white">2 Badges</span>
          </div>
        </div>
      </div>

      {/* CORE SCREEN SWITCHES */}
      {gameState === "intro" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-[#2E162D] border-4 border-[#EF233C] border-b-8 p-8 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 mt-6"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-orange-500 animate-ping opacity-30" />
            <span className="text-7xl">👹</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-3xl text-[#FFB703] uppercase tracking-wide">
              Shadow Nom Appears!
            </h2>
            <p className="font-display text-lg font-black text-white" dir="rtl">
              رئیس نهایی: عنکبوت سایه
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-300 leading-relaxed max-w-md mx-auto" dir="rtl">
            این نبرد بزرگترین چالش شنیداری و گفتاری تو در زبان فارسی است! شدو نام آب‌نبات طلایی را دزدیده و تنها با پاسخ‌های صحیح زبان می‌توانیم آن را نجات دهیم!
          </p>

          {/* Rewards showcase */}
          <div className="flex justify-center gap-4 py-2">
            <div className="bg-black/20 border-2 border-amber-500/30 p-3 rounded-2xl flex flex-col items-center gap-1">
              <GameIcon name="xp_orb" size={32} />
              <span className="font-mono font-black text-xs text-yellow-400">+500 XP</span>
            </div>
            <div className="bg-black/20 border-2 border-amber-500/30 p-3 rounded-2xl flex flex-col items-center gap-1">
              <GameIcon name="streak_flame" size={32} />
              <span className="font-mono font-black text-xs text-orange-400">+10 Days</span>
            </div>
            <div className="bg-black/20 border-2 border-amber-500/30 p-3 rounded-2xl flex flex-col items-center gap-1">
              <GameIcon name="badge_medal" size={32} />
              <span className="font-mono font-black text-xs text-cyan-400">Golden Shield</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={startFight}
              className="w-full sm:w-auto bg-[#EF233C] hover:bg-[#D90429] border-b-8 border-red-950 font-display font-black text-white px-10 py-4.5 rounded-[20px] uppercase tracking-wider text-sm transition-all active:translate-y-1 active:border-b-2 shadow-lg cursor-pointer"
            >
              شروع نبرد نهایی! START BOSS FIGHT
            </button>
          </div>
        </motion.div>
      )}

      {gameState === "playing" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
          
          {/* LEFT COLUMN: ACTIVE CHALLENGES & STAGES */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* IN-GAME DIALOGUE BAR WITH OM NOM REACTIONS */}
            <div className="bg-[#2D4A22] border-4 border-[#58CC02] rounded-[24px] p-4.5 flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right">
              <div className="w-14 h-14 bg-white/10 border-2 border-[#58CC02]/30 rounded-2xl flex items-center justify-center p-1">
                <GameIcon name="profile_avatar" size={48} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] bg-[#58CC02]/20 text-[#58CC02] font-black px-2.5 py-0.5 rounded-full uppercase">Om Nom's Tactic</span>
                <p className="text-xs font-bold text-green-100 leading-relaxed mt-1" dir="rtl">
                  {dialogueText}
                </p>
              </div>
            </div>

            {/* BATTLE HEALTH BARS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* BOSS HEALTH BAR */}
              <motion.div 
                animate={bossAnimationState === "shaking" ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="bg-[#2C1014] border-4 border-[#EF233C] rounded-[24px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-black text-xs text-red-400">{bossHp}/100 HP</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full">Shadow Nom</span>
                    <GameIcon name="notif_warning" size={16} />
                  </div>
                </div>
                {/* Wavy Health Bar Container */}
                <div className="w-full bg-gray-950 border-3 border-white h-6 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    animate={{ width: `${bossHp}%` }}
                    className="h-full bg-gradient-to-r from-[#D90429] to-[#FF7A00] rounded-full"
                  />
                </div>
              </motion.div>

              {/* PLAYER HEALTH BAR */}
              <motion.div 
                animate={shakePlayer ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="bg-[#122A1E] border-4 border-[#58CC02] rounded-[24px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-black text-xs text-green-400">{playerHp}/100 HP</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">Om Nom (You)</span>
                    <GameIcon name="xp_orb" size={16} />
                  </div>
                </div>
                {/* Wavy Health Bar Container */}
                <div className="w-full bg-gray-950 border-3 border-white h-6 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    animate={{ width: `${playerHp}%` }}
                    className="h-full bg-gradient-to-r from-[#58CC02] to-[#B8FF4B] rounded-full"
                  />
                </div>
              </motion.div>

            </div>

            {/* STAGE CONTAINER WITH SMOOTH SLIDE */}
            <AnimatePresence mode="wait">
              
              {/* STAGE 1: LISTENING CHALLENGE */}
              {currentStage === 1 && (
                <motion.div
                  key="stage-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-[#2D2A1C] border-4 border-[#FFC542] rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#554E35] pb-3 mb-4 text-right">
                    <span className="text-[10px] bg-[#FFC542]/20 text-[#FFC542] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Stage 1 of 3
                    </span>
                    <h3 className="font-display font-black text-lg text-amber-300 flex items-center gap-1.5 justify-end">
                      Listening Challenge 🎧
                    </h3>
                  </div>

                  <div className="space-y-5 text-right">
                    <p className="text-sm font-bold text-gray-200" dir="rtl">
                      صدای پخش‌شده را با کلیک بر روی دکمه‌ی زیر گوش کن و گزینه‌ی تعارف مناسب را انتخاب کن:
                    </p>

                    {/* Audio Player Simulated Box */}
                    <div className="bg-black/30 border-2 border-[#FFC542]/40 rounded-2xl p-5 flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={playListeningAudio}
                        className="w-14 h-14 bg-[#FFC542] hover:bg-yellow-500 border-b-4 border-amber-700 text-gray-950 rounded-full flex items-center justify-center transition-all active:translate-y-1 active:border-b-0 cursor-pointer shadow-md"
                      >
                        {isPlayingAudio ? (
                          <RefreshCw className="w-6 h-6 animate-spin" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                      <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                        {isPlayingAudio ? "در حال پخش فایل صوتی..." : "پخش تلفظ تعارف شیرین فارسی"}
                      </span>
                    </div>

                    {/* Options (Ta'arof quiz) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { textEn: "Welcome, sit at our table!", textFa: "بفرمایید سر سفره" },
                        { textEn: "I am your humble servant!", textFa: "نوکرتم به مولا" },
                        { textEn: "No problem at all!", textFa: "حرفش رو هم نزن" }
                      ].map((opt, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                          <button
                            key={idx}
                            disabled={stage1Submitted}
                            onClick={() => handleStage1Option(idx)}
                            className={`p-4 rounded-2xl border-2 border-b-6 border-gray-950 transition-all text-right flex flex-col justify-between h-24 cursor-pointer ${
                              isSelected 
                                ? "bg-[#FFC542] text-gray-950 border-amber-600 shadow-[3px_3px_0_rgba(0,0,0,1)] translate-y-0.5 border-b-2"
                                : "bg-[#1E1C15] text-white hover:bg-[#2A271D] border-gray-950"
                            }`}
                          >
                            <span className="text-xs font-bold font-mono text-amber-500 uppercase leading-none">Option {idx + 1}</span>
                            <span className="text-sm font-black text-right w-full mt-1" dir="rtl">{opt.textFa}</span>
                            <span className="text-[10px] text-gray-400 text-right w-full mt-1 font-bold">{opt.textEn}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex justify-end">
                      {!stage1Submitted ? (
                        <button
                          disabled={selectedOption === null}
                          onClick={submitStage1}
                          className="bg-[#58CC02] hover:bg-[#46A302] disabled:bg-gray-700 border-b-6 border-green-800 text-white font-display font-black text-xs uppercase px-8 py-3.5 rounded-xl cursor-pointer"
                        >
                          ثبت پاسخ و شلیک! SUBMIT ATTACK
                        </button>
                      ) : (
                        <button
                          onClick={nextToStage2}
                          className="bg-[#1CB0F6] hover:bg-[#1899D6] border-b-6 border-sky-800 text-white font-display font-black text-xs uppercase px-8 py-3.5 rounded-xl flex items-center gap-1 cursor-pointer animate-bounce"
                        >
                          مرحله بعدی NEXT STAGE <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STAGE 2: SPEAKING CHALLENGE */}
              {currentStage === 2 && (
                <motion.div
                  key="stage-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-[#192D21] border-4 border-[#58CC02] rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#294E34] pb-3 mb-4 text-right">
                    <span className="text-[10px] bg-[#58CC02]/20 text-[#58CC02] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Stage 2 of 3
                    </span>
                    <h3 className="font-display font-black text-lg text-emerald-400 flex items-center gap-1.5 justify-end">
                      Speaking Challenge 🎙️
                    </h3>
                  </div>

                  <div className="space-y-5 text-right">
                    <p className="text-sm font-bold text-gray-200" dir="rtl">
                      جمله‌ی تعارفی زیر را با صدای بلند و روان تکرار کن تا ضبط و ارزیابی شود:
                    </p>

                    <div className="bg-[#1E2E24]/60 border border-[#58CC02]/30 rounded-2xl p-6 text-center space-y-2">
                      <h4 className="font-display font-black text-2xl text-emerald-300">"خیلی خوش آمدید، قدمتان روی چشم!"</h4>
                      <p className="text-xs text-gray-400 font-bold">"You are very welcome, your step on our eyes!" (Standard Iranian Hospitality Form)</p>
                    </div>

                    {/* Microphone interactive layout */}
                    <div className="flex flex-col items-center justify-center py-4 gap-4">
                      <motion.button
                        animate={isRecording ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        onClick={startRecording}
                        disabled={recordingSuccess}
                        className={`w-20 h-20 rounded-full border-b-6 flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                          recordingSuccess
                            ? "bg-gray-600 border-gray-700 cursor-not-allowed text-green-300"
                            : isRecording
                            ? "bg-[#EF233C] border-red-950 text-white animate-pulse"
                            : "bg-[#1CB0F6] border-sky-800 text-white hover:bg-[#1899D6]"
                        }`}
                      >
                        {recordingSuccess ? (
                          <Check className="w-9 h-9 stroke-[3]" />
                        ) : (
                          <Mic className="w-8 h-8" />
                        )}
                      </motion.button>
                      
                      <span className="text-xs font-black uppercase text-center">
                        {isRecording ? "در حال ضبط... جمله را بخوانید 🔴" : recordingSuccess ? "تلفظ شما ۱۰۰٪ صحیح بود! عالی!" : "دکمه میکروفون را بزنید و شروع به خواندن کنید"}
                      </span>

                      {/* Cool wave animation during recording */}
                      {isRecording && (
                        <div className="flex items-center gap-1.5 h-6">
                          {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                            <motion.div
                              key={bar}
                              animate={{ height: ["4px", "24px", "4px"] }}
                              transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                              className="w-1.5 bg-emerald-400 rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="pt-2 flex justify-end">
                      {recordingSuccess && (
                        <button
                          onClick={nextToStage3}
                          className="bg-[#1CB0F6] hover:bg-[#1899D6] border-b-6 border-sky-800 text-white font-display font-black text-xs uppercase px-8 py-3.5 rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          نبرد نهایی COMBO CHALLENGE <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STAGE 3: COMBO DRAG-N-DROP CHALLENGE */}
              {currentStage === 3 && (
                <motion.div
                  key="stage-3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-[#182631] border-4 border-[#1CB0F6] rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#294154] pb-3 mb-4 text-right">
                    <span className="text-[10px] bg-[#1CB0F6]/20 text-[#1CB0F6] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Stage 3 of 3
                    </span>
                    <h3 className="font-display font-black text-lg text-sky-400 flex items-center gap-1.5 justify-end">
                      Combo Challenge 💥
                    </h3>
                  </div>

                  <div className="space-y-5 text-right">
                    <p className="text-sm font-bold text-gray-200" dir="rtl">
                      کارت‌ها را با کلیک مرتب کن تا جمله‌ی "خیلی ممنون هستم" (Thank you very much) درست شود:
                    </p>

                    {/* Cards grid */}
                    <div className="flex flex-row-reverse items-center justify-center gap-3 py-4">
                      {cards.map((card, idx) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => moveCard(idx)}
                          key={idx}
                          disabled={stage3Submitted}
                          className="bg-[#1E0F1C] border-2 border-[#1CB0F6]/50 hover:border-[#1CB0F6] p-4.5 rounded-2xl min-w-[90px] text-center font-display font-black text-lg text-white shadow-md cursor-pointer transition-all border-b-6 border-b-sky-800"
                        >
                          {card}
                        </motion.button>
                      ))}
                    </div>

                    <div className="text-center font-mono text-[10px] text-gray-400 uppercase">
                      روی هر کارت بزن تا جایش را با کارت سمت راست عوض کند
                    </div>

                    {/* Action */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={submitStage3}
                        disabled={stage3Submitted}
                        className="bg-[#EF233C] hover:bg-[#D90429] disabled:bg-gray-700 border-b-6 border-red-950 text-white font-display font-black text-xs uppercase px-8 py-3.5 rounded-xl cursor-pointer"
                      >
                        شلیک نهایی به شدو نام! FINAL ATTACK
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: BOSS INTRO CARD & ACTIVE BOSS AVATAR */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* BOSS INTRO BENTO CARD */}
            <div className="bg-[#3D0C11] border-4 border-[#EF233C] border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-right relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 right-0 w-full h-8 bg-white/5 skew-y-3 pointer-events-none" />
              
              {/* Animated Spider Boss Avatar */}
              <motion.div 
                animate={{ 
                  y: bossAnimationState === "growling" ? [0, -10, 10, -5, 0] : [0, -12, 0],
                  scale: bossAnimationState === "shaking" ? [1, 0.9, 1.1, 1] : 1
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 relative flex items-center justify-center bg-black/40 rounded-full border-4 border-dashed border-[#EF233C]/40 p-4 shadow-inner mt-4"
              >
                {/* Wobbly Spider legs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-2 bg-red-800/40 rounded-full rotate-12 animate-pulse" />
                  <div className="w-48 h-2 bg-red-800/40 rounded-full -rotate-12 animate-pulse" />
                  <div className="w-48 h-2 bg-red-800/40 rounded-full rotate-45 animate-pulse" />
                  <div className="w-48 h-2 bg-red-800/40 rounded-full -rotate-45 animate-pulse" />
                </div>
                
                {/* Custom giant cartoon skull/spider face */}
                <div className="relative text-6xl select-none z-10 flex flex-col items-center">
                  <span className="animate-pulse">🕷️👑</span>
                </div>
              </motion.div>

              <div className="mt-4 text-center">
                <h3 className="font-display font-black text-2xl text-[#EF233C] uppercase tracking-wide">
                  Shadow Nom
                </h3>
                <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Persian Spider King
                </span>
              </div>

              <p className="text-xs font-semibold text-gray-300 text-center leading-relaxed mt-3 max-w-sm" dir="rtl">
                شدو نام تشنه‌ی تعارف و مغلوبِ لحن زیبای فارسی شماست! با صدای بلند و تمرین‌های دقیق تسلیمش کنید!
              </p>

              <div className="w-full mt-4 pt-3 border-t border-[#EF233C]/20 flex items-center justify-between">
                <button
                  onClick={triggerBossGrowl}
                  className="bg-[#EF233C] hover:bg-red-600 border-b-4 border-red-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white cursor-pointer active:translate-y-0.5 active:border-b-0"
                >
                  👹 غرش رئیس (Growl)
                </button>
                <div className="flex items-center gap-1 bg-black/30 px-3 py-1.5 rounded-xl border border-[#EF233C]/30 text-[10px] font-bold">
                  <span>سطح سختی: متوسط (A2-B1)</span>
                </div>
              </div>

            </div>

            {/* GEMINI AI STYLE DESIGNS ADVISOR PLAYGROUND */}
            <div className="bg-[#FFFDF9] border-4 border-[#FFC542] border-b-8 rounded-[32px] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-gray-900">
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#FFE3B3] pb-3 mb-4 text-right">
                <span className="text-[9px] bg-[#FFF5E0] text-[#FF8A00] border border-[#FFE3B3] px-2.5 py-0.5 rounded-full font-bold">BOSS_FIGHT_STYLING</span>
                <h3 className="font-display font-black text-xs text-[#3C3C3C] flex items-center gap-1.5 justify-end">
                  <Sparkles className="w-4 h-4 text-[#FF8A00]" /> دستیار سبک بصری جمینی
                </h3>
              </div>

              <p className="text-xs text-gray-600 font-bold leading-relaxed mb-4 text-right" dir="rtl">
                بر روی دکمه زیر کلیک کن تا جمینی ۳.۵ فلاش، بر اساس پرامپت مخصوص، سبک‌های هیجان‌انگیز، انیمیشن‌های شعله، فونت‌های کارتونی و چیدمان مبارزه را بازنویسی کند:
              </p>

              <button
                onClick={generateAiBossStyle}
                disabled={isGeneratingUI}
                className="w-full flex items-center justify-center gap-2 bg-[#FFC542] hover:bg-[#F0B429] disabled:bg-gray-200 border-2 border-b-6 border-gray-950 text-gray-900 font-display font-black text-xs uppercase px-4 py-3.5 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer"
              >
                {isGeneratingUI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>تحلیل و بازطراحی میدان نبرد...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-gray-950" />
                    <span>بازطراحی سینمایی نبرد با جمینی</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {aiGeneratedUI && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="mt-5 bg-amber-50/90 border-2 border-dashed border-[#FFC542] rounded-2xl p-4 space-y-4"
                  >
                    <div className="text-right space-y-3">
                      <div>
                        <span className="text-[9px] bg-red-200 border border-red-300 text-red-800 px-2 py-0.5 rounded-full font-black uppercase">Visual Style Spec</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.VisualStyle}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-orange-200 border border-orange-300 text-orange-800 px-2 py-0.5 rounded-full font-black uppercase">Header Flames Spec</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Header}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-[#E8F8FF] border border-sky-300 text-sky-800 px-2 py-0.5 rounded-full font-black uppercase">Battle Stages Spec</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.Stages}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-pink-200 border border-pink-300 text-pink-800 px-2 py-0.5 rounded-full font-black uppercase">Health Bars Spec</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">Boss: {aiGeneratedUI.BossHealth} | Player: {aiGeneratedUI.PlayerHealth}</p>
                      </div>
                      <hr className="border-amber-200" />
                      <div>
                        <span className="text-[9px] bg-emerald-200 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-full font-black uppercase">Om Nom Reactions Spec</span>
                        <p className="text-xs font-bold text-gray-700 mt-1">{aiGeneratedUI.OmNomIntegration}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      )}

      {/* 5. VICTORY SCREEN OVERLAY */}
      {gameState === "victory" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-gradient-to-b from-[#1E2E1E] to-[#122A1E] border-4 border-[#58CC02] border-b-8 p-8 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 mt-6"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-full bg-yellow-400 animate-ping opacity-25" />
            <span className="text-8xl animate-bounce inline-block">🎉🏆🍭</span>
          </div>

          <div className="space-y-1">
            <h2 className="font-display font-black text-3xl text-yellow-400 uppercase tracking-wide">
              You Defeated Shadow Nom!
            </h2>
            <p className="font-display text-xl font-black text-white" dir="rtl">
              تو برنده شدی!
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-200 leading-relaxed max-w-sm mx-auto" dir="rtl">
            با قدرتِ یادگیری واژگان و گوی‌های شنیداری، شدو نام را شکست دادی! او آب‌نبات طلایی را به اوم‌نام بازگرداند!
          </p>

          {/* Victory stats block */}
          <div className="bg-black/30 border-2 border-[#58CC02]/30 p-4 rounded-2xl max-w-xs mx-auto flex items-center justify-around">
            <div className="flex flex-col items-center">
              <GameIcon name="xp_orb" size={32} />
              <span className="font-mono font-black text-xs text-yellow-400">+500 XP</span>
            </div>
            <div className="w-0.5 h-12 bg-gray-800" />
            <div className="flex flex-col items-center">
              <GameIcon name="streak_flame" size={32} />
              <span className="font-mono font-black text-xs text-orange-400">+10 Days</span>
            </div>
            <div className="w-0.5 h-12 bg-gray-800" />
            <div className="flex flex-col items-center">
              <GameIcon name="badge_medal" size={32} />
              <span className="font-mono font-black text-xs text-cyan-400">Medal</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/skill-tree"
              className="bg-[#58CC02] hover:bg-[#46A302] border-b-6 border-green-800 font-display font-black text-white px-8 py-4 rounded-xl uppercase text-xs cursor-pointer shadow-md text-center active:translate-y-0.5 active:border-b-2"
            >
              بازگشت به نقشه راه BACK TO ROAD MAP
            </Link>
          </div>
        </motion.div>
      )}

      {gameState === "defeat" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-[#2E1014] border-4 border-[#EF233C] border-b-8 p-8 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 mt-6"
        >
          <span className="text-8xl inline-block animate-pulse">😢💔</span>

          <div className="space-y-1">
            <h2 className="font-display font-black text-3xl text-red-400 uppercase tracking-wide">
              Om Nom was Defeated!
            </h2>
            <p className="font-display text-xl font-black text-white" dir="rtl">
              دوباره امتحان کن!
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-300 leading-relaxed max-w-sm mx-auto" dir="rtl">
            شدو نام قوی‌تر بود، اما هر شکستی فرصتی برای قوی‌تر شدن است! دوباره تلاش کن تا با هم پیروز شویم!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startFight}
              className="bg-[#EF233C] hover:bg-[#D90429] border-b-6 border-red-950 font-display font-black text-white px-8 py-4 rounded-xl uppercase text-xs cursor-pointer shadow-md text-center active:translate-y-0.5 active:border-b-2"
            >
              تلاش دوباره TRY AGAIN 💪
            </button>
            
            <Link
              href="/skill-tree"
              className="bg-[#F1F1F1] hover:bg-slate-200 border-b-6 border-gray-400 text-gray-900 font-display font-black px-8 py-4 rounded-xl uppercase text-xs cursor-pointer shadow-md text-center active:translate-y-0.5 active:border-b-2"
            >
              بازگشت به نقشه راه
            </Link>
          </div>
        </motion.div>
      )}

      {/* 6. LESSON SCREEN FOOTER NAVIGATION BAR */}
      <div className="bg-white border-4 border-gray-950 border-b-8 rounded-[24px] p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-cover mt-auto text-gray-900">
        <Link
          href="/skill-tree"
          className="flex items-center gap-2 bg-[#F1F1F1] hover:bg-slate-200 border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black active:translate-y-[1px] active:border-b-2 transition-all uppercase cursor-pointer"
        >
          <span>⬅️</span> Back Map
        </Link>

        <span className="text-[10px] font-mono text-gray-400 font-bold hidden sm:inline uppercase">
          Zabando Cinematic Boss Fight UI • V3.5-flash
        </span>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-[#1CB0F6] hover:bg-[#1899D6] border-2 border-b-4 border-gray-950 px-4 py-2 rounded-xl text-xs font-display font-black text-white active:translate-y-[1px] active:border-b-2 transition-all uppercase shadow-sm cursor-pointer"
        >
          <span>🏠</span> Home Dashboard ➔
        </Link>
      </div>

    </div>
  );
}
