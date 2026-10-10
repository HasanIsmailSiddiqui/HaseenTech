import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/validation/inquiry";

const base = {
  fullName: "Test User",
  email: "test@example.com",
  country: "Pakistan",
  phone: "+923001234567",
  businessName: "",
  service: "wordpress-development",
  package: "starter",
  budget: "15000",
  currency: "PKR" as const,
  deadline: "4 weeks",
  websiteUrl: "",
  description: "Need a five page WordPress website for my business.",
  referenceLinks: "",
  privacyConsent: true as const,
  website: "",
};

describe("inquirySchema", () => {
  it("accepts valid inquiry", () => {
    const result = inquirySchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it("rejects short description", () => {
    const result = inquirySchema.safeParse({ ...base, description: "too short" });
    expect(result.success).toBe(false);
  });

  it("requires privacy consent", () => {
    const result = inquirySchema.safeParse({ ...base, privacyConsent: false });
    expect(result.success).toBe(false);
  });
});
