import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  cartCount?: number;
  wishlistCount?: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth,
  cartCount = 0,
  wishlistCount = 0,
  onCartClick,
  onWishlistClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Men', href: '#' },
    { name: 'Women', href: '#' },
    { name: 'Kids', href: '#' },
    { name: 'Sports', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'Sale', href: '#' },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .nav-animate {
          animation: slideDown 0.5s ease-out;
        }

        .cart-badge {
          animation: scaleIn 0.3s ease-out;
        }

        .cart-icon:hover {
          animation: bounce 0.6s ease-in-out;
        }

        .nav-link-hover {
          position: relative;
          overflow: hidden;
        }

        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #b45309, #d97706);
          transition: left 0.3s ease;
        }

        .nav-link-hover:hover::after {
          left: 100%;
        }
      `}</style>

      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/80 backdrop-blur-md py-5'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between nav-animate">
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-transform hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold tracking-tighter text-neutral-900 hover:text-amber-700 transition-colors duration-300">
                URBAN<span className="text-amber-700">STEPS</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wider nav-link-hover"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center relative group">
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="bg-neutral-100 border border-neutral-200 rounded-full px-4 py-2 text-xs w-0 group-hover:w-48 focus:w-48 transition-all duration-300 focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <Search size={20} className="text-neutral-600 -ml-8 cursor-pointer group-hover:text-amber-700 transition-colors" />
              </div>

              {/* Wishlist Icon */}
              <button 
                onClick={onWishlistClick}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-all hover:scale-110 cart-icon"
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full cart-badge">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button 
                onClick={onCartClick}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-all hover:scale-110 cart-icon"
                title="Shopping Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Icon */}
              <button 
                onClick={() => onOpenAuth('login')}
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-all hover:scale-110"
                title="Account"
              >
                <User size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-100 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-col space-y-4 px-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-neutral-600 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-neutral-100 flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    onOpenAuth('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left font-medium hover:text-amber-700 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    onOpenAuth('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left font-medium hover:text-amber-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
