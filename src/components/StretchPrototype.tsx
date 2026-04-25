import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
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
  | "care";

type PathwayKey = "peri" | "endo" | "metabo" | "longevity";

const pathways: Record<PathwayKey, {
  title: string;
  bestFor: string;
  firstUnlock: string;
  futureUnlock: string;
  reason: string;
  includes: string[];
}> = {
  peri: {
    title: "Peri Sleep + Energy",
    bestFor: "Rest, temperature shifts, steady days",
    firstUnlock: "Sleep reset with your coach",
    futureUnlock: "Focus and strength support",
    reason: "Your answers point to rest, temperature, energy, or focus getting in the way of daily life.",
    includes: ["Care plan for week one", "Coach check-in", "Sleep and cooling kit", "Small group pod", "Restorative experience pass"],
  },
  endo: {
    title: "Endo Flare + Function",
    bestFor: "Pelvic pain, flare days, bloating",
    firstUnlock: "Flare-day comfort plan",
    futureUnlock: "Workday function support",
    reason: "Your answers suggest flare days or discomfort are limiting what you can do.",
    includes: ["Care plan for flare windows", "Coach support", "Comfort kit", "Function-days pod", "Recovery experience pass"],
  },
  metabo: {
    title: "MetaboGlow Camera-Ready",
    bestFor: "Glow, skin, hair, cravings, drift",
    firstUnlock: "Glow and rhythm starter",
    futureUnlock: "Drift Lite support",
    reason: "Your answers point to visible results, cravings, skin, hair, or body changes you want to steady.",
    includes: ["Care plan for glow and rhythm", "Coach check-in", "Skin + energy kit", "Glow pod", "Studio-ready experience pass"],
  },
  longevity: {
    title: "Longevity Brain + Focus",
    bestFor: "Focus, travel load, high-output weeks",
    firstUnlock: "Focus week setup",
    futureUnlock: "Travel resilience support",
    reason: "Your answers suggest focus, energy, or performance is the thing you want back first.",
    includes: ["Care plan for sharper weeks", "Coach check-in", "Focus kit", "High-output pod", "Recovery experience pass"],
  },
};

const previewCards = [
  pathways.peri,
  pathways.endo,
  pathways.metabo,
  pathways.longevity,
];

const lockedCards = ["Fertility / IVF", "Surgery Track", "Full GLP Route", "Advanced Riders"];

const goals = [
  "Sleep through the night",
  "Reduce hot flashes / night sweats",
  "Clear brain fog",
  "Steady my energy",
  "Reduce pelvic pain / flare days",
  "Improve glow / skin / hair",
  "Manage cravings / metabolic drift",
  "Feel stronger and more in control",
  "I am not sure",
];

const quiz = [
  {
    question: "What feels most disruptive right now?",
    options: ["poor sleep", "hot flashes / night sweats", "brain fog / low focus", "low energy", "pelvic pain / flare days", "bloating / GI discomfort", "skin / hair / acne / glow concerns", "cravings / weight drift", "stress / overwhelm"],
  },
  {
    question: "When do you notice it most?",
    options: ["morning", "afternoon crash", "bedtime", "during work", "during workouts", "around my cycle", "randomly", "during flare days"],
  },
  {
    question: "What kind of support do you want first?",
    options: ["symptom relief", "labs and answers", "coaching and accountability", "visible results", "movement / recovery", "prescription / rider support later", "a 90-day plan"],
  },
  {
    question: "How much help do you want choosing?",
    options: ["build it for me", "let me swap one thing", "I want to compare options"],
  },
  {
    question: "Are you open to in-person experiences?",
    options: ["yes, if nearby", "online only", "maybe later"],
  },
  {
    question: "Are you open to future devices or add-ons?",
    options: ["not now", "maybe later", "yes"],
  },
];

const kits = ["Sleep + cooling kit", "Comfort + recovery kit", "Glow + rhythm kit"];
const pods = ["Calm nights pod", "Flare-days pod", "High-output pod"];
const passes = ["Restorative studio pass", "Recovery session pass", "Glow appointment pass"];

const detectPathway = (answers: string[], goal: string): PathwayKey => {
  const text = `${goal} ${answers.join(" ")}`.toLowerCase();
  if (/pelvic|flare|bloating|gi|cycle|painful/.test(text)) return "endo";
  if (/glow|skin|hair|acne|cravings|weight|metabolic|drift|visible/.test(text)) return "metabo";
  if (/focus|work|travel|performance|brain fog/.test(text)) return "longevity";
  if (/sleep|hot flash|night sweat|energy|midlife|bedtime|afternoon/.test(text)) return "peri";
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

  const pathwayKey = useMemo(() => detectPathway(answers, goal), [answers, goal]);
  const pathway = pathways[pathwayKey];

  const chooseAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    if (quizIndex === quiz.length - 1) {
      setStep("built");
      setQuizIndex(0);
    } else {
      setQuizIndex((current) => current + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setQuizIndex(0);
    setStep("goal");
  };

  return (
    <main
      className="min-h-screen bg-background font-sans text-foreground"
      onPointerMove={(event) => {
        const target = event.currentTarget as HTMLElement;
        target.style.setProperty("--spot-x", `${event.clientX}px`);
        target.style.setProperty("--spot-y", `${event.clientY}px`);
      }}
    >
      <div className="pointer-events-none fixed inset-0 bg-spotlight" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-shell shadow-shell sm:my-6 sm:min-h-[860px] sm:rounded-[2rem]">
        {step !== "landing" && step !== "home" && (
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-shell/90 px-5 py-4 backdrop-blur-xl">
            <button className="rounded-full bg-secondary p-2 text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setStep("landing")} aria-label="Back to landing">
              <ChevronLeft className="size-5" />
            </button>
            <p className="font-display text-xl">Stretch</p>
            <button className="rounded-full bg-secondary p-2 text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setStep("care")} aria-label="Open coach">
              <MessageCircle className="size-5" />
            </button>
          </header>
        )}

        <div className="flex-1 overflow-y-auto pb-24">
          {step === "landing" && (
            <section className="space-y-7 px-5 pb-8 pt-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-hero p-6 shadow-float">
                <img src={heroImage} alt="Rose silk, olive leaves, and warm ceramics" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-heroVeil" />
                <div className="relative flex min-h-[520px] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-3xl text-primary">Stretch</p>
                    <span className="rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur">30 days</span>
                  </div>
                  <div className="space-y-5">
                    <SectionTitle title="Care that follows you home." copy="Answer a few questions. Stretch builds your first month with the right care, coach, kit, pods, and experience pass." />
                    <div className="grid gap-3">
                      <Button variant="hero" size="xl" onClick={() => setStep("goal")}>Build my first month <ArrowRight className="size-4" /></Button>
                      <Button variant="soft" size="xl" onClick={() => setStep("pathways")}>Explore pathways</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">Pathways</p>
                {previewCards.map((card) => (
                  <SoftCard key={card.title} onClick={() => setStep("goal")}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <h2 className="font-display text-2xl text-foreground">{card.title}</h2>
                        <p className="text-sm text-muted-foreground">Best for {card.bestFor}</p>
                        <div className="grid gap-2 text-sm">
                          <span className="flex items-center gap-2 text-foreground"><Sparkles className="size-4 text-accent" /> {card.firstUnlock}</span>
                          <span className="flex items-center gap-2 text-muted-foreground"><Lock className="size-4" /> Later: {card.futureUnlock}</span>
                        </div>
                      </div>
                      <ArrowRight className="mt-1 size-5 text-accent" />
                    </div>
                  </SoftCard>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {lockedCards.map((item) => (
                  <div key={item} className="rounded-3xl border border-border bg-secondary p-4 text-muted-foreground shadow-card">
                    <Lock className="mb-3 size-4" />
                    <p className="font-medium">{item}</p>
                    <p className="mt-1 text-xs">Unlocks later</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step === "goal" && (
            <section className="space-y-6 px-5 py-7">
              <SectionTitle title="What do you want to feel better in 30 days?" copy="Choose the answer that feels closest. Your first month can still be adjusted." />
              <div className="grid gap-3">
                {goals.map((item) => (
                  <SoftCard key={item} onClick={() => { setGoal(item); setStep("quiz"); }} className="p-4">
                    <span className="flex items-center justify-between gap-3 font-medium"><span>{item}</span><ArrowRight className="size-4 text-accent" /></span>
                  </SoftCard>
                ))}
              </div>
            </section>
          )}

          {step === "quiz" && (
            <section className="space-y-6 px-5 py-7">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-accent">Question {quizIndex + 1} of 6</p>
                <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-smooth" style={{ width: `${((quizIndex + 1) / 6) * 100}%` }} /></div>
              </div>
              <SectionTitle title={quiz[quizIndex].question} />
              <div className="grid gap-3">
                {quiz[quizIndex].options.map((option) => (
                  <SoftCard key={option} onClick={() => chooseAnswer(option)} className="p-4 capitalize">
                    <span className="flex items-center justify-between gap-3"><span>{option}</span><ArrowRight className="size-4 text-accent" /></span>
                  </SoftCard>
                ))}
              </div>
            </section>
          )}

          {step === "built" && (
            <section className="space-y-6 px-5 py-7">
              <div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float">
                <Sparkles className="mb-5 size-8" />
                <SectionTitle title="Stretch built your first month." copy="We built your month. Keep it, swap one thing, or ask your coach." />
              </div>
              <SoftCard className="space-y-4">
                <p className="text-sm font-semibold text-accent">Recommended pathway</p>
                <h2 className="font-display text-3xl">{pathway.title}</h2>
                <p className="leading-7 text-muted-foreground">{pathway.reason}</p>
              </SoftCard>
              <div className="rounded-3xl bg-secondary p-5 shadow-card">
                <p className="mb-3 font-semibold">Your first month includes</p>
                <div className="grid gap-3">
                  {pathway.includes.map((item) => <span key={item} className="flex items-center gap-3 text-sm"><Check className="size-4 text-accent" />{item}</span>)}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                <p className="font-semibold">You can still choose</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Your kit, pod, and experience pass before you start.</p>
              </div>
              <div className="grid gap-3">
                <Button variant="hero" size="xl" onClick={() => setStep("unlocks")}>Show my unlocks</Button>
                <Button variant="soft" size="xl" onClick={resetQuiz}>Change answers</Button>
              </div>
            </section>
          )}

          {step === "unlocks" && (
            <section className="space-y-6 px-5 py-7">
              <SectionTitle eyebrow="Instant Unlocks" title="Your first set is ready." copy="These are available now. More opens as your month takes shape." />
              {["Care", "Coach", "Kit", "Pods", "Pass", "Progress", "Unlocks"].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-card animate-slide-up" style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="rounded-full bg-secondary p-3 text-accent"><Check className="size-5" /></div>
                  <div><p className="font-display text-xl">{item}</p><p className="text-sm text-muted-foreground">Ready for your first month</p></div>
                </div>
              ))}
              <Button variant="hero" size="xl" className="w-full" onClick={() => setStep("confirm")}>Choose my plan</Button>
            </section>
          )}

          {step === "confirm" && (
            <section className="space-y-6 px-5 py-7">
              <SectionTitle title="Keep your first month or swap one thing." copy="Your coach can help refine it after you begin." />
              <SoftCard className="space-y-4 border-primary/40">
                <div className="flex items-center justify-between"><p className="font-display text-2xl">First Month</p><Star className="size-5 text-accent" /></div>
                <p className="text-muted-foreground">{pathway.title}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {pathway.includes.slice(0, 3).map((item) => <span key={item} className="rounded-2xl bg-secondary px-2 py-3">{item.split(" ").slice(0, 2).join(" ")}</span>)}
                </div>
              </SoftCard>
              <Button variant="hero" size="xl" className="w-full" onClick={() => setStep("builder")}>Build my month</Button>
              <Button variant="soft" size="xl" className="w-full" onClick={resetQuiz}>Swap answers</Button>
            </section>
          )}

          {step === "builder" && (
            <section className="space-y-7 px-5 py-7">
              <SectionTitle title="Pick your kit, pod, and experience pass." copy="Choose what feels easiest to start with this week." />
              <Picker title="Kit" icon={<Package className="size-5" />} options={kits} value={selectedKit} onChange={setSelectedKit} />
              <Picker title="Pods" icon={<Leaf className="size-5" />} options={pods} value={selectedPod} onChange={setSelectedPod} />
              <Picker title="Pass" icon={<Ticket className="size-5" />} options={passes} value={selectedPass} onChange={setSelectedPass} />
              <Button variant="hero" size="xl" className="w-full" onClick={() => setStep("week")}>Start first week</Button>
            </section>
          )}

          {step === "week" && (
            <section className="space-y-6 px-5 py-7">
              <div className="rounded-[2rem] bg-olive p-6 text-olive-foreground shadow-float">
                <CalendarDays className="mb-5 size-8" />
                <SectionTitle title="Week one starts gently." copy="Your care plan, coach note, kit, pod, and pass are lined up." />
              </div>
              <div className="grid gap-3">
                {["Tonight: settle your sleep window", "Tomorrow: coach check-in", "This week: join your pod", "Anytime: book your pass"].map((item) => (
                  <div key={item} className="rounded-3xl bg-card p-5 shadow-card"><p className="font-medium">{item}</p></div>
                ))}
              </div>
              <Button variant="hero" size="xl" className="w-full" onClick={() => setStep("home")}>Go to Home</Button>
            </section>
          )}

          {step === "home" && (
            <section className="space-y-6 px-5 pb-8 pt-6">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-muted-foreground">Good morning</p><h1 className="font-display text-4xl">Your month is live.</h1></div>
                <button onClick={() => setStep("care")} className="rounded-full bg-secondary p-3 text-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageCircle className="size-5" /></button>
              </div>
              <div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float">
                <p className="text-sm opacity-80">Current pathway</p>
                <h2 className="mt-2 font-display text-3xl">{pathway.title}</h2>
                <p className="mt-4 leading-7 opacity-85">Today is simple: protect your evening, send your coach one note, and keep your kit nearby.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Metric label="Progress" value="18%" />
                <Metric label="Unlocks" value="7" />
              </div>
              <SoftCard onClick={() => setStep("future")}>
                <p className="font-display text-2xl">Future unlocks</p>
                <p className="mt-2 text-sm text-muted-foreground">See what may open after week one.</p>
              </SoftCard>
            </section>
          )}

          {step === "wallet" && <WalletScreen pathwayTitle={pathway.title} onFuture={() => setStep("future")} />}
          {step === "future" && <FutureScreen />}
          {step === "pathways" && <PathwaysScreen onStart={() => setStep("goal")} />}
          {step === "care" && <CareScreen />}
        </div>

        <nav className="absolute bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-border/80 bg-shell/95 px-2 py-2 backdrop-blur-xl">
          <NavItem icon={<Home className="size-5" />} label="Home" active={step === "home"} onClick={() => setStep("home")} />
          <NavItem icon={<Leaf className="size-5" />} label="Pathways" active={step === "pathways"} onClick={() => setStep("pathways")} />
          <NavItem icon={<CalendarDays className="size-5" />} label="Plan" active={["built", "unlocks", "confirm", "builder", "week"].includes(step)} onClick={() => setStep(answers.length ? "built" : "goal")} />
          <NavItem icon={<MessageCircle className="size-5" />} label="Care" active={step === "care"} onClick={() => setStep("care")} />
          <NavItem icon={<Wallet className="size-5" />} label="Wallet" active={step === "wallet"} onClick={() => setStep("wallet")} />
        </nav>
      </div>
    </main>
  );
}

function Picker({ title, icon, options, value, onChange }: { title: string; icon: React.ReactNode; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-accent">{icon}<p className="font-display text-2xl text-foreground">{title}</p></div>
      <div className="grid gap-3">
        {options.map((option) => (
          <button key={option} onClick={() => onChange(option)} className={cn("rounded-3xl border p-4 text-left shadow-card transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === option ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:-translate-y-0.5")}>
            <span className="flex items-center justify-between gap-3"><span>{option}</span>{value === option && <Check className="size-4" />}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-4xl">{value}</p></div>;
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={cn("flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground")}>{icon}<span>{label}</span></button>;
}

function WalletScreen({ pathwayTitle, onFuture }: { pathwayTitle: string; onFuture: () => void }) {
  return (
    <section className="space-y-6 px-5 py-7">
      <SectionTitle title="Wallet / progress" copy="A simple view of what is active, used, and opening next." />
      <div className="rounded-[2rem] bg-card p-6 shadow-float">
        <p className="text-sm text-muted-foreground">Active month</p>
        <h2 className="mt-2 font-display text-3xl">{pathwayTitle}</h2>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[38%] rounded-full bg-accent" /></div>
        <p className="mt-3 text-sm text-muted-foreground">38% prepared for week one</p>
      </div>
      {[["Care", "Live"], ["Coach", "Matched"], ["Kit", "Selected"], ["Pods", "Joined"], ["Pass", "Ready"]].map(([a, b]) => <div key={a} className="flex items-center justify-between rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-xl">{a}</p><span className="rounded-full bg-secondary px-3 py-1 text-sm text-accent">{b}</span></div>)}
      <Button variant="soft" size="xl" className="w-full" onClick={onFuture}>View future unlocks</Button>
    </section>
  );
}

function FutureScreen() {
  return (
    <section className="space-y-6 px-5 py-7">
      <SectionTitle title="Future unlocks" copy="These stay quiet until they are useful for you." />
      {["Deeper answers", "Rider support", "Device-ready tracking", "Partner experiences"].map((item) => (
        <div key={item} className="rounded-3xl border border-border bg-secondary p-5 text-muted-foreground shadow-card">
          <Lock className="mb-3 size-5" />
          <p className="font-display text-2xl text-foreground">{item}</p>
          <p className="mt-2 text-sm">Potentially available after your first check-in.</p>
        </div>
      ))}
    </section>
  );
}

function PathwaysScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="space-y-6 px-5 py-7">
      <SectionTitle title="Explore pathways" copy="Each starts focused and grows only when it helps." />
      {previewCards.map((card) => (
        <SoftCard key={card.title} onClick={onStart}>
          <h2 className="font-display text-2xl">{card.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Best for {card.bestFor}</p>
          <div className="mt-4 grid gap-2 text-sm"><span className="text-foreground">First: {card.firstUnlock}</span><span className="text-muted-foreground">Later: {card.futureUnlock}</span></div>
        </SoftCard>
      ))}
    </section>
  );
}

function CareScreen() {
  return (
    <section className="space-y-6 px-5 py-7">
      <SectionTitle title="Coach" copy="Ask for help choosing, swapping, or starting gently." />
      <div className="rounded-[2rem] bg-card p-5 shadow-float">
        <div className="mb-4 flex items-center gap-3"><div className="rounded-full bg-rose p-3 text-rose-foreground"><Moon className="size-5" /></div><div><p className="font-display text-xl">Mara</p><p className="text-sm text-muted-foreground">Your Stretch coach</p></div></div>
        <p className="leading-7 text-muted-foreground">I can help you keep the plan, swap one thing, or make week one feel lighter.</p>
      </div>
      {["Can we make my first week easier?", "I want to swap my kit", "What should I do tonight?"].map((prompt) => <button key={prompt} className="w-full rounded-3xl bg-secondary p-4 text-left font-medium shadow-card transition-smooth hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{prompt}</button>)}
    </section>
  );
}
