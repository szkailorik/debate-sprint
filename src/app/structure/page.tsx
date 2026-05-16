import { SiteHeader } from "@/components/SiteHeader";
import { PageHeader } from "@/components/PageHeader";
import { ScrollIcon } from "@/components/Icons";
import { Speaker } from "@/components/Speaker";
import { TryItYourself } from "@/components/TryItYourself";
import { SpeechTimer } from "@/components/SpeechTimer";

const TEMPLATES = [
  {
    name: "Constructive · 立论",
    when: "When you are arguing for or against the motion (your main speech).",
    when_zh: "你正面陈述观点时使用",
    template: [
      { letter: "P", content: "I (strongly) believe that ___." },
      { letter: "R", content: "This is because ___." },
      { letter: "E", content: "For example, ___." },
      { letter: "P", content: "That's why ___." },
    ],
    example: [
      { letter: "P", content: "I strongly believe that kids should NOT have homework." },
      { letter: "R", content: "This is because kids need time to play and rest after school." },
      {
        letter: "E",
        content:
          "For example, my friend Tom plays soccer every evening, and he gets better grades than kids who only do homework.",
      },
      { letter: "P", content: "That's why homework should not take up all of a child's free time." },
    ],
  },
  {
    name: "Rebuttal · 反驳",
    when: "When you are responding to the opponent's point.",
    when_zh: "你要反驳对手时使用",
    template: [
      { letter: "1", content: "My opponent said ___." },
      { letter: "2", content: "But that's not right, because ___." },
      { letter: "3", content: "For example, ___." },
      { letter: "4", content: "So ___." },
    ],
    example: [
      { letter: "1", content: "My opponent said homework teaches responsibility." },
      {
        letter: "2",
        content:
          "But that's not right, because doing chores at home also teaches responsibility, without taking learning time away from school.",
      },
      {
        letter: "3",
        content:
          "For example, kids who help cook dinner learn planning and patience just as well.",
      },
      { letter: "4", content: "So homework is not the only way to teach kids to be responsible." },
    ],
  },
  {
    name: "Summary · 总结",
    when: "Your final speech, before the debate ends.",
    when_zh: "比赛最后总结时使用",
    template: [
      { letter: "1", content: "In summary, we believe ___ for three reasons." },
      { letter: "2", content: "First, ___." },
      { letter: "3", content: "Second, ___." },
      { letter: "4", content: "Finally, ___." },
      { letter: "5", content: "Thank you." },
    ],
    example: [
      {
        letter: "1",
        content:
          "In summary, we strongly believe that kids should not have homework, for three reasons.",
      },
      { letter: "2", content: "First, kids need time to play and rest." },
      { letter: "3", content: "Second, six hours of school is already a lot of learning." },
      { letter: "4", content: "Finally, too much homework causes stress." },
      { letter: "5", content: "Thank you." },
    ],
  },
];

export default function StructurePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
        <PageHeader
          title="PREP Structure"
          subtitle="The Scroll of Courage · 勇气之卷"
          subtitle_zh="任何时候卡壳，都能往里套的安全网"
          icon={<ScrollIcon className="w-16 h-16" />}
        />

        <p className="text-[var(--color-ink-soft)] text-center mb-10 max-w-2xl mx-auto">
          PREP 是 <strong className="text-[var(--color-ink)]">P</strong>oint →{" "}
          <strong className="text-[var(--color-ink)]">R</strong>eason →{" "}
          <strong className="text-[var(--color-ink)]">E</strong>xample →{" "}
          <strong className="text-[var(--color-ink)]">P</strong>oint。 四步说话法。这是你最重要的武器。
        </p>

        {/* The hands-on practice section — kid leaves here saying "I can do PREP". */}
        <TryItYourself />

        {/* The actual rehearsal — speak out loud under timer pressure. */}
        <SpeechTimer />

        <div className="ornament-divider" />
        <h2 className="text-center text-2xl font-display text-[var(--color-ink)] mb-2">
          3 Variants · 三种变体
        </h2>
        <p className="text-center text-sm text-[var(--color-ink-soft)] mb-8">
          立论 / 反驳 / 总结，三种发言都能用同一种思路。
        </p>

        {TEMPLATES.map((tpl) => {
          const exampleText = tpl.example.map((r) => r.content).join(" ");
          return (
            <section key={tpl.name} className="scroll-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-display text-[var(--color-ink)] mb-1">{tpl.name}</h2>
              <p className="text-sm text-[var(--color-ink-soft)] italic mb-5">
                {tpl.when} · {tpl.when_zh}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)] mb-3">
                    TEMPLATE · 模板
                  </h3>
                  {tpl.template.map((row, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                      <span className="text-[var(--color-courage-gold)] font-display font-bold w-6 shrink-0">
                        {row.letter}
                      </span>
                      <span className="text-[var(--color-ink)]">{row.content}</span>
                    </div>
                  ))}
                </div>
                <div className="md:border-l-2 md:pl-6 border-[var(--color-courage-gold)]/40">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs tracking-[0.3em] text-[var(--color-courage-gold)]">
                      EXAMPLE · 例子
                    </h3>
                    <Speaker text={exampleText} size="sm" label="Listen to the example" />
                  </div>
                  {tpl.example.map((row, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                      <span className="text-[var(--color-courage-gold)] font-display font-bold w-6 shrink-0">
                        {row.letter}
                      </span>
                      <span className="text-[var(--color-ink-soft)] text-sm">{row.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
