import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  loading: boolean;
  setUser: (user: any, loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  fetchUser: () => Promise<any>;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      setUser: (user: any, loading: boolean) => set({ user, loading }),

      register: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        set({ user: data.user, loading: false });
        return data.user;
      },

      login: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        set({ user: data.user, loading: false });
      },

      logOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, loading: false });
      },

      fetchUser: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        set({ user: data.user, loading: false });
        return data.user;
      },
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist user, not loading
    }
  )
);
