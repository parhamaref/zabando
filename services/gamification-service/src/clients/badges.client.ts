import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class BadgesClient {
  constructor(private readonly http: HttpService) {}

  async awardBadge(userId: string, badgeCode: string) {
    return this.http.post(`${process.env.BADGE_SERVICE_URL}/award`, {
      userId,
      badgeCode,
    });
  }
}
