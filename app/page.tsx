'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import LogPeriodModal from '@/components/LogPeriodModal';
import CycleSummary from '@/components/CycleSummary';
import CyclePhaseTracker from '@/components/CyclePhaseTracker';
import CalendarView from '@/components/CalendarView';
import { PeriodLog } from '@/types';

// Container for staggered animations
// Container for staggered animations
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
    <main className="min-h-screen bg-rose-50/50 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-rose-600">Period Tracker</h1>
            <p className="text-gray-600 text-sm mt-1">Your data is saved privately on your device.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-xl shadow transition-all"
          >
            + Log Period
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

        {/* Recent Logs List */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Logged Cycles</h2>
          {logs.length === 0 ? (
            <p className="text-gray-400 text-sm italic text-center py-6">
              No period logs yet. Click "+ Log Period" to record your first entry!
            </p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {log.startDate} to {log.endDate}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-rose-200 text-rose-800 font-medium capitalize">
                        {log.flow} flow
                      </span>
                      {log.symptoms.map((symptom) => (
                        <span key={symptom} className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100">
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