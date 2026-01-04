'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    category: "Women's Fashion",
    price: 3500,
    priceDisplay: "KSh 3,500",
    image: "/products/dress1.avif",
    description: "Perfect for special occasions"
  },
  {
    id: 2,
    name: "Casual Summer Dress",
    category: "Women's Fashion",
    price: 2200,
    priceDisplay: "KSh 2,200",
    image: "/products/dress2.avif",
    description: "Light and comfortable"
  },
  {
    id: 3,
    name: "Designer Handbag",
    category: "Accessories",
    price: 4500,
    priceDisplay: "KSh 4,500",
    image: "/products/bag1.jpg",
    description: "Stylish and spacious"
  },
  {
    id: 4,
    name: "Men's Formal Shirt",
    category: "Men's Fashion",
    price: 1800,
    priceDisplay: "KSh 1,800",
    image: "/products/shirt1.jpg",
    description: "Professional look"
  },
  {
    id: 5,
    name: "Luxury Face Cream",
    category: "Beauty",
    price: 2800,
    priceDisplay: "KSh 2,800",
    image: "/products/cream1.jpg",
    description: "Anti-aging formula"
  },
  {
    id: 6,
    name: "Makeup Kit",
    category: "Beauty",
    price: 3200,
    priceDisplay: "KSh 3,200",
    image: "/products/makeup1.jpg",
    description: "Complete set"
  },
  {
    id: 7,
    name: "Men's Sneakers",
    category: "Men's Fashion",
    price: 4200,
    priceDisplay: "KSh 4,200",
    image: "/products/shoes1.jpg",
    description: "Comfortable & stylish"
  },
  {
    id: 8,
    name: "Women's Heels",
    category: "Women's Fashion",
    price: 3800,
    priceDisplay: "KSh 3,800",
    image: "/products/heels1.jpg",
    description: "Elegant design"
  },
  {
    id: 9,
    name: "Perfume Set",
    category: "Beauty",
    price: 5500,
    priceDisplay: "KSh 5,500",
    image: "/products/perfume1.jpg",
    description: "Long-lasting fragrance"
  },
  {
    id: 10,
    name: "Leather Wallet",
    category: "Accessories",
    price: 1500,
    priceDisplay: "KSh 1,500",
    image: "/products/wallet1.jpg",
    description: "Genuine leather"
  },
  {
    id: 11,
    name: "Sunglasses",
    category: "Accessories",
    price: 2000,
    priceDisplay: "KSh 2,000",
    image: "/products/sunglasses1.jpg",
    description: "UV protection"
  },
  {
    id: 12,
    name: "Men's Watch",
    category: "Accessories",
    price: 6500,
    priceDisplay: "KSh 6,500",
    image: "/products/watch1.jpg",
    description: "Luxury timepiece"
  }
];

const categories = ["All", "Women's Fashion", "Men's Fashion", "Beauty", "Accessories"];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const getEmojiForProduct = (product: typeof products[0]) => {
    if (product.category === "Women's Fashion") return "👗";
    if (product.category === "Men's Fashion") {
      if (product.name.includes("Shirt")) return "👔";
      if (product.name.includes("Sneakers")) return "👟";
      return "👕";
    }
    if (product.category === "Beauty") {
      if (product.name.includes("Makeup")) return "💄";
      if (product.name.includes("Perfume")) return "🌸";
      return "✨";
    }
    if (product.category === "Accessories") {
      if (product.name.includes("Bag")) return "👜";
      if (product.name.includes("Wallet")) return "👛";
      if (product.name.includes("Sunglasses")) return "🕶️";
      if (product.name.includes("Watch")) return "⌚";
    }
    return "🛍️";
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shop Our Products
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Browse our curated selection of fashion and beauty items
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {!imageErrors[product.id] ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {getEmojiForProduct(product)}
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Quick View Button */}
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105 z-10">
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <p className="text-sm text-pink-600 font-semibold mb-1">{product.category}</p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{product.priceDisplay}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-5 py-2 rounded-full font-semibold transition-all shadow-md ${
                      addedToCart === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 hover:scale-105'
                    }`}
                  >
                    {addedToCart === product.id ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-12">
          <h4 className="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h4>
          <p className="text-gray-700 mb-6 text-lg">
            Visit our store in Kisii Town or contact us for more products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg">
              📱 WhatsApp Us
            </button>
            <a href="#location">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg border-2 border-gray-900">
                📍 Visit Store
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}