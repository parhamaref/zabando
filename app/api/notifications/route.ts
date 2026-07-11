import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const notifDbPath = path.join(
  process.cwd(),
  "services",
  "gamification-service",
  "src",
  "notifications",
  "db",
  "notifications.json"
);

function readNotifs(): any[] {
  try {
    if (fs.existsSync(notifDbPath)) {
      const raw = fs.readFileSync(notifDbPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read notifications database", e);
  }
  return [
    {
      id: "notif_seed_1",
      userId: "user_test_01",
      type: "xp",
      title: "به زاباندو خوش آمدید! ⚡",
      message: "به انجمن پرانرژی آموزش زبان زاباندو خوش آمدید. تلاش روزانه تو کلید موفقیتت است!",
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ];
}

function writeNotifs(data: any[]) {
  try {
    const dir = path.dirname(notifDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(notifDbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to write notifications database", e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "user_test_01";
  const notifications = readNotifs()
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(notifications);
}

export async function POST(req: NextRequest) {
  try {
    const dto = await req.json();
    const notifications = readNotifs();
    const newNotif = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: dto.userId || "user_test_01",
      type: dto.type || "system",
      title: dto.title || "نوتیفیکیشن جدید 🔔",
      message: dto.message || "شما یک پیام جدید دارید.",
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata: dto.metadata || {}
    };
    notifications.push(newNotif);
    writeNotifs(notifications);
    return NextResponse.json(newNotif);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
