"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Bell, 
  Trash2, 
  Check, 
  CheckCheck, 
  Sparkles, 
  Settings, 
  Send, 
  AlertCircle, 
  RefreshCw,
  Award,
  Zap,
  Flame,
  Crown,
  Info
} from "lucide-react";

interface Notification {
  id: string;
  userId: string;
  type: "xp" | "streak" | "badge" | "league" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

export default function NotificationCenterPage() {
  const [userId, setUserId] = useState("user_test_01");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "xp" | "streak" | "badge" | "league" | "system">("all");
  
  // Custom Direct Notification States
  const [directType, setDirectType] = useState<"xp" | "streak" | "badge" | "league" | "system">("xp");
  const [directTitle, setDirectTitle] = useState("");
  const [directMsg, setDirectMsg] = useState("");
  const [formError, setFormError] = useState("");

  // Event Rule Simulation States
  const [simXp, setSimXp] = useState(60);
  const [simStreak, setSimStreak] = useState(10);
  const [simBadge, setSimBadge] = useState("شوالیه طلایی 🛡️");
  const [simLeague, setSimLeague] = useState("یاقوت سرخ (Ruby)");

  // Live Toast State
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message: string; type: string }>>([]);

  // Load notifications from server
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/notifications?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error("Failed to load notifications", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Setup simple polling to simulate real-time updates from background events
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // Helper to push a temporary success toast
  const addToast = (title: string, message: string, type: string) => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Mark single as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true })
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        addToast("وضعیت خوانده شده", "نوتیفیکیشن با موفقیت به عنوان خوانده شده علامت‌گذاری شد.", "success");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete single notification
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        addToast("حذف شد", "پیام با موفقیت حذف گردید.", "info");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    try {
      const res = await fetch(`/api/notifications/read-all`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        addToast("همه خوانده شد", "تمام اعلان‌ها به وضعیت خوانده شده تغییر یافتند.", "success");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Send Direct custom notification
  const handleSendDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directTitle.trim() || !directMsg.trim()) {
      setFormError("پر کردن عنوان و متن الزامی است.");
      return;
    }
    setFormError("");
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: directType,
          title: directTitle,
          message: directMsg,
          metadata: { isDirect: true }
        })
      });
      if (res.ok) {
        const newNotif = await res.json();
        setNotifications((prev) => [newNotif, ...prev]);
        addToast("اعلان مستقیم ارسال شد!", directTitle, "success");
        setDirectTitle("");
        setDirectMsg("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Simulate an event pattern matching the rule engine triggers!
  const triggerSimulationEvent = async (triggerName: string, eventData: any) => {
    try {
      // 1. Get the notification rules that match
      const rulesRes = await fetch("/api/rules?type=notification");
      if (!rulesRes.ok) return;
      const rules = await rulesRes.json();

      const matchedRules = rules.filter((r: any) => r.trigger === triggerName && r.is_active !== false);
      let triggeredAny = false;

      for (const rule of matchedRules) {
        let isMatch = true;
        const condition = rule.condition || {};

        for (const key of Object.keys(condition)) {
          if (key.endsWith("_gte")) {
            const fieldName = key.replace("_gte", "");
            const val = eventData[fieldName];
            if (val === undefined || typeof val !== "number" || val < condition[key]) {
              isMatch = false;
              break;
            }
          } else {
            if (eventData[key] !== condition[key]) {
              isMatch = false;
              break;
            }
          }
        }

        if (isMatch && rule.action === "sendNotification") {
          triggeredAny = true;
          const params = rule.params || {};
          
          // Add notification to persistent list
          const res = await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              type: params.type || "system",
              title: params.title || "نوتیفیکیشن قانون",
              message: params.message || "",
              metadata: {
                ruleId: rule.id,
                triggeredByEvent: triggerName,
                ...eventData
              }
            })
          });

          if (res.ok) {
            const fresh = await res.json();
            setNotifications((prev) => [fresh, ...prev]);
            addToast(`شلیک قانون: ${rule.name || rule.id}`, params.title, "success");
          }
        }
      }

      if (!triggeredAny) {
        addToast("رویداد منتشر شد", `رویداد '${triggerName}' ارسال گردید ولی هیچ قانون فعالی بر روی شرایط تعریف شده مچ نشد.`, "info");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCategoryStyles = (type: string) => {
    switch (type) {
      case "xp":
        return {
          icon: <Zap className="w-5 h-5 text-amber-500" />,
          bgColor: "bg-amber-50 border-amber-200",
          badgeColor: "bg-amber-100 text-amber-800"
        };
      case "streak":
        return {
          icon: <Flame className="w-5 h-5 text-orange-500 animate-pulse" />,
          bgColor: "bg-orange-50 border-orange-200",
          badgeColor: "bg-orange-100 text-orange-800"
        };
      case "badge":
        return {
          icon: <Award className="w-5 h-5 text-indigo-500" />,
          bgColor: "bg-indigo-50 border-indigo-200",
          badgeColor: "bg-indigo-100 text-indigo-800"
        };
      case "league":
        return {
          icon: <Crown className="w-5 h-5 text-rose-500" />,
          bgColor: "bg-rose-50 border-rose-200",
          badgeColor: "bg-rose-100 text-rose-800"
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-[#3C3C3C]" />,
          bgColor: "bg-gray-50 border-gray-200",
          badgeColor: "bg-gray-100 text-gray-800"
        };
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.type === activeTab
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#3C3C3C] pb-24 font-sans" dir="rtl">
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -100, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white border-2 border-b-6 border-[#3C3C3C] p-4 rounded-2xl shadow-xl flex gap-3 pointer-events-auto select-none"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E5F9E5] flex items-center justify-center border border-[#58CC02]">
                <Sparkles className="w-4 h-4 text-[#58CC02]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-[#3C3C3C] text-right">{toast.title}</h4>
                <p className="text-[10px] font-bold text-gray-500 mt-0.5 text-right">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Header */}
      <div className="bg-white border-b-2 border-[#E5E5E5] px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/gamification">
              <button className="flex items-center gap-1.5 text-xs font-black text-[#58CC02] hover:text-[#46A302] bg-[#E5F9E5] border-2 border-transparent hover:border-[#58CC02] px-4 py-2.5 rounded-xl transition-all">
                <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
                کنسول گیمیفیکیشن
              </button>
            </Link>
            <div className="h-6 w-0.5 bg-[#E5E5E5]" />
            <div>
              <h1 className="font-display font-black text-lg text-[#3C3C3C] flex items-center gap-2">
                مرکز مدیریت اعلان‌ها (Notification Engine)
              </h1>
              <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">
                سیستم اطلاع‌رسانی مبتنی بر رویداد و قوانین پویا (Enterprise Rule-Based Engine)
              </p>
            </div>
          </div>

          {/* User & Live Badge */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <div className="bg-gray-100 hover:bg-gray-200 border-2 border-[#E5E5E5] p-3 rounded-xl transition-all relative">
                <Bell className="w-5 h-5 text-[#4B5563]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            <div className="text-left font-sans">
              <div className="text-[10px] font-black text-gray-400">کاربر فعلی</div>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-lg px-2 py-1 text-[#3C3C3C] focus:outline-none"
              >
                <option value="user_test_01">پرham عارف (user_test_01)</option>
                <option value="user_test_02">سارا علوی (user_test_02)</option>
                <option value="user_test_03">نوید احمدی (user_test_03)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT COLUMN: Event Dispatcher & Direct Sender (Simulation Console) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section 1: Event-Driven Triggers */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-4">
            <div className="pb-3 border-b border-[#E5E5E5]">
              <span className="text-[9px] font-black text-[#58CC02] uppercase tracking-wider bg-[#E5F9E5] px-2.5 py-1 rounded-full">
                EVENT-DRIVEN RULE MATCHING
              </span>
              <h2 className="font-display font-black text-md text-[#3C3C3C] mt-2">
                شبیه‌ساز هوشمند رویدادها
              </h2>
              <p className="text-[11px] font-bold text-gray-500 mt-1">
                یک رویداد با ویژگی‌های زیر شلیک کنید تا قوانین نوتیفیکیشن‌ها از دیتابیس بر روی آن ارزیابی و اجرا شوند.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              
              {/* Event 1: XP Updated */}
              <div className="p-3 border-2 border-[#E5E5E5] rounded-2xl bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#3C3C3C] flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" /> رویداد تغییر XP روزانه
                  </span>
                  <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                    xp.updated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-500 whitespace-nowrap">میزان XP امروز:</label>
                  <input
                    type="number"
                    value={simXp}
                    onChange={(e) => setSimXp(Number(e.target.value))}
                    className="w-full text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-1.5 text-center"
                  />
                </div>
                <button
                  onClick={() => triggerSimulationEvent("xp.updated", { userId, dailyXp: simXp })}
                  className="w-full bg-white hover:bg-amber-50 border-2 border-[#E5E5E5] hover:border-amber-400 text-xs font-black py-2 rounded-xl text-[#3C3C3C] active:translate-y-0.5 transition-all"
                >
                  شلیک رویداد XP 🚀
                </button>
              </div>

              {/* Event 2: Streak Milestone */}
              <div className="p-3 border-2 border-[#E5E5E5] rounded-2xl bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#3C3C3C] flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" /> رویداد ارتقای زنجیره (Streak)
                  </span>
                  <span className="text-[9px] font-mono bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                    streak.updated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-500 whitespace-nowrap">طول زنجیره روزانه:</label>
                  <input
                    type="number"
                    value={simStreak}
                    onChange={(e) => setSimStreak(Number(e.target.value))}
                    className="w-full text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-1.5 text-center"
                  />
                </div>
                <button
                  onClick={() => triggerSimulationEvent("streak.updated", { userId, streak: simStreak })}
                  className="w-full bg-white hover:bg-orange-50 border-2 border-[#E5E5E5] hover:border-orange-400 text-xs font-black py-2 rounded-xl text-[#3C3C3C] active:translate-y-0.5 transition-all"
                >
                  شلیک رویداد Streak 🔥
                </button>
              </div>

              {/* Event 3: Badge Awarded */}
              <div className="p-3 border-2 border-[#E5E5E5] rounded-2xl bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#3C3C3C] flex items-center gap-1">
                    <Award className="w-4 h-4 text-indigo-500" /> رویداد دریافت نشان (Badge)
                  </span>
                  <span className="text-[9px] font-mono bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                    badge.awarded
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-500 whitespace-nowrap">نام مدال کسب‌شده:</label>
                  <input
                    type="text"
                    value={simBadge}
                    onChange={(e) => setSimBadge(e.target.value)}
                    className="w-full text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-1.5 text-center"
                  />
                </div>
                <button
                  onClick={() => triggerSimulationEvent("badge.awarded", { userId, badgeName: simBadge })}
                  className="w-full bg-white hover:bg-indigo-50 border-2 border-[#E5E5E5] hover:border-indigo-400 text-xs font-black py-2 rounded-xl text-[#3C3C3C] active:translate-y-0.5 transition-all"
                >
                  شلیک رویداد نشان جدید 🏆
                </button>
              </div>

              {/* Event 4: League Promotion */}
              <div className="p-3 border-2 border-[#E5E5E5] rounded-2xl bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#3C3C3C] flex items-center gap-1">
                    <Crown className="w-4 h-4 text-rose-500" /> رویداد صعود در لیگ (League)
                  </span>
                  <span className="text-[9px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                    league.ranked
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-500 whitespace-nowrap">لیگ مقصد:</label>
                  <input
                    type="text"
                    value={simLeague}
                    onChange={(e) => setSimLeague(e.target.value)}
                    className="w-full text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-1.5 text-center"
                  />
                </div>
                <button
                  onClick={() => triggerSimulationEvent("league.ranked", { userId, leagueName: simLeague, rank: 1 })}
                  className="w-full bg-white hover:bg-rose-50 border-2 border-[#E5E5E5] hover:border-rose-400 text-xs font-black py-2 rounded-xl text-[#3C3C3C] active:translate-y-0.5 transition-all"
                >
                  شلیک رویداد لیگ 👑
                </button>
              </div>

            </div>
          </div>

          {/* Section 2: Direct Notification Sender */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-4">
            <div className="pb-3 border-b border-[#E5E5E5]">
              <h2 className="font-display font-black text-sm text-[#3C3C3C] uppercase tracking-wider flex items-center gap-1">
                <Send className="w-4 h-4 text-[#58CC02]" /> ارسال اعلان مستقیم (Push simulation)
              </h2>
              <p className="text-[11px] font-bold text-gray-400">
                بدون واسطه و دور زدن موتور قوانین، یک نوتیفیکیشن اختصاصی تولید و شلیک کنید.
              </p>
            </div>

            <form onSubmit={handleSendDirect} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">نوع پیام / دسته‌بندی</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["xp", "streak", "badge", "league", "system"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDirectType(t)}
                      className={`py-1 px-1 text-[9px] font-black rounded-lg border-2 uppercase tracking-wider transition-all ${
                        directType === t
                          ? "bg-[#3C3C3C] text-white border-[#3C3C3C]"
                          : "bg-white text-gray-500 border-[#E5E5E5] hover:bg-gray-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">عنوان پیام</label>
                <input
                  type="text"
                  placeholder="مثال: شتاب عالی در آخر هفته! 🔥"
                  value={directTitle}
                  onChange={(e) => setDirectTitle(e.target.value)}
                  className="w-full text-xs font-black bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-2 text-[#3C3C3C] focus:outline-none focus:border-[#58CC02]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">متن پیام اطلاع‌رسانی</label>
                <textarea
                  placeholder="مثال: روزهای پایانی هفته بیشترین زمان برای ارتقای زنجیره روزانه توست، فراموش نکنی!"
                  rows={2}
                  value={directMsg}
                  onChange={(e) => setDirectMsg(e.target.value)}
                  className="w-full text-xs font-bold bg-white border-2 border-[#E5E5E5] rounded-xl px-3 py-2 text-[#3C3C3C] focus:outline-none focus:border-[#58CC02]"
                />
              </div>

              {formError && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
              >
                ارسال نوتیفیکیشن به کاربر <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* LEFT COLUMN: Main Notification Center Grid & Logs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Notification Actions Toolbar */}
          <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Tab Filters */}
            <div className="flex flex-wrap gap-1.5">
              {(["all", "xp", "streak", "badge", "league", "system"] as const).map((tab) => {
                const labelMap = {
                  all: "همه اعلان‌ها",
                  xp: "⚡ امتیازها",
                  streak: "🔥 زنجیره‌ها",
                  badge: "🏆 نشان‌ها",
                  league: "👑 لیگ‌ها",
                  system: "⚙️ سیستم"
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-3.5 text-xs font-black rounded-xl border-2 transition-all ${
                      activeTab === tab
                        ? "bg-[#58CC02] border-transparent text-white shadow-sm"
                        : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-gray-50"
                    }`}
                  >
                    {labelMap[tab]}
                  </button>
                );
              })}
            </div>

            {/* Global Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleMarkAllRead}
                disabled={notifications.length === 0}
                className="flex items-center gap-1.5 text-[11px] font-black text-[#58CC02] bg-[#E5F9E5] hover:bg-[#D1F2D1] px-3 py-2 rounded-xl border-2 border-transparent hover:border-[#58CC02] disabled:opacity-50 transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" /> خواندن همه
              </button>
              <button
                onClick={fetchNotifications}
                className="p-2 hover:bg-gray-100 rounded-xl border-2 border-[#E5E5E5] text-[#3C3C3C] transition-colors"
                title="بارگذاری مجدد اعلان‌ها"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Notifications List Container */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 min-h-[500px]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5] mb-6">
              <h3 className="font-display font-black text-md text-[#3C3C3C] flex items-center gap-2">
                صندوق پیام‌ها ({filteredNotifications.length})
                {unreadCount > 0 && (
                  <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold">
                    {unreadCount} پیام خوانده نشده
                  </span>
                )}
              </h3>
              
              <Link href="/admin/rules?type=notification">
                <button className="flex items-center gap-1 text-[11px] font-black text-[#4B5563] bg-gray-50 hover:bg-gray-100 border-2 border-[#E5E5E5] px-3.5 py-2 rounded-xl transition-all">
                  <Settings className="w-3.5 h-3.5" />
                  ویرایش قوانین اعلان‌ها
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="py-24 text-center">
                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto" />
                <p className="text-xs font-black text-gray-400 mt-3">در حال بارگذاری اعلان‌های زنده...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Bell className="w-8 h-8" />
                </div>
                <div className="max-w-xs mx-auto">
                  <h4 className="font-black text-sm text-[#3C3C3C]">صندوق پیام‌های شما خالی است!</h4>
                  <p className="text-xs font-bold text-gray-400 mt-1">
                    با استفاده از کنسول شبیه‌ساز رویداد در سمت راست، یک رویداد شلیک کنید یا اعلان مستقیم بفرستید!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {filteredNotifications.map((n) => {
                    const styles = getCategoryStyles(n.type);
                    return (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className={`p-4 border-2 rounded-2xl transition-all relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                          !n.isRead 
                            ? "bg-white border-[#3C3C3C] border-b-4 shadow-sm" 
                            : "bg-gray-50/50 border-[#E5E5E5] opacity-75 hover:opacity-100"
                        }`}
                      >
                        {/* Status Glow for unread */}
                        {!n.isRead && (
                          <span className="absolute top-4 right-4 sm:static w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-ping" />
                        )}

                        <div className="flex gap-3.5 items-start flex-1 min-w-0">
                          {/* Icon representation */}
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 ${styles.bgColor} flex-shrink-0`}>
                            {styles.icon}
                          </div>

                          <div className="space-y-1 flex-1 min-w-0 text-right">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-display font-black text-sm text-[#3C3C3C]">
                                {n.title}
                              </h4>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${styles.badgeColor}`}>
                                {n.type}
                              </span>
                              {n.metadata?.ruleId && (
                                <span className="text-[8px] font-mono font-bold bg-[#F3F4F6] text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                                  قانون: {n.metadata.ruleId}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-gray-500 leading-relaxed">
                              {n.message}
                            </p>
                            <div className="text-[9px] font-bold text-gray-400">
                              {new Date(n.createdAt).toLocaleTimeString("fa-IR")} - {new Date(n.createdAt).toLocaleDateString("fa-IR")}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {!n.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(n.id)}
                              className="flex items-center gap-1 text-[10px] font-black text-[#58CC02] bg-[#E5F9E5] hover:bg-[#D1F2D1] border-2 border-transparent hover:border-[#58CC02] px-3 py-1.5 rounded-xl transition-all"
                              title="خوانده شده"
                            >
                              <Check className="w-3.5 h-3.5" /> خواندم
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(n.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                            title="حذف اعلان"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Quick Informative Section */}
          <div className="bg-[#E5F9E5] border-2 border-[#58CC02] rounded-3xl p-6 flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-[#58CC02] flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#58CC02]" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-[#3C3C3C]">موتور پردازش قوانین کاملاً داینامیک است!</h4>
              <p className="text-xs font-bold text-[#46A302] leading-relaxed mt-1">
                بدون این که نیازی به تغییر کدهای فرانت‌اند یا دیپلوی مجدد سرور زاباندو باشد، می‌توانید همین حالا به بخش ویرایش قوانین بروید و متن پیام، مقدار شرط تحریک (مثل تغییر XP از ۵۰ به ۱۰۰) یا آیکون‌ها را ویرایش کنید تا تغییرات را به‌صورت آنی و زنده در اینجا تست نمایید.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
