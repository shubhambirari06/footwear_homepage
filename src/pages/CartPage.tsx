import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../utils/authContext';
import { useToast } from '../contexts/ToastContext';
import { ToastType } from '../enums';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, X } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();
  const { isLoggedIn, onOpenAuth } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const platformFee = 20;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === 'WELCOME200') {
      setAppliedCoupon({ code: 'WELCOME200', discount: 200 });
      setCouponCode('');
      addToast('Coupon applied successfully!', ToastType.SUCCESS, 2000);
    } else {
      addToast('Invalid coupon code. Try WELCOME200', ToastType.ERROR, 2000);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', ToastType.INFO, 2000);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      onOpenAuth('login');
      return;
    }

    if (cartItems.length === 0) {
      addToast('Your cart is empty', ToastType.INFO, 2000);
      return;
    }
    
    // In a real app, this would redirect to a checkout page or service
    addToast('Redirecting to checkout...', ToastType.SUCCESS, 2000);
    clearCart();
    navigate('/orders');
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8">
              Add some amazing shoes to get started!
            </p>
            <Link
              to="/category"
              className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-6 p-6 border border-neutral-200 rounded-lg mb-4 hover:shadow-md transition-shadow bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-neutral-600 text-sm">{item.brand}</p>
                    <p className="text-amber-700 font-semibold mt-2">
                      ₹{item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(item.quantity - 1, 1),
                            item.size
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
                            item.size
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
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 text-sm mt-4 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 h-fit sticky top-24">
              <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex items-center gap-2 mb-3 text-neutral-900">
                    <Tag size={16} className="text-amber-700" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Coupons
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-green-700">
                          {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-green-600">
                          ₹{appliedCoupon.discount} saved
                        </p>
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
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
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
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount:</span>
                      <span>
                        -₹
                        {appliedCoupon.discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Platform Fee:</span>
                    <span>
                      ₹{platformFee.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-4 flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="text-2xl font-bold text-amber-700">
                      ₹
                      {(
                        cartTotal +
                        platformFee -
                        (appliedCoupon?.discount || 0)
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 mt-6 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/category"
                  className="w-full py-3 mt-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
