import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-cloud-white py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold text-midnight">Privacy Policy</h1>
        <p className="text-body">Last updated: October 2025</p>
        <p>
          {siteConfig.name} ({siteConfig.contact.email}) respects your privacy. This policy explains
          how project inquiry information is handled on this website.
        </p>
        <h2>Information we collect</h2>
        <p>
          When you submit the project inquiry form, we collect the fields you provide (such as name,
          email, phone, project details, and optional attachments) to respond to your request.
        </p>
        <h2>How we use information</h2>
        <ul>
          <li>To review and respond to project inquiries</li>
          <li>To prepare quotations and proposals you request</li>
          <li>To improve our services based on aggregated, non-identifying feedback</li>
        </ul>
        <h2>Storage & retention</h2>
        <p>
          Inquiries may be stored securely on the server when{" "}
          <code>INQUIRY_STORE=true</code> is enabled, or processed solely via email when configured.
          Retain only what you need for business records and delete upon request where applicable.
        </p>
        <h2>Third parties</h2>
        <p>
          Email delivery may use a transactional provider (e.g. Resend). Hosting and analytics
          providers may process technical logs. We do not sell personal data.
        </p>
        <h2>Your rights</h2>
        <p>
          Contact us at {siteConfig.contact.email} to request access, correction, or deletion of
          inquiry data, subject to legal obligations.
        </p>
        <h2>Cookies</h2>
        <p>
          This site uses essential cookies only unless you add analytics later. Document any
          analytics tools here when enabled.
        </p>
      </Container>
    </section>
  );
}
