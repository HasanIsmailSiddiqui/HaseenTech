import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { FAQList } from "@/components/marketing/FAQList";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/data/faq";
import { packages } from "@/data/packages";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

const processSteps = [
  { title: "Discovery", body: "Goals, scope, content, and timeline alignment." },
  { title: "Design & build", body: "WordPress, Elementor, or WooCommerce implementation." },
  { title: "Review", body: "Structured revision rounds per package." },
  { title: "Launch", body: "Go-live support, handover, and optional maintenance." },
];

const reasons = [
  "Clear scopes and honest starting prices in PKR with international quotes on request.",
  "WordPress-focused delivery: Elementor, WooCommerce, maintenance, and speed improvements.",
  "Remote-friendly process for clients in Pakistan, the UK, USA, UAE, and Europe.",
  "Portfolio projects you can visit live—placeholders marked when verification is pending.",
];

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-cloud-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.2),transparent_40%)]" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Logo variant="light" className="mb-6" linked={false} />
            <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan">
              {siteConfig.founder.location} · Remote worldwide
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/portfolio">
                Explore Our Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact?intent=project" variant="secondary">
                Start a Project
              </Button>
            </div>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Globe2 className="mt-0.5 h-5 w-5 text-brand-cyan" aria-hidden />
              <div>
                <p className="font-medium text-white">{siteConfig.founder.name}</p>
                <p className="text-sm text-slate-300">{siteConfig.founder.title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  International and remote projects welcome—clear milestones and async-friendly
                  updates.
                </p>
              </div>
            </div>
          </div>
          <HeroVisual />
        </Container>
      </section>

      <section className="bg-cloud-white py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected projects"
            description="Live client work with honest notes when a URL or screenshot is still being verified."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/portfolio" variant="outline">
              View full portfolio
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Web development & digital solutions"
            description="WordPress, Elementor, WooCommerce, and practical ongoing support."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-blue/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <h3 className="font-heading text-lg font-semibold text-midnight">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{service.excerpt}</p>
                <span className="mt-3 inline-flex text-sm font-medium text-brand-blue">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
          <Button href="/services" variant="outline" className="mt-8">
            All services
          </Button>
        </Container>
      </section>

      <section className="bg-midnight py-16 text-cloud-white lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            dark
            eyebrow="Why HaseenTech"
            title="Premium craft, straightforward collaboration"
            description="Built for business owners who want a dependable website—not buzzwords."
          />
          <ul className="space-y-4">
            {reasons.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cloud-white py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Process" title="How we work" />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-mono text-sm text-brand-blue">0{i + 1}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-midnight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Packages"
            title="Starting packages"
            description="PKR pricing by default. Request a quote in USD, GBP, AED, or EUR on the contact form."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl font-semibold text-midnight">{pkg.name}</h3>
                <p className="mt-2 text-2xl font-semibold text-brand-blue">{pkg.priceLabel}</p>
                <p className="mt-3 flex-1 text-sm text-body">{pkg.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {pkg.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <Button
                  href={`/contact?package=${pkg.id}`}
                  variant="outline"
                  className="mt-6 w-full"
                  size="sm"
                >
                  {pkg.ctaLabel}
                </Button>
              </article>
            ))}
          </div>
          <Button href="/packages" className="mt-8" variant="outline">
            Compare packages
          </Button>
        </Container>
      </section>

      <section className="bg-cloud-white py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-8 max-w-3xl">
            <FAQList items={homeFaqs} />
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-brand-blue to-brand-violet py-14 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold">Ready to start your project?</h2>
            <p className="mt-2 max-w-xl text-white/90">
              Share your requirements—service, package, budget, and timeline—and we will respond
              with next steps.
            </p>
          </div>
          <Button href="/contact?intent=project" variant="secondary" size="lg">
            Submit project inquiry
          </Button>
        </Container>
      </section>
    </>
  );
}
