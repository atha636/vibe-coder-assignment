import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListItem } from "@/hooks/useListItem";
import { formatFollowers } from "@/lib/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}


export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
const { inList, toggle } = useListItem(profile, platform);
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
      className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
          toggle();
        }}
        className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 active:scale-95 ${
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
