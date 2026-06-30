import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/listStore";

export function ListPage() {
  const { profiles, removeProfile } = useListStore();

  return (
    <Layout title="My List">
      <Link
        to="/"
        className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block font-medium"
      >
        ← Back to search
      </Link>

      {profiles.length === 0 && (
        <p className="text-center text-slate-400 py-16">
          No profiles added yet. Browse and add some from the search page.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.user_id}
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm"
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
              <span className="inline-block mt-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
                {profile.platform}
              </span>
            </div>
            <button
              onClick={() => removeProfile(profile.user_id)}
              className="shrink-0 px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}