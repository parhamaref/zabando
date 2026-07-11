"use client";

import { useState } from "react";
import { LeaderboardHeader } from "./LeaderboardHeader";
import { LeagueSelector } from "./LeagueSelector";
import { LeaderboardRow } from "./LeaderboardRow";
import { XPProgressBar } from "./XPProgressBar";

interface League {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface User {
  id: string;
  display_name: string;
  level: number;
  weekly_xp: number;
  avatar_emoji: string;
  league_id: string;
}

interface LeaderboardProps {
  leagues: League[];
  users: User[];
  me: User;
}

export function Leaderboard({ leagues, users, me }: LeaderboardProps) {
  const [currentLeagueId, setCurrentLeagueId] = useState(leagues[0].id);

  const selectedLeague = leagues.find(l => l.id === currentLeagueId) || leagues[0];

  // Filter and sort users in active league
  const filteredUsers = users.filter(user => user.league_id === currentLeagueId);
  const sortedUsers = [...filteredUsers].sort((a, b) => b.weekly_xp - a.weekly_xp);

  // Weekly XP tracking for me
  const meWeeklyXp = me.weekly_xp;
  const weeklyGoalXp = 500;

  return (
    <div className="flex flex-col gap-6">
      {/* Header section with current league info */}
      <LeaderboardHeader 
        leagueName={selectedLeague.name} 
        leagueIcon={selectedLeague.icon} 
      />

      {/* Weekly personal progress */}
      <div className="bg-white border-2 border-[#E5E5E5] rounded-3xl p-5">
        <h3 className="font-display font-black text-sm text-[#4B4B4B] mb-3 uppercase tracking-wider">
          Weekly XP Target
        </h3>
        <XPProgressBar xp={meWeeklyXp} goal={weeklyGoalXp} />
      </div>

      {/* Horizontal League Selection Slider */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-black text-xs text-[#AFAFAF] uppercase tracking-wider ml-1">
          Select League Tier
        </h3>
        <LeagueSelector
          leagues={leagues}
          currentLeague={currentLeagueId}
          onChange={setCurrentLeagueId}
        />
      </div>

      {/* Leaderboard rows container */}
      <div className="flex flex-col gap-3">
        {sortedUsers.map((user, index) => (
          <LeaderboardRow
            key={user.id}
            user={user}
            rank={index + 1}
            isMe={user.id === me.id}
          />
        ))}

        {sortedUsers.length === 0 && (
          <div className="text-center py-12 bg-white border-2 border-[#E5E5E5] rounded-3xl">
            <span className="text-4xl">🏜️</span>
            <p className="text-sm font-bold text-[#AFAFAF] mt-3">
              No learners in this league tier yet. Be the first!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
