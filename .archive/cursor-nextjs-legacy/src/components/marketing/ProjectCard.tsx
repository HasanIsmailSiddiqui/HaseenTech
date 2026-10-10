import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] bg-slate-100">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.name} website preview`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-sm text-slate-500">
            <p className="font-medium text-slate-700">Screenshot pending</p>
            <p className="mt-2 text-xs">{project.urlNote ?? "Add preview to public/portfolio"}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-brand-blue">
          {project.category}
        </p>
        <h3 className="mt-1 font-heading text-xl font-semibold text-midnight">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{project.summary}</p>
        {project.urlStatus !== "verified" ? (
          <p className="mt-2 text-xs text-amber-700">{project.urlNote}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
          >
            View live <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <Link href={`/portfolio#${project.slug}`} className="text-sm text-body hover:text-brand-blue">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
