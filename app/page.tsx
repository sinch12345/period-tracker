'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user session exists on client mount
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) {
      router.replace('/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    localStorage.setItem('aura_user', JSON.stringify({ email }));
    router.push('/dashboard');
  };

  // Prevent flash of login screen while checking local storage
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-pink-50/70 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50/70 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6"
      >
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl shadow-md">
            <Heart className="w-8 h-8 fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            AuraCycle
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Sign in to access your private cycle dashboard & health insights.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 dark:text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-slate-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-slate-800/60 rounded-xl text-rose-700 dark:text-rose-300 text-[11px]">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-rose-500" />
          <span>Private & Encrypted: All data stays on your local browser.</span>
        </div>
      </motion.div>
    </main>
  );
}