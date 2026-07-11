import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { Rule } from "./rule.interface";

@Injectable()
export class RuleEngineDBService {
  private rules: Rule[] = [];
  private readonly dbFilePath: string;

  constructor() {
    this.dbFilePath = path.join(process.cwd(), "services", "gamification-service", "src", "rule-engine", "rules", "xp.rules.json");
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.dbFilePath)) {
        const raw = fs.readFileSync(this.dbFilePath, "utf8");
        this.rules = JSON.parse(raw);
      } else {
        // Default seed rules
        this.rules = [
          {
            id: "xp_correct_answer",
            trigger: "exercise.completed",
            condition: { isCorrect: true },
            action: "addXp",
            params: { xp: 10 }
          },
          {
            id: "xp_difficulty_bonus",
            trigger: "exercise.completed",
            condition: { difficulty_gte: 4, isCorrect: true },
            action: "addXp",
            params: { xp: 8 }
          },
          {
            id: "award_hard_badge",
            trigger: "exercise.completed",
            condition: { difficulty_gte: 5, isCorrect: true },
            action: "awardBadge",
            params: { badge: "HARD_MASTER" }
          }
        ];
        this.saveToDisk();
      }
    } catch (err) {
      console.error("Failed to load rules from disk:", err);
    }
  }

  private saveToDisk() {
    try {
      const dir = path.dirname(this.dbFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.rules, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to save rules to disk:", err);
    }
  }

  async getRules() {
    this.loadFromDisk();
    return this.rules;
  }

  async createRule(dto: any) {
    const newRule: Rule = {
      id: dto.id || `rule_${Date.now()}`,
      trigger: dto.trigger || "exercise.completed",
      condition: dto.condition || {},
      action: dto.action || "addXp",
      params: dto.params || {}
    };
    this.rules.push(newRule);
    this.saveToDisk();
    return newRule;
  }

  async updateRule(id: string, dto: any) {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx !== -1) {
      this.rules[idx] = {
        ...this.rules[idx],
        trigger: dto.trigger ?? this.rules[idx].trigger,
        condition: dto.condition ?? this.rules[idx].condition,
        action: dto.action ?? this.rules[idx].action,
        params: dto.params ?? this.rules[idx].params
      };
      this.saveToDisk();
      return this.rules[idx];
    }
    throw new Error(`Rule with ID ${id} not found.`);
  }

  async deleteRule(id: string) {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const deleted = this.rules.splice(idx, 1)[0];
      this.saveToDisk();
      return deleted;
    }
    throw new Error(`Rule with ID ${id} not found.`);
  }
}
