import { Button } from 'react-bootstrap';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className="shop-buttons">
        <Button variant="light" className="shop-button">
          SHOP MEN
        </Button>
        <Button variant="light" className="shop-button">
          SHOP WOMEN
        </Button>
      </div>
    </div>
  );
}
