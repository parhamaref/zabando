import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GamificationService } from "./gamification.service";
import { StatsClient } from "./clients/stats.client";
import { BadgesClient } from "./clients/badges.client";
import { LeaguesClient } from "./clients/leagues.client";
import { RuleEngineModule } from "./rule-engine/rule-engine.module";
import { EventBusModule } from "./event-bus/event-bus.module";
import { GamificationConsumerController } from "./gamification-consumer.controller";
import { NotificationsModule } from "./notifications/notifications.module";
import { RuleSimulatorModule } from "./rule-simulator/rule-simulator.module";

@Module({
  imports: [HttpModule, RuleEngineModule, EventBusModule, NotificationsModule, RuleSimulatorModule],
  providers: [GamificationService, StatsClient, BadgesClient, LeaguesClient],
  controllers: [GamificationConsumerController],
  exports: [GamificationService],
})
export class GamificationModule {}

