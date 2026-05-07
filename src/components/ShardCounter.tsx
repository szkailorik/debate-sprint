import { ShardIcon } from "./Icons";

export function ShardCounter({
  collected,
  total = 5,
}: {
  collected: number;
  total?: number;
}) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <ShardIcon
          key={i}
          filled={i < collected}
          className={`w-7 h-7 ${
            i < collected
              ? "text-[var(--color-courage-gold)] drop-shadow-[0_0_8px_rgba(212,160,76,0.7)]"
              : "text-[var(--color-courage-gold)]/30"
          }`}
        />
      ))}
    </div>
  );
}
