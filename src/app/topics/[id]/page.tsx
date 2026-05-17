import { notFound } from "next/navigation";
import Link from "next/link";
import topicsData from "@/content/topics.json";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return topicsData.topics.map((t) => ({ id: t.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TopicPage(props: Props) {
  const { id } = await props.params;
  const topic = topicsData.topics.find((t) => t.id === id);
  if (!topic) return notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <Link
          href="/topics"
          className="text-sm text-[var(--color-courage-gold)] hover:text-[var(--color-link-green)]"
        >
          ← Back to Armory · 返回武器库
        </Link>
        <header className="text-center my-8">
          <h1 className="text-3xl md:text-4xl font-display text-[var(--color-ink)] mb-2">
            {topic.title_en}
          </h1>
          <p className="text-[var(--color-ink-soft)]">{topic.title_zh}</p>
          <div className="ornament-divider" />
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="scroll-card p-6">
            <h2 className="font-display text-2xl text-[var(--color-link-green)] mb-1">
              PRO
            </h2>
            <p className="text-sm text-[var(--color-ink-soft)] mb-4">
              支持方 · &ldquo;{topic.stance_pro_en}&rdquo;
            </p>
            {topic.pro.map((p, i) => (
              <div key={i} className="mb-4">
                <p className="font-medium text-[var(--color-ink)]">
                  <span className="text-[var(--color-courage-gold)] mr-2">{i + 1}.</span>
                  {p.claim_en}
                </p>
                <p className="text-sm text-[var(--color-ink-soft)] mb-1 ml-6">
                  {p.claim_zh}
                </p>
                <div className="text-sm border-l-2 border-[var(--color-courage-gold)]/40 pl-3 italic ml-6">
                  <p className="text-[var(--color-ink)]">e.g. {p.example_en}</p>
                  <p className="text-[var(--color-ink-soft)] text-xs">例：{p.example_zh}</p>
                </div>
              </div>
            ))}
            <Link
              href={`/structure/?topic=${topic.id}&stance=pro`}
              className="sheikah-button w-full text-sm mt-2"
            >
              ⚔ Practice PREP (PRO) · 拿这题练
            </Link>
          </section>

          <section className="scroll-card p-6">
            <h2 className="font-display text-2xl text-[var(--color-danger-red)] mb-1">
              CON
            </h2>
            <p className="text-sm text-[var(--color-ink-soft)] mb-4">
              反对方 · &ldquo;{topic.stance_con_en}&rdquo;
            </p>
            {topic.con.map((c, i) => (
              <div key={i} className="mb-4">
                <p className="font-medium text-[var(--color-ink)]">
                  <span className="text-[var(--color-courage-gold)] mr-2">{i + 1}.</span>
                  {c.claim_en}
                </p>
                <p className="text-sm text-[var(--color-ink-soft)] mb-1 ml-6">
                  {c.claim_zh}
                </p>
                <div className="text-sm border-l-2 border-[var(--color-courage-gold)]/40 pl-3 italic ml-6">
                  <p className="text-[var(--color-ink)]">e.g. {c.example_en}</p>
                  <p className="text-[var(--color-ink-soft)] text-xs">例：{c.example_zh}</p>
                </div>
              </div>
            ))}
            <Link
              href={`/structure/?topic=${topic.id}&stance=con`}
              className="sheikah-button w-full text-sm mt-2"
            >
              ⚔ Practice PREP (CON) · 拿这题练
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
