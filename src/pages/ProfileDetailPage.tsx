import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { useListStore } from "@/store/listStore";
import { formatEngagementRate, formatFollowers } from "@/lib/formatters";
import { loadProfileByUsername } from "@/lib/api/profileLoader";



export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
 const addProfile = useListStore((state) => state.addProfile);
  const removeProfile = useListStore((state) => state.removeProfile);
  const profiles = useListStore((state) => state.profiles);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex gap-6 items-start max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="skeleton w-24 h-24 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-40 bg-slate-200 rounded" />
            <div className="skeleton h-4 w-28 bg-slate-200 rounded" />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="skeleton h-16 bg-slate-200 rounded-lg" />
              <div className="skeleton h-16 bg-slate-200 rounded-lg" />
              <div className="skeleton h-16 bg-slate-200 rounded-lg" />
              <div className="skeleton h-16 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

const user: FullUserProfile = profileData.data.user_profile;
  const inList = profiles.some((p) => p.user_id === user.user_id);
  const toggle = () => {
    if (inList) removeProfile(user.user_id);
    else addProfile({ ...user, platform: platform as Platform });
  };
  
  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block font-medium"
      >
        ← Back to search
      </Link>

      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden fade-in">
        <div className="h-28 bg-gradient-to-r from-indigo-500 via-indigo-400 to-slate-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12">
            <img
              src={user.picture}
              alt={user.username}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-slate-900">
                @{user.username}
                <VerifiedBadge verified={user.is_verified} />
              </h2>
              <p className="text-slate-500">{user.fullname}</p>
            </div>
          </div>

          <span className="inline-block mt-4 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
            {platform}
          </span>

          {user.description && (
            <p className="mt-3 text-sm text-slate-600 max-w-xl">{user.description}</p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <div className="text-indigo-500 text-xs uppercase tracking-wide font-medium">Followers</div>
              <div className="font-bold text-slate-900 text-2xl mt-1">
                {formatFollowers(user.followers)}
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl">
              <div className="text-indigo-500 text-xs uppercase tracking-wide font-medium">Engagement Rate</div>
              <div className="font-bold text-slate-900 text-2xl mt-1">
               {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {user.posts_count !== undefined && (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Posts</div>
                <div className="font-semibold text-slate-900 text-base mt-0.5">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Avg Likes</div>
                <div className="font-semibold text-slate-900 text-base mt-0.5">
                  {formatFollowers(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Avg Comments</div>
               <div className="font-semibold text-slate-900 text-base mt-0.5">{user.avg_comments}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Avg Views</div>
                <div className="font-semibold text-slate-900 text-base mt-0.5">
                  {formatFollowers(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Engagements</div>
                <div className="font-semibold text-slate-900 text-base mt-0.5">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
           )}
          </div>
        </div>

        <div className="px-6 pb-6">
          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800"
            >
              View on platform →
            </a>
          )}

          <button
            onClick={toggle}
            className={`block mt-5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 active:scale-95 ${
              inList
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            {inList ? "Remove from List" : "Add to List"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
