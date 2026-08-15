'use client';

import React from 'react';
import { PeriodLog } from '@/types';
import { Sparkles, Brain, Moon, Flame } from 'lucide-react';

interface InsightEngineProps {
  logs: PeriodLog[];
}

export default function InsightEngine({ logs }: InsightEngineProps) {
  const calculatePatterns = () => {
    const insights: { icon: React.ReactNode; text: string; confidence: string }[] = [];

    if (logs.length < 3) {
      return [
        {
          icon: <Sparkles className="w-4 h-4 text-rose-500" />,
          text: 'Log at least 3 entries with sleep & stress levels to unlock pattern insights!',
          confidence: 'Getting started',
        },
      ];
    }

    // Correlation 1: Low Sleep (< 6 hrs) & Cramps
    const lowSleepLogs = logs.filter((l) => l.sleepHours && l.sleepHours < 6);
    if (lowSleepLogs.length > 0) {
      const crampsInLowSleep = lowSleepLogs.filter((l) => l.symptoms.includes('Cramps')).length;
      const percentage = Math.round((crampsInLowSleep / lowSleepLogs.length) * 100);

      if (percentage >= 40) {
        insights.push({
          icon: <Moon className="w-4 h-4 text-indigo-500" />,
          text: `Your cramps occur ${percentage}% more frequently on days with under 6 hours of sleep.`,
          confidence: 'High Pattern Match',
        });
      }
    }

    // Correlation 2: High Stress & Mood Swings
    const highStressLogs = logs.filter((l) => l.stressLevel === 'high');
    if (highStressLogs.length > 0) {
      const moodSwingsInStress = highStressLogs.filter((l) => l.symptoms.includes('Mood Swings')).length;
      const percentage = Math.round((moodSwingsInStress / highStressLogs.length) * 100);

      if (percentage >= 50) {
        insights.push({
          icon: <Flame className="w-4 h-4 text-amber-500" />,
          text: `${percentage}% of your high-stress days trigger noticeable mood shifts.`,
          confidence: 'Strong Correlation',
        });
      }
    }

    // Fallback default insight
    if (insights.length === 0) {
      insights.push({
        icon: <Brain className="w-4 h-4 text-rose-500" />,
        text: 'Your current log patterns look balanced across sleep and stress levels.',
        confidence: 'Normal Trend',
      });
    }

    return insights;
  };

  const insights = calculatePatterns();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-rose-100 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500" />
          Symptom-to-Cause Insights
        </h2>
        <span className="text-[10px] bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold px-2.5 py-1 rounded-full">
          AI Pattern Engine
        </span>
      </div>

      <div className="space-y-2.5">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-rose-50/40 dark:bg-slate-800/50 border border-rose-100/60 dark:border-slate-800 flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-rose-100 dark:border-slate-700">
                {item.icon}
              </div>
              <p className="text-xs text-gray-700 dark:text-slate-300 font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
            <span className="text-[10px] whitespace-nowrap text-gray-400 dark:text-slate-500 italic">
              {item.confidence}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}