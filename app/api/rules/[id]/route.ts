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
  return [];
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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const rules = readRules(type);
  const rule = rules.find((r: any) => r.id === params.id);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }
  return NextResponse.json(rule);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const dto = await req.json();
    const rules = readRules(type);
    const idx = rules.findIndex((r: any) => r.id === params.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }
    rules[idx] = {
      ...rules[idx],
      trigger: dto.trigger ?? rules[idx].trigger,
      condition: dto.condition ?? rules[idx].condition,
      action: dto.action ?? rules[idx].action,
      params: dto.params ?? rules[idx].params,
      name: dto.name ?? rules[idx].name,
      is_active: dto.is_active ?? rules[idx].is_active
    };
    writeRules(rules, type);
    return NextResponse.json(rules[idx]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const rules = readRules(type);
  const idx = rules.findIndex((r: any) => r.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }
  const deleted = rules.splice(idx, 1)[0];
  writeRules(rules, type);
  return NextResponse.json(deleted);
}
