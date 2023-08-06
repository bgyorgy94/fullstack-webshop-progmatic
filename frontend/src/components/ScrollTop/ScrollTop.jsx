import { useState, useEffect } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';
import './ScrollTop.css';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1000) {
      setVisible(true);
    } else if (scrolled <= 1000) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div className="scroll-to-top">
      <BsArrowUpShort
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
        className="scroll-top-arrow"
      />
      <p style={{ display: visible ? 'inline' : 'none' }}>back to the top</p>
    </div>
  );
}
