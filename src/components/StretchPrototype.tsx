import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ClipboardList,
  Home,
  Leaf,
  Lock,
  MessageCircle,
  Moon,
  Package,
  Sparkles,
  Star,
  Ticket,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/stretch-wellness-hero.jpg";
import { cn } from "@/lib/utils";

type Step =
  | "landing"
  | "goal"
  | "quiz"
  | "built"
  | "unlocks"
  | "confirm"
  | "builder"
  | "week"
  | "home"
  | "wallet"
  | "future"
  | "pathways"
  | "journey"
  | "care";

type PathwayKey = "peri" | "endo" | "metabo" | "longevity";
type JourneyTab = "Experience" | "Coach" | "Kit" | "Clinician Loop";

type Pathway = {
  title: string;
  bestFor: string;
  firstUnlock: string;
  futureUnlock: string;
  reason: string;
  monthlyPromise: string;
  foundation: string[];
  deepen: string[];
  sustain: string[];
  roadmap: { now: string; next: string; later: string };
  tabs: Record<JourneyTab, string[]>;
  vitality?: string;
  wow: string;
  why: string;
  guidedDefaults: string[];
  strongestPack: string;
  futureDevice: string;
  futureRider: string;
  adjacent: PathwayKey;
};

const pathways: Record<PathwayKey, Pathway> = {
  peri: {
    title: "Peri Sleep + Energy",
    bestFor: "Rest, temperature shifts, steady days",
    firstUnlock: "Sleep reset with your coach",
    futureUnlock: "Focus and strength support",
    reason: "Your answers point to rest, temperature, energy, or focus getting in the way of daily life.",
    monthlyPromise: "Better sleep, steadier energy, calmer mood, clearer next steps.",
    foundation: ["Women’s health routing", "Choose one calming experience", "Two coach touches", "Mood Check + Micro-CBT", "Peri Reset Pod"],
    deepen: ["Adjust your symptom routine", "Review sleep, mood, energy", "Add one targeted support if useful"],
    sustain: ["Unlock next-step prevention", "Consider a future device", "Open adjacent glow or focus support"],
    roadmap: { now: "Set up your night routine and first coach touch", next: "Tune adherence and choose one monthly micro-pass", later: "Open Smart Ring or a targeted rider if useful" },
    tabs: {
      Experience: ["Cooling / sleep reset workshop", "Mobility or Pilates / Barre", "Acupuncture or recovery coaching", "30-minute LED for face, body, or hair-scalp"],
      Coach: ["Touch 1: symptom routine setup", "Touch 2: adherence + adjustment", "Mood Check + Micro-CBT", "Pod choice: Sleep Reset, Mood/Fog, Metabolic Drift, Skin/Hair, or Bone/Joint"],
      Kit: ["Magnesium", "Omega-3", "D3+K2", "Sleep kit", "Collagen", "Electrolyte", "HA-ceramide", "Pantry support"],
      "Clinician Loop": ["Women’s health / OB-GYN / IM / Endo routing", "Recovery, body-composition, or visible-aging review", "CBC, ferritin, TSH / FT4, HbA1c, Vitamin D, lipids"],
    },
    vitality: "HA-ceramide, collagen, and skin-hair support preview.",
    wow: "Red-Light + Ritual or Sleep + Skin Reset",
    why: "We’re not just treating sleep. We’re helping you stabilize the loop between night waking, energy, mood, and midlife symptoms.",
    guidedDefaults: ["Sleep reset workshop", "Peri Reset Pod", "Sleep kit", "Restorative micro-pass"],
    strongestPack: "Sleep + Skin Reset Pack",
    futureDevice: "Smart Ring",
    futureRider: "PeriShield Rx",
    adjacent: "longevity",
  },
  endo: {
    title: "Endo Flare + Function",
    bestFor: "Pelvic pain, flare days, bloating",
    firstUnlock: "Flare-day comfort plan",
    futureUnlock: "Workday function support",
    reason: "Your answers suggest flare days or discomfort are limiting what you can do.",
    monthlyPromise: "Map the flare. Stabilize the body. Build documentation. Escalate only when needed.",
    foundation: ["Endo-aware gyne routing", "Choose one pain-aware experience", "Two coach touches", "Pain psychology micro-support", "Endo Toolkit Pod"],
    deepen: ["Refine pacing and GI routine", "Export clean symptom notes", "Add function-day support"],
    sustain: ["Unlock relief burst support", "Preview surgery or IVF bridge only if needed", "Keep documentation ready"],
    roadmap: { now: "Create your flare map and comfort ritual", next: "Adjust pacing, GI support, and routine", later: "Open confirmation or coverage support only if needed" },
    tabs: {
      Experience: ["Pelvic-floor PT", "Acupuncture", "Pain-aware Pilates / mobility", "Recovery movement", "Pelvic relaxation / breathwork or restorative yoga"],
      Coach: ["Touch 1: flare map + pacing plan", "Touch 2: function / GI / routine adjustment", "Pain psychology micro-support + Mood Check", "Pod choice: GI/Function Support, Pain Pacing, or Fatigue Support"],
      Kit: ["Omega-3", "Magnesium", "Broths", "Heat patch support", "Ginger / peppermint support", "GI-safe swap layer", "Optional anti-inflammatory box"],
      "Clinician Loop": ["OB-GYN / endo-aware gyne routing", "Recovery review, clinic LED relax, or symptom documentation review", "CBC, ferritin, Vitamin D, B12 conditional, TVUS booking support"],
    },
    vitality: "Confidence and comfort support preview.",
    wow: "Flare Relief Ritual or Recovery & Comfort Mini",
    why: "We’re not just tracking pain. We’re reducing flare chaos and helping you function better with clearer documentation and support.",
    guidedDefaults: ["Flare map", "Endo Toolkit Pod", "Comfort kit", "Restorative yoga pass"],
    strongestPack: "Endo Relief Burst Pack",
    futureDevice: "TVUS confirmation flow",
    futureRider: "EndoShield Rider",
    adjacent: "peri",
  },
  metabo: {
    title: "MetaboGlow Camera-Ready + Drift Lite",
    bestFor: "Glow, skin, hair, cravings, drift",
    firstUnlock: "Glow and rhythm starter",
    futureUnlock: "Drift Lite support",
    reason: "Your answers point to visible results, cravings, skin, hair, or body changes you want to steady.",
    monthlyPromise: "Look better, feel more regulated, and know what to do next.",
    foundation: ["Derm Glow / Camera-Ready focus", "Metabolic Drift Lite support", "Two coach touches", "Skin Sunday Pod", "One glow pass"],
    deepen: ["Tune hydration and meal timing", "Add event-week support", "Accrue a procedure token"],
    sustain: ["Unlock actives or Camera-Ready Sprint", "Open LED Mask preview", "Add coverage support when relevant"],
    roadmap: { now: "Set glow routine, hydration, and meal timing", next: "Adjust for an event week or swap one layer", later: "Open procedure tokens or LED Mask support" },
    tabs: {
      Experience: ["LED booth", "Aftercare workshop", "Pilates / Barre intro", "Skin routine demo", "RDN consult if metabolic signals show up"],
      Coach: ["Touch 1: glow routine + hydration + meal timing", "Touch 2: adherence + event-week or swap adjustment", "Body image / stress / adherence support when relevant", "Pods: Skin Sunday and Insight Night / Metabolic Drift Lite"],
      Kit: ["SPF", "HA", "Vitamin C", "Niacinamide / azelaic / ceramide", "Underarm AHA", "Fiber or protein mini"],
      "Clinician Loop": ["Derm-led specialist touch", "Selective IM / metabolic review if signals show up", "Quick derm review or quarterly token accrual", "Selective mini-check only if needed"],
    },
    vitality: "Central to this pathway: glow shelf, skin routine, recovery, and visible progress.",
    wow: "Camera-Ready Unlock / Glow Week",
    why: "We’re not just recommending skincare. We’re combining skin, coaching, metabolism, and recovery into one monthly plan.",
    guidedDefaults: ["LED booth", "Skin Sunday Pod", "Glow shelf", "Skin routine demo"],
    strongestPack: "Camera-Ready Sprint",
    futureDevice: "LED Mask",
    futureRider: "DermaShield+",
    adjacent: "longevity",
  },
  longevity: {
    title: "Longevity Brain + Focus",
    bestFor: "Focus, travel load, high-output weeks",
    firstUnlock: "Focus week setup",
    futureUnlock: "Travel resilience support",
    reason: "Your answers suggest focus, energy, or performance is the thing you want back first.",
    monthlyPromise: "Sharper focus, steadier energy, better workday recovery.",
    foundation: ["Brain, Focus & Cognitive Resilience", "Executive Performance & Travel support", "Two coach touches", "Brain & Focus Pod", "One recovery pass"],
    deepen: ["Tune caffeine and meal timing", "Review fatigue patterns", "Prepare for travel or high-output weeks"],
    sustain: ["Unlock Brain Sprint", "Open Smart Ring preview", "Add lab or sleep support if useful"],
    roadmap: { now: "Set workday, caffeine, and meal timing", next: "Review fatigue and recovery patterns", later: "Open Smart Ring, Brain Sprint, or lab support" },
    tabs: {
      Experience: ["Strength + VO2 prep", "RDN consult", "Breathwork reset", "Mobility", "Recovery / red-light where available"],
      Coach: ["Touch 1: focus / workday / caffeine / meal timing setup", "Touch 2: adherence + fatigue pattern review", "Mood Check + Micro-CBT if stress or sleep-linked", "Pods: Brain & Focus and Executive Performance & Travel"],
      Kit: ["Foundational supplement pick", "Pantry / snack tool", "Powder pick", "Nootropic pick", "Longevity pulse stack", "Visible-vitality pick", "Sticky perk"],
      "Clinician Loop": ["Longevity-oriented physician / IM review", "Recovery or body-composition review", "Clinic LED / red-light route", "Rotating bio-panel based on the month"],
    },
    vitality: "Visible vitality support through recovery and optional LED.",
    wow: "Focus Sprint / Executive Recovery / Biopeak Moment",
    why: "We’re not just giving you supplements. We’re building focus, recovery, biomarker awareness, and healthspan habits into one monthly rhythm.",
    guidedDefaults: ["Breathwork reset", "Brain & Focus Pod", "Focus kit", "Movement-compliance session"],
    strongestPack: "Brain Sprint Pack",
    futureDevice: "Smart Ring",
    futureRider: "Longevity Lab Rider",
    adjacent: "metabo",
  },
};

const pathwayKeys: PathwayKey[] = ["peri", "endo", "metabo", "longevity"];
const previewCards = pathwayKeys.map((key) => pathways[key]);
const lockedCards = ["Fertility / IVF", "Surgery Track", "Full GLP Route", "Advanced Riders"];
const goals = ["Sleep through the night", "Reduce hot flashes / night sweats", "Clear brain fog", "Steady my energy", "Reduce pelvic pain / flare days", "Improve glow / skin / hair", "Manage cravings / metabolic drift", "Feel stronger and more in control", "I am not sure"];
const quiz = [
  { question: "What feels most disruptive right now?", options: ["poor sleep", "hot flashes / night sweats", "brain fog / low focus", "low energy", "pelvic pain / flare days", "bloating / GI discomfort", "skin / hair / acne / glow concerns", "cravings / weight drift", "stress / overwhelm"] },
  { question: "When do you notice it most?", options: ["morning", "afternoon crash", "bedtime", "during work", "during workouts", "around my cycle", "randomly", "during flare days"] },
  { question: "What kind of support do you want first?", options: ["symptom relief", "labs and answers", "coaching and accountability", "visible results", "movement / recovery", "prescription / rider support later", "a 90-day plan"] },
  { question: "How much help do you want choosing?", options: ["build it for me", "let me swap one thing", "I want to compare options"] },
  { question: "Are you open to in-person experiences?", options: ["yes, if nearby", "online only", "maybe later"] },
  { question: "Are you open to future devices or add-ons?", options: ["not now", "maybe later", "yes"] },
];
const kits = ["Sleep + cooling kit", "Comfort + recovery kit", "Glow + rhythm kit"];
const pods = ["Calm nights pod", "Flare-days pod", "High-output pod"];
const passes = ["Restorative studio pass", "Recovery session pass", "Glow appointment pass"];

const detectPathway = (answers: string[], goal: string): PathwayKey => {
  const text = `${goal} ${answers.join(" ")}`.toLowerCase();
  if (/pelvic|flare|bloating|gi|cycle|painful/.test(text)) return "endo";
  if (/glow|skin|hair|acne|cravings|weight|metabolic|drift|visible/.test(text)) return "metabo";
  if (/focus|work|travel|performance|brain fog/.test(text)) return "longevity";
  return "peri";
};

const SoftCard = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <button onClick={onClick} className={cn("w-full rounded-3xl border border-border bg-card p-5 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}>
    {children}
  </button>
);

const SectionTitle = ({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) => (
  <div className="space-y-2">
    {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>}
    <h1 className="font-display text-4xl leading-tight text-foreground">{title}</h1>
    {copy && <p className="text-base leading-7 text-muted-foreground">{copy}</p>}
  </div>
);

export default function StretchPrototype() {
  const [step, setStep] = useState<Step>("landing");
  const [goal, setGoal] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedKit, setSelectedKit] = useState(kits[0]);
  const [selectedPod, setSelectedPod] = useState(pods[0]);
  const [selectedPass, setSelectedPass] = useState(passes[0]);
  const [selectedJourney, setSelectedJourney] = useState<PathwayKey>("peri");
  const [journeyTab, setJourneyTab] = useState<JourneyTab>("Experience");

  const pathwayKey = useMemo(() => detectPathway(answers, goal), [answers, goal]);
  const pathway = pathways[pathwayKey];
  const openJourney = (key: PathwayKey) => {
    setSelectedJourney(key);
    setJourneyTab("Experience");
    setStep("journey");
  };
  const chooseAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    if (quizIndex === quiz.length - 1) {
      setSelectedJourney(detectPathway(next, goal));
      setStep("built");
      setQuizIndex(0);
    } else setQuizIndex((current) => current + 1);
  };
  const resetQuiz = () => { setAnswers([]); setQuizIndex(0); setStep("goal"); };

  return (
    <main className="min-h-screen bg-background font-sans text-foreground" onPointerMove={(event) => {
      const target = event.currentTarget as HTMLElement;
      target.style.setProperty("--spot-x", `${event.clientX}px`);
      target.style.setProperty("--spot-y", `${event.clientY}px`);
    }}>
      <div className="pointer-events-none fixed inset-0 bg-spotlight" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-shell shadow-shell sm:my-6 sm:min-h-[860px] sm:rounded-[2rem]">
        {step !== "landing" && step !== "home" && (
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-shell/90 px-5 py-4 backdrop-blur-xl">
            <button className="rounded-full bg-secondary p-2 text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setStep("landing")} aria-label="Back to landing"><ChevronLeft className="size-5" /></button>
            <p className="font-display text-xl">Stretch</p>
            <button className="rounded-full bg-secondary p-2 text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setStep("care")} aria-label="Open coach"><MessageCircle className="size-5" /></button>
          </header>
        )}

        <div className="flex-1 overflow-y-auto pb-24">
          {step === "landing" && (
            <section className="space-y-7 px-5 pb-8 pt-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-hero p-6 shadow-float">
                <img src={heroImage} alt="Rose silk, olive leaves, and warm ceramics" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-heroVeil" />
                <div className="relative flex min-h-[520px] flex-col justify-between">
                  <div className="flex items-center justify-between"><p className="font-display text-3xl text-primary">Stretch</p><span className="rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur">30 days</span></div>
                  <div className="space-y-5">
                    <SectionTitle title="Care that follows you home." copy="Answer a few questions. Stretch builds your first month with the right care, coach, kit, pods, and experience pass." />
                    <div className="grid gap-3"><Button variant="hero" size="xl" onClick={() => setStep("goal")}>Build my first month <ArrowRight className="size-4" /></Button><Button variant="soft" size="xl" onClick={() => setStep("pathways")}>Explore pathways</Button></div>
                  </div>
                </div>
              </div>
              <PathwayPreviewList onOpen={openJourney} compact />
              <div className="grid grid-cols-2 gap-3">{lockedCards.map((item) => <div key={item} className="rounded-3xl border border-border bg-secondary p-4 text-muted-foreground shadow-card"><Lock className="mb-3 size-4" /><p className="font-medium">{item}</p><p className="mt-1 text-xs">Unlocks later</p></div>)}</div>
            </section>
          )}

          {step === "goal" && <GoalScreen setGoal={setGoal} setStep={setStep} />}
          {step === "quiz" && <QuizScreen quizIndex={quizIndex} chooseAnswer={chooseAnswer} />}
          {step === "built" && <BuiltScreen pathway={pathway} resetQuiz={resetQuiz} onUnlocks={() => setStep("unlocks")} onOpenJourney={() => openJourney(pathwayKey)} />}
          {step === "unlocks" && <UnlocksScreen onNext={() => setStep("confirm")} />}
          {step === "confirm" && <ConfirmScreen pathway={pathway} resetQuiz={resetQuiz} onBuild={() => setStep("builder")} onOpenJourney={() => openJourney(pathwayKey)} />}
          {step === "builder" && <BuilderScreen selectedKit={selectedKit} selectedPod={selectedPod} selectedPass={selectedPass} setSelectedKit={setSelectedKit} setSelectedPod={setSelectedPod} setSelectedPass={setSelectedPass} onStart={() => setStep("week")} />}
          {step === "week" && <WeekScreen onHome={() => setStep("home")} />}
          {step === "home" && <HomeScreen pathway={pathway} onCare={() => setStep("care")} onFuture={() => setStep("future")} onJourney={() => openJourney(pathwayKey)} />}
          {step === "wallet" && <WalletScreen pathwayTitle={pathway.title} onFuture={() => setStep("future")} />}
          {step === "future" && <FutureScreen />}
          {step === "pathways" && <PathwaysScreen onOpen={openJourney} />}
          {step === "journey" && <JourneyScreen pathway={pathways[selectedJourney]} activeTab={journeyTab} setActiveTab={setJourneyTab} onAdjacent={() => openJourney(pathways[selectedJourney].adjacent)} onCoach={() => setStep("care")} />}
          {step === "care" && <CareScreen />}
        </div>

        <nav className="absolute bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-border/80 bg-shell/95 px-2 py-2 backdrop-blur-xl">
          <NavItem icon={<Home className="size-5" />} label="Home" active={step === "home"} onClick={() => setStep("home")} />
          <NavItem icon={<Leaf className="size-5" />} label="Pathways" active={step === "pathways" || step === "journey"} onClick={() => setStep("pathways")} />
          <NavItem icon={<CalendarDays className="size-5" />} label="Plan" active={["built", "unlocks", "confirm", "builder", "week"].includes(step)} onClick={() => setStep(answers.length ? "built" : "goal")} />
          <NavItem icon={<MessageCircle className="size-5" />} label="Care" active={step === "care"} onClick={() => setStep("care")} />
          <NavItem icon={<Wallet className="size-5" />} label="Wallet" active={step === "wallet"} onClick={() => setStep("wallet")} />
        </nav>
      </div>
    </main>
  );
}

function GoalScreen({ setGoal, setStep }: { setGoal: (goal: string) => void; setStep: (step: Step) => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="What do you want to feel better in 30 days?" copy="Choose the answer that feels closest. Your first month can still be adjusted." /><div className="grid gap-3">{goals.map((item) => <SoftCard key={item} onClick={() => { setGoal(item); setStep("quiz"); }} className="p-4"><span className="flex items-center justify-between gap-3 font-medium"><span>{item}</span><ArrowRight className="size-4 text-accent" /></span></SoftCard>)}</div></section>;
}

function QuizScreen({ quizIndex, chooseAnswer }: { quizIndex: number; chooseAnswer: (answer: string) => void }) {
  return <section className="space-y-6 px-5 py-7"><div className="space-y-3"><p className="text-sm font-semibold text-accent">Question {quizIndex + 1} of 6</p><div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-smooth" style={{ width: `${((quizIndex + 1) / 6) * 100}%` }} /></div></div><SectionTitle title={quiz[quizIndex].question} /><div className="grid gap-3">{quiz[quizIndex].options.map((option) => <SoftCard key={option} onClick={() => chooseAnswer(option)} className="p-4 capitalize"><span className="flex items-center justify-between gap-3"><span>{option}</span><ArrowRight className="size-4 text-accent" /></span></SoftCard>)}</div></section>;
}

function BuiltScreen({ pathway, resetQuiz, onUnlocks, onOpenJourney }: { pathway: Pathway; resetQuiz: () => void; onUnlocks: () => void; onOpenJourney: () => void }) {
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float"><Sparkles className="mb-5 size-8" /><SectionTitle title="Stretch built your first month." copy="We built your month. Keep it, swap one thing, or ask your coach." /></div><SoftCard onClick={onOpenJourney} className="space-y-4"><p className="text-sm font-semibold text-accent">Recommended pathway</p><h2 className="font-display text-3xl">{pathway.title}</h2><p className="leading-7 text-muted-foreground">{pathway.reason}</p></SoftCard><div className="rounded-3xl bg-secondary p-5 shadow-card"><p className="mb-3 font-semibold">Your first month includes</p><div className="grid gap-3">{pathway.foundation.slice(0, 5).map((item) => <span key={item} className="flex items-center gap-3 text-sm"><Check className="size-4 text-accent" />{item}</span>)}</div></div><div className="grid gap-3"><Button variant="hero" size="xl" onClick={onUnlocks}>Show my unlocks</Button><Button variant="soft" size="xl" onClick={resetQuiz}>Change answers</Button></div></section>;
}

function UnlocksScreen({ onNext }: { onNext: () => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle eyebrow="Instant Unlocks" title="Your first set is ready." copy="These are available now. More opens as your month takes shape." />{["Care", "Coach", "Kit", "Pods", "Pass", "Progress", "Unlocks"].map((item, index) => <div key={item} className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-card animate-slide-up" style={{ animationDelay: `${index * 70}ms` }}><div className="rounded-full bg-secondary p-3 text-accent"><Check className="size-5" /></div><div><p className="font-display text-xl">{item}</p><p className="text-sm text-muted-foreground">Ready for your first month</p></div></div>)}<Button variant="hero" size="xl" className="w-full" onClick={onNext}>Choose my plan</Button></section>;
}

function ConfirmScreen({ pathway, resetQuiz, onBuild, onOpenJourney }: { pathway: Pathway; resetQuiz: () => void; onBuild: () => void; onOpenJourney: () => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Keep your first month or swap one thing." copy="Your coach can help refine it after you begin." /><SoftCard onClick={onOpenJourney} className="space-y-4 border-primary/40"><div className="flex items-center justify-between"><p className="font-display text-2xl">First Month</p><Star className="size-5 text-accent" /></div><p className="text-muted-foreground">{pathway.title}</p><div className="grid grid-cols-3 gap-2 text-center text-xs">{pathway.guidedDefaults.slice(0, 3).map((item) => <span key={item} className="rounded-2xl bg-secondary px-2 py-3">{item}</span>)}</div></SoftCard><Button variant="hero" size="xl" className="w-full" onClick={onBuild}>Build my month</Button><Button variant="soft" size="xl" className="w-full" onClick={resetQuiz}>Swap answers</Button></section>;
}

function BuilderScreen({ selectedKit, selectedPod, selectedPass, setSelectedKit, setSelectedPod, setSelectedPass, onStart }: { selectedKit: string; selectedPod: string; selectedPass: string; setSelectedKit: (v: string) => void; setSelectedPod: (v: string) => void; setSelectedPass: (v: string) => void; onStart: () => void }) {
  return <section className="space-y-7 px-5 py-7"><SectionTitle title="Pick your kit, pod, and experience pass." copy="Choose what feels easiest to start with this week." /><Picker title="Kit" icon={<Package className="size-5" />} options={kits} value={selectedKit} onChange={setSelectedKit} /><Picker title="Pods" icon={<Leaf className="size-5" />} options={pods} value={selectedPod} onChange={setSelectedPod} /><Picker title="Pass" icon={<Ticket className="size-5" />} options={passes} value={selectedPass} onChange={setSelectedPass} /><Button variant="hero" size="xl" className="w-full" onClick={onStart}>Start first week</Button></section>;
}

function WeekScreen({ onHome }: { onHome: () => void }) {
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-olive p-6 text-olive-foreground shadow-float"><CalendarDays className="mb-5 size-8" /><SectionTitle title="Week one starts gently." copy="Your care plan, coach note, kit, pod, and pass are lined up." /></div><div className="grid gap-3">{["Tonight: settle your sleep window", "Tomorrow: coach check-in", "This week: join your pod", "Anytime: book your pass"].map((item) => <div key={item} className="rounded-3xl bg-card p-5 shadow-card"><p className="font-medium">{item}</p></div>)}</div><Button variant="hero" size="xl" className="w-full" onClick={onHome}>Go to Home</Button></section>;
}

function HomeScreen({ pathway, onCare, onFuture, onJourney }: { pathway: Pathway; onCare: () => void; onFuture: () => void; onJourney: () => void }) {
  return <section className="space-y-6 px-5 pb-8 pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Good morning</p><h1 className="font-display text-4xl">Your month is live.</h1></div><button onClick={onCare} className="rounded-full bg-secondary p-3 text-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageCircle className="size-5" /></button></div><SoftCard onClick={onJourney} className="bg-primary text-primary-foreground"><p className="text-sm opacity-80">Current pathway</p><h2 className="mt-2 font-display text-3xl">{pathway.title}</h2><p className="mt-4 leading-7 opacity-85">{pathway.monthlyPromise}</p></SoftCard><div className="grid grid-cols-2 gap-3"><Metric label="Progress" value="18%" /><Metric label="Unlocks" value="7" /></div><SoftCard onClick={onFuture}><p className="font-display text-2xl">Future unlocks</p><p className="mt-2 text-sm text-muted-foreground">See what may open after week one.</p></SoftCard></section>;
}

function JourneyScreen({ pathway, activeTab, setActiveTab, onAdjacent, onCoach }: { pathway: Pathway; activeTab: JourneyTab; setActiveTab: (tab: JourneyTab) => void; onAdjacent: () => void; onCoach: () => void }) {
  const tabs: JourneyTab[] = ["Experience", "Coach", "Kit", "Clinician Loop"];
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float"><p className="text-sm opacity-80">Unlocked pathway</p><h1 className="mt-2 font-display text-4xl leading-tight">{pathway.title}</h1><p className="mt-4 leading-7 opacity-90">{pathway.monthlyPromise}</p></div><div className="grid grid-cols-3 gap-3"><PhaseCard title="Month 1" label="Foundation" items={pathway.foundation} /><PhaseCard title="Month 2" label="Deepen" items={pathway.deepen} /><PhaseCard title="Month 3" label="Sustain / Unlock" items={pathway.sustain} /></div><Roadmap roadmap={pathway.roadmap} /><div className="rounded-3xl bg-card p-2 shadow-card"><div className="grid grid-cols-4 gap-1">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={cn("rounded-2xl px-2 py-3 text-[11px] font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>{tab}</button>)}</div></div><div className="rounded-3xl bg-card p-5 shadow-card"><div className="mb-4 flex items-center gap-3"><div className="rounded-full bg-secondary p-3 text-accent">{activeTab === "Clinician Loop" ? <ClipboardList className="size-5" /> : <Sparkles className="size-5" />}</div><h2 className="font-display text-2xl">{activeTab}</h2></div><div className="grid gap-3">{pathway.tabs[activeTab].map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-accent" />{item}</p>)}</div></div>{pathway.vitality && <InfoCard title="Visible Vitality Sidecar" copy={pathway.vitality} icon={<Sparkles className="size-5" />} />}<InfoCard title="Monthly wow moment" copy={pathway.wow} icon={<Star className="size-5" />} /><InfoCard title="Why this matters" copy={pathway.why} icon={<Leaf className="size-5" />} /><div className="rounded-3xl bg-secondary p-5 shadow-card"><p className="font-display text-2xl">Guided defaults</p><div className="mt-4 grid gap-2">{pathway.guidedDefaults.map((item) => <span key={item} className="rounded-2xl bg-card px-4 py-3 text-sm shadow-card">{item}</span>)}</div></div><div className="grid gap-3"><PreviewRow label="Strongest pack" value={pathway.strongestPack} /><PreviewRow label="Future device" value={pathway.futureDevice} /><PreviewRow label="Future rider / coverage add-on" value={pathway.futureRider} /><SoftCard onClick={onAdjacent}><p className="text-sm font-semibold text-accent">Adjacent pathway preview</p><p className="mt-1 font-display text-2xl">{pathways[pathway.adjacent].title}</p></SoftCard></div><div className="grid gap-3"><Button variant="hero" size="xl">Keep this month</Button><Button variant="soft" size="xl">Swap one thing</Button><Button variant="soft" size="xl" onClick={onCoach}>Ask coach</Button></div></section>;
}

function PhaseCard({ title, label, items }: { title: string; label: string; items: string[] }) {
  return <div className="rounded-3xl bg-card p-4 shadow-card"><p className="text-xs font-semibold text-accent">{title}</p><p className="mt-1 font-display text-xl leading-tight">{label}</p><p className="mt-3 text-xs leading-5 text-muted-foreground">{items[0]}</p></div>;
}

function Roadmap({ roadmap }: { roadmap: { now: string; next: string; later: string } }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="mb-4 font-display text-2xl">Now / Next / Later</p>{[["Now", roadmap.now], ["Next", roadmap.next], ["Later", roadmap.later]].map(([label, copy]) => <div key={label} className="mb-3 grid grid-cols-[64px_1fr] gap-3 last:mb-0"><span className="rounded-full bg-secondary px-3 py-1 text-center text-xs font-semibold text-accent">{label}</span><p className="text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>;
}

function InfoCard({ title, copy, icon }: { title: string; copy: string; icon: React.ReactNode }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><div className="mb-3 flex items-center gap-3 text-accent">{icon}<p className="font-display text-2xl text-foreground">{title}</p></div><p className="leading-7 text-muted-foreground">{copy}</p></div>;
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-3 rounded-3xl bg-card p-5 shadow-card"><p className="text-sm text-muted-foreground">{label}</p><p className="text-right font-semibold">{value}</p></div>;
}

function Picker({ title, icon, options, value, onChange }: { title: string; icon: React.ReactNode; options: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="space-y-3"><div className="flex items-center gap-2 text-accent">{icon}<p className="font-display text-2xl text-foreground">{title}</p></div><div className="grid gap-3">{options.map((option) => <button key={option} onClick={() => onChange(option)} className={cn("rounded-3xl border p-4 text-left shadow-card transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === option ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:-translate-y-0.5")}><span className="flex items-center justify-between gap-3"><span>{option}</span>{value === option && <Check className="size-4" />}</span></button>)}</div></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-4xl">{value}</p></div>;
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={cn("flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground")}>{icon}<span>{label}</span></button>;
}

function WalletScreen({ pathwayTitle, onFuture }: { pathwayTitle: string; onFuture: () => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Wallet / progress" copy="A simple view of what is active, used, and opening next." /><div className="rounded-[2rem] bg-card p-6 shadow-float"><p className="text-sm text-muted-foreground">Active month</p><h2 className="mt-2 font-display text-3xl">{pathwayTitle}</h2><div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[38%] rounded-full bg-accent" /></div><p className="mt-3 text-sm text-muted-foreground">38% prepared for week one</p></div>{[["Care", "Live"], ["Coach", "Matched"], ["Kit", "Selected"], ["Pods", "Joined"], ["Pass", "Ready"]].map(([a, b]) => <div key={a} className="flex items-center justify-between rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-xl">{a}</p><span className="rounded-full bg-secondary px-3 py-1 text-sm text-accent">{b}</span></div>)}<Button variant="soft" size="xl" className="w-full" onClick={onFuture}>View future unlocks</Button></section>;
}

function FutureScreen() {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Future unlocks" copy="These stay quiet until they are useful for you." />{["Deeper answers", "Rider support", "Device-ready tracking", "Partner experiences"].map((item) => <div key={item} className="rounded-3xl border border-border bg-secondary p-5 text-muted-foreground shadow-card"><Lock className="mb-3 size-5" /><p className="font-display text-2xl text-foreground">{item}</p><p className="mt-2 text-sm">Potentially available after your first check-in.</p></div>)}</section>;
}

function PathwayPreviewList({ onOpen, compact = false }: { onOpen: (key: PathwayKey) => void; compact?: boolean }) {
  return <div className="space-y-3"><p className="text-sm font-semibold text-muted-foreground">Unlocked pathways</p>{pathwayKeys.map((key) => { const card = pathways[key]; return <SoftCard key={card.title} onClick={() => onOpen(key)}><div className="flex items-start justify-between gap-4"><div className="space-y-3"><h2 className="font-display text-2xl text-foreground">{card.title}</h2><p className="text-sm text-muted-foreground">Best for {card.bestFor}</p>{!compact && <p className="text-sm leading-6 text-muted-foreground">{card.monthlyPromise}</p>}<div className="grid gap-2 text-sm"><span className="flex items-center gap-2 text-foreground"><Sparkles className="size-4 text-accent" /> {card.firstUnlock}</span><span className="flex items-center gap-2 text-muted-foreground"><Lock className="size-4" /> Later: {card.futureUnlock}</span></div></div><ArrowRight className="mt-1 size-5 text-accent" /></div></SoftCard>; })}</div>;
}

function PathwaysScreen({ onOpen }: { onOpen: (key: PathwayKey) => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Explore pathways" copy="Four guided monthly journeys are unlocked. Each keeps choices simple." /><PathwayPreviewList onOpen={onOpen} /></section>;
}

function CareScreen() {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Coach" copy="Ask for help choosing, swapping, or starting gently." /><div className="rounded-[2rem] bg-card p-5 shadow-float"><div className="mb-4 flex items-center gap-3"><div className="rounded-full bg-rose p-3 text-rose-foreground"><Moon className="size-5" /></div><div><p className="font-display text-xl">Mara</p><p className="text-sm text-muted-foreground">Your Stretch coach</p></div></div><p className="leading-7 text-muted-foreground">I can help you keep the plan, swap one thing, or make week one feel lighter.</p></div>{["Can we make my first week easier?", "I want to swap my kit", "What should I do tonight?"].map((prompt) => <button key={prompt} className="w-full rounded-3xl bg-secondary p-4 text-left font-medium shadow-card transition-smooth hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{prompt}</button>)}</section>;
}
