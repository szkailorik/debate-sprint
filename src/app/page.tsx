import { ModuleTile } from "@/components/ModuleTile";
import { SiteHeader } from "@/components/SiteHeader";
import { ShardCounter } from "@/components/ShardCounter";
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
    subtitle_zh: "勇气之卷",
    href: "/structure",
    icon: <ScrollIcon className="w-12 h-12" />,
  },
  {
    title: "10 Power Phrases",
    subtitle: "Words of Wisdom",
    subtitle_zh: "智慧之言",
    href: "/phrases",
    icon: <StarIcon className="w-12 h-12" />,
  },
  {
    title: "Pattern Recognition",
    subtitle: "See Through the Foe",
    subtitle_zh: "识破对手",
    href: "/patterns",
    icon: <EyeIcon className="w-12 h-12" />,
  },
  {
    title: "Topic Armory",
    subtitle: "Armory of 10 Motions",
    subtitle_zh: "辩题武器库",
    href: "/topics",
    icon: <SwordIcon className="w-12 h-12" />,
  },
  {
    title: "Emergency Kit",
    subtitle: "Survival Elixir",
    subtitle_zh: "应急药水",
    href: "/emergency",
    icon: <PotionIcon className="w-12 h-12" />,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
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
          <ShardCounter collected={0} />
          <p className="text-[var(--color-ink-soft)] text-sm mt-3">
            Collect 5 Triangle Shards · 集齐 5 块三角碎片即出师
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleTile key={m.href} {...m} />
          ))}
        </div>

        <div className="ornament-divider mt-16" />
        <div className="text-center">
          <p className="text-[var(--color-ink-soft)] text-sm">
            ⚔ 不到 7 天就要上场 · Less than 7 days to battle ⚔
          </p>
        </div>
      </main>
    </>
  );
}
