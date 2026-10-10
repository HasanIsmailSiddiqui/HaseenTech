import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/about";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description: "Meet Hasan Ismail, founder of HaseenTech—WordPress and digital projects worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-midnight py-16 text-cloud-white lg:py-20">
        <Container>
          <SectionHeading
            dark
            eyebrow="About"
            title={aboutContent.headline}
            description={aboutContent.intro}
          />
        </Container>
      </section>

      <section className="bg-cloud-white py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={aboutContent.photo}
              alt="Hasan Ismail — professional photo placeholder"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-midnight">Biography</h2>
            <div className="mt-4 space-y-4 text-body leading-relaxed whitespace-pre-line">
              {aboutContent.biography}
            </div>
            {aboutContent.cvAvailable ? (
              <Button href={aboutContent.cvPath} variant="outline" className="mt-6">
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </Button>
            ) : (
              <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-body">
                {aboutContent.cvNote}
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <SectionHeading eyebrow="Philosophy" title="How I approach projects" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aboutContent.philosophy.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cloud-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Skills" title="Core strengths" />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {aboutContent.skills.strong.map((skill) => (
                <li key={skill} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-body">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Languages" title="PHP & JavaScript" />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-body">
              {aboutContent.skills.working.map((line) => (
                <li key={line} className="rounded-xl border border-slate-200 p-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <SectionHeading eyebrow="Toolkit" title="Tools I use" />
          <div className="mt-6 flex flex-wrap gap-2">
            {aboutContent.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs text-body"
              >
                {tool}
              </span>
            ))}
          </div>
          <Button href="/contact" className="mt-10">
            Work with HaseenTech
          </Button>
        </Container>
      </section>
    </>
  );
}
