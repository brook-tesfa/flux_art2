import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { user, initialized } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (initialized && user) {
      const redirectTo = localStorage.getItem('redirectTo') || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [user, initialized, navigate]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome to Flux AI</h2>
          <p className="text-gray-400 mt-2">Sign in or create an account to continue</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9333ea',
                  brandAccent: '#a855f7',
                  inputBackground: '#374151',
                  inputBorder: '#4b5563',
                  inputText: '#ffffff',
                  inputPlaceholder: '#9ca3af',
                }
              }
            },
            className: {
              container: 'supabase-container',
              button: 'supabase-button',
              input: 'supabase-input',
              label: 'supabase-label',
              message: 'supabase-message',
            }
          }}
          theme="dark"
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
          magicLink={true}
        />
      </div>
    </div>
  );
};