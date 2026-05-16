import Link from "next/link";
import { ModuleTile } from "@/components/ModuleTile";
import { SiteHeader } from "@/components/SiteHeader";
import {
  ProgressShards,
  ShardLegend,
  ProgressStats,
} from "@/components/ProgressBanner";
import {
  ScrollIcon,
  StarIcon,
  EyeIcon,
  SwordIcon,
  PotionIcon,
} from "@/components/Icons";

const modules = [
  {
    title: "PREP Structure",
    subtitle: "The Scroll of Courage",
    subtitle_zh: "勇气之卷 · 3 分钟会 PREP",
    href: "/structure",
    icon: <ScrollIcon className="w-12 h-12" />,
  },
  {
    title: "10 Power Phrases",
    subtitle: "Words of Wisdom",
    subtitle_zh: "智慧之言 · 听音 + 小测",
    href: "/phrases",
    icon: <StarIcon className="w-12 h-12" />,
  },
  {
    title: "Pattern Recognition",
    subtitle: "See Through the Foe",
    subtitle_zh: "识破对手 · 25 题闯关",
    href: "/patterns",
    icon: <EyeIcon className="w-12 h-12" />,
  },
  {
    title: "Topic Armory",
    subtitle: "Armory of 13 Motions",
    subtitle_zh: "辩题武器库 · 含 AI 议题",
    href: "/topics",
    icon: <SwordIcon className="w-12 h-12" />,
  },
  {
    title: "Emergency Kit",
    subtitle: "Survival Elixir",
    subtitle_zh: "应急药水 · 翻车救场",
    href: "/emergency",
    icon: <PotionIcon className="w-12 h-12" />,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-[var(--color-courage-gold)] text-xs tracking-[0.4em] mb-3">
            ⚜ DEBATE SPRINT ⚜
          </p>
          <h1 className="text-5xl md:text-6xl font-display text-[var(--color-ink)] mb-3">
            Today&apos;s Trial
          </h1>
          <p className="text-[var(--color-ink-soft)] italic mb-1">
            今日试炼 · Speak with structure, fight with wisdom
          </p>
          <div className="ornament-divider" />
          <ProgressShards />
          <ShardLegend />
        </div>

        <ProgressStats />

        {/* FIRST TIME? section — the one obvious next step for a nervous new debater. */}
        <section
          className="scroll-card p-6 md:p-8 mb-10"
          style={{ borderColor: "var(--color-sheikah)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs tracking-[0.3em] text-[var(--color-sheikah)] mb-2">
                ⚔ FIRST TIME? START HERE
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-[var(--color-ink)] mb-2">
                3 分钟先学会 PREP
              </h2>
              <p className="text-[var(--color-ink-soft)] text-sm mb-1">
                PREP 是辩论里最重要的一招。学会它，任何题目你都能说话。
              </p>
              <p className="text-[var(--color-ink-soft)] text-sm">
                💡 先看模板 → 选一个辩题 → 自己填一遍 → 对比专家版。一次就懂。
              </p>
            </div>
            <Link
              href="/structure"
              className="sheikah-button text-base whitespace-nowrap"
            >
              ▶ Begin Trial
            </Link>
          </div>
        </section>

        <p className="text-center text-sm text-[var(--color-ink-soft)] mb-4">
          Or pick any trial · 也可以直接挑一招练
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleTile key={m.href} {...m} />
          ))}
        </div>

        <div className="ornament-divider mt-16" />
        <div className="text-center">
          <p className="text-[var(--color-ink-soft)] text-sm">
            ⚔ 每天 15 分钟，一周后你就敢站到台上 ⚔
          </p>
        </div>
      </main>
    </>
  );
}
