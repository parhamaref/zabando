import { Injectable } from "@nestjs/common";
import { RuleEngineService } from "../rule-engine/rule-engine.service";
import { RuleSimulationResult } from "./rule-simulator.interface";

@Injectable()
export class RuleSimulatorService {
  constructor(private readonly engine: RuleEngineService) {}

  // Only simulation, no actual execution
  async dryRun(trigger: string, event: any): Promise<RuleSimulationResult[]> {
    return this.engine.simulate(trigger, event);
  }

  // Both simulation and real execution
  async realRun(trigger: string, event: any): Promise<{
    simulation: RuleSimulationResult[];
    executed: boolean;
  }> {
    const simulation = await this.engine.simulate(trigger, event);
    await this.engine.run(trigger, event);
    return { simulation, executed: true };
  }
}
