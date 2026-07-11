import { Injectable } from "@nestjs/common";
import { Rule } from "./rule.interface";
import { RuleEngineDBService } from "./rule-engine-db.service";

@Injectable()
export class RuleLoaderService {
  private rules: Rule[] = [];

  constructor(private readonly db: RuleEngineDBService) {
    this.loadRules();
  }

  async loadRules() {
    try {
      this.rules = await this.db.getRules();
    } catch (err) {
      console.warn("Failed to load rules via DB service, falling back to memory.", err);
    }
  }

  getRulesForTrigger(trigger: string): Rule[] {
    // Reload dynamically on query so edits take effect immediately
    this.loadRules();
    return this.rules.filter((rule) => rule.trigger === trigger);
  }
}
