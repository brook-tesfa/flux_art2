import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export const AuthButton = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      handleSignOut();
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-2">
        <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <button
      onClick={handleAuth}
      className={`
        relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300
        before:absolute before:inset-0 before:rounded-lg before:transition-all
        before:duration-300 before:hover:scale-105 before:hover:opacity-0
        ${user 
          ? 'text-gray-300 before:border before:border-gray-700 hover:text-white' 
          : 'text-white before:bg-gradient-to-r before:from-purple-600 before:to-pink-600'}
        overflow-hidden group
      `}
    >
      <span className="relative inline-flex items-center gap-2">
        {user ? 'Sign Out' : 'Sign In'}
        <svg 
          className="w-4 h-4 transition-transform group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
};