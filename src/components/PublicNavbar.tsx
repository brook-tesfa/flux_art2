import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { motion, useScroll, useTransform } from 'framer-motion';

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(
    scrollY,
    [0, 100],
    [0.8, 1]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] z-50"
      style={{ opacity }}
    >
      <div className={`relative rounded-full transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/75 backdrop-blur-lg' : 'bg-gray-900/50 backdrop-blur-sm'
      }`}>
        <div className="px-6 h-14">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Flux AI
              </span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How it Works</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link 
                to="/demo" 
                className="hidden lg:block text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Demo
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>

        {/* Subtle Border */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />

        {/* Gradient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group px-3 py-1"
  >
    {children}
    <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
  </a>
);

export default PublicNavbar;