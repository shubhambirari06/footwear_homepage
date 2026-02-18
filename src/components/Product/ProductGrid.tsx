import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/index';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onWishlistToggle?: (product: Product) => void;
  isWishlistItem?: (productId: number) => boolean;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
  onAddToCart,
  onWishlistToggle,
  isWishlistItem = () => false,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-neutral-200 rounded-lg aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid place-items-center min-h-96 py-12"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">No Products Found</h3>
          <p className="text-neutral-600">Try adjusting your filters or search term</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <ProductCard
            product={product}
            isInWishlist={isWishlistItem(product.id)}
            onClick={() => onProductClick?.(product)}
            onAddToCart={() => onAddToCart?.(product)}
            onWishlistToggle={() => onWishlistToggle?.(product)}
          />
        </motion.div>
      ))}
    </div>
  );
};
