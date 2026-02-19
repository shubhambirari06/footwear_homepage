import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './Product/ProductDetailModal';
import { Footer } from './Footer';

interface AllProductsProps {
  onBack: () => void;
}

export const AllProducts: React.FC<AllProductsProps> = ({ onBack }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const genders = Array.from(new Set(products.map(p => p.gender).filter(Boolean)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedGender) {
      result = result.filter(p => p.gender === selectedGender);
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedGender, selectedCategory, priceRange, searchQuery, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 backdrop-blur-sm">
          <div className="container py-4">
            <div className="flex items-center justify-between mb-4">
              <motion.button
                whileHover={{ x: -4 }}
                onClick={onBack}
                className="text-neutral-600 hover:text-neutral-900 font-bold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </motion.button>
              <h1 className="text-2xl font-bold text-neutral-900">All Products</h1>
              <div className="w-20"></div>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-700 transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:border-amber-700 transition-colors font-medium"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="container py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="col-span-1"
              >
                <div className="bg-neutral-50 p-6 rounded-lg sticky top-32 border border-neutral-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-neutral-900">Filters</h3>
                    {showFilters && window.innerWidth < 768 && (
                      <button 
                        onClick={() => setShowFilters(false)}
                        className="md:hidden text-neutral-600 hover:text-neutral-900"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  {/* Gender Filter */}
                  <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">Gender</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors">
                        <input
                          type="radio"
                          name="gender"
                          checked={selectedGender === null}
                          onChange={() => setSelectedGender(null)}
                          className="cursor-pointer accent-amber-700"
                        />
                        <span className="text-sm">All</span>
                      </label>
                      {genders.map(gender => (
                        <label key={gender} className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors">
                          <input
                            type="radio"
                            name="gender"
                            checked={selectedGender === gender}
                            onChange={() => setSelectedGender(gender)}
                            className="cursor-pointer accent-amber-700"
                          />
                          <span className="text-sm">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === null}
                          onChange={() => setSelectedCategory(null)}
                          className="cursor-pointer accent-amber-700"
                        />
                        <span className="text-sm">All</span>
                      </label>
                      {categories.map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="cursor-pointer accent-amber-700"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">Price Range</h4>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="15000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-amber-700"
                      />
                      <div className="text-sm text-neutral-600 font-medium">
                        ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedGender(null);
                      setSelectedCategory(null);
                      setPriceRange([0, 15000]);
                      setSearchQuery('');
                    }}
                    className="w-full py-2 border border-neutral-300 rounded-lg text-sm font-bold hover:bg-neutral-100 transition-colors"
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="col-span-1 md:col-span-3">
            {paginatedProducts.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <p className="text-sm text-neutral-600">
                    Showing <span className="font-bold text-neutral-900">{paginatedProducts.length}</span> of <span className="font-bold text-neutral-900">{filteredProducts.length}</span> products
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-bold text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </motion.button>
                    <span className="text-sm text-neutral-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-bold text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 col-span-full"
              >
                <p className="text-neutral-600 text-lg mb-4">No products found matching your filters</p>
                <button
                  onClick={() => {
                    setSelectedGender(null);
                    setSelectedCategory(null);
                    setPriceRange([0, 15000]);
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-bold"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
