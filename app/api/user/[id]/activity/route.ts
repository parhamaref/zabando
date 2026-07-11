import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulated activity-service database fetch
  const activityData = [
    { day: "Mon", xp: 45 },
    { day: "Tue", xp: 60 },
    { day: "Wed", xp: 30 },
    { day: "Thu", xp: 90 },
    { day: "Fri", xp: 15 },
    { day: "Sat", xp: 50 },
    { day: "Sun", xp: 30 }
  ];

  return NextResponse.json(activityData);
}
