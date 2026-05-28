"use client";

import { useMemo, useState } from "react";
import predictionsData from "@/content/predictions.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { Speaker } from "@/components/Speaker";

type Topic = (typeof predictionsData.topics)[number];

export default function PredictionsPage() {
  const { meta, categories, topics } = predictionsData;
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [allOpen, setAllOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((t) => {
      const catOk = activeCat === "all" || t.category === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      const hay = (
        t.title_en +
        " " +
        t.title_zh +
        " " +
        t.pro.map((p) => p.en + p.zh).join(" ") +
        " " +
        t.con.map((p) => p.en + p.zh).join(" ")
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeCat, topics]);

  const catCount = (id: string) =>
    id === "all"
      ? topics.length
      : topics.filter((t) => t.category === id).length;

  function isOpen(id: string) {
    return allOpen || openId === id;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <PageHeader
          title="Top 50 Predicted Motions · 押题 50"
          subtitle="Most likely junior debate motions · 最可能的小学辩题"
          subtitle_zh={meta.note_zh}
          icon={<span className="text-5xl">🔮</span>}
        />

        <p className="text-center text-sm text-[var(--color-ink)] -mt-4 mb-8 max-w-2xl mx-auto">
          {meta.note_en}
        </p>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search a topic or keyword · 搜辩题或关键词（如 AI / 作业 / sport）"
            className="w-full px-4 py-3 border border-[var(--color-courage-gold)]/40 rounded-lg bg-white text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-sheikah)] focus:ring-1 focus:ring-[var(--color-sheikah)]"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <CatChip
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
            label={`All · 全部 (${catCount("all")})`}
          />
          {categories.map((c) => (
            <CatChip
              key={c.id}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
              label={`${c.emoji} ${c.name_zh} (${catCount(c.id)})`}
            />
          ))}
        </div>

        {/* Expand-all + count */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-[var(--color-ink-soft)]">
            {filtered.length} motions · {filtered.length} 个辩题
          </span>
          <button
            onClick={() => {
              setAllOpen((v) => !v);
              setOpenId(null);
            }}
            className="text-[var(--color-sheikah)] hover:underline font-display tracking-wide"
          >
            {allOpen ? "Collapse all · 全部收起" : "Expand all · 全部展开"}
          </button>
        </div>

        {/* Topic list */}
        <div className="space-y-3">
          {filtered.map((t) => (
            <TopicCard
              key={t.id}
              topic={t}
              emoji={categories.find((c) => c.id === t.category)?.emoji ?? "•"}
              open={isOpen(t.id)}
              onToggle={() =>
                setOpenId((cur) => (cur === t.id ? null : t.id))
              }
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-[var(--color-ink-soft)] py-10">
              No motions found · 没找到 · Try another keyword 换个词试试
            </p>
          )}
        </div>

        <div className="ornament-divider mt-12" />
        <p className="text-center text-sm text-[var(--color-ink-soft)]">
          ⚔ Plus the 13 in the Armory = 63 topics ready · 加上武器库 13 个，共 63 题在手 ⚔
        </p>
      </main>
    </>
  );
}

function CatChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
        active
          ? "bg-[var(--color-courage-gold)] text-[var(--color-ink)] shadow-sm"
          : "border border-[var(--color-courage-gold)]/40 text-[var(--color-ink-soft)] hover:border-[var(--color-courage-gold)]"
      }`}
    >
      {label}
    </button>
  );
}

function TopicCard({
  topic,
  emoji,
  open,
  onToggle,
}: {
  topic: Topic;
  emoji: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="scroll-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-xl shrink-0">{emoji}</span>
        <span className="flex-1 min-w-0">
          <span className="block font-display text-[var(--color-ink)] text-base md:text-lg">
            {topic.title_en}
          </span>
          <span className="block text-sm text-[var(--color-ink-soft)]">
            {topic.title_zh}
          </span>
        </span>
        <span
          className={`text-[var(--color-courage-gold)] transition-transform shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 grid md:grid-cols-2 gap-4 border-t border-[var(--color-courage-gold)]/20 pt-4">
          {/* PRO */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-[var(--color-link-green)] tracking-wide">
                PRO · 正方
              </span>
              <span className="text-xs text-[var(--color-ink-soft)]">
                ({topic.title_en})
              </span>
            </div>
            <ul className="space-y-2">
              {topic.pro.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--color-link-green)] shrink-0">
                    {i + 1}.
                  </span>
                  <span>
                    <span className="text-sm text-[var(--color-ink)] flex items-start gap-1.5">
                      {p.en}
                      <Speaker text={p.en} size="sm" />
                    </span>
                    <span className="block text-xs text-[var(--color-ink-soft)]">
                      {p.zh}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CON */}
          <div className="md:border-l-2 md:pl-4 border-[var(--color-courage-gold)]/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-[var(--color-danger-red)] tracking-wide">
                CON · 反方
              </span>
            </div>
            <ul className="space-y-2">
              {topic.con.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--color-danger-red)] shrink-0">
                    {i + 1}.
                  </span>
                  <span>
                    <span className="text-sm text-[var(--color-ink)] flex items-start gap-1.5">
                      {p.en}
                      <Speaker text={p.en} size="sm" />
                    </span>
                    <span className="block text-xs text-[var(--color-ink-soft)]">
                      {p.zh}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
