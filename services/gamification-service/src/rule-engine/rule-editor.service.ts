import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RuleEngineDBService } from "./rule-engine-db.service";

@Injectable()
export class RuleEditorService {
  constructor(
    private readonly http: HttpService,
    private readonly db: RuleEngineDBService,
  ) {}

  async getRules() {
    // If Rule Engine is fully localized, we retrieve from the local DB Service or fallback
    return this.db.getRules();
  }

  async createRule(dto: any) {
    return this.db.createRule(dto);
  }

  async updateRule(id: string, dto: any) {
    return this.db.updateRule(id, dto);
  }

  async deleteRule(id: string) {
    return this.db.deleteRule(id);
  }
}
