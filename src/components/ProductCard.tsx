import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (quantity: number, size: number) => void;
  onToggleWishlist?: () => void;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sizes = [6, 7, 8, 9, 10, 11, 12];

  const handleAddToCart = () => {
    if (selectedSize === null) {
      alert('Please select a size');
      return;
    }
    onAddToCart?.(quantity, selectedSize);
  };

  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-amber-700 transition-all shadow-sm hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-neutral-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-amber-700 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            New
          </span>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleWishlist}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Heart
            size={20}
            className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-600'}
          />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-2">
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
            {product.brand || 'UrbanSteps'}
          </p>
          <h3 className="font-bold text-sm text-neutral-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            {Array(5)
              .fill(0)
              .map((_, i) => (
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
            <span className="text-[10px] text-neutral-500 ml-auto">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold text-amber-700">
            ₹{(product.price).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Size Selection */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3"
          >
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 block mb-2">
              Select Size
            </label>
            <div className="grid grid-cols-4 gap-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1 rounded text-[10px] font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-amber-700 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full mt-auto py-3 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export type { Product };
