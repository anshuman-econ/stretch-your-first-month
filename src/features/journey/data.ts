// Editorial member-facing content for the Stretch continuous flow.
// Internal engineering slugs are used in data only. Members never see A1–F4 labels.

export type PathwaySlug =
  | "peri-sleep-energy"
  | "fertility-readiness"
  | "endo-flare-function"
  | "metaboglow"
  | "longevity-brain-focus";

export type BlockKey = "care" | "movement" | "nutrition" | "passes";

export const BLOCKS: { key: BlockKey; label: string; tagline: string }[] = [
  { key: "care", label: "Stretch Care", tagline: "Clinicians, labs, and check-ins tuned to your month." },
  { key: "movement", label: "Stretch Movement", tagline: "The right movement — not more movement." },
  { key: "nutrition", label: "Stretch Nutrition", tagline: "Food, supplements and pantry that hold the plan." },
  { key: "passes", label: "Stretch Passes", tagline: "Recovery, sauna, cold, breathwork — where you actually go." },
];

export type BlockItem = {
  name: string;
  tier: "essential" | "core" | "extra";
  what: string;
  eligibleToSwap?: boolean;
};

export type Pathway = {
  slug: PathwaySlug;
  name: string;
  short: string;
  headline: string;
  promise: string;
  microCopy: string;
  signals: string[]; // used for routing detection
  feelTags: string[];
  blocks: Record<BlockKey, { summary: string; items: BlockItem[] }>;
  firstWeek: { day: string; title: string; detail: string }[];
};

export const PATHWAYS: Pathway[] = [
  {
    slug: "peri-sleep-energy",
    name: "Peri Sleep + Energy",
    short: "Peri",
    headline: "Sleep that holds. Energy that returns.",
    promise:
      "A month tuned to peri- and perimenopausal shifts — steadier sleep, cooler nights, and daytime energy you can plan around.",
    microCopy: "For nights that broke, mornings that dragged, and a body that keeps changing the rules.",
    signals: ["sleep", "night sweats", "wake", "perimenopause", "hormones", "hot flash", "cycle"],
    feelTags: ["Rested", "Cooler nights", "Clearer mornings"],
    blocks: {
      care: {
        summary: "A hormone-literate clinician reads your month, not just a lab.",
        items: [
          { tier: "essential", name: "Peri-informed clinician review", what: "Reads your sleep, cycle and symptom log every month." },
          { tier: "essential", name: "Hormone + thyroid panel (quarterly)", what: "Baseline plus tracking — not more than needed." },
          { tier: "core", name: "HRT / non-hormonal decision session", what: "Options walk-through with a specialist. You decide.", eligibleToSwap: true },
          { tier: "extra", name: "Pelvic-floor consult", what: "Added only if symptoms suggest it." },
        ],
      },
      movement: {
        summary: "Strength + zone 2, timed around sleep — not more cardio.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Bone, muscle and glucose support." },
          { tier: "core", name: "Zone 2 walks (3× / week)", what: "Aerobic base without cortisol spikes.", eligibleToSwap: true },
          { tier: "extra", name: "Restorative yoga pass", what: "Nervous-system down-regulation before bed." },
        ],
      },
      nutrition: {
        summary: "Protein floor, blood-sugar steady, magnesium and glycine tuned for sleep.",
        items: [
          { tier: "essential", name: "Protein target coaching", what: "Daily floor set to your body weight." },
          { tier: "essential", name: "Sleep stack: magnesium glycinate + glycine", what: "Timed 60 min before bed." },
          { tier: "core", name: "Perimenopause pantry drop", what: "Restocked monthly.", eligibleToSwap: true },
        ],
      },
      passes: {
        summary: "Sauna + cold pairs the drop in core temp that helps you fall asleep.",
        items: [
          { tier: "core", name: "Sauna pass (4 visits / month)", what: "Evening sessions preferred.", eligibleToSwap: true },
          { tier: "extra", name: "Breathwork drop-in", what: "Down-regulation classes." },
        ],
      },
    },
    firstWeek: [
      { day: "Day 1", title: "Kit arrives", detail: "Sleep stack, protein starter, sauna pass activated." },
      { day: "Day 2", title: "Clinician intake", detail: "45-min hormone-literate review." },
      { day: "Day 3", title: "First strength session", detail: "Booked at your studio, form-checked." },
      { day: "Day 5", title: "Sleep check-in", detail: "Coach message: what shifted, what didn't." },
      { day: "Day 7", title: "Week close", detail: "One small tweak, then hold." },
    ],
  },
  {
    slug: "fertility-readiness",
    name: "Fertility Readiness",
    short: "Fertility",
    headline: "Get your body ready — quietly, precisely.",
    promise:
      "A discreet, clinician-led month to prepare mind and body for trying — cycle-aware, stress-aware, without the noise of fertility marketing.",
    microCopy: "For the months before, not the middle of a clinic. Privacy first.",
    signals: ["fertility", "trying", "conceive", "cycle", "ovulation", "amh", "pcos"],
    feelTags: ["Prepared", "Calm", "In sync"],
    blocks: {
      care: {
        summary: "REI-aligned clinician plus the labs that actually matter now.",
        items: [
          { tier: "essential", name: "Fertility-readiness clinician review", what: "Monthly read of cycle, labs and lifestyle." },
          { tier: "essential", name: "Preconception panel", what: "AMH, thyroid, ferritin, D — one draw." },
          { tier: "core", name: "Cycle tracking device + coaching", what: "Wearable-based ovulation window.", eligibleToSwap: true },
          { tier: "extra", name: "Genetic carrier screen", what: "One-time, optional." },
        ],
      },
      movement: {
        summary: "Strength + calm — no depletion training.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Protects cycle regularity." },
          { tier: "core", name: "Pilates / mobility (2× / week)", what: "Circulation and pelvic mobility.", eligibleToSwap: true },
        ],
      },
      nutrition: {
        summary: "Prenatal foundation, iron, choline, omega-3 — food-first, supplemented cleanly.",
        items: [
          { tier: "essential", name: "Prenatal + methylated folate", what: "Clinician-verified formula." },
          { tier: "essential", name: "Iron + choline coaching", what: "Weekly targets tracked." },
          { tier: "core", name: "Preconception pantry drop", what: "Whole-food restock, monthly.", eligibleToSwap: true },
        ],
      },
      passes: {
        summary: "Nervous-system passes only. No cold plunge during luteal window.",
        items: [
          { tier: "core", name: "Restorative yoga pass", what: "4 classes / month.", eligibleToSwap: true },
          { tier: "extra", name: "Acupuncture credit", what: "Fertility-trained practitioner." },
        ],
      },
    },
    firstWeek: [
      { day: "Day 1", title: "Prenatal + kit arrives", detail: "Clinician-verified stack." },
      { day: "Day 2", title: "Preconception panel", detail: "Home draw, discreet." },
      { day: "Day 4", title: "Cycle device paired", detail: "Coach walks you through it." },
      { day: "Day 6", title: "Clinician intake", detail: "Full read, no rushed windows." },
      { day: "Day 7", title: "Week close", detail: "Hold the plan for two cycles." },
    ],
  },
  {
    slug: "endo-flare-function",
    name: "Endo Flare + Function",
    short: "Endo",
    headline: "Fewer flares. More function.",
    promise:
      "A month built for endometriosis — pain-literate care, movement that doesn't punish you, food that lowers the fire.",
    microCopy: "For the days you had to cancel, and the ones you refuse to.",
    signals: ["endo", "endometriosis", "pain", "flare", "pelvic", "period pain", "cramps"],
    feelTags: ["Fewer flares", "In control", "Held"],
    blocks: {
      care: {
        summary: "Endo-specialist clinician + pelvic-floor lead.",
        items: [
          { tier: "essential", name: "Endo-specialist clinician review", what: "Monthly, pain-literate." },
          { tier: "essential", name: "Pelvic-floor PT (2× / month)", what: "Not a general PT." },
          { tier: "core", name: "Inflammation panel (quarterly)", what: "Tracks trajectory, not one day.", eligibleToSwap: true },
        ],
      },
      movement: {
        summary: "Gentle strength, walking, breath — no HIIT during flare weeks.",
        items: [
          { tier: "essential", name: "Endo-aware strength (2× / week)", what: "Modified for flare days." },
          { tier: "core", name: "Walking prescription", what: "Progressive, phone-tracked.", eligibleToSwap: true },
          { tier: "extra", name: "Restorative yoga", what: "Flare-week override." },
        ],
      },
      nutrition: {
        summary: "Low-inflammation baseline, omega-3, magnesium, targeted elimination if useful.",
        items: [
          { tier: "essential", name: "Anti-inflammatory pantry drop", what: "Monthly restock." },
          { tier: "essential", name: "Omega-3 + magnesium", what: "Cramp-window support." },
          { tier: "core", name: "Elimination coaching (optional)", what: "Only if food is a trigger.", eligibleToSwap: true },
        ],
      },
      passes: {
        summary: "Heat, sauna, breathwork — cold plunge off by default.",
        items: [
          { tier: "core", name: "Infrared sauna pass", what: "Warmth-forward, cramp-friendly.", eligibleToSwap: true },
          { tier: "extra", name: "Breathwork drop-in", what: "Vagal down-regulation." },
        ],
      },
    },
    firstWeek: [
      { day: "Day 1", title: "Flare kit arrives", detail: "Heat pack, omega-3, pantry starter." },
      { day: "Day 2", title: "Endo clinician intake", detail: "Full history, no rushing." },
      { day: "Day 3", title: "Pelvic-floor PT booked", detail: "First session this week." },
      { day: "Day 5", title: "Coach check-in", detail: "Flare-day protocol confirmed." },
      { day: "Day 7", title: "Hold + observe", detail: "One cycle before we tune." },
    ],
  },
  {
    slug: "metaboglow",
    name: "MetaboGlow",
    short: "MetaboGlow",
    headline: "Steady energy. Visible glow.",
    promise:
      "A metabolic-first month: blood-sugar stability, muscle, skin and mood — the quiet compounding kind.",
    microCopy: "For the plateau that won't move and the mirror you keep checking.",
    signals: ["weight", "energy", "glucose", "skin", "metabolism", "glow", "plateau", "insulin"],
    feelTags: ["Steady", "Lean", "Glowing"],
    blocks: {
      care: {
        summary: "Metabolic clinician + CGM read, monthly.",
        items: [
          { tier: "essential", name: "Metabolic clinician review", what: "Reads your CGM + labs together." },
          { tier: "essential", name: "CGM (14-day/month)", what: "Two windows per month, coach-annotated." },
          { tier: "core", name: "Derm-aligned skin review", what: "Because skin is metabolic.", eligibleToSwap: true },
        ],
      },
      movement: {
        summary: "Strength-forward + zone 2, sequenced around meals.",
        items: [
          { tier: "essential", name: "3× strength sessions / week", what: "Muscle is your glucose sink." },
          { tier: "core", name: "Post-meal walk protocol", what: "10 min after biggest meal.", eligibleToSwap: true },
          { tier: "extra", name: "Zone 2 (2× / week)", what: "Mitochondrial base." },
        ],
      },
      nutrition: {
        summary: "Protein floor, fibre first, glucose-aware pantry.",
        items: [
          { tier: "essential", name: "Protein + fibre targets", what: "Daily floors, coach-tracked." },
          { tier: "essential", name: "MetaboGlow pantry drop", what: "Monthly restock." },
          { tier: "core", name: "Creatine + collagen", what: "Muscle and skin support.", eligibleToSwap: true },
        ],
      },
      passes: {
        summary: "Sauna + cold, muscle-recovery focused.",
        items: [
          { tier: "core", name: "Sauna + cold pass", what: "Contrast protocol.", eligibleToSwap: true },
          { tier: "extra", name: "Recovery-massage credit", what: "One session / month." },
        ],
      },
    },
    firstWeek: [
      { day: "Day 1", title: "CGM shipped + kit arrives", detail: "Sensor, protein, creatine." },
      { day: "Day 2", title: "Clinician intake", detail: "Baseline metabolic read." },
      { day: "Day 3", title: "First strength session", detail: "Form-checked at your studio." },
      { day: "Day 5", title: "CGM window one closes", detail: "Coach annotates the graph." },
      { day: "Day 7", title: "Week close", detail: "One nutrition tweak, then hold." },
    ],
  },
  {
    slug: "longevity-brain-focus",
    name: "Longevity Brain + Focus",
    short: "Longevity",
    headline: "Sharper today. Compounding for decades.",
    promise:
      "A month tuned to cognitive stamina and long-arc health — sleep, ApoB, VO₂, and the compounds that hold up.",
    microCopy: "For the ones building things, and planning to keep building.",
    signals: ["focus", "brain", "cognition", "longevity", "vo2", "apob", "memory", "clarity"],
    feelTags: ["Focused", "Sharp", "Built to last"],
    blocks: {
      care: {
        summary: "Longevity-aligned clinician + advanced labs + neuro screen.",
        items: [
          { tier: "essential", name: "Longevity clinician review", what: "ApoB, Lp(a), fasting insulin, hs-CRP." },
          { tier: "essential", name: "Cognitive baseline test", what: "Repeatable each quarter." },
          { tier: "core", name: "Advanced lipid + APOE (optional)", what: "One-time context.", eligibleToSwap: true },
        ],
      },
      movement: {
        summary: "VO₂ block + strength + zone 2 — the classic longevity triad.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Muscle mass is a survival stat." },
          { tier: "essential", name: "Zone 2 (3× / week)", what: "Mitochondrial base." },
          { tier: "core", name: "VO₂ intervals (1× / week)", what: "One hard session, protected.", eligibleToSwap: true },
        ],
      },
      nutrition: {
        summary: "Protein floor, omega-3, creatine, ApoB-aware pantry.",
        items: [
          { tier: "essential", name: "Omega-3 (EPA/DHA)", what: "Third-party tested." },
          { tier: "essential", name: "Creatine + protein", what: "Daily floors." },
          { tier: "core", name: "Longevity pantry drop", what: "Monthly restock, low-saturated.", eligibleToSwap: true },
        ],
      },
      passes: {
        summary: "Sauna is the standout — cardiovascular + cognitive.",
        items: [
          { tier: "core", name: "Sauna pass (4× / month)", what: "Finnish-style, 20 min.", eligibleToSwap: true },
          { tier: "extra", name: "Cold plunge drop-in", what: "As tolerated." },
        ],
      },
    },
    firstWeek: [
      { day: "Day 1", title: "Kit + labs kit arrives", detail: "Omega-3, creatine, draw kit." },
      { day: "Day 2", title: "Clinician intake", detail: "Advanced-panel review." },
      { day: "Day 3", title: "Cognitive baseline", detail: "20 min, at home." },
      { day: "Day 5", title: "First VO₂ session", detail: "Coach-programmed intervals." },
      { day: "Day 7", title: "Week close", detail: "Hold. Compounding starts now." },
    ],
  },
];

export const FEEL_OPTIONS = [
  { id: "rested", label: "Rested", note: "Sleep that holds, mornings that arrive." },
  { id: "steady", label: "Steady energy", note: "No 3pm crash, no cortisol spikes." },
  { id: "focused", label: "Focused", note: "Cognitive stamina that lasts the day." },
  { id: "strong", label: "Strong", note: "Muscle, bone, capacity." },
  { id: "calm", label: "Calm", note: "Nervous system down-regulated." },
  { id: "prepared", label: "Prepared", note: "Body ready for what's next." },
  { id: "glowing", label: "Glowing", note: "Skin, hair, visible vitality." },
  { id: "in-control", label: "In control", note: "Fewer flares. Fewer surprises." },
];

export const WORKS_OPTIONS = [
  { id: "walks", label: "Daily walks" },
  { id: "strength", label: "Strength training" },
  { id: "yoga", label: "Yoga / pilates" },
  { id: "therapist", label: "A therapist" },
  { id: "clinician", label: "A GP I trust" },
  { id: "supplements", label: "A supplement routine" },
  { id: "sauna", label: "Sauna / cold" },
  { id: "cooking", label: "Cooking at home" },
];

export const ROUTING_QUESTIONS: {
  id: string;
  q: string;
  choices: { id: string; label: string; tags: string[] }[];
}[] = [
  {
    id: "age-phase",
    q: "Where are you in your health arc right now?",
    choices: [
      { id: "phase-fertility", label: "Thinking about — or trying for — a baby", tags: ["fertility", "trying", "cycle"] },
      { id: "phase-peri", label: "Cycle shifting, sleep disrupted", tags: ["sleep", "perimenopause", "hormones"] },
      { id: "phase-metabolic", label: "Energy, weight or glucose feel off", tags: ["energy", "glucose", "weight"] },
      { id: "phase-longevity", label: "Building for the next 30 years", tags: ["focus", "longevity", "brain"] },
      { id: "phase-endo", label: "Managing pain or endometriosis", tags: ["endo", "pain", "flare"] },
    ],
  },
  {
    id: "top-symptom",
    q: "What one thing would change everything if it got better?",
    choices: [
      { id: "sym-sleep", label: "Sleep", tags: ["sleep", "night sweats"] },
      { id: "sym-energy", label: "Energy", tags: ["energy", "focus"] },
      { id: "sym-pain", label: "Pain", tags: ["pain", "endo", "cramps"] },
      { id: "sym-body", label: "Body composition", tags: ["weight", "glucose", "metabolism"] },
      { id: "sym-cycle", label: "Cycle", tags: ["cycle", "fertility", "hormones"] },
    ],
  },
  {
    id: "care-now",
    q: "What kind of care are you looking for?",
    choices: [
      { id: "care-specialist", label: "A specialist who actually reads me", tags: ["clinician"] },
      { id: "care-system", label: "One system that holds everything", tags: ["clinician", "hormones"] },
      { id: "care-quiet", label: "Something quiet and private", tags: ["fertility"] },
      { id: "care-edge", label: "The performance edge", tags: ["longevity", "focus"] },
    ],
  },
];

export function detectPathway(tags: string[]): PathwaySlug {
  const score: Record<PathwaySlug, number> = {
    "peri-sleep-energy": 0,
    "fertility-readiness": 0,
    "endo-flare-function": 0,
    "metaboglow": 0,
    "longevity-brain-focus": 0,
  };
  for (const p of PATHWAYS) {
    for (const t of tags) {
      if (p.signals.some((s) => t.toLowerCase().includes(s) || s.includes(t.toLowerCase()))) {
        score[p.slug] += 1;
      }
    }
  }
  const top = (Object.entries(score) as [PathwaySlug, number][]).sort((a, b) => b[1] - a[1])[0];
  return top[1] > 0 ? top[0] : "metaboglow";
}
