'use client';

import React, { useState, useEffect } from 'react';
import LogPeriodModal from '@/components/LogPeriodModal';
import CycleSummary from '@/components/CycleSummary';
import { PeriodLog } from '@/types';

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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-rose-600">Period Tracker</h1>
            <p className="text-gray-600 text-sm mt-1">Your data is saved privately on your device.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-xl shadow transition-all"
          >
            + Log Period
          </button>
        </div>

        {/* Dynamic Cycle Summary Cards */}
        <CycleSummary logs={logs} />

        {/* Recent Logs List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Logged Cycles</h2>
          {logs.length === 0 ? (
            <p className="text-gray-400 text-sm italic text-center py-6">
              No period logs yet. Click "+ Log Period" to record your first entry!
            </p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 flex justify-between items-center">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LogPeriodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLog}
      />
    </main>
  );
}