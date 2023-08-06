import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import ScrollTop from './ScrollTop/ScrollTop';
import Footer from './Footer/Footer';

export default function Layout() {
  return (
    <>
      <Navigation />
      <main className="main-container">
        <Outlet />
      </main>
      <ScrollTop />
      <Footer />
    </>
  );
}
