import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ClipboardList,
  Home,
  Info,
  Leaf,
  Lock,
  MessageCircle,
  Moon,
  Package,
  RefreshCw,
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
  | "explainer"
  | "quiz"
  | "built"
  | "swap"
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
    title: "Glow + Skin Rhythm",
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
    title: "Brain + Focus",
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
const lockedCards = ["Fertility / IVF", "Surgery Track", "full GLP route", "advanced riders"];
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
type StackStatus = "Included" | "Recommended" | "Swap available" | "Locked preview" | "Pack-only" | "Rider-only";
type MonthBlock = { name: string; selection: string; why: string; status: StackStatus; includes: string; plain: string; discovery: string; alternatives?: string[]; change?: string; swappable?: boolean };
type DemoTile = { column: string; name: string; what: string; where: string; pathways: string; status: string };
type CatalogOption = { name: string; state?: string };
type ControlledSwap = { name: string; current: string; why: string; includes: string; alternatives: string[]; change: string; action: string };
const rebalanceOptions = ["more sleep support", "more energy support", "more glow / visible vitality", "more mood support", "more movement support", "less intensity this month"];
const pathwayKeyFromTitle = (pathway: Pathway): PathwayKey => pathwayKeys.find((key) => pathways[key].title === pathway.title) || "peri";
const pathwayDefaults: Record<PathwayKey, Record<string, string>> = {
  peri: {
    Specialist: "peri-aware OB-GYN / women’s health / IM / Endo routing",
    "Functional Care": "cooling / sleep reset workshop or acupuncture or mobility / physio, based on quiz",
    Coaching: "sleep routine + symptom routine",
    "Mental Support": "Mood Check + Micro-CBT",
    "Clinical / LED / Review": "recovery review or 30-minute clinic LED",
    Labs: "CBC, ferritin, TSH / FT4, HbA1c, Vitamin D, lipids",
    Pods: "Peri Reset Pod + Sleep Reset Pod",
    "Experience Pass": "cooling / sleep reset workshop or breathwork reset or red-light recovery",
    Kit: "magnesium, omega-3, D3+K2 if indicated, sleep kit, collagen, electrolytes, HA-ceramide, pantry support",
    Packs: "Sleep Reset Pack",
    "Future Unlocks": "Smart Ring, LED Mask, PeriShield Rx, Nutrition Rider, Skin/Hair Rider, Prevention/Cardio Rider",
  },
  endo: {
    Specialist: "OB-GYN / Endo-aware gyne",
    "Functional Care": "pelvic-floor PT or pelvic relaxation / breathwork",
    Coaching: "flare map + pacing plan",
    "Mental Support": "pain psychology micro-support + Mood Check",
    "Clinical / LED / Review": "recovery review, LED relax, or documentation review",
    Labs: "CBC, ferritin, Vitamin D, B12 conditional, TVUS support",
    Pods: "Endo Toolkit Pod + GI / Function Support Pod",
    "Experience Pass": "pelvic relaxation / breathwork or restorative yoga or pain-aware movement",
    Kit: "omega-3, magnesium, broths, heat patches, ginger / peppermint support, GI-safe support",
    Packs: "Endo Relief Burst Pack",
    "Future Unlocks": "Endo Relief Burst Pack, EndoShield, TVUS confirmation, Surgery Track, IVF Bridge",
  },
  metabo: {
    Specialist: "dermatology review",
    "Functional Care": "LED booth if glow-led; RDN if metabolic-lite-led",
    Coaching: "glow routine + hydration + meal timing",
    "Mental Support": "body image / stress if relevant",
    "Clinical / LED / Review": "quick derm review or Glow Token accrual",
    Labs: "selective mini-check only if metabolic-lite flags",
    Pods: "Skin Sunday Pod + Insight Night / Metabolic Drift Lite Pod",
    "Experience Pass": "LED booth or aftercare workshop or Pilates / Barre intro",
    Kit: "SPF, HA, vitamin C, niacinamide / azelaic / ceramide, underarm AHA, one fiber or protein mini",
    Packs: "Derma Actives Pack or Camera-Ready Sprint",
    "Future Unlocks": "Derma Actives Pack, Camera-Ready Sprint, Procedure Token Booster, LED Mask, DermaShield+",
  },
  longevity: {
    Specialist: "longevity-oriented IM review",
    "Functional Care": "breathwork / recovery or strength + VO2 prep",
    Coaching: "focus / workday / caffeine / meal timing setup",
    "Mental Support": "Mood Check + Micro-CBT if stress or sleep-linked brain fog",
    "Clinical / LED / Review": "recovery review, body-composition review, or clinic LED / red-light",
    Labs: "First rotation: HbA1c, lipids, ApoB; second rotation: hs-CRP, Vitamin D, ferritin; third rotation: TSH / FT4, Lp(a) if family history",
    Pods: "Brain & Focus Pod + Executive Performance & Travel Pod",
    "Experience Pass": "breathwork reset, Biopeak intro group talk, movement-compliance session, red-light",
    Kit: "foundational support, pantry / snack tool, powder, nootropic, pulse stack, visible vitality, Swap available",
    Packs: "Brain Sprint or Nootropic Builder",
    "Future Unlocks": "Brain Sprint, Nootropic Builder, Executive Jet Lag, Smart Ring, Longevity Lab Rider, NeuroSleep Rider",
  },
};
const blockWhy: Record<string, string> = {
  Specialist: "This route is bounded so care stays safe for your pattern.",
  "Functional Care": "This is the strongest monthly support to start with based on your quiz.",
  Coaching: "Your coaching emphasis follows the chosen pods and rebalancing preference.",
  "Mental Support": "This keeps the month doable without making you rebuild care yourself.",
  "Clinical / LED / Review": "One review route creates a safe next-step loop before bigger unlocks.",
  Labs: "Diagnostics stay guided and are not casual swaps.",
  Pods: "Two seats give you a primary pathway pod plus one support pod.",
  "Experience Pass": "One monthly pass gives the plan a tangible recovery or movement moment.",
  Kit: "The kit supports the plan at home, with one safe item swap by default.",
  Packs: "Packs are previews or pack-only options, not day-one marketplace choices.",
  "Future Unlocks": "Devices and riders appear later as Locked, Preview, Eligible, or Active.",
};
const blockPlain: Record<string, { plain: string; discovery: string }> = {
  Specialist: { plain: "Specialist access means the right human expert reviews your pattern and decides what is safe to do next.", discovery: "This is your clinical guardrail, not another appointment to figure out alone." },
  "Functional Care": { plain: "Functional care is the hands-on session, workshop, or recovery visit that helps your body feel better this month.", discovery: "It turns the plan into something you can feel in week one." },
  Coaching: { plain: "Coaching turns your plan into a simple weekly routine, with help adjusting sleep, food, stress, movement, or symptoms.", discovery: "Your coach keeps the month light, realistic, and personal." },
  "Mental Support": { plain: "Mental support gives you small tools for mood, pain, stress, or follow-through without making this feel like therapy homework.", discovery: "It protects your energy so the plan is easier to complete." },
  "Clinical / LED / Review": { plain: "This is a focused review or in-clinic support moment when your plan needs an expert check or visible recovery boost.", discovery: "It helps Stretch decide whether to stay simple or open a deeper route." },
  Labs: { plain: "Labs are guided checks that help explain fatigue, inflammation, hormones, metabolism, or recovery when they matter.", discovery: "They appear when useful, not as a random shopping list." },
  Pods: { plain: "Pods are small guided sessions with people working on the same kind of month, led around a specific goal.", discovery: "Each pod gives you a checklist, a rhythm, and a reason to keep going." },
  "Experience Pass": { plain: "Your pass is one bookable experience, such as recovery, movement, breathwork, LED, or a workshop.", discovery: "It makes the month feel like care, not admin." },
  Kit: { plain: "Your kit is the at-home support that matches your plan, such as sleep, comfort, skin, pantry, or focus items.", discovery: "It gives you something tangible to use between coach and pod moments." },
  Packs: { plain: "Packs are optional next-step bundles that may unlock after progress, coach review, or a specific need.", discovery: "They stay out of the way until they are the strongest next move." },
  "Future Unlocks": { plain: "Future unlocks are locked previews like devices, riders, advanced labs, or bigger care routes.", discovery: "You can see what may open later without being pushed into it today." },
};
const buildMonthStack = (pathway: Pathway): MonthBlock[] => {
  const key = pathwayKeyFromTitle(pathway);
  const d = pathwayDefaults[key];
  const block = (name: string, selection: string, status: StackStatus, swappable: boolean): MonthBlock => ({
    name,
    selection,
    why: blockWhy[name],
    status,
    includes: selection,
    plain: blockPlain[name].plain,
    discovery: blockPlain[name].discovery,
    swappable,
  });
  return [
    block("Specialist", d.Specialist, "Included", true),
    block("Functional Care", d["Functional Care"], "Recommended", true),
    block("Coaching", d.Coaching, "Included", false),
    block("Mental Support", d["Mental Support"], "Included", false),
    block("Clinical / LED / Review", d["Clinical / LED / Review"], "Recommended", true),
    block("Labs", d.Labs, "Locked preview", false),
    block("Pods", d.Pods, "Included", true),
    block("Experience Pass", d["Experience Pass"], "Recommended", true),
    block("Kit", d.Kit, "Recommended", true),
    block("Packs", d.Packs, "Pack-only", false),
    block("Future Unlocks", d["Future Unlocks"], "Rider-only", false),
  ];
};

const planPlain: Record<string, { plain: string; discovery: string }> = {
  Care: { plain: "The right expert route, body support, and only the labs that matter.", discovery: "Clear next steps without shopping for care." },
  Coach: { plain: "A real person helps turn the month into simple weekly moves.", discovery: "Less guessing. More gentle follow-through." },
  Pods: { plain: "Small guided circles for the thing you are working on now.", discovery: "A rhythm, a checklist, and people moving with you." },
  "Experience Pass": { plain: "One bookable reset: movement, breathwork, recovery, LED, or a workshop.", discovery: "A moment in the real world, not another task." },
  Kit: { plain: "A small at-home set matched to sleep, comfort, skin, pantry, recovery, or focus.", discovery: "Something you can actually use between sessions." },
  Unlocks: { plain: "Packs, devices, deeper labs, and add-ons that may open later.", discovery: "Preview the path without being pushed into it today." },
};

const buildPlanCards = (pathway: Pathway): MonthBlock[] => {
  const stack = buildMonthStack(pathway);
  const byName = Object.fromEntries(stack.map((block) => [block.name, block]));
  const card = (name: keyof typeof planPlain, selection: string, status: StackStatus, includes: string, swappable: boolean): MonthBlock => ({
    name,
    selection,
    status,
    includes,
    swappable,
    why: name === "Unlocks" ? "These stay gated so the month stays focused and safe." : "Stretch pre-built this piece from your pathway so you are not starting from scratch.",
    plain: planPlain[name].plain,
    discovery: planPlain[name].discovery,
  });
  return [
    card("Care", byName.Specialist.selection, "Included", [byName.Specialist.includes, byName["Functional Care"].includes, byName["Clinical / LED / Review"].includes, byName.Labs.includes].join(" • "), true),
    card("Coach", byName.Coaching.selection, "Included", [byName.Coaching.includes, byName["Mental Support"].includes, "coaching linked to your selected pod"].join(" • "), false),
    card("Pods", byName.Pods.selection, "Included", [byName.Pods.includes, "agenda + outputs included"].join(" • "), true),
    card("Experience Pass", byName["Experience Pass"].selection, "Recommended", [byName["Experience Pass"].includes, "Tier-Low included • Tier-High may be inventory-gated"].join(" • "), true),
    card("Kit", byName.Kit.selection, "Recommended", [byName.Kit.includes, "one swap option • pack / top-up preview when relevant"].join(" • "), true),
    card("Unlocks", byName["Future Unlocks"].selection, "Locked preview", [byName.Packs.includes, byName["Future Unlocks"].includes, "MBC progress"].join(" • "), false),
  ];
};

const demoTiles: DemoTile[] = ["Care", "Coach", "Labs", "Pods", "Experience", "Kit", "Unlocks"].flatMap((column) => [
    { column, name: `${column} core`, what: `The main ${column.toLowerCase()} piece selected for this month.`, where: "Your Month Stack and pathway dashboards", pathways: "Peri Sleep + Energy, Endo Flare + Function, Glow + Skin Rhythm, Brain + Focus", status: column === "Unlocks" ? "Milestone unlock" : "Included" },
  { column, name: `${column} advanced`, what: `${column} advanced shows the operator logic: safe swaps, gated previews, inventory limits, or clinician review before a bigger step opens.`, where: "Demo mode and detail drawers", pathways: "Pathway-dependent", status: ["Labs", "Unlocks"].includes(column) ? "Clinician-gated" : "Swap available" },
]);


const specialistCatalog = ["Peri-aware OB-GYN / women’s health review", "OB-GYN / Endo-aware gyne", "Dermatologist", "Trichologist / derm-tricho review", "Endocrinologist / internal medicine", "Longevity-oriented internal medicine review", "GI specialist, only if GI overlap is flagged", "Fertility / REI specialist, locked preview unless fertility pathway is active"];
const functionalCatalog = ["RDN consult", "mobility / physio session", "Pilates / Barre seat", "acupuncture for stress / sleep / recovery", "clinic LED / red-light session", "recovery coaching", "pelvic-floor PT", "pain-aware Pilates / movement", "breathwork reset", "strength + VO2 prep", "movement-compliance micro-session", "cooling / sleep reset workshop"];
const coachingCatalog = ["sleep routine coaching", "symptom routine coaching", "food cadence coaching", "strength routine coaching", "pain pacing coaching", "flare map coaching", "metabolic habits coaching", "glow routine coaching", "focus / workday design coaching", "adherence coaching", "partner task / family support coaching", "procedure / clinic prep coaching"];
const mentalCatalog = ["Mood Check", "Micro-CBT", "pain psychology micro-support", "CBT-i / anxiety support", "body image / stress support", "binge trigger / stress-eating support", "performance / identity stress support", "full mental-health session, quarterly or pack-based"];
const reviewCatalog = ["recovery review", "body-composition review", "visible-aging / derm-aging review", "30-minute in-clinic LED for face", "30-minute in-clinic LED for body", "30-minute in-clinic LED for hair / scalp", "quick derm review", "tricho review", "clinic LED relax", "symptom documentation review / doctor export", "Glow Token accrual", "Scalp Token accrual", "Back Facial / Body Acne Token, Locked unless body-acne path active", "procedure token redemption, milestone / pack-gated"];
const diagnosticsCatalog: Record<PathwayKey, string[]> = {
  peri: ["Included: CBC, ferritin, TSH / FT4, HbA1c, Vitamin D, lipids", "Selective: B12 / folate, magnesium, metabolic repeats"],
  endo: ["Included: CBC, ferritin, Vitamin D, B12 conditional, TVUS support", "GI selective: stool calprotectin, celiac tTG-IgA, H. pylori selective", "MRI: Locked / pre-auth / rider-supported if indicated"],
  metabo: ["Selective metabolic mini-check only if metabolic-lite flags it", "Optional: HbA1c, fasting glucose, lipids, ALT / AST, CBC baseline"],
  longevity: ["First rotation: HbA1c, lipids, ApoB", "Second rotation: hs-CRP, Vitamin D, ferritin", "Third rotation: TSH / FT4, Lp(a) if family history", "Advanced add-ons: DNA methylation, CAC, DEXA, fasting insulin / HOMA-IR, homocysteine, microbiome"],
};
const podCatalog = ["Peri Reset Pod", "Sleep Reset Pod", "Mood / Fog Pod", "Metabolic Drift Pod", "Skin / Hair Pod", "Bone / Joint Pod", "Endo Toolkit Pod", "GI / Function Support Pod", "Pain Pacing Pod", "Fatigue Support Pod", "Skin Sunday Pod", "Insight Night / Metabolic Drift Lite Pod", "Brain & Focus Pod", "Executive Performance & Travel Pod", "Healthspan Lab Pod"];
const podAgendas: Record<string, string> = {
  "Peri Reset Pod": "Hot flashes, night sweats, sleep disruption, mood, brain fog, strength and joint changes. Outputs: 2-week reset plan, ask-your-gyn script, symptom checklist.",
  "Sleep Reset Pod": "Waking at night, wind-down routine, light and temperature, caffeine timing, sleep regularity. Outputs: 14-day sleep reset checklist, night waking action plan.",
  "Mood / Fog Pod": "Irritability, anxiety, cognitive load, brain fog, meeting-day coping. Outputs: mood/fog routine, recovery pacing plan.",
  "Metabolic Drift Pod": "Weight drift, cravings, HbA1c / lipids, meal structure, strength routine. Outputs: appetite rhythm plan, protein / pantry checklist.",
  "Skin / Hair Pod": "Skin dryness, hair shedding, collagen, HA-ceramide, LED / routine support. Outputs: 3-step visible vitality routine.",
  "Bone / Joint Pod": "Joint pain, stiffness, posture, strength, bone support. Outputs: mobility ladder, strength-first checklist.",
  "Endo Toolkit Pod": "Flare diary, pain pacing, pelvic relaxation, GI symptoms, doctor note export. Outputs: flare plan checklist, weekly missions, MBC target.",
  "GI / Function Support Pod": "Bloating, constipation, function days, food tolerability, flare pattern. Outputs: GI support plan, function restoration checklist.",
  "Pain Pacing Pod": "Pain windows, movement pacing, flare day support, rest scheduling. Outputs: flare pacing plan.",
  "Fatigue Support Pod": "Sleep, ferritin / B12 questions, energy conservation, work functioning. Outputs: fatigue map, support checklist.",
  "Skin Sunday Pod": "Regimen audit, acne / pigment logic, aftercare, LED / actives. Outputs: 3-step skin routine.",
  "Insight Night / Metabolic Drift Lite Pod": "Energy, glucose, meal timing, cravings, strength adherence. Outputs: 14-day metabolic-lite plan.",
  "Brain & Focus Pod": "Focus duration, cognitive fatigue, caffeine timing, nootropic basics, workday design. Outputs: focus plan, caffeine / meal timing plan.",
  "Executive Performance & Travel Pod": "Jet lag, calendar load, travel food, hydration, crash points. Outputs: travel / workday recovery plan.",
  "Healthspan Lab Pod": "ApoB, hs-CRP, biomarkers, prevention timing, sleep / strength patterns. Outputs: 90-day healthspan action plan.",
};
const passCatalog: Record<PathwayKey, string[]> = {
  peri: ["cooling / sleep reset workshop", "joint mobility primer", "dryness care routine workshop", "restorative yoga", "breathwork reset"],
  endo: ["pelvic relaxation + flare pacing", "gentle Pilates flow", "flare day plan", "restorative yoga", "pain-aware movement"],
  metabo: ["aftercare coaching", "at-home LED routine coaching", "acne-safe routine workshop", "skin routine demo", "LED booth where inventory allows", "Pilates / Barre intro"],
  longevity: ["breathwork reset", "mobility micro-class", "HRV routine", "movement-compliance session", "Biopeak intro group talk"],
};
const highTierPasses = ["Longefit cold plunge", "sauna / contrast", "Biopeak red-light", "facility breathwork", "clinic red-light recovery", "small-group strength", "in-clinic LED recovery", "pelvic PT group", "pain-aware reformer", "in-clinic LED booth add-on", "post-facial recovery", "camera-ready skin prep", "glow / derm partner demo"];
const stickyPerks = ["Friend Pod Pass", "Masterclass Access", "Partner Demo", "Pop-Up Event Access", "Step / Stretch Challenge", "Tonic-Bar Visit", "Broth / Nourish Circle Moment", "Recovery Facility Prompt", "Premium Workshop Invite"];
const kitCatalog: Record<PathwayKey, string[]> = {
  peri: ["magnesium", "omega-3", "D3+K2", "sleep kit", "collagen", "electrolyte", "HA-ceramide", "pantry support"],
  endo: ["omega-3", "magnesium", "broths", "heat patches", "ginger / peppermint support", "GI-safe swap", "anti-inflammatory box"],
  metabo: ["SPF", "HA", "vitamin C", "niacinamide", "azelaic", "ceramide", "underarm AHA", "fiber mini", "protein mini"],
  longevity: ["foundational supplement pick", "pantry / snack tool", "powder pick", "nootropic pick", "longevity pulse stack", "visible-vitality pick", "Swap available"],
};
const packsCatalog: Record<PathwayKey, string[]> = {
  peri: ["Sleep Reset Pack", "Mood / Fog Pack", "Metabolic Drift Pack", "Skin & Hair Pack"],
  endo: ["Endo Relief Burst Pack", "Surgery Track preview", "Endo→IVF Bridge preview"],
  metabo: ["Derma Actives Pack", "Camera-Ready Sprint", "Protein & Pantry Pack", "Procedure Token Booster", "Hair Actives Pack", "Hair Shedding Guard", "GLP packs locked unless GLP route active"],
  longevity: ["Brain Sprint Pack", "Nootropic Builder Pack", "Executive Jet Lag Pack", "Recovery Contrast Pack", "BioAge Test Pack", "CAC / Cardio Screen Pack", "DEXA / Bone Screen Pack"],
};
const futureCatalog = ["Smart Ring", "LED Mask", "CGM", "Oura-style ring", "home LED / red-light where relevant", "PeriShield Rx", "Nutrition Rider", "Skin / Hair Longevity Rider", "Prevention / Cardio Rider", "EndoShield Rider", "Endo OPD + Diagnostics Rider", "DermaShield+", "MetaboRx", "Longevity Lab Rider", "NeuroSleep Rider", "Bone & Screening Rider"];
const statusFor = (index: number, state = "Swap available") => index === 0 ? "Recommended" : state;
const opt = (names: string[], states?: string[]) => names.map((name, i) => ({ name, state: states?.[i] || (i === 0 ? "Recommended" : "Swap available") }));
const pathwaySwapCatalog: Record<PathwayKey, Record<string, { rule: string; options: CatalogOption[]; agenda?: string }>> = {
  peri: {
    Specialist: { rule: "Can swap to IM / metabolic review if metabolic drift is selected. Skin-hair derm review only if Skin / Hair support is selected.", options: opt(["peri-aware OB-GYN / women’s health / IM / Endo routing", "IM / metabolic review", "skin-hair derm review"], ["Recommended", "Clinician-gated", "Clinician-gated"]) },
    "Functional Care": { rule: "Can swap between the bounded monthly functional options.", options: opt(["cooling / sleep reset workshop", "mobility / physio", "Pilates / Barre", "acupuncture", "clinic LED / red-light", "RDN"], ["Recommended", "Swap available", "Swap available", "Swap available", "Inventory-gated", "Swap available"]) },
    Pods: { rule: "Peri Reset Pod stays primary. Sleep Reset Pod can swap to one support pod.", options: opt(["Peri Reset Pod", "Sleep Reset Pod", "Mood / Fog Pod", "Metabolic Drift Pod", "Skin / Hair Pod", "Bone / Joint Pod"], ["Recommended", "Included", "Swap available", "Swap available", "Swap available", "Swap available"]), agenda: podAgendas["Peri Reset Pod"] },
    "Experience Pass": { rule: "Breathwork can swap to a bounded Peri pass.", options: opt(["breathwork reset", "cooling workshop", "restorative mobility", "clinic red-light", "small-group strength"], ["Recommended", "Swap available", "Swap available", "Inventory-gated", "Off-peak only"]) },
    Kit: { rule: "One monthly swap only. D3+K2 appears only if appropriate.", options: opt(["magnesium ↔ electrolytes", "collagen ↔ HA-ceramide", "sleep tea ↔ calming tea", "D3+K2 only if appropriate", "Friend Pod Pass", "Masterclass", "Partner Demo", "Step / Stretch Challenge"], ["Swap available", "Swap available", "Swap available", "Clinician-gated", "Swap available", "Swap available", "Swap available", "Swap available"]) },
  },
  endo: {
    Specialist: { rule: "GI specialist only if GI red flags. Fertility / REI stays Locked preview.", options: opt(["OB-GYN / Endo-aware gyne", "GI specialist", "Fertility / REI specialist"], ["Recommended", "Clinician-gated", "Locked preview"]) },
    "Functional Care": { rule: "Pelvic-floor PT can swap only to bounded pain-aware Includeds.", options: opt(["pelvic-floor PT", "acupuncture", "pain-aware Pilates / mobility", "recovery movement"], ["Recommended", "Swap available", "Swap available", "Swap available"]) },
    Pods: { rule: "Endo Toolkit Pod stays primary. GI / Function Support can swap to one support pod.", options: opt(["Endo Toolkit Pod", "GI / Function Support Pod", "Pain Pacing Pod", "Fatigue Support Pod"], ["Recommended", "Included", "Swap available", "Swap available"]), agenda: podAgendas["Endo Toolkit Pod"] },
    "Experience Pass": { rule: "Pelvic relaxation can swap within Endo-safe passes.", options: opt(["pelvic relaxation / breathwork", "gentle Pilates flow", "flare day plan", "restorative yoga", "breathwork"], ["Recommended", "Swap available", "Swap available", "Swap available", "Swap available"]) },
    Kit: { rule: "Pick one comfort trade. Anything tied to labs stays protected.", options: opt(["Anti-inflammatory support", "Warmth + comfort", "Ginger or peppermint tea", "GI fiber support", "Iron support"], ["Swap available", "Swap available", "Swap available", "Clinician-gated", "Clinician-gated"]) },
  },
  metabo: {
    Specialist: { rule: "Derm can swap to IM / metabolic review if metabolic overlay is active. Tricho appears if hair Included is added.", options: opt(["dermatology review", "IM / metabolic review", "tricho review"], ["Recommended", "Clinician-gated", "Clinician-gated"]) },
    "Functional Care": { rule: "LED booth can swap to bounded glow or metabolic-lite Includeds.", options: opt(["LED booth", "RDN", "Pilates / Barre", "mobility", "acupuncture", "recovery coaching"], ["Recommended", "Swap available", "Swap available", "Swap available", "Swap available", "Swap available"]) },
    Pods: { rule: "Insight Night can swap to Hair Lab if hair concern is added. Skin Sunday can swap to Cravings & Calm only if adherence or body image issue is selected.", options: opt(["Skin Sunday Pod", "Insight Night / Metabolic Drift Lite Pod", "Hair Lab", "Cravings & Calm"], ["Recommended", "Included", "Clinician-gated", "Clinician-gated"]), agenda: podAgendas["Skin Sunday Pod"] },
    "Experience Pass": { rule: "LED booth can swap to a bounded MetaboGlow pass.", options: opt(["LED booth", "aftercare workshop", "acne-safe routine", "Pilates / Barre intro", "skin routine demo"], ["Recommended", "Swap available", "Swap available", "Swap available", "Swap available"]) },
    Kit: { rule: "One item swap. Full-size actives require Derma Actives Pack; procedures require tokens; LED Mask is Milestone unlock; DermaShield+ is Preview; MetaboRx Locked preview.", options: opt(["SPF ↔ HA", "vitamin C ↔ niacinamide", "azelaic ↔ ceramide", "underarm AHA ↔ salicylic wash", "fiber mini ↔ protein mini", "full-size actives", "procedures", "LED Mask", "DermaShield+", "MetaboRx"], ["Swap available", "Swap available", "Swap available", "Swap available", "Swap available", "Pack-only", "Milestone unlock", "Milestone unlock", "Preview", "Locked preview"]) },
  },
  longevity: {
    Specialist: { rule: "IM can swap to metabolic review, sleep / recovery review, or derm-adjacent review if visible vitality is active.", options: opt(["longevity-oriented IM review", "metabolic review", "sleep / recovery review", "derm-adjacent review"], ["Recommended", "Swap available", "Swap available", "Clinician-gated"]) },
    "Functional Care": { rule: "Breathwork / recovery can swap to bounded longevity Includeds.", options: opt(["breathwork / recovery", "strength + VO2 prep", "RDN", "mobility", "Biopeak-style recovery / red-light"], ["Recommended", "Swap available", "Swap available", "Swap available", "Inventory-gated"]) },
    Pods: { rule: "Brain & Focus stays primary. Executive Performance can swap if fatigue or sleep dominates.", options: opt(["Brain & Focus Pod", "Executive Performance & Travel Pod", "Healthspan Lab Pod", "Sleep & Recovery"], ["Recommended", "Included", "Swap available", "Clinician-gated"]), agenda: podAgendas["Brain & Focus Pod"] },
    "Experience Pass": { rule: "Breathwork reset can swap to bounded recovery and movement options.", options: opt(["breathwork reset", "movement-compliance", "Biopeak intro", "red-light", "mobility micro-class"], ["Recommended", "Swap available", "Swap available", "Inventory-gated", "Swap available"]) },
    Kit: { rule: "Pick one focus or vitality lane. Advanced testing and devices stay locked until they make sense.", options: opt(["Daily foundation", "Pantry support", "Powder support", "Focus support", "Pulse stack", "Visible vitality", "Sticky perk", "Advanced tests + devices"], ["Swap available", "Swap available", "Swap available", "Swap available", "Swap available", "Recommended", "Swap available", "Locked preview"]) },
  },
};

const controlledSwapOptions = (pathway: Pathway, reason: string): ControlledSwap[] => {
  const key = pathwayKeyFromTitle(pathway);
  const d = pathwayDefaults[key];
  const podChoices: Record<PathwayKey, string[]> = {
    peri: ["Mood / Fog Pod", "Metabolic Drift Pod", "Skin / Hair Pod"],
    endo: ["GI / Function Support Pod", "Pain Pacing Pod", "Fatigue Support Pod"],
    metabo: ["Insight Night Pod", "Hair Lab Pod", "Cravings & Calm Pod"],
    longevity: ["Executive Performance Pod", "Healthspan Lab Pod", "Sleep & Recovery Pod"],
  };
  const passChoices: Record<PathwayKey, string[]> = {
    peri: ["Breathwork Reset", "Restorative Mobility", "Clinic Red-Light if available"],
    endo: ["Restorative Yoga", "Pain-Aware Movement", "Gentle Pilates Flow"],
    metabo: ["Skin Routine Demo", "Pilates / Barre Intro", "LED Booth if available"],
    longevity: ["Mobility Micro-Class", "Movement-Compliance Session", "Red-Light if available"],
  };
  return [
    { name: "Care route", current: d.Specialist, why: reason, includes: "Specialist routing, safe review, and clear next steps.", alternatives: ["Internal medicine review", "Derm review if relevant", "Coach asks clinician first"], change: "Your expert route changes. Labs, riders, prescriptions, and pathway identity stay protected.", action: "Swap care route" },
    { name: "Functional session", current: d["Functional Care"], why: reason, includes: "One hands-on or guided body-support session for this month.", alternatives: ["Breathwork reset", "Restorative mobility", "Acupuncture or recovery support"], change: "Your session changes, but your core care plan and coach rhythm stay the same.", action: "Swap session" },
    { name: "Pods", current: d.Pods, why: reason, includes: "Selected pods, agenda, weekly prompts, and outputs.", alternatives: podChoices[key], change: "Your coaching plan and kit recommendations will adjust.", action: "Swap pod" },
    { name: "Experience pass", current: d["Experience Pass"], why: reason, includes: "One bookable pass. Tier-Low is included; Tier-High may depend on availability.", alternatives: passChoices[key], change: "Your pass booking changes, but your care plan remains the same.", action: "Swap pass" },
    { name: "Kit item", current: d.Kit, why: reason, includes: "At-home support matched to your month, with one safe item swap.", alternatives: ["Electrolytes", "Collagen mini", "HA-ceramide support"], change: "Your kit changes, but your coach plan remains the same.", action: "Swap kit item" },
    { name: "Sticky perk", current: "Friend Pod Pass or Masterclass Access", why: "A small motivational perk can make the month easier to complete.", includes: "One light-touch perk that supports follow-through.", alternatives: stickyPerks.slice(0, 3), change: "Your perk changes. Care, labs, pass, and pathway stay the same.", action: "Swap perk" },
  ];
};
const catalogForBlock = (block: MonthBlock, pathway: Pathway): { rule: string; options: CatalogOption[]; agenda?: string } => {
  const key = pathwayKeyFromTitle(pathway);
  const planCatalog: Record<string, { rule: string; options: CatalogOption[]; agenda?: string }> = {
    Care: {
      rule: "Care combines specialist access, one body-support route, and guided labs when they are useful. You can preview one care swap, but labs and advanced riders stay protected.",
      options: [
        { name: pathwayDefaults[key].Specialist, state: "Specialist access" },
        { name: pathwayDefaults[key]["Functional Care"], state: "Body support" },
        { name: pathwayDefaults[key].Labs, state: "Guided labs" },
      ],
    },
    Coach: {
      rule: "Coaching helps turn the plan into a week-by-week routine and prepares questions for the right human expert when something needs review.",
      options: [
        { name: pathwayDefaults[key].Coaching, state: "This month" },
        { name: pathwayDefaults[key]["Mental Support"], state: "Support layer" },
        { name: "Ask coach before changing care, labs, prescriptions, or advanced unlocks", state: "Safety rule" },
      ],
    },
    Pods: pathwaySwapCatalog[key].Pods,
    Kit: pathwaySwapCatalog[key].Kit,
    "Experience Pass": pathwaySwapCatalog[key]["Experience Pass"],
    Unlocks: {
      rule: "Unlocks are previews only. They open later through progress, coach review, clinical need, inventory, or rider eligibility.",
      options: [
        ...packsCatalog[key].slice(0, 3).map((name, i) => ({ name, state: i === 0 ? "Preview" : "Pack-only" })),
        ...futureCatalog.slice(0, 5).map((name) => ({ name, state: "Locked preview" })),
      ],
    },
  };
  if (planCatalog[block.name]) return planCatalog[block.name];
  const pathwayCatalog = pathwaySwapCatalog[key][block.name];
  if (pathwayCatalog) return pathwayCatalog;
  if (block.name === "Coaching") return { rule: "User does not directly rebuild coaching. Coaching updates based on selected pod and rebalancing preference.", options: coachingCatalog.slice(0, 8).map((name, i) => ({ name, state: i < 2 ? "current emphasis" : "coach-guided" })) };
  if (block.name === "Mental Support") return { rule: "Behavioral Included follows the plan and coach rebalancing; full sessions are quarterly or pack-based.", options: mentalCatalog.map((name, i) => ({ name, state: i < 2 ? "Included" : i === mentalCatalog.length - 1 ? "quarterly / pack-based" : "coach-guided" })) };
  if (block.name === "Clinical / LED / Review") return { rule: "Choose 1 route per month if included. High-cost procedures are Milestone unlock or Pack-only.", options: reviewCatalog.map((name, i) => ({ name, state: i > 10 ? "Locked preview / Pack-only" : i > 5 ? "Milestone unlock" : "Pick 1" })) };
  if (block.name === "Labs") return { rule: "Diagnostics are not casual swaps. They are Included, selective, advanced, or Clinician-gated.", options: diagnosticsCatalog[key].map((name, i) => ({ name, state: i === 0 ? "Included" : "Clinician-gated" })) };
  if (block.name === "Packs") return { rule: "Packs are not active by default; they unlock from progress or need.", options: packsCatalog[key].map((name, i) => ({ name, state: i === 0 ? "Preview" : "Pack-only" })) };
  return { rule: "Riders and devices are not active day 1. States: Locked, Preview, Eligible, Active.", options: futureCatalog.map((name, i) => ({ name, state: i < 2 ? "Preview" : "Locked" })) };
};

const passportStamps: PassportStamp[] = [
  { title: "Plan selected", means: "Your first monthly pathway is confirmed.", complete: "Choose Keep this recommendation or finish the Month Builder.", unlocks: "Your guided first week opens." },
  { title: "Kit built", means: "Your support items are selected for this month.", complete: "Pick your kit defaults and confirm shipping preferences.", unlocks: "Badge only unless configured.", mbc: "complete kit build = badge only unless configured" },
  { title: "Pods selected", means: "Your guided group seats are reserved.", complete: "Choose and join your pod sessions.", unlocks: "+MBC indicator.", mbc: "attend pod = +MBC indicator" },
  { title: "Experience pass booked", means: "Your monthly restorative or movement experience is scheduled.", complete: "Book one available pass this month.", unlocks: "+MBC indicator.", mbc: "book experience pass = +MBC indicator" },
  { title: "First coaching touch done", means: "Your coach has helped set your first routine.", complete: "Complete your first coach check-in.", unlocks: "Adjustment Included for week two." },
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
  const [showBehindScenes, setShowBehindScenes] = useState(false);

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
        <button onClick={() => setShowBehindScenes(true)} className="absolute right-5 top-5 z-40 rounded-full bg-card/90 p-2 text-accent shadow-card backdrop-blur transition-smooth hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="How Stretch works behind the scenes"><Info className="size-5" /></button>
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
          {step === "explainer" && <ExplainerScreen onContinue={() => setStep("quiz")} />}
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
          <NavItem icon={<CalendarDays className="size-5" />} label="Plan" active={["explainer", "built", "unlocks", "confirm", "builder", "week"].includes(step)} onClick={() => setStep(answers.length ? "built" : "goal")} />
          <NavItem icon={<MessageCircle className="size-5" />} label="Care" active={step === "care"} onClick={() => setStep("care")} />
          <NavItem icon={<Wallet className="size-5" />} label="Wallet" active={step === "wallet"} onClick={() => setStep("wallet")} />
        </nav>
        {selectedStamp && <StampDrawer stamp={selectedStamp} onClose={() => setSelectedStamp(null)} />}
        {showBehindScenes && <BehindScenesPanel onClose={() => setShowBehindScenes(false)} />}
      </div>
    </main>
  );
}

function GoalScreen({ setGoal, setStep }: { setGoal: (goal: string) => void; setStep: (step: Step) => void }) {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="What do you want to feel better in 30 days?" copy="Choose the answer that feels closest. Your first month can still be adjusted." /><div className="grid gap-3">{goals.map((item) => <SoftCard key={item} onClick={() => { setGoal(item); setStep("explainer"); }} className="p-4"><span className="flex items-center justify-between gap-3 font-medium"><span>{item}</span><ArrowRight className="size-4 text-accent" /></span></SoftCard>)}</div></section>;
}

function ExplainerScreen({ onContinue }: { onContinue: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const stack = ["Care", "Coach", "Pods", "Pass", "Kit", "Unlocks"];
  const stamps = ["Plan", "MBC", "Device", "Rider", "Next"];
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-hero p-6 shadow-float animate-enter"><div className="mb-4 flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-accent">Before your quiz</p><h1 className="mt-1 font-display text-4xl leading-tight">Stretch builds your month.</h1></div><button onClick={() => setShowTooltip((value) => !value)} className="rounded-full bg-card p-3 text-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Behind the scenes"><Info className="size-5" /></button></div><p className="text-base leading-7 text-muted-foreground">You never start from a blank plan. Stretch turns your answers into a guided monthly care stack you can keep, swap, or review with your coach.</p>{showTooltip && <div className="mt-4 rounded-3xl bg-card p-4 text-sm leading-6 text-muted-foreground shadow-card animate-scale-in">Behind the scenes, Stretch works like a care operating system — it connects the right expert, coach, labs, kit, pod, experience, and future unlocks into one monthly journey.</div>}</div><div className="grid gap-4"><VisualStep number="1" title="Tell us what should feel better" copy="Pick the 30-day outcome that matters most right now."><div className="flex items-center gap-2 overflow-hidden"><div className="grid flex-1 gap-2">{["Sleep", "Energy", "Mood"].map((item) => <span key={item} className="rounded-2xl bg-card px-3 py-2 text-xs font-bold text-accent shadow-card">{item}</span>)}</div><ArrowRight className="size-5 shrink-0 text-accent" /><div className="grid size-20 place-items-center rounded-[1.5rem] bg-primary text-primary-foreground shadow-card"><Sparkles className="size-7" /><span className="text-[10px] font-bold">Stretch</span></div></div></VisualStep><VisualStep number="2" title="Your care stack assembles" copy="Care, coach, pods, pass, kit, and unlocks come together as one roadmap."><div className="relative h-36">{stack.map((item, index) => <div key={item} className="absolute left-1/2 w-[76%] -translate-x-1/2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-bold shadow-card animate-fade-in" style={{ top: `${index * 18}px`, zIndex: stack.length - index }}>{item}</div>)}</div></VisualStep><VisualStep number="3" title="Use it, earn credits, unlock next steps" copy="Progress stamps show what is active now and what may open later."><div className="grid grid-cols-5 gap-2">{stamps.map((item, index) => <div key={item} className={cn("rounded-2xl p-2 text-center shadow-card", index < 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-accent")}><Star className="mx-auto mb-1 size-4" /><span className="text-[10px] font-bold">{item}</span></div>)}</div></VisualStep></div><div className="grid grid-cols-3 gap-3"><CompareCard title="Static monthly program" copy="One fixed bundle. Little flexibility." muted /><CompareCard title="Open marketplace" copy="Too many disconnected options." muted /><CompareCard title="Stretch" copy="A guided monthly care stack. Built for you. Safe swaps. Future unlocks." highlight /></div><Button variant="hero" size="xl" className="w-full" onClick={onContinue}>Start my quiz <ArrowRight className="size-4" /></Button></section>;
}

function VisualStep({ number, title, copy, children }: { number: string; title: string; copy: string; children: React.ReactNode }) {
  return <div className="rounded-[2rem] bg-card p-5 shadow-card animate-fade-in"><div className="mb-4 flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-accent">{number}</span><div><h2 className="font-display text-2xl leading-tight">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p></div></div>{children}</div>;
}

function CompareCard({ title, copy, highlight, muted }: { title: string; copy: string; highlight?: boolean; muted?: boolean }) {
  return <div className={cn("rounded-3xl p-4 shadow-card", highlight ? "bg-primary text-primary-foreground" : muted ? "bg-secondary text-secondary-foreground" : "bg-card")}><p className="font-display text-xl leading-tight">{title}</p><p className={cn("mt-2 text-xs leading-5", highlight ? "text-primary-foreground/85" : "text-muted-foreground")}>{copy}</p></div>;
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
    { title: "Your pathway", lead: pathway.title, copy: `We Recommended this because you selected ${answerText}.` },
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
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Keep your first month or swap one thing." copy="Your coach can help refine it after you begin." /><SoftCard onClick={onOpenJourney} className="space-y-4 border-Recommended/40"><div className="flex items-center justify-between"><p className="font-display text-2xl">First Month</p><Star className="size-5 text-accent" /></div><p className="text-muted-foreground">{pathway.title}</p><div className="grid grid-cols-3 gap-2 text-center text-xs">{pathway.guidedDefaults.slice(0, 3).map((item) => <span key={item} className="rounded-2xl bg-secondary px-2 py-3">{item}</span>)}</div></SoftCard><Button variant="hero" size="xl" className="w-full" onClick={onBuild}>Build my month</Button><Button variant="soft" size="xl" className="w-full" onClick={resetQuiz}>Swap answers</Button></section>;
}

function BuilderScreen({ pathway, onStart, onCoach }: { pathway: Pathway; onStart: () => void; onCoach: () => void }) {
  const [drawerBlock, setDrawerBlock] = useState<MonthBlock | null>(null);
  const [demoTile, setDemoTile] = useState<DemoTile | null>(null);
  const [swapBlock, setSwapBlock] = useState<MonthBlock | null>(null);
  const planCards = buildPlanCards(pathway);
  const journey = [
    { label: "Pathway", state: "completed", block: planCards[0] },
    { label: "Stack", state: "selected", block: planCards[0] },
    { label: "Pods", state: "needs input", block: planCards[2] },
    { label: "Pass", state: "needs input", block: planCards[3] },
    { label: "Kit", state: "future", block: planCards[4] },
    { label: "Progress", state: "future", block: planCards[5] },
    { label: "Unlocks", state: "locked", block: planCards[5] },
  ];
  return <section className="space-y-5 px-5 pb-32 pt-6"><div className="rounded-[2rem] bg-hero p-5 shadow-float"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-sm font-semibold text-accent">Your Stretch Month</p><h1 className="mt-1 font-display text-4xl leading-tight">{pathway.title}</h1><p className="mt-1 text-sm font-semibold text-foreground/80">Month 1: Foundation</p><p className="mt-3 text-base leading-6 text-muted-foreground">{pathway.monthlyPromise}</p></div><ProgressRing value={38} /></div><div className="mt-5 grid gap-2"><Button variant="hero" size="lg" onClick={onStart}>Keep recommended month</Button><div className="grid grid-cols-2 gap-2"><Button variant="soft" size="lg" onClick={() => setDrawerBlock(swapBlock || planCards[0])}><RefreshCw className="size-4" /> Swap one block</Button><Button variant="soft" size="lg" onClick={onCoach}><MessageCircle className="size-4" /> Ask coach</Button></div></div></div><div className="grid gap-4">{planCards.map((block, index) => <StackCard key={block.name} block={block} index={index} onOpen={() => setDrawerBlock(block)} />)}</div><SwapImpactSummary block={swapBlock || planCards[0]} onPick={setSwapBlock} onOpen={setDrawerBlock} options={planCards.filter((block) => block.swappable)} />{drawerBlock && <BlockDrawer block={drawerBlock} pathway={pathway} onClose={() => setDrawerBlock(null)} onCoach={onCoach} />}{demoTile && <DemoTileDrawer tile={demoTile} onClose={() => setDemoTile(null)} />}<JourneyBar items={journey} onOpen={setDrawerBlock} /></section>;
}

function ProgressRing({ value }: { value: number }) {
  return <div className="grid size-20 shrink-0 place-items-center rounded-full bg-card shadow-card" style={{ background: `conic-gradient(hsl(var(--primary)) ${value}%, hsl(var(--secondary)) 0)` }}><div className="grid size-14 place-items-center rounded-full bg-card"><span className="text-sm font-bold text-accent">{value}%</span></div></div>;
}

function StackCard({ block, index, onOpen }: { block: MonthBlock; index: number; onOpen: () => void }) {
  return <button onClick={onOpen} className="group relative w-full overflow-hidden rounded-[2rem] bg-card p-4 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-primary/60" /><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-accent shadow-card">{iconForBlock(block.name)}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-accent">0{index + 1} · {block.name}</p><h2 className="mt-1 font-display text-2xl leading-tight">{block.selection}</h2></div><span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-accent">{index < 2 ? "Ready" : index < 5 ? "Choose" : "Locked"}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{block.plain}</p><div className="mt-3 flex items-center justify-between gap-3"><span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">{block.status}</span><span className="inline-flex items-center gap-1 text-xs font-bold text-accent">Tap to open <ArrowRight className="size-3 transition-smooth group-hover:translate-x-0.5" /></span></div></div></div></button>;
}

function JourneyBar({ items, onOpen }: { items: { label: string; state: string; block: MonthBlock }[]; onOpen: (block: MonthBlock) => void }) {
  return <div className="absolute bottom-[72px] left-0 right-0 z-30 border-t border-border/80 bg-shell/95 px-3 py-2 backdrop-blur-xl"><div className="flex gap-2 overflow-x-auto pb-1">{items.map((item) => <button key={`${item.label}-${item.state}`} onClick={() => onOpen(item.block)} className="min-w-[72px] rounded-2xl bg-card px-2 py-2 text-center shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className={cn("mx-auto mb-1 block size-2 rounded-full", item.state === "completed" ? "bg-primary" : item.state === "selected" ? "bg-accent" : item.state === "needs input" ? "bg-rose" : item.state === "locked" ? "bg-muted-foreground" : "bg-secondary")} /><span className="block text-[10px] font-bold leading-tight">{item.label}</span><span className="mt-0.5 block text-[9px] capitalize text-muted-foreground">{item.state}</span></button>)}</div></div>;
}

function PlanCard({ block, onOpen }: { block: MonthBlock; onOpen: () => void }) {
  return <SoftCard onClick={onOpen} className="space-y-3 overflow-hidden"><WatercolorWash name={block.name} /><div className="flex items-start gap-3"><div className="rounded-full bg-secondary p-3 text-accent">{iconForBlock(block.name)}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-accent">{block.name}</p><span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-accent">{block.status}</span></div><h2 className="mt-1 font-display text-2xl leading-tight">{block.selection}</h2></div></div><p className="text-sm leading-6 text-muted-foreground">{block.plain}</p><p className="flex items-center gap-2 text-xs font-semibold text-accent">Open details <ArrowRight className="size-3" /></p></SoftCard>;
}

function SwapImpactSummary({ block, options, onPick, onOpen }: { block: MonthBlock; options: MonthBlock[]; onPick: (block: MonthBlock) => void; onOpen: (block: MonthBlock) => void }) {
  return <div className="rounded-[2rem] bg-secondary p-5 shadow-card"><div className="mb-4 flex items-start gap-3"><div className="rounded-full bg-card p-3 text-accent shadow-card"><RefreshCw className="size-5" /></div><div><p className="text-sm font-semibold text-accent">Swap impact summary</p><h2 className="font-display text-2xl leading-tight">Try a swap without changing your month.</h2></div></div><div className="mb-4 flex gap-2 overflow-x-auto pb-1">{options.map((option) => <button key={option.name} onClick={() => onPick(option)} className={cn("shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", block.name === option.name ? "bg-primary text-primary-foreground" : "bg-card text-accent shadow-card")}>{option.name}</button>)}</div><div className="grid grid-cols-2 gap-3"><div className="rounded-3xl bg-card p-4 shadow-card"><p className="text-xs font-semibold text-accent">Changes</p><p className="mt-2 font-display text-xl leading-tight">One {block.name.toLowerCase()} choice</p></div><div className="rounded-3xl bg-card p-4 shadow-card"><p className="text-xs font-semibold text-accent">Stays</p><p className="mt-2 font-display text-xl leading-tight">Care, coach, safety</p></div></div><Button variant="hero" size="lg" className="mt-4 w-full" onClick={() => onOpen(block)}>Open {block.name} swaps</Button></div>;
}

function WatercolorWash({ name }: { name: string }) {
  const tone = name === "Care" ? "bg-rose" : name === "Coach" || name === "Pods" ? "bg-olive" : name === "Kit" ? "bg-sand" : "bg-muted";
  return <div className="mb-2 flex h-20 gap-2 overflow-hidden rounded-3xl bg-secondary p-2"><div className={cn("h-full flex-1 rounded-[2rem] opacity-70 blur-[1px]", tone)} /><div className="h-full flex-[0.7] rounded-[2rem] bg-card/70 opacity-80 blur-[1px]" /><div className={cn("h-full flex-[0.45] rounded-[2rem] opacity-50 blur-sm", tone)} /></div>;
}

function iconForBlock(name: string) {
  if (name.includes("Coach") || name.includes("Mental")) return <MessageCircle className="size-5" />;
  if (name.includes("Kit")) return <Package className="size-5" />;
  if (name.includes("Pods")) return <Sparkles className="size-5" />;
  if (name.includes("Pass") || name.includes("Functional")) return <Ticket className="size-5" />;
  if (name.includes("Labs") || name.includes("Clinical") || name.includes("Specialist")) return <ClipboardList className="size-5" />;
  if (name.includes("Future") || name.includes("Packs")) return <Lock className="size-5" />;
  return <Star className="size-5" />;
}

function BlockDrawer({ block, pathway, onClose, onCoach }: { block: MonthBlock; pathway: Pathway; onClose: () => void; onCoach: () => void }) {
  const catalog = catalogForBlock(block, pathway);
  return <div className="absolute inset-0 z-50 flex items-center bg-primary/25 p-3 backdrop-blur-sm" onClick={onClose}><div className="max-h-[82vh] w-full overflow-y-auto rounded-[2rem] bg-card p-6 shadow-float" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-start justify-between gap-3"><div className="flex items-start gap-3"><div className="rounded-full bg-secondary p-3 text-accent">{iconForBlock(block.name)}</div><div><p className="text-sm font-semibold text-accent">{block.name}</p><h2 className="font-display text-3xl leading-tight">{block.selection}</h2></div></div><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div><WatercolorWash name={block.name} /><div className="grid gap-4"><div className="grid grid-cols-2 gap-3"><InfoBlock label="Does" copy={block.plain} /><InfoBlock label="Why here" copy={block.why} /></div><InfoBlock label="Inside" copy={block.includes} /><div className="rounded-2xl bg-secondary p-4"><p className="text-xs font-semibold uppercase tracking-wide text-accent">Explore</p><div className="mt-3 grid gap-2">{catalog.options.map((option) => <button key={option.name} className="rounded-2xl bg-card px-4 py-3 text-left shadow-card transition-smooth hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><p className="text-sm font-semibold">{option.name}</p><p className="mt-1 text-xs text-accent">{option.state}</p></button>)}</div>{catalog.agenda && <p className="mt-3 text-xs leading-5 text-muted-foreground">{catalog.agenda}</p>}</div></div><div className="mt-5 grid gap-3"><Button variant="hero" size="xl" onClick={onClose}>Keep this piece</Button><Button variant="soft" size="xl" disabled={!block.swappable} onClick={onClose}><RefreshCw className="size-4" /> Preview one swap</Button><Button variant="soft" size="xl" onClick={onCoach}>Ask coach</Button></div></div></div>;
}

function InfoBlock({ label, copy }: { label: string; copy: string }) {
  return <div className="rounded-2xl bg-secondary p-4"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>;
}

function BlocksDemoDrawer({ onClose, onTile }: { onClose: () => void; onTile: (tile: DemoTile) => void }) {
  const stories = [
    { title: "Care lane", copy: "Expert route, review, and labs when useful.", columns: ["Care", "Labs"] },
    { title: "Practice lane", copy: "Coach and pod rhythm for the week.", columns: ["Coach", "Pods"] },
    { title: "Feel-it lane", copy: "Kit and passes you can actually use.", columns: ["Kit", "Experience"] },
    { title: "Later lane", copy: "Packs and add-ons that can open later.", columns: ["Unlocks"] },
  ];
  return <div className="absolute inset-0 z-50 flex items-center bg-primary/20 p-4 pb-24 backdrop-blur-sm"><div className="max-h-[82vh] w-full overflow-y-auto rounded-[2rem] bg-shell p-4 shadow-float"><div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-accent">Discovery map</p><h2 className="font-display text-3xl">Building blocks</h2><p className="mt-1 text-sm text-muted-foreground">A simple map of what each piece does.</p></div><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div><div className="grid gap-4">{stories.map((story, index) => <div key={story.title} className={cn("rounded-[2rem] p-4 shadow-card", index % 2 === 0 ? "bg-secondary" : "bg-card")}><WatercolorWash name={story.title} /><div className="mb-3 flex items-start justify-between gap-3"><div><p className="font-display text-2xl">{story.title}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{story.copy}</p></div><span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-accent shadow-card">{story.columns.length}</span></div><div className="grid grid-cols-2 gap-3">{demoTiles.filter((tile) => story.columns.includes(tile.column)).map((tile) => <button key={tile.name} onClick={() => onTile(tile)} className="rounded-3xl bg-card p-4 text-left shadow-card transition-smooth hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><p className="text-xs font-semibold text-accent">{tile.column}</p><p className="mt-1 font-display text-xl capitalize">{tile.name.replace(' core', '').replace(' advanced', '+')}</p><p className="mt-2 text-[11px] font-semibold text-muted-foreground">{tile.status}</p></button>)}</div></div>)}</div></div></div>;
}

function DemoTileDrawer({ tile, onClose }: { tile: DemoTile; onClose: () => void }) {
  return <div className="absolute inset-0 z-[60] flex items-end bg-primary/35 p-3 backdrop-blur-sm" onClick={onClose}><div className="w-full rounded-[2rem] bg-card p-6 shadow-float" onClick={(event) => event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-3xl">{tile.name}</h2><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div><InfoBlock label="What it is" copy={tile.what} /><div className="mt-3"><InfoBlock label="Where it appears" copy={tile.where} /></div><div className="mt-3"><InfoBlock label="Which pathways can use it" copy={tile.pathways} /></div><div className="mt-3"><InfoBlock label="Status" copy={tile.status} /></div></div></div>;
}

function WeekScreen({ onHome }: { onHome: () => void }) {
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-olive p-6 text-olive-foreground shadow-float"><CalendarDays className="mb-5 size-8" /><SectionTitle title="Week one starts gently." copy="Your care plan, coach note, kit, pod, and pass are lined up." /></div><div className="grid gap-3">{["Tonight: settle your sleep window", "Tomorrow: coach check-in", "This week: join your pod", "Anytime: book your pass"].map((item) => <div key={item} className="rounded-3xl bg-card p-5 shadow-card"><p className="font-medium">{item}</p></div>)}</div><Button variant="hero" size="xl" className="w-full" onClick={onHome}>Go to Home</Button></section>;
}

function HomeScreen({ pathway, answers, onCare, onFuture, onJourney, onStamp }: { pathway: Pathway; answers: string[]; onCare: () => void; onFuture: () => void; onJourney: () => void; onStamp: (stamp: PassportStamp) => void }) {
  const chips = (answers.length ? answers : ["poor sleep", "fatigue", "brain fog"]).slice(0, 4);
  return <section className="space-y-6 px-5 pb-8 pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Stretch Journey Bar</p><h1 className="font-display text-4xl">Today’s care rhythm</h1></div><button onClick={onCare} className="rounded-full bg-secondary p-3 text-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageCircle className="size-5" /></button></div><div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float"><p className="text-sm opacity-80">Today’s next 3 actions</p>{["Confirm your care route", "Choose pod seats", "Start your kit build"].map((item) => <p key={item} className="mt-4 flex gap-3"><Check className="size-5 shrink-0" />{item}</p>)}</div><SoftCard onClick={onJourney}><p className="font-display text-2xl">Your Month Builder progress</p><div className="mt-4 grid gap-3">{["Care confirmed", "Pods selected", "Kit built", "Experience pass booked", "Labs / clinician loop", "Future unlock viewed"].map((item, i) => <div key={item} className="flex items-center justify-between gap-3"><span className="text-sm text-muted-foreground">{item}</span><span className={cn("rounded-full px-3 py-1 text-xs font-semibold", i < 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-accent")}>{i < 2 ? "Done" : "Next"}</span></div>)}</div></SoftCard><div className="rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-2xl">Recommended now</p><div className="mt-4"><PreviewRow label="One recommended pack or box" value={pathway.strongestPack || pathway.guidedDefaults[2]} /></div></div><div className="rounded-3xl bg-secondary p-5 shadow-card"><p className="font-display text-2xl">Why we recommended this</p><div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="rounded-full bg-card px-3 py-2 text-xs font-semibold text-accent shadow-card">{chip}</span>)}</div><p className="mt-4 text-sm leading-6 text-muted-foreground">{pathway.reason}</p></div><MbcCard onStamp={onStamp} /><PassportSection onStamp={onStamp} compact /></section>;
}

function JourneyScreen({ pathway, activeTab, setActiveTab, onAdjacent, onCoach }: { pathway: Pathway; activeTab: JourneyTab; setActiveTab: (tab: JourneyTab) => void; onAdjacent: () => void; onCoach: () => void }) {
  const tabs: JourneyTab[] = ["Experience", "Coach", "Kit", "Clinician Loop"];
  return <section className="space-y-6 px-5 py-7"><div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-float"><p className="text-sm opacity-80">Unlocked pathway</p><h1 className="mt-2 font-display text-4xl leading-tight">{pathway.title}</h1><p className="mt-4 leading-7 opacity-90">{pathway.monthlyPromise}</p></div><div className="grid grid-cols-3 gap-3"><PhaseCard title="Month 1" label="Foundation" items={pathway.foundation} /><PhaseCard title="Month 2" label="Deepen" items={pathway.deepen} /><PhaseCard title="Month 3" label="Sustain / Unlock" items={pathway.sustain} /></div><Roadmap roadmap={pathway.roadmap} /><div className="rounded-3xl bg-card p-2 shadow-card"><div className="grid grid-cols-4 gap-1">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={cn("rounded-2xl px-2 py-3 text-[11px] font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>{tab}</button>)}</div></div><div className="rounded-3xl bg-card p-5 shadow-card"><div className="mb-4 flex items-center gap-3"><div className="rounded-full bg-secondary p-3 text-accent">{activeTab === "Clinician Loop" ? <ClipboardList className="size-5" /> : <Sparkles className="size-5" />}</div><h2 className="font-display text-2xl">{activeTab}</h2></div><div className="grid gap-3">{pathway.tabs[activeTab].map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-accent" />{item}</p>)}</div></div>{pathway.vitality && <InfoCard title="Visible vitality" copy={`A small visible-results layer: ${pathway.vitality}`} icon={<Sparkles className="size-5" />} />}<InfoCard title="Monthly wow" copy={`${pathway.wow}. One memorable moment that makes the month feel cared for, not clinical.`} icon={<Star className="size-5" />} /><div className="grid gap-3"><PreviewRow label="Pack preview" value={`${pathway.strongestPack} — a deeper bundle if this month goes well.`} /><PreviewRow label="Device preview" value={`${pathway.futureDevice} — opens later if useful.`} /><PreviewRow label="Future add-on" value={`${pathway.futureRider} — reviewed before it becomes active.`} /><SoftCard onClick={onAdjacent}><p className="text-sm font-semibold text-accent">Adjacent pathway preview</p><p className="mt-1 font-display text-2xl">{pathways[pathway.adjacent].title}</p><p className="mt-2 text-sm text-muted-foreground">Opens related support without rebuilding your whole month.</p></SoftCard></div><Button variant="hero" size="xl" className="w-full" onClick={onCoach}>Ask coach about this pathway</Button></section>;
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
  return <div className="space-y-3"><div className="flex items-center gap-2 text-accent">{icon}<p className="font-display text-2xl text-foreground">{title}</p></div><div className="grid gap-3">{options.map((option) => <button key={option} onClick={() => onChange(option)} className={cn("rounded-3xl border p-4 text-left shadow-card transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === option ? "border-Recommended bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:-translate-y-0.5")}><span className="flex items-center justify-between gap-3"><span>{option}</span>{value === option && <Check className="size-4" />}</span></button>)}</div></div>;
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
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-2xl">Progress Passport</p><div className="mt-4 grid grid-cols-2 gap-3">{shown.map((stamp, index) => <button key={stamp.title} onClick={() => onStamp(stamp)} className={cn("rounded-2xl border p-3 text-left text-xs font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", index < 2 ? "border-Recommended bg-primary text-primary-foreground" : "border-border bg-secondary text-foreground hover:-translate-y-0.5")}><Star className="mb-2 size-4" />{stamp.title}</button>)}</div></div>;
}

function MbcCard({ onStamp }: { onStamp: (stamp: PassportStamp) => void }) {
  return <div className="rounded-3xl bg-card p-5 shadow-card"><div className="flex items-start justify-between gap-4"><div><p className="font-display text-2xl">Milestone Bonus Credits</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Milestone Bonus Credits are Stretch-funded credits you earn when you complete the steps that make your plan work — like building your kit, joining pods, finishing labs, booking your pass, or keeping a streak. You can use them later on selected packs, devices, or upgrades.</p></div><span className="rounded-full bg-secondary px-3 py-2 text-sm font-bold text-accent">120</span></div><div className="mt-4 grid gap-2 text-sm"><PreviewRow label="Current balance" value="120 MBC" /><PreviewRow label="Pending rewards" value="3 steps" /><PreviewRow label="Next unlock" value="Seven-day streak" /></div><div className="mt-4 grid gap-2">{passportStamps.filter((s) => s.mbc).slice(0, 5).map((stamp) => <button key={stamp.title} onClick={() => onStamp(stamp)} className="rounded-2xl bg-secondary px-4 py-3 text-left text-xs font-semibold text-accent">{stamp.mbc}</button>)}</div></div>;
}

function BehindScenesPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"Member view" | "Operator view">("Member view");
  const memberCards = [
    ["Intake Guide", "AI helps route you to the right pathway based on your symptoms and goals."],
    ["Month Builder", "AI assembles your Recommended monthly plan from care, pods, kit, and pass options."],
    ["Coach Support", "AI helps your coach prepare your monthly plan and next-step adjustments."],
    ["Progress Engine", "AI watches your streaks, logs, labs, and attendance to unlock Milestone Bonus Credits and future support."],
  ];
  const operatorCards = [
    ["Intake Summary Agent", "summarizes questionnaire answers and flags risk."],
    ["Provider Matching Agent", "matches the user to coaches, clinicians, pods, and partners based on city and availability."],
    ["Kit Substitution Agent", "suggests safe substitutions if a kit SKU is unavailable."],
    ["Churn Risk Agent", "flags users who have not built their month or booked a pod / pass by week 2."],
    ["Escalation Agent", "flags when a pack or Preview should appear."],
    ["Red Flag Escalation", "flags when human clinician review is needed."],
  ];
  return <div className="absolute inset-0 z-[70] bg-shell p-4 pb-24"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-accent">Demo mode</p><h2 className="font-display text-4xl leading-tight">How Stretch works behind the scenes</h2></div><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div><div className="rounded-3xl bg-card p-2 shadow-card"><div className="grid grid-cols-2 gap-2">{["Member view", "Operator view"].map((item) => <button key={item} onClick={() => setTab(item as "Member view" | "Operator view")} className={cn("rounded-2xl px-4 py-3 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", tab === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary")}>{item}</button>)}</div></div><div className="mt-5 max-h-[calc(100vh-190px)] space-y-5 overflow-y-auto pr-1">{tab === "Member view" ? <BehindCards cards={memberCards} /> : <><BehindCards cards={operatorCards} /><div className="rounded-3xl bg-secondary p-5 shadow-card"><p className="font-display text-2xl">Safety note</p><p className="mt-2 text-sm leading-6 text-muted-foreground">AI never diagnoses, prescribes, or approves complex clinical decisions. Those are always human-led.</p></div><OperatorConsolePreview /></>}</div></div>;
}

function BehindCards({ cards }: { cards: string[][] }) {
  return <div className="grid gap-3">{cards.map(([title, copy]) => <div key={title} className="rounded-3xl bg-card p-5 shadow-card"><div className="mb-3 flex items-center gap-3 text-accent"><Sparkles className="size-5" /><p className="font-display text-2xl text-foreground">{title}</p></div><p className="text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>;
}

function OperatorConsolePreview() {
  const tabs = ["Users", "Intake Queue", "Provider Slots", "Kits", "Pods", "Experience Passes", "MBC", "Escalations", "Future Riders"];
  const rows = [
    { name: "Maya R.", pathway: "Peri Sleep + Energy", month: "1", plan: "Yes", care: "Women’s health", coach: "Mara", pods: "2", kit: "Built", pass: "Booked", labs: "Scheduled", mbc: "120 pending", red: "No", churn: "No" },
    { name: "Elena S.", pathway: "Endo Flare + Function", month: "1", plan: "Draft", care: "Endo-aware gyne", coach: "Nia", pods: "1", kit: "Open", pass: "Open", labs: "Upload needed", mbc: "40 pending", red: "No", churn: "Yes" },
  ];
  return <div className="rounded-3xl bg-card p-5 shadow-card"><p className="font-display text-2xl">Operator console preview</p><div className="mt-4 flex gap-2 overflow-x-auto pb-2">{tabs.map((tab) => <span key={tab} className="shrink-0 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-accent">{tab}</span>)}</div><div className="mt-4 space-y-3">{rows.map((row) => <div key={row.name} className="rounded-2xl border border-border bg-shell p-4"><div className="mb-3 flex items-start justify-between gap-3"><div><p className="font-display text-xl">{row.name}</p><p className="text-xs text-muted-foreground">{row.pathway} · Month {row.month}</p></div><span className={cn("rounded-full px-3 py-1 text-xs font-semibold", row.red === "Yes" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-accent")}>Red flag {row.red}</span></div><div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">{[["Plan selected", row.plan], ["Care route", row.care], ["Coach assigned", row.coach], ["Pods selected", row.pods], ["Kit status", row.kit], ["Pass status", row.pass], ["Labs status", row.labs], ["MBC status", row.mbc], ["Churn risk", row.churn]].map(([label, value]) => <div key={label} className="rounded-xl bg-card p-3"><p className="font-semibold text-foreground">{label}</p><p className="mt-1">{value}</p></div>)}</div></div>)}</div></div>;
}


function StampDrawer({ stamp, onClose }: { stamp: PassportStamp; onClose: () => void }) {
  return <div className="absolute inset-0 z-50 flex items-end bg-primary/35 p-3 backdrop-blur-sm" onClick={onClose}><div className="w-full rounded-[2rem] bg-card p-6 shadow-float" onClick={(event) => event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><p className="font-display text-3xl">{stamp.title}</p><button onClick={onClose} className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-accent">Close</button></div>{[["What it means", stamp.means], ["How to complete it", stamp.complete], ["What it unlocks", stamp.unlocks]].map(([label, copy]) => <div key={label} className="mb-4 rounded-2xl bg-secondary p-4 last:mb-0"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div>;
}

function FutureScreen() {
  return <section className="space-y-6 px-5 py-7"><SectionTitle title="Future unlocks" copy="These stay quiet until they are useful for you." />{["Deeper answers", "Rider Included", "Device-ready tracking", "Partner experiences"].map((item) => <div key={item} className="rounded-3xl border border-border bg-secondary p-5 text-muted-foreground shadow-card"><Lock className="mb-3 size-5" /><p className="font-display text-2xl text-foreground">{item}</p><p className="mt-2 text-sm">Potentially available after your first check-in.</p></div>)}</section>;
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
