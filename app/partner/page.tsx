'use client';

import React from 'react';
import { Heart, Sparkles, Coffee, Calendar, ShieldCheck } from 'lucide-react';

export default function PartnerViewPage() {
  // Mock shared data payload adhering to Tier 1 & Tier 2 choices
  const partnerData = {
    isAccessValid: true,
    moodIndicator: 'Feeling Low Energy',
    cycleSeason: 'Autumn Phase (Luteal)',
    nudge: 'Bring over some warm tea or dessert tonight — extra care appreciated!',
    predictedStartDate: 'Oct 24th',
    symptomSummary: 'Mild physical discomfort reported',
    customNote: 'Working late tonight, looking forward to a quiet movie evening.',
  };

  if (!partnerData.isAccessValid) {
    return (
      <main className="min-h-screen bg-pink-50/70 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-rose-100 dark:border-slate-800 max-w-sm text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">Access Expired or Unlinked</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            This shared partner link is no longer active.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50/70 dark:bg-slate-950 p-6 flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="font-extrabold text-sm bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              AuraCycle Partner View
            </span>
          </div>
          <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded-md">
            Read Only
          </span>
        </div>

        {/* Status Snapshot */}
        <div className="space-y-3">
          <div className="p-4 bg-rose-50/50 dark:bg-slate-800/50 rounded-2xl border border-rose-100 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wider font-bold">
              Current Vibe & Season
            </span>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-800 dark:text-slate-100">
                {partnerData.moodIndicator}
              </h3>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-full border border-rose-100 dark:border-slate-700">
                {partnerData.cycleSeason}
              </span>
            </div>
          </div>

          {/* Auto Nudge */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900 flex items-start gap-3">
            <Coffee className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">
                Thoughtful Suggestion
              </span>
              <p className="text-xs text-indigo-950 dark:text-indigo-200 mt-0.5 leading-relaxed">
                {partnerData.nudge}
              </p>
            </div>
          </div>

          {/* Custom Note from Primary User */}
          {partnerData.customNote && (
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900 space-y-1">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                Personal Note
              </span>
              <p className="text-xs text-gray-700 dark:text-slate-300 italic">
                "{partnerData.customNote}"
              </p>
            </div>
          )}

          {/* Practical Planning */}
          <div className="p-3.5 bg-gray-50 dark:bg-slate-800/30 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-slate-400 font-medium">Expected Cycle Start</span>
            </div>
            <span className="font-bold text-gray-800 dark:text-slate-200">{partnerData.predictedStartDate}</span>
          </div>
        </div>

        <div className="text-center text-[11px] text-gray-400 dark:text-slate-500 flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>Privacy Guaranteed: Zero raw logs or health metrics shared.</span>
        </div>
      </div>
    </main>
  );
}