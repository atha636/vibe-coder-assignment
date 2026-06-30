# Influencer Search — Wobb Assignment Submission

## What I Changed

### Bug Fixes
- **Case-sensitive search**: `filterProfiles` was lowercasing the fullname match but not the username match, so searches like "John" missed usernames with different casing. Fixed both sides to lowercase consistently.
- **Wrong engagement rate calculation**: The detail page multiplied `engagement_rate` by `10000` instead of `100`, displaying a value 100x too large. Fixed to use the shared `formatEngagementRate` utility, which was already correct but unused.
- **Mislabeled "Engagements" stat**: This block was reusing `engagement_rate` (a percentage) instead of the actual `engagements` count, showing the same wrong percentage twice under different labels. Now correctly displays the raw engagement count.
- **Duplicated follower-formatting logic**: `ProfileCard` and `ProfileDetailPage` each had their own local follower-formatting function with inconsistent decimal precision. Consolidated into the existing shared `formatFollowers` utility in `utils/formatters.ts`.
- **Stale state in click handler**: `handleProfileClick` read `clickCount` directly from closure, which could lose increments on rapid clicks and logged the old count instead of the new one. Switched to the functional `setState` updater form.
- **Removed unused/incompatible dependency**: `react-beautiful-dnd` was listed in `package.json` but never imported anywhere, and it's deprecated and not compatible with React 19.
- **Removed dead code**: `SearchBar.tsx` was an unused component, fully duplicated by the inline search input in `PlatformFilter.tsx`. Also removed a leftover `data-search` debug attribute on profile cards.
- **Accessibility**: Added missing `alt` attributes on all profile images, `aria-pressed` on platform filter buttons, keyboard support (`tabIndex`, `onKeyDown`) on clickable profile cards, and `rel="noopener noreferrer"` on the external "View on platform" link.
- **Leftover boilerplate CSS**: `index.css` contained unrelated styling from a different template (a `1126px`-capped `#root`, oversized `h1` rules overriding Tailwind utilities, unused `--accent` purple theme variables). Removed the conflicting global element styles so Tailwind utility classes render correctly.

### State Management — Zustand
The assignment brief mentions replacing React Context with Zustand; this starter project did not actually contain any Context usage, so the new global state (the "Add to List" feature) was built directly with Zustand rather than migrated from an existing implementation.

`src/store/listStore.ts` holds the selected-profiles list, using Zustand's `persist` middleware to back the store with `localStorage` (key: `wobb-selected-profiles`), so the list survives page refreshes automatically.

### Feature: Add to List
- Add/remove profiles from both the search results grid and the profile detail page.
- Duplicate prevention by `user_id` (checked inside the store's `addProfile` action).
- A dedicated `/list` route (`ListPage.tsx`) displays all selected profiles with a remove action.
- Live count shown in the header ("My List (n)").
- Persists across refresh via `localStorage`.

### UI/UX Redesign
- Replaced the single-column, fixed-width (`700px`) card layout with a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop).
- Modern card styling: rounded corners, subtle shadows, hover states, consistent spacing using a slate/indigo palette.
- Sticky header with platform branding and list count.
- Pill-style platform filter tabs instead of plain bordered buttons.
- Restyled stat blocks on the profile detail page for clearer visual hierarchy (uppercase labels, larger values).

### Performance
- Memoized `extractProfiles` and `filterProfiles` calls in `SearchPage.tsx` with `useMemo` so the dataset isn't re-derived on every keystroke/render — only when `platform` or `searchQuery` actually change.
- Per-profile JSON detail files are automatically code-split via `import.meta.glob` (Vite), so only the visited profile's data is loaded, not the entire dataset.

### Code Quality
- Removed duplicated formatting logic in favor of shared utilities.
- Tightened prop interfaces (removed an unused `searchQuery` prop being threaded through `ProfileList` → `ProfileCard` for no purpose).
- Fixed a Rules-of-Hooks violation where a Zustand hook was called conditionally (after early returns) in `ProfileDetailPage.tsx`.

## Libraries Added
- **zustand** (`^5.0.3`) — lightweight global state management for the Add to List feature, with built-in `persist` middleware for localStorage sync.

## Libraries Removed
- **react-beautiful-dnd** — unused, deprecated, and not React 19-compatible.

## Assumptions
- Profile detail JSON is only seeded for a subset of profiles (`cristiano`, `mrbeast`, `MrBeast6000`, `khaby.lame`, `tseries`, `instagram`). Profiles that appear in search results but lack a corresponding detail file (e.g. `kyliejenner`) correctly show a "Could not load profile details" fallback rather than crashing — this is treated as expected behavior given the limited sample data, not a bug.
- "Persistent after page refresh" was interpreted as `localStorage` persistence (no backend in this project), which is consistent with the rest of the app's data-loading approach (static JSON, no API).

## Trade-offs
- Used Tailwind utility classes directly rather than introducing a component library (e.g. shadcn/ui) to keep the diff focused and avoid adding unnecessary dependencies for a relatively small UI surface.
- No automated tests were added in the time available; manual testing was done across all three platforms and the Add/Remove/persist flow.

## Remaining Improvements (Given More Time)
- Add unit tests (e.g. Vitest + React Testing Library) for `filterProfiles`, the Zustand store actions, and key components.
- Add loading skeletons instead of plain "Loading..." text.
- Debounce the search input to avoid filtering on every keystroke for larger datasets.
- Add sorting options (followers, engagement rate) on the search page.
- Add empty/error states with retry actions instead of a static message.

## Running Locally
```
npm install
npm run dev
```

## Build & Lint
```
npm run build
npm run lint
```
Both pass cleanly with zero errors.
