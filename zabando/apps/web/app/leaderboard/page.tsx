import { Leaderboard } from "../../src/components/leaderboard/Leaderboard";

const LEAGUES = [
  { id: "bronze", name: "Bronze", color: "#CD7F32", icon: "🟫" },
  { id: "silver", name: "Silver", color: "#C0C0C0", icon: "🥈" },
  { id: "gold", name: "Gold", color: "#FFD700", icon: "🥇" },
  { id: "ruby", name: "Ruby", color: "#E0115F", icon: "❤️" },
  { id: "diamond", name: "Diamond", color: "#B9F2FF", icon: "💎" }
];

const ME_USER = {
  id: "me",
  display_name: "Parham Aref",
  level: 8,
  weekly_xp: 320,
  avatar_emoji: "🦊",
  league_id: "ruby"
};

const SIMULATED_USERS = [
  // Bronze League Learners
  { id: "u-bronze-1", display_name: "Sara (سارا)", level: 2, weekly_xp: 180, avatar_emoji: "🌸", league_id: "bronze" },
  { id: "u-bronze-2", display_name: "Ali (علی)", level: 3, weekly_xp: 140, avatar_emoji: "🐼", league_id: "bronze" },
  { id: "u-bronze-3", display_name: "John Smith", level: 1, weekly_xp: 90, avatar_emoji: "🤠", league_id: "bronze" },

  // Silver League Learners
  { id: "u-silver-1", display_name: "Zari (زری)", level: 4, weekly_xp: 290, avatar_emoji: "🟡", league_id: "silver" },
  { id: "u-silver-2", display_name: "Max (مکث)", level: 5, weekly_xp: 250, avatar_emoji: "🟠", league_id: "silver" },
  { id: "u-silver-3", display_name: "Clara", level: 3, weekly_xp: 180, avatar_emoji: "👩‍🍳", league_id: "silver" },

  // Gold League Learners
  { id: "u-gold-1", display_name: "Lily (لیلی)", level: 6, weekly_xp: 390, avatar_emoji: "🟣", league_id: "gold" },
  { id: "u-gold-2", display_name: "Junior (جونیور)", level: 5, weekly_xp: 310, avatar_emoji: "🔵", league_id: "gold" },
  { id: "u-gold-3", display_name: "Hans", level: 4, weekly_xp: 220, avatar_emoji: "👮", league_id: "gold" },

  // Ruby League Learners (Our tier)
  { id: "u-ruby-1", display_name: "🦉 Zabando Duo", level: 12, weekly_xp: 450, avatar_emoji: "🟢", league_id: "ruby" },
  { id: "me", display_name: "Parham Aref", level: 8, weekly_xp: 320, avatar_emoji: "🦊", league_id: "ruby" },
  { id: "u-ruby-2", display_name: "Mr. Thomas", level: 7, weekly_xp: 280, avatar_emoji: "🟤", league_id: "ruby" },
  { id: "u-ruby-3", display_name: "Elena", level: 9, weekly_xp: 190, avatar_emoji: "🎓", league_id: "ruby" },

  // Diamond League Learners
  { id: "u-diamond-1", display_name: "Aria (آریا)", level: 15, weekly_xp: 720, avatar_emoji: "🦁", league_id: "diamond" },
  { id: "u-diamond-2", display_name: "Behnaz (بهناز)", level: 11, weekly_xp: 610, avatar_emoji: "🦄", league_id: "diamond" },
  { id: "u-diamond-3", display_name: "David Miller", level: 14, weekly_xp: 530, avatar_emoji: "👾", league_id: "diamond" }
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#4B4B4B] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="border-b-2 border-[#E5E5E5] pb-6">
          <h1 className="font-display font-black text-3xl text-[#4B4B4B] uppercase tracking-wide">
            🏆 Zabando Leagues
          </h1>
          <p className="text-sm font-bold text-[#777777] mt-1">
            Compete with learners worldwide, earn XP, and secure your promotion to high tiers!
          </p>
        </div>

        <Leaderboard leagues={LEAGUES} users={SIMULATED_USERS} me={ME_USER} />
      </div>
    </main>
  );
}
