import { describe, expect, it } from "vitest";
import { getPackageById, packages } from "@/data/packages";

describe("packages data", () => {
  it("has four packages", () => {
    expect(packages).toHaveLength(4);
  });

  it("resolves starter package", () => {
    const starter = getPackageById("starter");
    expect(starter?.priceLabel).toContain("15,000");
  });
});
