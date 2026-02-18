import { useState, useCallback, useMemo } from 'react';
import { Product } from '../types/index';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlistItems.some(item => item.id === productId),
    [wishlistItems]
  );

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return {
    wishlistItems,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  };
};
