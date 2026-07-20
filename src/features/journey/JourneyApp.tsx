import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BLOCKS,
  FEEL_OPTIONS,
  PATHWAYS,
  ROUTING_QUESTIONS,
  WORKS_OPTIONS,
  detectPathway,
  type BlockKey,
  type Pathway,
  type PathwaySlug,
} from "./data";

type Step =
  | "landing"
  | "feel"
  | "works"
  | "routing"
  | "reveal"
  | "month"
  | "essential-vs-core"
  | "customize"
  | "first-week"
  | "home";

const STEP_ORDER: Step[] = [
  "landing",
  "feel",
  "works",
  "routing",
  "reveal",
  "month",
  "essential-vs-core",
  "customize",
  "first-week",
  "home",
];

const FRAMEWORK = [
  { verb: "Keep", tail: "what works." },
  { verb: "Add", tail: "what's missing." },
  { verb: "Try", tail: "what fits." },
  { verb: "Drop", tail: "what doesn't." },
  { verb: "Unlock", tail: "more." },
];

// ---------- Reusable editorial primitives ----------

const Shell = ({ children, tone = "cream" }: { children: React.ReactNode; tone?: "cream" | "hero" }) => (
  <div
    className={
      tone === "hero"
        ? "min-h-screen w-full bg-hero"
        : "min-h-screen w-full bg-background"
    }
  >
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-5 pb-24 pt-8">
      {children}
    </div>
  </div>
);

const TopBar = ({ step }: { step: Step }) => {
  const idx = STEP_ORDER.indexOf(step);
  const pct = Math.max(0, Math.min(1, idx / (STEP_ORDER.length - 1)));
  return (
    <div className="mb-6 flex items-center gap-3">
      <Link to="/" className="font-display text-xl tracking-tight text-primary">
        Stretch
      </Link>
      <div className="ml-auto h-[2px] w-24 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
    {children}
  </div>
);

const Display = ({ children, size = "lg" }: { children: React.ReactNode; size?: "md" | "lg" | "xl" }) => (
  <h1
    className={
      "font-display font-medium leading-[1.02] text-foreground " +
      (size === "xl" ? "text-[44px]" : size === "lg" ? "text-[36px]" : "text-[28px]")
    }
  >
    {children}
  </h1>
);

const Body = ({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) => (
  <p className={"text-[15px] leading-[1.55] " + (muted ? "text-muted-foreground" : "text-foreground/80")}>
    {children}
  </p>
);

const PrimaryButton = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="w-full rounded-full bg-primary px-6 py-4 text-[15px] font-medium text-primary-foreground shadow-card transition-all duration-smooth ease-stretch hover:translate-y-[-1px] disabled:opacity-40 disabled:hover:translate-y-0"
  >
    {children}
  </button>
);

const GhostButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full rounded-full border border-border bg-transparent px-6 py-4 text-[15px] font-medium text-foreground transition-all duration-smooth ease-stretch hover:bg-secondary"
  >
    {children}
  </button>
);

const Chip = ({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={
      "rounded-full border px-4 py-2 text-[13px] transition-all duration-smooth " +
      (selected
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border bg-card text-foreground/80 hover:border-accent/40")
    }
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={"rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-card " + className}>
    {children}
  </div>
);

// ---------- Screens ----------

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <Shell tone="hero">
      <TopBar step="landing" />
      <div className="flex-1 pt-6">
        <Eyebrow>A quieter kind of health membership</Eyebrow>
        <Display size="xl">
          Your health month, built around <em className="not-italic text-accent">you</em> — and smarter every month.
        </Display>
        <div className="mt-6 space-y-1">
          <Body>Care, movement, nutrition and passes — as one plan.</Body>
          <Body muted>Peri, fertility, endo, metabolic, longevity. Five live pathways.</Body>
        </div>
        <div className="mt-10 rounded-[var(--radius)] border border-border/50 bg-card/60 p-5 backdrop-blur-sm">
          <Eyebrow>How Stretch works</Eyebrow>
          <div className="grid grid-cols-1 gap-2">
            {FRAMEWORK.map((f) => (
              <div key={f.verb} className="flex items-baseline gap-3">
                <span className="font-display text-[22px] leading-none text-accent">{f.verb}</span>
                <span className="text-[15px] text-foreground/80">{f.tail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-3">
        <PrimaryButton onClick={onStart}>Design my first month</PrimaryButton>
        <p className="text-center text-[12px] text-muted-foreground">
          Two minutes. No account yet.
        </p>
      </div>
    </Shell>
  );
}

function FeelScreen({
  value,
  onChange,
  onNext,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
}) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <Shell>
      <TopBar step="feel" />
      <Eyebrow>Step 1 of 4</Eyebrow>
      <Display>How do you want to feel this month?</Display>
      <Body muted>Pick two or three. This shapes the whole plan.</Body>
      <div className="mt-8 flex flex-wrap gap-2">
        {FEEL_OPTIONS.map((f) => (
          <Chip key={f.id} selected={value.includes(f.id)} onClick={() => toggle(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {value.slice(0, 3).map((id) => {
          const f = FEEL_OPTIONS.find((x) => x.id === id)!;
          return (
            <Card key={id} className="!p-4">
              <div className="font-display text-[18px] text-foreground">{f.label}</div>
              <div className="text-[13px] text-muted-foreground">{f.note}</div>
            </Card>
          );
        })}
      </div>
      <div className="mt-auto pt-10">
        <PrimaryButton onClick={onNext} disabled={value.length === 0}>
          Continue
        </PrimaryButton>
      </div>
    </Shell>
  );
}

function WorksScreen({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <Shell>
      <TopBar step="works" />
      <Eyebrow>Step 2 of 4</Eyebrow>
      <Display>What already works for you?</Display>
      <Body muted>We keep what works. We don't replace it.</Body>
      <div className="mt-8 flex flex-wrap gap-2">
        {WORKS_OPTIONS.map((f) => (
          <Chip key={f.id} selected={value.includes(f.id)} onClick={() => toggle(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>
      <div className="mt-auto space-y-3 pt-10">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
        <GhostButton onClick={onBack}>Back</GhostButton>
      </div>
    </Shell>
  );
}

function RoutingScreen({
  answers,
  onAnswer,
  onNext,
  onBack,
}: {
  answers: Record<string, string>;
  onAnswer: (qid: string, cid: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const q = ROUTING_QUESTIONS[idx];
  const isLast = idx === ROUTING_QUESTIONS.length - 1;
  return (
    <Shell>
      <TopBar step="routing" />
      <Eyebrow>
        Step 3 of 4 · Question {idx + 1} of {ROUTING_QUESTIONS.length}
      </Eyebrow>
      <Display size="md">{q.q}</Display>
      <div className="mt-8 space-y-3">
        {q.choices.map((c) => {
          const selected = answers[q.id] === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onAnswer(q.id, c.id)}
              className={
                "block w-full rounded-[var(--radius)] border p-4 text-left transition-all duration-smooth " +
                (selected
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-accent/40")
              }
            >
              <span className="text-[15px]">{c.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-auto space-y-3 pt-10">
        <PrimaryButton
          disabled={!answers[q.id]}
          onClick={() => {
            if (isLast) onNext();
            else setIdx(idx + 1);
          }}
        >
          {isLast ? "Reveal my pathway" : "Next"}
        </PrimaryButton>
        <GhostButton
          onClick={() => {
            if (idx === 0) onBack();
            else setIdx(idx - 1);
          }}
        >
          Back
        </GhostButton>
      </div>
    </Shell>
  );
}

function RevealScreen({ pathway, onNext }: { pathway: Pathway; onNext: () => void }) {
  return (
    <Shell tone="hero">
      <TopBar step="reveal" />
      <div className="flex-1 pt-6">
        <Eyebrow>Your pathway</Eyebrow>
        <Display size="xl">{pathway.headline}</Display>
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-[13px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {pathway.name}
          </div>
        </div>
        <div className="mt-8">
          <Body>{pathway.promise}</Body>
          <p className="mt-4 font-display italic text-foreground/70">{pathway.microCopy}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {pathway.feelTags.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card/70 px-3 py-1 text-[12px] text-foreground/80">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <PrimaryButton onClick={onNext}>See my first month</PrimaryButton>
      </div>
    </Shell>
  );
}

function MonthScreen({
  pathway,
  onOpen,
  onNext,
}: {
  pathway: Pathway;
  onOpen: (k: BlockKey) => void;
  onNext: () => void;
}) {
  return (
    <Shell>
      <TopBar step="month" />
      <Eyebrow>{pathway.name} · Month one</Eyebrow>
      <Display>Your month, in four blocks.</Display>
      <Body muted>Tap any block to read what Stretch recommended and why.</Body>
      <div className="mt-8 space-y-4">
        {BLOCKS.map((b) => {
          const block = pathway.blocks[b.key];
          const essentials = block.items.filter((i) => i.tier === "essential").length;
          const core = block.items.filter((i) => i.tier === "core").length;
          return (
            <button
              key={b.key}
              onClick={() => onOpen(b.key)}
              className="block w-full rounded-[var(--radius)] border border-border/60 bg-card p-5 text-left shadow-card transition-all duration-smooth hover:translate-y-[-2px]"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-[22px] text-foreground">{b.label}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Open</div>
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">{b.tagline}</div>
              <div className="mt-3 text-[14px] text-foreground/80">{block.summary}</div>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground">
                  {essentials} essential
                </span>
                <span className="rounded-full bg-sand/70 px-2.5 py-1 text-[11px] text-sand-foreground">
                  {core} core
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </Shell>
  );
}

function BlockDrawer({
  pathway,
  blockKey,
  onClose,
}: {
  pathway: Pathway;
  blockKey: BlockKey;
  onClose: () => void;
}) {
  const meta = BLOCKS.find((b) => b.key === blockKey)!;
  const block = pathway.blocks[blockKey];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-[420px] overflow-y-auto rounded-[var(--radius)] bg-card p-6 shadow-float">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{pathway.name}</div>
        <div className="mt-1 font-display text-[28px] leading-tight text-foreground">{meta.label}</div>
        <div className="mt-1 text-[13px] text-muted-foreground">{meta.tagline}</div>
        <p className="mt-4 text-[14px] text-foreground/80">{block.summary}</p>
        <div className="mt-5 space-y-3">
          {block.items.map((it) => (
            <div key={it.name} className="rounded-lg border border-border/60 bg-background/60 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-display text-[17px] text-foreground">{it.name}</div>
                <span
                  className={
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider " +
                    (it.tier === "essential"
                      ? "bg-primary text-primary-foreground"
                      : it.tier === "core"
                      ? "bg-sand text-sand-foreground"
                      : "bg-secondary text-secondary-foreground")
                  }
                >
                  {it.tier}
                </span>
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">{it.what}</div>
              {it.eligibleToSwap && (
                <div className="mt-2 text-[11px] text-accent">Eligible to swap</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function EssentialVsCoreScreen({ pathway, onNext, onBack }: { pathway: Pathway; onNext: () => void; onBack: () => void }) {
  const allItems = BLOCKS.flatMap((b) =>
    pathway.blocks[b.key].items.map((it) => ({ ...it, block: b.label })),
  );
  const essentials = allItems.filter((i) => i.tier === "essential");
  const core = allItems.filter((i) => i.tier === "core");
  return (
    <Shell>
      <TopBar step="essential-vs-core" />
      <Eyebrow>Essential vs Core</Eyebrow>
      <Display size="md">Two kinds of pieces. Both matter — for different reasons.</Display>
      <div className="mt-6 space-y-4">
        <Card>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-foreground">
              Essential
            </span>
            <span className="text-[12px] text-muted-foreground">Held for you — not swapped.</span>
          </div>
          <p className="mt-2 text-[14px] text-foreground/80">
            The clinician read, the labs, and the one or two supports that make the pathway work. If we remove these, we can't stand behind the plan.
          </p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-foreground/80">
            {essentials.map((i) => (
              <li key={i.name} className="flex justify-between gap-3">
                <span>{i.name}</span>
                <span className="shrink-0 text-muted-foreground">{i.block}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] uppercase tracking-wider text-sand-foreground">
              Core
            </span>
            <span className="text-[12px] text-muted-foreground">Swap one that fits your life.</span>
          </div>
          <p className="mt-2 text-[14px] text-foreground/80">
            The pieces around it — where you train, which pantry drop, which pass. You'll pick one to change on the next screen.
          </p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-foreground/80">
            {core.map((i) => (
              <li key={i.name} className="flex justify-between gap-3">
                <span>{i.name}</span>
                <span className="shrink-0 text-muted-foreground">{i.block}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="mt-auto space-y-3 pt-10">
        <PrimaryButton onClick={onNext}>Customize one thing</PrimaryButton>
        <GhostButton onClick={onBack}>Back to month</GhostButton>
      </div>
    </Shell>
  );
}

function CustomizeScreen({
  pathway,
  choice,
  swapTo,
  onChoose,
  onSwap,
  onNext,
  onBack,
}: {
  pathway: Pathway;
  choice: string | null;
  swapTo: string | null;
  onChoose: (name: string) => void;
  onSwap: (alt: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const eligible = BLOCKS.flatMap((b) =>
    pathway.blocks[b.key].items
      .filter((it) => it.eligibleToSwap)
      .map((it) => ({ ...it, block: b.label })),
  );
  const alternatives = ["A gentler cadence", "A different studio partner", "Home-delivered version", "Coach-led alternative"];
  return (
    <Shell>
      <TopBar step="customize" />
      <Eyebrow>Customize one eligible item</Eyebrow>
      <Display size="md">Pick one Core piece to shape.</Display>
      <Body muted>Everything else holds. You can revisit next month.</Body>
      <div className="mt-6 space-y-3">
        {eligible.map((it) => {
          const selected = choice === it.name;
          return (
            <button
              key={it.name}
              onClick={() => onChoose(it.name)}
              className={
                "block w-full rounded-[var(--radius)] border p-4 text-left transition-all duration-smooth " +
                (selected ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/40")
              }
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-[17px] text-foreground">{it.name}</div>
                <div className="text-[11px] text-muted-foreground">{it.block}</div>
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">{it.what}</div>
            </button>
          );
        })}
      </div>
      {choice && (
        <div className="mt-6">
          <Eyebrow>Swap it for</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {alternatives.map((a) => (
              <Chip key={a} selected={swapTo === a} onClick={() => onSwap(a)}>
                {a}
              </Chip>
            ))}
          </div>
          {swapTo && (
            <div className="mt-4 rounded-lg border border-accent/40 bg-accent/5 p-3 text-[13px] text-foreground/80">
              We'll swap <b>{choice}</b> for <b>{swapTo}</b>. Coach will confirm before your first week.
            </div>
          )}
        </div>
      )}
      <div className="mt-auto space-y-3 pt-10">
        <PrimaryButton onClick={onNext}>Lock the plan</PrimaryButton>
        <GhostButton onClick={onBack}>Back</GhostButton>
      </div>
    </Shell>
  );
}

function FirstWeekScreen({ pathway, onNext, onBack }: { pathway: Pathway; onNext: () => void; onBack: () => void }) {
  return (
    <Shell>
      <TopBar step="first-week" />
      <Eyebrow>First week</Eyebrow>
      <Display>Here's how week one lands.</Display>
      <Body muted>Five moments. Nothing else to organize.</Body>
      <div className="mt-8 space-y-3">
        {pathway.firstWeek.map((d, i) => (
          <Card key={i} className="!p-4">
            <div className="flex items-baseline gap-3">
              <div className="w-14 shrink-0 text-[11px] uppercase tracking-widest text-accent">{d.day}</div>
              <div className="flex-1">
                <div className="font-display text-[18px] text-foreground">{d.title}</div>
                <div className="text-[13px] text-muted-foreground">{d.detail}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-auto space-y-3 pt-10">
        <PrimaryButton onClick={onNext}>Enter Member Home</PrimaryButton>
        <GhostButton onClick={onBack}>Back</GhostButton>
      </div>
    </Shell>
  );
}

function MemberHomeScreen({ pathway, onRestart }: { pathway: Pathway; onRestart: () => void }) {
  return (
    <Shell>
      <TopBar step="home" />
      <Eyebrow>Member home</Eyebrow>
      <Display size="md">Good morning. This is your month.</Display>
      <Body muted>{pathway.name}</Body>

      <div className="mt-6 rounded-[var(--radius)] border border-border/60 bg-hero p-5 shadow-card">
        <div className="text-[11px] uppercase tracking-widest text-primary/70">Today</div>
        <div className="mt-1 font-display text-[22px] text-foreground">{pathway.firstWeek[0].title}</div>
        <div className="mt-1 text-[13px] text-foreground/70">{pathway.firstWeek[0].detail}</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {BLOCKS.map((b) => (
          <div key={b.key} className="rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-card">
            <div className="font-display text-[17px] text-foreground">{b.label}</div>
            <div className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
              {pathway.blocks[b.key].summary}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <Eyebrow>This month's framework</Eyebrow>
          <div className="space-y-1.5">
            {FRAMEWORK.map((f) => (
              <div key={f.verb} className="flex items-baseline gap-2">
                <span className="font-display text-[16px] text-accent">{f.verb}</span>
                <span className="text-[13px] text-foreground/80">{f.tail}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display text-[18px] text-foreground">Ask your coach</div>
              <div className="text-[12px] text-muted-foreground">Reads your plan before replying.</div>
            </div>
            <button className="rounded-full bg-accent px-4 py-2 text-[13px] text-accent-foreground">
              Message
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <GhostButton onClick={onRestart}>Start a new demo</GhostButton>
      </div>
    </Shell>
  );
}

// ---------- Container ----------

export default function JourneyApp() {
  const [step, setStep] = useState<Step>("landing");
  const [feel, setFeel] = useState<string[]>([]);
  const [works, setWorks] = useState<string[]>([]);
  const [routing, setRouting] = useState<Record<string, string>>({});
  const [openBlock, setOpenBlock] = useState<BlockKey | null>(null);
  const [customizeChoice, setCustomizeChoice] = useState<string | null>(null);
  const [customizeSwap, setCustomizeSwap] = useState<string | null>(null);
  const [override, setOverride] = useState<PathwaySlug | null>(null);

  const pathway = useMemo(() => {
    if (override) return PATHWAYS.find((p) => p.slug === override)!;
    const tags: string[] = [];
    for (const [qid, cid] of Object.entries(routing)) {
      const q = ROUTING_QUESTIONS.find((x) => x.id === qid);
      const c = q?.choices.find((x) => x.id === cid);
      if (c) tags.push(...c.tags);
    }
    tags.push(...feel);
    const slug = detectPathway(tags);
    return PATHWAYS.find((p) => p.slug === slug)!;
  }, [routing, feel, override]);

  const go = (s: Step) => {
    setStep(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <>
      {step === "landing" && <LandingScreen onStart={() => go("feel")} />}
      {step === "feel" && (
        <FeelScreen value={feel} onChange={setFeel} onNext={() => go("works")} />
      )}
      {step === "works" && (
        <WorksScreen value={works} onChange={setWorks} onNext={() => go("routing")} onBack={() => go("feel")} />
      )}
      {step === "routing" && (
        <RoutingScreen
          answers={routing}
          onAnswer={(qid, cid) => setRouting({ ...routing, [qid]: cid })}
          onNext={() => go("reveal")}
          onBack={() => go("works")}
        />
      )}
      {step === "reveal" && <RevealScreen pathway={pathway} onNext={() => go("month")} />}
      {step === "month" && (
        <MonthScreen pathway={pathway} onOpen={(k) => setOpenBlock(k)} onNext={() => go("essential-vs-core")} />
      )}
      {step === "essential-vs-core" && (
        <EssentialVsCoreScreen pathway={pathway} onNext={() => go("customize")} onBack={() => go("month")} />
      )}
      {step === "customize" && (
        <CustomizeScreen
          pathway={pathway}
          choice={customizeChoice}
          swapTo={customizeSwap}
          onChoose={setCustomizeChoice}
          onSwap={setCustomizeSwap}
          onNext={() => go("first-week")}
          onBack={() => go("essential-vs-core")}
        />
      )}
      {step === "first-week" && (
        <FirstWeekScreen pathway={pathway} onNext={() => go("home")} onBack={() => go("customize")} />
      )}
      {step === "home" && (
        <MemberHomeScreen
          pathway={pathway}
          onRestart={() => {
            setFeel([]);
            setWorks([]);
            setRouting({});
            setCustomizeChoice(null);
            setCustomizeSwap(null);
            setOverride(null);
            go("landing");
          }}
        />
      )}

      {openBlock && (
        <BlockDrawer pathway={pathway} blockKey={openBlock} onClose={() => setOpenBlock(null)} />
      )}

      {/* Discreet pathway switcher, only visible from reveal onward */}
      {["reveal", "month", "essential-vs-core", "customize", "first-week", "home"].includes(step) && (
        <div className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/90 px-2 py-1 shadow-card backdrop-blur">
            {PATHWAYS.map((p) => (
              <button
                key={p.slug}
                onClick={() => setOverride(p.slug)}
                className={
                  "rounded-full px-2.5 py-1 text-[11px] transition-colors " +
                  (pathway.slug === p.slug ? "bg-accent text-accent-foreground" : "text-foreground/60 hover:text-foreground")
                }
                title={p.name}
              >
                {p.short}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
