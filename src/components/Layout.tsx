import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModals } from './AuthModals';
import { useAuth } from '../utils/authContext';

interface LayoutProps {
  children: React.ReactNode;
  cartCount?: number;
  wishlistCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  cartCount = 0, 
  wishlistCount = 0 
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isLoggedIn, logout } = useAuth();

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 flex flex-col">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white text-[10px] sm:text-xs py-2 tracking-widest uppercase">
        <div className="container flex justify-between items-center gap-4">
          <div className="hidden sm:block flex-1"></div>
          <div className="flex-1 text-center">
            Free Shipping on all orders over ₹2000 • Premium Quality Guaranteed
          </div>
          <div className="hidden sm:flex flex-1 justify-end gap-4">
            <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Help</a>
          </div>
        </div>
      </div>
      
      <Navbar 
        onOpenAuth={openAuth}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => console.log('Cart clicked')}
        onWishlistClick={() => console.log('Wishlist clicked')}
      />
      
      <main className="flex-grow">
        {children}
      </main>

      <AuthModals 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};
