import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AuraCycle | Private Period & Health Tracker',
  description: 'Track your biological cycle with privacy-first insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-rose-50/40 text-gray-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}