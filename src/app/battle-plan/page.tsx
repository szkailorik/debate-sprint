"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";

type Bullet = { en: string; zh: string };

type Step = {
  id: number;
  emoji: string;
  title_en: string;
  title_zh: string;
  timeMin: number;
  bullets: Bullet[];
  why_en: string;
  why_zh: string;
  cta?: { href: string; label_en: string; label_zh: string };
};

const STEPS: Step[] = [
  {
    id: 1,
    emoji: "🎯",
    title_en: "Understand the Motion",
    title_zh: "看懂题目",
    timeMin: 5,
    bullets: [
      { en: "Read the motion 3 times.", zh: "把题目读 3 遍。" },
      {
        en: "Circle the key words (who / what / when / where).",
        zh: "圈出关键词（人物 / 事 / 时间 / 地点）。",
      },
      {
        en: "Say it in your own words — could you explain it to your little sister?",
        zh: "用自己的话讲一遍 — 能不能讲给妹妹听？",
      },
    ],
    why_en:
      "If you don't understand the motion, the next 6 steps are wasted. Slow down — it's fine.",
    why_zh: "题目都没看懂，后面 6 步都是浪费。慢一点没关系。",
  },
  {
    id: 2,
    emoji: "⚔",
    title_en: "Brainstorm 3 Reasons",
    title_zh: "想 3 个论点",
    timeMin: 10,
    bullets: [
      {
        en: "Why is your side right? Come up with at least 3 reasons.",
        zh: "你这边为什么对？至少想 3 个理由。",
      },
      {
        en: "Pick the 3 easiest to explain — not the smartest.",
        zh: "挑最容易讲的 3 个 — 不是最聪明的，是最好讲的。",
      },
      {
        en: "Write them down. Don't try to remember in your head.",
        zh: "写下来，不要靠脑子记。",
      },
    ],
    why_en:
      "Three-point structure (First / Second / Finally) is the skeleton of a debate speech.",
    why_zh: "三点结构（First / Second / Finally）是辩论的骨架。",
    cta: {
      href: "/topics",
      label_en: "→ Open Armory for inspiration (13 motions)",
      label_zh: "→ 去武器库借灵感（13 个辩题做参考）",
    },
  },
  {
    id: 3,
    emoji: "🎬",
    title_en: "Add a Real Example",
    title_zh: "每个论点配 1 个真实例子",
    timeMin: 10,
    bullets: [
      {
        en: "Match each of the 3 reasons with a specific example.",
        zh: "3 个论点各配 1 个具体例子。",
      },
      {
        en: "Sources: your own life, classmates, news, books, TV.",
        zh: "来源：自己经历 / 同学 / 新闻 / 书 / 电视都行。",
      },
      {
        en: "The more specific, the better — name, place, time.",
        zh: "越具体越好 — 有人名、有地点、有时间最好。",
      },
    ],
    why_en:
      "Examples are the bullets of a debate. A reason without an example is a blank shot.",
    why_zh: "例子是辩论的子弹。没例子的论点像放空炮。",
    cta: {
      href: "/topics",
      label_en: "→ See how expert examples are written",
      label_zh: "→ 看专家版例子怎么写",
    },
  },
  {
    id: 4,
    emoji: "📜",
    title_en: "Draft Your PREP Speech",
    title_zh: "用 PREP 写发言稿",
    timeMin: 15,
    bullets: [
      {
        en: "Use PREP to chain the 3 reasons into one speech.",
        zh: "用 PREP 把 3 个论点串成一段话。",
      },
      {
        en: "Don't write full sentences — just keywords, so a glance is enough.",
        zh: "不要写完整句子 — 只写关键词，看一眼就能讲。",
      },
      {
        en: "Always open with 'I strongly believe that ___.'",
        zh: "开头一定要有 'I strongly believe that ___'。",
      },
    ],
    why_en:
      "A script is not better when more complete — it's better when more familiar.",
    why_zh: "稿子不是越完整越好，是越熟越好。",
    cta: {
      href: "/structure",
      label_en: "→ Use PREP Try-It to fill and rehearse",
      label_zh: "→ 用 PREP Try-It 边填边练",
    },
  },
  {
    id: 5,
    emoji: "👁",
    title_en: "Predict the Opponent",
    title_zh: "预测对手会说什么",
    timeMin: 10,
    bullets: [
      {
        en: "Stand in the opponent's shoes — what 3 arguments will they make?",
        zh: "站到对方角度想：对手最可能讲哪 3 个论点？",
      },
      {
        en: "Prepare 1 counter sentence for each of their arguments.",
        zh: "每个对手论点准备 1 句反击。",
      },
      {
        en: "Review the 5 opponent patterns and tag which one each is.",
        zh: "复习 5 种对手套路，对号入座。",
      },
    ],
    why_en:
      "Half of debate is listening. If you guess their move before they speak, you stay calm.",
    why_zh: "辩论一半在听。对手开口前你就猜到，就稳了。",
    cta: {
      href: "/patterns",
      label_en: "→ Review 5 opponent patterns + counters",
      label_zh: "→ 复习 5 种对手套路 + 反击模板",
    },
  },
  {
    id: 6,
    emoji: "🔥",
    title_en: "Rehearse 3 Times Out Loud",
    title_zh: "大声练 3 遍",
    timeMin: 15,
    bullets: [
      { en: "Round 1: slow, find your rhythm.", zh: "第 1 遍：慢慢说，找节奏。" },
      {
        en: "Round 2: start the timer, finish in 60 seconds.",
        zh: "第 2 遍：开计时器，60 秒说完。",
      },
      {
        en: "Round 3: stand up, speak loud — simulate the real match.",
        zh: "第 3 遍：站起来 + 大声说 — 模拟比赛感觉。",
      },
    ],
    why_en:
      "Saying it in your head 10 times ≠ saying it out loud 1 time. Open your mouth to really train.",
    why_zh: "心里默念 10 次 ≠ 大声说 1 次。开口练才是真练。",
    cta: {
      href: "/structure#mock-speech",
      label_en: "→ Use Mock Speech to rehearse with a timer",
      label_zh: "→ 用 Mock Speech 计时练",
    },
  },
  {
    id: 7,
    emoji: "🧪",
    title_en: "Pre-Match Ritual",
    title_zh: "临场预案",
    timeMin: 5,
    bullets: [
      {
        en: "Memorize the 4 emergency lines (blank / didn't hear / out of time / nervous).",
        zh: "背 4 个救急话术（卡壳 / 没听清 / 时间到 / 紧张）。",
      },
      {
        en: "3 deep breaths — before going on stage, and again before you speak.",
        zh: "深呼吸 3 次 — 上台前 + 开口前各做一遍。",
      },
      { en: "Re-read Phrase #1 (the opening line).", zh: "再读一遍金句 #1（开场）。" },
    ],
    why_en:
      "Five minutes before the match beats cramming 10 times harder.",
    why_zh: "比赛前 5 分钟看一遍，比临时抱佛脚有用 10 倍。",
    cta: {
      href: "/emergency",
      label_en: "→ Review the 4 emergency lines",
      label_zh: "→ 复习 4 个救急话术",
    },
  },
];

const TOTAL_MINUTES = STEPS.reduce((s, x) => s + x.timeMin, 0);

type BattlePlanState = {
  motion: string;
  side: "pro" | "con" | "";
  checks: Record<number, boolean>;
};

const STORAGE_KEY = "debateSprint:battlePlan:v1";

const DEFAULT_STATE: BattlePlanState = { motion: "", side: "", checks: {} };

function readState(): BattlePlanState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: BattlePlanState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function BattlePlanPage() {
  const [state, setState] = useState<BattlePlanState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeState(state);
  }, [state, hydrated]);

  function toggleStep(id: number) {
    setState((s) => ({ ...s, checks: { ...s.checks, [id]: !s.checks[id] } }));
  }

  function reset() {
    if (typeof window !== "undefined") {
      if (!window.confirm("New Motion? · 换新辩题？This will reset all 7 checks. 会清掉 7 个勾。"))
        return;
    }
    setState(DEFAULT_STATE);
  }

  const completedCount = STEPS.filter((s) => state.checks[s.id]).length;
  const allDone = completedCount === STEPS.length;
  const completedMinutes = STEPS.filter((s) => state.checks[s.id]).reduce(
    (sum, s) => sum + s.timeMin,
    0
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        <PageHeader
          title="Battle Plan · 战前 7 步"
          subtitle="From Motion to Mic · 从抽题到上麦"
          subtitle_zh="拿到辩题以后照清单做就行 · Follow the checklist after you've been assigned a motion · ~70 min total (split across 2 days)"
          icon={<span className="text-5xl">📋</span>}
        />

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-[var(--color-ink-soft)]">
              <span className="font-display font-bold text-[var(--color-courage-gold)] text-lg">
                {completedCount}
              </span>{" "}
              / {STEPS.length} done · 完成 · {completedMinutes} / {TOTAL_MINUTES} min
            </span>
            <button
              onClick={reset}
              className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-danger-red)] underline"
            >
              ↻ New Motion · 重新开始
            </button>
          </div>
          <div className="h-2 bg-[var(--color-parchment-deep)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-courage-gold)] transition-all duration-500"
              style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Motion input */}
        <section
          className="scroll-card p-5 mb-8"
          style={{ borderColor: "var(--color-sheikah)" }}
        >
          <p className="text-xs tracking-[0.3em] text-[var(--color-sheikah)] mb-2">
            🎯 YOUR MOTION · 你抽到的辩题
          </p>
          <input
            type="text"
            value={state.motion}
            onChange={(e) => setState((s) => ({ ...s, motion: e.target.value }))}
            placeholder="Type your motion here · 把辩题打进来，例如 Should kids use AI to help with homework?"
            className="w-full px-3 py-2 border border-[var(--color-courage-gold)]/40 rounded bg-white text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-sheikah)] focus:ring-1 focus:ring-[var(--color-sheikah)] mb-3"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs text-[var(--color-ink-soft)] uppercase tracking-wider">
              Your side · 你的立场:
            </label>
            <button
              onClick={() =>
                setState((s) => ({ ...s, side: s.side === "pro" ? "" : "pro" }))
              }
              className={`px-3 py-1.5 rounded text-sm font-display tracking-wider transition-colors ${
                state.side === "pro"
                  ? "bg-[var(--color-link-green)] text-white"
                  : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-link-green)]"
              }`}
            >
              PRO ✓
            </button>
            <button
              onClick={() =>
                setState((s) => ({ ...s, side: s.side === "con" ? "" : "con" }))
              }
              className={`px-3 py-1.5 rounded text-sm font-display tracking-wider transition-colors ${
                state.side === "con"
                  ? "bg-[var(--color-danger-red)] text-white"
                  : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-danger-red)]"
              }`}
            >
              CON ✗
            </button>
            {state.motion && state.side && (
              <span className="text-xs text-[var(--color-ink-soft)] italic ml-2">
                {state.side === "pro" ? "Supporting · 支持 " : "Opposing · 反对 "}
                &ldquo;{state.motion}&rdquo;
              </span>
            )}
          </div>
        </section>

        {/* The 7 steps */}
        <div className="space-y-4">
          {STEPS.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              checked={!!state.checks[step.id]}
              onToggle={() => toggleStep(step.id)}
            />
          ))}
        </div>

        {/* End celebration */}
        {allDone && (
          <div
            className="scroll-card p-8 mt-8 text-center"
            style={{ borderColor: "var(--color-link-green)" }}
          >
            <p className="text-6xl mb-2">🏆</p>
            <h2 className="text-3xl font-display text-[var(--color-ink)] mb-2">
              Battle Plan Complete · 备战完成
            </h2>
            <p className="text-[var(--color-ink)] mb-1 max-w-md mx-auto">
              All 7 steps checked. You&apos;re more prepared than 90% of your classmates.
            </p>
            <p className="text-[var(--color-ink-soft)] mb-4 max-w-md mx-auto text-sm">
              7 步全部打勾。你比 90% 的同学准备得充分多了。<br />
              Before going up: 3 deep breaths, open with Phrase #1. You&apos;ve got this.<br />
              上场前再深呼吸 3 次，第一句用金句 #1。You&apos;ve got this.
            </p>
          </div>
        )}

        <div className="ornament-divider mt-12" />
        <p className="text-center text-sm text-[var(--color-ink-soft)]">
          ⚔ Finishing the checklist = half the battle won · 完成清单 = 你已经赢了一半 ⚔
        </p>
      </main>
    </>
  );
}

function StepCard({
  step,
  checked,
  onToggle,
}: {
  step: Step;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <section
      className="scroll-card p-5 md:p-6 transition-all"
      style={{
        borderColor: checked ? "var(--color-link-green)" : undefined,
        backgroundColor: checked
          ? "color-mix(in srgb, var(--color-link-green) 5%, transparent)"
          : undefined,
      }}
    >
      <div className="flex gap-4 items-start">
        {/* Big checkbox */}
        <button
          onClick={onToggle}
          aria-label={checked ? "Mark not done · 取消打勾" : "Mark done · 完成打勾"}
          className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl font-bold transition-all ${
            checked
              ? "bg-[var(--color-link-green)] border-[var(--color-link-green)] text-white"
              : "border-[var(--color-courage-gold)]/50 hover:border-[var(--color-courage-gold)] text-transparent hover:bg-[var(--color-courage-gold)]/10"
          }`}
        >
          ✓
        </button>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <span className="text-2xl">{step.emoji}</span>
            <span className="font-display text-[var(--color-courage-gold)]">
              STEP {step.id}
            </span>
            <span className="text-xs text-[var(--color-ink-soft)] tracking-wider uppercase">
              · {step.timeMin} min
            </span>
          </div>
          <h3
            className={`text-xl font-display mb-3 ${
              checked
                ? "text-[var(--color-ink-soft)] line-through"
                : "text-[var(--color-ink)]"
            }`}
          >
            {step.title_en} <span className="text-base">· {step.title_zh}</span>
          </h3>

          {/* Bilingual bullets — English primary, Chinese supporting */}
          <ul className="space-y-2 mb-4">
            {step.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-[var(--color-courage-gold)] shrink-0 mt-0.5">•</span>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-ink)]">{b.en}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{b.zh}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Why — bilingual stacked */}
          <div className="text-xs italic border-l-2 border-[var(--color-courage-gold)]/40 pl-3 mb-3">
            <p className="text-[var(--color-ink)]">💡 {step.why_en}</p>
            <p className="text-[var(--color-ink-soft)] mt-0.5">{step.why_zh}</p>
          </div>

          {/* CTA — bilingual stacked */}
          {step.cta && (
            <Link
              href={step.cta.href}
              className="block text-sm text-[var(--color-sheikah)] hover:text-[var(--color-sheikah-glow)] hover:underline font-display"
            >
              <span>{step.cta.label_en}</span>
              <br />
              <span className="text-xs text-[var(--color-ink-soft)] font-sans">
                {step.cta.label_zh}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
