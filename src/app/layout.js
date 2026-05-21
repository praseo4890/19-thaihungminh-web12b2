import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
 
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
 
export const metadata = {
  title: 'Off Script Store',
  description: 'Khám phá các sản phẩm bán chạy nhất',
  icons: { icon: '/logo.png' },
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-white text-black antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}