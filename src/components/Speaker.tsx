"use client";

type Props = {
  text: string;
  rate?: number;
  size?: "sm" | "md";
  className?: string;
  label?: string;
};

/**
 * 🔊 Read-aloud button using Web Speech API.
 * Lets the kid hear the English phrase pronounced — copy intonation, build muscle memory.
 */
export function Speaker({
  text,
  rate = 0.9,
  size = "md",
  className = "",
  label = "Read aloud",
}: Props) {
  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  const sizeClass = size === "sm" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm";

  return (
    <button
      onClick={speak}
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full text-[var(--color-sheikah)] border border-[var(--color-sheikah)]/40 bg-[var(--color-deep-forest)]/5 hover:bg-[var(--color-sheikah)]/15 hover:border-[var(--color-sheikah)] hover:scale-110 transition-all ${sizeClass} ${className}`}
    >
      🔊
    </button>
  );
}
