import React, { useState } from 'react';
import { HomePage } from './components/Pages/HomePage';
import { AuthModals } from './components/AuthModals';
import { useAuth } from './utils/authContext';
import './App.css';

const App: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isLoggedIn } = useAuth();

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <HomePage onOpenAuth={handleOpenAuth} />
      <AuthModals
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default App;
