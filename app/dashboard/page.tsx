'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MoodCreature from '@/components/MoodCreature';
import AIChatDrawer from '@/components/AIChatDrawer';
import InsightEngine from '@/components/InsightEngine';
import { PeriodLog } from '@/types';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Sun, Moon, Calendar as CalendarIcon, Heart, User } from 'lucide-react';

export default function DashboardPage() {
  const [logs, setLogs] = useState<PeriodLog[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPartnerSharingActive, setIsPartnerSharingActive] = useState(false);

  useEffect(() => {
    // Check local storage or partner settings on mount
    const partnerSession = localStorage.getItem('aura_partner_settings');
    if (partnerSession) {
      try {
        const parsed = JSON.parse(partnerSession);
        setIsPartnerSharingActive(parsed.isEnabled ?? false);
      } catch (e) {
        console.error('Failed to parse partner settings', e);
      }
    }
  }, []);

  // Modal form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');

  

  useEffect(() => {
    const savedTheme = localStorage.getItem('aura_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedLogs = localStorage.getItem('period_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error('Failed to parse period logs', e);
      }
    }

    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) setIsLoggedIn(true);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aura_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aura_theme', 'light');
    }
  };

  const handleUserAuth = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/';
  };

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    const newLog: PeriodLog = {
      id: Date.now().toString(),
      startDate,
      endDate,
      flow,
      symptoms: selectedSymptoms,
      sleepHours,
      stressLevel,
      notes,
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('period_logs', JSON.stringify(updatedLogs));

    setStartDate('');
    setEndDate('');
    setFlow('medium');
    setSelectedSymptoms([]);
    setSleepHours(7);
    setStressLevel('medium');
    setNotes('');
    setIsModalOpen(false);
  };

  const symptomOptions = ['Cramps', 'Fatigue', 'Bloating', 'Mood Swings', 'Headache', 'Acne'];

  return (
    <main className="min-h-screen bg-pink-50/70 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <Navbar activeTab="dashboard" />

        {/* Hero Header */}
        <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
              Welcome to AuraCycle <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline" />
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Your intelligent, private period & hormonal health companion.
            </p>

          {isPartnerSharingActive && (
      <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-full text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Partner Mode Active</span>
      </div>
    )}
  
            
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUserAuth}
              className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                isLoggedIn
                  ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
                  : 'bg-white dark:bg-slate-900 border-rose-100 dark:border-slate-800 text-gray-700 dark:text-slate-300'
              }`}
            >
              <User className="w-4 h-4 text-rose-500" />
              <span>{isLoggedIn ? 'Account' : 'Log In'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-400'
                  : 'bg-white border-rose-100 text-gray-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-500" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-2xl shadow-md shadow-rose-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Log Period</span>
            </motion.button>
          </div>
        </div>

        {/* Mood Creature */}
        <MoodCreature logs={logs} />

        {/* Insight Engine Card */}
        <InsightEngine logs={logs} />

        {/* Recent Cycle Logs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-rose-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-rose-500" />
            Recent Cycle Logs
          </h2>

          {logs.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-rose-200 dark:border-slate-800 rounded-xl">
              <p className="text-gray-400 dark:text-slate-500 text-xs italic">
                No logs recorded yet. Click "+ Log Period" to record your first entry!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl border border-rose-100 dark:border-slate-800 bg-rose-50/40 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between sm:items-center gap-2"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-800 dark:text-slate-200">
                      {log.startDate} → {log.endDate}
                    </span>
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold capitalize">
                      {log.flow} Flow
                    </span>
                    {log.sleepHours && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold">
                        {log.sleepHours}h Sleep
                      </span>
                    )}
                    {log.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {log.symptoms.map((symptom) => (
                          <span
                            key={symptom}
                            className="text-[10px] bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-700 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {log.notes && (
                    <p className="text-xs italic text-gray-500 dark:text-slate-400 max-w-xs">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating AI Drawer Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsAIChatOpen(true)}
          className="px-5 py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-rose-500/40 flex items-center gap-2 border border-white/30 backdrop-blur-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Explain My Body AI</span>
        </motion.button>
      </div>

      <AIChatDrawer isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} logs={logs} />

      {/* Log Modal with Sleep & Stress inputs */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-base font-bold text-gray-800 dark:text-slate-100">Log Cycle Entry</h3>

            <form onSubmit={handleSaveLog} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">Flow Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'medium', 'heavy'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFlow(f)}
                      className={`p-2 rounded-xl border text-center font-semibold capitalize transition ${
                        flow === f
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep & Stress Additions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">
                    Sleep ({sleepHours} hrs)
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={12}
                    step={0.5}
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">Stress Level</label>
                  <select
                    value={stressLevel}
                    onChange={(e) => setStressLevel(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full p-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">Symptoms</label>
                <div className="flex flex-wrap gap-1.5">
                  {symptomOptions.map((symptom) => {
                    const selected = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => handleSymptomToggle(symptom)}
                        className={`px-3 py-1.5 rounded-full border text-[11px] font-medium transition ${
                          selected
                            ? 'bg-rose-100 dark:bg-rose-950/70 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                            : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400'
                        }`}
                      >
                        {symptom}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 dark:text-slate-400 mb-1 font-medium">Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mood, exercise, or general observations..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-md"
                >
                  Save Log
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}