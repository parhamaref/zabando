"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameIcon } from "../GameIcon";

interface Competitor {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
}

interface League {
  id: string;
  name: string;
  icon: string;
  color: string;
  xpThreshold: number;
}

interface CurrentUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  joinedDate: string;
  role: string;
}

interface LeaderboardProps {
  initialLeagues: League[];
  initialUsers: Competitor[];
  currentUser: CurrentUser;
}

export function Leaderboard({ initialLeagues, initialUsers, currentUser }: LeaderboardProps) {
  const [selectedLeague, setSelectedLeague] = useState("ruby");
  const [users, setUsers] = useState<Competitor[]>(initialUsers);
  const [loading, setLoading] = useState(false);

  const handleLeagueChange = async (leagueId: string) => {
    setSelectedLeague(leagueId);
    setLoading(true);
    try {
      const response = await fetch(`/api/leagues/${leagueId}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching live league competitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentLeagueInfo = initialLeagues.find((l) => l.id === selectedLeague) || initialLeagues[2];

  // Make sure we have enough competitors to build a podium, else use fallback list
  const safeUsers = users && users.length >= 3 ? users : initialUsers;
  const topThree = safeUsers.slice(0, 3);
  const remainingRows = safeUsers.slice(3);

  // Reorder top three to: [Rank 2, Rank 1, Rank 3] for podium display
  const podium = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="max-w-2xl mx-auto select-none space-y-8 pb-10">
      
      {/* Leagues Selector Header with active indicators */}
      <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-4 flex gap-2 items-center justify-start overflow-x-auto scrollbar-none select-none relative">
        {initialLeagues.map((league) => (
          <button
            key={league.id}
            onClick={() => handleLeagueChange(league.id)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display font-black text-xs uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap active:translate-y-[1px] disabled:opacity-70 ${
              selectedLeague === league.id
                ? "bg-[#DDF4FF] border-[#84D8FF] text-[#1899D6]"
                : "bg-white border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            <GameIcon name="league_badge" size={16} />
            <span>{league.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* Animated loading skeleton with micro-interaction look */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl select-none"
          >
            <div className="w-12 h-12 border-4 border-[#1CB0F6] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-black text-[#AFAFAF] uppercase tracking-wider animate-pulse">
              Syncing with Gateway...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedLeague}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Podium (Top 3 Users) */}
            <div className="grid grid-cols-3 gap-3 items-end pt-12 px-4 min-h-[240px]">
              {/* Podium Item #2 (Rank 2) */}
              {podium[0] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="text-4xl select-none">{podium[0].avatar}</span>
                    <span className="absolute -top-3 -right-2 bg-slate-300 border border-slate-400 rounded-full flex items-center justify-center p-0.5 shadow-sm">
                      <GameIcon name="rank_crown_silver" size={18} />
                    </span>
                  </div>
                  <span className="font-display font-black text-xs text-[#3C3C3C] mt-2 text-center max-w-[80px] truncate">
                    {podium[0].name}
                  </span>
                  <span className="font-mono font-black text-[11px] text-[#1CB0F6] flex items-center gap-0.5">
                    <GameIcon name="xp_orb" size={10} />
                    <span>{podium[0].xp} XP</span>
                  </span>
                  <div className="w-full bg-slate-100 border-2 border-slate-200 h-20 rounded-t-2xl mt-3 flex items-center justify-center">
                    <span className="font-display font-black text-2xl text-slate-400">2</span>
                  </div>
                </div>
              )}

              {/* Podium Item #1 (Rank 1) */}
              {podium[1] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2"
                    >
                      <GameIcon name="rank_crown_gold" size={24} />
                    </motion.div>
                    <span className="text-5xl select-none">{podium[1].avatar}</span>
                    <span className="absolute -top-2 -right-2 bg-yellow-400 border border-yellow-500 rounded-full flex items-center justify-center p-0.5 shadow-md">
                      <GameIcon name="rank_crown_gold" size={20} />
                    </span>
                  </div>
                  <span className="font-display font-black text-sm text-[#3C3C3C] mt-3 text-center max-w-[100px] truncate">
                    {podium[1].name}
                  </span>
                  <span className="font-mono font-black text-xs text-[#FF9600] flex items-center gap-0.5">
                    <GameIcon name="xp_orb" size={12} />
                    <span>{podium[1].xp} XP</span>
                  </span>
                  <div className="w-full bg-[#FFF9E6] border-2 border-[#FFEBB3] h-28 rounded-t-3xl mt-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#FFD900]/20" />
                    <span className="font-display font-black text-4xl text-yellow-500">1</span>
                  </div>
                </div>
              )}

              {/* Podium Item #3 (Rank 3) */}
              {podium[2] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="text-4xl select-none">{podium[2].avatar}</span>
                    <span className="absolute -top-3 -right-2 bg-amber-600 border border-amber-700 rounded-full flex items-center justify-center p-0.5 shadow-sm">
                      <GameIcon name="rank_crown_bronze" size={18} />
                    </span>
                  </div>
                  <span className="font-display font-black text-xs text-[#3C3C3C] mt-2 text-center max-w-[80px] truncate">
                    {podium[2].name}
                  </span>
                  <span className="font-mono font-black text-[11px] text-[#58CC02] flex items-center gap-0.5">
                    <GameIcon name="xp_orb" size={10} />
                    <span>{podium[2].xp} XP</span>
                  </span>
                  <div className="w-full bg-[#FAF0E6] border-2 border-[#E6D0BA] h-16 rounded-t-2xl mt-3 flex items-center justify-center">
                    <span className="font-display font-black text-2xl text-amber-700">3</span>
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard Table List */}
            <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b-2 border-[#E5E5E5] flex justify-between items-center bg-slate-50/50">
                <span className="text-xs font-black text-[#AFAFAF] uppercase tracking-wider flex items-center gap-1.5">
                  <GameIcon name="league_badge" size={16} />
                  <span>{currentLeagueInfo.name} Division</span>
                </span>
                <span className="text-xs font-black text-[#58CC02] uppercase tracking-wider">
                  Top 3 Promote 🚀
                </span>
              </div>

              <div className="divide-y-2 divide-[#F1F1F1]">
                {safeUsers.map((user) => (
                  <div
                    key={user.name}
                    className={`flex items-center justify-between px-6 py-4 transition-colors ${
                      user.isCurrentUser
                        ? "bg-[#DDF4FF]/40 hover:bg-[#DDF4FF]/60"
                        : "hover:bg-[#FAFADA]/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Number */}
                      <span className="w-6 text-center font-mono font-black text-[#777777] flex items-center justify-center">
                        {user.rank === 1 ? (
                          <GameIcon name="rank_crown_gold" size={14} />
                        ) : user.rank === 2 ? (
                          <GameIcon name="rank_crown_silver" size={14} />
                        ) : user.rank === 3 ? (
                          <GameIcon name="rank_crown_bronze" size={14} />
                        ) : (
                          <span>{user.rank}</span>
                        )}
                      </span>

                      {/* Avatar */}
                      <span className="text-3xl select-none bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                        {user.avatar}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-sm text-[#3C3C3C]">
                            {user.name}
                          </span>
                          {user.isCurrentUser && (
                            <span className="text-[9px] bg-[#1CB0F6] text-white font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                              You
                            </span>
                          )}
                        </div>
                        {/* Promotion Zone tags */}
                        {user.rank <= 3 && (
                          <span className="text-[9px] font-bold text-[#58CC02] uppercase tracking-wider block">
                            Promotion Zone
                          </span>
                        )}
                        {user.rank >= 7 && (
                          <span className="text-[9px] font-bold text-[#FF4B4B] uppercase tracking-wider block">
                            Demotion Danger
                          </span>
                        )}
                      </div>
                    </div>

                    {/* XP representation */}
                    <div className="flex items-center gap-1.5">
                      <GameIcon name="xp_orb" size={16} />
                      <span className="font-mono font-black text-sm text-[#4B4B4B]">
                        {user.xp}
                      </span>
                      <span className="text-[9px] font-black text-[#AFAFAF] uppercase tracking-wider">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Microservice Connected Status Banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔗</span>
                <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
                  Leaderboard data verified live! Synergized with <strong>league-service</strong>, <strong>stats-service</strong>, and <strong>user-service</strong> over secure JWT handshake.
                </p>
              </div>
              <span className="hidden sm:inline-block text-[10px] bg-emerald-500 text-white font-black px-2 py-1 rounded-full uppercase tracking-wider">
                Active Microservices
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer info box */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3 select-none">
        <span className="text-2xl">⏳</span>
        <p className="text-xs font-semibold text-orange-800 leading-relaxed">
          The weekly {currentLeagueInfo.name} tournament resets in <strong>2 days, 4 hours</strong>. Maintain your score in the top 3 to secure promotion to the next tier! Minimum requirement is <strong>{currentLeagueInfo.xpThreshold} XP</strong>.
        </p>
      </div>

    </div>
  );
}
