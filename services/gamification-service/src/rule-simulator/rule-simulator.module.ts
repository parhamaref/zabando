import { Module } from "@nestjs/common";
import { RuleSimulatorService } from "./rule-simulator.service";
import { RuleSimulatorController } from "./rule-simulator.controller";
import { RuleEngineModule } from "../rule-engine/rule-engine.module";

@Module({
  imports: [RuleEngineModule],
  providers: [RuleSimulatorService],
  controllers: [RuleSimulatorController],
  exports: [RuleSimulatorService]
})
export class RuleSimulatorModule {}
