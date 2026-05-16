/**
 * Client-side progress store. Tracks what the kid has done across modules so
 * the home page can light up Triangle Shards and show a "战绩 / progress" card.
 *
 * All reads/writes are no-ops on the server. Components that consume progress
 * should be marked `"use client"` and read inside useEffect to avoid hydration
 * mismatches (server renders zeros, client hydrates with real values).
 */

export type Progress = {
  prepTriesCount: number; // # times "Show me a sample" clicked in PREP
  speechesCompleted: number; // # mock speeches finished
  phraseQuizBest: { score: number; total: number };
  patternsBest: { score: number; total: number; bestStreak: number };
};

const KEY = "debateSprint:progress:v1";

export const DEFAULT_PROGRESS: Progress = {
  prepTriesCount: 0,
  speechesCompleted: 0,
  phraseQuizBest: { score: 0, total: 10 },
  patternsBest: { score: 0, total: 25, bestStreak: 0 },
};

export const PROGRESS_EVENT = "debate-sprint:progress-updated";

export function readProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function write(next: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function recordPrepTry() {
  const cur = readProgress();
  write({ ...cur, prepTriesCount: cur.prepTriesCount + 1 });
}

export function recordSpeech() {
  const cur = readProgress();
  write({ ...cur, speechesCompleted: cur.speechesCompleted + 1 });
}

export function recordPhraseQuiz(score: number, total: number) {
  const cur = readProgress();
  // Only overwrite if this run is at least as good as the best.
  if (score >= cur.phraseQuizBest.score) {
    write({ ...cur, phraseQuizBest: { score, total } });
  }
}

export function recordPatternsGame(score: number, total: number, bestStreak: number) {
  const cur = readProgress();
  const better = score > cur.patternsBest.score;
  if (better) {
    write({ ...cur, patternsBest: { score, total, bestStreak } });
  } else if (bestStreak > cur.patternsBest.bestStreak) {
    // Track best streak even if score wasn't a record.
    write({
      ...cur,
      patternsBest: { ...cur.patternsBest, bestStreak },
    });
  }
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

/**
 * 5 milestones — when achieved, light up the next Triangle Shard on home.
 */
export function shardsEarned(p: Progress): number {
  let n = 0;
  if (p.prepTriesCount >= 1) n++; // tried PREP
  if (p.speechesCompleted >= 1) n++; // gave first speech
  if (p.phraseQuizBest.score >= 6) n++; // 60% on phrase quiz
  if (p.patternsBest.score >= 15) n++; // 60% on patterns
  if (
    p.prepTriesCount >= 1 &&
    p.speechesCompleted >= 3 &&
    p.phraseQuizBest.score >= 8 &&
    p.patternsBest.score >= 20
  )
    n++; // master
  return n;
}
