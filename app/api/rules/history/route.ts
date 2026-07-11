import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const historyDbPath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-simulator", "db", "rule_history.json");

function readHistory(): any[] {
  try {
    if (fs.existsSync(historyDbPath)) {
      const raw = fs.readFileSync(historyDbPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading rule history:", e);
  }
  return [];
}

function writeHistory(data: any[]) {
  try {
    const dir = path.dirname(historyDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(historyDbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing rule history:", e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const trigger = searchParams.get("trigger");
    const runType = searchParams.get("runType");

    let history = readHistory();

    // Sort by timestamp desc (newest first)
    history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (trigger) {
      history = history.filter((h) => h.trigger === trigger);
    }
    if (runType) {
      history = history.filter((h) => h.runType === runType);
    }

    return NextResponse.json(history.slice(0, limit));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    writeHistory([]);
    return NextResponse.json({ success: true, message: "تاریخچه شبیه‌سازی با موفقیت پاکسازی شد." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
