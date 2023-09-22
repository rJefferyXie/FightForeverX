// Styles
import '../app/globals.scss';

// React + Next
import type { Metadata } from 'next';

// Components
import Navbar from '@/components/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Navbar></Navbar>
      {children}
    </div>
  )
}

export default MainLayout;