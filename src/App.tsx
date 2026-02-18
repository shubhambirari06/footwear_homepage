import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { UserHome } from './components/UserHome';
import { AllProducts } from './components/AllProducts';
import { useAuth } from './utils/authContext';
import { Product } from './types';
import './App.css';

type View = 'home' | 'all-products';

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<(Product & { quantity: number; size?: number })[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    // Could navigate to product detail if needed
  };

  const handleViewAllProducts = () => {
    setCurrentView('all-products');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number, size?: number) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity, size }]);
    }
  };

  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <Layout cartCount={cart.length} wishlistCount={wishlist.length}>
      {currentView === 'home' ? (
        isLoggedIn ? (
          <UserHome
            onProductClick={handleProductClick}
            onViewAllProducts={handleViewAllProducts}
            wishlistCount={wishlist.length}
            cartCount={cart.length}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : (
          <Home onViewAllProducts={handleViewAllProducts} />
        )
      ) : currentView === 'all-products' ? (
        <AllProducts
          onBack={handleBackToHome}
          onProductClick={handleProductClick}
        />
      ) : null}
    </Layout>
  );
};

export default App;
