import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/lib/filters";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setClickCount] = useState(0);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handleProfileClick = (username: string) => {
    setClickCount((prev) => {
      console.log("Clicked profile:", username, "total clicks:", prev + 1);
      return prev + 1;
    });
  };

  return (
    <Layout title="Find Influencers">
      <p className="text-sm text-slate-500 mb-6">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4 text-center">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
