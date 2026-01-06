'use client';

import { useState } from 'react';

function SplitPaymentCheckout({ 
  cart, 
  total, 
  onClose, 
  clearCart 
}: { 
  cart: any[]; 
  total: number; 
  onClose: () => void;
  clearCart: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    county: '',
    town: '',
    address: '',
    paymentMethod: 'mpesa_split',
    mpesaNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Calculate split amounts
  const halfAmount = Math.round(total / 2);
  const remainingAmount = total - halfAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentError('');

    // Create order object with split payment tracking
    const order = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      county: formData.county,
      town: formData.town,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      mpesaNumber: formData.mpesaNumber,
      items: cart,
      total: total,
      halfAmount: halfAmount,
      remainingAmount: remainingAmount,
      amountPaid: formData.paymentMethod === 'mpesa_split' ? halfAmount : 0,
      paymentStatus: formData.paymentMethod === 'mpesa_split' ? 'half_paid' : 'pending',
      status: 'pending',
      date: new Date().toLocaleString(),
      paymentHistory: [
        {
          amount: formData.paymentMethod === 'mpesa_split' ? halfAmount : 0,
          date: new Date().toLocaleString(),
          method: formData.paymentMethod,
          status: formData.paymentMethod === 'mpesa_split' ? 'pending' : 'pending'
        }
      ]
    };

    // Save order to localStorage
    const existingOrders = localStorage.getItem('fashionHubOrders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.unshift(order);
    localStorage.setItem('fashionHubOrders', JSON.stringify(orders));

    // If M-Pesa split payment, process payment
    if (formData.paymentMethod === 'mpesa_split') {
      try {
        // 1. Send M-Pesa STK Push
        console.log('Initiating M-Pesa payment...');
        const mpesaResponse = await fetch('/api/mpesa/stkpush', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: formData.mpesaNumber,
            amount: halfAmount,
            accountReference: 'ModernFashionHub',
            orderId: order.id,
          }),
        });

        const mpesaData = await mpesaResponse.json();
        console.log('M-Pesa Response:', mpesaData);

        if (!mpesaData.success) {
          throw new Error(mpesaData.error || 'Failed to send M-Pesa prompt');
        }

        setMpesaPromptSent(true);

        // 2. Send SMS prompt
        try {
          await fetch('/api/sms/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phoneNumber: formData.phone,
              message: `Hi ${formData.fullName}! 📱 Check your phone for M-Pesa prompt to pay KSh ${halfAmount.toLocaleString()} for order #${order.id.slice(0, 8)}. - Modern Fashion Hub`,
            }),
          });
        } catch (smsError) {
          console.error('SMS Error (non-critical):', smsError);
        }

        // 3. Send email confirmation
        if (formData.email) {
          try {
            await fetch('/api/email/order-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerEmail: formData.email,
                customerName: formData.fullName,
                orderId: order.id,
                items: cart,
                total: total,
                halfAmount: halfAmount,
              }),
            });
          } catch (emailError) {
            console.error('Email Error (non-critical):', emailError);
          }
        }

      } catch (error: any) {
        console.error('Payment Error:', error);
        setPaymentError(error.message || 'Failed to process payment. Please try again.');
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setOrderPlaced(true);

    // Clear cart and close after success
    setTimeout(() => {
      clearCart();
      onClose();
    }, 6000);
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h3>
            
            {formData.paymentMethod === 'mpesa_split' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-4 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💰</span>
                  <h4 className="font-bold text-gray-900">Payment Summary</h4>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Initial Payment (50%):</span>
                    <span className="font-bold text-green-600">KSh {halfAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Balance on Delivery:</span>
                    <span className="font-bold text-orange-600">KSh {remainingAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-green-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-gray-900">KSh {total.toLocaleString()}</span>
                  </div>
                </div>

                {mpesaPromptSent && (
                  <div className="bg-white rounded-xl p-4 border border-green-300">
                    <p className="text-green-800 font-semibold mb-2 flex items-center gap-2">
                      <span>📱</span> M-Pesa Prompt Sent!
                    </p>
                    <p className="text-green-700 text-sm">
                      Check your phone to complete the initial payment. Enter your M-Pesa PIN to confirm.
                    </p>
                  </div>
                )}
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-800 font-semibold mb-2">💵 Cash on Delivery</p>
                <p className="text-blue-700 text-sm">
                  Pay the full amount when your order is delivered
                </p>
              </div>
            )}

            <div className="text-left bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800 font-semibold mb-2">📦 What's Next?</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ We'll confirm your order shortly</li>
                <li>✓ Check your {formData.email ? 'email' : 'phone'} for confirmation</li>
                {formData.paymentMethod === 'mpesa_split' && (
                  <li>✓ Pay remaining balance on delivery</li>
                )}
                <li>✓ Enjoy your purchase!</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm">
              Thank you for shopping with Modern Fashion Hub! 🎉
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-gray-900">Checkout</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4">Order Summary</h4>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-pink-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-pink-600">
                KSh {total.toLocaleString()}
              </span>
            </div>
          </div>

          {paymentError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 font-semibold flex items-center gap-2">
                <span>⚠️</span> Payment Error
              </p>
              <p className="text-red-700 text-sm mt-1">{paymentError}</p>
            </div>
          )}

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Info */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  placeholder="0712345678"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  County *
                </label>
                <input
                  type="text"
                  required
                  value={formData.county}
                  onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  placeholder="e.g., Nairobi"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Town *
                </label>
                <input
                  type="text"
                  required
                  value={formData.town}
                  onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  placeholder="e.g., Westlands"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Delivery Address *
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
                placeholder="Building name, floor, apartment number, landmarks..."
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Payment Method *
              </label>
              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 border-pink-300 bg-pink-50 rounded-xl cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa_split"
                    checked={formData.paymentMethod === 'mpesa_split'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-4 h-4 text-pink-600 mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">M-Pesa Split Payment</span>
                      <span className="px-2 py-1 bg-pink-600 text-white text-xs rounded-full font-bold">RECOMMENDED</span>
                    </div>
                    <span className="text-sm text-gray-600 block mt-1">
                      Pay 50% now (KSh {halfAmount.toLocaleString()}), 50% on delivery (KSh {remainingAmount.toLocaleString()})
                    </span>
                  </div>
                </label>
                <label className="flex items-start p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-4 h-4 text-pink-600 mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-900 block">Cash on Delivery</span>
                    <span className="text-sm text-gray-600 block mt-1">
                      Pay full amount (KSh {total.toLocaleString()}) when order arrives
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {formData.paymentMethod === 'mpesa_split' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    M-Pesa Number * (for payment prompt)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mpesaNumber}
                    onChange={(e) => setFormData({ ...formData, mpesaNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="0712345678 or 254712345678"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    This number will receive the M-Pesa payment prompt
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-700 font-semibold mb-2">📱 How it works:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You'll receive an M-Pesa prompt on your phone</li>
                    <li>• Enter your M-Pesa PIN to pay KSh {halfAmount.toLocaleString()}</li>
                    <li>• We'll send you order confirmation via SMS & email</li>
                    <li>• Pay remaining KSh {remainingAmount.toLocaleString()} on delivery</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                `Place Order ${formData.paymentMethod === 'mpesa_split' ? `- Pay KSh ${halfAmount.toLocaleString()} Now` : ''}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}