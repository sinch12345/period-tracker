'use client';

import React, { useState } from 'react';
import { PartnerSharingSettings } from '@/types';
import { ShieldAlert, Link, Copy, Check, Lock, EyeOff } from 'lucide-react';

export default function PartnerSettings() {
  const [settings, setSettings] = useState<PartnerSharingSettings>({
    isEnabled: false,
    shareMoodEnergy: false,
    shareCyclePhase: false,
    shareNudges: false,
    sharePredictedDates: false,
    shareGeneralSymptoms: false,
    sharePartnerNote: false,
    partnerNote: '',
  });

  const [copied, setCopied] = useState(false);

  const generateInviteCode = () => {
    const code = `AURA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setSettings((prev) => ({
      ...prev,
      isEnabled: true,
      inviteCode: code,
    }));
  };

  // Instant & Silent Revocation (No modal friction, immediate execution)
  const handleRevokeAccess = () => {
    setSettings({
      isEnabled: false,
      inviteCode: undefined,
      expiresAt: undefined,
      shareMoodEnergy: false,
      shareCyclePhase: false,
      shareNudges: false,
      sharePredictedDates: false,
      shareGeneralSymptoms: false,
      sharePartnerNote: false,
      partnerNote: '',
    });
    localStorage.removeItem('aura_partner_session');
  };

  const toggleSwitch = (key: keyof PartnerSharingSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-rose-100 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-rose-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-500" />
            Partner Mode Controls
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Share high-level wellness updates with zero raw data or surveillance.
          </p>
        </div>
        {settings.isEnabled && (
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full">
            Active Connection
          </span>
        )}
      </div>

      {!settings.isEnabled ? (
        <div className="text-center py-6 space-y-3">
          <p className="text-xs text-gray-600 dark:text-slate-400 max-w-sm mx-auto">
            Want your partner to understand your cycle without oversharing? Generate a private, revocable link.
          </p>
          <button
            onClick={generateInviteCode}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md hover:from-rose-600 hover:to-pink-600 transition"
          >
            Generate Partner Invite Link
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-xs">
          {/* Active Link Box */}
          <div className="p-3 bg-rose-50/50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-rose-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-rose-500" />
              <span className="font-mono font-bold text-gray-700 dark:text-slate-300">
                {settings.inviteCode}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://auracycle.app/partner?code=${settings.inviteCode}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg flex items-center gap-1 font-semibold text-gray-700 dark:text-slate-300"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Granular Toggles */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
              Sharing Permissions (Granular)
            </h3>

            {/* Tier 1 */}
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">Mood & Energy Indicator</span>
                  <p className="text-[11px] text-gray-500">Shows simple indicators like "Low Energy" or "Feeling Good"</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.shareMoodEnergy}
                  onChange={() => toggleSwitch('shareMoodEnergy')}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">Cycle Season Framing</span>
                  <p className="text-[11px] text-gray-500">Shows phase as "Autumn" or "Winter" (No raw dates or flow details)</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.shareCyclePhase}
                  onChange={() => toggleSwitch('shareCyclePhase')}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">Support Nudges</span>
                  <p className="text-[11px] text-gray-500">Generates helpful tips like "Be extra thoughtful today"</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.shareNudges}
                  onChange={() => toggleSwitch('shareNudges')}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>
            </div>

            {/* Tier 2 */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">Predicted Period Start</span>
                  <p className="text-[11px] text-gray-500">Helps partner plan trips & schedules</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.sharePredictedDates}
                  onChange={() => toggleSwitch('sharePredictedDates')}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">General Symptom Categories</span>
                  <p className="text-[11px] text-gray-500">Displays general tags ("Physical Discomfort") instead of specifics</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.shareGeneralSymptoms}
                  onChange={() => toggleSwitch('shareGeneralSymptoms')}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Instant One-Tap Silent Revocation */}
          <div className="pt-4 border-t border-rose-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
              <EyeOff className="w-4 h-4 text-gray-400" />
              <span>Silent revocation removes access immediately without notifying partner.</span>
            </div>
            <button
              onClick={handleRevokeAccess}
              className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-bold rounded-xl transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Revoke Access</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}