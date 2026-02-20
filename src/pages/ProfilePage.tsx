import React, { useState } from 'react';
import { useAuth } from '../utils/authContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Edit2, Package, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, updateUser, onOpenAuth } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

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
    if (user) {
      updateUser({ ...user, ...editFormData });
    }
    setIsEditingProfile(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
        <p className="text-neutral-600 mb-8">
          Sign in to view and manage your account information.
        </p>
        <button
          onClick={() => onOpenAuth('login')}
          className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold">My Account</h1>
            {!isEditingProfile && (
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-4 py-2 text-amber-700 border border-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200 sticky top-24">
                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                          placeholder="Name"
                          required
                        />
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              email: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              phoneNumber: e.target.value,
                            })
                          }
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
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <h2 className="text-xl font-bold text-neutral-900">
                        {user?.name}
                      </h2>
                      <p className="text-sm text-neutral-600">
                        {user?.email}
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
                          {user?.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 font-semibold mb-1">
                          MEMBER SINCE
                        </p>
                        <p className="text-sm font-medium">
                          {user?.joinDate}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
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

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    Recent Orders
                  </h2>
                  <Link
                    to="/orders"
                    className="text-amber-700 font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="p-8 border border-neutral-200 rounded-lg text-center bg-neutral-50">
                  <p className="text-neutral-600">
                    No orders yet. Start shopping to place your
                    first order!
                  </p>
                  <Link
                    to="/category"
                    className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
