import { headers } from "next/headers";
import { Leaderboard } from "../../src/components/leaderboard/Leaderboard";

export default async function LeaderboardPage() {
  // Resilient server-side base URL determination
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const baseUrl = `${protocol}://${host}/api`;

  let leagues = null;
  let initialUsers = null;
  let me = null;

  try {
    const responses = await Promise.all([
      fetch(`${baseUrl}/leagues`, { cache: "no-store" }),
      fetch(`${baseUrl}/leagues/ruby/users`, { cache: "no-store" }),
      fetch(`${baseUrl}/user/me`, { cache: "no-store" })
    ]);

    leagues = await responses[0].json();
    initialUsers = await responses[1].json();
    me = await responses[2].json();
  } catch (error) {
    console.error("Error fetching leaderboard gateway data:", error);
    // Fully robust local fallback if gateway is offline
    leagues = [
      { id: "bronze", name: "Bronze League", icon: "🥉", color: "text-amber-600", xpThreshold: 100 },
      { id: "gold", name: "Gold League", icon: "🟡", color: "text-yellow-500", xpThreshold: 200 },
      { id: "ruby", name: "Ruby League", icon: "❤️", color: "text-red-500", xpThreshold: 300 },
      { id: "obsidian", name: "Obsidian League", icon: "🔮", color: "text-indigo-600", xpThreshold: 400 },
      { id: "diamond", name: "Diamond League", icon: "💎", color: "text-cyan-400", xpThreshold: 500 }
    ];
    initialUsers = [
      { rank: 1, name: "Ava Carter", avatar: "🦄", xp: 480 },
      { rank: 2, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 3, name: "Chloe Dupont", avatar: "🐼", xp: 300 },
      { rank: 4, name: "Sina Karimi", avatar: "🐯", xp: 285 },
      { rank: 5, name: "John Miller", avatar: "🐨", xp: 210 },
      { rank: 6, name: "Elena Petrova", avatar: "🐸", xp: 195 },
      { rank: 7, name: "Hiro Tanaka", avatar: "🐙", xp: 150 },
      { rank: 8, name: "Fatemeh Rad", avatar: "🦁", xp: 120 }
    ];
    me = {
      id: "parham-aref",
      name: "Parham Aref",
      username: "parham_aref",
      avatar: "🦊",
      email: "parham.aref87@gmail.com",
      joinedDate: "January 2026",
      role: "PRO Member"
    };
  }

  return (
    <main className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center mb-8 select-none">
        <span className="text-sm bg-cyan-100 text-cyan-700 border border-cyan-200 font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Competitive Leagues
        </span>
        <h1 className="font-display font-black text-3xl text-[#3C3C3C] mt-2">
          Weekly Leaderboard
        </h1>
        <p className="text-xs font-bold text-[#777777] mt-1">
          Complete lessons, earn XP, and secure a place in the next division!
        </p>
      </div>

      {/* Render Leaderboard with loaded gateway variables */}
      <Leaderboard initialLeagues={leagues} initialUsers={initialUsers} currentUser={me} />
    </main>
  );
}
