import React, { useCallback, useState } from "react";
import { Hero } from "../components/Sections/Hero";
import { FeaturedProducts } from "../components/Sections/FeaturedProducts";
import { CategoryShowcase } from "../components/Sections/CategoryShowcase";
import { Product } from "../types";
import { ProductDetailModal } from "../components/Product/ProductDetailModal";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../utils/authContext";
import { ToastType } from "../enums";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const { isLoggedIn, onOpenAuth: openAuth } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  }, []);

  const handleCloseProductDetail = useCallback(() => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleProductDetailAddToCart = useCallback(
    (product: Product, quantity: number, size: string) => {
      addToCart(product, quantity, size);
      addToast(
        `Added ${quantity}x ${product.name} (Size ${size}) to cart`,
        ToastType.SUCCESS,
        2000,
      );
    },
    [addToCart, addToast],
  );

  const handleWishlistToggle = useCallback(
    (product: Product) => {
      if (!isLoggedIn) {
        if (openAuth) openAuth("login");
        return;
      }
      toggleWishlist(product);
      const isCurrentlyInWishlist = isInWishlist(product.id);
      addToast(
        isCurrentlyInWishlist ? `Removed from wishlist` : `Added to wishlist`,
        ToastType.INFO,
        2000,
      );
    },
    [isLoggedIn, toggleWishlist, isInWishlist, openAuth, addToast],
  );

  return (
    <>
      <Hero />
      <FeaturedProducts
        onViewAll={() => {
          navigate("/category");
        }}
        onProductClick={handleProductClick}
        onAddToCart={handleProductClick}
      />
      <CategoryShowcase
        onCategoryClick={(gender, category) => {
          navigate(`/category?gender=${gender}&category=${category}`);
        }}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={handleCloseProductDetail}
        onAddToCart={handleProductDetailAddToCart}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={
          selectedProduct ? isInWishlist(selectedProduct.id) : false
        }
      />
    </>
  );
};
