"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-bg font-bold text-sm">
            GA
          </div>
          <span className="text-lg font-semibold tracking-tight text-text">
            Great Address
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/#domains"
            className="text-text-secondary hover:text-text transition-colors"
          >
            Domains
          </Link>
          <Link
            href="/#how-it-works"
            className="text-text-secondary hover:text-text transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#submit"
            className="rounded-full bg-accent px-5 py-2 text-bg font-medium hover:bg-accent-dim transition-colors"
          >
            Submit a Plan
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary p-2"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <Link
            href="/#domains"
            onClick={() => setMobileOpen(false)}
            className="block text-text-secondary hover:text-text transition-colors py-1"
          >
            Domains
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block text-text-secondary hover:text-text transition-colors py-1"
          >
            How It Works
          </Link>
          <Link
            href="/#submit"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full bg-accent px-5 py-2 text-bg font-medium text-center hover:bg-accent-dim transition-colors"
          >
            Submit a Plan
          </Link>
        </div>
      )}
    </header>
  );
}
