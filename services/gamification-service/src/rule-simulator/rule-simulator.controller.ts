import { Controller, Post, Body } from "@nestjs/common";
import { RuleSimulatorService } from "./rule-simulator.service";

@Controller("rules/simulator")
export class RuleSimulatorController {
  constructor(private readonly simulator: RuleSimulatorService) {}

  @Post("dry-run")
  dryRun(@Body() body: { trigger: string; event: any }) {
    return this.simulator.dryRun(body.trigger, body.event);
  }

  @Post("real-run")
  realRun(@Body() body: { trigger: string; event: any }) {
    return this.simulator.realRun(body.trigger, body.event);
  }
}
