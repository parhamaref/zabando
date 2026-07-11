import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class StatsClient {
  constructor(private readonly http: HttpService) {}

  async addXp(userId: string, xp: number) {
    return this.http.post(`${process.env.STATS_SERVICE_URL}/xp/add`, {
      userId,
      xp,
    });
  }

  async updateStreak(userId: string) {
    return this.http.post(`${process.env.STATS_SERVICE_URL}/streak/update`, {
      userId,
    });
  }
}
