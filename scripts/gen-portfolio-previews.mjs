import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const projects = [
  { file: "izak10", label: "izak10.com", category: "Business Website · Elementor", accent: "#FF6B35" },
  { file: "giftspak", label: "giftspak.com", category: "WooCommerce Store · Retail", accent: "#FF6B35" },
  { file: "synctechsol", label: "synctechsol.com", category: "Technology Services · WordPress", accent: "#FF6B35" },
  { file: "zobyconsulting", label: "zobyconsulting.com", category: "Consulting Brand · Elementor", accent: "#FF6B35" },
  { file: "kuzconsultancy", label: "kuzconsultancy.co.uk", category: "UK Consultancy · SEO", accent: "#FF6B35" },
  { file: "gunsandaccessories", label: "gunsandaccessories.com", category: "E-Commerce Catalog (Verification Pending)", accent: "#71717A" },
  { file: "manddroyalty", label: "manddroyalty.com", category: "Brand Redesign (Verification Pending)", accent: "#71717A" },
];

const targetDirs = [
  join(process.cwd(), "public", "portfolio"),
  join(process.cwd(), "assets", "portfolio"),
];

for (const dir of targetDirs) {
  mkdirSync(dir, { recursive: true });
}

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
  <defs>
    <radialGradient id="grad-${p.file}" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#222427" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#101112" stop-opacity="1"/>
    </radialGradient>
    <filter id="shadow-${p.file}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="900" height="560" fill="url(#grad-${p.file})"/>
  
  <!-- Subtle Architectural Grid Lines -->
  <line x1="60" y1="0" x2="60" y2="560" stroke="#343538" stroke-width="1" stroke-opacity="0.3"/>
  <line x1="840" y1="0" x2="840" y2="560" stroke="#343538" stroke-width="1" stroke-opacity="0.3"/>
  
  <!-- Browser Mockup Window -->
  <g filter="url(#shadow-${p.file})">
    <rect x="60" y="44" width="780" height="472" rx="14" fill="#191A1C" stroke="#343538" stroke-width="1.5"/>
    
    <!-- Window Header -->
    <path d="M 60 58 A 14 14 0 0 1 74 44 L 826 44 A 14 14 0 0 1 840 58 L 840 88 L 60 88 Z" fill="#141517" stroke="#343538" stroke-width="1"/>
    
    <!-- Window Controls -->
    <circle cx="88" cy="66" r="5" fill="#EF4444" opacity="0.8"/>
    <circle cx="106" cy="66" r="5" fill="#F59E0B" opacity="0.8"/>
    <circle cx="124" cy="66" r="5" fill="#10B981" opacity="0.8"/>
    
    <!-- Address Bar -->
    <rect x="150" y="55" width="560" height="22" rx="5" fill="#222427" stroke="#343538" stroke-width="1"/>
    <circle cx="166" cy="66" r="3.5" fill="#10B981"/>
    <text x="180" y="70" fill="#F5F3EE" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="11" font-weight="500">https://${p.label}</text>
    
    <!-- Interior Viewport Content -->
    <rect x="61" y="89" width="778" height="426" fill="#101112"/>
    
    <!-- Mockup Hero Layout -->
    <rect x="100" y="125" width="280" height="26" rx="4" fill="#F5F3EE" opacity="0.9"/>
    <rect x="100" y="162" width="420" height="12" rx="3" fill="#A1A1AA" opacity="0.6"/>
    <rect x="100" y="182" width="360" height="12" rx="3" fill="#A1A1AA" opacity="0.3"/>
    
    <!-- Primary CTA -->
    <rect x="100" y="215" width="130" height="34" rx="6" fill="${p.accent}"/>
    <rect x="245" y="215" width="110" height="34" rx="6" fill="#222427" stroke="#343538" stroke-width="1"/>
    
    <!-- Right Mockup Visual Card -->
    <rect x="560" y="125" width="240" height="140" rx="10" fill="#191A1C" stroke="#343538" stroke-width="1"/>
    <circle cx="680" cy="195" r="40" fill="${p.accent}" opacity="0.15"/>
    <rect x="620" y="210" width="120" height="10" rx="3" fill="#F5F3EE" opacity="0.8"/>
    <rect x="640" y="228" width="80" height="6" rx="2" fill="${p.accent}"/>

    <!-- 3 Grid Columns in Mockup -->
    <rect x="100" y="285" width="210" height="140" rx="8" fill="#191A1C" stroke="#343538" stroke-width="1"/>
    <rect x="120" y="305" width="36" height="36" rx="6" fill="${p.accent}" opacity="0.15"/>
    <rect x="120" y="355" width="120" height="12" rx="2" fill="#F5F3EE" opacity="0.85"/>
    <rect x="120" y="375" width="150" height="8" rx="2" fill="#A1A1AA" opacity="0.5"/>
    <rect x="120" y="390" width="130" height="8" rx="2" fill="#A1A1AA" opacity="0.3"/>

    <rect x="330" y="285" width="210" height="140" rx="8" fill="#191A1C" stroke="#343538" stroke-width="1"/>
    <rect x="350" y="305" width="36" height="36" rx="6" fill="${p.accent}" opacity="0.15"/>
    <rect x="350" y="355" width="120" height="12" rx="2" fill="#F5F3EE" opacity="0.85"/>
    <rect x="350" y="375" width="150" height="8" rx="2" fill="#A1A1AA" opacity="0.5"/>
    <rect x="350" y="390" width="130" height="8" rx="2" fill="#A1A1AA" opacity="0.3"/>

    <rect x="560" y="285" width="240" height="140" rx="8" fill="#191A1C" stroke="#343538" stroke-width="1"/>
    <rect x="580" y="305" width="36" height="36" rx="6" fill="${p.accent}" opacity="0.15"/>
    <rect x="580" y="355" width="120" height="12" rx="2" fill="#F5F3EE" opacity="0.85"/>
    <rect x="580" y="375" width="150" height="8" rx="2" fill="#A1A1AA" opacity="0.5"/>
    <rect x="580" y="390" width="130" height="8" rx="2" fill="#A1A1AA" opacity="0.3"/>
    
    <!-- Footer Status Banner -->
    <rect x="61" y="465" width="778" height="50" fill="#191A1C" stroke="#343538" stroke-width="1"/>
    <text x="100" y="495" fill="#F5F3EE" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="600">${p.label}</text>
    <text x="790" y="495" text-anchor="end" fill="#A1A1AA" font-family="-apple-system, sans-serif" font-size="12">${p.category}</text>
  </g>
</svg>`;

  for (const dir of targetDirs) {
    writeFileSync(join(dir, `${p.file}.svg`), svg, "utf8");
  }
}

console.log("Obsidian Dark portfolio preview SVGs generated successfully in public/portfolio/ and assets/portfolio/.");
