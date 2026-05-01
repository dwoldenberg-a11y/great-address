import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Great<span className="text-emerald-600">Address</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Domains
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            How It Works
          </Link>
        </nav>
      </div>
    </header>
  );
}
