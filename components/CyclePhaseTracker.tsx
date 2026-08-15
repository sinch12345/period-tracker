'use client';

import React from 'react';
import { PeriodLog } from '@/types';

interface CyclePhaseTrackerProps {
  logs: PeriodLog[];
}

export default function CyclePhaseTracker({ logs }: CyclePhaseTrackerProps) {
  if (logs.length === 0) return null;

  // Get most recent log
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const lastStartDate = new Date(sortedLogs[0].startDate);
  const today = new Date();

  // Calculate current cycle day (bounded 1 to 28)
  const diffTime = Math.abs(today.getTime() - lastStartDate.getTime());
  const rawDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const currentDay = ((rawDay - 1) % 28) + 1;

  // Determine current phase details
  const getPhaseInfo = (day: number) => {
    if (day <= 5) {
      return {
        name: 'Menstrual Phase',
        color: 'bg-rose-500',
        textColor: 'text-rose-600',
        desc: 'Rest & hydration are key. Estrogen and progesterone levels are low.',
      };
    } else if (day <= 13) {
      return {
        name: 'Follicular Phase',
        color: 'bg-amber-400',
        textColor: 'text-amber-600',
        desc: 'Energy rising! Estrogen increases as follicles develop.',
      };
    } else if (day <= 15) {
      return {
        name: 'Ovulatory Phase',
        color: 'bg-purple-500',
        textColor: 'text-purple-600',
        desc: 'Peak energy & fertility window. LH surge triggers egg release.',
      };
    } else {
      return {
        name: 'Luteal Phase',
        color: 'bg-indigo-400',
        textColor: 'text-indigo-600',
        desc: 'Focus on light exercise & self-care. Progesterone peaks then drops.',
      };
    }
  };

  const phase = getPhaseInfo(currentDay);
  const progressPercent = Math.min(Math.max((currentDay / 28) * 100, 4), 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-gray-400">Current Phase</span>
          <h3 className={`text-xl font-bold ${phase.textColor}`}>{phase.name}</h3>
        </div>
        <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          Day {currentDay} of 28
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-4">{phase.desc}</p>

      {/* Visual Progress Bar */}
      <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
        <div className="w-[18%] bg-rose-400/30 border-r border-white h-full" title="Menstrual (Days 1-5)" />
        <div className="w-[28%] bg-amber-300/30 border-r border-white h-full" title="Follicular (Days 6-13)" />
        <div className="w-[7%] bg-purple-400/30 border-r border-white h-full" title="Ovulatory (Days 14-15)" />
        <div className="w-[47%] bg-indigo-300/30 h-full" title="Luteal (Days 16-28)" />

        {/* Dynamic Progress Indicator */}
        <div
          className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${phase.color}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Phase Scale Labels */}
      <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-2 px-0.5">
        <span>Menstrual</span>
        <span>Follicular</span>
        <span>Ovulation</span>
        <span>Luteal</span>
      </div>
    </div>
  );
}