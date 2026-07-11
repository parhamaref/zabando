import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

export interface Notification {
  id: string;
  userId: string;
  type: "xp" | "streak" | "badge" | "league" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];
  private readonly dbFilePath: string;

  constructor() {
    this.dbFilePath = path.join(
      process.cwd(),
      "services",
      "gamification-service",
      "src",
      "notifications",
      "db",
      "notifications.json"
    );
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.dbFilePath)) {
        const raw = fs.readFileSync(this.dbFilePath, "utf8");
        this.notifications = JSON.parse(raw);
      } else {
        // Initial Seed Notifications for a fun look and feel
        this.notifications = [
          {
            id: "notif_seed_1",
            userId: "user_test_01",
            type: "xp",
            title: "به زاباندو خوش آمدید! ⚡",
            message: "به انجمن پرانرژی آموزش زبان زاباندو خوش آمدید. تلاش روزانه تو کلید موفقیتت است!",
            isRead: false,
            createdAt: new Date().toISOString()
          },
          {
            id: "notif_seed_2",
            userId: "user_test_01",
            type: "streak",
            title: "شروع پرقدرت Streak! 🔥",
            message: "تو اولین روز از زنجیره یادگیریت را تکمیل کردی. این زنجیره طلایی را حفظ کن!",
            isRead: true,
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
          }
        ];
        this.saveToDisk();
      }
    } catch (err) {
      console.error("Failed to load notifications from disk:", err);
    }
  }

  private saveToDisk() {
    try {
      const dir = path.dirname(this.dbFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.notifications, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to save notifications to disk:", err);
    }
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    this.loadFromDisk();
    return this.notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addNotification(dto: Omit<Notification, "id" | "isRead" | "createdAt">): Promise<Notification> {
    this.loadFromDisk();
    const newNotif: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata: dto.metadata
    };
    this.notifications.push(newNotif);
    this.saveToDisk();
    return newNotif;
  }

  async markAllAsRead(userId: string): Promise<void> {
    this.loadFromDisk();
    this.notifications.forEach((n) => {
      if (n.userId === userId) {
        n.isRead = true;
      }
    });
    this.saveToDisk();
  }

  async markAsRead(id: string): Promise<Notification | null> {
    this.loadFromDisk();
    const idx = this.notifications.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.notifications[idx].isRead = true;
      this.saveToDisk();
      return this.notifications[idx];
    }
    return null;
  }

  async deleteNotification(id: string): Promise<boolean> {
    this.loadFromDisk();
    const idx = this.notifications.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.notifications.splice(idx, 1);
      this.saveToDisk();
      return true;
    }
    return false;
  }
}
