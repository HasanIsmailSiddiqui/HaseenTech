import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { WhatsAppCta } from "@/components/marketing/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Submit a project inquiry or reach HaseenTech by email or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white">
        <Container>
          <SectionHeading
            dark
            eyebrow="Contact"
            title="Start a project inquiry"
            description="Share your service, package, budget, and timeline. We respond within 1–2 business days when email is configured."
          />
        </Container>
      </section>
      <section className="bg-cloud-white py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <Suspense fallback={<p className="text-sm text-body">Loading form…</p>}>
              <InquiryForm />
            </Suspense>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-heading text-lg font-semibold text-midnight">Direct contact</h2>
              <p className="mt-2 text-sm text-body">
                Email:{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-blue hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
              <div className="mt-4">
                <WhatsAppCta />
              </div>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
              <p className="font-medium">Email delivery setup</p>
              <p className="mt-2 leading-relaxed">
                Configure <code className="font-mono text-xs">RESEND_API_KEY</code>,{" "}
                <code className="font-mono text-xs">BUSINESS_EMAIL</code>, and{" "}
                <code className="font-mono text-xs">EMAIL_FROM</code> in{" "}
                <code className="font-mono text-xs">.env.local</code>. See README. The form will not
                report success until email sends successfully.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
