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
    roadmap: { now: "this month’s Sleep + Energy care stack", next: "Sleep Reset Pack or Mood / Fog Pack", later: "Smart Ring + PeriShield Rx + Skin/Hair crossover" },
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
    roadmap: { now: "Flare & Function stabilization", next: "Endo Relief Burst Pack", later: "EndoShield + Surgery Track preview + IVF Bridge preview" },
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
    roadmap: { now: "Camera-Ready + Drift Lite monthly stack", next: "Derma Actives Pack or Camera-Ready Sprint", later: "LED Mask + DermaShield+ + MetaboGlow expanded lanes" },
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
    roadmap: { now: "Brain + Focus monthly stack", next: "Brain Sprint or Nootropic Builder", later: "Smart Ring + Longevity Lab Rider + NeuroSleep Rider" },
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

type PassportStamp = { title: string; means: string; complete: string; unlocks: string; mbc?: string };
type StackStatus = "included" | "pick 1" | "pick 2" | "locked" | "pack-only" | "rider-only";
type MonthBlock = { name: string; selection: string; why: string; status: StackStatus; includes: string; alternatives?: string[]; change?: string; swappable?: boolean };
type DemoTile = { column: string; name: string; what: string; where: string; pathways: string; status: string };
const rebalanceOptions = ["more sleep support", "more energy support", "more glow / visible vitality", "more mood support", "more movement support", "less intensity this month"];
const buildMonthStack = (pathway: Pathway): MonthBlock[] => [
  { name: "Specialist", selection: pathway.tabs["Clinician Loop"][0], why: "This keeps the plan safe and matched to your main concern.", status: "included", includes: pathway.tabs["Clinician Loop"].slice(0, 2).join(" • "), alternatives: ["Women’s health review", "Internal medicine review"], change: "Your clinician route changes only within safe bounds.", swappable: true },
  { name: "Functional Care", selection: pathway.tabs.Experience[0], why: "It is the lowest-friction way to start feeling better this month.", status: "pick 1", includes: pathway.tabs.Experience.slice(0, 3).join(" • "), alternatives: pathway.tabs.Experience.slice(1, 4), change: "Your monthly experience emphasis shifts, while the plan stays intact.", swappable: true },
  { name: "Coaching", selection: pathway.tabs.Coach[0], why: "Your first touch sets the routine before more options appear.", status: "included", includes: pathway.tabs.Coach.slice(0, 2).join(" • "), alternatives: ["Sleep emphasis", "Energy emphasis", "Mood emphasis"], change: "Your coach emphasizes a different routine, not a different pathway.", swappable: true },
  { name: "Mental Support", selection: pathway.tabs.Coach.find((x) => x.includes("Mood") || x.includes("psychology")) || "Mood Check", why: "Small support helps keep the month doable.", status: "included", includes: "Mood Check + guided micro-support", alternatives: ["Mood emphasis", "Stress emphasis"], change: "Your support tone changes without changing clinical decisions.", swappable: true },
  { name: "Clinical / LED / Review", selection: pathway.tabs["Clinician Loop"][1], why: "This creates a safe review point before bigger steps.", status: "pick 1", includes: "One review-style touch this month", alternatives: ["Recovery review", "Body-composition review", "Visible-aging review"], change: "The review focus changes; gated decisions remain gated.", swappable: true },
  { name: "Labs", selection: pathway.tabs["Clinician Loop"].at(-1) || "Baseline labs", why: "Labs stay guided so the month does not become a marketplace.", status: "locked", includes: "Scheduled or uploaded when appropriate", swappable: false },
  { name: "Pods", selection: pathway.tabs.Coach.at(-1)?.replace("Pod choice: ", "") || "Guided pod", why: "Pods give structure and momentum without extra decisions.", status: "pick 2", includes: "Two guided group sessions this month", alternatives: ["Sleep Reset Pod", "Mood/Fog Pod", "Function Support Pod"], change: "Your group support changes to match the new emphasis.", swappable: true },
  { name: "Experience Pass", selection: pathway.guidedDefaults[3], why: "One pass creates a tangible monthly moment.", status: "pick 1", includes: "One restorative or movement-based pass", alternatives: ["Restorative studio pass", "Recovery session pass", "Movement intro pass"], change: "Your monthly wow moment changes.", swappable: true },
  { name: "Kit", selection: pathway.guidedDefaults[2], why: "The kit supports the plan at home between care touches.", status: "pick 1", includes: pathway.tabs.Kit.slice(0, 4).join(" • "), alternatives: pathway.tabs.Kit.slice(0, 3), change: "One kit item changes; the rest stays guided.", swappable: true },
  { name: "Packs", selection: pathway.strongestPack, why: "This is the strongest next pack, not something to choose today.", status: "pack-only", includes: "Appears after enough progress", swappable: false },
  { name: "Future Unlocks", selection: `${pathway.futureDevice} + ${pathway.futureRider}`, why: "Devices, riders, and coverage add-ons appear only when useful.", status: "rider-only", includes: pathway.roadmap.later, swappable: false },
];
const demoTiles: DemoTile[] = ["Care", "Coach", "Labs", "Pods", "Experience", "Kit", "Unlocks"].flatMap((column) => [
  { column, name: `${column} core`, what: `A guided ${column.toLowerCase()} building block.`, where: "Month Stack and pathway dashboards", pathways: "Peri, Endo, MetaboGlow, Longevity", status: column === "Unlocks" ? "milestone unlock" : "included" },
  { column, name: `${column} advanced`, what: `A gated or swappable ${column.toLowerCase()} option.`, where: "Demo mode and selected drawers", pathways: "Pathway-dependent", status: ["Labs", "Unlocks"].includes(column) ? "clinician-gated" : "swap available" },
]);

const passportStamps: PassportStamp[] = [
  { title: "Plan selected", means: "Your first monthly pathway is confirmed.", complete: "Choose Keep this recommendation or finish the Month Builder.", unlocks: "Your guided first week opens." },
  { title: "Kit built", means: "Your support items are selected for this month.", complete: "Pick your kit defaults and confirm shipping preferences.", unlocks: "Badge, no cash unless configured.", mbc: "complete kit build = badge, no cash unless configured" },
  { title: "Pods selected", means: "Your guided group seats are reserved.", complete: "Choose and join your pod sessions.", unlocks: "+MBC indicator.", mbc: "attend pod = +MBC indicator" },
  { title: "Experience pass booked", means: "Your monthly restorative or movement experience is scheduled.", complete: "Book one available pass this month.", unlocks: "+MBC indicator.", mbc: "book experience pass = +MBC indicator" },
  { title: "First coaching touch done", means: "Your coach has helped set your first routine.", complete: "Complete your first coach check-in.", unlocks: "Adjustment support for week two." },
  { title: "Labs scheduled or uploaded", means: "Your baseline information is ready for review.", complete: "Schedule labs or upload recent results.", unlocks: "+MBC indicator.", mbc: "complete baseline labs = +MBC indicator" },
  { title: "Seven-day streak", means: "You kept a simple tracking rhythm for one week.", complete: "Check in daily for seven days.", unlocks: "+MBC indicator.", mbc: "seven-day tracking streak = +MBC indicator" },
  { title: "Month 1 complete", means: "You completed the core steps that make your plan work.", complete: "Finish your selected care, kit, pods, pass, and check-ins.", unlocks: "Future unlock eligibility.", mbc: "month 1 complete = future unlock eligibility" },
  { title: "Future unlock eligible", means: "Stretch can show the next useful option without overwhelming you.", complete: "Complete Month 1 and review your pattern with your coach.", unlocks: "Selected packs, devices, or upgrades." },
];

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
  const [selectedStamp, setSelectedStamp] = useState<PassportStamp | null>(null);

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
      setStep("unlocks");
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
          {step === "unlocks" && <UnlocksScreen pathway={pathway} answers={answers} onBuild={() => setStep("builder")} onKeep={() => setStep("confirm")} onSwap={resetQuiz} />}
          {step === "confirm" && <ConfirmScreen pathway={pathway} resetQuiz={resetQuiz} onBuild={() => setStep("builder")} onOpenJourney={() => openJourney(pathwayKey)} />}
          {step === "builder" && <BuilderScreen pathway={pathway} onStart={() => setStep("week")} onCoach={() => setStep("care")} />}
          {step === "week" && <WeekScreen onHome={() => setStep("home")} />}
          {step === "home" && <HomeScreen pathway={pathway} answers={answers} onCare={() => setStep("care")} onFuture={() => setStep("future")} onJourney={() => openJourney(pathwayKey)} onStamp={setSelectedStamp} />}
          {step === "wallet" && <WalletScreen pathwayTitle={pathway.title} onFuture={() => setStep("future")} onStamp={setSelectedStamp} />}
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
        {selectedStamp && <StampDrawer stamp={selectedStamp} onClose={() => setSelectedStamp(null)} />}
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

function UnlocksScreen({ pathway, answers, onBuild, onKeep, onSwap }: { pathway: Pathway; answers: string[]; onBuild: () => void; onKeep: () => void; onSwap: () => void }) {
  const answerText = answers.slice(0, 3).join(", ") || "your answers";
  const cards = [
    { title: "Your pathway", lead: pathway.title, copy: `We recommended this because you selected ${answerText}.` },
    { title: "Your plan", lead: "Month 1 Foundation", copy: pathway.monthlyPromise },
    { title: "Your specialist route", lead: pathway.tabs["Clinician Loop"][0], copy: "You’ll start with one clinician touch to interpret symptoms and create a safe next-step plan." },
    { title: "Your pod seats", lead: pathway.title.includes("Peri") ? "Peri Reset Pod + Sleep Reset Pod" : pathway.tabs.Coach[pathway.tabs.Coach.length - 1].replace("Pod choice: ", ""), copy: "You have 2 guided group sessions this month." },
    { title: "Your monthly kit", lead: "Guided kit builder", copy: "You’ll build a guided kit with support items, food-structure tools, and one visible-vitality item." },
    { title: "Your experience pass", lead: "One monthly pass", copy: "You’ll pick one restorative or movement-based experience this month." },
    { title: "Your progress passport", lead: "Milestone Bonus Credits", copy: "As you complete your plan, you’ll earn Milestone Bonus Credits." },
    { title: "Your future unlock track", lead: pathway.roadmap.later, copy: "Packs, devices, and coverage add-ons appear when your pattern shows you need them." },
  ];
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Your Stretch month is ready" copy="Here’s what unlocked for you the minute you joined." />{cards.map((card, index) => <div key={card.title} className="rounded-3xl bg-card p-5 shadow-card animate-slide-up" style={{ animationDelay: `${index * 90}ms` }}><div className="mb-3 flex items-center gap-3"><div className="rounded-full bg-secondary p-2 text-accent"><Check className="size-4" /></div><p className="text-sm font-semibold text-accent">{card.title}</p></div><h2 className="font-display text-2xl">{card.lead}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.copy}</p></div>)}<div className="grid gap-3"><Button variant="hero" size="xl" className="w-full" onClick={onBuild}>Build my month</Button><Button variant="soft" size="xl" className="w-full" onClick={onKeep}>Keep this recommendation</Button><Button variant="soft" size="xl" className="w-full" onClick={onSwap}>Swap one thing</Button></div></section>;
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

function HomeScreen({ pathway, answers, onCare, onFuture, onJourney, onStamp }: { pathway: Pathway; answers: string[]; onCare: () => void; onFuture: () => void; onJourney: () => void; onStamp: (stamp: PassportStamp) => void }) {
  const chips = (answers.length ? answers : ["poor sleep", "fatigue", "brain fog"]).slice(0, 4);
  return <section className="space-y-6 px-5 pb-8 pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Stretch Journey Bar</p><h1 className="font-display text-4xl">Today’s care rhythm</h1></div><button onClick={onCare} className="rounded-full bg-secondary p-3 text-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageCircle className="size-5" /></button></div><div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float"><p className="text-sm opacity-80">Today’s next 3 actions</p>{["Confirm your care route", "Choose pod seats", "Start your kit build"].map((item) => <p key={item} className="mt-4 flex gap-3"><Check className="size-5 shrink-0" />{item}</p>)}</div><SoftCard onClick={onJourney}><p className="font-display text-2xl">Your Month Builder progress</p><div className="mt-4 grid gap-3">{["Care confirmed", "Pods selected", "Kit built", "Experience pass booked", "Labs / clinician loop", "Future unlock viewed"].map((item, i) => <div key={item} className="flex items-center justify-between gap-3"><span className="text-sm text-muted-foreground">{item}</span><span className={cn("rounded-full px-3 py-1 text-xs font-semibold", i < 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-accent")}>{i < 2 ? "Done" : "Next"}</span></div>)}</div></SoftCard><div className="rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-2xl">Recommended now</p><div className="mt-4 grid gap-3"><PreviewRow label="Box / kit add-on" value={pathway.guidedDefaults[2]} /><PreviewRow label="Strongest pack" value={pathway.strongestPack} /><PreviewRow label="Future preview" value={pathway.futureDevice} /></div></div><div className="rounded-3xl bg-secondary p-5 shadow-card"><p className="font-display text-2xl">Why we recommended this</p><div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="rounded-full bg-card px-3 py-2 text-xs font-semibold text-accent shadow-card">{chip}</span>)}</div><p className="mt-4 text-sm leading-6 text-muted-foreground">{pathway.reason}</p></div><MbcCard onStamp={onStamp} /><PassportSection onStamp={onStamp} compact /></section>;
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

function WalletScreen({ pathwayTitle, onFuture, onStamp }: { pathwayTitle: string; onFuture: () => void; onStamp: (stamp: PassportStamp) => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Wallet / progress" copy="A simple view of what is active, used, and opening next." /><div className="rounded-[2rem] bg-card p-6 shadow-float"><p className="text-sm text-muted-foreground">Active month</p><h2 className="mt-2 font-display text-3xl">{pathwayTitle}</h2><div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[38%] rounded-full bg-accent" /></div><p className="mt-3 text-sm text-muted-foreground">38% prepared for week one</p></div><MbcCard onStamp={onStamp} /><PassportSection onStamp={onStamp} /><Button variant="soft" size="xl" className="w-full" onClick={onFuture}>View future unlocks</Button></section>;
}

function PassportSection({ onStamp, compact = false }: { onStamp: (stamp: PassportStamp) => void; compact?: boolean }) {
  const shown = compact ? passportStamps.slice(0, 5) : passportStamps;
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-2xl">Progress Passport</p><div className="mt-4 grid grid-cols-2 gap-3">{shown.map((stamp, index) => <button key={stamp.title} onClick={() => onStamp(stamp)} className={cn("rounded-2xl border p-3 text-left text-xs font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", index < 2 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-foreground hover:-translate-y-0.5")}><Star className="mb-2 size-4" />{stamp.title}</button>)}</div></div>;
}

function MbcCard({ onStamp }: { onStamp: (stamp: PassportStamp) => void }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><div className="flex items-start justify-between gap-4"><div><p className="font-display text-2xl">Milestone Bonus Credits</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Milestone Bonus Credits are Stretch-funded credits you earn when you complete the steps that make your plan work — like building your kit, joining pods, finishing labs, booking your pass, or keeping a streak. You can use them later on selected packs, devices, or upgrades.</p></div><span className="rounded-full bg-secondary px-3 py-2 text-sm font-bold text-accent">120</span></div><div className="mt-4 grid gap-2 text-sm"><PreviewRow label="Current balance" value="120 MBC" /><PreviewRow label="Pending rewards" value="3 steps" /><PreviewRow label="Next unlock" value="Seven-day streak" /></div><div className="mt-4 grid gap-2">{passportStamps.filter((s) => s.mbc).slice(0, 5).map((stamp) => <button key={stamp.title} onClick={() => onStamp(stamp)} className="rounded-2xl bg-secondary px-4 py-3 text-left text-xs font-semibold text-accent">{stamp.mbc}</button>)}</div></div>;
}

function StampDrawer({ stamp, onClose }: { stamp: PassportStamp; onClose: () => void }) {
  return <div className="absolute inset-0 z-50 flex items-end bg-primary/35 p-3 backdrop-blur-sm" onClick={onClose}><div className="w-full rounded-[2rem] bg-card p-6 shadow-float" onClick={(event) => event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><p className="font-display text-3xl">{stamp.title}</p><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div>{[["What it means", stamp.means], ["How to complete it", stamp.complete], ["What it unlocks", stamp.unlocks]].map(([label, copy]) => <div key={label} className="mb-4 rounded-2xl bg-secondary p-4 last:mb-0"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div>;
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
