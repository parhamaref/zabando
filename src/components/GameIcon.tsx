"use client";

import React from "react";

interface GameIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function GameIcon({ name, className = "", size = 48 }: GameIconProps) {
  const iconName = name.toLowerCase().trim();

  // Draw cute cartoon eyes with white highlight
  const renderEyes = (cx1: number, cy1: number, cx2: number, cy2: number, r: number = 8, look: "normal" | "excited" | "shy" | "worried" | "happy" | "closed" = "normal") => {
    if (look === "happy" || look === "closed") {
      // Happy arches
      return (
        <g>
          <path
            d={`M ${cx1 - r} ${cy1} Q ${cx1} ${cy1 - r} ${cx1 + r} ${cy1}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx2 - r} ${cy2} Q ${cx2} ${cy2 - r} ${cx2 + r} ${cy2}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (look === "worried") {
      // Worried slanted eyes & eyebrows
      return (
        <g>
          {/* Eyebrows */}
          <path d={`M ${cx1 - r} ${cy1 - r - 2} Q ${cx1} ${cy1 - r - 4} ${cx1 + r} ${cy1 - r}`} fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M ${cx2 - r} ${cy2 - r} Q ${cx2} ${cy2 - r - 4} ${cx2 + r} ${cy2 - r - 2}`} fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eye 1 */}
          <ellipse cx={cx1} cy={cy1} rx={r} ry={r + 2} fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx={cx1 + 1} cy={cy1 + 1} rx={r/2} ry={r/2 + 1} fill="#1E293B" />
          <circle cx={cx1 - r/4} cy={cy1 - r/4} r={r/4} fill="#FFFFFF" />
          {/* Eye 2 */}
          <ellipse cx={cx2} cy={cy2} rx={r} ry={r + 2} fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx={cx2 - 1} cy={cy2 + 1} rx={r/2} ry={r/2 + 1} fill="#1E293B" />
          <circle cx={cx2 - r/4} cy={cy2 - r/4} r={r/4} fill="#FFFFFF" />
        </g>
      );
    }

    return (
      <g>
        {/* Eye Left */}
        <circle cx={cx1} cy={cy1} r={r} fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
        <circle cx={cx1 + (look === "excited" ? 0 : 1.5)} cy={cy1 + (look === "excited" ? -1 : 1)} r={r * 0.55} fill="#1E293B" />
        <circle cx={cx1 - r * 0.25} cy={cy1 - r * 0.25} r={r * 0.25} fill="#FFFFFF" />

        {/* Eye Right */}
        <circle cx={cx2} cy={cy2} r={r} fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
        <circle cx={cx2 - (look === "excited" ? 0 : 1.5)} cy={cy2 + (look === "excited" ? -1 : 1)} r={r * 0.55} fill="#1E293B" />
        <circle cx={cx2 - r * 0.25} cy={cy2 - r * 0.25} r={r * 0.25} fill="#FFFFFF" />
      </g>
    );
  };

  const renderGloss = (cx: number, cy: number, rx: number, ry: number, angle: number = -30) => {
    return (
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="#FFFFFF"
        fillOpacity="0.4"
        transform={`rotate(${angle} ${cx} ${cy})`}
      />
    );
  };

  const svgStyle = { width: size, height: size };

  switch (iconName) {
    // ==========================================
    // GAMIFICATION ICONS
    // ==========================================
    case "xp_orb":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="xpGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#84D8FF" />
              <stop offset="60%" stopColor="#1CB0F6" />
              <stop offset="100%" stopColor="#0079B8" />
            </radialGradient>
          </defs>
          {/* Main blue glossy orb */}
          <circle cx="50" cy="50" r="42" fill="url(#xpGrad)" stroke="#1E293B" strokeWidth="4" />
          {/* Gloss overlay */}
          {renderGloss(35, 30, 16, 8, -25)}
          {renderGloss(50, 84, 18, 5, 5)}
          {/* Eyes */}
          {renderEyes(40, 48, 60, 48, 8, "normal")}
          {/* Small smile */}
          <path d="M 46 62 Q 50 66 54 62" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Inner power sparks */}
          <circle cx="28" cy="70" r="3" fill="#FFFFFF" opacity="0.6" />
          <circle cx="72" cy="30" r="4" fill="#FFFFFF" opacity="0.7" />
        </svg>
      );

    case "streak_flame":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FF4B4B" />
              <stop offset="60%" stopColor="#FF9600" />
              <stop offset="100%" stopColor="#FFD000" />
            </linearGradient>
            <linearGradient id="flameInnerGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FF9600" />
              <stop offset="100%" stopColor="#FFE066" />
            </linearGradient>
          </defs>
          {/* Main outer orange flame */}
          <path
            d="M 50 8 C 22 25 12 55 24 78 C 32 94 68 94 76 78 C 88 55 78 25 50 8 Z"
            fill="url(#flameGrad)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Inner yellow core */}
          <path
            d="M 50 30 C 35 42 28 60 36 76 C 40 84 60 84 64 76 C 72 60 65 42 50 30 Z"
            fill="url(#flameInnerGrad)"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Gloss highlight on top-left of flame */}
          <path d="M 32 45 Q 26 55 30 68" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
          {/* Eyes */}
          {renderEyes(42, 54, 58, 54, 7.5, "excited")}
          {/* Wide excited smile */}
          <path d="M 44 67 Q 50 76 56 67 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M 47 70 Q 50 73 53 70" fill="none" stroke="#FF8A8A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "level_star":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="starGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="70%" stopColor="#FBC02D" />
              <stop offset="100%" stopColor="#F57F17" />
            </radialGradient>
          </defs>
          {/* Tilted star with rounded joints and cute shape */}
          <g transform="rotate(-10 50 50)">
            <path
              d="M 50 10 L 61 35 L 88 38 L 68 57 L 73 84 L 50 70 L 27 84 L 32 57 L 12 38 L 39 35 Z"
              fill="url(#starGrad)"
              stroke="#1E293B"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* White glossy ellipse */}
            {renderGloss(40, 28, 10, 5, -15)}
            {/* Playful cartoon eyes */}
            {renderEyes(40, 46, 60, 46, 8, "normal")}
            {/* Smiling mouth */}
            <path d="M 44 58 Q 50 64 56 58" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cute cheeks */}
            <circle cx="30" cy="54" r="3.5" fill="#FF8A8A" opacity="0.8" />
            <circle cx="70" cy="54" r="3.5" fill="#FF8A8A" opacity="0.8" />
          </g>
        </svg>
      );

    case "badge_medal":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="goldMedal" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="60%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF6F00" />
            </radialGradient>
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="50%" stopColor="#FF4D79" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          {/* Red proud ribbon */}
          <path
            d="M 32 5 L 50 42 L 68 5 L 58 4 L 50 20 L 42 4 Z"
            fill="url(#ribbonGrad)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Ribbon tails hanging */}
          <path d="M 32 5 L 20 35 L 35 32 Z" fill="#BE123C" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 68 5 L 80 35 L 65 32 Z" fill="#9F1239" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

          {/* Round medal */}
          <circle cx="50" cy="58" r="30" fill="url(#goldMedal)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Inner ridge */}
          <circle cx="50" cy="58" r="23" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="4 2" />
          {/* Gloss overlay */}
          {renderGloss(40, 42, 10, 5, -20)}
          {/* Little eyes */}
          {renderEyes(42, 54, 58, 54, 5.5, "normal")}
          {/* Proud smile */}
          <path d="M 45 64 Q 50 69 55 64" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Sparkles */}
          <path d="M 28 42 L 30 46 L 34 48 L 30 50 L 28 54 L 26 50 L 22 48 L 26 46 Z" fill="#FFFFFF" />
        </svg>
      );

    // ==========================================
    // SKILL TREE ICONS
    // ==========================================
    case "skill_node":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="greenNode" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="60%" stopColor="#58CC02" />
              <stop offset="100%" stopColor="#3B8A01" />
            </radialGradient>
            <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
          {/* Leaf on head */}
          <g transform="translate(50, 16) rotate(-15)">
            <path
              d="M 0 0 C -15 -10 -15 -30 0 -35 C 15 -30 15 -10 0 0 Z"
              fill="url(#leafGrad)"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 0 0 Q 0 -20 0 -32" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          </g>
          {/* Small stalk */}
          <path d="M 50 15 Q 50 24 50 28" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />

          {/* Green circular body */}
          <circle cx="50" cy="56" r="34" fill="url(#greenNode)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Gloss */}
          {renderGloss(38, 40, 12, 6, -20)}
          {/* Happy eyes */}
          {renderEyes(40, 52, 60, 52, 7.5, "normal")}
          {/* Wide open happy mouth */}
          <path d="M 43 64 Q 50 74 57 64" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "skill_locked":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="greyNode" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="60%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          {/* Grey circular body */}
          <circle cx="50" cy="54" r="34" fill="url(#greyNode)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Gloss */}
          {renderGloss(38, 38, 12, 6, -20)}
          {/* Lock on forehead */}
          <g transform="translate(50, 22) scale(0.9)">
            {/* Lock shackle */}
            <path d="M -8 -4 V -14 A 8 8 0 0 1 8 -14 V -4" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
            {/* Lock body */}
            <rect x="-12" y="-4" width="24" height="20" rx="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />
            {/* Keyhole */}
            <circle cx="0" cy="4" r="2.5" fill="#1E293B" />
            <path d="M 0 5 L 0 10" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Neutral/sad/locked expressions */}
          {renderEyes(38, 60, 62, 60, 7, "normal")}
          {/* Shy tiny mouth line */}
          <path d="M 45 70 H 55" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "skill_completed":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="goldNode" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#BEF264" />
              <stop offset="60%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#3F6212" />
            </radialGradient>
            <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
          </defs>
          {/* Shiny gold crown */}
          <g transform="translate(50, 21) scale(1.1)">
            <path
              d="M -16 0 L -22 -14 L -8 -7 L 0 -18 L 8 -7 L 22 -14 L 16 0 Z"
              fill="url(#crownGrad)"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Little crown jewels */}
            <circle cx="-22" cy="-14" r="2" fill="#EF4444" />
            <circle cx="0" cy="-18" r="2.5" fill="#3B82F6" />
            <circle cx="22" cy="-14" r="2" fill="#EF4444" />
          </g>

          {/* Completed green circular body */}
          <circle cx="50" cy="58" r="34" fill="url(#goldNode)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Gloss */}
          {renderGloss(38, 42, 12, 6, -20)}
          {/* Closed laughing happy eyes */}
          {renderEyes(40, 54, 60, 54, 8, "happy")}
          {/* Large excited open mouth */}
          <path d="M 40 64 Q 50 78 60 64 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2" />
          <path d="M 45 68 Q 50 72 55 68" fill="none" stroke="#FF8A8A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big sparkles near head */}
          <path d="M 12 25 L 15 28 L 18 25 L 15 22 Z" fill="#FFD700" />
          <path d="M 85 30 L 88 33 L 91 30 L 88 27 Z" fill="#FFD700" />
        </svg>
      );

    case "skill_path":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          {/* Thick green wavy cartoon path */}
          <path
            d="M 10 75 Q 30 25 50 55 T 90 25"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 10 75 Q 30 25 50 55 T 90 25"
            fill="none"
            stroke="#1E293B"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 16"
            className="animate-pulse"
          />
          {/* Dark outline for entire path path */}
          <path
            d="M 10 75 Q 30 25 50 55 T 90 25"
            fill="none"
            stroke="#1E293B"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ zIndex: -1, opacity: 0.15 }}
          />

          {/* Tiny dot character 1 */}
          <g transform="translate(15, 70)">
            <circle cx="0" cy="0" r="7" fill="#F43F5E" stroke="#1E293B" strokeWidth="2" />
            <circle cx="-2" cy="-1" r="1.5" fill="#FFFFFF" />
            <circle cx="2" cy="-1" r="1.5" fill="#FFFFFF" />
            <path d="M -2 2 Q 0 4 2 2" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          </g>

          {/* Tiny dot character 2 */}
          <g transform="translate(50, 55)">
            <circle cx="0" cy="0" r="7" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
            <circle cx="-2" cy="-1" r="1.5" fill="#FFFFFF" />
            <circle cx="2" cy="-1" r="1.5" fill="#FFFFFF" />
            <path d="M -2 2 Q 0 4 2 2" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          </g>

          {/* Tiny dot character 3 */}
          <g transform="translate(85, 30)">
            <circle cx="0" cy="0" r="7" fill="#EAB308" stroke="#1E293B" strokeWidth="2" />
            <circle cx="-2" cy="-1" r="1.5" fill="#FFFFFF" />
            <circle cx="2" cy="-1" r="1.5" fill="#FFFFFF" />
            <path d="M -2 2 Q 0 4 2 2" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          </g>
        </svg>
      );

    // ==========================================
    // LEADERBOARD ICONS
    // ==========================================
    case "rank_crown_gold":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="goldCrown" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="65%" stopColor="#FBC02D" />
              <stop offset="100%" stopColor="#E65100" />
            </radialGradient>
          </defs>
          <path
            d="M 12 75 L 8 40 L 32 54 L 50 25 L 68 54 L 92 40 L 88 75 Z"
            fill="url(#goldCrown)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Base strip */}
          <rect x="12" y="72" width="76" height="12" rx="4" fill="#E65100" stroke="#1E293B" strokeWidth="4" />
          <circle cx="30" cy="78" r="3" fill="#E11D48" />
          <circle cx="50" cy="78" r="3" fill="#3B82F6" />
          <circle cx="70" cy="78" r="3" fill="#E11D48" />
          {/* Peak jewels */}
          <circle cx="8" cy="40" r="5" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="25" r="6" fill="#3B82F6" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="92" cy="40" r="5" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
          {/* Gloss */}
          {renderGloss(35, 45, 8, 3, -20)}
          {/* Eyes on crown body */}
          {renderEyes(40, 56, 60, 56, 6, "normal")}
          {/* Confident smile */}
          <path d="M 44 65 Q 52 65 54 62" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "rank_crown_silver":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="silverCrown" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="65%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </radialGradient>
          </defs>
          <path
            d="M 12 75 L 8 40 L 32 54 L 50 25 L 68 54 L 92 40 L 88 75 Z"
            fill="url(#silverCrown)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Base strip */}
          <rect x="12" y="72" width="76" height="12" rx="4" fill="#475569" stroke="#1E293B" strokeWidth="4" />
          <circle cx="30" cy="78" r="3" fill="#EC4899" />
          <circle cx="50" cy="78" r="3" fill="#06B6D4" />
          <circle cx="70" cy="78" r="3" fill="#EC4899" />
          {/* Peak jewels */}
          <circle cx="8" cy="40" r="5" fill="#06B6D4" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="25" r="6" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="92" cy="40" r="5" fill="#06B6D4" stroke="#1E293B" strokeWidth="2.5" />
          {/* Gloss */}
          {renderGloss(35, 45, 8, 3, -20)}
          {/* Shy eyes */}
          {renderEyes(40, 56, 60, 56, 6, "shy")}
          {/* Cute shy smile */}
          <path d="M 46 64 Q 50 67 54 64" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "rank_crown_bronze":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="bronzeCrown" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFCC80" />
              <stop offset="65%" stopColor="#B07D62" />
              <stop offset="100%" stopColor="#7F4F35" />
            </radialGradient>
          </defs>
          <path
            d="M 12 75 L 8 40 L 32 54 L 50 25 L 68 54 L 92 40 L 88 75 Z"
            fill="url(#bronzeCrown)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Base strip */}
          <rect x="12" y="72" width="76" height="12" rx="4" fill="#7F4F35" stroke="#1E293B" strokeWidth="4" />
          <circle cx="30" cy="78" r="3" fill="#10B981" />
          <circle cx="50" cy="78" r="3" fill="#F59E0B" />
          <circle cx="70" cy="78" r="3" fill="#10B981" />
          {/* Peak jewels */}
          <circle cx="8" cy="40" r="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="25" r="6" fill="#10B981" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="92" cy="40" r="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
          {/* Gloss */}
          {renderGloss(35, 45, 8, 3, -20)}
          {/* Cute round eyes */}
          {renderEyes(40, 56, 60, 56, 6.5, "normal")}
          {/* Surprised tiny 'o' mouth */}
          <circle cx="50" cy="65" r="3" fill="#1E293B" />
        </svg>
      );

    case "league_badge":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          {/* Shield path */}
          <path
            d="M 18 12 L 50 4 L 82 12 Q 82 54 50 88 Q 18 54 18 12 Z"
            fill="url(#shieldGrad)"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Inner details */}
          <path
            d="M 26 18 L 50 11 L 74 18 Q 74 50 50 78 Q 26 50 26 18 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
          {/* Eyes inside shield */}
          {renderEyes(40, 36, 60, 36, 7.5, "normal")}
          {/* Smiling mouth */}
          <path d="M 44 48 Q 50 54 56 48" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Gloss top left */}
          {renderGloss(32, 22, 10, 4, -15)}
        </svg>
      );

    // ==========================================
    // PROFILE ICONS
    // ==========================================
    case "profile_avatar":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="avatarBody" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="60%" stopColor="#58CC02" />
              <stop offset="100%" stopColor="#22C55E" />
            </radialGradient>
          </defs>
          {/* Small cartoon hat (orange cap) */}
          <path d="M 32 25 Q 50 5 68 25 Z" fill="#F97316" stroke="#1E293B" strokeWidth="4.5" />
          <circle cx="50" cy="11" r="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />

          {/* Green circular body (Om Nom styled monster) */}
          <circle cx="50" cy="58" r="34" fill="url(#avatarBody)" stroke="#1E293B" strokeWidth="5" />
          {/* Gloss */}
          {renderGloss(38, 42, 12, 6, -20)}
          {/* Expressive huge googly eyes */}
          {renderEyes(38, 52, 62, 52, 9.5, "normal")}
          {/* Cute open mouth with single baby tooth */}
          <path d="M 42 66 Q 50 78 58 66 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2" />
          {/* Tiny tooth */}
          <path d="M 45 66 L 47 70 L 49 66 Z" fill="#FFFFFF" />
        </svg>
      );

    case "language_flag":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Wooden Flag pole */}
          <line x1="20" y1="90" x2="20" y2="10" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <circle cx="20" cy="10" r="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />

          {/* Wavy cartoon flag fabric */}
          <path
            d="M 20 18 Q 40 10 60 20 T 90 14 L 90 56 Q 70 60 50 50 T 20 54 Z"
            fill="#3B82F6"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Wavy red stripes on the flag */}
          <path
            d="M 20 30 Q 40 22 60 32 T 90 26 L 90 42 Q 70 46 50 36 T 20 40 Z"
            fill="#EF4444"
          />
          {/* Small cute eyes on the fabric */}
          {renderEyes(44, 30, 60, 32, 4.5, "normal")}
          <path d="M 49 39 Q 52 41 55 39" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "activity_bar":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Bar 1 - Purple (Small creature) */}
          <g transform="translate(15, 45)">
            <rect x="0" y="0" width="16" height="40" rx="6" fill="#A855F7" stroke="#1E293B" strokeWidth="3" />
            <circle cx="5" cy="8" r="2.5" fill="#FFFFFF" />
            <circle cx="11" cy="8" r="2.5" fill="#FFFFFF" />
            <circle cx="5" cy="8" r="1" fill="#000000" />
            <circle cx="11" cy="8" r="1" fill="#000000" />
            <path d="M 6 12 Q 8 14 10 12" stroke="#1E293B" strokeWidth="1.5" fill="none" />
          </g>

          {/* Bar 2 - Green (Tall creature) */}
          <g transform="translate(42, 20)">
            <rect x="0" y="0" width="16" height="65" rx="6" fill="#22C55E" stroke="#1E293B" strokeWidth="3" />
            <circle cx="5" cy="8" r="3" fill="#FFFFFF" />
            <circle cx="11" cy="8" r="3" fill="#FFFFFF" />
            <circle cx="5" cy="8" r="1.5" fill="#000000" />
            <circle cx="11" cy="8" r="1.5" fill="#000000" />
            <path d="M 5 13 Q 8 16 11 13" stroke="#1E293B" strokeWidth="2" fill="none" />
          </g>

          {/* Bar 3 - Orange (Medium creature) */}
          <g transform="translate(69, 32)">
            <rect x="0" y="0" width="16" height="53" rx="6" fill="#F97316" stroke="#1E293B" strokeWidth="3" />
            <circle cx="5" cy="8" r="2.5" fill="#FFFFFF" />
            <circle cx="11" cy="8" r="2.5" fill="#FFFFFF" />
            <circle cx="5" cy="8" r="1" fill="#000000" />
            <circle cx="11" cy="8" r="1" fill="#000000" />
            <path d="M 6 12 Q 8 14 10 12" stroke="#1E293B" strokeWidth="1.5" fill="none" />
          </g>

          {/* Ground shadow line */}
          <line x1="8" y1="86" x2="92" y2="86" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "skill_progress_leaf":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="leafGreenGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="60%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
          </defs>
          {/* Main Leaf shape */}
          <path
            d="M 50 90 C 15 70 10 30 50 10 C 90 30 85 70 50 90 Z"
            fill="url(#leafGreenGrad)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Main Leaf stem */}
          <path d="M 50 90 V 10" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Gloss overlay */}
          {renderGloss(35, 35, 12, 6, -35)}
          {/* Cute cartoon eyes */}
          {renderEyes(40, 48, 60, 48, 7, "normal")}
          {/* Smiling mouth */}
          <path d="M 44 58 Q 50 63 56 58" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // ==========================================
    // NOTIFICATION ICONS
    // ==========================================
    case "notif_bell":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="bellGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="65%" stopColor="#FBC02D" />
              <stop offset="100%" stopColor="#E65100" />
            </radialGradient>
          </defs>
          {/* Bell loop */}
          <path d="M 42 20 Q 50 10 58 20" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
          {/* Main Bell Body */}
          <path
            d="M 50 18 C 28 24 24 58 18 72 C 30 76 70 76 82 72 C 76 58 72 24 50 18 Z"
            fill="url(#bellGrad)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Clapper at the bottom */}
          <circle cx="50" cy="80" r="9" fill="#E65100" stroke="#1E293B" strokeWidth="4.5" />

          {/* Gloss */}
          {renderGloss(38, 32, 10, 4, -15)}

          {/* Excited eyes */}
          {renderEyes(40, 44, 60, 44, 7.5, "excited")}
          {/* Ringing/Laughing Open Mouth */}
          <circle cx="50" cy="56" r="4.5" fill="#1E293B" />
        </svg>
      );

    case "notif_success":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="notifSuccess" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="60%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </radialGradient>
          </defs>
          {/* Green round creature */}
          <circle cx="50" cy="50" r="42" fill="url(#notifSuccess)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Gloss */}
          {renderGloss(35, 26, 15, 7, -20)}
          {/* Closed happy eyes */}
          {renderEyes(40, 44, 60, 44, 8, "happy")}
          {/* White checkmark on belly */}
          <circle cx="50" cy="70" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <path d="M 44 69 L 48 73 L 57 64" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "notif_warning":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="notifWarning" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFB060" />
              <stop offset="65%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#C2410C" />
            </radialGradient>
          </defs>
          {/* Orange teardrop warning creature */}
          <path
            d="M 50 12 C 20 40 18 84 50 88 C 82 84 80 40 50 12 Z"
            fill="url(#notifWarning)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Gloss */}
          {renderGloss(40, 26, 12, 5, -25)}
          {/* Worried face */}
          {renderEyes(38, 48, 62, 48, 7.5, "worried")}
          {/* Exclamation point on belly */}
          <rect x="47" y="58" width="6" height="12" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="76" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
        </svg>
      );

    case "notif_xp_boost":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="boostGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0891B2" />
            </radialGradient>
          </defs>
          {/* Little flying wings */}
          <path d="M 16 48 C 2 34 8 20 22 38 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 84 48 C 98 34 92 20 78 38 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

          {/* Flying blue orb */}
          <circle cx="50" cy="50" r="34" fill="url(#boostGrad)" stroke="#1E293B" strokeWidth="4.5" />
          {/* Gloss */}
          {renderGloss(38, 30, 12, 6, -20)}
          {/* Excited eyes */}
          {renderEyes(40, 46, 60, 46, 7, "excited")}
          {/* Laughing open mouth */}
          <path d="M 44 56 Q 50 63 56 56 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="1" />
          {/* XP Label floating */}
          <g transform="translate(50, 72) scale(0.8)">
            <rect x="-16" y="-8" width="32" height="14" rx="4" fill="#EAB308" stroke="#1E293B" strokeWidth="2" />
            <text x="0" y="2" fill="#1E293B" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">2X</text>
          </g>
        </svg>
      );

    // ==========================================
    // RULE ENGINE ICONS
    // ==========================================
    case "rule_book":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          {/* Book pages edge showing */}
          <path d="M 28 84 L 84 84 L 88 12 L 28 12 Z" fill="#FFFBEB" stroke="#1E293B" strokeWidth="4.5" />
          {/* Wavy pages ridges */}
          <line x1="84" y1="12" x2="84" y2="84" stroke="#1E293B" strokeWidth="2" />
          {/* Book Spine cover */}
          <path
            d="M 18 12 H 30 V 84 H 18 C 14 84 14 12 18 12 Z"
            fill="#166534"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Book main cover face */}
          <path
            d="M 30 12 H 78 V 84 H 30 Z"
            fill="url(#bookCover)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Yellow gear cover icon */}
          <g transform="translate(54, 30) scale(0.65)">
            <path
              d="M -6 -18 H 6 L 8 -12 L 14 -14 L 18 -8 L 12 -6 L 16 0 L 12 6 L 18 8 L 14 14 L 8 12 L 6 18 H -6 L -8 12 L -14 14 L -18 8 L -12 6 L -16 0 L -12 -6 L -18 -8 L -14 -14 L -8 -12 Z"
              fill="#F59E0B"
              stroke="#1E293B"
              strokeWidth="4"
            />
            <circle cx="0" cy="0" r="5" fill="#FFFBEB" stroke="#1E293B" strokeWidth="3" />
          </g>
          {/* Eyes on book cover */}
          {renderEyes(44, 52, 64, 52, 6, "normal")}
          <path d="M 50 62 Q 54 65 58 62" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "rule_simulator":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="simBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* Simulator Box Cabinet */}
          <rect x="14" y="14" width="72" height="72" rx="14" fill="url(#simBg)" stroke="#1E293B" strokeWidth="4.5" />

          {/* Machine screen */}
          <rect x="22" y="22" width="56" height="30" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          {/* Screen wave graph line */}
          <path d="M 28 38 Q 36 28 44 38 T 60 38 T 72 35" fill="none" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />

          {/* Simulator eyes (on screen or cabinet?) cabinet face */}
          {renderEyes(38, 62, 62, 62, 6, "normal")}
          <path d="M 46 72 Q 50 75 54 72" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

          {/* Buttons below eyes */}
          <circle cx="28" cy="76" r="4.5" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <circle cx="50" cy="76" r="4.5" fill="#EAB308" stroke="#1E293B" strokeWidth="2" />
          <circle cx="72" cy="76" r="4.5" fill="#22C55E" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case "rule_history":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Notebook binder rings */}
          <g stroke="#64748B" strokeWidth="4" strokeLinecap="round">
            <path d="M 12 24 H 22" />
            <path d="M 12 38 H 22" />
            <path d="M 12 52 H 22" />
            <path d="M 12 66 H 22" />
            <path d="M 12 80 H 22" />
          </g>

          {/* Notebook main pages */}
          <rect x="20" y="12" width="64" height="76" rx="8" fill="#F8FAFC" stroke="#1E293B" strokeWidth="4.5" />
          {/* Notebook blue lines */}
          <line x1="30" y1="28" x2="74" y2="28" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="30" y1="38" x2="74" y2="38" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="30" y1="48" x2="74" y2="48" stroke="#E2E8F0" strokeWidth="2" />

          {/* Eyes on Notebook */}
          {renderEyes(42, 54, 62, 54, 6, "normal")}
          <path d="M 48 64 Q 52 67 56 64" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

          {/* Small clock symbol at bottom-right corner */}
          <g transform="translate(68, 68) scale(0.8)">
            <circle cx="0" cy="0" r="11" fill="#FFFBEB" stroke="#1E293B" strokeWidth="2" />
            <path d="M 0 -6 V 0 H 5" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case "rule_version":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Stacked sheets of paper */}
          {/* Under sheet */}
          <rect x="28" y="24" width="54" height="64" rx="6" fill="#94A3B8" stroke="#1E293B" strokeWidth="4" />
          {/* Middle sheet */}
          <rect x="20" y="18" width="54" height="64" rx="6" fill="#E2E8F0" stroke="#1E293B" strokeWidth="4" />
          {/* Top sheet */}
          <rect x="12" y="12" width="54" height="64" rx="6" fill="#A3E635" stroke="#1E293B" strokeWidth="4" />

          {/* Writing details on top page */}
          <line x1="22" y1="26" x2="48" y2="26" stroke="#1E293B" strokeWidth="2" />
          <line x1="22" y1="36" x2="40" y2="36" stroke="#1E293B" strokeWidth="2" />

          {/* Eyes on the top green sheet */}
          {renderEyes(34, 48, 52, 48, 5, "normal")}
          <path d="M 39 56 Q 43 59 47 56" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ==========================================
    // UI ICONS
    // ==========================================
    case "ui_home":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>
          {/* House body */}
          <rect x="20" y="44" width="60" height="44" rx="8" fill="#FEF3C7" stroke="#1E293B" strokeWidth="4.5" />
          {/* House door */}
          <rect x="42" y="60" width="16" height="28" rx="3" fill="#B45309" stroke="#1E293B" strokeWidth="3" />
          {/* Red Roof */}
          <path d="M 12 46 L 50 12 L 88 46 Z" fill="url(#roofGrad)" stroke="#1E293B" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Eyes on the roof */}
          {renderEyes(42, 34, 58, 34, 5.5, "normal")}
          <path d="M 47 40 Q 50 42 53 40" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "ui_settings":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <defs>
            <radialGradient id="gearGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          <g className="animate-spin" style={{ animationDuration: "12s" }}>
            {/* Gear outer with teeth */}
            <path
              d="M 50 14 C 52 14 53 16 54 18 C 58 17 62 19 64 21 C 66 19 68 18 70 19 C 71 21 70 23 69 25 C 72 28 74 31 75 35 C 77 34 79 33 81 35 C 82 36 82 39 81 41 C 82 45 82 49 81 53 C 82 55 82 58 81 59 C 79 61 77 60 75 59 C 74 63 72 66 69 69 C 70 71 71 73 70 75 C 68 76 66 75 64 73 C 62 75 58 77 54 76 C 53 78 52 80 50 80 C 48 80 47 78 46 76 C 42 77 38 75 36 73 C 34 75 32 76 30 75 C 29 73 30 71 31 69 C 28 66 26 63 25 59 C 23 60 21 61 19 59 C 18 58 18 55 19 53 C 18 49 18 45 19 41 C 18 39 18 36 19 35 C 21 33 23 34 25 35 C 26 31 28 28 31 25 C 30 23 29 21 30 19 C 32 18 34 19 36 21 C 38 19 42 17 46 18 C 47 16 48 14 50 14 Z"
              fill="url(#gearGrad)"
              stroke="#1E293B"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Gear central hole */}
            <circle cx="50" cy="50" r="16" fill="#FDFDFD" stroke="#1E293B" strokeWidth="4.5" />
          </g>

          {/* Cute eyes inside the center of the gear */}
          {renderEyes(45, 48, 55, 48, 4, "normal")}
          <path d="M 48 53 Q 50 55 52 53" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case "ui_back":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Back arrow shaft and head */}
          <path
            d="M 88 50 H 28 L 52 24"
            fill="none"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 28 50 L 52 76"
            fill="none"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Little eyes on shaft */}
          {renderEyes(66, 50, 78, 50, 3.5, "normal")}
        </svg>
      );

    case "ui_next":
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          {/* Forward arrow shaft and head */}
          <path
            d="M 12 50 H 72 L 48 24"
            fill="none"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 72 50 L 48 76"
            fill="none"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Eyes with smile */}
          {renderEyes(22, 50, 34, 50, 3.5, "normal")}
          <path d="M 26 55 Q 28 57 30 55" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      // Fallback simple icon representation using nice default smiley vector
      return (
        <svg viewBox="0 0 100 100" style={svgStyle} className={className}>
          <circle cx="50" cy="50" r="42" fill="#FDE047" stroke="#1E293B" strokeWidth="4.5" />
          {renderEyes(40, 46, 60, 46, 7.5, "normal")}
          <path d="M 42 62 Q 50 72 58 62" fill="none" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
  }
}
