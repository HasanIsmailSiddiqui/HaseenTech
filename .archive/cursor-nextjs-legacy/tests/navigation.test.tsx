import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";
import { navigation } from "@/data/site";

describe("navigation data", () => {
  it("includes required routes", () => {
    const hrefs = navigation.main.map((l) => l.href);
    expect(hrefs).toContain("/portfolio");
    expect(hrefs).toContain("/packages");
    expect(hrefs).toContain("/contact");
  });
});

describe("Footer", () => {
  it("renders service links", () => {
    render(<Footer />);
    expect(screen.getByText("WordPress Development")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });
});
