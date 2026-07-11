"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0E294B] game-bg-gradient flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8 select-none">
        {/* Animated Icon Container */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-32 h-32 bg-white/15 border-[5px] border-white rounded-[36px] flex items-center justify-center text-6xl shadow-[0_12px_24px_rgba(0,0,0,0.3)] relative"
        >
          <span className="absolute -top-3 -right-3 text-2xl">✨</span>
          🦉
        </motion.div>

        {/* Dynamic Headlines */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          >
            The free, fun, and <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">AI-adaptive</span> way to learn Persian & English.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 font-bold max-w-2xl mx-auto leading-relaxed"
          >
            Powered by Zabando AI Learning Engine. Personalized grammar loops, real-time feedback, CEFR-graded dialogs, and gamified league competitions.
          </motion.p>
        </div>

        {/* Call to Actions using bubble-btns */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <Link
            href="/dashboard"
            className="bubble-btn-green px-10 py-5 text-md font-black min-w-[200px]"
          >
            GET STARTED 🚀
          </Link>
          <Link
            href="/skill-tree"
            className="bubble-btn-blue px-10 py-5 text-md font-black min-w-[200px]"
          >
            EXPLORE PATHS 🗺️
          </Link>
        </motion.div>

        {/* Feature Cards Grid using bubble-cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full text-right" dir="rtl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bubble-card p-1"
          >
            <div className="bubble-card-inner p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-4xl mb-4 block text-right">🧠</span>
                <h3 className="font-display font-black text-lg text-slate-800 uppercase tracking-wide">تعیین سطح هوشمند</h3>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  طراحی پویای مطالب آموزشی هماهنگ با استانداردهای جهانی CEFR برای سطوح مقدماتی تا متوسطه.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bubble-card p-1"
          >
            <div className="bubble-card-inner p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-4xl mb-4 block text-right">💬</span>
                <h3 className="font-display font-black text-lg text-slate-800 uppercase tracking-wide">راهنمای هوش مصنوعی</h3>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  تحلیل دقیق پاسخ‌ها توسط مدل قدرتمند Gemini، ارائه نکات گرامری اختصاصی به همراه بازخورد زنده.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bubble-card p-1"
          >
            <div className="bubble-card-inner p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-4xl mb-4 block text-right">🏆</span>
                <h3 className="font-display font-black text-lg text-slate-800 uppercase tracking-wide">لیگ‌های رقابتی</h3>
                <p className="text-xs font-bold text-slate-600 mt-2 leading-relaxed">
                  با کسب امتیاز (XP) در کوییزها، رتبه خود را در لیگ ارتقا دهید و با دیگران به رقابت بپردازید.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
