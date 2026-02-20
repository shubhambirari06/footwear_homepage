import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductGrid } from '../components/Product/ProductGrid';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../utils/authContext';
import { useToast } from '../contexts/ToastContext';
import { ToastType } from '../enums';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { isLoggedIn, onOpenAuth } = useAuth();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    addToast(`Added to cart`, ToastType.SUCCESS, 2000);
  };

  const handleWishlistToggle = (product: Product) => {
    if (!isLoggedIn) {
      onOpenAuth('login');
      return;
    }
    toggleWishlist(product);
    const isCurrentlyInWishlist = isInWishlist(product.id);
    addToast(
      isCurrentlyInWishlist ? `Removed from wishlist` : `Added to wishlist`,
      ToastType.INFO,
      2000
    );
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-neutral-600 mb-8">
              Add your favorite shoes to save them for later!
            </p>
            <Link
              to="/category"
              className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={wishlistItems}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            isWishlistItem={(id) => isInWishlist(id)}
          />
        )}
      </div>
    </section>
  );
};
