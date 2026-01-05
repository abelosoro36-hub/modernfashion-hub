'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  county: string;
  town: string;
  address: string;
  paymentMethod: string;
  mpesaNumber?: string;
  items: any[];
  total: number;
  status: string;
  date: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  // Check if already logged in
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      const adminEmail = localStorage.getItem('adminEmail');
      
      if (adminAuth === 'true' && adminEmail) {
        setIsAuthenticated(true);
        setEmail(adminEmail);
        loadOrders();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Load orders from localStorage
  const loadOrders = () => {
    const savedOrders = localStorage.getItem('fashionHubOrders');
    if (savedOrders) {
      const ordersList = JSON.parse(savedOrders);
      setOrders(ordersList);
      calculateStats(ordersList);
    }
  };

  // Calculate statistics
  const calculateStats = (ordersList: Order[]) => {
    const totalRevenue = ordersList.reduce((sum: number, order: Order) => sum + order.total, 0);
    const pendingOrders = ordersList.filter((order: Order) => order.status === 'pending').length;
    const completedOrders = ordersList.filter((order: Order) => order.status === 'completed').length;
    
    setStats({
      totalOrders: ordersList.length,
      totalRevenue,
      pendingOrders,
      completedOrders
    });
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', email);
        loadOrders();
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    setEmail('');
    setPassword('');
    router.push('/');
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('fashionHubOrders', JSON.stringify(updatedOrders));
    calculateStats(updatedOrders);
  };

  // Delete order
  const deleteOrder = (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('fashionHubOrders', JSON.stringify(updatedOrders));
    setSelectedOrder(null);
    calculateStats(updatedOrders);
  };

  // Clear all orders
  const clearAllOrders = () => {
    if (!confirm('Are you sure you want to delete ALL orders? This cannot be undone!')) return;
    
    localStorage.removeItem('fashionHubOrders');
    setOrders([]);
    calculateStats([]);
  };

  // Export orders to CSV
  const exportToCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer', 'Phone', 'Email', 'Location', 'Total', 'Payment', 'Status'];
    const csvData = orders.map(order => [
      order.id,
      order.date,
      order.customerName,
      order.phone,
      order.email || 'N/A',
      `${order.town}, ${order.county}`,
      order.total,
      order.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery',
      order.status
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Modern Fashion Hub</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="admin@modernfashionhub.co.ke"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
            <p className="font-semibold mb-2">📋 Default Credentials:</p>
            <p><strong>Email:</strong> admin@modernfashionhub.co.ke</p>
            <p><strong>Password:</strong> Admin@2024</p>
            <p className="mt-2 text-xs text-blue-600">⚠️ Change these in the API route for security!</p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Modern Fashion Hub
              </h1>
              <p className="text-sm text-gray-600">Admin Dashboard · Logged in as {email}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium text-sm"
              >
                📥 Export CSV
              </button><button
    onClick={() => router.push('/admin/products')}
    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-medium text-sm"
  >
    📦 Manage Products
  </button>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm"
              >
                🌐 View Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-3xl font-bold mb-1">{stats.totalOrders}</div>
            <div className="text-blue-100">Total Orders</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold mb-1">KSh {stats.totalRevenue.toLocaleString()}</div>
            <div className="text-green-100">Total Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-3xl font-bold mb-1">{stats.pendingOrders}</div>
            <div className="text-yellow-100">Pending Orders</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-3xl font-bold mb-1">{stats.completedOrders}</div>
            <div className="text-pink-100">Completed</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            {orders.length > 0 && (
              <button
                onClick={clearAllOrders}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">Orders will appear here once customers start shopping</p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
              >
                Go to Website
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.town}, {order.county}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        KSh {order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.paymentMethod === 'mpesa' ? '📱 M-Pesa' : '💵 COD'}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                            'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-pink-600 hover:text-pink-800 font-medium mr-3 hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:text-red-800 font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            ></div>

            <div className="relative bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Order ID Badge */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-4 text-center">
                  <p className="text-sm opacity-90 mb-1">Order ID</p>
                  <p className="text-2xl font-bold">#{selectedOrder.id.slice(0, 12)}</p>
                  <p className="text-sm opacity-90 mt-1">{selectedOrder.date}</p>
                </div>

                {/* Customer Info */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👤</span> Customer Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📍</span> Delivery Address
                  </h4>
                  <p className="text-gray-900 leading-relaxed">
                    {selectedOrder.address}<br />
                    {selectedOrder.town}, {selectedOrder.county}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🛍️</span> Order Items
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.priceDisplay} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💳</span> Payment Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Payment Method:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedOrder.paymentMethod === 'mpesa' ? '📱 M-Pesa' : '💵 Cash on Delivery'}
                      </span>
                    </div>
                    {selectedOrder.mpesaNumber && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">M-Pesa Number:</span>
                        <span className="font-semibold text-gray-900">{selectedOrder.mpesaNumber}</span>
                      </div>
                    )}
                    <div className="border-t border-green-200 pt-3 mt-3">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-900">Total Amount:</span>
                        <span className="text-green-600">KSh {selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Update Order Status</h4>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-semibold"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="processing">🔄 Processing</option>
                    <option value="shipped">🚚 Shipped</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      deleteOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}