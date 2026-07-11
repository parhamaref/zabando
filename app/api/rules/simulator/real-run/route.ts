import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const xpDbFilePath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "xp.rules.json");
const notifDbFilePath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "notification.rules.json");
const notifDbPath = path.join(process.cwd(), "services", "gamification-service", "src", "notifications", "db", "notifications.json");
const historyDbPath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-simulator", "db", "rule_history.json");

function readRules(filePath: string): any[] {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

function readHistory(): any[] {
  try {
    if (fs.existsSync(historyDbPath)) {
      const raw = fs.readFileSync(historyDbPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {}
  return [];
}

function writeHistory(data: any[]) {
  try {
    const dir = path.dirname(historyDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(historyDbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {}
}

function readNotifs(): any[] {
  try {
    if (fs.existsSync(notifDbPath)) {
      const raw = fs.readFileSync(notifDbPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

function writeNotifs(data: any[]) {
  try {
    const dir = path.dirname(notifDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(notifDbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error(e);
  }
}

function matches(condition: Record<string, any>, event: any): boolean {
  if (!condition) return true;
  for (const key of Object.keys(condition)) {
    if (key.endsWith("_gte")) {
      const field = key.replace("_gte", "");
      if (event[field] === undefined || !(event[field] >= condition[key])) return false;
    } else {
      if (event[key] !== condition[key]) return false;
    }
  }
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const { trigger, event } = await req.json();
    if (!trigger || !event) {
      return NextResponse.json({ error: "trigger and event are required" }, { status: 400 });
    }

    const xpRules = readRules(xpDbFilePath);
    const notifRules = readRules(notifDbFilePath);
    const allRules = [...xpRules, ...notifRules];

    // Filter rules by trigger
    const filteredRules = allRules.filter((r) => r.trigger === trigger && r.is_active !== false);

    const simulation = filteredRules.map((rule) => {
      const wouldExecute = matches(rule.condition, event);
      return {
        ruleId: rule.id,
        action: rule.action,
        params: rule.params,
        wouldExecute,
      };
    });

    const matchedRules = filteredRules.filter((rule) => matches(rule.condition, event));
    let executed = false;

    if (matchedRules.length > 0) {
      executed = true;
      const notifications = readNotifs();
      const userId = event.userId || "user_test_01";

      for (const rule of matchedRules) {
        if (rule.action === "sendNotification") {
          const params = rule.params || {};
          const newNotif = {
            id: `notif_rule_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            userId,
            type: params.type || "system",
            title: params.title || "نوتیفیکیشن قانون",
            message: params.message || "",
            isRead: false,
            createdAt: new Date().toISOString(),
            metadata: {
              ruleId: rule.id,
              triggeredByEvent: trigger,
              ...event
            }
          };
          notifications.push(newNotif);
        } else if (rule.action === "addXp") {
          const xp = rule.params.xp || 0;
          const newNotif = {
            id: `notif_xp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            userId,
            type: "xp",
            title: "امتیاز جدید دریافت شد! ⚡",
            message: `تبریک! شما به خاطر قانون '${rule.id}' موفق به کسب ${xp} امتیاز شدید.`,
            isRead: false,
            createdAt: new Date().toISOString(),
            metadata: {
              ruleId: rule.id,
              triggeredByEvent: trigger,
              xpAwarded: xp,
              ...event
            }
          };
          notifications.push(newNotif);
        } else if (rule.action === "awardBadge") {
          const badge = rule.params.badge || "UNNAMED";
          const newNotif = {
            id: `notif_badge_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            userId,
            type: "badge",
            title: "نشان جدید کسب کردید! 🏆",
            message: `شما نشان درخشان '${badge}' را کسب کردید. فوق‌العاده است!`,
            isRead: false,
            createdAt: new Date().toISOString(),
            metadata: {
              ruleId: rule.id,
              triggeredByEvent: trigger,
              badgeAwarded: badge,
              ...event
            }
          };
          notifications.push(newNotif);
        }
      }

      writeNotifs(notifications);
    }

    // Logging real-runs in the execution history
    const historyList = readHistory();
    for (const rule of filteredRules) {
      const wouldExecute = matches(rule.condition, event);
      historyList.push({
        id: `hist_real_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        ruleId: rule.id,
        trigger,
        event,
        action: rule.action,
        params: rule.params,
        executed: wouldExecute, // Whether it actually executed due to match
        runType: "real-run",
        wouldExecute,
        timestamp: new Date().toISOString()
      });
    }
    // Limit to keeping max 500 records
    if (historyList.length > 500) {
      historyList.splice(0, historyList.length - 500);
    }
    writeHistory(historyList);

    return NextResponse.json({
      simulation,
      executed,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
