import Footer  from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useLayout } from '@/context/layout-context';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  const { header, footer } = useLayout();

  // useEffect(() => {
  //   setHeader(true);
  //   setFooter(true);
  // },[])
  return (
    <>
      <div className={header ? 'block' : 'hidden'}>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <div className={footer ? 'block' : 'hidden'}>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
