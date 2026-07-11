import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NotificationsService } from "./notifications.service";
import * as fs from "fs";
import * as path from "path";

@Controller()
export class NotificationConsumerController {
  private notificationRules: any[] = [];
  private readonly rulesFilePath: string;

  constructor(private readonly service: NotificationsService) {
    this.rulesFilePath = path.join(
      process.cwd(),
      "services",
      "gamification-service",
      "src",
      "rule-engine",
      "rules",
      "notification.rules.json"
    );
    this.loadNotificationRules();
  }

  private loadNotificationRules() {
    try {
      if (fs.existsSync(this.rulesFilePath)) {
        const raw = fs.readFileSync(this.rulesFilePath, "utf8");
        this.notificationRules = JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to load notification rules from file:", e);
    }
  }

  private async processEventRules(triggerName: string, payload: any) {
    this.loadNotificationRules(); // Reload rules so edits take effect immediately
    const matchedRules = this.notificationRules.filter(
      (rule) => rule.trigger === triggerName
    );

    for (const rule of matchedRules) {
      let isMatch = true;
      const condition = rule.condition || {};

      for (const key of Object.keys(condition)) {
        if (key.endsWith("_gte")) {
          const fieldName = key.replace("_gte", "");
          const val = payload[fieldName];
          if (val === undefined || typeof val !== "number" || val < condition[key]) {
            isMatch = false;
            break;
          }
        } else {
          if (payload[key] !== condition[key]) {
            isMatch = false;
            break;
          }
        }
      }

      if (isMatch && rule.action === "sendNotification") {
        const params = rule.params || {};
        await this.service.addNotification({
          userId: payload.userId || "user_test_01",
          type: params.type || "system",
          title: params.title || "نوتیفیکیشن جدید 🔔",
          message: params.message || "شما یک پیام جدید دارید.",
          metadata: {
            ruleId: rule.id,
            timestamp: new Date().toISOString(),
            ...payload
          }
        });
      }
    }
  }

  @EventPattern("notification.triggered")
  async onDirectNotification(@Payload() event: any) {
    if (event.userId) {
      await this.service.addNotification({
        userId: event.userId,
        type: event.type || "system",
        title: event.title || "نوتیفیکیشن جدید 🔔",
        message: event.message || "",
        metadata: event.metadata || {}
      });
    }
  }

  @EventPattern("xp.updated")
  async onXpUpdated(@Payload() event: any) {
    await this.processEventRules("xp.updated", event);
  }

  @EventPattern("streak.updated")
  async onStreakUpdated(@Payload() event: any) {
    await this.processEventRules("streak.updated", event);
  }

  @EventPattern("streak.broken")
  async onStreakBroken(@Payload() event: any) {
    await this.processEventRules("streak.broken", event);
  }

  @EventPattern("badge.awarded")
  async onBadgeAwarded(@Payload() event: any) {
    await this.processEventRules("badge.awarded", event);
  }

  @EventPattern("league.ranked")
  async onLeagueRanked(@Payload() event: any) {
    await this.processEventRules("league.ranked", event);
  }
}
