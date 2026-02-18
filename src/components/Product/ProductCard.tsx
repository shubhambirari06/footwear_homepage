import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types/index';

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist = false,
  onWishlistToggle,
  onAddToCart,
  onClick,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-neutral-100">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-neutral-50 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.stock !== undefined && product.stock < 5 && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Low Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle?.();
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Heart
              size={20}
              className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-600'}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="font-bold text-sm text-neutral-900 line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }
                />
              ))}
              <span className="text-xs text-neutral-500 ml-1">({product.rating})</span>
            </div>
          )}

          {/* Category & Gender */}
          <p className="text-xs text-neutral-500 mb-3">
            {product.gender} • {product.category}
          </p>

          {/* Price */}
          <div className="mb-4">
            <p className="text-lg font-bold text-amber-700">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="w-full mt-auto py-2 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
