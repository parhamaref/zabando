import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RuleEngineService } from "./rule-engine/rule-engine.service";

@Controller()
export class GamificationConsumerController {
  constructor(private readonly ruleEngine: RuleEngineService) {}

  @EventPattern("exercise.completed")
  async onExerciseCompleted(@Payload() event: any) {
    await this.ruleEngine.run("exercise.completed", event);
  }

  @EventPattern("lesson.completed")
  async onLessonCompleted(@Payload() event: any) {
    await this.ruleEngine.run("lesson.completed", event);
  }
}
