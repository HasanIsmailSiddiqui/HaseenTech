import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-widest",
            dark ? "text-brand-cyan" : "text-brand-blue",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-cloud-white" : "text-midnight",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed",
            dark ? "text-slate-300" : "text-body",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
