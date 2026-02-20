import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "../Navigation/Header";
import { Footer } from "../Layout/Footer";
import { Hero } from "../Sections/Hero";
import { FeaturedProducts } from "../Sections/FeaturedProducts";
import { CategoryShowcase } from "../Sections/CategoryShowcase";
import { ProductGrid } from "../Product/ProductGrid";
import { ProductDetailModal } from "../Product/ProductDetailModal";
import { ToastManager } from "../Toast/ToastManager";
import { useAuth } from "../../utils/authContext";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useToast } from "../../hooks/useToast";
import { products } from "../../data/index";
import { Product } from "../../types/index";
import { ViewType, ToastType } from "../../enums";
import {
  WELCOME_MESSAGES,
  TOAST_DURATION,
  ROUTE_PATHS,
} from "../../config/app.config";
import { Package, Phone, Edit2, Filter, X, ArrowUp, Truck, CheckCircle, Clock, Tag, Download } from "lucide-react";

interface HomePageProps {
  onOpenAuth: (mode: "login" | "register") => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  const { isLoggedIn, user, logout, updateUser } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();
  const { wishlistItems, toggleWishlist, wishlistCount, isInWishlist } =
    useWishlist();
  const { toasts, addToast, removeToast } = useToast();

  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const previousLoginStateRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const platformFee = 20;

  // Filter State
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "rating"
  >("newest");

  // Derived Data for Filters
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

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
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

  // Show welcome toast on login
  useEffect(() => {
    if (isLoggedIn && !previousLoginStateRef.current) {
      addToast(
        `${WELCOME_MESSAGES.LOGIN.TITLE} ${WELCOME_MESSAGES.LOGIN.ICON}`,
        ToastType.SUCCESS,
        TOAST_DURATION.MEDIUM,
      );
      addToast(
        WELCOME_MESSAGES.LOGIN.MESSAGE,
        ToastType.INFO,
        TOAST_DURATION.LONG,
      );
    }
    previousLoginStateRef.current = isLoggedIn;
  }, [isLoggedIn, addToast]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentView(ViewType.SEARCH);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    setIsProfileDropdownOpen(false);
    if (path === ROUTE_PATHS.HOME) {
      setCurrentView(ViewType.HOME);
      setSelectedGenders([]);
      setSelectedCategories([]);
      setSelectedBrands([]);
      setPriceRange([0, 15000]);
      setSearchQuery("");
      setSortBy("newest");
    } else if (path.startsWith("/category/")) {
      const gender = path.split("/")[2];
      setSelectedGenders([gender]);
      setSelectedCategories([]);
      setSelectedBrands([]);
      setPriceRange([0, 15000]);
      setCurrentView(ViewType.CATEGORY);
    } else if (path === ROUTE_PATHS.CART) {
      setCurrentView(ViewType.CART);
    } else if (path === ROUTE_PATHS.WISHLIST) {
      setCurrentView(ViewType.WISHLIST);
    } else if (path === ROUTE_PATHS.PROFILE) {
      setCurrentView(ViewType.PROFILE);
    } else if (path === "/orders") {
      setCurrentView(ViewType.ORDERS);
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsProfileDropdownOpen(false);
    setCurrentView(ViewType.HOME);
    addToast(
      WELCOME_MESSAGES.LOGOUT.MESSAGE,
      ToastType.INFO,
      TOAST_DURATION.MEDIUM,
    );
  }, [logout, addToast]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setIsProductDetailOpen(true);
    },
    [],
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

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    // Mock coupon logic
    if (couponCode.toUpperCase() === "WELCOME200") {
      setAppliedCoupon({ code: "WELCOME200", discount: 200 });
      setCouponCode("");
      addToast("Coupon applied successfully!", ToastType.SUCCESS, 2000);
    } else {
      addToast("Invalid coupon code. Try WELCOME200", ToastType.ERROR, 2000);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    addToast("Coupon removed", ToastType.INFO, 2000);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      onOpenAuth("login");
      return;
    }

    if (cartItems.length === 0) {
      addToast("Your cart is empty", ToastType.INFO, 2000);
      return;
    }

    const finalTotal = cartTotal + platformFee - (appliedCoupon?.discount || 0);

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: finalTotal,
      subtotal: cartTotal,
      platformFee: platformFee,
      discount: appliedCoupon?.discount || 0,
      items: [...cartItems],
      user: user
    };

    setOrders([newOrder, ...orders]);
    cartItems.forEach(item => removeFromCart(item.id, item.size));
    setAppliedCoupon(null);
    addToast("Your order is successfully placed!", ToastType.SUCCESS, 3000);
    setCurrentView(ViewType.ORDERS);
  };

  const handleDownloadInvoice = (order: any) => {
    const gstAmount = Math.round((order.total * 18) / 118); // Assuming 18% GST included
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice ${order.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #b45309; padding-bottom: 20px; }
            .company-name { font-size: 28px; font-weight: bold; color: #b45309; }
            .invoice-title { font-size: 24px; font-weight: bold; text-align: right; color: #333; }
            .section { margin-bottom: 30px; }
            .flex-row { display: flex; justify-content: space-between; }
            .address-box { width: 45%; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #f8f9fa; text-align: left; padding: 12px; border-bottom: 2px solid #ddd; font-size: 14px; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
            .totals { width: 300px; margin-left: auto; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .grand-total { font-weight: bold; font-size: 18px; border-top: 2px solid #333; margin-top: 10px; padding-top: 10px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">URBAN STEPS</div>
            <div class="invoice-title">
              TAX INVOICE<br>
              <span style="font-size: 14px; font-weight: normal;">#${order.id}</span>
            </div>
          </div>

          <div class="section flex-row">
            <div class="address-box">
              <strong>Sold By:</strong><br>
              UrbanSteps Retail Pvt Ltd<br>
              Building 4, Tech Park<br>
              Bangalore, Karnataka - 560103<br>
              GSTIN: 29ABCDE1234F1Z5
            </div>
            <div class="address-box" style="text-align: right;">
              <strong>Billing Address:</strong><br>
              ${order.user?.name}<br>
              ${order.user?.email}<br>
              ${order.user?.phoneNumber}<br>
              India
            </div>
          </div>

          <div class="section">
            <strong>Order Date:</strong> ${order.date}
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Gross Amount</th>
                <th>Tax Amount (18%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => {
                const itemTotal = item.price * item.quantity;
                const itemTax = Math.round((itemTotal * 18) / 118);
                const itemBase = itemTotal - itemTax;
                return `
                  <tr>
                    <td>
                      <strong>${item.name}</strong><br>
                      <span style="font-size: 12px; color: #666;">${item.brand} | Size: ${item.size}</span>
                    </td>
                    <td>${item.quantity}</td>
                    <td>₹${itemBase.toLocaleString('en-IN')}</td>
                    <td>₹${itemTax.toLocaleString('en-IN')}</td>
                    <td>₹${itemTotal.toLocaleString('en-IN')}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>₹${(order.subtotal || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="total-row">
              <span>Platform Fee</span>
              <span>₹${(order.platformFee || 0).toLocaleString('en-IN')}</span>
            </div>
            ${order.discount ? `
            <div class="total-row" style="color: green;">
              <span>Discount</span>
              <span>-₹${order.discount.toLocaleString('en-IN')}</span>
            </div>
            ` : ''}
            <div class="total-row grand-total">
              <span>Total Amount</span>
              <span>₹${order.total.toLocaleString('en-IN')}</span>
            </div>
            <div style="text-align: right; font-size: 12px; color: #666; margin-top: 5px;">
              (Includes GST of approx. ₹${gstAmount.toLocaleString('en-IN')})
            </div>
          </div>

          <div class="footer">
            <p>Thank you for shopping with UrbanSteps!</p>
            <p>For support, contact support@urbansteps.com</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
    }
  };

  const handleCancelOrder = (orderId: string) => {
    setCancellingOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    if (cancellingOrderId) {
      setOrders((prev) => prev.filter((o) => o.id !== cancellingOrderId));
      addToast("Order cancelled successfully", ToastType.INFO, 3000);
      setCancellingOrderId(null);
    }
  };

  const handleEditProfile = () => {
    if (user) {
      setEditFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setIsEditingProfile(true);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(editFormData.phoneNumber)) {
      addToast("Phone number must be 10 digits", ToastType.ERROR, 3000);
      return;
    }

    if (user) {
      const updatedUser = { ...user, ...editFormData };
      
      // Update in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u: any) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...editFormData };
        localStorage.setItem("users", JSON.stringify(users));
      }

      if (updateUser) updateUser(updatedUser);
    }
    
    setIsEditingProfile(false);
    addToast("Profile updated successfully", ToastType.SUCCESS, 2000);
  };

  const displayProducts = useMemo(() => {
    if (currentView === ViewType.HOME) {
      return products.filter((p) => p.isNew).slice(0, 12);
    }
    return filteredProducts;
  }, [currentView, filteredProducts]);

  const totalPages = useMemo(
    () => Math.ceil(displayProducts.length / productsPerPage),
    [displayProducts.length],
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return displayProducts.slice(startIndex, startIndex + productsPerPage);
  }, [displayProducts, currentPage, productsPerPage]);

  // Reset to page 1 when filters or view changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, currentView]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Notification System */}
      <ToastManager toasts={toasts} onRemove={removeToast} />

      {/* Header - Consistent across all views */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        onOpenAuth={onOpenAuth}
        onLogout={handleLogout}
        isProfileDropdownOpen={isProfileDropdownOpen}
        onProfileDropdownToggle={setIsProfileDropdownOpen}
      />

      {/* Main Content - Changes based on currentView */}
      <main className="flex-grow">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {/* HOME VIEW */}
          {currentView === ViewType.HOME && (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <FeaturedProducts
                onViewAll={() => {
                  setCurrentView(ViewType.CATEGORY);
                }}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
              />
              <CategoryShowcase
                onCategoryClick={(gender, category) => {
                  setSelectedGenders([gender]);
                  setSelectedCategories([category]);
                  setCurrentView(ViewType.CATEGORY);
                }}
              />
            </motion.div>
          )}

          {/* SEARCH & CATEGORY VIEWS */}
          {(currentView === ViewType.SEARCH ||
            currentView === ViewType.CATEGORY) && (
            <motion.div
              key="category-search"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h1
                        className="text-4xl font-bold mb-2 outline-none"
                        tabIndex={-1}
                      >
                        {currentView === ViewType.CATEGORY
                          ? "Browse Products"
                          : "Search Results"}
                      </h1>
                      <p className="text-neutral-600">
                        Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * productsPerPage,
                          displayProducts.length,
                        )}{" "}
                        of {displayProducts.length} products
                      </p>
                    </motion.div>

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
                    {/* Filters Sidebar */}
                    <AnimatePresence>
                      {(showFilters ||
                        (typeof window !== "undefined" &&
                          window.innerWidth >= 768)) && (
                        <motion.div
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          className="col-span-1"
                        >
                          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-100 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="font-bold text-neutral-900">
                                Filters
                              </h3>
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

                            {/* Gender Filter */}
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

                            {/* Category Filter */}
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
                                      checked={selectedCategories.includes(
                                        category,
                                      )}
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

                            {/* Brand Filter */}
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

                            {/* Price Filter */}
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

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
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
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Product Grid */}
                    <div className="col-span-1 md:col-span-3">
                      <ProductGrid
                        products={paginatedProducts}
                        onProductClick={handleProductClick}
                        onAddToCart={handleAddToCart}
                        onWishlistToggle={handleWishlistToggle}
                        isWishlistItem={(id) => isInWishlist(id)}
                      />

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="mt-12 border-t border-neutral-200 pt-8">
                          {/* Mobile Pagination */}
                          <div className="flex md:hidden gap-2 justify-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={currentPage === 1}
                              onClick={() => handlePageChange(currentPage - 1)}
                              className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                            >
                              Previous
                            </motion.button>
                            <div className="flex items-center gap-2 px-4">
                              <span className="text-sm font-medium text-neutral-600">
                                Page {currentPage} of {totalPages}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={currentPage === totalPages}
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                            >
                              Next
                            </motion.button>
                          </div>

                          {/* Desktop Pagination */}
                          <div className="hidden md:flex items-center justify-between">
                            {/* Left: Results Info */}
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
                                    displayProducts.length,
                                  )}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-neutral-900">
                                  {displayProducts.length}
                                </span>{" "}
                                results
                              </p>
                            </div>

                            {/* Right: Page Numbers */}
                            <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
                              {/* Previous Button */}
                              <motion.button
                                whileHover={
                                  currentPage !== 1
                                    ? { backgroundColor: "#f5f5f5" }
                                    : {}
                                }
                                whileTap={
                                  currentPage !== 1 ? { scale: 0.98 } : {}
                                }
                                disabled={currentPage === 1}
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors"
                                aria-label="Previous page"
                              >
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </motion.button>

                              {/* Page Numbers */}
                              {(() => {
                                const range = [];
                                const delta = 2;
                                for (let i = 1; i <= totalPages; i++) {
                                  if (
                                    i === 1 ||
                                    i === totalPages ||
                                    (i >= currentPage - delta &&
                                      i <= currentPage + delta)
                                  ) {
                                    range.push(i);
                                  }
                                }

                                const rangeWithDots = [];
                                let l;
                                for (let i of range) {
                                  if (l) {
                                    if (i - l === 2) {
                                      rangeWithDots.push(l + 1);
                                    } else if (i - l !== 1) {
                                      rangeWithDots.push("...");
                                    }
                                  }
                                  rangeWithDots.push(i);
                                  l = i;
                                }

                                return rangeWithDots.map((page, index) => {
                                  if (page === "...") {
                                    return (
                                      <span
                                        key={`ellipsis-${index}`}
                                        className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                                      >
                                        ...
                                      </span>
                                    );
                                  }

                                  return (
                                    <motion.button
                                      key={page}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handlePageChange(page as number)
                                      }
                                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors border ${
                                        currentPage === page
                                          ? "z-10 bg-amber-700 border-amber-700 text-white hover:bg-amber-800"
                                          : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                                      }`}
                                      aria-current={
                                        currentPage === page
                                          ? "page"
                                          : undefined
                                      }
                                    >
                                      {page}
                                    </motion.button>
                                  );
                                });
                              })()}

                              {/* Next Button */}
                              <motion.button
                                whileHover={
                                  currentPage !== totalPages
                                    ? { backgroundColor: "#f5f5f5" }
                                    : {}
                                }
                                whileTap={
                                  currentPage !== totalPages
                                    ? { scale: 0.98 }
                                    : {}
                                }
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors"
                                aria-label="Next page"
                              >
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </motion.button>
                            </nav>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CART VIEW */}
          {currentView === ViewType.CART && (
            <motion.div
              key="cart"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold mb-2">
                          Your cart is empty
                        </h2>
                        <p className="text-neutral-600 mb-8">
                          Add some amazing shoes to get started!
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentView(ViewType.CATEGORY)}
                          className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                        >
                          Start Shopping
                        </motion.button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                          <AnimatePresence mode="popLayout">
                            {cartItems.map((item) => (
                              <motion.div
                                layout
                                key={`${item.id}-${item.size}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.9,
                                  transition: { duration: 0.2 },
                                }}
                                className="flex gap-6 p-6 border border-neutral-200 rounded-lg mb-4 hover:shadow-md transition-shadow bg-white"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg">
                                    {item.name}
                                  </h3>
                                  <p className="text-neutral-600 text-sm">
                                    {item.brand}
                                  </p>
                                  <p className="text-amber-700 font-semibold mt-2">
                                    ₹{item.price}
                                  </p>
                                  <div className="flex items-center gap-2 mt-3">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          Math.max(item.quantity - 1, 1),
                                          item.size,
                                        )
                                      }
                                      className="px-2 py-1 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          item.quantity + 1,
                                          item.size,
                                        )
                                      }
                                      className="px-2 py-1 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    ₹
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFromCart(item.id, item.size)
                                    }
                                    className="text-red-500 text-sm mt-4 hover:underline font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1 h-fit sticky top-24">
                          <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                            <h2 className="text-xl font-bold mb-6">
                              Order Summary
                            </h2>

                            {/* Coupon Section */}
                            <div className="mb-6 pb-6 border-b border-neutral-200">
                              <div className="flex items-center gap-2 mb-3 text-neutral-900">
                                <Tag size={16} className="text-amber-700" />
                                <span className="text-sm font-bold uppercase tracking-wider">Coupons</span>
                              </div>
                              
                              {appliedCoupon ? (
                                <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-lg">
                                  <div>
                                    <p className="text-sm font-bold text-green-700">{appliedCoupon.code}</p>
                                    <p className="text-xs text-green-600">₹{appliedCoupon.discount} saved</p>
                                  </div>
                                  <button 
                                    onClick={handleRemoveCoupon}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 uppercase"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-amber-700 uppercase placeholder:normal-case"
                                  />
                                  <button
                                    onClick={handleApplyCoupon}
                                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-800 transition-colors"
                                  >
                                    Apply
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between text-neutral-600">
                                <span>Subtotal:</span>
                                <span>
                                  ₹{cartTotal.toLocaleString("en-IN")}
                                </span>
                              </div>
                              
                              {appliedCoupon && (
                                <div className="flex justify-between text-green-600">
                                  <span>Coupon Discount:</span>
                                  <span>
                                    -₹{appliedCoupon.discount.toLocaleString("en-IN")}
                                  </span>
                                </div>
                              )}

                              <div className="flex justify-between text-neutral-600">
                                <span>Platform Fee:</span>
                                <span>
                                  ₹{platformFee.toLocaleString("en-IN")}
                                </span>
                              </div>

                              <div className="flex justify-between text-neutral-600">
                                <span>Shipping:</span>
                                <span className="text-green-600 font-medium">
                                  FREE
                                </span>
                              </div>
                              <div className="border-t border-neutral-200 pt-4 flex justify-between">
                                <span className="font-bold">Total:</span>
                                <span className="text-2xl font-bold text-amber-700">
                                  ₹{(cartTotal + platformFee - (appliedCoupon?.discount || 0)).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              onClick={handleCheckout}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 mt-6 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 transition-colors"
                            >
                              Proceed to Checkout
                            </motion.button>
                            <button
                              onClick={() => setCurrentView(ViewType.CATEGORY)}
                              className="w-full py-3 mt-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {/* WISHLIST VIEW */}
          {currentView === ViewType.WISHLIST && (
            <motion.div
              key="wishlist"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentView(ViewType.CATEGORY)}
                          className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                        >
                          Browse Products
                        </motion.button>
                      </div>
                    ) : (
                      <ProductGrid
                        products={wishlistItems}
                        onAddToCart={handleAddToCart}
                        onWishlistToggle={handleWishlistToggle}
                        isWishlistItem={(id) => true}
                      />
                    )}
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {/* PROFILE VIEW */}
          {currentView === ViewType.PROFILE && (
            <motion.div
              key="profile"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {isLoggedIn && user ? (
                      <div>
                        <div className="flex items-center justify-between mb-12">
                          <h1 className="text-4xl font-bold">My Account</h1>
                          {!isEditingProfile && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={handleEditProfile}
                              className="flex items-center gap-2 px-4 py-2 text-amber-700 border border-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                            >
                              <Edit2 size={18} />
                              Edit Profile
                            </motion.button>
                          )}
                        </div>

                        {/* Grid Layout: Sidebar + Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                          {/* Left Sidebar - User Info */}
                          <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200 sticky top-24">
                              {isEditingProfile ? (
                                <form onSubmit={handleSaveProfile}>
                                  <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                      {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="space-y-3">
                                      <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                        placeholder="Name"
                                        required
                                      />
                                      <input
                                        type="email"
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                        className="w-full px-3 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                        placeholder="Email"
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-4 border-t border-amber-200 pt-6">
                                    <div>
                                      <p className="text-xs text-neutral-600 font-semibold mb-1">
                                        PHONE
                                      </p>
                                      <input
                                        type="tel"
                                        value={editFormData.phoneNumber}
                                        onChange={(e) => setEditFormData({...editFormData, phoneNumber: e.target.value})}
                                        className="w-full px-3 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                        placeholder="Phone Number"
                                        maxLength={10}
                                        required
                                      />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                      <button
                                        type="button"
                                        onClick={() => setIsEditingProfile(false)}
                                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-xs font-bold text-neutral-600 hover:bg-white transition-colors"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="flex-1 px-3 py-2 bg-amber-700 rounded-md text-xs font-bold text-white hover:bg-amber-800 transition-colors"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              ) : (
                                <>
                                  <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                      {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h2 className="text-xl font-bold text-neutral-900">
                                      {user.name}
                                    </h2>
                                    <p className="text-sm text-neutral-600">
                                      {user.email}
                                    </p>
                                  </div>

                                  <div className="space-y-4 border-t border-amber-200 pt-6">
                                    <div>
                                      <p className="text-xs text-neutral-600 font-semibold mb-1">
                                        PHONE
                                      </p>
                                      <p className="text-sm font-medium flex items-center gap-2">
                                        <Phone
                                          size={16}
                                          className="text-amber-700"
                                        />
                                        {user.phoneNumber}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-neutral-600 font-semibold mb-1">
                                        MEMBER SINCE
                                      </p>
                                      <p className="text-sm font-medium">
                                        {user.joinDate}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Right Content - Stats & Orders */}
                          <div className="lg:col-span-3 space-y-8">
                            {/* Account Stats */}
                            <div>
                              <h2 className="text-2xl font-bold mb-6">
                                Account Stats
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-neutral-600 text-sm mb-1">
                                        Total Orders
                                      </p>
                                      <p className="text-3xl font-bold text-amber-700">
                                        0
                                      </p>
                                    </div>
                                    <Package
                                      size={32}
                                      className="text-amber-700 opacity-30"
                                    />
                                  </div>
                                </div>
                                <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-neutral-600 text-sm mb-1">
                                        Wishlist Items
                                      </p>
                                      <p className="text-3xl font-bold text-amber-700">
                                        {wishlistCount}
                                      </p>
                                    </div>
                                    <span className="text-3xl">❤️</span>
                                  </div>
                                </div>
                                <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-neutral-600 text-sm mb-1">
                                        Cart Items
                                      </p>
                                      <p className="text-3xl font-bold text-amber-700">
                                        {cartCount}
                                      </p>
                                    </div>
                                    <span className="text-3xl">🛍️</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Recent Orders Preview */}
                            <div>
                              <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                  Recent Orders
                                </h2>
                                <button
                                  onClick={() =>
                                    setCurrentView(ViewType.ORDERS)
                                  }
                                  className="text-amber-700 font-medium hover:underline"
                                >
                                  View All
                                </button>
                              </div>
                              <div className="p-8 border border-neutral-200 rounded-lg text-center bg-neutral-50">
                                <p className="text-neutral-600">
                                  No orders yet. Start shopping to place your
                                  first order!
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={() =>
                                    setCurrentView(ViewType.CATEGORY)
                                  }
                                  className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
                                >
                                  Shop Now
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-4">👤</div>
                        <h2 className="text-2xl font-bold mb-2">
                          Please Log In
                        </h2>
                        <p className="text-neutral-600 mb-8">
                          Sign in to view and manage your account information.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onOpenAuth("login")}
                          className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
                        >
                          Sign In
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ORDERS VIEW */}
          {currentView === ViewType.ORDERS && (
            <motion.div
              key="orders"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <button
                        onClick={() => setCurrentView(ViewType.PROFILE)}
                        className="text-amber-700 font-medium hover:underline"
                      >
                        ← Back to Account
                      </button>
                      <h1 className="text-4xl font-bold">My Orders</h1>
                    </div>

                    {isLoggedIn ? (
                      orders.length > 0 ? (
                        <div className="space-y-8">
                          {orders.map((order) => (
                            <div key={order.id} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                              <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex flex-col sm:flex-row justify-between gap-4 text-sm">
                                <div>
                                  <p className="text-neutral-500 font-bold uppercase text-xs">Order Placed</p>
                                  <p className="font-medium">{order.date}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-500 font-bold uppercase text-xs">Total</p>
                                  <p className="font-medium">₹{order.total.toLocaleString("en-IN")}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-500 font-bold uppercase text-xs">Ship To</p>
                                  <p className="font-medium text-amber-700">{order.user?.name}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-500 font-bold uppercase text-xs">Order #</p>
                                  <p className="font-medium">{order.id}</p>
                                </div>
                              </div>
                              <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                                <h4 className="font-bold text-sm mb-2">Customer Details</h4>
                                <p className="text-sm text-neutral-600">Email: {order.user?.email}</p>
                                <p className="text-sm text-neutral-600">Phone: {order.user?.phoneNumber}</p>
                              </div>
                              <div className="p-4">
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-neutral-100" />
                                    <div>
                                      <h4 className="font-bold text-sm">{item.name}</h4>
                                      <p className="text-sm text-neutral-600">{item.brand}</p>
                                      <p className="text-sm text-neutral-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                                      <p className="text-sm font-bold text-amber-700 mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="p-4 border-t border-neutral-100 bg-neutral-50/30 flex justify-end gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                >
                                  <X size={16} />
                                  Cancel Order
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleDownloadInvoice(order)}
                                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                                >
                                  <Download size={16} />
                                  Invoice
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setTrackingOrder(order)}
                                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                                >
                                  <Truck size={16} />
                                  Track Order
                                </motion.button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                      <div className="p-8 border border-neutral-200 rounded-lg text-center bg-neutral-50">
                        <Package
                          size={48}
                          className="mx-auto mb-4 text-neutral-400"
                        />
                        <p className="text-neutral-600 text-lg">
                          No orders yet.
                        </p>
                        <p className="text-neutral-500 mb-8">
                          Your order history will appear here once you place
                          your first order.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setCurrentView(ViewType.CATEGORY)}
                          className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
                        >
                          Start Shopping
                        </motion.button>
                      </div>
                      )
                    ) : (
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-2">
                          Please Log In
                        </h2>
                        <p className="text-neutral-600">
                          Sign in to view your orders.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - Consistent across all views */}
      <Footer />

      {/* Product Detail Modal */}
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

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-neutral-900 text-white rounded-full shadow-xl hover:bg-amber-700 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {trackingOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTrackingOrder(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Track Order</h3>
                <button
                  onClick={() => setTrackingOrder(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-8 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Order ID</p>
                      <p className="font-medium text-neutral-900">{trackingOrder.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Estimated Delivery</p>
                      <p className="font-medium text-amber-700">Arriving by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                <div className="relative pl-4">
                  <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-neutral-100" />
                  {[
                    { title: "Order Placed", date: trackingOrder.date, status: "completed" },
                    { title: "Processing", date: trackingOrder.date, status: "completed" },
                    { title: "Shipped", date: "Today", status: "current" },
                    { title: "Out for Delivery", date: "Pending", status: "upcoming" },
                    { title: "Delivered", date: "Pending", status: "upcoming" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 mb-8 last:mb-0 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        step.status === 'completed' ? 'bg-green-50 border-green-500 text-green-600' :
                        step.status === 'current' ? 'bg-amber-50 border-amber-500 text-amber-700' :
                        'bg-white border-neutral-200 text-neutral-300'
                      }`}>
                        {step.status === 'completed' ? <CheckCircle size={14} /> :
                         step.status === 'current' ? <Truck size={14} /> :
                         <Clock size={14} />}
                      </div>
                      <div className="pt-1">
                        <h4 className={`text-sm font-bold ${
                          step.status === 'current' ? 'text-amber-700' :
                          step.status === 'completed' ? 'text-neutral-900' : 'text-neutral-400'
                        }`}>{step.title}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancellingOrderId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancellingOrderId(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Cancel Order</h3>
                <button
                  onClick={() => setCancellingOrderId(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCancellingOrderId(null)}
                    className="px-4 py-2 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancellingOrderId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancellingOrderId(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Cancel Order</h3>
                <button
                  onClick={() => setCancellingOrderId(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCancellingOrderId(null)}
                    className="px-4 py-2 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
