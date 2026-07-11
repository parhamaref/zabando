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
  ArrowRight,
  ShoppingBag,
  Coins,
  Smile,
  Gift
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

const playCoinSound = () => {
  playTone(987.77, "sine", 0.08); // B5
  setTimeout(() => playTone(1318.51, "sine", 0.2), 60); // E6
};

const playTapSound = () => {
  playTone(600, "sine", 0.05);
};

const playErrorSound = () => {
  playTone(180, "sawtooth", 0.25);
};

interface ShopItem {
  id: string;
  name: string;
  category: "skins" | "powers" | "collectibles" | "seasonal";
  price: number;
  icon: string;
  desc: string;
  purchased: boolean;
  color: string; // Tailwinds custom color borders
}

export default function ShopPage() {
  // Device Preview Mode: "responsive" | "mobile" | "tablet" | "admin"
  const [previewMode, setPreviewMode] = useState<"responsive" | "mobile" | "tablet" | "admin">("responsive");
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

  // Coins economy
  const [coins, setCoins] = useState(250);
  const [badgesCount, setBadgesCount] = useState(12);

  // Shop categories
  const [activeCategory, setActiveCategory] = useState<"skins" | "powers" | "collectibles" | "seasonal">("skins");

  // Default Catalog
  const [items, setItems] = useState<ShopItem[]>([
    { id: "candy-nom", name: "پوسته اوم‌نام شکلی", category: "skins", price: 120, icon: "🍬", desc: "پوسته کارتونی آب‌نباتی برای تمرین درس‌ها", purchased: false, color: "#FFE863" },
    { id: "disco-nom", name: "اوم‌نام ستاره دیسکو", category: "skins", price: 180, icon: "🪩", desc: "لباس پر زرق و برق طلایی برای رقص تکامل", purchased: false, color: "#FFE863" },
    { id: "ninja-nom", name: "پوسته نینجای سریع", category: "skins", price: 150, icon: "🥷", desc: "پوسته مشکی اسرارآمیز و جذاب", purchased: false, color: "#FFE863" },
    
    { id: "double-xp", name: "ضریب امتیاز دوبل (XP)", category: "powers", price: 80, icon: "⚡", desc: "دو برابر کردن تمام امتیازها به مدت ۳ ساعت", purchased: false, color: "#FFE863" },
    { id: "shield-bubble", name: "حباب محافظ زنجیره", category: "powers", price: 100, icon: "🫧", desc: "محافظ زنجیره روزانه زباندو در تعطیلات", purchased: false, color: "#FFE863" },
    
    { id: "omnom-plush", name: "عروسک مخملی اوم‌نام", category: "collectibles", price: 300, icon: "🧸", desc: "یک آیتم فیزیکی نمادین در پروفایل کاربری", purchased: false, color: "#FFE863" },
    { id: "candy-pot", name: "کوزه آب‌نبات جادویی", category: "collectibles", price: 200, icon: "🍯", desc: "رها کردن پاداش‌های روزانه کوچک", purchased: false, color: "#FFE863" },
    
    { id: "autumn-leaf", name: "نشان برگ پاییزی", category: "seasonal", price: 90, icon: "🍁", desc: "نشان ویژه برای فصل پاییز زباندو", purchased: false, color: "#FFE863" },
    { id: "santa-hat", name: "کلاه کریسمس کارتونی", category: "seasonal", price: 110, icon: "🎅", desc: "آیتم ویژه زمستانی برای اوم‌نام قهرمان", purchased: false, color: "#FFE863" }
  ]);

  // Selected item details for Tablet Mode (right side)
  const [selectedItemId, setSelectedItemId] = useState<string>("candy-nom");

  // Admin section state
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<"skins" | "powers" | "collectibles" | "seasonal">("skins");
  const [newItemPrice, setNewItemPrice] = useState(100);
  const [newItemIcon, setNewItemIcon] = useState("🏷️");
  const [adminActiveTab, setAdminActiveTab] = useState<"items" | "orders" | "analytics">("items");

  // Actions
  const handlePurchase = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (item.purchased) {
      playErrorSound();
      alert("این آیتم قبلاً خریداری شده است!");
      return;
    }

    if (coins < item.price) {
      playErrorSound();
      alert("شما سکه کافی برای خرید این آیتم ندارید! روی دکمه دریافت سکه رایگان کلیک کنید.");
      return;
    }

    setCoins(prev => prev - item.price);
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, purchased: true } : i));
    playCoinSound();
  };

  const getFreeCoins = () => {
    setCoins(prev => prev + 150);
    playCoinSound();
  };

  const addNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const addedItem: ShopItem = {
      id: "custom-" + Date.now(),
      name: newItemName,
      category: newItemCategory,
      price: newItemPrice,
      icon: newItemIcon,
      desc: `آیتم تعریف شده توسط مدیر سامانه`,
      purchased: false,
      color: "#FFE863"
    };

    setItems(prev => [addedItem, ...prev]);
    setNewItemName("");
    playCoinSound();
    alert("آیتم جدید با موفقیت به فروشگاه زباندو اضافه شد!");
  };

  return (
    <div className="min-h-screen bg-[#110D1A] text-white p-3 md:p-6 font-sans relative overflow-x-hidden selection:bg-[#FF9600] selection:text-white">
      
      {/* Background decoration dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      {/* TOP DEVICEMULTI-PREVIEW BAR */}
      <div className="max-w-7xl mx-auto mb-6 bg-gradient-to-r from-[#211B2E] via-[#2F2445] to-[#211B2E] border-4 border-gray-950 p-4 rounded-3xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-4 z-50 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 border border-amber-400/30 rounded-2xl">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="font-display font-black text-sm uppercase tracking-wider text-amber-200">
              Om Nom Shop Simulator
            </h2>
            <p className="text-[10px] text-gray-400 font-bold">
              تغییر حالت پیش‌نمایش دستگاه برای ارزیابی رسپانسیو فروشگاه کودک
            </p>
          </div>
        </div>

        {/* Action button for free coins to test purchase easily */}
        <button 
          onClick={getFreeCoins}
          className="bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-950 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white cursor-pointer active:translate-y-0.5 active:border-b-0 flex items-center gap-1.5"
        >
          <Coins className="w-4 h-4" />
          <span>کسب ۱۵۰ سکه 🍬</span>
        </button>

        {/* Mode switcher buttons */}
        <div className="flex bg-black/40 border-2 border-purple-950 p-1 rounded-2xl">
          <button
            onClick={() => { playTapSound(); setPreviewMode("responsive"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "responsive" ? "bg-amber-500 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Responsive ({actualMode})</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("mobile"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "mobile" ? "bg-amber-500 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 Mobile</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("tablet"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "tablet" ? "bg-amber-500 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <TabletIcon className="w-3.5 h-3.5" />
            <span>📟 Tablet</span>
          </button>
          <button
            onClick={() => { playTapSound(); setPreviewMode("admin"); }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === "admin" ? "bg-amber-500 text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>💻 Admin</span>
          </button>
        </div>
      </div>

      {/* RENDER CHOSEN DEVICE CANVAS */}
      <div className="max-w-7xl mx-auto flex justify-center items-start min-h-[750px]">
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
          {/* 📱 MOBILE SHOP VIEW */}
          {/* ========================================================= */}
          {currentMode === "mobile" && (
            <div className="flex-1 flex flex-col text-right justify-between p-4 bg-[#140F21]">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-purple-950/60 pb-3 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-xl border border-purple-500/20 text-xs">
                    <GameIcon name="badge_medal" size={14} />
                    <span className="font-mono font-black text-amber-400">{badgesCount}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-xl border border-purple-500/20 text-xs">
                    <GameIcon name="xp_orb" size={14} />
                    <span className="font-mono font-black text-emerald-400">{coins} 🍬</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <h1 className="font-display font-black text-sm text-amber-400">فروشگاه Om Nom</h1>
                    <span className="text-[8px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded-full uppercase">Zabando Shop</span>
                  </div>
                  <div className="w-8 h-8 bg-amber-500/20 rounded-xl border border-amber-500/30 flex items-center justify-center text-lg">
                    🏪
                  </div>
                </div>
              </div>

              {/* Main Content Scroll Area */}
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-none pr-0.5">
                
                {/* Special Offer Banner */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="bg-[#2D1621] border-4 border-[#FF66A1] border-b-8 p-3 rounded-2xl text-right flex items-center justify-between gap-3 shadow-[3px_3px_0_rgba(0,0,0,1)] relative"
                >
                  <div className="text-3xl">🎁</div>
                  <div className="flex-1 text-right">
                    <h3 className="font-display font-black text-xs text-[#FF66A1]">پیشنهاد ویژه امروز زباندو!</h3>
                    <p className="text-[9px] text-gray-200 mt-1" dir="rtl">
                      پوسته جادویی آب‌نباتی با تخفیف ۵۰٪ سکه‌ها! همین حالا تهیه کنید.
                    </p>
                  </div>
                </motion.div>

                {/* Category tabs */}
                <div className="grid grid-cols-4 gap-1 select-none">
                  {[
                    { id: "skins", label: "اسکین‌ها" },
                    { id: "powers", label: "قدرت‌ها" },
                    { id: "collectibles", label: "کلکسیون" },
                    { id: "seasonal", label: "فصلی" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { playTapSound(); setActiveCategory(cat.id as any); }}
                      className={`py-1.5 rounded-lg text-[10px] font-black text-center transition-all cursor-pointer ${
                        activeCategory === cat.id 
                          ? "bg-amber-500 text-white border-b-2 border-amber-950" 
                          : "bg-black/20 text-gray-400"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Grid of items */}
                <div className="grid grid-cols-2 gap-3">
                  {items.filter(i => i.category === activeCategory).map((item) => (
                    <div 
                      key={item.id}
                      className="bg-[#2C2A18] border-4 border-[#FFD500] border-b-8 p-3 rounded-[24px] text-right shadow-[3px_3px_0_rgba(0,0,0,1)] flex flex-col justify-between items-center h-[175px]"
                    >
                      <span className="text-4xl my-1 animate-pulse">{item.icon}</span>
                      
                      <div className="text-center w-full">
                        <h4 className="font-black text-[10px] text-amber-200 truncate">{item.name}</h4>
                        <span className="text-[8px] text-gray-400 block mt-0.5">{item.price} سکه</span>
                      </div>

                      <button
                        onClick={() => handlePurchase(item.id)}
                        className={`w-full mt-2 py-1.5 rounded-xl text-center font-display font-black text-[10px] transition-all cursor-pointer ${
                          item.purchased 
                            ? "bg-gray-800 text-gray-500 border-none cursor-not-allowed" 
                            : "bg-[#FFD500] text-gray-900 border-b-4 border-amber-950 hover:bg-amber-400 active:translate-y-0.5 active:border-b-0"
                        }`}
                      >
                        {item.purchased ? "خریده شد" : "خرید ITEM"}
                      </button>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Nav Bar */}
              <div className="mt-4 bg-white border-2 border-gray-950 border-b-4 rounded-xl p-2 flex items-center justify-around select-none text-gray-900">
                <Link href="/dashboard" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_home" size={24} />
                </Link>
                <Link href="/evolution" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_back" size={24} />
                </Link>
                <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-white font-mono font-black text-xs shadow-inner">
                  🛒
                </div>
                <Link href="/skill-tree" className="p-1 hover:bg-purple-100 rounded-lg">
                  <GameIcon name="ui_next" size={24} />
                </Link>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 📟 TABLET SHOP VIEW */}
          {/* ========================================================= */}
          {currentMode === "tablet" && (
            <div className="flex-1 flex flex-col text-right justify-between p-6 bg-[#161125]">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b-4 border-dashed border-purple-950/80 pb-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-2xl border border-purple-500/20 text-xs">
                    <GameIcon name="badge_medal" size={16} />
                    <span className="font-mono font-black text-amber-400">12 Badges</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-2xl border border-purple-500/20 text-xs">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono font-black text-amber-400">{coins} Coins 🍬</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h1 className="font-display font-black text-lg text-amber-400">فروشگاه فانتزی زباندو</h1>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase">Zabando Cartoon Shop • Tablet Mode</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-500/20 rounded-2xl border-2 border-amber-500/30 flex items-center justify-center text-xl">
                    🛍️
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-y-auto scrollbar-none pr-0.5 py-2">
                
                {/* LEFT COLUMN: Categories tabs & grid lists */}
                <div className="md:col-span-7 space-y-4">
                  {/* Category select buttons */}
                  <div className="grid grid-cols-4 gap-2 select-none">
                    {[
                      { id: "skins", label: "اسکین‌ها", icon: "🎨" },
                      { id: "powers", label: "قدرت‌ها", icon: "⚡" },
                      { id: "collectibles", label: "کلکسیون", icon: "🧸" },
                      { id: "seasonal", label: "فصلی", icon: "🍁" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { playTapSound(); setActiveCategory(cat.id as any); }}
                        className={`p-3 rounded-2xl text-xs font-black text-center flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                          activeCategory === cat.id 
                            ? "bg-amber-500 border-amber-950 text-white shadow-md border-b-4" 
                            : "bg-black/20 text-gray-400 border-purple-950 hover:bg-black/40"
                        }`}
                      >
                        <span className="text-lg mb-1">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* List of Item Cards */}
                  <div className="grid grid-cols-2 gap-4 h-[350px] overflow-y-auto scrollbar-none">
                    {items.filter(i => i.category === activeCategory).map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => { playTapSound(); setSelectedItemId(item.id); }}
                        className={`border-4 border-b-8 p-4 rounded-[28px] text-right shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-between items-center h-[180px] cursor-pointer transition-all ${
                          selectedItemId === item.id
                            ? "bg-[#333118] border-[#FFD500] scale-98"
                            : "bg-[#2C2A18] border-[#A38900] hover:border-[#FFD500]"
                        }`}
                      >
                        <span className="text-5xl animate-bounce my-1">{item.icon}</span>
                        <div className="text-center w-full">
                          <h4 className="font-black text-xs text-amber-200 truncate">{item.name}</h4>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{item.price} Coins</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: Selected Item details */}
                <div className="md:col-span-5 space-y-4">
                  {(() => {
                    const selectedItem = items.find(i => i.id === selectedItemId);
                    if (!selectedItem) return <div className="text-center text-gray-500 py-10">یک آیتم را انتخاب کنید.</div>;

                    return (
                      <div className="bg-[#2E1B15] border-4 border-[#FF9600] border-b-8 p-5 rounded-[32px] text-right shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-between h-[390px]">
                        <div className="border-b border-orange-950/50 pb-3 mb-4 flex justify-between items-center">
                          <span className="text-[10px] bg-orange-500/20 text-[#FF9600] font-black px-2.5 py-1 rounded-full uppercase">ITEM BRIEF</span>
                          <h3 className="font-display font-black text-sm text-[#FF9600]">شناسه جزئیات آیتم</h3>
                        </div>

                        <div className="flex flex-col items-center space-y-3 flex-1 justify-center">
                          <span className="text-7xl animate-pulse">{selectedItem.icon}</span>
                          <h3 className="font-display font-black text-lg text-amber-200">{selectedItem.name}</h3>
                          <p className="text-xs text-gray-300 max-w-xs text-center leading-relaxed" dir="rtl">
                            {selectedItem.desc}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-orange-950/40 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-orange-300 font-bold">{selectedItem.price} Coins 🍬</span>
                            <span className="text-gray-400 font-bold">بهای نهایی خرید</span>
                          </div>

                          <button
                            onClick={() => handlePurchase(selectedItem.id)}
                            disabled={selectedItem.purchased}
                            className={`w-full py-3 rounded-2xl text-center font-display font-black text-sm uppercase tracking-wider text-white transition-all active:translate-y-0.5 active:border-b-0 cursor-pointer ${
                              selectedItem.purchased
                                ? "bg-gray-800 text-gray-500 border-none cursor-not-allowed"
                                : "bg-[#FF9600] hover:bg-orange-600 border-b-6 border-orange-950"
                            }`}
                          >
                            {selectedItem.purchased ? "این محصول قبلاً خریده شده" : "تایید نهایی خرید محصول"}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>

              {/* Bottom Nav Bar */}
              <div className="mt-4 bg-white border-4 border-gray-950 border-b-8 rounded-2xl p-3 flex items-center justify-between select-none text-gray-900">
                <Link
                  href="/evolution"
                  className="flex items-center gap-1.5 bg-[#F1F1F1] hover:bg-slate-200 border-2 border-b-4 border-gray-950 px-3.5 py-1.5 rounded-xl text-[10px] font-display font-black active:translate-y-[1px] active:border-b-2 transition-all uppercase cursor-pointer"
                >
                  <span>🧬</span> Evolution Panel
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400 font-black uppercase">Zabando Touch Shop Navigation</span>
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
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
          {/* 💻 ADMIN SHOP BOARD */}
          {/* ========================================================= */}
          {currentMode === "admin" && (
            <div className="flex flex-col text-right justify-between flex-1">
              
              {/* Top Bar info */}
              <div className="flex items-center justify-between bg-[#211B2E] border-4 border-gray-950 p-4 rounded-2xl shadow-[3px_3px_0_rgba(0,0,0,1)] mb-6 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#122A1E] text-green-400 border border-green-500/30 px-3 py-1 rounded-xl text-xs font-black">
                    <span>درگاه پرداخت صوری: متصل (Active)</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#2C1014] text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-black">
                    <span>فروشگاه فعال</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h2 className="font-display font-black text-sm text-amber-400">کنسول توزیع کالا و اسکین زباندو</h2>
                    <span className="text-[10px] text-gray-400 font-bold font-mono">Store Inventory & Pricing Manager • Touch Screen Ready</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl border border-amber-500/30 flex items-center justify-center text-lg">
                    🎛️
                  </div>
                </div>
              </div>

              {/* Admin Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
                
                {/* Left controls panel */}
                <div className="lg:col-span-4 bg-[#1C1726] border-4 border-gray-950 p-4 rounded-[28px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                  <span className="text-[9px] font-mono text-amber-400 font-black block text-right tracking-wider uppercase border-b border-purple-950 pb-2 mb-1">
                    NEW SHOP ITEM ENTRY
                  </span>

                  <h3 className="font-display font-black text-xs text-gray-200">افزودن آیتم یا اسکین جدید به کاتالوگ</h3>

                  <form onSubmit={addNewItem} className="space-y-3.5 text-xs font-bold text-gray-300">
                    <div className="space-y-1 text-right">
                      <label className="block text-gray-400">نام آیتم فانتزی</label>
                      <input 
                        type="text"
                        required
                        placeholder="مثال: کلاه شاهین شیراز"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="w-full bg-black/40 border border-purple-950 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1 text-right">
                        <label className="block text-gray-400">بها (سکه)</label>
                        <input 
                          type="number"
                          required
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(Number(e.target.value))}
                          className="w-full bg-black/40 border border-purple-950 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div className="space-y-1 text-right">
                        <label className="block text-gray-400">ایموجی/آیکون</label>
                        <input 
                          type="text"
                          required
                          value={newItemIcon}
                          onChange={(e) => setNewItemIcon(e.target.value)}
                          className="w-full bg-black/40 border border-purple-950 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 text-center text-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-right">
                      <label className="block text-gray-400">دسته محصول</label>
                      <select 
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value as any)}
                        className="w-full bg-[#1C1726] border border-purple-950 p-2.5 rounded-xl text-white outline-none"
                      >
                        <option value="skins">اسکین‌ها (Skins)</option>
                        <option value="powers">قدرت‌ها (Powers)</option>
                        <option value="collectibles">کلکسیون (Collectibles)</option>
                        <option value="seasonal">آیتم فصلی (Seasonal)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-950 p-2.5 rounded-xl text-center text-white font-black uppercase text-xs tracking-wider transition-all active:translate-y-0.5 active:border-b-0 cursor-pointer mt-2"
                    >
                      ➕ درج محصول در ویترین فروشگاه
                    </button>
                  </form>
                </div>

                {/* Right Lists Table */}
                <div className="lg:col-span-8 bg-[#211B2E] border-4 border-gray-950 p-5 rounded-[32px] shadow-[3px_3px_0_rgba(0,0,0,1)] space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Catalog Database Grid
                    </span>
                    <h3 className="font-display font-black text-sm text-amber-400">کاتالوگ فعال محصولات فروشگاه زباندو</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="border-b border-purple-950/60 text-amber-300 font-black">
                          <th className="py-2.5 px-3">تصویر</th>
                          <th className="py-2.5 px-3">نام محصول</th>
                          <th className="py-2.5 px-3 text-center">دسته محصول</th>
                          <th className="py-2.5 px-3 text-center">قیمت (سکه)</th>
                          <th className="py-2.5 px-3 text-center">وضعیت خرید</th>
                          <th className="py-2.5 px-3 text-center">اقدام</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-950/30 font-bold">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-purple-900/10 transition-colors text-gray-200">
                            <td className="py-3 px-3 text-lg">{item.icon}</td>
                            <td className="py-3 px-3">{item.name}</td>
                            <td className="py-3 px-3 text-center font-mono text-purple-400 uppercase text-[10px]">{item.category}</td>
                            <td className="py-3 px-3 text-center font-mono text-amber-400">{item.price} 🍬</td>
                            <td className="py-3 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                item.purchased 
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                                  : "bg-gray-800 text-gray-500 border border-gray-700"
                              }`}>
                                {item.purchased ? "Purchased" : "In Stock"}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => {
                                  playTapSound();
                                  setItems(prev => prev.filter(i => i.id !== item.id));
                                }}
                                className="text-red-400 hover:text-red-200 font-bold text-[10px] uppercase cursor-pointer"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* analytics mockup */}
                  <div className="bg-black/40 border border-purple-950 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 font-black block">SALES AND CONVERSIONS ANALYTICS</span>
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 flex-row-reverse">
                      <span>مجموع فروش اسکین‌های فانتزی: ۱,۸۵۰ سکه</span>
                      <span>نرخ خرید روزانه: ۲۴٪</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Back links */}
              <div className="mt-8 pt-4 border-t-2 border-purple-950 flex flex-wrap items-center justify-between text-xs font-bold text-gray-400 select-none">
                <span>کنترل پنل ویترین کالا زباندو • طراحی تبلت اولویت بالا</span>
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    داشبورد اصلی زباندو
                  </Link>
                  <span>•</span>
                  <Link href="/evolution" className="hover:text-white transition-colors">
                    پیشرفت تکامل اوم‌نام
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
