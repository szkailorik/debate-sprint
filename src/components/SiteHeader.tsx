import Link from "next/link";

const NAV = [
  { href: "/structure", label: "Scroll" },
  { href: "/phrases", label: "Phrases" },
  { href: "/patterns", label: "Foe" },
  { href: "/topics", label: "Armory" },
  { href: "/emergency", label: "Elixir" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-courage-gold)]/30 bg-[var(--color-deep-forest)] text-[var(--color-parchment)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-[var(--color-courage-gold)] text-lg">⚜</span>
          <span className="font-display tracking-[0.2em] text-[var(--color-courage-gold-bright)] group-hover:text-[var(--color-sheikah)] transition-colors text-sm md:text-base">
            DEBATE SPRINT
          </span>
        </Link>
        <nav className="hidden sm:flex gap-5 text-sm font-display tracking-wider text-[var(--color-parchment)]/80">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-[var(--color-sheikah)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
