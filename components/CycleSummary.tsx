'use client';

import React from 'react';
import { PeriodLog } from '@/types';

interface CycleSummaryProps {
  logs: PeriodLog[];
}

export default function CycleSummary({ logs }: CycleSummaryProps) {
  if (logs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm text-center">
        <p className="text-gray-500 text-sm">Log your first period to unlock cycle predictions and insights!</p>
      </div>
    );
  }

  // Sort logs by start date (most recent first)
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const lastPeriod = sortedLogs[0];
  const lastStartDate = new Date(lastPeriod.startDate);
  const today = new Date();

  // Calculate current cycle day
  const diffTime = Math.abs(today.getTime() - lastStartDate.getTime());
  const currentCycleDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Predict next period (Assuming 28-day average cycle)
  const nextPeriodDate = new Date(lastStartDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + 28);

  // Predict ovulation (Approx. 14 days before next period)
  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() - 14);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Current Day */}
      <div className="bg-gradient-to-br from-rose-500 to-pink-500 text-white p-5 rounded-2xl shadow-sm">
        <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Current Cycle</p>
        <h3 className="text-3xl font-extrabold mt-1">Day {currentCycleDay}</h3>
        <p className="text-xs mt-2 opacity-90">Started on {formatDate(lastStartDate)}</p>
      </div>

      {/* Card 2: Next Period Prediction */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Next Period</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatDate(nextPeriodDate)}</h3>
        <p className="text-xs text-rose-500 mt-2 font-medium">~28 day average cycle</p>
      </div>

      {/* Card 3: Fertile Window */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Est. Ovulation</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatDate(ovulationDate)}</h3>
        <p className="text-xs text-purple-500 mt-2 font-medium">Approx. mid-cycle window</p>
      </div>
    </div>
  );
}