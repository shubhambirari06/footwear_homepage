import React from 'react';
import { motion } from 'motion/react';
import { FEATURED_CATEGORIES } from '../../data/index';

interface CategoryShowcaseProps {
  onCategoryClick?: (gender: string, category: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onCategoryClick }) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-2 block">
            Collections
          </span>
          <h2 className="text-4xl font-bold text-neutral-900">Shop by Category</h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`${category.gridSpan} group relative h-80 overflow-hidden rounded-xl cursor-pointer`}
              onClick={() => onCategoryClick?.('Men', category.name)}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <h3 className="text-2xl font-bold text-white tracking-tight">{category.name}</h3>
                <span className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
