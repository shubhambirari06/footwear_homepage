import React, { useState } from 'react';
import { useAuth } from '../utils/authContext';
import { Link } from 'react-router-dom';
import { Package, X, Download, Truck, CheckCircle, Clock } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null
  );

  const handleDownloadInvoice = (order: any) => {
    // This is a mock implementation. In a real app, this would generate a PDF.
    alert(`Downloading invoice for order ${order.id}`);
  };

  const handleCancelOrder = (orderId: string) => {
    setCancellingOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    if (cancellingOrderId) {
      setOrders((prev) => prev.filter((o) => o.id !== cancellingOrderId));
      setCancellingOrderId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
        <p className="text-neutral-600">
          Sign in to view your orders.
        </p>
      </div>
    );
  }
  
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/profile"
              className="text-amber-700 font-medium hover:underline"
            >
              ← Back to Account
            </Link>
            <h1 className="text-4xl font-bold">My Orders</h1>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-neutral-200 rounded-lg overflow-hidden bg-white"
                >
                  <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex flex-col sm:flex-row justify-between gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500 font-bold uppercase text-xs">
                        Order Placed
                      </p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 font-bold uppercase text-xs">
                        Total
                      </p>
                      <p className="font-medium">
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-500 font-bold uppercase text-xs">
                        Ship To
                      </p>
                      <p className="font-medium text-amber-700">
                        {order.user?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-500 font-bold uppercase text-xs">
                        Order #
                      </p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                  </div>
                  <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                    <h4 className="font-bold text-sm mb-2">
                      Customer Details
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Email: {order.user?.email}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Phone: {order.user?.phoneNumber}
                    </p>
                  </div>
                  <div className="p-4">
                    {order.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex gap-4 mb-4 last:mb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md bg-neutral-100"
                        />
                        <div>
                          <h4 className="font-bold text-sm">
                            {item.name}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {item.brand}
                          </p>
                          <p className="text-sm text-neutral-500 mt-1">
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-amber-700 mt-1">
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-neutral-100 bg-neutral-50/30 flex justify-end gap-3">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                      Cancel Order
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                    >
                      <Download size={16} />
                      Invoice
                    </button>
                    <button
                      onClick={() => setTrackingOrder(order)}
                      className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                    >
                      <Truck size={16} />
                      Track Order
                    </button>
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
              <p className="text-neutral-600 text-lg">No orders yet.</p>
              <p className="text-neutral-500 mb-8">
                Your order history will appear here once you place your
                first order.
              </p>
              <Link
                to="/category"
                className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors inline-block"
              >
                Start Shopping
              </Link>
            </div>
          )}
        
      </div>

      {trackingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setTrackingOrder(null)}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
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
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">
                      Order ID
                    </p>
                    <p className="font-medium text-neutral-900">
                      {trackingOrder.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">
                      Estimated Delivery
                    </p>
                    <p className="font-medium text-amber-700">
                      Arriving by{' '}
                      {new Date(
                        Date.now() + 3 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-4">
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-neutral-100" />
                {[
                  {
                    title: 'Order Placed',
                    date: trackingOrder.date,
                    status: 'completed',
                  },
                  {
                    title: 'Processing',
                    date: trackingOrder.date,
                    status: 'completed',
                  },
                  { title: 'Shipped', date: 'Today', status: 'current' },
                  {
                    title: 'Out for Delivery',
                    date: 'Pending',
                    status: 'upcoming',
                  },
                  { title: 'Delivered', date: 'Pending', status: 'upcoming' },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 mb-8 last:mb-0 relative z-10"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        step.status === 'completed'
                          ? 'bg-green-50 border-green-500 text-green-600'
                          : step.status === 'current'
                          ? 'bg-amber-50 border-amber-500 text-amber-700'
                          : 'bg-white border-neutral-200 text-neutral-300'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle size={14} />
                      ) : step.status === 'current' ? (
                        <Truck size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                    </div>
                    <div className="pt-1">
                      <h4
                        className={`text-sm font-bold ${
                          step.status === 'current'
                            ? 'text-amber-700'
                            : step.status === 'completed'
                            ? 'text-neutral-900'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {step.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {cancellingOrderId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setCancellingOrderId(null)}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
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
              <p className="text-neutral-600 mb-6">
                Are you sure you want to cancel this order? This action cannot
                be undone.
              </p>
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
          </div>
        </div>
      )}
    </section>
  );
};
