import React from 'react';
import { Hero } from './Hero';
import { FeaturedProducts } from './FeaturedProducts';

interface HomeProps {
  onViewAllProducts: () => void;
}

export const Home: React.FC<HomeProps & { onProductClick?: (p:any) => void }> = ({ onViewAllProducts, onProductClick }) => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedProducts onViewAll={onViewAllProducts} onProductClick={onProductClick} />
    </div>
  );
};
