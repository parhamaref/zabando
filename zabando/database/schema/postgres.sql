-- ==========================================
-- 🦉 Zabando Enterprise Database Schema (PostgreSQL)
-- Final Production-Level Version (Duolingo-grade architecture)
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CEFR Levels Enum
CREATE TYPE cefr_level_enum AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- Skills Enum
CREATE TYPE skill_enum AS ENUM ('vocabulary', 'grammar', 'listening', 'speaking', 'reading');

-- Lesson Status Enum
CREATE TYPE lesson_status_enum AS ENUM ('not_started', 'in_progress', 'completed');

-- Exercise Type Enum
CREATE TYPE exercise_type_enum AS ENUM ('mcq', 'translate', 'reorder', 'listening', 'roleplay');


-- ==========================================
-- SECTION 1: Core User & Authentication
-- ==========================================

-- 1.1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    locale VARCHAR(10) DEFAULT 'fa-IR', -- e.g., 'fa-IR', 'en-US'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.2. User Profiles Table
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    native_language VARCHAR(10) DEFAULT 'fa', -- e.g., 'fa', 'en'
    target_language VARCHAR(10) DEFAULT 'en', -- e.g., 'en', 'fr', 'de'
    cefr_level cefr_level_enum DEFAULT 'A1',
    avatar_url VARCHAR(255) DEFAULT '🦉',
    bio TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- SECTION 2: Course, Skill, Lesson, Exercise Structures
-- ==========================================

-- 2.1. Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    source_language VARCHAR(10) NOT NULL, -- e.g., 'fa'
    target_language VARCHAR(10) NOT NULL, -- e.g., 'en'
    cefr_min cefr_level_enum DEFAULT 'A1',
    cefr_max cefr_level_enum DEFAULT 'C2',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.2. Skills Table (Duolingo Skill Tree Node)
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL, -- Sorting index in the learning map
    cefr_level cefr_level_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.3. Lessons Table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL,
    estimated_duration_min INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.4. Exercises Table
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    type exercise_type_enum NOT NULL,
    question_text TEXT NOT NULL,
    question_audio_url VARCHAR(255), -- Nullable path to the spoken audio
    answer_text TEXT NOT NULL,
    difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
    skill_tag skill_enum NOT NULL,
    cefr_level cefr_level_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.5. Exercise Options Table (For MCQs, matching, or multiple choices)
CREATE TABLE exercise_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);


-- ==========================================
-- SECTION 3: User Progress & Results Tracker
-- ==========================================

-- 3.1. User Skill Progress Table
CREATE TABLE user_skill_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    completed_lessons_count INTEGER DEFAULT 0,
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
    last_practiced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_skill UNIQUE (user_id, skill_id)
);

-- 3.2. User Lesson Progress Table
CREATE TABLE user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    status lesson_status_enum NOT NULL DEFAULT 'not_started',
    attempts_count INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- 3.3. User Exercise Results Table
CREATE TABLE user_exercise_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    is_correct BOOLEAN NOT NULL,
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- SECTION 4: Gamification System
-- ==========================================

-- 4.1. User Stats Table (Daily Streaks, Levels, Total XP)
CREATE TABLE user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    xp_total INTEGER DEFAULT 0,
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE
);

-- 4.2. User Badges Table
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_code VARCHAR(50) NOT NULL, -- e.g., 'streak_champion_10', 'vocabulary_king'
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4.3. Leagues Table
CREATE TABLE leagues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'Bronze', 'Silver', 'Gold', 'Ruby', 'Obsidian'
    description TEXT
);

-- 4.4. League Members Table (Weekly Leaderboard rankings)
CREATE TABLE league_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    league_id UUID NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weekly_xp INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 1,
    CONSTRAINT unique_league_user UNIQUE (league_id, user_id)
);


-- ==========================================
-- SECTION 5: ML Metadata & Content Logs
-- ==========================================

-- 5.1. Exercise Machine Learning Metadata Table
CREATE TABLE exercise_ml_metadata (
    exercise_id UUID PRIMARY KEY REFERENCES exercises(id) ON DELETE CASCADE,
    difficulty_score REAL DEFAULT 0.5, -- Dynamic float estimated by ML models
    model_version VARCHAR(50) DEFAULT 'Zabando-Birdbrain-v1',
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.2. User Skill ML State Table (Adapting learning pathways)
CREATE TABLE user_skill_ml_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    ability_estimate REAL DEFAULT 0.0, -- User proficiency estimation (-3.0 to +3.0 logit range)
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_skill_ml UNIQUE (user_id, skill_id)
);

-- 5.3. Content Generation Logs Table (Gemini / AI Studio generation records)
CREATE TABLE content_generation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id UUID REFERENCES exercises(id) ON DELETE SET NULL,
    model_name VARCHAR(50) DEFAULT 'gemini-3.5-flash',
    prompt_hash VARCHAR(64),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- Performance Indexes for Quick Scaling
-- ==========================================
CREATE INDEX idx_skills_course ON skills(course_id);
CREATE INDEX idx_lessons_skill ON lessons(skill_id);
CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercise_options_exercise ON exercise_options(exercise_id);
CREATE INDEX idx_user_exercise_results_user ON user_exercise_results(user_id);
CREATE INDEX idx_league_members_weekly ON league_members(league_id, weekly_xp DESC);
