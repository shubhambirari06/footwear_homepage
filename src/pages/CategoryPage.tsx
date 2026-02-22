import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/Product/ProductGrid";
import { ProductDetailModal } from "../components/Product/ProductDetailModal";
import { products } from "../data";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../utils/authContext";
import { ToastType } from "../enums";
import { Filter, X } from "lucide-react";

export const CategoryPage: React.FC = () => {
  const { gender } = useParams<{ gender: string }>();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const { isLoggedIn, onOpenAuth } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category"),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.getAll("brand"),
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "rating"
  >("newest");

  useEffect(() => {
    if (gender) {
      setSelectedGenders([gender]);
    } else {
      setSelectedGenders([]);
    }
  }, [gender]);

  const genders = useMemo(
    () => Array.from(new Set(products.map((p) => p.gender).filter(Boolean))),
    [],
  );
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [],
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    [],
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedGenders.length > 0) {
      result = result.filter((p) =>
        selectedGenders
          .map((g) => g.toLowerCase())
          .includes(p.gender.toLowerCase()),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [
    selectedGenders,
    selectedCategories,
    selectedBrands,
    priceRange,
    searchQuery,
    sortBy,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / productsPerPage),
    [filteredProducts.length],
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

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
        onOpenAuth("login");
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
    [isLoggedIn, toggleWishlist, isInWishlist, onOpenAuth, addToast],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFilter = (
    item: string,
    selected: string[],
    setSelected: (val: string[]) => void,
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1
                className="text-4xl font-bold mb-2 outline-none"
                tabIndex={-1}
              >
                Browse Products
              </h1>
              <p className="text-neutral-600">
                Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * productsPerPage,
                  filteredProducts.length,
                )}{" "}
                of {filteredProducts.length} products
              </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-700 transition-colors bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:border-amber-700 transition-colors font-medium bg-white md:hidden"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {(showFilters ||
              (typeof window !== "undefined" && window.innerWidth >= 768)) && (
              <div className="col-span-1">
                <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-100 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-neutral-900">Filters</h3>
                    {showFilters &&
                      typeof window !== "undefined" &&
                      window.innerWidth < 768 && (
                        <button
                          onClick={() => setShowFilters(false)}
                          className="text-neutral-500"
                        >
                          <X size={20} />
                        </button>
                      )}
                  </div>

                  <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">
                      Gender
                    </h4>
                    <div className="space-y-2">
                      {genders.map((gender) => (
                        <label
                          key={gender}
                          className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenders.includes(gender)}
                            onChange={() =>
                              toggleFilter(
                                gender,
                                selectedGenders,
                                setSelectedGenders,
                              )
                            }
                            className="cursor-pointer accent-amber-700 rounded"
                          />
                          <span className="text-sm">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() =>
                              toggleFilter(
                                category,
                                selectedCategories,
                                setSelectedCategories,
                              )
                            }
                            className="cursor-pointer accent-amber-700 rounded"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">
                      Brand
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() =>
                              toggleFilter(
                                brand,
                                selectedBrands,
                                setSelectedBrands,
                              )
                            }
                            className="cursor-pointer accent-amber-700 rounded"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-neutral-700">
                      Price Range
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="15000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ]);
                          setCurrentPage(1);
                        }}
                        className="w-full accent-amber-700"
                      />
                      <div className="text-sm text-neutral-600 font-medium">
                        ₹{priceRange[0].toLocaleString("en-IN")} - ₹
                        {priceRange[1].toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGenders([]);
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setPriceRange([0, 15000]);
                      setSearchQuery("");
                      setSortBy("newest");
                      setCurrentPage(1);
                    }}
                    className="w-full py-2 border border-neutral-300 rounded-lg text-sm font-bold hover:bg-neutral-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            <div className="col-span-1 md:col-span-3">
              <ProductGrid
                products={paginatedProducts}
                onProductClick={handleProductClick}
                onAddToCart={handleProductClick}
                onWishlistToggle={handleWishlistToggle}
                isWishlistItem={(id) => isInWishlist(id)}
              />

              {totalPages > 1 && (
                <div className="mt-12 border-t border-neutral-200 pt-8">
                  <div className="hidden md:flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">
                        Showing{" "}
                        <span className="font-semibold text-neutral-900">
                          {(currentPage - 1) * productsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-neutral-900">
                          {Math.min(
                            currentPage * productsPerPage,
                            filteredProducts.length,
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-neutral-900">
                          {filteredProducts.length}
                        </span>{" "}
                        results
                      </p>
                    </div>

                    <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors border ${
                              currentPage === page
                                ? "z-10 bg-amber-700 border-amber-700 text-white hover:bg-amber-800"
                                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                            }`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </button>
                        ),
                      )}
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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
