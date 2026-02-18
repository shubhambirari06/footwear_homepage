import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../Product/ProductCard';
import { products } from '../../data/index';

interface FeaturedProductsProps {
  onViewAll?: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onViewAll }) => {
  const featured = useMemo(() => products.slice(0, 8), []);

  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-2 block">
            Premium Collection
          </span>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Featured Products</h2>
          <div className="w-20 h-1 bg-amber-700 mx-auto" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAll}
            className="px-12 py-4 border-2 border-neutral-900 text-neutral-900 font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-neutral-900 hover:text-white transition-all"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
