import { describe, it, expect } from "vitest";
import { filterProfiles } from "./filters";
import type { UserProfileSummary } from "@/types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "CristianoRonaldo",
    fullname: "Cristiano Ronaldo",
    picture: "",
    is_verified: true,
    followers: 600000000,
  } as UserProfileSummary,
  {
    user_id: "2",
    username: "leomessi",
    fullname: "Leo Messi",
    picture: "",
    is_verified: true,
    followers: 500000000,
  } as UserProfileSummary,
];

describe("filterProfiles", () => {
  it("returns all profiles when query is empty", () => {
    expect(filterProfiles(mockProfiles, "")).toHaveLength(2);
  });

  it("matches username case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "cristiano");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("CristianoRonaldo");
  });

  it("matches username with uppercase query", () => {
    const result = filterProfiles(mockProfiles, "LEOMESSI");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("leomessi");
  });

  it("matches fullname case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "messi");
    expect(result).toHaveLength(1);
    expect(result[0].fullname).toBe("Leo Messi");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterProfiles(mockProfiles, "nobody")).toHaveLength(0);
  });
});