import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, initialized } = useAuthStore();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!user) {
    // Store the current location for redirect after login
    localStorage.setItem('redirectTo', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};