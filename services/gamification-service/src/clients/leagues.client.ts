import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LeaguesClient {
  constructor(private readonly http: HttpService) {}

  async addWeeklyXp(userId: string, xp: number) {
    return this.http.post(`${process.env.LEAGUE_SERVICE_URL}/xp/add`, {
      userId,
      xp,
    });
  }
}
