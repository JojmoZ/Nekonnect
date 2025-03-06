import Footer  from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useLayout } from '@/context/layout-context';
import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  const { header, footer, setHeader, setFooter } = useLayout();

  // useEffect(() => {
  //   setHeader(true);
  //   setFooter(true);
  // },[])
  return (
    <>
      {
        header && <Header />
      }
      {/*<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">*/}
      <main>
        <Outlet />
      </main>
      {
        footer && <Footer />
      }
    </>
  );
}

export default MainLayout;
