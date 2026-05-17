"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PROGRESS,
  PROGRESS_EVENT,
  readProgress,
  shardsEarned,
  type Progress,
} from "@/lib/progress";
import { ShardCounter } from "./ShardCounter";

/**
 * Hydration-safe progress reader. Renders defaults on SSG and updates after
 * mount to avoid hydration mismatches.
 */
function useProgress(): Progress {
  const [p, setP] = useState<Progress>(DEFAULT_PROGRESS);
  useEffect(() => {
    setP(readProgress());
    const refresh = () => setP(readProgress());
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return p;
}

/**
 * Progress shards on home — derived from localStorage milestones.
 * Replaces the static "0/5" counter.
 */
export function ProgressShards() {
  const p = useProgress();
  const collected = shardsEarned(p);
  return <ShardCounter collected={collected} />;
}

const MILESTONES = [
  { en: "PREP tried", zh: "试过 PREP", hint: "(1)" },
  { en: "First speech", zh: "第一次模拟演讲", hint: "(1)" },
  { en: "Phrase Quiz", zh: "金句 Quiz", hint: "(6/10)" },
  { en: "Pattern Game", zh: "Pattern 游戏", hint: "(15/25)" },
  { en: "Master", zh: "出师", hint: "(3 speeches + 8/10 + 20/25)" },
];

export function ShardLegend() {
  const p = useProgress();
  const collected = shardsEarned(p);
  return (
    <p className="text-[var(--color-ink-soft)] text-xs mt-3 max-w-md mx-auto">
      {collected === 0 && "5 trials · 5 件兵器 · Hit each milestone to light a shard ▲"}
      {collected > 0 && collected < 5 && (
        <>
          Lit · 已点亮{" "}
          <span className="text-[var(--color-courage-gold)] font-bold">
            {collected}/5
          </span>{" "}
          · Next · 下一关：
          <span className="text-[var(--color-ink)]">
            {" "}
            {MILESTONES[collected]?.en} · {MILESTONES[collected]?.zh}{" "}
            {MILESTONES[collected]?.hint}
          </span>
        </>
      )}
      {collected === 5 && (
        <span className="text-[var(--color-courage-gold)] font-bold">
          🏆 出师！You&apos;re battle-ready.
        </span>
      )}
    </p>
  );
}

/**
 * Stats card below shards — shows raw numbers if the kid has done anything.
 */
export function ProgressStats() {
  const p = useProgress();
  const hasAny =
    p.prepTriesCount > 0 ||
    p.speechesCompleted > 0 ||
    p.phraseQuizBest.score > 0 ||
    p.patternsBest.score > 0;

  if (!hasAny) return null;

  return (
    <div className="border border-[var(--color-courage-gold)]/30 rounded-lg p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto bg-[var(--color-parchment-light)]/50">
      <Stat label_en="PREP tries" label_zh="PREP 试过" value={p.prepTriesCount} />
      <Stat label_en="Speeches" label_zh="演讲完成" value={p.speechesCompleted} />
      <Stat
        label_en="Phrase best"
        label_zh="金句最高"
        value={`${p.phraseQuizBest.score}/${p.phraseQuizBest.total}`}
      />
      <Stat
        label_en="Pattern best"
        label_zh="Pattern 最高"
        value={`${p.patternsBest.score}/${p.patternsBest.total}`}
      />
    </div>
  );
}

function Stat({
  label_en,
  label_zh,
  value,
}: {
  label_en: string;
  label_zh: string;
  value: number | string;
}) {
  return (
    <div className="text-center">
      <p className="text-[10px] tracking-wider text-[var(--color-ink-soft)] uppercase mb-0.5">
        {label_en}
      </p>
      <p className="text-[10px] text-[var(--color-ink-soft)] mb-1">{label_zh}</p>
      <p className="text-2xl font-display text-[var(--color-courage-gold)]">{value}</p>
    </div>
  );
}
