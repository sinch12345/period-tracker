'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PeriodLog } from '@/types';

interface LogPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: PeriodLog) => void;
}

const COMMON_SYMPTOMS = ['Cramps', 'Bloating', 'Headache', 'Mood Swings', 'Fatigue', 'Acne'];

export default function LogPeriodModal({ isOpen, onClose, onSave }: LogPeriodModalProps) {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: PeriodLog = {
      id: Date.now().toString(),
      startDate,
      endDate,
      flow,
      symptoms: selectedSymptoms,
      notes,
    };
    onSave(newLog);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-rose-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Log Period & Symptoms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-rose-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-rose-400"
                    required
                  />
                </div>
              </div>

              {/* Flow */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Flow Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'medium', 'heavy'] as const).map((level) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      key={level}
                      onClick={() => setFlow(level)}
                      className={`py-2 text-xs font-medium rounded-lg capitalize transition-colors ${
                        flow === level
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SYMPTOMS.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        type="button"
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          isSelected
                            ? 'bg-rose-100 text-rose-700 border border-rose-300 font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {symptom}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling today?"
                  rows={2}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-rose-400"
                />
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-lg shadow-md transition-all"
              >
                Save Entry
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}