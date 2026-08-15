import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en font-sans">
      <body className="min-h-screen bg-pink-50/70 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}