import phrasesData from "@/content/phrases.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { StarIcon } from "@/components/Icons";

export default function PhrasesPage() {
  const { phrases } = phrasesData;
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <PageHeader
          title="10 Power Phrases"
          subtitle="Words of Wisdom · 智慧之言"
          subtitle_zh="背下来这 10 句，开场、过渡、反驳、收尾全都有"
          icon={<StarIcon className="w-16 h-16" />}
        />

        <div className="space-y-4">
          {phrases.map((p) => (
            <div key={p.id} className="scroll-card p-5 md:p-6">
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <span className="text-3xl font-display text-[var(--color-courage-gold)]">
                  {String(p.id).padStart(2, "0")}
                </span>
                <span className="text-xs tracking-[0.2em] text-[var(--color-courage-gold)] uppercase">
                  {p.purpose_en}
                </span>
                <span className="text-sm text-[var(--color-ink-soft)]">· {p.purpose_zh}</span>
              </div>
              <p className="text-lg md:text-xl text-[var(--color-ink)] mb-2 font-medium">
                {p.english}
              </p>
              <p className="text-[var(--color-ink-soft)] mb-2">{p.chinese}</p>
              <p className="text-xs text-[var(--color-ink-soft)] italic border-l-2 border-[var(--color-courage-gold)]/40 pl-3">
                💡 {p.scenario_zh}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
