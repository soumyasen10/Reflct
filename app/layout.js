import {Inter} from 'next/font/google'
import './globals.css';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter=Inter({subsets:["latin"]})

export const metadata = {
  title: "Reflct",
  description: "A journal app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider>
        <Header/>
        <div className="bg-[url('/bg.jpg')] fixed opacity-60 -z-10 inset-0"/>
        <main className='min-h-screen'>
        {children}
        </main>
        <Toaster richColors/>
        <footer className='bg-orange-300 py-12 bg-opacity-10'>
          <div className='mx-auto px-4 text-center text-gray-900'>
            <p>Made With 💖 by Zayan</p>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
