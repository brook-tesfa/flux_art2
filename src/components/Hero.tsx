import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Hero = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      localStorage.setItem('redirectTo', '/train');
      navigate('/login');
    } else {
      navigate('/train');
    }
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614729939124-032d1e6c9945?auto=format&fit=crop&q=80')] bg-center bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Train Your Custom AI Model<br />in Minutes
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-gray-300">
            Upload just 4 images and create your personalized AI model. Generate unlimited unique portraits and artworks with simple text prompts.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button 
              onClick={handleGetStarted}
              className="group bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-lg font-semibold transition-all flex items-center gap-2"
            >
              {user ? 'Get Started' : 'Login to Get Started'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/demo')}
              className="px-8 py-3 rounded-lg text-lg font-semibold border border-gray-700 hover:border-purple-500 transition-colors"
            >
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;