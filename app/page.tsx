'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // If user is already logged in, automatically send them to the dashboard
  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = isSignUp ? name : email.split('@')[0] || 'User';
    const userData = { name: userName, email };

    // Save user session
    localStorage.setItem('aura_user', JSON.stringify(userData));

    // Redirect to main tracker dashboard
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-rose-100 relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-rose-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg shadow-rose-500/30">
            <Heart className="w-7 h-7 fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">AuraCycle</h1>
          <p className="text-xs text-gray-500 mt-1">
            {isSignUp ? 'Create an account to begin tracking' : 'Sign in to access your personal dashboard'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-rose-400 transition"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-rose-400 transition"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-rose-400 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Mode Toggle */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-rose-600 font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Private & Encrypted Local Session</span>
        </div>
      </motion.div>
    </main>
  );
}