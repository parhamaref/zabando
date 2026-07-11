import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const leagues = [
    { id: "bronze", name: "Bronze League", icon: "🥉", color: "text-amber-600", xpThreshold: 100 },
    { id: "gold", name: "Gold League", icon: "🟡", color: "text-yellow-500", xpThreshold: 200 },
    { id: "ruby", name: "Ruby League", icon: "❤️", color: "text-red-500", xpThreshold: 300 },
    { id: "obsidian", name: "Obsidian League", icon: "🔮", color: "text-indigo-600", xpThreshold: 400 },
    { id: "diamond", name: "Diamond League", icon: "💎", color: "text-cyan-400", xpThreshold: 500 }
  ];

  return NextResponse.json(leagues);
}
