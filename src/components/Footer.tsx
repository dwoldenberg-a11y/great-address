import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-bg font-bold text-xs">
                GA
              </div>
              <span className="text-base font-semibold tracking-tight text-text">
                Great Address
              </span>
            </Link>
            <p className="text-sm text-text-tertiary max-w-xs">
              Premium domains for ambitious founders. Buy outright or partner with us.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <p className="text-text-secondary font-medium">Navigate</p>
              <Link href="/#domains" className="block text-text-tertiary hover:text-text transition-colors">
                Domains
              </Link>
              <Link href="/#how-it-works" className="block text-text-tertiary hover:text-text transition-colors">
                How It Works
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-text-secondary font-medium">Contact</p>
              <a href="mailto:david@woldenberg.com" className="block text-text-tertiary hover:text-accent transition-colors">
                david@woldenberg.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} Great Address. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
