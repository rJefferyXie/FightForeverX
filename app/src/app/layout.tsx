// Styles
import './globals.scss';

// React + Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] })

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