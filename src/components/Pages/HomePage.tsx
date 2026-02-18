import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Header } from '../Navigation/Header';
import { Footer } from '../Layout/Footer';
import { Hero } from '../Sections/Hero';
import { FeaturedProducts } from '../Sections/FeaturedProducts';
import { CategoryShowcase } from '../Sections/CategoryShowcase';
import { ProductGrid } from '../Product/ProductGrid';
import { ToastManager } from '../Toast/ToastManager';
import { useAuth } from '../../utils/authContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useToast } from '../../hooks/useToast';
import { products } from '../../data/index';
import { Product } from '../../types/index';

interface HomePageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  const { isLoggedIn, user } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();
  const { wishlistItems, toggleWishlist, wishlistCount, isInWishlist } = useWishlist();
  const {
    filteredProducts,
    filters,
    updateFilter,
    toggleGenderFilter,
    toggleCategoryFilter,
    resetFilters,
  } = useProductFilter(products);
  const { toasts, addToast, removeToast } = useToast();

  const [currentView, setCurrentView] = useState<
    'home' | 'search' | 'cart' | 'wishlist' | 'category'
  >('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handlers
  const handleSearch = useCallback(
    (query: string) => {
      updateFilter('searchQuery', query);
      setCurrentView('search');
    },
    [updateFilter]
  );

  const handleNavigate = useCallback(
    (path: string) => {
      if (path === '/') {
        setCurrentView('home');
        resetFilters();
      } else if (path.startsWith('/category/')) {
        const gender = path.split('/')[2];
        toggleGenderFilter(gender);
        setCurrentView('category');
      }
    },
    [toggleGenderFilter, resetFilters]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product, 1);
      addToast(`Added ${product.name} to cart`, 'success', 2000);
    },
    [addToCart, addToast]
  );

  const handleWishlistToggle = useCallback(
    (product: Product) => {
      if (!isLoggedIn) {
        onOpenAuth('login');
        return;
      }
      toggleWishlist(product);
      const isCurrentlyInWishlist = isInWishlist(product.id);
      addToast(
        isCurrentlyInWishlist
          ? `Removed from wishlist`
          : `Added to wishlist`,
        'info',
        2000
      );
    },
    [isLoggedIn, toggleWishlist, isInWishlist, onOpenAuth, addToast]
  );

  const displayProducts = useMemo(() => {
    if (currentView === 'home') {
      return products.filter(p => p.isNew).slice(0, 12);
    }
    return filteredProducts;
  }, [currentView, filteredProducts]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Notification System */}
      <ToastManager toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        onOpenAuth={onOpenAuth}
        onProfileClick={() => {}}
        onCartClick={() => setCurrentView('cart')}
        onWishlistClick={() => setCurrentView('wishlist')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero />
            <FeaturedProducts onViewAll={() => setCurrentView('category')} />
            <CategoryShowcase
              onCategoryClick={(gender, category) => {
                toggleGenderFilter(gender);
                toggleCategoryFilter(category);
                setCurrentView('category');
              }}
            />
          </>
        )}

        {(currentView === 'search' || currentView === 'category') && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold mb-2">Products</h1>
                <p className="text-neutral-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </motion.div>

              <ProductGrid
                products={displayProducts}
                onProductClick={setSelectedProduct}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                isWishlistItem={(id) => isInWishlist(id)}
              />
            </div>
          </section>
        )}

        {currentView === 'cart' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-neutral-600 mb-8">
                      Add some amazing shoes to get started!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentView('category')}
                      className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    {cartItems.map(item => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-6 p-6 border border-neutral-200 rounded-lg mb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-neutral-600">₹{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(item.quantity - 1, 1),
                                  item.size
                                )
                              }
                              className="px-2 py-1 bg-neutral-100 rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1, item.size)
                              }
                              className="px-2 py-1 bg-neutral-100 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-red-500 text-sm mt-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}

                    <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-2xl font-bold text-amber-700">
                          ₹{cartTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 transition-colors"
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {currentView === 'wishlist' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold mb-8">Wishlist</h1>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💔</div>
                    <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                    <p className="text-neutral-600 mb-8">
                      Add your favorite shoes to your wishlist!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentView('category')}
                      className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                    >
                      Browse Products
                    </motion.button>
                  </div>
                ) : (
                  <ProductGrid
                    products={wishlistItems}
                    onAddToCart={handleAddToCart}
                    onWishlistToggle={handleWishlistToggle}
                    isWishlistItem={(id) => true}
                  />
                )}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
