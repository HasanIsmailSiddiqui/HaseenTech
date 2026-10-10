"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import type { PortfolioProject, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";
import { cn } from "@/lib/cn";

export function PortfolioGallery({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue",
              filter === cat.id
                ? "bg-brand-blue text-white"
                : "bg-white text-body border border-slate-200 hover:border-brand-blue/40",
            )}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <div key={project.slug} id={project.slug}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 text-body">No projects in this category yet.</p>
      ) : null}
    </>
  );
}
