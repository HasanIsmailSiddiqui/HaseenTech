"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-midnight/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo variant="light" />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/contact?intent=project" size="sm">
            Start a Project
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-slate-200 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-white/5 bg-midnight md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact?intent=project" className="mt-2 w-full" size="sm">
            Start a Project
          </Button>
        </Container>
      </div>
    </header>
  );
}
