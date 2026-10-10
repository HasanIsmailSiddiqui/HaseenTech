import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Container } from "@/components/ui/Container";
import { navigation, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-midnight text-slate-300">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-brand-cyan hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              {siteConfig.contact.email}
            </a>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {siteConfig.founder.location} · Remote worldwide
          </p>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {siteConfig.social.linkedin ? (
              <a href={siteConfig.social.linkedin} className="hover:text-white" rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            ) : null}
            {siteConfig.social.github ? (
              <a href={siteConfig.social.github} className="hover:text-white" rel="noopener noreferrer" target="_blank">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © <CopyrightYear /> {siteConfig.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
