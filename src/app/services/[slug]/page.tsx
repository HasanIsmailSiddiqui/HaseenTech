import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { FAQList } from "@/components/marketing/FAQList";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjectBySlug } from "@/data/projects";
import { getServiceBySlug, serviceSlugs } from "@/data/services";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.excerpt,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedProjectSlugs
    .map((s) => getProjectBySlug(s))
    .filter(Boolean);

  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan">Service</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{service.excerpt}</p>
          <p className="mt-4 text-sm text-brand-cyan">{service.startingPrice}</p>
          <Button
            href={`/contact?service=${service.slug}`}
            className="mt-8"
          >
            Submit project requirements
          </Button>
        </Container>
      </section>

      <section className="bg-cloud-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-midnight">Problems we address</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {service.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-midnight">Deliverables</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeading eyebrow="Fit" title="Ideal for" />
            <ul className="mt-4 space-y-2 text-body">
              {service.idealFor.map((i) => (
                <li key={i} className="rounded-lg bg-white px-3 py-2 text-sm border border-slate-200">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Process" title="Timeline & steps" description={service.timeline} />
            <ol className="mt-6 space-y-3">
              {service.process.map((step) => (
                <li key={step.step} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-medium text-midnight">{step.step}</p>
                  <p className="mt-1 text-sm text-body">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-cloud-white py-16">
          <Container>
            <SectionHeading eyebrow="Work" title="Related projects" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <ProjectCard key={project!.slug} project={project!} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-slate-50 py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.shortTitle} FAQs`} />
          <div className="mt-6">
            <FAQList items={service.faqs} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/contact?service=${service.slug}`}>Start inquiry</Button>
            <Link href="/services" className="text-sm text-brand-blue hover:underline self-center">
              ← All services
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
