import Link from "next/link";
import topicsData from "@/content/topics.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { SwordIcon } from "@/components/Icons";

export default function TopicsPage() {
  const { topics } = topicsData;
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <PageHeader
          title="Topic Armory"
          subtitle="Armory of 13 Motions · 武器库"
          subtitle_zh="13 个常见辩题（含 3 个 AI 议题），每个都有正反方 3 论点 + 例子"
          icon={<SwordIcon className="w-16 h-16" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="scroll-card p-5"
            >
              <h2 className="font-display text-lg text-[var(--color-ink)] mb-1">
                {t.title_en}
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)]">{t.title_zh}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
