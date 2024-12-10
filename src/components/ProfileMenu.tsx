import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-800 transition-colors"
      >
        <img
          src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.id}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl z-20 border border-gray-700">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            
            <button 
              onClick={handleProfileClick}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-700 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <button 
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-gray-700 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};