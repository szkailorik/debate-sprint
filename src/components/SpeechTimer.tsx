"use client";

import { useEffect, useRef, useState } from "react";
import topicsData from "@/content/topics.json";
import { recordSpeech } from "@/lib/progress";

type Stance = "pro" | "con";
type Phase = "idle" | "running" | "done";

const DURATIONS = [30, 60, 90] as const;

/**
 * Countdown-timer speech rehearsal.
 * Picks a topic + stance + duration, kid speaks out loud and ticks off the 4
 * PREP steps as they go. This is the closest thing to a real round in the app.
 * Confidence punchline: "I just spoke for 60 seconds in English about AI!"
 */
export function SpeechTimer() {
  const { topics } = topicsData;
  const [topicId, setTopicId] = useState(topics[0].id);
  const [stance, setStance] = useState<Stance>("pro");
  const [duration, setDuration] = useState<number>(60);
  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [checks, setChecks] = useState({ p1: false, r: false, e: false, p2: false });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const topic = topics.find((t) => t.id === topicId) ?? topics[0];
  const stanceStmt = stance === "pro" ? topic.stance_pro_en : topic.stance_con_en;
  const allChecked = Object.values(checks).every(Boolean);

  // Tick the countdown when running.
  useEffect(() => {
    if (phase !== "running") return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase("done");
          recordSpeech();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  function start() {
    setSecondsLeft(duration);
    setChecks({ p1: false, r: false, e: false, p2: false });
    setPhase("running");
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("done");
    recordSpeech();
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("idle");
    setSecondsLeft(duration);
    setChecks({ p1: false, r: false, e: false, p2: false });
  }

  function toggleCheck(key: keyof typeof checks) {
    if (phase !== "running") return;
    setChecks((c) => ({ ...c, [key]: !c[key] }));
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formattedTime = `${mins}:${String(secs).padStart(2, "0")}`;
  const elapsed = duration - secondsLeft;
  const timeWarn = phase === "running" && secondsLeft <= 10;

  return (
    <section
      id="mock-speech"
      className="scroll-card p-6 md:p-8 mb-8 scroll-mt-20"
      style={{ borderColor: "var(--color-courage-gold-bright)" }}
    >
      <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-2">
        ⏱ MOCK SPEECH · 模拟演讲
      </p>
      <h2 className="text-2xl font-display text-[var(--color-ink)] mb-1">
        Speak Out Loud With a Timer
      </h2>
      <p className="text-sm text-[var(--color-ink-soft)] mb-5">
        选题 → 选时长 → 开始倒计时。**真的张口说**，每讲完一步就 ✓ 打勾。这是最接近上场的训练。
      </p>

      {phase === "idle" && (
        <>
          <div className="space-y-4 mb-5">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-xs text-[var(--color-ink-soft)] uppercase tracking-wider">
                Topic
              </label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
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
                  onClick={() => setStance("pro")}
                  className={`px-3 py-2 rounded text-sm font-display tracking-wider transition-colors ${
                    stance === "pro"
                      ? "bg-[var(--color-link-green)] text-white"
                      : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-link-green)]"
                  }`}
                >
                  PRO ✓
                </button>
                <button
                  onClick={() => setStance("con")}
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

            <div className="flex flex-wrap items-center gap-3">
              <label className="text-xs text-[var(--color-ink-soft)] uppercase tracking-wider">
                Duration
              </label>
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded text-sm font-display tracking-wider transition-colors ${
                    duration === d
                      ? "bg-[var(--color-courage-gold)] text-[var(--color-ink)]"
                      : "border border-[var(--color-courage-gold)]/50 text-[var(--color-ink-soft)] hover:border-[var(--color-courage-gold)]"
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 p-3 bg-[var(--color-parchment-light)] border border-[var(--color-courage-gold)]/30 rounded text-sm">
            <span className="text-[var(--color-ink-soft)]">Your stance: </span>
            <span className="text-[var(--color-ink)] font-medium">{stanceStmt}.</span>
          </div>

          <button onClick={start} className="gold-button text-base">
            ▶ START · 开始 {duration}s
          </button>
        </>
      )}

      {phase === "running" && (
        <>
          <div className="text-center mb-6">
            <p
              className={`text-7xl md:text-8xl font-display tabular-nums ${
                timeWarn ? "text-[var(--color-danger-red)] animate-pulse" : "text-[var(--color-courage-gold)]"
              }`}
            >
              {formattedTime}
            </p>
            <p className="text-sm text-[var(--color-ink-soft)] mt-1">
              {timeWarn ? "快收尾！跳总结！" : "说出来！每讲完一步就 ✓"}
            </p>
          </div>

          <div className="space-y-3 mb-5">
            <CheckRow
              checked={checks.p1}
              onToggle={() => toggleCheck("p1")}
              letter="P"
              text={`I strongly believe that ${stanceStmt}.`}
            />
            <CheckRow
              checked={checks.r}
              onToggle={() => toggleCheck("r")}
              letter="R"
              text="This is because ___."
            />
            <CheckRow
              checked={checks.e}
              onToggle={() => toggleCheck("e")}
              letter="E"
              text="For example, ___."
            />
            <CheckRow
              checked={checks.p2}
              onToggle={() => toggleCheck("p2")}
              letter="P"
              text={`That's why ${stanceStmt}.`}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-[var(--color-ink-soft)]">
              {Object.values(checks).filter(Boolean).length} / 4 steps ✓
            </p>
            <button onClick={stop} className="sheikah-button">
              ⏹ Done · 提前结束
            </button>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="text-center">
          <p className="text-6xl mb-2">{allChecked ? "🏆" : elapsed >= duration / 2 ? "⚡" : "📜"}</p>
          <h3 className="text-2xl font-display text-[var(--color-ink)] mb-2">
            {allChecked
              ? `Full PREP in ${elapsed}s! · 4 步都说完了！`
              : `Speech finished · 说了 ${elapsed}s`}
          </h3>
          <p className="text-[var(--color-ink-soft)] mb-4 max-w-md mx-auto">
            {allChecked
              ? "💪 你刚刚做完了一次完整辩论发言。多练几个题目，自信会指数级上涨。"
              : `${4 - Object.values(checks).filter(Boolean).length} 步还没打勾——再来一次，这次说慢点也没关系。`}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <button onClick={reset} className="gold-button">
              ↻ Another Round · 再来一次
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CheckRow({
  checked,
  onToggle,
  letter,
  text,
}: {
  checked: boolean;
  onToggle: () => void;
  letter: string;
  text: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex gap-3 items-center w-full text-left p-3 rounded border-2 transition-all ${
        checked
          ? "bg-[var(--color-link-green)]/10 border-[var(--color-link-green)]"
          : "border-[var(--color-courage-gold)]/40 hover:border-[var(--color-courage-gold)] bg-white"
      }`}
    >
      <span
        className={`w-7 h-7 rounded border-2 flex items-center justify-center font-bold transition-colors ${
          checked
            ? "bg-[var(--color-link-green)] border-[var(--color-link-green)] text-white"
            : "border-[var(--color-courage-gold)]/50 text-transparent"
        }`}
      >
        ✓
      </span>
      <span className="text-[var(--color-courage-gold)] font-display font-bold w-5 text-lg">
        {letter}
      </span>
      <span
        className={`text-sm flex-1 ${
          checked
            ? "text-[var(--color-link-green)] line-through"
            : "text-[var(--color-ink)]"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
