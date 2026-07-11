import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulated stats-service database fetch
  const statsData = {
    userId: id || "parham-aref",
    xp: 320,
    level: 8,
    streak: 5,
    hearts: 5,
    completedLessons: 12,
    totalStudyTimeMinutes: 310,
    league: {
      name: "Ruby League",
      icon: "❤️",
      rank: 2
    }
  };

  return NextResponse.json(statsData);
}
