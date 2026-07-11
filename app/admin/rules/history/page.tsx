"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { GameIcon } from "@/src/components/GameIcon";
import {
  ArrowLeft,
  Clock,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Play,
  Eye,
  Info,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  Cpu,
  Flame,
  Zap,
  Award,
  Crown
} from "lucide-react";

interface HistoryEntry {
  id: string;
  ruleId: string;
  trigger: string;
  event: Record<string, any>;
  action: string;
  params: Record<string, any>;
  executed: boolean;
  runType: "dry-run" | "real-run";
  wouldExecute: boolean;
  timestamp: string;
}

export default function RuleHistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "dry-run" | "real-run">("all");
  const [filterTrigger, setFilterTrigger] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "match" | "no-match">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ title: string; message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (title: string, message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rules/history?limit=150");
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      } else {
        showToast("خطای شبکه", "امکان دریافت لیست تاریخچه وجود ندارد.", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("خطای سیستم", "مشکلی در دریافت اطلاعات از سرور به وجود آمده است.", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!confirm("آیا از پاک کردن کامل تاریخچه شبیه‌سازی مطمئن هستید؟ این عمل غیرقابل بازگشت است.")) {
      return;
    }
    try {
      const res = await fetch("/api/rules/history", { method: "DELETE" });
      if (res.ok) {
        setHistory([]);
        showToast("پاکسازی موفقیت‌آمیز ✨", "کل تاریخچه شبیه‌سازی و گزارشات با موفقیت حذف شد.", "success");
      } else {
        showToast("خطا", "امکان حذف تاریخچه در حال حاضر وجود ندارد.", "error");
      }
    } catch (e) {
      showToast("خطا", "ارتباط با سرور برقرار نشد.", "error");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter lists based on states
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.ruleId.toLowerCase().includes(search.toLowerCase()) ||
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      JSON.stringify(item.event).toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || item.runType === filterType;
    const matchesTrigger = filterTrigger === "all" || item.trigger === filterTrigger;
    
    let matchesStatus = true;
    if (filterStatus === "match") {
      matchesStatus = item.wouldExecute;
    } else if (filterStatus === "no-match") {
      matchesStatus = !item.wouldExecute;
    }

    return matchesSearch && matchesType && matchesTrigger && matchesStatus;
  });

  // Calculate high level stats
  const totalRuns = history.length;
  const realRuns = history.filter((h) => h.runType === "real-run").length;
  const dryRuns = history.filter((h) => h.runType === "dry-run").length;
  const successfulMatches = history.filter((h) => h.wouldExecute).length;
  const matchRate = totalRuns > 0 ? Math.round((successfulMatches / totalRuns) * 100) : 0;

  // Get unique list of triggers present in logs
  const triggersList = Array.from(new Set(history.map((h) => h.trigger)));

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#3C3C3C] pb-24 font-sans" dir="rtl">
      
      {/* Toast Alert */}
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

      {/* Header Panel */}
      <div className="bg-white border-b-2 border-[#E5E5E5] px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/rules/simulator">
              <button className="flex items-center gap-1.5 text-xs font-black text-[#777777] hover:text-[#3C3C3C] bg-gray-50 border-2 border-[#E5E5E5] hover:border-gray-400 px-4 py-2.5 rounded-xl transition-all">
                <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
                شبیه‌ساز قوانین
              </button>
            </Link>
            <div className="h-6 w-0.5 bg-[#E5E5E5] hidden sm:block" />
            <div>
              <h1 className="font-display font-black text-lg text-[#3C3C3C] flex items-center gap-2">
                تاریخچه اجرای قوانین (Execution History) <GameIcon name="rule_history" size={24} className="inline-block" />
              </h1>
              <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">
                گزارشات و ردپای زنده از ارزیابی قوانین گیمیفیکیشن زاباندو
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={fetchHistory}
              disabled={loading}
              className="p-2.5 bg-white border-2 border-[#E5E5E5] hover:border-gray-400 rounded-xl transition-all"
              title="بارگذاری مجدد گزارشات"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={clearHistory}
              disabled={loading || history.length === 0}
              className="flex items-center gap-1.5 text-xs font-black text-[#E11D48] bg-red-50 border-2 border-red-200 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              پاکسازی تاریخچه
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* BENTO STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">کل ارزیابی‌ها</span>
              <span className="text-2xl font-black text-[#3C3C3C] mt-1 block">{totalRuns} اجرا</span>
            </div>
            <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
              <GameIcon name="rule_history" size={28} />
            </div>
          </div>

          <div className="bg-[#ECFEFF] border-2 border-[#A5F3FC] border-b-6 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block">اجراهای آزمایشی (Dry-Run)</span>
              <span className="text-2xl font-black text-[#0891B2] mt-1 block">{dryRuns} مورد</span>
            </div>
            <div className="w-12 h-12 bg-cyan-100 border border-cyan-200 rounded-xl flex items-center justify-center">
              <GameIcon name="rule_icon" size={28} />
            </div>
          </div>

          <div className="bg-[#E5F9E5] border-2 border-[#58CC02] border-b-6 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#3B8A01] uppercase tracking-wider block">اجراهای واقعی (Real-Run)</span>
              <span className="text-2xl font-black text-[#3B8A01] mt-1 block">{realRuns} مورد</span>
            </div>
            <div className="w-12 h-12 bg-green-100 border border-green-200 rounded-xl flex items-center justify-center">
              <GameIcon name="rule_match_success" size={28} />
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 border-b-6 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">نرخ تطبیق قوانین (Match Rate)</span>
              <span className="text-2xl font-black text-amber-700 mt-1 block">{matchRate}% موفق</span>
            </div>
            <div className="w-12 h-12 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center">
              <GameIcon name="badge_medal" size={28} />
            </div>
          </div>

        </div>

        {/* FILTERS PANEL */}
        <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="جستجو بر اساس شناسه قانون، اقدام و..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-2xl border-2 border-[#E5E5E5] hover:border-gray-400 focus:border-[#3C3C3C] outline-none text-xs font-bold transition-all"
              />
            </div>

            {/* Quick Filter Selection Rows */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              {/* Type Filter */}
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-[#E5E5E5] px-3 py-1.5 rounded-2xl">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e: any) => setFilterType(e.target.value)}
                  className="bg-transparent text-xs font-black text-[#3C3C3C] outline-none border-0 p-0"
                >
                  <option value="all">همه اجراها (All)</option>
                  <option value="dry-run">آزمایشی (Dry-Run)</option>
                  <option value="real-run">واقعی (Real-Run)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-[#E5E5E5] px-3 py-1.5 rounded-2xl">
                <Sliders className="w-3.5 h-3.5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e: any) => setFilterStatus(e.target.value)}
                  className="bg-transparent text-xs font-black text-[#3C3C3C] outline-none border-0 p-0"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="match">تطبیق‌های موفق (Match)</option>
                  <option value="no-match">عدم تطبیق</option>
                </select>
              </div>

              {/* Trigger Filter */}
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-[#E5E5E5] px-3 py-1.5 rounded-2xl">
                <Layers className="w-3.5 h-3.5 text-gray-500" />
                <select
                  value={filterTrigger}
                  onChange={(e) => setFilterTrigger(e.target.value)}
                  className="bg-transparent text-xs font-black text-[#3C3C3C] outline-none border-0 p-0"
                >
                  <option value="all">همه رویدادها</option>
                  {triggersList.map((trg) => (
                    <option key={trg} value={trg}>{trg}</option>
                  ))}
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* LOGS TABLE / FEED */}
        <div className="space-y-4">
          
          <div className="flex justify-between items-center px-2">
            <h3 className="font-display font-black text-sm text-[#3C3C3C]">گزارشات فیلتر شده ({filteredHistory.length} مورد)</h3>
            <span className="text-[10px] font-bold text-gray-400">آخرین شبیه‌سازی‌ها در صدر قرار دارند</span>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <RefreshCw className="w-8 h-8 text-[#58CC02] animate-spin mx-auto mb-4" />
              <p className="text-xs font-bold text-gray-500">در حال دریافت تاریخچه ارزیابی قوانین...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="bg-white border-2 border-[#E5E5E5] rounded-3xl p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Info className="w-8 h-8" />
              </div>
              <div className="max-w-xs mx-auto">
                <h4 className="font-black text-sm text-[#3C3C3C]">هیچ لاگ متناظری یافت نشد</h4>
                <p className="text-xs font-bold text-gray-400 mt-1">
                  شما می‌توانید وارد بخش شبیه‌ساز شده و با اجرای سناریوهای گوناگون، تاریخچه را ایجاد کنید.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((entry) => {
                const isExpanded = expandedId === entry.id;

                return (
                  <motion.div
                    key={entry.id}
                    layout="position"
                    className={`bg-white border-2 border-[#E5E5E5] border-b-4 rounded-2xl hover:border-gray-400 transition-all overflow-hidden ${
                      isExpanded ? "ring-2 ring-[#58CC02] ring-offset-1" : ""
                    }`}
                  >
                    
                    {/* Log Row Header */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        
                        {/* Run Type Indicator Badge */}
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                          entry.runType === "real-run"
                            ? "bg-[#E5F9E5] border-[#58CC02] text-[#3B8A01]"
                            : "bg-[#ECFEFF] border-[#A5F3FC] text-[#0891B2]"
                        }`}>
                          {entry.runType === "real-run" ? (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              REAL-RUN
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              DRY-RUN
                            </>
                          )}
                        </span>

                        {/* Match Status Badge */}
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                          entry.wouldExecute
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                            : "bg-gray-100 border-gray-300 text-gray-500"
                        }`}>
                          {entry.wouldExecute ? (
                            <>
                              <GameIcon name="rule_match_success" size={14} />
                              تطبیق موفق
                            </>
                          ) : (
                            <>
                              <GameIcon name="rule_match_fail" size={14} />
                              عدم تطبیق شرایط
                            </>
                          )}
                        </span>

                        <div className="text-right">
                          <span className="text-xs font-black text-[#3C3C3C] block">
                            قانون: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">{entry.ruleId}</code>
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 mt-1 block">
                            محرک رویداد: <strong className="font-mono text-gray-600">{entry.trigger}</strong>
                          </span>
                        </div>

                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                        
                        <div className="text-right md:text-left">
                          <span className="text-xs font-black text-gray-500 block">
                            اقدام: <span className="font-mono text-[#58CC02]">{entry.action}</span>
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mt-1 justify-end">
                            <Calendar className="w-3 h-3" />
                            {new Date(entry.timestamp).toLocaleTimeString("fa-IR")} - {new Date(entry.timestamp).toLocaleDateString("fa-IR")}
                          </span>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}

                      </div>
                    </div>

                    {/* Expandable JSON payloads block */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-gray-50 border-t border-gray-100 p-5 space-y-4 font-mono text-xs"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                            
                            {/* Input event payload */}
                            <div className="space-y-1.5">
                              <h4 className="font-black text-xs text-gray-500 flex items-center gap-1.5">
                                <Cpu className="w-4 h-4 text-gray-400" /> ورودی رویداد (Event Payload JSON)
                              </h4>
                              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed max-h-60">
                                {JSON.stringify(entry.event, null, 2)}
                              </pre>
                            </div>

                            {/* Rule configuration params */}
                            <div className="space-y-1.5">
                              <h4 className="font-black text-xs text-gray-500 flex items-center gap-1.5">
                                <Sliders className="w-4 h-4 text-gray-400" /> تنظیمات قانون و پارامترها (Rule Params)
                              </h4>
                              <pre className="bg-gray-900 text-indigo-300 p-4 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed max-h-60">
                                {JSON.stringify(entry.params, null, 2)}
                              </pre>
                            </div>

                          </div>

                          {/* Extra info debug line */}
                          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-200 font-sans text-[10px] text-gray-400 font-bold">
                            <span>شناسه ثبت لاگ در دیتابیس: <code>{entry.id}</code></span>
                            <span className="flex items-center gap-1">
                              {entry.runType === "real-run" ? (
                                <>⚡ این اجرا به طور واقعی ذخیره شد و روی امتیاز/اعلان‌های زنده کاربر اعمال شده است.</>
                              ) : (
                                <>👀 این فقط یک شبیه‌سازی بصری بود و هیچ تغییری روی پروفایل کاربر ایجاد نکرده است.</>
                              )}
                            </span>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
