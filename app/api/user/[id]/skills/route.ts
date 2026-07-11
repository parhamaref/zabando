import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulated progress-service database fetch
  const skillsData = [
    {
      id: "vocab-basics",
      name: "Greetings & Basics",
      nameFa: "احوالپرسی و پایه‌ها",
      progress: 100,
      level: "A1",
      status: "Mastered",
      icon: "🌸"
    },
    {
      id: "food-dining",
      name: "Food & Dining",
      nameFa: "غذا و رستوران",
      progress: 40,
      level: "A2",
      status: "In Progress",
      icon: "🍕"
    },
    {
      id: "slang-idioms",
      name: "Slang & Idioms",
      nameFa: "اصطلاحات عامیانه",
      progress: 0,
      level: "B1",
      status: "Locked",
      icon: "🤠"
    },
    {
      id: "compound-verbs",
      name: "Compound Verbs",
      nameFa: "افعال مرکب",
      progress: 0,
      level: "B2",
      status: "Locked",
      icon: "📝"
    }
  ];

  return NextResponse.json(skillsData);
}
