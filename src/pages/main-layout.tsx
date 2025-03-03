import { Footer } from '@/components/custom/Footer/footer';
import Header from '@/components/layout/header';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

function MainLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </> 
  );
}

export default MainLayout;
