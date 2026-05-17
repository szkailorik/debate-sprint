import emergencyData from "@/content/emergency.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { PotionIcon } from "@/components/Icons";
import { Speaker } from "@/components/Speaker";

export default function EmergencyPage() {
  const { scenarios } = emergencyData;
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        <PageHeader
          title="Emergency Kit"
          subtitle="Survival Elixir · 应急药水"
          subtitle_zh="上场翻车救急包 · 紧急时刻一句话稳住"
          icon={<PotionIcon className="w-16 h-16" />}
        />

        <div className="space-y-4">
          {scenarios.map((s) => (
            <div key={s.id} className="scroll-card p-6">
              <p className="text-xs tracking-[0.3em] text-[var(--color-danger-red)] mb-2">
                ⚠ WHEN · 状况
              </p>
              <p className="font-display text-lg text-[var(--color-ink)] mb-1">
                {s.situation_en}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)] mb-4">{s.situation_zh}</p>

              <div className="flex items-center justify-between mb-2">
                <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)]">
                  🧪 SAY · 救急话术
                </p>
                <Speaker text={s.save_en} size="sm" />
              </div>
              <p className="text-[var(--color-ink)] mb-1">{s.save_en}</p>
              <p className="text-sm text-[var(--color-ink-soft)] mb-3">{s.save_zh}</p>

              <div className="text-xs border-l-2 border-[var(--color-courage-gold)]/40 pl-3 italic">
                <p className="text-[var(--color-ink)]">💡 {s.next_step_en}</p>
                <p className="text-[var(--color-ink-soft)]">{s.next_step_zh}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
