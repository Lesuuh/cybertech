import { ProfileState } from "@/app/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
