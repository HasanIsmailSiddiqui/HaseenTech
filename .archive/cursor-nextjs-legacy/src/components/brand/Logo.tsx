import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoVariant = "dark" | "light" | "gradient";

export function LogoMark({
  variant = "gradient",
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const stroke =
    variant === "light" ? "#F8FAFC" : variant === "dark" ? "#0B1220" : "url(#ht-grad)";
  const fill =
    variant === "gradient" ? "url(#ht-grad)" : variant === "light" ? "#F8FAFC" : "#0B1220";

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9 shrink-0", className)}
      aria-hidden
    >
      {variant === "gradient" ? (
        <defs>
          <linearGradient id="ht-grad" x1="8" y1="40" x2="40" y2="8">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      ) : null}
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#0B1220" opacity={variant === "light" ? 0 : 0.08} />
      <path
        d="M14 12h8v24h-8V12zm10 0h10l-6 12 6 12H24V12z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 12h8v10H14V12zm10 14h10v10H24V26z"
        fill="none"
        stroke={variant === "light" ? "#06B6D4" : "#06B6D4"}
        strokeWidth="1.5"
        opacity="0.85"
      />
    </svg>
  );
}

function LogoContent({
  variant,
  showWordmark,
  className,
}: {
  variant: LogoVariant;
  showWordmark: boolean;
  className?: string;
}) {
  const wordClass =
    variant === "light"
      ? "text-cloud-white"
      : variant === "gradient"
        ? "bg-gradient-to-r from-brand-blue to-brand-violet bg-clip-text text-transparent"
        : "text-midnight";

  return (
    <>
      <LogoMark variant={variant === "light" ? "light" : "gradient"} />
      {showWordmark ? (
        <span className={cn("font-heading text-lg font-semibold tracking-tight", wordClass)}>
          Haseen<span className="font-normal opacity-80">Tech</span>
        </span>
      ) : null}
    </>
  );
}

export function Logo({
  variant = "dark",
  showWordmark = true,
  href = "/",
  linked = true,
  className,
}: {
  variant?: LogoVariant;
  showWordmark?: boolean;
  href?: string;
  /** When false, renders a non-interactive brand mark (e.g. hero duplicate). */
  linked?: boolean;
  className?: string;
}) {
  const layoutClass = cn("inline-flex items-center gap-2.5", className);

  if (!linked) {
    return (
      <span className={layoutClass} aria-hidden>
        <LogoContent variant={variant} showWordmark={showWordmark} />
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        layoutClass,
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
      )}
      aria-label="HaseenTech home"
    >
      <LogoContent variant={variant} showWordmark={showWordmark} />
    </Link>
  );
}
