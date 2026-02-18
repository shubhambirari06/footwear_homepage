import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './HeroSection.css';

interface HeroSectionProps {
  onCategoryClick: (gender: string, category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCategoryClick }) => {
  return (
    <div className="hero-section">
      <Carousel>
        <Carousel.Item>
          <div className="hero-image-container">
            <img
              className="d-block w-100 hero-image"
              src="https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Casual Collection"
            />
            <div className="hero-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h1 className="display-3 fw-bold">Step Into Style</h1>
            <p className="lead fs-4">Discover the latest trends in casual footwear.</p>
            <Button variant="light" size="lg" className="px-4 fw-bold" onClick={() => onCategoryClick('Men', 'Casual')}>Shop Casual</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="hero-image-container">
            <img
              className="d-block w-100 hero-image"
              src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Formal Collection"
            />
            <div className="hero-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h1 className="display-3 fw-bold">Classic Elegance</h1>
            <p className="lead fs-4">Premium formal shoes for every occasion.</p>
            <Button variant="primary" size="lg" className="px-4 fw-bold" onClick={() => onCategoryClick('Men', 'Formal')}>Shop Formal</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="hero-image-container">
            <img
              className="d-block w-100 hero-image"
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sports Collection"
            />
            <div className="hero-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h1 className="display-3 fw-bold">Run Your World</h1>
            <p className="lead fs-4">High-performance sports shoes for active lifestyles.</p>
            <Button variant="danger" size="lg" className="px-4 fw-bold" onClick={() => onCategoryClick('Men', 'Sports')}>Shop Sports</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;