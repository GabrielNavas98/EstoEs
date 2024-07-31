import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Esto es',
    default: 'Esto es',
  },
  description: 'Challenge Frontend - Esto Es',
  keywords: 'challenge, frontend, Nextjs, React',
  authors: [{ name: 'Navas, Carlos Gabriel' }],
  publisher: 'Navas, Carlos Gabriel',
};

interface props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: props) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col`}>
        <Navbar data-testid="navbar" />
        <div className="flex flex-row">
          <main className="w-full h-full">
            {children}
            {modal}
          </main>
        </div>
      </body>
    </html>
  );
}
