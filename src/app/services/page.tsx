import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Services",
  description: "WordPress, Elementor, WooCommerce, redesigns, SEO, speed, and maintenance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white">
        <Container>
          <SectionHeading
            dark
            eyebrow="Services"
            title="Digital services for growing businesses"
            description="Each service page includes scope, timelines, starting prices, and FAQs—without unrealistic guarantees."
          />
        </Container>
      </section>
      <section className="bg-cloud-white py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-blue/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <h2 className="font-heading text-2xl font-semibold text-midnight">{service.title}</h2>
              <p className="mt-3 text-body">{service.excerpt}</p>
              <p className="mt-4 text-sm font-medium text-brand-blue">{service.startingPrice}</p>
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
