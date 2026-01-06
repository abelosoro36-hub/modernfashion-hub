"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingCounty: '',
  });

  const subtotal = getCartTotal();
  const shippingFee = subtotal >= 5000 ? 0 : 300;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) return 'Please enter your name';
    if (!formData.customerEmail.trim()) return 'Please enter your email';
    if (!formData.customerEmail.includes('@')) return 'Please enter a valid email';
    if (!formData.customerPhone.trim()) return 'Please enter your phone number';
    if (!formData.shippingAddress.trim()) return 'Please enter your address';
    if (!formData.shippingCity.trim()) return 'Please enter your city';
    if (!formData.shippingCounty.trim()) return 'Please enter your county';
    if (cart.length === 0) return 'Your cart is empty';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create order
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingCounty: formData.shippingCounty,
        subtotal: subtotal,
        shippingFee: shippingFee,
        totalAmount: totalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        orderItems: cart.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        }))
      };

      console.log('Creating order:', orderData);

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      
      console.log('Order response:', response.data);

      if (response.data && response.data.id) {
        const orderId = response.data.id;
        
        // Clear cart after successful order creation
        // clearCart(); // Uncomment if you want to clear cart immediately
        
        // Redirect to payment page
        router.push(`/payment?orderId=${orderId}&amount=${totalAmount}&email=${encodeURIComponent(formData.customerEmail)}&name=${encodeURIComponent(formData.customerName)}`);
      } else {
        throw new Error('Order creation failed - no order ID returned');
      }
    } catch (err: any) {
      console.error('Error creating order:', err);
      
      let errorMessage = 'Failed to create order. Please try again.';
      
      if (err.response) {
        // Server responded with error
        console.error('Error response:', err.response.data);
        errorMessage = err.response.data?.message || errorMessage;
      } else if (err.request) {
        // Request made but no response
        console.error('No response received:', err.request);
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else {
        // Error in request setup
        console.error('Request error:', err.message);
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some amazing products to get started!</p>
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5" />
              Back to Shopping
            </button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-10 h-10 text-purple-600" />
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="0712 345 678"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="Street address, apartment, suite, etc."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                {/* City & County */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City/Town *
                    </label>
                    <input
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      placeholder="Nairobi"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      County *
                    </label>
                    <input
                      type="text"
                      name="shippingCounty"
                      value={formData.shippingCounty}
                      onChange={handleInputChange}
                      placeholder="Nairobi County"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800"
                    >
                      <strong>Error:</strong> {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image.startsWith('http') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{item.image || '🛍️'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `KES ${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-gray-500">
                    💡 Add KES {(5000 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
                <span>Total:</span>
                <span className="text-purple-600">KES {totalAmount.toLocaleString()}</span>
              </div>

              {/* Payment Info */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-900 font-medium flex items-center gap-2">
                  <span className="text-2xl">💳</span>
                  Pay securely with M-Pesa on the next step
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}