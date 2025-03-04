import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Header />
      {/*<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">*/}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
