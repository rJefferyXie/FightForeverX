// Styles
import './globals.css';

// React + Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fight Forever',
  description: 'Welcome to FightForeverX, your one-stop destination for all things wrestling! Dive into the electrifying world of professional wrestling with our comprehensive platform that offers a wealth of information on your favourite wrestlers, their captivating statistics, upcoming pay-per-view events, and the latest wrestling news.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Navbar></Navbar>
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;