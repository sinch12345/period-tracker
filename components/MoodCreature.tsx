'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Heart, Coffee } from 'lucide-react';
import { PeriodLog } from '@/types';

interface MoodCreatureProps {
  logs: PeriodLog[];
}

export default function MoodCreature({ logs }: MoodCreatureProps) {
  // Derive current cycle state
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const lastLog = sortedLogs[0];
  const lastStart = lastLog ? new Date(lastLog.startDate) : new Date();
  const diffDays = Math.floor(
    Math.abs(new Date().getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24)
  );
  const currentDay = (diffDays % 28) + 1;

  // Determine Creature Persona & Visual Specs based on Cycle Phase
  let phaseName = 'Menstrual Phase';
  let auraColor = 'from-rose-400 via-pink-400 to-red-400';
  let glowColor = 'shadow-rose-500/40';
  let moodTitle = 'Resting & Recharging';
  let statusBadge = 'Low Energy • Cozy';
  let icon = <Coffee className="w-4 h-4 text-rose-500" />;
  let eyes = 'sleepy'; // sleepy | cheerful | glowing | peaceful

  if (currentDay > 5 && currentDay <= 13) {
    phaseName = 'Follicular Phase';
    auraColor = 'from-emerald-300 via-teal-400 to-cyan-400';
    glowColor = 'shadow-teal-400/40';
    moodTitle = 'Blooming Energy';
    statusBadge = 'Rising Vibe • Fresh';
    icon = <Sparkles className="w-4 h-4 text-teal-600" />;
    eyes = 'cheerful';
  } else if (currentDay > 13 && currentDay <= 15) {
    phaseName = 'Ovulatory Phase';
    auraColor = 'from-amber-300 via-rose-400 to-pink-500';
    glowColor = 'shadow-pink-500/50';
    moodTitle = 'Peak Radiance';
    statusBadge = 'High Energy • Vibrant';
    icon = <Sun className="w-4 h-4 text-amber-500" />;
    eyes = 'glowing';
  } else if (currentDay > 15) {
    phaseName = 'Luteal Phase';
    auraColor = 'from-indigo-400 via-purple-400 to-pink-400';
    glowColor = 'shadow-purple-400/40';
    moodTitle = 'Gentle Reflection';
    statusBadge = 'Winding Down • Calm';
    icon = <Moon className="w-4 h-4 text-purple-600" />;
    eyes = 'peaceful';
  }

  // Adjust animation pace based on phase
  const isPeriod = currentDay <= 5;
  const pulseDuration = isPeriod ? 4 : currentDay <= 15 ? 1.8 : 3;

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-rose-50/50 border border-rose-100/60 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/20 via-transparent to-pink-100/30 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white rounded-xl shadow-xs border border-rose-100">
            {icon}
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Your Body Avatar
            </h4>
            <p className="text-[11px] text-gray-500">{phaseName} (Day {currentDay})</p>
          </div>
        </div>

        <span className="text-[10px] font-semibold bg-white/80 border border-rose-100 text-rose-700 px-2.5 py-1 rounded-full shadow-2xs">
          {statusBadge}
        </span>
      </div>

      {/* Creature Graphic Stage */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Pulsing Aura Ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute w-36 h-36 rounded-full bg-gradient-to-r ${auraColor} blur-xl ${glowColor}`}
        />

        {/* Morphing Living Blob */}
        <motion.div
          animate={{
            borderRadius: [
              '60% 40% 30% 70%/60% 30% 70% 40%',
              '30% 60% 70% 40%/50% 60% 30% 60%',
              '60% 40% 30% 70%/60% 30% 70% 40%',
            ],
            y: isPeriod ? [0, 4, 0] : [0, -8, 0],
            scale: isPeriod ? [0.98, 1, 0.98] : [1, 1.04, 1],
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`w-32 h-32 bg-gradient-to-br ${auraColor} shadow-lg flex items-center justify-center relative cursor-pointer z-10`}
        >
          {/* Eyes SVG */}
          <svg className="w-16 h-16 text-white drop-shadow-sm" viewBox="0 0 100 100">
            {eyes === 'sleepy' && (
              <>
                {/* Sleepy curved eyes */}
                <path d="M 30 45 Q 40 55 50 45" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <path d="M 55 45 Q 65 55 75 45" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                {/* Soft Blush */}
                <circle cx="28" cy="56" r="6" fill="rgba(255,255,255,0.4)" />
                <circle cx="77" cy="56" r="6" fill="rgba(255,255,255,0.4)" />
              </>
            )}

            {eyes === 'cheerful' && (
              <>
                {/* Cheerful happy arches */}
                <path d="M 28 50 Q 38 35 48 50" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <path d="M 57 50 Q 67 35 77 50" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <circle cx="25" cy="58" r="7" fill="rgba(255,255,255,0.45)" />
                <circle cx="80" cy="58" r="7" fill="rgba(255,255,255,0.45)" />
              </>
            )}

            {eyes === 'glowing' && (
              <>
                {/* Bright open eyes with sparkle dots */}
                <circle cx="36" cy="46" r="7" fill="white" />
                <circle cx="68" cy="46" r="7" fill="white" />
                <path d="M 44 62 Q 52 70 60 62" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
              </>
            )}

            {eyes === 'peaceful' && (
              <>
                {/* Calm relaxed eyes */}
                <line x1="30" y1="46" x2="46" y2="46" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <line x1="58" y1="46" x2="74" y2="46" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <circle cx="28" cy="54" r="5" fill="rgba(255,255,255,0.35)" />
                <circle cx="76" cy="54" r="5" fill="rgba(255,255,255,0.35)" />
              </>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Mood Subtitle */}
      <div className="text-center z-10 mt-1">
        <h3 className="text-sm font-bold text-gray-800">{moodTitle}</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {isPeriod
            ? 'Aura is resting right now. Treat yourself gently today!'
            : 'Aura is syncing in real-time with your logged updates.'}
        </p>
      </div>
    </div>
  );
}