import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode } from 'react';
import { Product, CartItem } from '../types/index';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1, size?: string | number) => {
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

  const removeFromCart = useCallback((productId: number, size?: string | number) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number, size?: string | number) => {
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

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
