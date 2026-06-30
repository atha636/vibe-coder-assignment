import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-pressed={selected === p}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selected === p
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or name..."
        className="w-full max-w-md border border-slate-300 px-4 py-2 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}
