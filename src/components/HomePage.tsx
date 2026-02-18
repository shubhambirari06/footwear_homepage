import React, { useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from "./Header";
import HeroSection from "./HeroSection";
import WelcomeSection from "./WelcomeSection";
import UserDashboard from "./UserDashboard";
import UserStatsCard from "./UserStatsCard";
import ExclusiveMemberOffers from "./ExclusiveMemberOffers";
import PersonalRecommendations from "./PersonalRecommendations";
import ProductShowcase from "./ProductShowcase";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import { Product, User } from "../types";
import { ModalType } from "../enums";
import { products, categories } from "../data";

interface HomePageProps {
  isLoggedIn: boolean;
  user: User | null;
  modal: ModalType | null;
  setModal: (modal: ModalType | null) => void;
  handleLogin: () => void;
  handleLogout: () => void;
  cart: (Product & { quantity: number; size?: number })[];
  wishlist: Product[];
  handleAddToCart: (product: Product, quantity: number, size: number) => void;
  handleRemoveFromCart: (productId: number, size?: number) => void;
  handleUpdateQuantity: (productId: number, quantity: number, size?: number) => void;
  handleToggleWishlist: (product: Product) => void;
  onCategorySelect: (gender: string, subcategory: string) => void;
  onProfileClick: (tab?: string) => void;
  onCheckout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  isLoggedIn,
  user,
  modal,
  setModal,
  handleLogin,
  handleLogout,
  cart,
  wishlist,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleToggleWishlist,
  onCategorySelect,
  onProfileClick,
  onCheckout,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedForLater, setSavedForLater] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewTitle, setViewTitle] = useState("Featured Products");
  const [isHomeView, setIsHomeView] = useState(true);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleSaveForLater = (product: Product) => {
    handleToggleWishlist(product);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setIsHomeView(false);
  };

  const handleLogoClick = () => {
    setShowCart(false);
    setIsHomeView(true);
    setFilteredProducts(products);
  };

  const handleGenderSelect = (gender: string) => {
    setFilteredProducts(products.filter(p => p.gender === gender));
    setViewTitle(`${gender}'s Collection`);
    setIsHomeView(false);
    setShowCart(false);
  };

  const handleCategorySelect = (category: string) => {
    setFilteredProducts(products.filter(p => p.category === category));
    setViewTitle(`${category} Collection`);
    setIsHomeView(false);
    setShowCart(false);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      setViewTitle("Featured Products");
      setIsHomeView(true);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(results);
    setViewTitle(`Search Results for "${query}"`);
    setIsHomeView(false);
    setShowCart(false);
  };

  const handleFooterLinkClick = (section: string) => {
    if (section === 'Home') {
      handleLogoClick();
    } else if (['Men', 'Women', 'Kids'].includes(section)) {
      handleGenderSelect(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="d-flex flex-column min-vh-100 fade-in">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        modal={modal}
        setModal={setModal}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onWishlistClick={() => onProfileClick('wishlist')}
        onCartClick={handleCartClick}
        onLogoClick={handleLogoClick}
        onGenderSelect={handleGenderSelect}
        onCategorySelect={onCategorySelect}
        onProfileClick={() => onProfileClick('info')}
        onSearch={handleSearch}
      />
      {showCart ? (
        <CartPage
          cart={cart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={onCheckout}
        />
      ) : (
        <>
          {isHomeView && (
            <>
              {isLoggedIn && user ? (
                <>
                  <WelcomeSection user={user} />
                  <UserDashboard 
                    user={user} 
                    onOrderClick={() => onProfileClick('orders')} 
                    onWishlistClick={() => onProfileClick('wishlist')}
                    onProfileClick={() => onProfileClick('info')}
                  />
                  <UserStatsCard user={user} />
                  <ExclusiveMemberOffers />
                  <PersonalRecommendations products={products} onProductClick={handleProductClick} />
                </>
              ) : (
                <>
                  <HeroSection onCategoryClick={onCategorySelect} />

                  <Container className="py-5">
                    <h2 className="text-center mb-5 fw-bold">Shop by Category</h2>
                    <Row className="g-4">
                      {categories.map((cat) => (
                        <Col md={3} sm={6} key={cat.name}>
                          <Card
                            className="h-100 text-white border-0 shadow-sm overflow-hidden category-card"
                            onClick={() => handleCategorySelect(cat.name)}
                          >
                            <Card.Img src={cat.image} alt={cat.name} style={{ height: '300px', objectFit: 'cover', filter: 'brightness(0.7)' }} />
                            <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                              <Card.Title className="display-6 fw-bold">{cat.name}</Card.Title>
                            </Card.ImgOverlay>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </>
              )}
            </>
          )}

          <ProductShowcase
            title={isHomeView ? (isLoggedIn ? " Trending Now for Members" : "New Arrivals") : viewTitle}
            products={isHomeView ? products.filter(p => p.isNew) : filteredProducts}
            onProductClick={handleProductClick}
          />
        </>
      )}
      <Footer onLinkClick={handleFooterLinkClick} />
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseProductDetail}
          onAddToCart={handleAddToCart}
          onSaveForLater={handleSaveForLater}
        />
      )}
    </div>
  );
};

export default HomePage;
