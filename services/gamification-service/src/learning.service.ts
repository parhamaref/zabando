import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class LearningService {
  constructor(
    @Inject("EVENT_BUS") private readonly eventBus: ClientProxy,
  ) {}

  async completeExercise(userId: string, exercise: { id: string; difficulty: number }, isCorrect: boolean) {
    await this.eventBus.emit("exercise.completed", {
      userId,
      exerciseId: exercise.id,
      isCorrect,
      difficulty: exercise.difficulty,
    });
  }

  async completeLesson(userId: string, lesson: { id: string }) {
    await this.eventBus.emit("lesson.completed", {
      userId,
      lessonId: lesson.id,
    });
  }
}
