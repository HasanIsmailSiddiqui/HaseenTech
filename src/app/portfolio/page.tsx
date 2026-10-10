import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Selected WordPress and WooCommerce projects by HaseenTech.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white">
        <Container>
          <SectionHeading
            dark
            eyebrow="Portfolio"
            title="Projects you can explore"
            description="Each entry links to the live site when verified. Placeholders are labeled clearly."
          />
        </Container>
      </section>
      <section className="bg-cloud-white py-16">
        <Container>
          <PortfolioGallery projects={projects} />
        </Container>
      </section>
    </>
  );
}
