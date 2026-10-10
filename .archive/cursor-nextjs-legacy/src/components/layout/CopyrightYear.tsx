"use client";

import { useEffect, useState } from "react";

/** Current calendar year, resolved after mount for cacheComponents-compatible prerender. */
export function CopyrightYear({ fallback = 2026 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
