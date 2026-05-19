import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}