import { z } from "zod";
import { siteConfig } from "@/data/site";
import { packages } from "@/data/packages";
import { serviceSlugs } from "@/data/services";

const packageIds = packages.map((p) => p.id) as [string, ...string[]];

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  phone: z.string().trim().min(6, "Please enter a phone or WhatsApp number.").max(40),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(serviceSlugs as [string, ...string[]], {
    message: "Please select a service.",
  }),
  package: z.enum(packageIds, {
    message: "Please select a package.",
  }),
  budget: z.string().trim().min(1, "Please enter an estimated budget.").max(40),
  currency: z.enum(siteConfig.currencies, {
    message: "Please select a currency.",
  }),
  deadline: z.string().trim().min(2, "Please share a desired timeline.").max(80),
  websiteUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL or leave blank.")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project (at least 20 characters).")
    .max(5000),
  referenceLinks: z.string().trim().max(2000).optional().or(z.literal("")),
  privacyConsent: z.literal(true, {
    message: "You must agree to the privacy policy.",
  }),
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
];

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
