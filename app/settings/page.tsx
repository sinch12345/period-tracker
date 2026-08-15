'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Download, Trash2, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const handleExportData = () => {
    const data = localStorage.getItem('period_logs') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auracycle_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete all local period logs? This action cannot be undone.')) {
      localStorage.removeItem('period_logs');
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-rose-50/40 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <Navbar activeTab="settings" />

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Account & Privacy Settings</h1>
          <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">Manage your data preferences and backups.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-rose-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Privacy Active:</strong> All logs remain exclusively inside your browser's LocalStorage. No health data is sold or transmitted to third-party servers.
            </span>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-800 pt-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-slate-100">Data Controls</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition"
              >
                <Download className="w-4 h-4" />
                Export JSON Backup
              </button>

              <button
                onClick={handleClearData}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-900/50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear Local Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}