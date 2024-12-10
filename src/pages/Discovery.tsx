import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Sparkles, TrendingUp, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'newest', name: 'Newest', icon: Clock },
  { id: 'portraits', name: 'Portraits', icon: User },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'art', name: 'Art Styles', icon: Palette },
  { id: 'pets', name: 'Pets', icon: Dog },
];

const featuredModels = [
  {
    id: 1,
    name: "Neo Portrait Pro",
    creator: "Sarah Chen",
    rating: 4.8,
    usageCount: 12453,
    likes: 892,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    category: "portraits",
    tags: ["portrait", "professional", "headshot"]
  },
  {
    id: 2,
    name: "Product Showcase AI",
    creator: "Michael Roberts",
    rating: 4.9,
    usageCount: 8921,
    likes: 654,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "products",
    tags: ["product", "commercial", "studio"]
  },
  {
    id: 3,
    name: "Pet Perfect",
    creator: "Emily Watson",
    rating: 4.7,
    usageCount: 6543,
    likes: 432,
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    category: "pets",
    tags: ["pets", "animals", "portraits"]
  }
];

export const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover AI Models</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the latest and most popular AI models created by our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search models..."
            className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pl-14"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all
                ${selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredModels.map((model) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Model Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {model.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      {model.usageCount.toLocaleString()} uses
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-pink-500" />
                      {model.likes}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${model.creator}`}
                      alt={model.creator}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{model.creator}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/studio/${model.id}`)}
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium"
                >
                  Try Model
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};