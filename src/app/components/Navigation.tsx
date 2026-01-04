'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Fashion Hub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </a>
            <a href="#products" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Products
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Testimonials
            </a>
            <a href="#location" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Location
            </a>
            <a href="#faq" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              FAQ
            </a>
            <Link href="/admin" className="text-gray-500 hover:text-pink-600 transition-colors font-medium text-sm">
              🔐 Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#products">
              <button className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg">
                Shop Now
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-md">
              Home
            </a>
            <a href="#products" className="block px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-md">
              Products
            </a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-md">
              Testimonials
            </a>
            <a href="#location" className="block px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-md">
              Location
            </a>
            <a href="#faq" className="block px-3 py-2 text-gray-700 hover:bg-pink-50 rounded-md">
              FAQ
            </a>
            <Link href="/admin" className="block px-3 py-2 text-gray-500 hover:bg-pink-50 rounded-md text-sm">
              🔐 Admin Dashboard
            </Link>
            <a href="#products">
              <button className="w-full mt-2 px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full">
                Shop Now
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}