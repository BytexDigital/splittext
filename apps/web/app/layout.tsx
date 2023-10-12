import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Split Text',
  description: 'A React Package For Splitting Text Into Characters, Words And Lines.',
  icons: {
    icon: '_static/favicon.ico',
    apple: '_static/apple-touch-icon.png',
  },
  manifest: '_static/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
