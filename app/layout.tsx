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

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col`}>
        <Navbar data-testid="navbar" />
        <div className="flex flex-row">
          <main className="w-full h-full">
            {props.children}
            {props.modal}
          </main>
        </div>
      </body>
    </html>
  );
}
