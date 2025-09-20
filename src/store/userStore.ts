import { supabase } from "@/lib/supabase";
import { create } from "zustand";

interface AuthState {
  user: any;
  loading: boolean;
  setUser: (user: any, loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  fetchUser: () => Promise<any>;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user: any) => set({ user, loading: false }),

  register: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data) {
      set({ user: data.user });
    }
    if (error) {
      throw error;
    }
    return data.user;
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }

    set({ user: data.user });
  },

  logOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  fetchUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    set({ user: data.user, loading: false });
    if (error) {
      throw error;
    }
    return data.user;
  },
}));
