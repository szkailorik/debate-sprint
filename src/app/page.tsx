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
    title: "Battle Plan",
    subtitle: "From Motion to Mic",
    subtitle_zh: "战前 7 步 · 拿到题目照做",
    href: "/battle-plan",
    icon: <span className="text-5xl">📋</span>,
  },
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

        {/* Two primary entry points — addresses the two states a kid arrives in. */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* Brand new — needs to learn the basics. */}
          <section
            className="scroll-card p-6"
            style={{ borderColor: "var(--color-sheikah)" }}
          >
            <p className="text-xs tracking-[0.3em] text-[var(--color-sheikah)] mb-2">
              ⚔ NEW TO DEBATE?
            </p>
            <h2 className="text-xl md:text-2xl font-display text-[var(--color-ink)] mb-2">
              先学会 PREP
            </h2>
            <p className="text-[var(--color-ink-soft)] text-sm mb-4">
              PREP 是辩论的骨架。3 分钟学会，任何题目你都能开口。
            </p>
            <Link
              href="/structure"
              className="sheikah-button text-sm whitespace-nowrap"
            >
              ▶ Learn PREP
            </Link>
          </section>

          {/* Already has a motion — follow the prep workflow. */}
          <section
            className="scroll-card p-6"
            style={{ borderColor: "var(--color-courage-gold-bright)" }}
          >
            <p className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-2">
              📋 GOT YOUR MOTION?
            </p>
            <h2 className="text-xl md:text-2xl font-display text-[var(--color-ink)] mb-2">
              战前 7 步备战
            </h2>
            <p className="text-[var(--color-ink-soft)] text-sm mb-4">
              抽到辩题以后照清单做：理解 → 论点 → 例子 → 写稿 → 反击 → 练习 → 临场。
            </p>
            <Link
              href="/battle-plan"
              className="gold-button text-sm whitespace-nowrap"
            >
              ▶ Open Plan
            </Link>
          </section>
        </div>

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
