import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ leagueId: string }> }
) {
  const { leagueId } = await params;

  // Let's create highly realistic weekly leaderboard competitors for each league
  const competitorsMap: Record<string, any[]> = {
    bronze: [
      { rank: 1, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 2, name: "Lucas Scott", avatar: "🦁", xp: 250 },
      { rank: 3, name: "Sophie Martin", avatar: "🐱", xp: 180 },
      { rank: 4, name: "Liam Brown", avatar: "🐶", xp: 150 },
      { rank: 5, name: "Emma Watson", avatar: "🐼", xp: 110 },
      { rank: 6, name: "Alex Jones", avatar: "🐨", xp: 90 },
      { rank: 7, name: "Oliver Davies", avatar: "🐸", xp: 60 },
      { rank: 8, name: "Charlotte Evans", avatar: "🐰", xp: 40 }
    ],
    gold: [
      { rank: 1, name: "Mia Hall", avatar: "🦄", xp: 450 },
      { rank: 2, name: "Leo Miller", avatar: "🐯", xp: 380 },
      { rank: 3, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 4, name: "Noah White", avatar: "🐨", xp: 290 },
      { rank: 5, name: "Ava Green", avatar: "🐙", xp: 210 },
      { rank: 6, name: "Lucas Gray", avatar: "🐒", xp: 180 },
      { rank: 7, name: "Amelia Black", avatar: "🦊", xp: 130 },
      { rank: 8, name: "Ethan Wood", avatar: "🦉", xp: 90 }
    ],
    ruby: [
      { rank: 1, name: "Ava Carter", avatar: "🦄", xp: 480 },
      { rank: 2, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 3, name: "Chloe Dupont", avatar: "🐼", xp: 300 },
      { rank: 4, name: "Sina Karimi", avatar: "🐯", xp: 285 },
      { rank: 5, name: "John Miller", avatar: "🐨", xp: 210 },
      { rank: 6, name: "Elena Petrova", avatar: "🐸", xp: 195 },
      { rank: 7, name: "Hiro Tanaka", avatar: "🐙", xp: 150 },
      { rank: 8, name: "Fatemeh Rad", avatar: "🦁", xp: 120 }
    ],
    obsidian: [
      { rank: 1, name: "Yusuf Demir", avatar: "🦅", xp: 680 },
      { rank: 2, name: "Ji-Woo Park", avatar: "🦖", xp: 590 },
      { rank: 3, name: "Zoe Jenkins", avatar: "🦄", xp: 490 },
      { rank: 4, name: "Siddharth Rao", avatar: "🐘", xp: 410 },
      { rank: 5, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 6, name: "Isabella Rossi", avatar: "🦩", xp: 290 },
      { rank: 7, name: "Max Schmidt", avatar: "🐻", xp: 250 },
      { rank: 8, name: "Clara Dubois", avatar: "🐰", xp: 210 }
    ],
    diamond: [
      { rank: 1, name: "Dmitry Ivanov", avatar: "🐉", xp: 950 },
      { rank: 2, name: "Sarah Connor", avatar: "🐺", xp: 820 },
      { rank: 3, name: "Kenji Sato", avatar: "🥷", xp: 710 },
      { rank: 4, name: "Amélie Poulain", avatar: "🦢", xp: 610 },
      { rank: 5, name: "Mateo Silva", avatar: "🐆", xp: 500 },
      { rank: 6, name: "Elena Rostova", avatar: "🦊", xp: 420 },
      { rank: 7, name: "Parham Aref", avatar: "🦊", xp: 320, isCurrentUser: true },
      { rank: 8, name: "Fatoumata Diallo", avatar: "🦜", xp: 190 }
    ]
  };

  const selectedCompetitors = competitorsMap[leagueId] || competitorsMap.ruby;

  return NextResponse.json(selectedCompetitors);
}
