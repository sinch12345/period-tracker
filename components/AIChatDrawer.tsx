'use client';

import React, { useState } from 'react';
import { PeriodLog } from '@/types';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: PeriodLog[];
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AIChatDrawer({ isOpen, onClose, logs }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hey there! I'm Aura, your personal wellness companion. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, logs }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "Oops, I lost connection for a second. Try asking again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 border-l border-rose-100 dark:border-slate-800 shadow-2xl z-50 flex flex-col transition-all">
      {/* Header */}
      <div className="p-4 border-b border-rose-100 dark:border-slate-800 flex items-center justify-between bg-rose-50/50 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-800 dark:text-slate-100">Aura Health Companion</h2>
            <p className="text-[10px] text-gray-500 dark:text-slate-400">Powered by Gemini AI</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="p-1.5 bg-rose-100 dark:bg-rose-950/70 text-rose-600 rounded-lg h-fit">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-rose-500 text-white rounded-tr-none'
                  : 'bg-rose-50/60 dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-rose-100 dark:border-slate-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="p-1.5 bg-rose-500 text-white rounded-lg h-fit">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-rose-500 text-xs p-2 italic">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Aura is typing...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-rose-100 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Aura anything about your cycle, mood, or health..."
          className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-rose-400"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-xl transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}