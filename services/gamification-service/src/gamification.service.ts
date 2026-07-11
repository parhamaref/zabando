import { Injectable } from "@nestjs/common";
import { ExerciseCompletedEvent, LessonCompletedEvent } from "./events/learning-events.interface";
import { StatsClient } from "./clients/stats.client";
import { BadgesClient } from "./clients/badges.client";
import { LeaguesClient } from "./clients/leagues.client";
import { RuleEngineService } from "./rule-engine/rule-engine.service";

@Injectable()
export class GamificationService {
  constructor(
    private readonly statsClient: StatsClient,
    private readonly badgesClient: BadgesClient,
    private readonly leaguesClient: LeaguesClient,
    private readonly ruleEngine: RuleEngineService,
  ) {}

  // Event: Exercise Completed
  async handleExerciseCompleted(event: ExerciseCompletedEvent) {
    // 1. Run dynamic configurable rules first
    await this.ruleEngine.run("exercise.completed", event);

    // 2. Fall back to standard business rules
    const baseXp = event.isCorrect ? 10 : 2;
    const difficultyBonus = event.difficulty * (event.isCorrect ? 2 : 0);
    const totalXp = baseXp + difficultyBonus;

    await this.statsClient.addXp(event.userId, totalXp);
    await this.leaguesClient.addWeeklyXp(event.userId, totalXp);
    await this.statsClient.updateStreak(event.userId);

    // Simple Badge rule
    if (event.isCorrect && event.difficulty >= 4) {
      await this.badgesClient.awardBadge(event.userId, "HARD_EXERCISE");
    }
  }

  // Event: Lesson Completed
  async handleLessonCompleted(event: LessonCompletedEvent) {
    const lessonXp = 30;

    await this.statsClient.addXp(event.userId, lessonXp);
    await this.leaguesClient.addWeeklyXp(event.userId, lessonXp);
    await this.statsClient.updateStreak(event.userId);

    // Lesson Badge rule
    await this.badgesClient.awardBadge(event.userId, "LESSON_COMPLETED");
  }
}

