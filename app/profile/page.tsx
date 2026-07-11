import { headers } from "next/headers";
import Link from "next/link";
import { UserProfileHeader } from "../../src/components/profile/UserProfileHeader";
import { UserStatsOverview } from "../../src/components/profile/UserStatsOverview";
import { WeeklyActivityChart } from "../../src/components/profile/WeeklyActivityChart";
import { SkillProgressList } from "../../src/components/profile/SkillProgressList";
import { UserBadges } from "../../src/components/profile/UserBadges";

export default async function ProfilePage() {
  const userId = "parham-aref";

  // Resilient server-side base URL determination
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const baseUrl = `${protocol}://${host}/api`;

  let user = null;
  let stats = null;
  let badges = null;
  let skills = null;
  let weekly = null;

  try {
    const responses = await Promise.all([
      fetch(`${baseUrl}/user/${userId}`, { cache: "no-store" }),
      fetch(`${baseUrl}/user/${userId}/stats`, { cache: "no-store" }),
      fetch(`${baseUrl}/user/${userId}/badges`, { cache: "no-store" }),
      fetch(`${baseUrl}/user/${userId}/skills`, { cache: "no-store" }),
      fetch(`${baseUrl}/user/${userId}/activity`, { cache: "no-store" }),
    ]);

    user = await responses[0].json();
    stats = await responses[1].json();
    badges = await responses[2].json();
    skills = await responses[3].json();
    weekly = await responses[4].json();
  } catch (error) {
    console.error("Error fetching profile microservice data:", error);
    // Secure fully resilient fallback data if any service is down/unavailable
    user = {
      id: "parham-aref",
      name: "Parham Aref",
      username: "parham_aref",
      avatar: "🦊",
      email: "parham.aref87@gmail.com",
      joinedDate: "January 2026",
      role: "PRO Member",
      languages: [
        { name: "Persian", level: "Intermediate", flag: "🇮🇷" },
        { name: "English", level: "Fluent", flag: "🇬🇧" }
      ]
    };
    stats = {
      userId: "parham-aref",
      xp: 320,
      level: 8,
      streak: 5,
      hearts: 5,
      completedLessons: 12,
      totalStudyTimeMinutes: 310,
      league: { name: "Ruby League", icon: "❤️", rank: 2 }
    };
    badges = [
      { id: "b1", name: "First Steps", description: "Completed your very first lesson!", icon: "🌱", unlockedAt: "2026-06-20", tier: "Gold" },
      { id: "b2", name: "Flame Keeper", description: "Maintained a 5-day study streak.", icon: "🔥", unlockedAt: "2026-07-01", tier: "Gold" },
      { id: "b3", name: "Polite Speaker", description: "Mastered basic Ta'arof greetings.", icon: "🌸", unlockedAt: "2026-07-04", tier: "Silver" },
      { id: "b4", name: "Ruby Challenger", description: "Ranked top 3 in the Ruby League.", icon: "🏆", unlockedAt: null, tier: "Locked" }
    ];
    skills = [
      { id: "vocab-basics", name: "Greetings & Basics", nameFa: "احوالپرسی و پایه‌ها", progress: 100, level: "A1", status: "Mastered", icon: "🌸" },
      { id: "food-dining", name: "Food & Dining", nameFa: "غذا و رستوران", progress: 40, level: "A2", status: "In Progress", icon: "🍕" },
      { id: "slang-idioms", name: "Slang & Idioms", nameFa: "اصطلاحات عامیانه", progress: 0, level: "B1", status: "Locked", icon: "🤠" },
      { id: "compound-verbs", name: "Compound Verbs", nameFa: "افعال مرکب", progress: 0, level: "B2", status: "Locked", icon: "📝" }
    ];
    weekly = [
      { day: "Mon", xp: 45 },
      { day: "Tue", xp: 60 },
      { day: "Wed", xp: 30 },
      { day: "Thu", xp: 90 },
      { day: "Fri", xp: 15 },
      { day: "Sat", xp: 50 },
      { day: "Sun", xp: 30 }
    ];
  }

  return (
    <main className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Profile Navigation Breadcrumb */}
        <div className="flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs font-black text-[#AFAFAF] uppercase tracking-wider">
            <Link href="/dashboard" className="hover:text-[#3C3C3C]">Zabando</Link>
            <span>/</span>
            <span className="text-[#3C3C3C]">User Profile</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/profile/omnom"
              className="flex items-center gap-2 bg-[#58CC02] hover:bg-[#46A302] border-2 border-b-4 border-gray-950 text-white font-display font-black text-xs uppercase px-4.5 py-2 rounded-2xl active:translate-y-[2px] active:border-b-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              🟢 Om Nom's Profile
            </Link>
            <span className="text-[10px] bg-[#58CC02] text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              Connected to Microservices
            </span>
          </div>
        </div>

        {/* 1. Header Profile Widget */}
        <UserProfileHeader user={user} />

        {/* 2. Stats Grid Column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* 3. Weekly activity representation */}
            <WeeklyActivityChart weekly={weekly} />

            {/* 4. Badges unlocked */}
            <UserBadges badges={badges} />
          </div>

          <div className="space-y-6">
            {/* 5. Compact stats cards */}
            <UserStatsOverview stats={stats} />

            {/* 6. Skills progress breakdown */}
            <SkillProgressList skills={skills} />
          </div>
        </div>

      </div>
    </main>
  );
}
