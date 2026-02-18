import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_CONFIG, GENDER_CATEGORIES } from '../../config/app.config';
import { Gender } from '../../enums';

interface UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
}

interface HeaderProps {
  isLoggedIn: boolean;
  user: UserData | null;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  isProfileDropdownOpen: boolean;
  onProfileDropdownToggle: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  cartCount,
  wishlistCount,
  onSearch,
  onNavigate,
  onOpenAuth,
  onLogout,
  isProfileDropdownOpen,
  onProfileDropdownToggle,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleProfileClick = useCallback(() => {
    onProfileDropdownToggle(!isProfileDropdownOpen);
  }, [isProfileDropdownOpen, onProfileDropdownToggle]);

  const handleLogoutClick = useCallback(() => {
    onLogout();
  }, [onLogout]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        onProfileDropdownToggle(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileDropdownOpen, onProfileDropdownToggle]);

  const genders = useMemo(() => Object.values(Gender), []);

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
              onClick={() => onNavigate(isLoggedIn ? '/wishlist' : '/')}
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
              onClick={() => onNavigate(isLoggedIn ? '/cart' : '/')}
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

            {/* Profile Dropdown / Login Button */}
            {isLoggedIn && user ? (
              <div className="relative hidden sm:block" ref={profileDropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 p-2 text-neutral-600 hover:text-amber-700 transition-colors"
                  title="Account"
                >
                  <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {/* User Info Section */}
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 border-b border-neutral-200">
                        <p className="text-sm font-semibold text-neutral-900">{user.name}</p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            onNavigate('/profile');
                            onProfileDropdownToggle(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        >
                          <User size={16} />
                          My Account
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('/orders');
                            onProfileDropdownToggle(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        >
                          📦
                          My Orders
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('/wishlist');
                            onProfileDropdownToggle(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        >
                          <Heart size={16} />
                          My Wishlist
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('/cart');
                            onProfileDropdownToggle(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        >
                          <ShoppingBag size={16} />
                          Cart
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-neutral-200 py-2">
                        <button
                          onClick={handleLogoutClick}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthAction('login')}
                className="hidden sm:flex items-center gap-2 p-2 text-neutral-600 hover:text-amber-700 transition-colors"
                title="Account"
              >
                <User size={20} />
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                onProfileDropdownToggle(false);
              }}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
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

              {/* Mobile Auth Buttons or Profile Links */}
              {!isLoggedIn ? (
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
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => {
                      onNavigate('/profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-amber-700 hover:bg-amber-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <User size={18} />
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('/orders');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-amber-700 hover:bg-amber-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    📦
                    My Orders
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
