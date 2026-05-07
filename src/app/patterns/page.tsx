"use client";
import { useState } from "react";
import patternsData from "@/content/patterns.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { EyeIcon } from "@/components/Icons";

export default function PatternsPage() {
  const { patterns, questions } = patternsData;
  const [currentQ, setCurrentQ] = useState(0);
  const [pickedPattern, setPickedPattern] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const q = questions[currentQ];
  const correctPattern = patterns.find((p) => p.id === q.correct_pattern)!;
  const isCorrect = pickedPattern === q.correct_pattern;
  const inResult = pickedPattern !== null;

  function pickPattern(id: string) {
    if (inResult) return;
    setPickedPattern(id);
    setAnswered((a) => a + 1);
    if (id === q.correct_pattern) setScore((s) => s + 1);
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
  }

  const isLast = currentQ >= questions.length - 1 && inResult;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        <PageHeader
          title="Pattern Recognition"
          subtitle="See Through the Foe · 识破对手"
          subtitle_zh="看到对手发言 → 识破套路 → 套用反击模板"
          icon={<EyeIcon className="w-16 h-16" />}
        />

        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-[var(--color-ink-soft)]">
            Question{" "}
            <span className="text-[var(--color-ink)] font-bold">{currentQ + 1}</span> /{" "}
            {questions.length}
          </span>
          <span className="text-[var(--color-ink-soft)]">
            Score:{" "}
            <span className="text-[var(--color-courage-gold)] font-display font-bold">
              {score} / {answered}
            </span>
          </span>
        </div>

        <section className="scroll-card p-6 mb-6">
          <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-2">
            👁 THE OPPONENT SAYS · 对手发言
          </p>
          <p className="text-lg text-[var(--color-ink)] italic">&ldquo;{q.opponent_says}&rdquo;</p>
        </section>

        {!inResult && (
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
                  <div className="font-display text-lg text-[var(--color-ink)]">{p.name_en}</div>
                  <div className="text-sm text-[var(--color-ink-soft)]">{p.name_zh}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {inResult && (
          <div>
            <div
              className="scroll-card p-5 mb-4"
              style={
                !isCorrect
                  ? { borderColor: "var(--color-danger-red)" }
                  : { borderColor: "var(--color-link-green)" }
              }
            >
              <p
                className="font-display text-xl mb-2"
                style={{
                  color: isCorrect
                    ? "var(--color-link-green)"
                    : "var(--color-danger-red)",
                }}
              >
                {isCorrect ? "✓ Correct!" : "✗ Not quite"}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)] mb-2">
                Correct answer:{" "}
                <strong className="text-[var(--color-ink)]">
                  {correctPattern.name_en} · {correctPattern.name_zh}
                </strong>
              </p>
              <p className="text-sm text-[var(--color-ink-soft)] border-l-2 border-[var(--color-courage-gold)]/40 pl-3">
                {q.explanation_zh}
              </p>
            </div>

            <div className="scroll-card p-5 mb-6">
              <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-2">
                ⚔ YOUR COUNTER · 你的反击
              </p>
              <p className="text-lg text-[var(--color-ink)] mb-2">{correctPattern.counter_en}</p>
              <p className="text-sm text-[var(--color-ink-soft)]">{correctPattern.counter_zh}</p>
            </div>

            <div className="flex justify-between items-center">
              {isLast ? (
                <button onClick={reset} className="gold-button">
                  ↻ Play Again · 重玩
                </button>
              ) : (
                <button onClick={nextQ} className="sheikah-button">
                  Next ▶
                </button>
              )}
            </div>
          </div>
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
                <p className="text-[var(--color-ink-soft)]">{p.description_zh}</p>
                <p className="text-[var(--color-ink)] mt-1">→ {p.counter_en}</p>
              </div>
            ))}
          </div>
        </details>
      </main>
    </>
  );
}
