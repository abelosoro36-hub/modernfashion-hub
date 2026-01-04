import Navigation from './components/Navigation';
import FAQ from './components/FAQ';
import Products from './components/Products';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen animated-gradient flex items-center justify-center overflow-hidden pt-16">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 fade-in-up">
            Your Fashion & Beauty
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Destination in Kenya
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-800 mb-8 fade-in-up max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Premium fashion and beauty products delivered nationwide from Kisii to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="#products">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl">
                Shop Collections
              </button>
            </a>
            <a href="#location">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl border-2 border-gray-900">
                Visit Our Store
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Collections
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated fashion and beauty products for the modern Kenyan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Collection Card 1 - Women's Fashion */}
            <a href="#products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">👗</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h4 className="text-2xl font-bold text-white mb-2">Women's Fashion</h4>
                  <p className="text-gray-200">Trendy Outfits</p>
                </div>
              </div>
            </a>

            {/* Collection Card 2 - Men's Fashion */}
            <a href="#products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">👔</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h4 className="text-2xl font-bold text-white mb-2">Men's Fashion</h4>
                  <p className="text-gray-200">Sharp & Stylish</p>
                </div>
              </div>
            </a>

            {/* Collection Card 3 - Beauty Products */}
            <a href="#products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 via-fuchsia-300 to-pink-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">💄</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h4 className="text-2xl font-bold text-white mb-2">Beauty Products</h4>
                  <p className="text-gray-200">Glow Up</p>
                </div>
              </div>
            </a>

            {/* Collection Card 4 - Accessories */}
            <a href="#products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">👜</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h4 className="text-2xl font-bold text-white mb-2">Accessories</h4>
                  <p className="text-gray-200">Complete Your Look</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Products Section - NEW */}
      <Products />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h3>
            <p className="text-xl text-gray-600">
              Real stories from satisfied customers across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Aisha Mohamed</h4>
                  <p className="text-gray-600 text-sm">Nairobi</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Amazing quality and fast delivery to Nairobi! The beauty products are authentic and the fashion pieces are stunning. Modern Fashion Hub is now my go-to store!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">John Mwangi</h4>
                  <p className="text-gray-600 text-sm">Kisii</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Being local to Kisii, I love that I can visit the store next to Shivling Supermarket. The staff are so helpful and the prices are fair. Highly recommend!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                  G
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Grace Wanjiku</h4>
                  <p className="text-gray-600 text-sm">Mombasa</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Ordered from Mombasa and received my items in just 3 days! The packaging was perfect and everything was exactly as described. Will definitely order again!"
              </p>
            </div>
          </div>

          {/* Additional Testimonials Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Mary Njeri</h4>
                  <p className="text-gray-600 text-sm">Nakuru</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "The beauty products transformed my skincare routine! Genuine products at great prices. Customer service is exceptional too. Thank you Modern Fashion Hub!"
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">David Omondi</h4>
                  <p className="text-gray-600 text-sm">Eldoret</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Best menswear collection I've found online in Kenya! The fit is perfect and the quality is top-notch. Delivery to Eldoret was smooth and professional."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Visit Us & Delivery Info
            </h3>
            <p className="text-xl text-gray-600">
              Nationwide delivery across Kenya from our Kisii location
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main Office Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                    📍
                  </div>
                  <div className="ml-4">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Main Office</h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Kisii Town<br />
                      Next to Shivling Supermarket<br />
                      Kisii County, Kenya
                    </p>
                  </div>
                </div>
                <div className="border-t border-pink-200 pt-6 mt-6">
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Business Hours:</span><br />
                    Monday - Saturday: 8:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Contact:</span><br />
                    Phone: +254 710 782 380<br />
                    WhatsApp: +254 790 228 698<br />
                    Email: info@modernfashionhub.co.ke
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                    🚚
                  </div>
                  <div className="ml-4">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Nationwide Delivery</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span><strong>Nairobi:</strong> 1-2 business days</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span><strong>Major Towns:</strong> 2-3 business days</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span><strong>All Counties:</strong> 2-5 business days</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Free delivery on orders over KSh 5,000</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Track your order in real-time</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center shadow-lg overflow-hidden relative">
<div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-30"></div>
<div className="relative z-10 text-center">
<div className="text-6xl mb-4">🗺️</div>
<p className="text-gray-700 font-semibold text-lg">Kisii Town</p>
<p className="text-gray-600">Next to Shivling Supermarket</p>
</div>
</div><div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">🇰🇪</div>
              <p className="font-bold text-gray-900 text-lg">47 Counties</p>
              <p className="text-gray-600 text-sm">We Deliver</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-bold text-gray-900 text-lg">Fast Shipping</p>
              <p className="text-gray-600 text-sm">Nationwide</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">💯</div>
              <p className="font-bold text-gray-900 text-lg">Authentic</p>
              <p className="text-gray-600 text-sm">Products Only</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-bold text-gray-900 text-lg">Gift Wrapping</p>
              <p className="text-gray-600 text-sm">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* FAQ Section */}
  <FAQ />

  {/* CTA Section */}
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h3 className="text-4xl sm:text-5xl font-bold mb-6">
        Ready to Elevate Your Style?
      </h3>
      <p className="text-xl mb-8 opacity-90">
        Shop the latest fashion and beauty trends delivered to your doorstep
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#products">
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
            Start Shopping
          </button>
        </a>
        <a href="#location">
          <button className="px-8 py-4 bg-transparent text-white rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-purple-600 transition-all hover:scale-105">
            Visit Store in Kisii
          </button>
        </a>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Modern Fashion Hub
          </h4>
          <p className="text-gray-400 mb-4">
            Your premier fashion and beauty destination in Kenya
          </p>
          <p className="text-gray-400 text-sm">
            Kisii Town, Next to Shivling Supermarket
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#products" className="hover:text-white transition-colors">Shop Products</a></li>
            <li><a href="#collections" className="hover:text-white transition-colors">Collections</a></li>
            <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Customer Service</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Connect With Us</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">📱 WhatsApp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">📷 Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">📘 Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">🐦 Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Modern Fashion Hub. All rights reserved. | Proudly serving Kenya 🇰🇪</p>
      </div>
    </div>
  </footer>
</div>
);
}