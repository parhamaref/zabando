import { Injectable } from "@nestjs/common";
import { RuleLoaderService } from "./rule-loader.service";
import { StatsClient } from "../clients/stats.client";
import { BadgesClient } from "../clients/badges.client";
import { RuleSimulationResult } from "../rule-simulator/rule-simulator.interface";

@Injectable()
export class RuleEngineService {
  constructor(
    private readonly loader: RuleLoaderService,
    private readonly stats: StatsClient,
    private readonly badges: BadgesClient,
  ) {}

  async run(trigger: string, event: any) {
    const rules = this.loader.getRulesForTrigger(trigger);

    for (const rule of rules) {
      if (this.matches(rule.condition, event)) {
        await this.execute(rule.action, rule.params, event);
      }
    }
  }

  async simulate(trigger: string, event: any): Promise<RuleSimulationResult[]> {
    const rules = this.loader.getRulesForTrigger(trigger);
    const results: RuleSimulationResult[] = [];

    for (const rule of rules) {
      const match = this.matches(rule.condition, event);
      results.push({
        ruleId: rule.id,
        action: rule.action,
        params: rule.params,
        wouldExecute: match,
      });
    }

    return results;
  }

  private matches(condition: Record<string, any>, event: any): boolean {
    for (const key of Object.keys(condition)) {
      if (key.endsWith("_gte")) {
        const field = key.replace("_gte", "");
        if (!(event[field] >= condition[key])) return false;
      } else {
        if (event[key] !== condition[key]) return false;
      }
    }
    return true;
  }

  private async execute(action: string, params: any, event: any) {
    switch (action) {
      case "addXp":
        return this.stats.addXp(event.userId, params.xp);

      case "awardBadge":
        return this.badges.awardBadge(event.userId, params.badge);

      default:
        console.log("Unknown action:", action);
    }
  }
}
