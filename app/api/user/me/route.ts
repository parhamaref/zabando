import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Mock logged-in user profile from user-service
  const me = {
    id: "parham-aref",
    name: "Parham Aref",
    username: "parham_aref",
    avatar: "🦊",
    email: "parham.aref87@gmail.com",
    joinedDate: "January 2026",
    role: "PRO Member"
  };

  return NextResponse.json(me);
}
