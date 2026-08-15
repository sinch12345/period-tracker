'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BarChart3, Settings, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab?: 'dashboard' | 'analytics' | 'settings' | string;
}

export default function Navbar({ activeTab = 'dashboard' }: NavbarProps) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl p-3 shadow-sm flex items-center justify-between transition-colors duration-300">
      {/* App Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 px-2">
        <div className="p-2 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-xl shadow-xs">
          <Heart className="w-4 h-4 fill-white" />
        </div>
        <span className="font-bold text-sm bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          AuraCycle
        </span>
      </Link>

      

      {/* Nav Links */}
      <div className="flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-rose-600 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}