import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const categories = [
  {
    name: 'LISTINGS',
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a',
  },
  {
    name: 'BRAND ASSETS',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1',
  },
  {
    name: 'PRODUCT SHOTS',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
  },
  {
    name: 'CLOTHING',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475',
  },
  {
    name: 'PORTRAITS',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
  },
  {
    name: 'LIFESTYLE',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659',
  },
];

const ModelCategories = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleTrainModel = () => {
    if (!user) {
      localStorage.setItem('redirectTo', '/train');
      navigate('/login');
    } else {
      navigate('/train');
    }
  };

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-6">
              Train models for{' '}
              <span className="text-pink-500">Every Purpose</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              The #1 way to train custom AI image models for product photography,
              clothing, fashion, and brand assets.
            </p>
            
            <button
              onClick={handleTrainModel}
              className="bg-white text-black px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              {user ? 'Train My Model' : 'Login to Train Model'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelCategories;