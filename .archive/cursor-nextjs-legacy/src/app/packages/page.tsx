import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonFeatures, packages } from "@/data/packages";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = createMetadata({
  title: "Packages",
  description: "Starter, Business, WooCommerce, and custom packages with PKR starting prices.",
  path: "/packages",
});

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Included" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-slate-300" aria-label="Not included" />;
  return <span className="text-sm text-body">{value}</span>;
}

export default function PackagesPage() {
  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white">
        <Container>
          <SectionHeading
            dark
            eyebrow="Pricing"
            title="Packages & starting prices"
            description="Figures are starting points in PKR—not fixed quotes. Hosting, domains, and premium plugins are excluded unless agreed."
          />
        </Container>
      </section>

      <section className="bg-cloud-white py-16">
        <Container className="grid gap-6 lg:grid-cols-4">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-2xl border p-6 shadow-sm",
                pkg.id === "business" ? "border-brand-blue ring-2 ring-brand-blue/20" : "border-slate-200",
              )}
            >
              <h2 className="font-heading text-xl font-semibold text-midnight">{pkg.name}</h2>
              <p className="mt-2 text-3xl font-semibold text-brand-blue">{pkg.priceLabel}</p>
              <p className="mt-3 text-sm text-body">{pkg.summary}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-body">
                {pkg.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <p>
                  <strong className="text-body">Timeline:</strong> {pkg.timeline}
                </p>
                <p>
                  <strong className="text-body">Revisions:</strong> {pkg.revisions}
                </p>
              </div>
              <Button href={`/contact?package=${pkg.id}`} className="mt-6 w-full">
                {pkg.ctaLabel}
              </Button>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <SectionHeading title="Feature comparison" align="center" />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-midnight">
                <tr>
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Starter</th>
                  <th className="px-4 py-3 font-medium">Business</th>
                  <th className="px-4 py-3 font-medium">WooCommerce</th>
                  <th className="px-4 py-3 font-medium">Custom</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.label} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-midnight">{row.label}</td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.starter} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.business} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.woocommerce} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.custom} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-cloud-white py-16">
        <Container className="prose prose-slate max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-midnight">Important notes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
            <li>International clients may request quotations in USD, GBP, AED, or EUR via the contact form.</li>
            <li>Client responsibilities include timely content, approvals, and hosting/domain access when needed.</li>
            <li>Optional maintenance plans are available after launch.</li>
            <li>Premium plugin or theme licenses are charged to the client unless included in writing.</li>
          </ul>
          {packages.map((pkg) => (
            <div key={pkg.id} className="mt-8 rounded-xl border border-slate-200 p-5 not-prose">
              <h3 className="font-heading text-lg font-semibold text-midnight">{pkg.name} — exclusions</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-body">
                {pkg.exclusions.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
