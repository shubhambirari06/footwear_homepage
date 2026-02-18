import React from 'react';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { logo } from '../data';
import { User } from '../types';
import { ModalType } from '../enums';
import { categoryConfig } from '../config/categoryConfig';
import './Header.css';

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  modal: ModalType | null;
  setModal: (modal: ModalType | null) => void;
  handleLogin: () => void;
  handleLogout: () => void;
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onLogoClick: () => void;
  onGenderSelect: (gender: string) => void;
  onCategorySelect: (gender: string, subcategory: string) => void;
  onProfileClick: (tab?: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  modal,
  setModal,
  handleLogin,
  handleLogout,
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onLogoClick,
  onGenderSelect,
  onCategorySelect,
  onProfileClick,
  onSearch
}) => {
  const genders = ['Men', 'Women', 'Kids'];

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setModal(ModalType.Login);
    } else {
      onWishlistClick();
    }
  };

  const handleCartClickWrapper = () => {
    if (!isLoggedIn) {
      setModal(ModalType.Login);
    } else {
      onCartClick();
    }
  };

  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section" onClick={onLogoClick}>
          <img src={logo} alt="Logo" className="header-logo" />
          <div className="brand-container">
            <span className="brand-text">FOOT</span>
            <span className="brand-accent">WEAR</span>
          </div>
        </div>

        {/* Navigation Menu with Hover Dropdowns */}
        <nav className="nav-menu">
          {genders.map((gender) => (
            <div 
              className="menu-item" 
              key={gender}
              onClick={() => onGenderSelect(gender)}
            >
              <span className="menu-title">{gender.toUpperCase()}</span>
              
              {/* Dropdown Content */}
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  <div className="category-column">
                    <h4>Footwear</h4>
                    <ul>
                      {categoryConfig[gender as keyof typeof categoryConfig].subcategories.map((category) => (
                        <li key={category}>
                          <a 
                            href={`#${gender}-${category}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onCategorySelect(gender, category);
                            }}
                          >
                            {category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Additional column for Brands (Static for demo) */}
                  <div className="category-column">
                    <h4>Top Brands</h4>
                    <ul>
                      <li><a href="#nike">Nike</a></li>
                      <li><a href="#adidas">Adidas</a></li>
                      <li><a href="#puma">Puma</a></li>
                      <li><a href="#reebok">Reebok</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text" 
              placeholder="Search for products, brands and more" 
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="user-actions">
          <div className="action-btn profile-action-btn" onClick={isLoggedIn ? () => onProfileClick('info') : handleLogin}>
            <FaUser className="icon" />
            <span className="label">{isLoggedIn && user ? `Hi, ${user.name.split(' ')[0]}` : 'Login'}</span>
            
            {isLoggedIn && (
              <div className="profile-dropdown">
                <div className="dropdown-arrow"></div>
                <div className="dropdown-content-list">
                  <div className="dropdown-greeting">Hello, {user?.name}</div>
                  <div className="dropdown-section-title">Your Account</div>
                  <a onClick={(e) => { e.stopPropagation(); onProfileClick('orders'); }}>Your Orders</a>
                  <a onClick={(e) => { e.stopPropagation(); onProfileClick('info'); }}>Account Details</a>
                  <a onClick={(e) => { e.stopPropagation(); handleWishlistClick(); }}>Your Wishlist</a>
                  <div className="dropdown-divider"></div>
                  <a onClick={(e) => { e.stopPropagation(); handleLogout(); }} className="text-danger">Sign Out</a>
                </div>
              </div>
            )}
          </div>
          <div className="action-btn" onClick={handleWishlistClick}>
            <FaHeart className="icon" />
            <span className="label">Wishlist</span>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </div>
          <div className="action-btn" onClick={handleCartClickWrapper}>
            <FaShoppingBag className="icon" />
            <span className="label">Bag</span>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;