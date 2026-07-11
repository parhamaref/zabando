/**
 * Zabando Gamification Engine
 * Core business rules for XP calculation, level progression, streak management,
 * and automatic achievement/badge unlocks.
 */

export interface UserStats {
  userId: string;
  xpTotal: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  completedLessons: number;
  perfectLessons: number;
  completedExercises: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: "Gold" | "Silver" | "Bronze" | "Locked";
  unlockedAt: string | null; // YYYY-MM-DD or null
}

export interface LeagueMember {
  userId: string;
  leagueId: string;
  weeklyXp: number;
  rank: number;
}

export type ExerciseType = "mcq" | "translate" | "reorder" | "listening" | "roleplay";

export interface SystemEvent {
  type: "ExerciseCompleted" | "LessonCompleted" | "DailyLogin";
  timestamp: string; // ISO string
  payload: {
    exerciseType?: ExerciseType;
    isCorrect?: boolean;
    responseTime?: number; // seconds
    comboCount?: number;
    lessonId?: string;
    isPerfectRun?: boolean;
    simulateDate?: string; // YYYY-MM-DD (useful for simulating streak logic across days)
  };
}

/**
 * 2. Rule Engine for XP Calculation
 * Standard base XP with rapid-response bonuses and combo multipliers
 */
export function calculateXP(
  exerciseType: ExerciseType,
  isCorrect: boolean,
  responseTime: number, // in seconds
  comboCount: number = 0
): { base: number; speedBonus: number; comboBonus: number; total: number } {
  if (!isCorrect) {
    return { base: 0, speedBonus: 0, comboBonus: 0, total: 0 };
  }

  // Base XP by complexity of exercise type
  let base = 10;
  switch (exerciseType) {
    case "mcq":
      base = 10;
      break;
    case "reorder":
      base = 12;
      break;
    case "translate":
      base = 15;
      break;
    case "listening":
      base = 15;
      break;
    case "roleplay":
      base = 20;
      break;
  }

  // Speed Bonus: Reward rapid correct answers (under 5 seconds)
  let speedBonus = 0;
  if (responseTime < 4) {
    speedBonus = 5;
  } else if (responseTime < 8) {
    speedBonus = 3;
  }

  // Combo Bonus: Reward chains of correct answers
  let comboBonus = 0;
  if (comboCount >= 10) {
    comboBonus = 5;
  } else if (comboCount >= 5) {
    comboBonus = 3;
  } else if (comboCount >= 3) {
    comboBonus = 1;
  }

  return {
    base,
    speedBonus,
    comboBonus,
    total: base + speedBonus + comboBonus,
  };
}

/**
 * 3. Daily Streak Management
 * Evaluates consecutive calendar days to increment, retain, or reset streak.
 */
export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActiveStr: string | null,
  todayStr: string
): { currentStreak: number; longestStreak: number; status: "incremented" | "preserved" | "reset" | "same_day" } {
  if (!lastActiveStr) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
      status: "incremented",
    };
  }

  const lastActiveDate = new Date(lastActiveStr);
  const todayDate = new Date(todayStr);

  // Eliminate time components for clean calendar day comparisons
  lastActiveDate.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);

  const diffTime = todayDate.getTime() - lastActiveDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already active today, streak is preserved without change
    return {
      currentStreak,
      longestStreak,
      status: "same_day",
    };
  } else if (diffDays === 1) {
    // Active exactly one day after the last active day
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      status: "incremented",
    };
  } else {
    // Gap in activity, streak is broken and resets to 1
    return {
      currentStreak: 1,
      longestStreak,
      status: "reset",
    };
  }
}

/**
 * 4. Level & Progression Formula
 * XP Threshold curve: level = floor(xpTotal / 500) + 1
 * Each level requires 500 XP
 */
export function calculateLevel(xpTotal: number): { level: number; nextLevelXP: number; progressPercent: number } {
  const level = Math.floor(xpTotal / 500) + 1;
  const xpInCurrentLevel = xpTotal % 500;
  const progressPercent = Math.round((xpInCurrentLevel / 500) * 100);

  return {
    level,
    nextLevelXP: 500 - xpInCurrentLevel,
    progressPercent,
  };
}

/**
 * 5. Badge Unlock Rules
 * Checks user statistics against definitions to trigger achievements
 */
export function checkBadgeUnlocks(
  stats: UserStats,
  currentBadges: UserBadge[],
  todayStr: string
): { unlockedBadges: UserBadge[]; newlyUnlockedIds: string[] } {
  const newlyUnlockedIds: string[] = [];

  const updatedBadges = currentBadges.map((badge) => {
    // If already unlocked, do nothing
    if (badge.unlockedAt) return badge;

    let unlocked = false;
    let tier: "Gold" | "Silver" | "Bronze" | "Locked" = "Locked";

    switch (badge.id) {
      case "first-steps":
        if (stats.completedLessons >= 1) {
          unlocked = true;
          tier = "Bronze";
        }
        break;
      case "flame-keeper":
        if (stats.currentStreak >= 5) {
          unlocked = true;
          tier = "Gold";
        }
        break;
      case "xp-champ":
        if (stats.xpTotal >= 1000) {
          unlocked = true;
          tier = "Gold";
        }
        break;
      case "perfect-run":
        if (stats.perfectLessons >= 3) {
          unlocked = true;
          tier = "Silver";
        }
        break;
      case "vocab-master":
        if (stats.completedExercises >= 50) {
          unlocked = true;
          tier = "Gold";
        }
        break;
    }

    if (unlocked) {
      newlyUnlockedIds.push(badge.id);
      return {
        ...badge,
        tier,
        unlockedAt: todayStr,
      };
    }

    return badge;
  });

  return {
    unlockedBadges: updatedBadges,
    newlyUnlockedIds,
  };
}

/**
 * 6. Main Event Processing Loop
 * Updates game state based on inbound system events
 */
export function processGamificationEvent(
  stats: UserStats,
  badges: UserBadge[],
  league: LeagueMember,
  event: SystemEvent
): {
  updatedStats: UserStats;
  updatedBadges: UserBadge[];
  updatedLeague: LeagueMember;
  xpEarned: number;
  streakStatus: "incremented" | "preserved" | "reset" | "same_day";
  levelUp: boolean;
  newBadges: string[];
  log: string;
} {
  const todayStr = event.payload.simulateDate || new Date().toISOString().split("T")[0];
  let xpEarned = 0;
  let streakStatus: "incremented" | "preserved" | "reset" | "same_day" = "same_day";
  let levelUp = false;
  let newBadges: string[] = [];
  let logDetails = "";

  // 1. Clone state
  const updatedStats = { ...stats };
  const updatedLeague = { ...league };

  // 2. Process active streak
  const streakResult = updateStreak(
    updatedStats.currentStreak,
    updatedStats.longestStreak,
    updatedStats.lastActiveDate,
    todayStr
  );
  updatedStats.currentStreak = streakResult.currentStreak;
  updatedStats.longestStreak = streakResult.longestStreak;
  updatedStats.lastActiveDate = todayStr;
  streakStatus = streakResult.status;

  if (streakStatus === "incremented") {
    logDetails += `🔥 Streak incremented to ${updatedStats.currentStreak} days! `;
  } else if (streakStatus === "reset") {
    logDetails += `⚠️ Streak reset to 1 day due to inactivity. `;
  }

  // 3. Process specific events
  if (event.type === "ExerciseCompleted") {
    const exerciseType = event.payload.exerciseType || "mcq";
    const isCorrect = event.payload.isCorrect !== false;
    const responseTime = event.payload.responseTime || 5;
    const comboCount = event.payload.comboCount || 0;

    const xpResult = calculateXP(exerciseType, isCorrect, responseTime, comboCount);
    xpEarned = xpResult.total;

    if (isCorrect) {
      updatedStats.completedExercises += 1;
      logDetails += `Exercise Completed (${exerciseType}): Base XP ${xpResult.base}, Speed Bonus +${xpResult.speedBonus}, Combo Bonus +${xpResult.comboBonus}. Total: +${xpEarned} XP.`;
    } else {
      logDetails += `Exercise Completed (${exerciseType}): Incorrect answer, 0 XP earned.`;
    }
  } else if (event.type === "LessonCompleted") {
    const isPerfect = event.payload.isPerfectRun || false;
    // Standard lesson rewards 30 XP
    xpEarned = 30 + (isPerfect ? 15 : 0);
    updatedStats.completedLessons += 1;
    if (isPerfect) {
      updatedStats.perfectLessons += 1;
    }
    logDetails += `🎓 Lesson Completed! Earned 30 XP. ${
      isPerfect ? "✨ Perfect lesson run bonus: +15 XP." : ""
    } Total: +${xpEarned} XP.`;
  } else if (event.type === "DailyLogin") {
    // Login rewards a flat 5 XP
    xpEarned = 5;
    logDetails += `🗓️ Daily login reward claimed: +5 XP.`;
  }

  // 4. Update XP totals
  updatedStats.xpTotal += xpEarned;
  updatedLeague.weeklyXp += xpEarned;

  // 5. Evaluate level ups
  const levelResult = calculateLevel(updatedStats.xpTotal);
  if (levelResult.level > updatedStats.level) {
    levelUp = true;
    updatedStats.level = levelResult.level;
    logDetails += ` 🎉 LEVEL UP! Reached Level ${updatedStats.level}!`;
  }

  // 6. Check Badge / Achievements unlocks
  const badgeResult = checkBadgeUnlocks(updatedStats, badges, todayStr);
  const updatedBadges = badgeResult.unlockedBadges;
  newBadges = badgeResult.newlyUnlockedIds;

  if (newBadges.length > 0) {
    logDetails += ` 🏆 Achievement unlocked: ${newBadges.join(", ")}!`;
  }

  return {
    updatedStats,
    updatedBadges,
    updatedLeague,
    xpEarned,
    streakStatus,
    levelUp,
    newBadges,
    log: logDetails,
  };
}
