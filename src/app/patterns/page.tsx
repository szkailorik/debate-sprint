"use client";
import { useEffect, useState } from "react";
import patternsData from "@/content/patterns.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { EyeIcon } from "@/components/Icons";
import { Speaker } from "@/components/Speaker";
import { recordPatternsGame } from "@/lib/progress";

type PatternId = (typeof patternsData.patterns)[number]["id"];

export default function PatternsPage() {
  const { patterns, questions } = patternsData;
  const [currentQ, setCurrentQ] = useState(0);
  const [pickedPattern, setPickedPattern] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [byPattern, setByPattern] = useState<
    Record<string, { correct: number; total: number }>
  >({});

  const q = questions[currentQ];
  const correctPattern = patterns.find((p) => p.id === q.correct_pattern)!;
  const isCorrect = pickedPattern === q.correct_pattern;
  const inResult = pickedPattern !== null;

  function pickPattern(id: string) {
    if (inResult) return;
    setPickedPattern(id);
    setAnswered((a) => a + 1);
    const right = id === q.correct_pattern;
    if (right) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    setByPattern((bp) => {
      const cur = bp[q.correct_pattern] ?? { correct: 0, total: 0 };
      return {
        ...bp,
        [q.correct_pattern]: {
          correct: cur.correct + (right ? 1 : 0),
          total: cur.total + 1,
        },
      };
    });
  }

  function nextQ() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setPickedPattern(null);
    }
  }

  function reset() {
    setCurrentQ(0);
    setPickedPattern(null);
    setScore(0);
    setAnswered(0);
    setStreak(0);
    setBestStreak(0);
    setByPattern({});
  }

  const isLast = currentQ >= questions.length - 1 && inResult;
  const isFinished = isLast;

  // Record progress once when game finishes.
  useEffect(() => {
    if (isFinished) recordPatternsGame(score, questions.length, bestStreak);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        <PageHeader
          title="Pattern Recognition"
          subtitle="See Through the Foe · 识破对手"
          subtitle_zh="听对手 → 识破套路 → 套用反击模板（5 招打天下）"
          icon={<EyeIcon className="w-16 h-16" />}
        />

        {!isFinished && (
          <div className="flex items-center justify-between mb-6 text-sm flex-wrap gap-2">
            <span className="text-[var(--color-ink-soft)]">
              Q{" "}
              <span className="text-[var(--color-ink)] font-bold">{currentQ + 1}</span> /{" "}
              {questions.length}
            </span>
            <span className="text-[var(--color-ink-soft)]">
              Score:{" "}
              <span className="text-[var(--color-courage-gold)] font-display font-bold">
                {score} / {answered}
              </span>
            </span>
            {streak >= 2 && (
              <span className="text-[var(--color-danger-red)] font-display font-bold animate-pulse">
                🔥 {streak} streak!
              </span>
            )}
          </div>
        )}

        {!isFinished && (
          <section className="scroll-card p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)]">
                👁 THE OPPONENT SAYS · 对手发言
              </p>
              <Speaker text={q.opponent_says} size="sm" />
            </div>
            <p className="text-lg text-[var(--color-ink)] italic">
              &ldquo;{q.opponent_says}&rdquo;
            </p>
          </section>
        )}

        {!inResult && !isFinished && (
          <div>
            <p className="text-center text-[var(--color-ink-soft)] mb-4">
              What&apos;s their weakness? · 对手用了哪一招？
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => pickPattern(p.id)}
                  className="scroll-card p-4 text-left"
                >
                  <div className="font-display text-lg text-[var(--color-ink)]">
                    {p.name_en}
                  </div>
                  <div className="text-sm text-[var(--color-ink-soft)]">{p.name_zh}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {inResult && !isFinished && (
          <div>
            <div
              className="scroll-card p-5 mb-4"
              style={{
                borderColor: isCorrect
                  ? "var(--color-link-green)"
                  : "var(--color-danger-red)",
              }}
            >
              <p
                className="font-display text-xl mb-2"
                style={{
                  color: isCorrect
                    ? "var(--color-link-green)"
                    : "var(--color-danger-red)",
                }}
              >
                {isCorrect
                  ? `✓ Sharp eye! ⚡ 眼力好！${streak >= 3 ? ` ${streak} in a row · 连击 ${streak}！` : ""}`
                  : "✗ Not quite · 差一点"}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)] mb-2">
                Correct answer · 正确答案:{" "}
                <strong className="text-[var(--color-ink)]">
                  {correctPattern.name_en} · {correctPattern.name_zh}
                </strong>
              </p>
              <div className="text-sm border-l-2 border-[var(--color-courage-gold)]/40 pl-3">
                <p className="text-[var(--color-ink)]">{q.explanation_en}</p>
                <p className="text-[var(--color-ink-soft)] text-xs mt-0.5">
                  {q.explanation_zh}
                </p>
              </div>
            </div>

            <div className="scroll-card p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)]">
                  ⚔ YOUR COUNTER · 你的反击
                </p>
                <Speaker text={correctPattern.counter_en} size="sm" />
              </div>
              <p className="text-lg text-[var(--color-ink)] mb-2">
                {correctPattern.counter_en}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {correctPattern.counter_zh}
              </p>
            </div>

            <div className="flex justify-end items-center">
              <button onClick={nextQ} className="sheikah-button">
                Next ▶
              </button>
            </div>
          </div>
        )}

        {isFinished && (
          <EndSummary
            score={score}
            total={questions.length}
            bestStreak={bestStreak}
            patterns={patterns}
            byPattern={byPattern}
            onReset={reset}
          />
        )}

        <div className="ornament-divider mt-12" />
        <details className="scroll-card p-5">
          <summary className="font-display text-lg text-[var(--color-ink)] cursor-pointer">
            📖 5 Patterns Cheat Sheet · 5 招速查表
          </summary>
          <div className="mt-4 space-y-4">
            {patterns.map((p) => (
              <div key={p.id} className="text-sm">
                <p className="font-display text-[var(--color-courage-gold)]">
                  {p.name_en} · {p.name_zh}
                </p>
                <p className="text-[var(--color-ink)]">{p.description_en}</p>
                <p className="text-[var(--color-ink-soft)] text-xs">
                  {p.description_zh}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[var(--color-ink)]">→ {p.counter_en}</p>
                  <Speaker text={p.counter_en} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </details>
      </main>
    </>
  );
}

function EndSummary({
  score,
  total,
  bestStreak,
  patterns,
  byPattern,
  onReset,
}: {
  score: number;
  total: number;
  bestStreak: number;
  patterns: typeof patternsData.patterns;
  byPattern: Record<string, { correct: number; total: number }>;
  onReset: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 90
      ? {
          emoji: "🏆",
          label_en: "Sheikah Master!",
          label_zh: "希卡高手！",
          msg_en: "All 5 patterns owned. Bring on the debate.",
          msg_zh: "5 种套路你都拿下了。比赛放马过来。",
        }
      : pct >= 75
      ? {
          emoji: "⚔",
          label_en: "Battle Ready",
          label_zh: "可以上场了",
          msg_en: "You can spot most tricks. Review the weak pattern below and you're set.",
          msg_zh: "大部分套路你都看得出来。看看下面哪招还弱，复习一下就稳。",
        }
      : pct >= 60
      ? {
          emoji: "🛡",
          label_en: "Solid Progress",
          label_zh: "进步明显",
          msg_en: "Halfway there. Run it once more — accuracy jumps fast.",
          msg_zh: "已经一半了。再来一轮，正确率会跳一截。",
        }
      : {
          emoji: "📜",
          label_en: "Keep Training",
          label_zh: "继续训练",
          msg_en: "Check the 5-pattern cheat sheet, then come back. Every kid gets there.",
          msg_zh: "看看下面的 5 招速查表，再回来。每个小孩都能学会。",
        };

  return (
    <div className="scroll-card p-8">
      <div className="text-center mb-6">
        <p className="text-6xl mb-2">{grade.emoji}</p>
        <h3 className="text-3xl font-display text-[var(--color-ink)] mb-1">
          {grade.label_en}
        </h3>
        <p className="text-base text-[var(--color-ink-soft)] mb-3">{grade.label_zh}</p>
        <p className="text-[var(--color-ink)] mb-1">{grade.msg_en}</p>
        <p className="text-[var(--color-ink-soft)] text-sm">{grade.msg_zh}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        <div className="border border-[var(--color-courage-gold)]/40 rounded p-4 text-center">
          <p className="text-xs tracking-wider text-[var(--color-ink-soft)] uppercase mb-0.5">
            Final Score · 总分
          </p>
          <p className="text-3xl font-display text-[var(--color-courage-gold)]">
            {score} / {total}
          </p>
        </div>
        <div className="border border-[var(--color-courage-gold)]/40 rounded p-4 text-center">
          <p className="text-xs tracking-wider text-[var(--color-ink-soft)] uppercase mb-0.5">
            🔥 Best Streak · 最长连击
          </p>
          <p className="text-3xl font-display text-[var(--color-courage-gold)]">
            {bestStreak}
          </p>
        </div>
      </div>

      <h4 className="text-sm tracking-[0.3em] text-[var(--color-courage-gold)] mb-3 text-center">
        PATTERN MASTERY · 各招命中率
      </h4>
      <div className="space-y-2 mb-6">
        {patterns.map((p) => {
          const stats = byPattern[p.id] ?? { correct: 0, total: 0 };
          const mastered = stats.total >= 3 && stats.correct === stats.total;
          return (
            <div
              key={p.id}
              className="flex items-center justify-between border border-[var(--color-courage-gold)]/30 rounded px-4 py-2"
            >
              <div className="flex-1">
                <p className="text-sm font-display text-[var(--color-ink)]">
                  {mastered && "✓ "}
                  {p.name_en}{" "}
                  <span className="text-[var(--color-ink-soft)]">· {p.name_zh}</span>
                </p>
              </div>
              <div className="text-sm">
                {stats.total > 0 ? (
                  <>
                    <span
                      className={
                        mastered
                          ? "text-[var(--color-link-green)] font-display font-bold"
                          : "text-[var(--color-ink)] font-display"
                      }
                    >
                      {stats.correct}/{stats.total}
                    </span>
                    {mastered && (
                      <span className="ml-2 text-xs text-[var(--color-link-green)]">
                        Mastered · 精通
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[var(--color-ink-soft)]">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button onClick={onReset} className="gold-button">
          ↻ Play Again · 再战一轮
        </button>
      </div>
    </div>
  );
}
