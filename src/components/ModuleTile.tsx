import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  subtitle_zh: string;
  href: string;
  icon: ReactNode;
};

export function ModuleTile({ title, subtitle, subtitle_zh, href, icon }: Props) {
  return (
    <Link
      href={href}
      className="scroll-card p-6 flex flex-col items-center text-center"
    >
      <div className="text-[var(--color-courage-gold)] w-12 h-12 mb-4 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xl font-display text-[var(--color-ink)] mb-1">{title}</h2>
      <p className="text-sm font-display italic text-[var(--color-courage-gold)]">
        {subtitle}
      </p>
      <p className="text-sm text-[var(--color-ink-soft)] mt-1">{subtitle_zh}</p>
    </Link>
  );
}
