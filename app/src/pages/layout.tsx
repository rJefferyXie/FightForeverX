// Styles
import '../app/globals.scss';

// React + Next
import type { Metadata } from 'next';

// Components
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Fight Forever',
  description: 'Welcome to FightForeverX, your one-stop destination for all things wrestling! Dive into the electrifying world of professional wrestling with our comprehensive platform that offers a wealth of information on your favourite wrestlers, their captivating statistics, upcoming pay-per-view events, and the latest wrestling news.',
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Navbar></Navbar>
      {children}
    </div>
  )
}

export default MainLayout;