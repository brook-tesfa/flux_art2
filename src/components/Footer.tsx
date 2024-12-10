import React from 'react';
import { Brain, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">Flux AI</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Train custom AI models and generate unique images with just a few clicks. 
              Perfect for creators, artists, and businesses.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-purple-500 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-purple-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Flux AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;