import { useState, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../types/index';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1, size?: number) => {
      setCartItems(prev => {
        const existingItem = prev.find(
          item => item.id === product.id && item.size === size
        );

        if (existingItem) {
          return prev.map(item =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...prev, { ...product, quantity, size }];
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: number, size?: number) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number, size?: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size);
        return;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
};
