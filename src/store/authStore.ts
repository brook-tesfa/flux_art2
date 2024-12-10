import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuthStore.getState().setUser(session?.user || null);
  useAuthStore.getState().setLoading(false);
  useAuthStore.getState().setInitialized(true);
});

// Set up auth state listener
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setUser(session?.user || null);
  useAuthStore.getState().setLoading(false);
});