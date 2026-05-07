import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  subtitle_zh?: string;
  icon?: ReactNode;
};

export function PageHeader({ title, subtitle, subtitle_zh, icon }: Props) {
  return (
    <header className="text-center mb-10">
      {icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 text-[var(--color-courage-gold)] mb-4">
          {icon}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-display text-[var(--color-ink)] mb-2">
        {title}
      </h1>
      <p className="font-display italic text-[var(--color-courage-gold)] text-lg">
        {subtitle}
      </p>
      {subtitle_zh && (
        <p className="text-[var(--color-ink-soft)] mt-1 text-sm">{subtitle_zh}</p>
      )}
      <div className="ornament-divider mt-6" />
    </header>
  );
}
