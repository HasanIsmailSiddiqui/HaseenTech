import type { NextRequest } from "next/server";

/**
 * Server-side country detection from hosting / edge headers.
 * Never uses browser-supplied geo or GPS.
 */
export function detectCountryFromRequest(request: Request | NextRequest): string | null {
  const h = (name: string) => request.headers.get(name)?.trim().toUpperCase() ?? null;

  const vercel = h("x-vercel-ip-country");
  if (vercel && vercel.length === 2) return vercel;

  const cloudflare = h("cf-ipcountry");
  if (cloudflare && cloudflare !== "XX" && cloudflare.length === 2) return cloudflare;

  const geoCountry = h("x-geo-country") ?? h("x-country-code");
  if (geoCountry && geoCountry.length === 2) return geoCountry;

  return null;
}
