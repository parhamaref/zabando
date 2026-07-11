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
    console.error("Failed to write notifications database", e);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const notifications = readNotifs();

    if (id === "read-all") {
      const userId = body.userId || "user_test_01";
      notifications.forEach((n) => {
        if (n.userId === userId) {
          n.isRead = true;
        }
      });
      writeNotifs(notifications);
      return NextResponse.json({ success: true });
    }

    const idx = notifications.findIndex((n) => n.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    if (body.isRead !== undefined) {
      notifications[idx].isRead = body.isRead;
    } else {
      notifications[idx].isRead = true;
    }

    writeNotifs(notifications);
    return NextResponse.json(notifications[idx]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const notifications = readNotifs();
    const idx = notifications.findIndex((n) => n.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    const deleted = notifications.splice(idx, 1)[0];
    writeNotifs(notifications);
    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
