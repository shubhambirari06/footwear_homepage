import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { Product } from '../../types/index';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number, size: string) => void;
  onWishlistToggle?: (product: Product) => void;
  isInWishlist?: boolean;
}

const SIZES = ['5', '6', '7', '8', '9', '10', '11', '12'];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onWishlistToggle,
  isInWishlist = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setSelectedSize(null);
    setImageLoaded(false);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize && onAddToCart) {
      onAddToCart(product, quantity, selectedSize);
      onClose();
    }
  };

  const handleShare = () => {
    const text = `Check out ${product.name} at ₹${product.price.toLocaleString('en-IN')}!`;
    if (navigator.share) {
      navigator.share({
        title: 'Footwear Store',
        text: text,
        url: window.location.href,
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(text);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const rating = product.rating || 4.5;
  const ratingCount = Math.floor(Math.random() * 100) + 20;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors z-10 bg-white"
              >
                <X size={24} className="text-neutral-900" />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                {/* Left - Product Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative bg-neutral-50 rounded-lg overflow-hidden aspect-square group">
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      onLoad={() => setImageLoaded(true)}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* New Badge */}
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                        NEW ARRIVAL
                      </div>
                    )}
                  </div>

                  {/* Wishlist and Share Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onWishlistToggle?.(product)}
                      className="flex-1 py-3 border-2 border-amber-700 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart
                        size={20}
                        className={isInWishlist ? 'fill-amber-700' : ''}
                      />
                      {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="flex-1 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 size={20} />
                      {isShared ? 'Copied!' : 'Share'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right - Product Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-6"
                >
                  {/* Brand & Title */}
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-2">
                      {product.brand}
                    </p>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-neutral-600">
                      {product.gender} • {product.category}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.floor(rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">
                      {rating} ({ratingCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="border-y border-neutral-200 py-4">
                    <p className="text-4xl font-bold text-amber-700">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Select Size (UK)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {SIZES.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 rounded-lg font-semibold transition-all border-2 ${
                            selectedSize === size
                              ? 'border-amber-700 bg-amber-700 text-white'
                              : 'border-neutral-300 bg-white text-neutral-900 hover:border-amber-700'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4 w-fit">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <Minus size={20} />
                      </motion.button>
                      <span className="w-12 text-center text-lg font-semibold">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      selectedSize
                        ? 'bg-amber-700 text-white hover:bg-amber-800 cursor-pointer'
                        : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Add to Cart</span>
                  </motion.button>

                  {!selectedSize && (
                    <p className="text-sm text-amber-700 text-center font-medium">
                      Please select a size to continue
                    </p>
                  )}

                  {/* Benefits */}
                  <div className="space-y-3 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-3">
                      <Truck className="text-amber-700" size={20} />
                      <div>
                        <p className="font-semibold text-neutral-900">Free Shipping</p>
                        <p className="text-xs text-neutral-600">On orders above ₹500</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="text-amber-700" size={20} />
                      <div>
                        <p className="font-semibold text-neutral-900">2 Year Warranty</p>
                        <p className="text-xs text-neutral-600">Manufacturing defects covered</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <RotateCcw className="text-amber-700" size={20} />
                      <div>
                        <p className="font-semibold text-neutral-900">Easy Returns</p>
                        <p className="text-xs text-neutral-600">30 days return policy</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
