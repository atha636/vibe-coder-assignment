import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListStore } from "@/store/listStore";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}



export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
const { addProfile, removeProfile, isInList } = useListStore();
  const inList = isInList(profile.user_id);
  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
    >
      <img
        src={profile.picture}
        alt={profile.username}
        className="w-14 h-14 rounded-full object-cover border border-slate-100"
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-slate-900 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-slate-500 truncate">{profile.fullname}</div>
        <div className="text-sm text-slate-700 mt-0.5">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
     <button
        onClick={(e) => {
          e.stopPropagation();
          if (inList) removeProfile(profile.user_id);
          else addProfile({ ...profile, platform });
        }}
        className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          inList
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "bg-slate-900 text-white hover:bg-slate-700"
        }`}
      >
        {inList ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}
