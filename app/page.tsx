'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import LogPeriodModal from '@/components/LogPeriodModal';
import CycleSummary from '@/components/CycleSummary';
import CyclePhaseTracker from '@/components/CyclePhaseTracker';
import CalendarView from '@/components/CalendarView';
import { PeriodLog } from '@/types';
import { Plus, Sparkles, ShieldCheck } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  },
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<PeriodLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('period_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse logs', e);
      }
    }
  }, []);

  const handleSaveLog = (newLog: PeriodLog) => {
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('period_logs', JSON.stringify(updatedLogs));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/60 via-pink-50/20 to-rose-50/40 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Hero Header Card */}
        <motion.div 
          variants={itemVariants} 
          className="relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-rose-100/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-[11px] font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Personal Health Suite</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Cycle Overview</h1>
            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline" />
              End-to-end encrypted storage on device
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold rounded-2xl shadow-md shadow-rose-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Period</span>
          </motion.button>
        </motion.div>

        {/* Dynamic Cycle Summary Cards */}
        <motion.div variants={itemVariants}>
          <CycleSummary logs={logs} />
        </motion.div>

        {/* Cycle Phase Progress Bar */}
        <motion.div variants={itemVariants}>
          <CyclePhaseTracker logs={logs} />
        </motion.div>

        {/* Interactive Visual Calendar */}
        <motion.div variants={itemVariants}>
          <CalendarView logs={logs} />
        </motion.div>

        {/* Recent Logs List Card */}
        <motion.div 
          variants={itemVariants} 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-rose-100/80"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-800">Logged Cycles</h2>
            <span className="text-xs text-gray-400 font-medium">{logs.length} Entries</span>
          </div>

          {logs.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-rose-100 rounded-2xl">
              <p className="text-gray-400 text-xs italic">
                No period logs yet. Click "+ Log Period" to record your first entry!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/50 to-pink-50/30 border border-rose-100/60 flex justify-between items-center hover:border-rose-200 transition-all"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      {log.startDate} to {log.endDate}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-200/60 text-rose-800 font-bold capitalize">
                        {log.flow} flow
                      </span>
                      {log.symptoms.map((symptom) => (
                        <span 
                          key={symptom} 
                          className="text-[10px] text-gray-600 bg-white px-2 py-0.5 rounded-full border border-gray-100 font-medium"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <LogPeriodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLog}
      />
    </main>
  );
}