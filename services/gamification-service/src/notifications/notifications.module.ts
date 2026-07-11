import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { NotificationConsumerController } from "./notifications-consumer.controller";
import { RuleEngineModule } from "../rule-engine/rule-engine.module";

@Module({
  imports: [HttpModule, RuleEngineModule],
  controllers: [NotificationsController, NotificationConsumerController],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
