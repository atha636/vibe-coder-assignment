import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in">
      {profiles.length === 0 && (
        <p className="col-span-full text-center text-slate-400 text-sm py-10">
          No profiles found
        </p>
      )}
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
