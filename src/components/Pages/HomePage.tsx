import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Header } from '../Navigation/Header';
import { Footer } from '../Layout/Footer';
import { Hero } from '../Sections/Hero';
import { FeaturedProducts } from '../Sections/FeaturedProducts';
import { CategoryShowcase } from '../Sections/CategoryShowcase';
import { ProductGrid } from '../Product/ProductGrid';
import { ProductDetailModal } from '../Product/ProductDetailModal';
import { ToastManager } from '../Toast/ToastManager';
import { useAuth } from '../../utils/authContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useToast } from '../../hooks/useToast';
import { products } from '../../data/index';
import { Product } from '../../types/index';
import { ViewType, ToastType } from '../../enums';
import { WELCOME_MESSAGES, TOAST_DURATION, ROUTE_PATHS } from '../../config/app.config';
import { Package, MapPin, Phone, Mail, Edit2 } from 'lucide-react';

interface HomePageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  const { isLoggedIn, user, logout } = useAuth();
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

  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const previousLoginStateRef = useRef(false);

  // Show welcome toast on login
  useEffect(() => {
    if (isLoggedIn && !previousLoginStateRef.current) {
      // User just logged in
      addToast(
        `${WELCOME_MESSAGES.LOGIN.TITLE} ${WELCOME_MESSAGES.LOGIN.ICON}`,
        ToastType.SUCCESS,
        TOAST_DURATION.MEDIUM
      );
      addToast(
        WELCOME_MESSAGES.LOGIN.MESSAGE,
        ToastType.INFO,
        TOAST_DURATION.LONG
      );
    }
    previousLoginStateRef.current = isLoggedIn;
  }, [isLoggedIn, addToast]);

  // Handlers
  const handleSearch = useCallback(
    (query: string) => {
      updateFilter('searchQuery', query);
      setCurrentView(ViewType.SEARCH);
    },
    [updateFilter]
  );

  const handleNavigate = useCallback(
    (path: string) => {
      setIsProfileDropdownOpen(false);
      if (path === ROUTE_PATHS.HOME) {
        setCurrentView(ViewType.HOME);
        resetFilters();
      } else if (path.startsWith('/category/')) {
        const gender = path.split('/')[2];
        toggleGenderFilter(gender);
        setCurrentView(ViewType.CATEGORY);
      } else if (path === ROUTE_PATHS.CART) {
        setCurrentView(ViewType.CART);
      } else if (path === ROUTE_PATHS.WISHLIST) {
        setCurrentView(ViewType.WISHLIST);
      } else if (path === ROUTE_PATHS.PROFILE) {
        setCurrentView(ViewType.PROFILE);
      } else if (path === '/orders') {
        setCurrentView(ViewType.ORDERS);
      }
    },
    [toggleGenderFilter, resetFilters]
  );

  const handleLogout = useCallback(() => {
    logout();
    setIsProfileDropdownOpen(false);
    setCurrentView(ViewType.HOME);
    addToast(
      WELCOME_MESSAGES.LOGOUT.MESSAGE,
      ToastType.INFO,
      TOAST_DURATION.MEDIUM
    );
  }, [logout, addToast]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product, 1);
      addToast(`Added ${product.name} to cart`, ToastType.SUCCESS, 2000);
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
        ToastType.INFO,
        2000
      );
    },
    [isLoggedIn, toggleWishlist, isInWishlist, onOpenAuth, addToast]
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setIsProductDetailOpen(true);
    },
    []
  );

  const handleCloseProductDetail = useCallback(() => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleProductDetailAddToCart = useCallback(
    (product: Product, quantity: number, size: string) => {
      addToCart(product, quantity);
      addToast(
        `Added ${quantity}x ${product.name} (Size ${size}) to cart`,
        ToastType.SUCCESS,
        2000
      );
    },
    [addToCart, addToast]
  );

  const displayProducts = useMemo(() => {
    if (currentView === ViewType.HOME) {
      return products.filter(p => p.isNew).slice(0, 12);
    }
    return filteredProducts;
  }, [currentView, filteredProducts]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Notification System */}
      <ToastManager toasts={toasts} onRemove={removeToast} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={handleCloseProductDetail}
        onAddToCart={handleProductDetailAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />

      {/* Header - Consistent across all views */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        onOpenAuth={onOpenAuth}
        onLogout={handleLogout}
        isProfileDropdownOpen={isProfileDropdownOpen}
        onProfileDropdownToggle={setIsProfileDropdownOpen}
      />

      {/* Main Content - Changes based on currentView */}
      <main className="flex-grow">
        {/* HOME VIEW */}
        {currentView === ViewType.HOME && (
          <>
            <Hero />
            <FeaturedProducts onViewAll={() => setCurrentView(ViewType.CATEGORY)} onProductClick={handleProductClick} />
            <CategoryShowcase
              onCategoryClick={(gender, category) => {
                toggleGenderFilter(gender);
                toggleCategoryFilter(category);
                setCurrentView(ViewType.CATEGORY);
              }}
            />
          </>
        )}

        {/* SEARCH & CATEGORY VIEWS */}
        {(currentView === ViewType.SEARCH || currentView === ViewType.CATEGORY) && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold mb-2">
                  {currentView === ViewType.CATEGORY ? 'Browse Products' : 'Search Results'}
                </h1>
                <p className="text-neutral-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </motion.div>

              <ProductGrid
                products={displayProducts}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                isWishlistItem={(id) => isInWishlist(id)}
              />
            </div>
          </section>
        )}

        {/* CART VIEW */}
        {currentView === ViewType.CART && (
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
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentView(ViewType.CATEGORY)}
                      className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                      {cartItems.map(item => (
                        <motion.div
                          key={`${item.id}-${item.size}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-6 p-6 border border-neutral-200 rounded-lg mb-4 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-neutral-600 text-sm">{item.brand}</p>
                            <p className="text-amber-700 font-semibold mt-2">₹{item.price}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(item.quantity - 1, 1),
                                    item.size
                                  )
                                }
                                className="px-2 py-1 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1, item.size)
                                }
                                className="px-2 py-1 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-red-500 text-sm mt-4 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1 h-fit sticky top-24">
                      <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                          <div className="flex justify-between text-neutral-600">
                            <span>Subtotal:</span>
                            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-neutral-600">
                            <span>Shipping:</span>
                            <span className="text-green-600 font-medium">FREE</span>
                          </div>
                          <div className="border-t border-neutral-200 pt-4 flex justify-between">
                            <span className="font-bold">Total:</span>
                            <span className="text-2xl font-bold text-amber-700">
                              ₹{cartTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 mt-6 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 transition-colors"
                        >
                          Proceed to Checkout
                        </motion.button>
                        <button
                          onClick={() => setCurrentView(ViewType.CATEGORY)}
                          className="w-full py-3 mt-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* WISHLIST VIEW */}
        {currentView === ViewType.WISHLIST && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💔</div>
                    <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                    <p className="text-neutral-600 mb-8">
                      Add your favorite shoes to save them for later!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentView(ViewType.CATEGORY)}
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

        {/* PROFILE VIEW */}
        {currentView === ViewType.PROFILE && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isLoggedIn && user ? (
                  <div>
                    <div className="flex items-center justify-between mb-12">
                      <h1 className="text-4xl font-bold">My Account</h1>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 text-amber-700 border border-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                      >
                        <Edit2 size={18} />
                        Edit Profile
                      </motion.button>
                    </div>

                    {/* Grid Layout: Sidebar + Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      {/* Left Sidebar - User Info */}
                      <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200 sticky top-24">
                          <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900">{user.name}</h2>
                            <p className="text-sm text-neutral-600">{user.email}</p>
                          </div>

                          <div className="space-y-4 border-t border-amber-200 pt-6">
                            <div>
                              <p className="text-xs text-neutral-600 font-semibold mb-1">PHONE</p>
                              <p className="text-sm font-medium flex items-center gap-2">
                                <Phone size={16} className="text-amber-700" />
                                {user.phoneNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-600 font-semibold mb-1">MEMBER SINCE</p>
                              <p className="text-sm font-medium">{user.joinDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Content - Stats & Orders */}
                      <div className="lg:col-span-3 space-y-8">
                        {/* Account Stats */}
                        <div>
                          <h2 className="text-2xl font-bold mb-6">Account Stats</h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-neutral-600 text-sm mb-1">Total Orders</p>
                                  <p className="text-3xl font-bold text-amber-700">0</p>
                                </div>
                                <Package size={32} className="text-amber-700 opacity-30" />
                              </div>
                            </div>
                            <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-neutral-600 text-sm mb-1">Wishlist Items</p>
                                  <p className="text-3xl font-bold text-amber-700">{wishlistCount}</p>
                                </div>
                                <span className="text-3xl">❤️</span>
                              </div>
                            </div>
                            <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-neutral-600 text-sm mb-1">Cart Items</p>
                                  <p className="text-3xl font-bold text-amber-700">{cartCount}</p>
                                </div>
                                <span className="text-3xl">🛍️</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Orders Preview */}
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Recent Orders</h2>
                            <button
                              onClick={() => setCurrentView(ViewType.ORDERS)}
                              className="text-amber-700 font-medium hover:underline"
                            >
                              View All
                            </button>
                          </div>
                          <div className="p-8 border border-neutral-200 rounded-lg text-center bg-neutral-50">
                            <p className="text-neutral-600">No orders yet. Start shopping to place your first order!</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setCurrentView(ViewType.CATEGORY)}
                              className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
                            >
                              Shop Now
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">👤</div>
                    <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
                    <p className="text-neutral-600 mb-8">
                      Sign in to view and manage your account information.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onOpenAuth('login')}
                      className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* ORDERS VIEW */}
        {currentView === ViewType.ORDERS && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setCurrentView(ViewType.PROFILE)}
                    className="text-amber-700 font-medium hover:underline"
                  >
                    ← Back to Account
                  </button>
                  <h1 className="text-4xl font-bold">My Orders</h1>
                </div>

                {isLoggedIn ? (
                  <div className="p-8 border border-neutral-200 rounded-lg text-center bg-neutral-50">
                    <Package size={48} className="mx-auto mb-4 text-neutral-400" />
                    <p className="text-neutral-600 text-lg">No orders yet.</p>
                    <p className="text-neutral-500 mb-8">Your order history will appear here once you place your first order.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentView('category')}
                      className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
                    <p className="text-neutral-600">Sign in to view your orders.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {/* Footer - Consistent across all views */}
      <Footer />
    </div>
  );
};
