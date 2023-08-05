import Navigation from './Navigation/Navigation';
import ScrollTop from './ScrollTop/ScrollTop';
import Footer from './Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="container">{children}</main>
      <ScrollTop />
      <Footer />
    </>
  );
}
