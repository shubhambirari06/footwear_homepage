import React, { useState } from 'react';
import { ShoppingBag, Heart, TrendingUp, Gift, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../utils/authContext';
import { products } from '../data';
import { ProductCard } from './ProductCard';

interface LoggedInHomeProps {
  onProductClick: (id: string) => void;
  onViewAllProducts: () => void;
  wishlistCount: number;
  cartCount: number;
}

export const LoggedInHome: React.FC<LoggedInHomeProps> = ({
  onProductClick,
  onViewAllProducts,
  wishlistCount,
  cartCount,
}) => {
  const { user } = useAuth();
  const firstName = user?.name.split(' ')[0] || 'User';
  const recommendedProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 md:py-24 bg-gradient-to-r from-neutral-900 via-amber-900/10 to-neutral-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&q=80&w=1200" 
            alt="Welcome"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Welcome Back, <span className="text-amber-400">{firstName}! 👟</span>
            </h1>
            <p className="text-xl text-neutral-200 mb-8">
              Discover your personalized collection of premium footwear
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
              >
                <ShoppingBag size={20} />
                <div>
                  <div className="text-sm text-neutral-300">Cart Items</div>
                  <div className="font-bold">{cartCount}</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
              >
                <Heart size={20} />
                <div>
                  <div className="text-sm text-neutral-300">Saved Items</div>
                  <div className="font-bold">{wishlistCount}</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
              >
                <Gift size={20} />
                <div>
                  <div className="text-sm text-neutral-300">Member Since</div>
                  <div className="font-bold">{user?.joinDate}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, label: 'Trending Now', count: '42+' },
              { icon: Star, label: 'Top Rated', count: '95%' },
              { icon: Gift, label: 'Special Offers', count: '12' },
              { icon: ShoppingBag, label: 'New Arrivals', count: '156' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.count}</p>
                    </div>
                    <Icon className="text-amber-700" size={32} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-24">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-amber-700 text-sm font-bold uppercase tracking-widest mb-2">
                  Curated Just For You
                </p>
                <h2 className="text-4xl font-bold text-neutral-900">
                  Recommended Products
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                onClick={onViewAllProducts}
                className="hidden sm:flex items-center gap-2 text-amber-700 font-bold hover:text-amber-800 transition-colors"
              >
                View All <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onProductClick(product.id)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <button
              onClick={onViewAllProducts}
              className="px-12 py-4 bg-neutral-900 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors shadow-lg"
            >
              View All Products
            </button>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-16 bg-amber-700 text-white"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Exclusive Member Offer</h3>
              <p className="text-amber-100 mb-6 max-w-md">
                Get 20% off on your next purchase using code MEMBER20
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-white text-amber-700 font-bold rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Shop Now
              </motion.button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&q=80&w=400" 
              alt="Offer"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};
