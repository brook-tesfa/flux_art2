import React, { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { motion } from 'framer-motion';
import { User, Package, Palette, Dog, Box, Type, Pizza, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const subjectTypes = [
  { id: 'man', icon: User, label: 'Man' },
  { id: 'woman', icon: User, label: 'Woman' },
  { id: 'product', icon: Package, label: 'Product' },
  { id: 'style', icon: Palette, label: 'Style' },
  { id: 'object', icon: Box, label: 'Object' },
  { id: 'font', icon: Type, label: 'Font' },
  { id: 'pet', icon: Dog, label: 'Pet' },
  { id: 'food', icon: Pizza, label: 'Food' },
];

const tutorialTabs = ['Person', 'Product', 'Style', 'Pet'];

const tutorialImages = {
  Person: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
  ],
  Product: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    'https://images.unsplash.com/photo-1503602642458-232111445657'
  ],
  Style: [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1',
    'https://images.unsplash.com/photo-1579783902438-b4f30e9b7e6e'
  ],
  Pet: [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a'
  ]
};

export const ModelTraining = () => {
  const [modelName, setModelName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTab, setSelectedTab] = useState('Person');
  const navigate = useNavigate();

  const handleUnlockTraining = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#pricing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-6">
          {/* Upgrade Notice */}
          <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Info className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-300 font-medium">Training models is only available on upgraded plans</p>
                <p className="text-sm text-purple-300/70">Upgrade to a paid plan to train your own models (starting at $16/mo)</p>
              </div>
            </div>
            <button
              onClick={handleUnlockTraining}
              className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Unlock Training
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Training Form */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Train Model</h2>
              <p className="text-gray-400 mb-8">Choose a name, type, and upload at least 4 photos to get started.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="e.g. Natalie Headshots"
                    className="w-full px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {subjectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-lg border backdrop-blur-sm flex flex-col items-center gap-2 transition-colors
                          ${selectedType === type.id 
                            ? 'bg-purple-600/20 border-purple-500' 
                            : 'border-gray-700 hover:border-gray-600'}`}
                      >
                        <type.icon className="w-6 h-6" />
                        <span className="text-sm">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <ImageUpload />
              </div>
            </div>

            {/* Tutorial Section */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Tutorial</h2>
              <div className="space-y-6">
                <div className="flex gap-2">
                  {tutorialTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${tab === selectedTab 
                          ? 'bg-purple-600' 
                          : 'hover:bg-gray-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">How to get results:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {tutorialImages[selectedTab].map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-700/50 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Example ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h4 className="font-medium">Input model name and type</h4>
                  </div>
                  <p className="text-sm text-gray-400 ml-7">
                    Name your model any name you want, and select the type of subject (Person, Man, Woman)
                  </p>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h4 className="font-medium">Choose good pictures</h4>
                  </div>
                  <p className="text-sm text-gray-400 ml-7">
                    5-10 high-quality samples, front facing, square aspect ratio, 1 person in frame, variety
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};