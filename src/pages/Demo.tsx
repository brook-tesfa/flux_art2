import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const categories = [
  {
    name: 'Pets',
    samples: [
      {
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
        prompt: 'A golden retriever puppy in a field of flowers at sunset',
      },
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        prompt: 'A curious cat with bright blue eyes in a cozy home setting',
      },
      {
        url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca',
        prompt: 'A majestic husky in a snowy landscape',
      },
    ],
  },
  {
    name: 'Products',
    samples: [
      {
        url: 'https://images.unsplash.com/photo-1525904097878-94fb15835963',
        prompt: 'Minimalist white sneakers on a clean background',
      },
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        prompt: 'Smart watch with a modern design on a gradient background',
      },
      {
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657',
        prompt: 'Elegant white ceramic coffee mug in studio lighting',
      },
    ],
  },
  {
    name: 'People',
    samples: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        prompt: 'Professional portrait of a woman with natural lighting',
      },
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        prompt: 'Candid portrait of a man in casual attire',
      },
      {
        url: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793',
        prompt: 'Fashion portrait in an urban setting',
      },
    ],
  },
];

export const Demo = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextCategory = () => {
    setSelectedCategory((prev) => (prev + 1) % categories.length);
    setSelectedImage(null);
  };

  const prevCategory = () => {
    setSelectedCategory((prev) => (prev - 1 + categories.length) % categories.length);
    setSelectedImage(null);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sample Generations</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore AI-generated images across different categories. These samples showcase
            the capabilities of our custom-trained models.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevCategory}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextCategory}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-0"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              {categories[selectedCategory].name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories[selectedCategory].samples.map((sample, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={sample.url}
                      alt={sample.prompt}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-4">
                    <p className="text-sm text-white">{sample.prompt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={categories[selectedCategory].samples[selectedImage].url}
                alt={categories[selectedCategory].samples[selectedImage].prompt}
                className="w-full rounded-lg"
              />
              <p className="text-center mt-4 text-gray-300">
                {categories[selectedCategory].samples[selectedImage].prompt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};