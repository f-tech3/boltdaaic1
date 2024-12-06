import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
  checkUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ user, loading: false });
    } catch (error) {
      console.error('Error checking user:', error);
      set({ user: null, loading: false });
    }
  },
}));