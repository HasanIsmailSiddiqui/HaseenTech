import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <section className="bg-cloud-white py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold text-midnight">Terms & Conditions</h1>
        <p className="text-body">Last updated: October 2025</p>
        <p>
          These terms govern use of the {siteConfig.name} website and the submission of project
          inquiries. Formal project work is subject to a separate written agreement or statement of
          work.
        </p>
        <h2>Quotes & packages</h2>
        <p>
          Package prices are starting points in PKR unless otherwise quoted. Final fees depend on
          scope, integrations, and timeline confirmed in writing.
        </p>
        <h2>Client responsibilities</h2>
        <p>
          Clients provide accurate information, content, approvals, and access needed to deliver the
          agreed scope on time.
        </p>
        <h2>Revisions</h2>
        <p>
          Revision rounds follow the selected package or custom proposal. Additional work is quoted
          separately.
        </p>
        <h2>Third-party costs</h2>
        <p>
          Hosting, domains, premium plugins, stock assets, and payment gateway fees are client
          responsibilities unless explicitly included.
        </p>
        <h2>No guarantees</h2>
        <p>
          {siteConfig.name} does not guarantee search engine rankings, specific traffic levels, or
          perfect performance scores. SEO and optimization services follow documented best practices.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, liability is limited to fees paid for the specific
          engagement giving rise to the claim. Update this section with counsel for your jurisdiction.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: {siteConfig.contact.email}
        </p>
      </Container>
    </section>
  );
}
