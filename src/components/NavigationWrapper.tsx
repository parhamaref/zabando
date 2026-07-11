"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ShieldAlert, LogIn, Compass } from "lucide-react";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("username");
    setUserRole(role);
    setUsername(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    setUserRole(null);
    setUsername(null);
    router.push("/login");
  };

  // Skip rendering navigation layout on /login to keep the page clean and immersive
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Define profile/card view at the bottom of the sidebar based on role
  const renderProfileCard = () => {
    if (!mounted) return null;

    if (userRole === "student") {
      return (
        <div className="mt-auto px-4 py-3 bg-[#EAF2FC] border-2 border-[#8CB7F3] rounded-2xl flex flex-col gap-2 select-none shadow-[0_3px_0_#5D8CE7]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦁</span>
            <div>
              <p className="text-xs font-black text-[#2E5BB3] uppercase tracking-wider">PRO Student</p>
              <p className="text-[10px] font-bold text-slate-600">Student Account</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-200 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-[10px] py-1.5 px-3 rounded-xl border border-slate-300 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 mt-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج از حساب</span>
          </button>
        </div>
      );
    }

    if (userRole === "teacher") {
      return (
        <div className="mt-auto px-4 py-3 bg-[#FFF3CD] border-2 border-[#FFEBAA] rounded-2xl flex flex-col gap-2 select-none shadow-[0_3px_0_#F5C522]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👩‍🏫</span>
            <div>
              <p className="text-xs font-black text-[#856404] uppercase tracking-wider">مدرس زباندو</p>
              <p className="text-[10px] font-bold text-slate-600">Teacher Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-[10px] py-1.5 px-3 rounded-xl border border-slate-300 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 mt-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج از حساب</span>
          </button>
        </div>
      );
    }

    if (userRole === "admin") {
      return (
        <div className="mt-auto px-4 py-3 bg-[#F8D7DA] border-2 border-[#F5C2C7] rounded-2xl flex flex-col gap-2 select-none shadow-[0_3px_0_#B02A37]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="text-xs font-black text-[#842029] uppercase tracking-wider">مدیر سیستم</p>
              <p className="text-[10px] font-bold text-slate-600">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-[10px] py-1.5 px-3 rounded-xl border border-slate-300 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 mt-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج از حساب</span>
          </button>
        </div>
      );
    }

    // Default Guest layout
    return (
      <div className="mt-auto">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 bg-[#58CC02] hover:bg-[#46A302] text-white border-2 border-b-4 border-gray-950 font-display font-black text-xs uppercase px-4 py-3 rounded-2xl active:translate-y-[2px] active:border-b-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center w-full"
        >
          <LogIn className="w-4 h-4" />
          <span>ورود به پرتال</span>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#F8FBFE] border-r-4 border-[#1E3E62] px-4 py-6 fixed h-screen z-20 shadow-[4px_0_0_0_#11263F]">
        <div className="mb-8 px-4 flex items-center gap-2.5">
          <span className="text-3xl game-animate-bounce">🦉</span>
          <span className="font-display font-black text-2xl tracking-wide text-blue-600 uppercase drop-shadow-[1px_1px_0px_rgba(255,255,255,1)]">
            ZABANDO
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
          {/* General Public / Student Links */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname === "/dashboard" ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🏠</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/skill-tree"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname === "/skill-tree" ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🗺️</span>
            <span>Skill Tree</span>
          </Link>

          <Link
            href="/leaderboard"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname === "/leaderboard" ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🏆</span>
            <span>Leaderboard</span>
          </Link>

          {/* Teacher Dedicated Link */}
          {mounted && userRole === "teacher" && (
            <Link
              href="/teacher-dashboard"
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-amber-300 bg-amber-50/50 text-amber-800 active:translate-y-[1px] ${
                pathname === "/teacher-dashboard" ? "bg-amber-100 border-amber-400" : "hover:bg-amber-100/50"
              }`}
            >
              <span className="text-xl">👩‍🏫</span>
              <span>Teacher Panel</span>
            </Link>
          )}

          {/* Admin Dedicated Links */}
          {mounted && userRole === "admin" && (
            <>
              <Link
                href="/admin/rules"
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-red-300 bg-red-50/50 text-red-800 active:translate-y-[1px] ${
                  pathname === "/admin/rules" ? "bg-red-100 border-red-400" : "hover:bg-red-100/50"
                }`}
              >
                <span className="text-xl">⚙️</span>
                <span>Admin Rules</span>
              </Link>
              <Link
                href="/admin/rules/prompts"
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-red-300 bg-red-50/50 text-red-800 active:translate-y-[1px] ${
                  pathname === "/admin/rules/prompts" ? "bg-red-100 border-red-400" : "hover:bg-red-100/50"
                }`}
              >
                <span className="text-xl">🔮</span>
                <span>AI Prompt Admin</span>
              </Link>
            </>
          )}

          <Link
            href="/lesson/vocab-basics"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname?.startsWith("/lesson") ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🧠</span>
            <span>Active Lesson</span>
          </Link>

          <Link
            href="/profile"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname === "/profile" ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🦊</span>
            <span>Profile</span>
          </Link>

          <Link
            href="/gamification"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-transparent active:translate-y-[1px] ${
              pathname === "/gamification" ? "bg-blue-100 text-blue-700 border-blue-200" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-xl">🕹️</span>
            <span>Gamification Lab</span>
          </Link>

          {/* Public Portal shortcut link for quick navigation */}
          <Link
            href="/login"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border-2 border-dashed border-emerald-400 bg-emerald-50/30 text-emerald-800 active:translate-y-[1px] hover:bg-emerald-50`}
          >
            <span className="text-xl">🔐</span>
            <span className="font-display">ورود کاربران (Portal)</span>
          </Link>
        </nav>

        {renderProfileCard()}
      </aside>

      {/* Main Area */}
      <div className="flex-1 md:pl-64 pb-20 md:pb-0">
        {children}
      </div>

      {/* Mobile Bottom Navigation Tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#F8FBFE] border-t-4 border-[#1E3E62] flex justify-around items-center z-20 px-1 select-none shadow-[0_-4px_12px_rgba(0,0,0,0.15)] overflow-x-auto">
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className="text-xl">🏠</span>
          <span className="text-[8px] font-black uppercase text-slate-600 mt-0.5 tracking-wider">Home</span>
        </Link>
        <Link
          href="/skill-tree"
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className="text-xl">🗺️</span>
          <span className="text-[8px] font-black uppercase text-slate-600 mt-0.5 tracking-wider">Skills</span>
        </Link>

        {mounted && userRole === "teacher" && (
          <Link
            href="/teacher-dashboard"
            className="flex flex-col items-center justify-center flex-1 py-1 bg-amber-50 border-x border-amber-100"
          >
            <span className="text-xl">👩‍🏫</span>
            <span className="text-[8px] font-black uppercase text-amber-700 mt-0.5 tracking-wider">Teacher</span>
          </Link>
        )}

        {mounted && userRole === "admin" && (
          <Link
            href="/admin/rules"
            className="flex flex-col items-center justify-center flex-1 py-1 bg-red-50 border-x border-red-100"
          >
            <span className="text-xl">⚙️</span>
            <span className="text-[8px] font-black uppercase text-red-700 mt-0.5 tracking-wider">Admin</span>
          </Link>
        )}

        <Link
          href="/lesson/vocab-basics"
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className="text-xl">🧠</span>
          <span className="text-[8px] font-black uppercase text-slate-600 mt-0.5 tracking-wider">Quiz</span>
        </Link>

        <Link
          href="/login"
          className="flex flex-col items-center justify-center flex-1 py-1 bg-emerald-50 text-emerald-800"
        >
          <span className="text-xl animate-pulse">🔐</span>
          <span className="text-[8px] font-black uppercase mt-0.5 tracking-wider">Portal</span>
        </Link>
      </nav>
    </div>
  );
}
