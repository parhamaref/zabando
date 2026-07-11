"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Lock, User, Key, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    setTimeout(() => {
      const uTrim = username.trim();
      const pTrim = password.trim();

      if (uTrim === "Student" && pTrim === "123456789") {
        setSuccess("ورود موفقیت‌آمیز به عنوان دانش‌آموز! در حال انتقال...");
        localStorage.setItem("userRole", "student");
        localStorage.setItem("username", "Student");
        setTimeout(() => {
          router.push("/dashboard");
          window.location.reload();
        }, 1200);
      } else if (uTrim === "Teacher" && pTrim === "123456789") {
        setSuccess("ورود موفقیت‌آمیز به عنوان معلم! در حال انتقال...");
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem("username", "Teacher");
        setTimeout(() => {
          router.push("/teacher-dashboard");
          window.location.reload();
        }, 1200);
      } else if (uTrim === "admin" && pTrim === "123456789") {
        setSuccess("ورود موفقیت‌آمیز به عنوان مدیر سیستم! در حال انتقال...");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("username", "admin");
        setTimeout(() => {
          router.push("/admin/rules");
          window.location.reload();
        }, 1200);
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است.");
        setLoading(false);
      }
    }, 800);
  };

  const handleQuickSelect = (role: "student" | "teacher" | "admin") => {
    setError(null);
    if (role === "student") {
      setUsername("Student");
      setPassword("123456789");
    } else if (role === "teacher") {
      setUsername("Teacher");
      setPassword("123456789");
    } else if (role === "admin") {
      setUsername("admin");
      setPassword("123456789");
    }
  };

  return (
    <main className="min-h-screen bg-[#0E294B] game-bg-gradient flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden text-right" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-md w-full">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-20 h-20 bg-white/10 border-4 border-white/80 rounded-[28px] mx-auto flex items-center justify-center text-4xl shadow-lg mb-4"
          >
            🦉
          </motion.div>
          <h1 className="font-display font-black text-3xl text-white tracking-wide">
            پورتال ورود کاربران زباندو
          </h1>
          <p className="text-xs font-bold text-slate-300 mt-2">
            ورود به دنیای یادگیری هوشمند و گیمیفای شده زبان
          </p>
        </div>

        {/* Login Card */}
        <div className="bubble-card p-1">
          <div className="bubble-card-inner p-6 bg-white rounded-[24px]">
            <h2 className="font-display font-black text-lg text-slate-800 border-b pb-3 mb-5 flex items-center gap-2">
              <span>🔐</span>
              <span>ورود به حساب کاربری</span>
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-600 p-3 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2"
              >
                <span>⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border-2 border-emerald-200 text-emerald-600 p-3 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{success}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1.5 mr-1">
                  نام کاربری (Username)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-4.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-2xl py-3 pr-11 pl-4 text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Student / Teacher / admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 mb-1.5 mr-1">
                  رمز عبور (Password)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-4.5 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    dir="ltr"
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-2xl py-3 pr-11 pl-4 text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bubble-btn-green py-4.5 text-xs font-black tracking-wide shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "در حال تایید..." : "ورود به سیستم 🚀"}
              </button>
            </form>

            {/* Quick credentials helper */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-black text-slate-500 block mb-3">
                🔑 انتخاب سریع نقش (داده‌های دمو):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSelect("student")}
                  className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-[10px] font-black py-2.5 px-1 rounded-xl transition-all"
                >
                  🧑‍🎓 دانش‌آموز
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect("teacher")}
                  className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-[10px] font-black py-2.5 px-1 rounded-xl transition-all"
                >
                  👩‍🏫 معلم
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect("admin")}
                  className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[10px] font-black py-2.5 px-1 rounded-xl transition-all"
                >
                  ⚙️ مدیر سیستم
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
