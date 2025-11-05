import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
  title: 'DocuExtract AI',
  description: 'Personal Finance Tracker & AI Assistant',
};

// Define the Inter font for your main text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Define your local PP Neuebit font
const ppNeuebit = localFont({
  src: './fonts/PPNeuebit-Bold.otf', // <-- IMPORTANT: Make sure this filename matches your font file exactly
  variable: '--font-neuebit',
  display: 'swap',
  weight: '700'
});
const neueMontreal = localFont({
  src: './fonts/NeueMontreal-Regular.otf', // <-- IMPORTANT: Make sure this filename matches your font file exactly
  variable: '--font-neue-montreal',
  display: 'swap',
  weight: '400'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply both font variables to the body */}
      <body className={`${neueMontreal.variable} ${ppNeuebit.variable}`}>
        <div className="fixed inset-0 bg-gradient-to-b from-primary-dark from-60% to-walrus-green/10 -z-10"></div>
        {children}
      </body>
    </html>
  );
}