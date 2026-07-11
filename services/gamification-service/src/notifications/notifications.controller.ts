import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("api-notifications")
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get(":userId")
  async getNotifications(@Param("userId") userId: string) {
    return this.service.getNotifications(userId);
  }

  @Post("read-all/:userId")
  @HttpCode(HttpStatus.OK)
  async readAll(@Param("userId") userId: string) {
    await this.service.markAllAsRead(userId);
    return { success: true };
  }

  @Post("read/:id")
  @HttpCode(HttpStatus.OK)
  async readSingle(@Param("id") id: string) {
    const updated = await this.service.markAsRead(id);
    return { success: !!updated, data: updated };
  }

  @Delete(":id")
  async deleteNotification(@Param("id") id: string) {
    const success = await this.service.deleteNotification(id);
    return { success };
  }
}
