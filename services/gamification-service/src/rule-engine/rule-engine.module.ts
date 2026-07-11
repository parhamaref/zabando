import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { RuleEngineService } from "./rule-engine.service";
import { RuleLoaderService } from "./rule-loader.service";
import { StatsClient } from "../clients/stats.client";
import { BadgesClient } from "../clients/badges.client";
import { RuleEngineDBService } from "./rule-engine-db.service";
import { RuleEditorService } from "./rule-editor.service";
import { RuleEditorController } from "./rule-editor.controller";

@Module({
  imports: [HttpModule],
  controllers: [RuleEditorController],
  providers: [
    RuleEngineService,
    RuleLoaderService,
    StatsClient,
    BadgesClient,
    RuleEngineDBService,
    RuleEditorService,
  ],
  exports: [RuleEngineService, RuleEngineDBService, RuleEditorService]
})
export class RuleEngineModule {}
