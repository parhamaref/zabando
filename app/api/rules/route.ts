import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const xpDbFilePath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "xp.rules.json");
const notifDbFilePath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "notification.rules.json");

function getFilePath(type?: string | null) {
  return type === "notification" ? notifDbFilePath : xpDbFilePath;
}

function readRules(type?: string | null) {
  const filePath = getFilePath(type);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return type === "notification" 
    ? [
        {
          id: "notif_xp_milestone",
          trigger: "xp.updated",
          condition: { dailyXp_gte: 50 },
          action: "sendNotification",
          params: {
            type: "xp",
            title: "آفرین! امروز خیلی خوب بودی! ⚡",
            message: "تو امروز بیش از ۵۰ XP گرفتی و رکورد جدیدی ثبت کردی! 👏"
          }
        }
      ]
    : [
        {
          id: "xp_correct_answer",
          trigger: "exercise.completed",
          condition: { isCorrect: true },
          action: "addXp",
          params: { xp: 10 }
        }
      ];
}

function writeRules(rules: any, type?: string | null) {
  const filePath = getFilePath(type);
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(rules, null, 2), "utf8");
  } catch (e) {
    console.error(e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const rules = readRules(type);
  return NextResponse.json(rules);
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const dto = await req.json();
    const rules = readRules(type);
    const newRule = {
      id: dto.id || `rule_${Date.now()}`,
      trigger: dto.trigger || "exercise.completed",
      condition: dto.condition || {},
      action: dto.action || "addXp",
      params: dto.params || {},
      name: dto.name || "Unnamed Rule",
      is_active: dto.is_active ?? true
    };
    rules.push(newRule);
    writeRules(rules, type);
    return NextResponse.json(newRule);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
