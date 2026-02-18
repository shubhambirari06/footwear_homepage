import React, { useState, useCallback, useMemo } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_CONFIG, GENDER_CATEGORIES } from '../../config/app.config';
import { User as UserType } from '../../types/index';

interface HeaderProps {
  isLoggedIn: boolean;
  user: UserType | null;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onProfileClick: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  cartCount,
  wishlistCount,
  onSearch,
  onNavigate,
  onOpenAuth,
  onProfileClick,
  onCartClick,
  onWishlistClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleAuthAction = useCallback(
    (mode: 'login' | 'register') => {
      setIsMobileMenuOpen(false);
      onOpenAuth(mode);
    },
    [onOpenAuth]
  );

  const genders = useMemo(() => Object.keys(GENDER_CATEGORIES), []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Brand */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 shrink-0"
          >
            <span className="text-2xl font-bold tracking-tighter">
              <span className="text-neutral-900">URBAN</span>
              <span className="text-amber-700">STEPS</span>
            </span>
          </motion.button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <input
              type="text"
              placeholder="Search shoes, brands..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 transition-all"
            />
            <Search className="absolute right-3 text-neutral-400" size={18} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {genders.map(gender => (
              <motion.button
                key={gender}
                whileHover={{ color: '#b45309' }}
                onClick={() => onNavigate(`/category/${gender}`)}
                className="text-sm font-medium uppercase tracking-wider text-neutral-600 hover:text-amber-700 transition-colors"
              >
                {gender}
              </motion.button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Search - Mobile */}
            <div className="md:hidden">
              <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                <Search className="text-neutral-600" size={20} />
              </button>
            </div>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={isLoggedIn ? onWishlistClick : () => handleAuthAction('login')}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={isLoggedIn ? onCartClick : () => handleAuthAction('login')}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Profile/User */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={isLoggedIn ? onProfileClick : () => handleAuthAction('login')}
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors hidden sm:block"
              title="Account"
            >
              <User size={20} />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 pt-4 border-t border-neutral-200 lg:hidden"
          >
            {/* Mobile Search */}
            <div className="mb-4 flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <Search className="absolute right-3 text-neutral-400" size={18} />
            </div>

            {/* Mobile Navigation */}
            <div className="flex flex-col gap-4 mb-4">
              {genders.map(gender => (
                <button
                  key={gender}
                  onClick={() => {
                    onNavigate(`/category/${gender}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium uppercase tracking-wider text-neutral-600 hover:text-amber-700 transition-colors"
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => handleAuthAction('login')}
                  className="w-full px-4 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthAction('register')}
                  className="w-full px-4 py-2 border border-amber-700 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};
