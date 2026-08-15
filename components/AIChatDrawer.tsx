'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Lock, RefreshCw } from 'lucide-react';
import { PeriodLog } from '@/types';
import { generateUserCycleContext } from '@/lib/aiContext';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: PeriodLog[];
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function AIChatDrawer({ isOpen, onClose, logs }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your private cycle assistant. Ask me anything about how you're feeling today, your current phase, or symptom insights based on your logged history.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const context = generateUserCycleContext(logs);

    // Dynamic response generation based on cycle context
    setTimeout(() => {
      let aiResponseText = "";
      const query = userMessage.text.toLowerCase();

      if (query.includes('tired') || query.includes('fatigue') || query.includes('exhausted')) {
        aiResponseText = `Based on your logs, you are currently around **Day ${context.match(/Day (\d+)/)?.[1] || '15'}** in your **${context.match(/Estimated Current Phase: (.*)/)?.[1] || 'cycle'}**.\n\nEnergy dips are common here due to fluctuating progesterone and low iron during period days. Make sure to hydrate and prioritize extra rest!`;
      } else if (query.includes('cramp') || query.includes('pain') || query.includes('hurt')) {
        aiResponseText = `I see your logged symptoms. During this phase of your cycle, uterine muscle contractions triggered by prostaglandins can cause severe cramping. Applying heat pads and staying hydrated with warm herbal teas will help ease muscle tightness.`;
      } else if (query.includes('ovulat') || query.includes('fertil')) {
        aiResponseText = `According to your recent period log starting on **${context.match(/Most Recent Period Start: (.*)/)?.[1] || 'date'}**, your estimated ovulation window occurs roughly around Day 14.`;
      } else {
        aiResponseText = `Looking at your recent entries (Phase: **${context.match(/Estimated Current Phase: (.*)/)?.[1] || 'Current Phase'}**), your body is experiencing natural hormonal shifts. Ensure you stay well-rested and drink plenty of fluids today!`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-rose-100 relative"
          >
            {/* Header */}
            <div className="p-4 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-xl shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    Explain My Body
                    <span className="text-[10px] bg-rose-200/60 text-rose-800 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5 inline" /> Secret AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Grounded in your private health logs</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Context Snippet */}
            <div className="px-4 py-2 bg-rose-100/40 border-b border-rose-100 text-[11px] text-rose-800 flex items-center justify-between">
              <span>Context synced with recent entries</span>
              <span className="font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Log Sync
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shadow-sm flex-shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-rose-500 border border-rose-100'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-tr-none'
                        : 'bg-white border border-rose-100 text-gray-700 rounded-tl-none'
                    }`}
                  >
                    {msg.text.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-rose-500 font-medium p-2 bg-white rounded-xl border border-rose-100 max-w-[150px]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing logs...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-rose-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cramps, fatigue, or cycle phase..."
                className="flex-1 py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-rose-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-md transition"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}