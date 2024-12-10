import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, Image as ImageIcon, Home, Sparkles } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-purple-500" />
                <span className="text-xl font-bold">Flux AI</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link 
                to="/discover"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Discover
              </Link>
              <Link 
                to="/train"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                New Model
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>4 Credits</span>
              <span>•</span>
              <span>0 Models</span>
            </div>
            <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-sm font-medium">
              Upgrade
            </button>
            <ProfileMenu />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              to="/discover"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Discover
            </Link>
            <Link 
              to="/train"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              New Model
            </Link>
            <div className="px-3 py-2">
              <ProfileMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;