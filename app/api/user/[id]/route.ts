import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulated user-service database fetch
  const userData = {
    id: id || "parham-aref",
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

  return NextResponse.json(userData);
}
