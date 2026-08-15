'use client';

import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addDays,
} from 'date-fns';
import { PeriodLog } from '@/types';

interface CalendarViewProps {
  logs: PeriodLog[];
}

export default function CalendarView({ logs }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Get most recent log for predictions
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const lastLog = sortedLogs[0];

  // Helper checks
  const isPeriodDay = (day: Date) => {
    return logs.some((log) => {
      const start = parseISO(log.startDate);
      const end = parseISO(log.endDate);
      return day >= start && day <= end;
    });
  };

  const isPredictedPeriodDay = (day: Date) => {
    if (!lastLog) return false;
    const lastStart = parseISO(lastLog.startDate);
    const predictedStart = addDays(lastStart, 28);
    const predictedEnd = addDays(predictedStart, 4);
    return day >= predictedStart && day <= predictedEnd;
  };

  const isPredictedOvulationDay = (day: Date) => {
    if (!lastLog) return false;
    const lastStart = parseISO(lastLog.startDate);
    const predictedOvulation = addDays(lastStart, 14);
    return isSameDay(day, predictedOvulation);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-600 hover:bg-rose-50 rounded-lg transition"
          >
            ←
          </button>
          <button
            onClick={nextMonth}
            className="p-2 text-gray-600 hover:bg-rose-50 rounded-lg transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
        <span>Thu</span><span>Fri</span><span>Sat</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isLogged = isPeriodDay(day);
          const isPredicted = isPredictedPeriodDay(day);
          const isOvulation = isPredictedOvulationDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);

          let bgStyle = 'bg-gray-50 text-gray-700';
          if (!isCurrentMonth) bgStyle = 'bg-gray-50/30 text-gray-300';
          if (isLogged) bgStyle = 'bg-rose-500 text-white font-bold shadow-sm';
          else if (isPredicted) bgStyle = 'bg-rose-100 text-rose-700 font-medium border border-rose-300';
          else if (isOvulation) bgStyle = 'bg-purple-100 text-purple-700 font-medium border border-purple-300';

          return (
            <div
              key={idx}
              className={`h-10 flex items-center justify-center rounded-xl text-xs transition-all ${bgStyle}`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span>Logged Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-200 border border-rose-300"></span>
          <span>Predicted Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-200 border border-purple-300"></span>
          <span>Est. Ovulation</span>
        </div>
      </div>
    </div>
  );
}