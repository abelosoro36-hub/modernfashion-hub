'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "Do you deliver nationwide in Kenya?",
    answer: "Yes! We deliver to all counties across Kenya. Our main office is in Kisii Town, but we ensure your fashion and beauty items reach you wherever you are in the country."
  },
  {
    question: "Where is your main office located?",
    answer: "Our main office is located in Kisii Town, right next to Shivling Supermarket. You're welcome to visit us for in-person shopping and consultations."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery within Nairobi takes 1-2 business days. For other counties, delivery typically takes 2-5 business days depending on your location."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, bank transfers, and cash on delivery for select locations. Online payments are processed securely through our platform."
  },
  {
    question: "Can I return or exchange items?",
    answer: "Yes, we have a 7-day return and exchange policy. Items must be unused, in original packaging, and with tags attached. Contact us for the return process."
  },
  {
    question: "Do you have a physical store I can visit?",
    answer: "Absolutely! Visit our store in Kisii Town next to Shivling Supermarket. Our friendly staff will be happy to help you find the perfect items."
  },
  {
    question: "What brands do you carry?",
    answer: "We carry a curated selection of both local and international fashion and beauty brands, ensuring quality and variety for all our customers."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, we'll send you a tracking number via SMS and email. You can use this to track your delivery in real-time."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-pink-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}