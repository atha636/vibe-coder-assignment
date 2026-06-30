import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VerifiedBadge } from "./VerifiedBadge";

describe("VerifiedBadge", () => {
  it("renders checkmark when verified", () => {
    render(<VerifiedBadge verified={true} />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders nothing when not verified", () => {
    const { container } = render(<VerifiedBadge verified={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});