"use client";

import { useMemo, useState } from "react";
import phrasesData from "@/content/phrases.json";
import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { StarIcon } from "@/components/Icons";
import { Speaker } from "@/components/Speaker";

type Phrase = (typeof phrasesData.phrases)[number];
type Mode = "read" | "quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PhrasesPage() {
  const [mode, setMode] = useState<Mode>("read");
  const { phrases } = phrasesData;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <PageHeader
          title="10 Power Phrases"
          subtitle="Words of Wisdom · 智慧之言"
          subtitle_zh="背下来这 10 句 = 开场、过渡、反驳、收尾全都有"
          icon={<StarIcon className="w-16 h-16" />}
        />

        {/* Mode toggle */}
        <div className="flex items-center justify-center mb-8 gap-2">
          <button
            onClick={() => setMode("read")}
            className={`px-5 py-2 rounded-full text-sm font-display tracking-wider transition-all ${
              mode === "read"
                ? "bg-[var(--color-courage-gold)] text-[var(--color-ink)] shadow-md"
                : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-courage-gold)]"
            }`}
          >
            📖 READ · 背诵
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-5 py-2 rounded-full text-sm font-display tracking-wider transition-all ${
              mode === "quiz"
                ? "bg-[var(--color-sheikah)] text-[var(--color-deep-forest)] shadow-md"
                : "border border-[var(--color-sheikah)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-sheikah)]"
            }`}
          >
            ⚔ QUIZ · 小测
          </button>
        </div>

        {mode === "read" ? <ReadMode phrases={phrases} /> : <QuizMode phrases={phrases} />}
      </main>
    </>
  );
}

function ReadMode({ phrases }: { phrases: Phrase[] }) {
  return (
    <>
      <p className="text-center text-sm text-[var(--color-ink-soft)] mb-6">
        💡 点 <span className="text-[var(--color-sheikah)]">🔊</span> 听原声 · 跟读 3 遍就记住一句
      </p>
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
              <div className="ml-auto">
                <Speaker text={p.english} size="sm" />
              </div>
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
    </>
  );
}

function QuizMode({ phrases }: { phrases: Phrase[] }) {
  const [round, setRound] = useState(0); // bumped to reshuffle
  const questions = useMemo(
    () => shuffle(phrases).slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [round, phrases]
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const current = questions[idx];
  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(phrases.filter((p) => p.id !== current.id)).slice(0, 3);
    return shuffle([current, ...wrong]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, phrases]);

  function pick(id: number) {
    if (picked !== null) return;
    setPicked(id);
    if (id === current.id) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function next() {
    setIdx((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setRound((r) => r + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
  }

  const finished = idx >= questions.length;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const grade =
      pct === 100
        ? { emoji: "🏆", label: "Legendary!", msg: "Every phrase locked in. You're battle-ready!" }
        : pct >= 80
        ? { emoji: "⚡", label: "Excellent!", msg: "Almost perfect — review the missed ones once and you've got it." }
        : pct >= 60
        ? { emoji: "🛡", label: "Good Effort", msg: "Keep practicing — another round and you'll be a master." }
        : { emoji: "📜", label: "Keep Going", msg: "Switch to 📖 Read mode, then come back. You'll see big jumps." };
    return (
      <div className="scroll-card p-8 text-center">
        <p className="text-6xl mb-2">{grade.emoji}</p>
        <h3 className="text-3xl font-display text-[var(--color-ink)] mb-2">{grade.label}</h3>
        <p className="text-[var(--color-ink-soft)] mb-6">{grade.msg}</p>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
          <div className="border border-[var(--color-courage-gold)]/40 rounded p-4">
            <p className="text-xs tracking-wider text-[var(--color-ink-soft)] uppercase mb-1">
              Score
            </p>
            <p className="text-3xl font-display text-[var(--color-courage-gold)]">
              {score} / {questions.length}
            </p>
          </div>
          <div className="border border-[var(--color-courage-gold)]/40 rounded p-4">
            <p className="text-xs tracking-wider text-[var(--color-ink-soft)] uppercase mb-1">
              🔥 Best Streak
            </p>
            <p className="text-3xl font-display text-[var(--color-courage-gold)]">{bestStreak}</p>
          </div>
        </div>
        <button onClick={restart} className="gold-button">
          ↻ Play Again · 再来一轮
        </button>
      </div>
    );
  }

  const isCorrect = picked !== null && picked === current.id;
  const isWrong = picked !== null && picked !== current.id;

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-6 text-sm flex-wrap gap-2">
        <span className="text-[var(--color-ink-soft)]">
          Q <span className="text-[var(--color-ink)] font-bold">{idx + 1}</span> / {questions.length}
        </span>
        <span className="text-[var(--color-ink-soft)]">
          Score:{" "}
          <span className="text-[var(--color-courage-gold)] font-display font-bold">{score}</span>
        </span>
        {streak >= 2 && (
          <span className="text-[var(--color-danger-red)] font-display font-bold animate-pulse">
            🔥 {streak} streak!
          </span>
        )}
      </div>

      {/* Scenario card */}
      <section className="scroll-card p-6 mb-6">
        <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-2">
          📜 SCENARIO · 场景
        </p>
        <p className="text-lg text-[var(--color-ink)] font-display mb-1">
          {current.purpose_en} · {current.purpose_zh}
        </p>
        <p className="text-sm text-[var(--color-ink-soft)] italic">💡 {current.scenario_zh}</p>
      </section>

      <p className="text-center text-[var(--color-ink-soft)] mb-4">
        Which phrase fits? · 该用哪一句？
      </p>

      <div className="grid gap-3">
        {options.map((o) => {
          const isCorrectOption = o.id === current.id;
          const showCorrect = picked !== null && isCorrectOption;
          const showWrong = picked === o.id && !isCorrectOption;
          let borderStyle = {};
          if (showCorrect) borderStyle = { borderColor: "var(--color-link-green)" };
          else if (showWrong) borderStyle = { borderColor: "var(--color-danger-red)" };
          return (
            <button
              key={o.id}
              onClick={() => pick(o.id)}
              disabled={picked !== null}
              className="scroll-card p-4 text-left disabled:cursor-default"
              style={borderStyle}
            >
              <p className="text-[var(--color-ink)] text-sm md:text-base">
                {o.english}
                {showCorrect && (
                  <span className="ml-2 text-[var(--color-link-green)] font-bold">✓</span>
                )}
                {showWrong && (
                  <span className="ml-2 text-[var(--color-danger-red)] font-bold">✗</span>
                )}
              </p>
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {picked !== null && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            {isCorrect && (
              <p className="text-[var(--color-link-green)] font-display text-lg">
                ✓ Excellent! ⚡ {streak >= 3 && `${streak} in a row!`}
              </p>
            )}
            {isWrong && (
              <p className="text-[var(--color-danger-red)] font-display text-lg">
                ✗ Not this one — the green ✓ is the right one.
              </p>
            )}
          </div>
          <button onClick={next} className="sheikah-button">
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
