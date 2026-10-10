import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const projects = [
  { file: "izak10", label: "izak10.com", color: "#3B82F6" },
  { file: "giftspak", label: "giftspak.com", color: "#8B5CF6" },
  { file: "synctechsol", label: "synctechsol.com", color: "#06B6D4" },
  { file: "zobyconsulting", label: "zobyconsulting.com", color: "#3B82F6" },
  { file: "kuzconsultancy", label: "kuzconsultancy.co.uk", color: "#8B5CF6" },
  { file: "gunsandaccessories", label: "gunsandaccessories.com", color: "#06B6D4" },
  { file: "manddroyalty", label: "manddroyalty.com", color: "#3B82F6" },
];

const dir = join(process.cwd(), "public", "portfolio");
mkdirSync(dir, { recursive: true });

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#0B1220"/>
  <rect x="48" y="48" width="704" height="404" rx="16" fill="#1E293B" stroke="${p.color}" stroke-width="2"/>
  <rect x="80" y="88" width="240" height="28" rx="6" fill="${p.color}" opacity="0.9"/>
  <rect x="80" y="140" width="520" height="16" rx="4" fill="#334155"/>
  <rect x="80" y="168" width="460" height="16" rx="4" fill="#334155"/>
  <rect x="80" y="220" width="200" height="120" rx="10" fill="#0F172A"/>
  <rect x="300" y="220" width="200" height="120" rx="10" fill="#0F172A"/>
  <rect x="520" y="220" width="200" height="120" rx="10" fill="#0F172A"/>
  <text x="400" y="420" text-anchor="middle" fill="#94A3B8" font-family="Arial,sans-serif" font-size="22">${p.label}</text>
  <text x="400" y="448" text-anchor="middle" fill="#64748B" font-family="Arial,sans-serif" font-size="14">Preview placeholder — replace with screenshot</text>
</svg>`;
  writeFileSync(join(dir, `${p.file}.svg`), svg, "utf8");
}

console.log("Portfolio preview SVGs written to public/portfolio/");
