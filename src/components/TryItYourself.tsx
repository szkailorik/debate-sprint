"use client";

import { useMemo, useState } from "react";
import topicsData from "@/content/topics.json";
import { Speaker } from "./Speaker";

type Stance = "pro" | "con";

/**
 * Interactive PREP fill-in for any topic.
 * Pick a topic + side, type your own 4 lines, then reveal an expert version to compare.
 * Goal: kid leaves the page thinking "I can already do PREP on any topic".
 */
export function TryItYourself() {
  const { topics } = topicsData;
  const [topicId, setTopicId] = useState(topics[0].id);
  const [stance, setStance] = useState<Stance>("pro");
  const [sampleIdx, setSampleIdx] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState({ p1: "", r: "", e: "", p2: "" });

  const topic = useMemo(
    () => topics.find((t) => t.id === topicId) ?? topics[0],
    [topicId, topics]
  );
  const stanceStmt =
    stance === "pro" ? topic.stance_pro_en : topic.stance_con_en;
  const claims = stance === "pro" ? topic.pro : topic.con;
  const sample = sampleIdx !== null ? claims[sampleIdx % claims.length] : null;

  function reset() {
    setSampleIdx(null);
    setUserInputs({ p1: "", r: "", e: "", p2: "" });
  }

  function pickTopic(id: string) {
    setTopicId(id);
    reset();
  }

  function pickStance(s: Stance) {
    setStance(s);
    reset();
  }

  function cycleSample() {
    setSampleIdx((cur) => (cur === null ? 0 : (cur + 1) % claims.length));
  }

  const samplePoint = `I strongly believe that ${stanceStmt}.`;
  const sampleReason = sample ? `This is because ${sample.claim_en.replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/\.$/, "")}.` : "";
  const sampleExample = sample ? `For example, ${sample.example_en.replace(/^[A-Z]/, (c) => c.toLowerCase())}` : "";
  const sampleClose = `That's why ${stanceStmt}.`;
  const fullSample = sample ? `${samplePoint} ${sampleReason} ${sampleExample} ${sampleClose}` : "";

  return (
    <section
      className="scroll-card p-6 md:p-8 mb-8"
      style={{ borderColor: "var(--color-sheikah)" }}
    >
      <p className="text-xs tracking-[0.3em] text-[var(--color-sheikah)] mb-2">
        ⚔ TRY IT YOURSELF · 你来试一次
      </p>
      <h2 className="text-2xl font-display text-[var(--color-ink)] mb-1">
        Practice on a Real Topic
      </h2>
      <p className="text-sm text-[var(--color-ink-soft)] mb-5">
        挑一个辩题 → 自己填 4 行 → 再看专家版本对比。3 分钟你就能 PREP 任何题目。
      </p>

      {/* Topic + Stance */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <label className="text-xs tracking-wider text-[var(--color-ink-soft)] uppercase">
          Topic:
        </label>
        <select
          value={topicId}
          onChange={(e) => pickTopic(e.target.value)}
          className="border border-[var(--color-courage-gold)]/50 bg-[var(--color-parchment-light)] rounded px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:border-[var(--color-sheikah)]"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title_en}
            </option>
          ))}
        </select>
        <div className="flex gap-1">
          <button
            onClick={() => pickStance("pro")}
            className={`px-3 py-2 rounded text-sm font-display tracking-wider transition-colors ${
              stance === "pro"
                ? "bg-[var(--color-link-green)] text-white"
                : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-link-green)]"
            }`}
          >
            PRO ✓
          </button>
          <button
            onClick={() => pickStance("con")}
            className={`px-3 py-2 rounded text-sm font-display tracking-wider transition-colors ${
              stance === "con"
                ? "bg-[var(--color-danger-red)] text-white"
                : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-danger-red)]"
            }`}
          >
            CON ✗
          </button>
        </div>
      </div>

      {/* Your stance preview */}
      <div className="mb-4 p-3 bg-[var(--color-parchment-light)] border border-[var(--color-courage-gold)]/30 rounded text-sm">
        <span className="text-[var(--color-ink-soft)]">Your stance: </span>
        <span className="text-[var(--color-ink)] font-medium">{stanceStmt}.</span>
      </div>

      {/* 4 fill-in rows */}
      <div className="space-y-3 mb-5">
        <FillRow
          letter="P"
          prefix="I strongly believe that"
          placeholder={`${stanceStmt}.`}
          value={userInputs.p1}
          onChange={(v) => setUserInputs((s) => ({ ...s, p1: v }))}
        />
        <FillRow
          letter="R"
          prefix="This is because"
          placeholder="give your reason..."
          value={userInputs.r}
          onChange={(v) => setUserInputs((s) => ({ ...s, r: v }))}
        />
        <FillRow
          letter="E"
          prefix="For example,"
          placeholder="give a real example with a person, place, or moment..."
          value={userInputs.e}
          onChange={(v) => setUserInputs((s) => ({ ...s, e: v }))}
        />
        <FillRow
          letter="P"
          prefix="That's why"
          placeholder={`${stanceStmt}.`}
          value={userInputs.p2}
          onChange={(v) => setUserInputs((s) => ({ ...s, p2: v }))}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button onClick={cycleSample} className="sheikah-button">
          🔮 {sample === null ? "Show me a sample" : "Try another reason"}
        </button>
        {(sample || userInputs.p1 || userInputs.r || userInputs.e || userInputs.p2) && (
          <button onClick={reset} className="gold-button">
            ↻ Reset
          </button>
        )}
      </div>

      {/* Sample reveal */}
      {sample && (
        <div className="border-2 border-[var(--color-link-green)] rounded p-4 bg-[var(--color-link-green)]/5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <p className="text-xs tracking-[0.3em] text-[var(--color-link-green)]">
              🛡 EXPERT SAMPLE · 专家示范
            </p>
            <Speaker text={fullSample} size="sm" />
          </div>
          <div className="space-y-2 text-sm">
            <SampleLine letter="P" text={samplePoint} />
            <SampleLine letter="R" text={sampleReason} />
            <SampleLine letter="E" text={sampleExample} />
            <SampleLine letter="P" text={sampleClose} />
          </div>
          <p className="mt-3 text-xs text-[var(--color-ink-soft)] italic">
            💡 你的版本可能不一样，但只要四步齐了，就是合格 PREP！
          </p>
        </div>
      )}
    </section>
  );
}

function FillRow({
  letter,
  prefix,
  placeholder,
  value,
  onChange,
}: {
  letter: string;
  prefix: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-[var(--color-courage-gold)] font-display font-bold w-6 shrink-0 text-xl mt-2">
        {letter}
      </span>
      <div className="flex-1">
        <label className="text-xs text-[var(--color-ink-soft)] mb-1 block">
          {prefix}{" "}
          <span className="text-[var(--color-ink-soft)]/60">___</span>
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-[var(--color-courage-gold)]/40 rounded bg-white text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-sheikah)] focus:ring-1 focus:ring-[var(--color-sheikah)] placeholder:text-[var(--color-ink-soft)]/40"
        />
      </div>
    </div>
  );
}

function SampleLine({ letter, text }: { letter: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[var(--color-link-green)] font-display font-bold w-5 shrink-0">
        {letter}
      </span>
      <span className="text-[var(--color-ink)]">{text}</span>
    </div>
  );
}
