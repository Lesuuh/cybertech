import { create } from "zustand";
import { persist } from "zustand/middleware";

// 🧩 Address type
export interface Address {
  id: string; // unique address ID (e.g., UUID or short ID)
  label: string; // e.g., "Home", "Office"
  street: string;
  city: string;
  state: string;
}

// 👤 Profile type
export interface Profile {
  id: string; // UUID from auth.users
  created_at: string; // ISO timestamp
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: number | null;
  agree_to_terms: boolean | null;
  newsletter: boolean | null;
  addresses: Address[]; // JSONB array
}

// 🏪 Zustand store interface
export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
}

// 🧠 Zustand store
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      loading: true,

      setProfile: (profile) => set({ profile }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "profile-store", // unique key for localStorage
      partialize: (state) => ({ profile: state.profile }), // persist only the profile
    }
  )
);
