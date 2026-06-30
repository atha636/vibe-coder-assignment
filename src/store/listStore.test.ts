import { describe, it, expect, beforeEach } from "vitest";
import { useListStore } from "./listStore";

const mockProfile = {
  user_id: "123",
  username: "testuser",
  fullname: "Test User",
  picture: "",
  url: "https://instagram.com/testuser",
  is_verified: false,
  followers: 1000,
  platform: "instagram" as const,
};

describe("useListStore", () => {
  beforeEach(() => {
    useListStore.setState({ profiles: [] });
  });

  it("starts with an empty list", () => {
    expect(useListStore.getState().profiles).toHaveLength(0);
  });

  it("adds a profile", () => {
    useListStore.getState().addProfile(mockProfile);
    expect(useListStore.getState().profiles).toHaveLength(1);
  });

  it("prevents duplicate entries by user_id", () => {
    useListStore.getState().addProfile(mockProfile);
    useListStore.getState().addProfile(mockProfile);
    expect(useListStore.getState().profiles).toHaveLength(1);
  });

  it("removes a profile by user_id", () => {
    useListStore.getState().addProfile(mockProfile);
    useListStore.getState().removeProfile("123");
    expect(useListStore.getState().profiles).toHaveLength(0);
  });

  it("isInList reflects current state correctly", () => {
    expect(useListStore.getState().isInList("123")).toBe(false);
    useListStore.getState().addProfile(mockProfile);
    expect(useListStore.getState().isInList("123")).toBe(true);
  });
});