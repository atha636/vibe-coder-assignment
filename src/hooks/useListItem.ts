import { useListStore } from "@/store/listStore";
import type { Platform, UserProfileSummary } from "@/types";

export function useListItem(profile: UserProfileSummary, platform: Platform) {
  const addProfile = useListStore((state) => state.addProfile);
  const removeProfile = useListStore((state) => state.removeProfile);
  const inList = useListStore((state) =>
    state.profiles.some((p) => p.user_id === profile.user_id)
  );

  const toggle = () => {
    if (inList) removeProfile(profile.user_id);
    else addProfile({ ...profile, platform });
  };

  return { inList, toggle };
}