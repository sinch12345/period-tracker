'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import PartnerSettings from '@/components/PartnerSettings';
import { Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-pink-50/70 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <Navbar activeTab="settings" />

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-500" />
              Privacy & Sharing Settings
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Manage your local data controls and granular partner permissions.
            </p>
          </div>
        </div>

        {/* Partner Sharing Controls Component */}
        <PartnerSettings />
      </div>
    </main>
  );
}