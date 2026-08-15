'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PeriodLog } from '@/types';
import { Activity, Calendar as CalendarIcon, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
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

  // Compute symptom occurrences
  const symptomCounts: { [key: string]: number } = {};
  logs.forEach((log) => {
    log.symptoms.forEach((symptom) => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });

  const symptomData = Object.keys(symptomCounts).map((key) => ({
    name: key,
    count: symptomCounts[key],
  }));

  // Flow distribution data
  const flowCounts = { light: 0, medium: 0, heavy: 0 };
  logs.forEach((log) => {
    if (log.flow in flowCounts) {
      flowCounts[log.flow as keyof typeof flowCounts]++;
    }
  });

  const COLORS = ['#F43F5E', '#FB7185', '#FDA4AF', '#E11D48', '#BE123C'];

  return (
    <main className="min-h-screen bg-rose-50/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cycle Analytics & Health Insights</h1>
          <p className="text-gray-500 text-xs mt-1">Visualize patterns and symptom frequency over time.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Logged</p>
              <h3 className="text-2xl font-bold text-gray-800">{logs.length} Cycles</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg. Cycle</p>
              <h3 className="text-2xl font-bold text-gray-800">28 Days</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Symptom</p>
              <h3 className="text-xl font-bold text-gray-800">
                {symptomData.length > 0 ? symptomData.sort((a, b) => b.count - a.count)[0].name : 'N/A'}
              </h3>
            </div>
          </div>
        </div>

        {/* Symptom Frequency Chart */}
        <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">Symptom Frequency</h2>
          {symptomData.length === 0 ? (
            <p className="text-gray-400 text-xs italic text-center py-10">
              No symptom data available yet. Log more cycles to see trends!
            </p>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={symptomData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #FFE4E6', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {symptomData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}