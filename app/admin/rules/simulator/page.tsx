"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { GameIcon } from "@/src/components/GameIcon";
import { 
  ArrowLeft, 
  Play, 
  Flame, 
  Zap, 
  Award, 
  Crown, 
  Settings, 
  Terminal, 
  Sliders, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw,
  Cpu,
  Eye,
  CheckCircle,
  XCircle,
  HelpCircle,
  Info,
  Bell
} from "lucide-react";

interface RuleSimulationResult {
  ruleId: string;
  action: string;
  params: Record<string, any>;
  wouldExecute: boolean;
}

export default function RuleSimulatorPage() {
  const [trigger, setTrigger] = useState("exercise.completed");
  const [eventJson, setEventJson] = useState(`{
  "userId": "user_test_01",
  "isCorrect": true,
  "difficulty": 4,
  "streak": 5,
  "dailyXp": 45
}`);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<{
    results: RuleSimulationResult[];
    executed?: boolean;
    isReal?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Toast notifications state
  const [toast, setToast] = useState<{ title: string; message: string; type: "success" | "info" | "error" } | null>(null);

  const showToast = (title: string, message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Pre-fill payload helper variables based on trigger selection to make testing breeze
  useEffect(() => {
    try {
      const current = JSON.parse(eventJson);
      let updated = { ...current };

      if (trigger === "exercise.completed") {
        updated = {
          userId: current.userId || "user_test_01",
          isCorrect: current.isCorrect ?? true,
          difficulty: current.difficulty ?? 4
        };
      } else if (trigger === "xp.updated") {
        updated = {
          userId: current.userId || "user_test_01",
          dailyXp: current.dailyXp ?? 55
        };
      } else if (trigger === "streak.updated") {
        updated = {
          userId: current.userId || "user_test_01",
          streak: current.streak ?? 12
        };
      } else if (trigger === "badge.awarded") {
        updated = {
          userId: current.userId || "user_test_01",
          badgeName: current.badgeName || "شوالیه طلایی 🛡️"
        };
      } else if (trigger === "league.ranked") {
        updated = {
          userId: current.userId || "user_test_01",
          leagueName: current.leagueName || "Ruby League",
          rank: current.rank ?? 1
        };
      }

      setEventJson(JSON.stringify(updated, null, 2));
      setJsonError(null);
    } catch (e) {
      // ignore parsing errors while switching tabs
    }
  }, [trigger]);

  const handleJsonChange = (val: string) => {
    setEventJson(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const validateJson = (val: string) => {
    try {
      JSON.parse(val);
      setJsonError(null);
      return true;
    } catch (e: any) {
      setJsonError(e.message);
      return false;
    }
  };

  const runDry = async () => {
    if (!validateJson(eventJson)) {
      showToast("خطای فرمت JSON", "فرمت داده ورودی معتبر نیست. لطفاً ساختار را اصلاح کنید.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/rules/simulator/dry-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trigger, event: JSON.parse(eventJson) }),
      });
      if (res.ok) {
        const data = await res.json();
        setSimulationResult({ results: data, isReal: false });
        showToast("شبیه‌سازی Dry-Run موفق", "شرایط با موفقیت ارزیابی شدند بدون ایجاد تغییر در دیتابیس.", "success");
      } else {
        const err = await res.json();
        showToast("خطای سرور", err.error || "خطایی در پردازش اطلاعات رخ داده است.", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("خطا در شبکه", "امکان برقراری ارتباط با سرویس شبیه‌ساز وجود ندارد.", "error");
    } finally {
      setLoading(false);
    }
  };

  const runReal = async () => {
    if (!validateJson(eventJson)) {
      showToast("خطای فرمت JSON", "فرمت داده ورودی معتبر نیست. لطفاً ساختار را اصلاح کنید.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/rules/simulator/real-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trigger, event: JSON.parse(eventJson) }),
      });
      if (res.ok) {
        const data = await res.json();
        setSimulationResult({ results: data.simulation, executed: data.executed, isReal: true });
        if (data.executed) {
          showToast("اجرای واقعی با موفقیت انجام شد 🔥", "قوانین مطابقت داده شده و اعلان‌ها/امتیازهای مربوطه ذخیره شدند.", "success");
        } else {
          showToast("اجرا شد (عدم تطابق قوانین)", "رویداد با موفقیت منتشر شد ولی هیچ قانونی با این مشخصات همخوانی نداشت.", "info");
        }
      } else {
        const err = await res.json();
        showToast("خطای سرور", err.error || "خطایی در پردازش اطلاعات رخ داده است.", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("خطا در شبکه", "امکان برقراری ارتباط با سرویس شبیه‌ساز وجود ندارد.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#3C3C3C] pb-24 font-sans" dir="rtl">
      
      {/* Dynamic Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-6 left-6 right-6 sm:left-auto sm:w-96 z-50 p-4 rounded-2xl border-2 border-b-6 shadow-2xl flex gap-3 ${
              toast.type === "success" 
                ? "bg-[#E5F9E5] border-[#58CC02] text-[#3B8A01]" 
                : toast.type === "error" 
                ? "bg-red-50 border-red-500 text-red-700" 
                : "bg-cyan-50 border-cyan-500 text-cyan-700"
            }`}
          >
            <div className="flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs">{toast.title}</h4>
              <p className="text-[10px] mt-0.5 opacity-90">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="bg-white border-b-2 border-[#E5E5E5] px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/rules">
              <button className="flex items-center gap-1.5 text-xs font-black text-[#777777] hover:text-[#3C3C3C] bg-gray-50 border-2 border-[#E5E5E5] hover:border-gray-400 px-4 py-2.5 rounded-xl transition-all">
                <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
                ویرایشگر قوانین
              </button>
            </Link>
            <div className="h-6 w-0.5 bg-[#E5E5E5] hidden sm:block" />
            <div>
              <h1 className="font-display font-black text-lg text-[#3C3C3C] flex items-center gap-2">
                سندباکس و شبیه‌ساز قوانین (Rule Simulator) <GameIcon name="rule_icon" size={24} className="inline-block" />
              </h1>
              <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">
                محیط امن اجرای گیمیفیکیشن و نوتیفیکیشن‌ها (Sandbox Environment)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/rules/history">
              <button className="flex items-center gap-1.5 text-xs font-black text-[#9333EA] bg-[#FAF5FF] hover:bg-[#F3E8FF] border-2 border-[#D8B4FE] px-4 py-2.5 rounded-xl transition-all">
                <GameIcon name="rule_history" size={16} />
                <span>تاریخچه شبیه‌سازی‌ها</span>
              </button>
            </Link>

            <Link href="/notifications">
              <button className="flex items-center gap-1.5 text-xs font-black text-white bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] px-4 py-2.5 rounded-xl transition-all active:border-b-0 active:translate-y-1">
                <Bell className="w-4 h-4" />
                مرکز اعلان‌ها (زنده)
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT COLUMN: Configuration Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Trigger Dispatcher Select */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-4">
            <div className="pb-3 border-b border-[#E5E5E5]">
              <h2 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#58CC02]" /> مرحله ۱: انتخاب رویداد تحریک‌کننده (Event Trigger)
              </h2>
              <p className="text-[11px] font-bold text-gray-400 mt-1">
                مشخص کنید چه نوع رویدادی در پلتفرم زاباندو رخ داده تا ارزیاب آن را بررسی کند.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "exercise.completed", label: "تمرین انجام شد (exercise.completed)", icon: <Cpu className="w-4 h-4" /> },
                { id: "xp.updated", label: "تغییر امتیاز کاربر (xp.updated)", icon: <Zap className="w-4 h-4 text-amber-500" /> },
                { id: "streak.updated", label: "ارتقای زنجیره یادگیری (streak.updated)", icon: <Flame className="w-4 h-4 text-orange-500" /> },
                { id: "badge.awarded", label: "دریافت مدال افتخار (badge.awarded)", icon: <Award className="w-4 h-4 text-indigo-500" /> },
                { id: "league.ranked", label: "تغییر رتبه در لیگ (league.ranked)", icon: <Crown className="w-4 h-4 text-rose-500" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTrigger(item.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-right transition-all font-sans text-xs font-black ${
                    trigger === item.id
                      ? "bg-[#E5F9E5] border-[#58CC02] text-[#3C3C3C]"
                      : "bg-white border-[#E5E5E5] hover:border-gray-400 text-[#777777] hover:text-[#3C3C3C]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Event Payload Editor */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 space-y-4">
            <div className="pb-2 border-b border-[#E5E5E5] flex justify-between items-center">
              <div>
                <h2 className="font-display font-black text-sm text-[#3C3C3C] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-500" /> مرحله ۲: ویرایش بدنه رویداد (Payload JSON)
                </h2>
                <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                  ویژگی‌ها و داده‌های دلخواه را برای رویداد ورودی بنویسید.
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={eventJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                rows={8}
                dir="ltr"
                className={`w-full font-mono text-xs p-4 bg-gray-900 text-green-400 rounded-2xl border-2 outline-none focus:ring-0 ${
                  jsonError ? "border-red-500" : "border-[#3C3C3C]"
                }`}
              />
              
              {jsonError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl mt-2 flex items-start gap-1.5 text-[10px] font-bold text-red-600">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span className="break-all font-mono">Error: {jsonError}</span>
                </div>
              )}
            </div>

            {/* Sandbox Execution Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={runDry}
                disabled={loading}
                className="bg-white hover:bg-cyan-50 border-2 border-[#E5E5E5] hover:border-cyan-500 p-3.5 rounded-2xl text-xs font-black text-[#3C3C3C] flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all disabled:opacity-50"
              >
                <Eye className="w-4 h-4 text-cyan-500" />
                شبیه‌سازی Dry-Run
              </button>

              <button
                onClick={runReal}
                disabled={loading}
                className="bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white p-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                اجرای واقعی Real-Run
              </button>
            </div>
          </div>

        </div>

        {/* LEFT COLUMN: Results Display */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sandbox Info Banner */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-[#E5E5E5] rounded-3xl p-6 flex gap-4 items-start">
            <div className="w-11 h-11 rounded-xl bg-[#E5F9E5] border border-[#58CC02] flex items-center justify-center text-[#58CC02] flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-[#3C3C3C]">سندباکس (Sandbox) چیست؟</h3>
              <p className="text-xs font-bold text-gray-500 leading-relaxed mt-1">
                سندباکس به مدیران زاباندو این امکان را می‌دهد که قبل از اینکه تغییرات قوانین نوتیفیکیشن یا امتیازدهی را دیپلوی کنند، نتایج عملکرد و سناریوها را به‌صورت زنده شبیه‌سازی نمایند.
              </p>
              <div className="flex gap-4 mt-3 text-[10px] font-black text-gray-400">
                <span className="flex items-center gap-1">⚡ <strong>Dry-Run:</strong> تست بدون تاثیر روی دیتابیس</span>
                <span className="flex items-center gap-1">🔥 <strong>Real-Run:</strong> ذخیره زنده در صف اعلان‌ها</span>
              </div>
            </div>
          </div>

          {/* Results Block */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 min-h-[420px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5] mb-6">
                <h3 className="font-display font-black text-md text-[#3C3C3C] flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-gray-400" /> نتایج شبیه‌سازی ارزیاب قوانین
                </h3>
                {simulationResult && (
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                    simulationResult.isReal 
                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                      : "bg-cyan-50 text-cyan-700 border-cyan-200"
                  }`}>
                    {simulationResult.isReal ? "🔥 اجرا شده (REAL-RUN)" : "👀 فقط ارزیابی (DRY-RUN)"}
                  </span>
                )}
              </div>

              {!simulationResult ? (
                <div className="py-24 text-center text-gray-400 space-y-4">
                  <div className="w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <div className="max-w-xs mx-auto">
                    <h4 className="font-black text-sm text-[#3C3C3C]">منتظر دریافت فرامین شما</h4>
                    <p className="text-xs font-bold text-gray-400 mt-1">
                      یکی از رویدادها را در سمت راست پیکربندی کرده و روی دکمه شبیه‌سازی کلیک کنید تا تحلیل زنده ارزیاب را اینجا مشاهده نمایید.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Status Box */}
                  <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
                    simulationResult.isReal && simulationResult.executed
                      ? "bg-[#E5F9E5] border-[#58CC02] text-[#3B8A01]"
                      : "bg-gray-50 border-[#E5E5E5] text-gray-500"
                  }`}>
                    {simulationResult.isReal && simulationResult.executed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                    <div className="text-right">
                      <span className="text-xs font-black block">
                        {simulationResult.isReal 
                          ? simulationResult.executed 
                            ? "تغییرات با موفقیت در سیستم اعمال گردید!" 
                            : "رویداد بدون داشتن قانون متناظر شلیک شد."
                          : "ارزیابی به صورت آزمایشی تکمیل گردید."}
                      </span>
                      <span className="text-[10px] font-bold block mt-0.5 opacity-80">
                        {simulationResult.results.length} قانون فعال برای محرک <code>{trigger}</code> پیدا شد.
                      </span>
                    </div>
                  </div>

                  {/* Rules Evaluation Cards */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">وضعیت تک‌تک قوانین</h4>
                    
                    {simulationResult.results.length === 0 ? (
                      <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center text-xs font-bold text-gray-400">
                        هیچ قانونی برای رویداد <strong>{trigger}</strong> تعریف نشده یا فعال نیست.
                      </div>
                    ) : (
                      simulationResult.results.map((rule, idx) => (
                        <div
                          key={rule.ruleId + idx}
                          className={`p-4 border-2 rounded-2xl flex justify-between items-center transition-all ${
                            rule.wouldExecute
                              ? "bg-white border-[#3C3C3C] border-b-4 shadow-sm"
                              : "bg-gray-50/50 border-[#E5E5E5] opacity-60"
                          }`}
                        >
                          <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                              {rule.wouldExecute ? (
                                <GameIcon name="rule_match_success" size={32} />
                              ) : (
                                <GameIcon name="rule_match_fail" size={32} />
                              )}
                            </div>

                            <div className="space-y-0.5 text-right">
                              <span className="text-xs font-black text-[#3C3C3C] flex items-center gap-1.5">
                                شناسه قانون: <code className="font-mono bg-gray-100 text-[#3C3C3C] px-1.5 py-0.5 rounded text-[10px]">{rule.ruleId}</code>
                              </span>
                              <p className="text-[10px] font-bold text-gray-500">
                                اقدام محرک: <span className="font-mono text-indigo-600">{rule.action}</span>
                              </p>
                            </div>
                          </div>

                          <div className="text-left font-sans">
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${
                              rule.wouldExecute
                                ? "bg-[#58CC02] text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}>
                              {rule.wouldExecute ? "تطبیق موفق (MATCH)" : "عدم تطبیق"}
                            </span>
                            
                            <div className="text-[9px] font-bold text-gray-400 mt-1">
                              {JSON.stringify(rule.params)}
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                  </div>

                </div>
              )}
            </div>

            {/* Quick Actions at footer of results */}
            {simulationResult && (
              <div className="pt-6 border-t border-[#E5E5E5] flex justify-between items-center mt-6">
                <span className="text-[10px] font-bold text-gray-400">
                  خروجی شبیه‌سازی زنده زاباندو (Zabando DevTools)
                </span>
                <button
                  onClick={() => setSimulationResult(null)}
                  className="text-[11px] font-black text-gray-500 hover:text-[#3C3C3C] flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> پاکسازی نتایج
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
