import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulated badge-service database fetch
  const badgesData = [
    {
      id: "b1",
      name: "First Steps",
      description: "Completed your very first lesson!",
      icon: "🌱",
      unlockedAt: "2026-06-20",
      tier: "Gold"
    },
    {
      id: "b2",
      name: "Flame Keeper",
      description: "Maintained a 5-day study streak.",
      icon: "🔥",
      unlockedAt: "2026-07-01",
      tier: "Gold"
    },
    {
      id: "b3",
      name: "Polite Speaker",
      description: "Mastered basic Ta'arof greetings.",
      icon: "🌸",
      unlockedAt: "2026-07-04",
      tier: "Silver"
    },
    {
      id: "b4",
      name: "Ruby Challenger",
      description: "Ranked top 3 in the Ruby League.",
      icon: "🏆",
      unlockedAt: null,
      tier: "Locked"
    }
  ];

  return NextResponse.json(badgesData);
}
