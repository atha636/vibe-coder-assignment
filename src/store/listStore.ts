import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

export interface ListedProfile extends UserProfileSummary {
  platform: Platform;
}

interface ListState {
  profiles: ListedProfile[];
  addProfile: (profile: ListedProfile) => void;
  removeProfile: (userId: string) => void;
  isInList: (userId: string) => boolean;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (profile) => {
        const exists = get().profiles.some((p) => p.user_id === profile.user_id);
        if (exists) return;
        set((state) => ({ profiles: [...state.profiles, profile] }));
      },
      removeProfile: (userId) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== userId),
        })),
      isInList: (userId) => get().profiles.some((p) => p.user_id === userId),
    }),
    { name: "wobb-selected-profiles" }
  )
);