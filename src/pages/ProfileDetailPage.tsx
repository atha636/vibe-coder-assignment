import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { useListStore } from "@/store/listStore";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";



export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const { addProfile, removeProfile, isInList } = useListStore();

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
        <p className="text-gray-400">Loading...</p>
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
  const inList = isInList(user.user_id);
  
  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block font-medium"
      >
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <img
          src={user.picture}
          alt={user.username}
          className="w-24 h-24 rounded-full border border-slate-100 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-slate-500">{user.fullname}</p>
          <span className="inline-block mt-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
            {platform}
          </span>

          {user.description && (
            <p className="mt-3 text-sm text-slate-600">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
              <div className="text-slate-500 text-xs uppercase tracking-wide">Followers</div>
              <div className="font-semibold text-slate-900 text-base mt-0.5">
                {formatFollowers(user.followers)}
              </div>
            </div>
            <div className="border border-slate-200 bg-slate-50 p-3 rounded-lg">
              <div className="text-slate-500 text-xs uppercase tracking-wide">Engagement Rate</div>
              <div className="font-semibold text-slate-900 text-base mt-0.5">
               {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
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
            onClick={() => {
              if (inList) removeProfile(user.user_id);
              else addProfile({ ...user, platform: platform as Platform });
            }}
            className={`block mt-5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
