import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/listStore";

export function ListPage() {
  const { profiles, removeProfile } = useListStore();

  return (
    <Layout title="My List">
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        ← Back to search
      </Link>

      {profiles.length === 0 && <p>No profiles added yet.</p>}

      <div className="flex flex-col items-center">
        {profiles.map((profile) => (
          <div
            key={profile.user_id}
            className="flex items-center gap-3 p-3 border border-gray-300 mb-2 w-[700px]"
          >
            <img
              src={profile.picture}
              alt={profile.username}
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left flex-1">
              <div className="font-bold">
                @{profile.username}
                <VerifiedBadge verified={profile.is_verified} />
              </div>
              <div className="text-sm text-gray-600">{profile.fullname}</div>
              <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
              <div className="text-xs text-gray-400">{profile.platform}</div>
            </div>
            <button
              onClick={() => removeProfile(profile.user_id)}
              className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}