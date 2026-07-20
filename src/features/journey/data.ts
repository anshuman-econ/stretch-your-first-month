// Editorial member-facing content for the Stretch continuous flow.
// Internal engineering slugs are used in data only. Members never see A1–F4 labels.

export type PathwaySlug =
  | "peri-sleep-energy"
  | "fertility-readiness"
  | "endo-flare-function"
  | "metaboglow"
  | "longevity-brain-focus";

export type BlockKey = "care" | "movement" | "nutrition" | "passes";

export const BLOCKS: { key: BlockKey; label: string; tagline: string; owns: string }[] = [
  {
    key: "care",
    label: "Stretch Care",
    tagline: "Clinicians, labs, and check-ins tuned to your month.",
    owns: "Specialists, functional experts, labs, scans, prescriptions and the clinician loop.",
  },
  {
    key: "movement",
    label: "Stretch Movement",
    tagline: "The right movement — not more movement.",
    owns: "Coaching, mental-health behaviour support, pods, Pilates, yoga, barre, PT, physio, breathwork and recovery.",
  },
  {
    key: "nutrition",
    label: "Stretch Nutrition",
    tagline: "Food, supplements and pantry that hold the plan.",
    owns: "Supplements, broths, functional nutrition boxes, powders, pantry and Beej / Nava / Santulan products.",
  },
  {
    key: "passes",
    label: "Stretch Passes",
    tagline: "Recovery, sauna, cold, breathwork — where you actually go.",
    owns: "Tier-low and tier-high micro-passes, derm / tricho / procedure access, partner events, devices and milestone unlocks.",
  },
];

export type ItemStatus =
  | "Included"
  | "Plan credit"
  | "Member top-up"
  | "Pack-only"
  | "BYO counts"
  | "Locked preview";

export const STATUS_META: Record<ItemStatus, { note: string; tone: "primary" | "sand" | "accent" | "muted" | "locked" }> = {
  Included: { note: "In your plan at no extra cost.", tone: "primary" },
  "Plan credit": { note: "Draws from your monthly plan credits.", tone: "sand" },
  "Member top-up": { note: "Add-on you can turn on any month.", tone: "accent" },
  "Pack-only": { note: "Ships with the pathway pack.", tone: "sand" },
  "BYO counts": { note: "Bring your own — we count it toward the plan.", tone: "muted" },
  "Locked preview": { note: "Unlocks after a milestone. Preview only.", tone: "locked" },
};

export type BlockItem = {
  name: string;
  tier: "essential" | "core" | "extra";
  what: string;
  status: ItemStatus;
  eligibleToSwap?: boolean;
};

export type DiscoveryItem = {
  kind: "pod" | "nutrition-lite" | "pass" | "care-route" | "future-unlock";
  name: string;
  what: string;
  status: ItemStatus;
};

export type Pathway = {
  slug: PathwaySlug;
  name: string;
  short: string;
  headline: string;
  promise: string;
  microCopy: string;
  signals: string[];
  feelTags: string[];
  blocks: Record<BlockKey, { summary: string; items: BlockItem[] }>;
  discovery: { title: string; blurb: string; items: DiscoveryItem[] };
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
          { tier: "essential", name: "Peri-informed clinician review", what: "Reads your sleep, cycle and symptom log every month.", status: "Included" },
          { tier: "essential", name: "Hormone + thyroid panel (quarterly)", what: "Baseline plus tracking — not more than needed.", status: "Included" },
          { tier: "core", name: "HRT / non-hormonal decision session", what: "Options walk-through with a specialist. You decide.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Lab-upload route", what: "Send existing labs — we price-lock the read.", status: "BYO counts" },
          { tier: "extra", name: "Derm review for peri skin", what: "Optional add-on for hormonal skin shifts.", status: "Member top-up" },
        ],
      },
      movement: {
        summary: "Strength + zone 2, timed around sleep — not more cardio.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Bone, muscle and glucose support.", status: "Included" },
          { tier: "essential", name: "Peri sleep pod (small group)", what: "6-week coach-led pod on sleep behaviour.", status: "Included" },
          { tier: "core", name: "Zone 2 walks (3× / week)", what: "Aerobic base without cortisol spikes.", status: "BYO counts", eligibleToSwap: true },
          { tier: "core", name: "Restorative yoga pass", what: "Nervous-system down-regulation before bed.", status: "Plan credit" },
          { tier: "extra", name: "Breathwork drop-in", what: "Vagal down-regulation classes.", status: "Plan credit" },
        ],
      },
      nutrition: {
        summary: "Protein floor, blood-sugar steady, magnesium and glycine tuned for sleep.",
        items: [
          { tier: "essential", name: "Protein target coaching", what: "Daily floor set to your body weight.", status: "Included" },
          { tier: "essential", name: "Sleep stack: magnesium glycinate + glycine", what: "Timed 60 min before bed.", status: "Pack-only" },
          { tier: "core", name: "Perimenopause pantry drop", what: "Restocked monthly.", status: "Pack-only", eligibleToSwap: true },
          { tier: "extra", name: "Santulan hormone-support tonic", what: "Ayurvedic adjunct, clinician-cleared.", status: "Member top-up" },
        ],
      },
      passes: {
        summary: "Sauna + cold pairs the drop in core temp that helps you fall asleep.",
        items: [
          { tier: "core", name: "Sauna pass (4 visits / month)", what: "Evening sessions preferred.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Cooling-mattress device rental", what: "Partner device, month-to-month.", status: "Member top-up" },
          { tier: "extra", name: "Tricho scalp review", what: "Partner clinic, peri hair thinning.", status: "Locked preview" },
          { tier: "extra", name: "Milestone: 3-month peri reset event", what: "Partner event once you've held the plan.", status: "Locked preview" },
        ],
      },
    },
    discovery: {
      title: "Peri Discovery Bundle",
      blurb: "A soft-landing month before you commit to the full plan.",
      items: [
        { kind: "pod", name: "Peri sleep pod (4 sessions)", what: "Small coach-led group on sleep behaviour.", status: "Included" },
        { kind: "nutrition-lite", name: "Sleep-stack lite kit", what: "Two-week magnesium + glycine starter.", status: "Pack-only" },
        { kind: "pass", name: "2 sauna visits (tier-low)", what: "Or bring your own — we count them.", status: "BYO counts" },
        { kind: "care-route", name: "Lab-upload price-lock", what: "Upload recent labs, clinician reads at plan price.", status: "BYO counts" },
        { kind: "future-unlock", name: "HRT decision session", what: "Unlocks at month 2 if you want it.", status: "Locked preview" },
      ],
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
          { tier: "essential", name: "Fertility-readiness clinician review", what: "Monthly read of cycle, labs and lifestyle.", status: "Included" },
          { tier: "essential", name: "Preconception panel", what: "AMH, thyroid, ferritin, D — one draw.", status: "Included" },
          { tier: "core", name: "Lab-upload price-lock", what: "Existing labs read at plan price.", status: "BYO counts", eligibleToSwap: true },
          { tier: "core", name: "Prescription route (letrozole / metformin if indicated)", what: "Only when clinician-indicated.", status: "Plan credit" },
          { tier: "extra", name: "Genetic carrier screen", what: "One-time, optional.", status: "Member top-up" },
          { tier: "extra", name: "Reproductive endocrinologist consult", what: "Warm handoff at month 3.", status: "Locked preview" },
        ],
      },
      movement: {
        summary: "Strength + calm — no depletion training. Mind-body support included.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Protects cycle regularity.", status: "Included" },
          { tier: "essential", name: "Fertility mind-body pod", what: "Coach-led group, 6 weeks, stress + trying.", status: "Included" },
          { tier: "core", name: "Pilates / mobility (2× / week)", what: "Circulation and pelvic mobility.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Therapist match (trying-aware)", what: "One session / month, vetted network.", status: "Plan credit" },
          { tier: "extra", name: "Breathwork drop-in", what: "Luteal-week nervous system.", status: "Plan credit" },
        ],
      },
      nutrition: {
        summary: "Prenatal foundation, iron, choline, omega-3 — food-first, supplemented cleanly.",
        items: [
          { tier: "essential", name: "Prenatal + methylated folate", what: "Clinician-verified formula.", status: "Pack-only" },
          { tier: "essential", name: "Iron + choline coaching", what: "Weekly targets tracked.", status: "Included" },
          { tier: "core", name: "Preconception pantry drop", what: "Whole-food restock, monthly.", status: "Pack-only", eligibleToSwap: true },
          { tier: "core", name: "Beej fertility support powder", what: "Ayurvedic adjunct, clinician-cleared.", status: "Member top-up" },
          { tier: "extra", name: "Bone broth subscription", what: "Weekly delivery, iron-forward.", status: "Member top-up" },
        ],
      },
      passes: {
        summary: "Nervous-system passes only. No cold plunge during luteal window.",
        items: [
          { tier: "core", name: "Restorative yoga pass", what: "4 classes / month.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Cycle-tracking wearable", what: "Partner device, ovulation window.", status: "Member top-up" },
          { tier: "extra", name: "Acupuncture credit (fertility-trained)", what: "Partner network.", status: "Plan credit" },
          { tier: "extra", name: "Milestone: cycle-3 fertility circle", what: "Partner event after 3 tracked cycles.", status: "Locked preview" },
        ],
      },
    },
    discovery: {
      title: "Fertility Discovery Bundle",
      blurb: "One quiet month to see if this fits before you commit.",
      items: [
        { kind: "pod", name: "Fertility mind-body pod (4 sessions)", what: "Small group, trying-aware coach.", status: "Included" },
        { kind: "nutrition-lite", name: "Prenatal starter kit", what: "30-day prenatal + choline coaching.", status: "Pack-only" },
        { kind: "pass", name: "2 restorative yoga classes", what: "Or bring your own — we count them.", status: "BYO counts" },
        { kind: "care-route", name: "Lab-upload price-lock", what: "Upload AMH / thyroid, clinician reads at plan price.", status: "BYO counts" },
        { kind: "future-unlock", name: "REI consult at month 3", what: "Warm handoff if you want it.", status: "Locked preview" },
      ],
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
        summary: "Endo-specialist clinician + pain-management route.",
        items: [
          { tier: "essential", name: "Endo-specialist clinician review", what: "Monthly, pain-literate.", status: "Included" },
          { tier: "essential", name: "Inflammation panel (quarterly)", what: "Tracks trajectory, not one day.", status: "Included" },
          { tier: "core", name: "Prescription route (pain / hormonal)", what: "Only when clinician-indicated.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Lab-upload price-lock", what: "Existing labs read at plan price.", status: "BYO counts" },
          { tier: "extra", name: "Excision-surgeon second opinion", what: "Warm referral, partner network.", status: "Locked preview" },
        ],
      },
      movement: {
        summary: "Pelvic-floor PT, gentle strength, walking, breath — no HIIT during flare weeks.",
        items: [
          { tier: "essential", name: "Pelvic-floor PT (2× / month)", what: "Not a general PT — endo-trained.", status: "Included" },
          { tier: "essential", name: "Endo-aware strength (2× / week)", what: "Modified for flare days.", status: "Included" },
          { tier: "essential", name: "Endo pain pod (small group)", what: "Coach-led, behaviour + pacing.", status: "Included" },
          { tier: "core", name: "Walking prescription", what: "Progressive, phone-tracked.", status: "BYO counts", eligibleToSwap: true },
          { tier: "core", name: "Therapist match (pain-aware)", what: "One session / month.", status: "Plan credit" },
          { tier: "extra", name: "Restorative yoga (flare override)", what: "Swap in on flare weeks.", status: "Plan credit" },
        ],
      },
      nutrition: {
        summary: "Low-inflammation baseline, omega-3, magnesium, targeted elimination if useful.",
        items: [
          { tier: "essential", name: "Anti-inflammatory pantry drop", what: "Monthly restock.", status: "Pack-only" },
          { tier: "essential", name: "Omega-3 + magnesium", what: "Cramp-window support.", status: "Pack-only" },
          { tier: "core", name: "Elimination coaching (optional)", what: "Only if food is a trigger.", status: "Plan credit", eligibleToSwap: true },
          { tier: "extra", name: "Nava turmeric-ginger broth", what: "Warming, cramp-window.", status: "Member top-up" },
        ],
      },
      passes: {
        summary: "Heat, sauna, breathwork — cold plunge off by default.",
        items: [
          { tier: "core", name: "Infrared sauna pass", what: "Warmth-forward, cramp-friendly.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "TENS device rental", what: "Partner device, flare-week loan.", status: "Member top-up" },
          { tier: "extra", name: "Breathwork drop-in", what: "Vagal down-regulation.", status: "Plan credit" },
          { tier: "extra", name: "Milestone: 6-month EndoShield unlock", what: "Advanced-care tier at month 6.", status: "Locked preview" },
        ],
      },
    },
    discovery: {
      title: "Endo Discovery Bundle",
      blurb: "Enter without commitment. Feel it hold before you scale.",
      items: [
        { kind: "pod", name: "Endo pain pod (4 sessions)", what: "Coach-led, pacing + behaviour.", status: "Included" },
        { kind: "nutrition-lite", name: "Anti-inflammatory starter kit", what: "Two weeks of pantry + omega-3.", status: "Pack-only" },
        { kind: "pass", name: "2 infrared sauna visits (tier-low)", what: "Or bring your own — we count them.", status: "BYO counts" },
        { kind: "care-route", name: "Lab-upload price-lock", what: "Upload inflammation panel, clinician reads at plan price.", status: "BYO counts" },
        { kind: "future-unlock", name: "EndoShield tier at month 6", what: "Advanced-care unlock after adherence.", status: "Locked preview" },
      ],
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
        summary: "Metabolic clinician + derm review, monthly.",
        items: [
          { tier: "essential", name: "Metabolic clinician review", what: "Reads your CGM + labs together.", status: "Included" },
          { tier: "essential", name: "Metabolic panel (quarterly)", what: "HbA1c, insulin, lipids.", status: "Included" },
          { tier: "core", name: "Derm-aligned skin review", what: "Because skin is metabolic.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Lab-upload price-lock", what: "Send existing labs — we price-lock the read.", status: "BYO counts" },
          { tier: "extra", name: "GLP-1 prescription route", what: "Only when clinician-indicated.", status: "Locked preview" },
        ],
      },
      movement: {
        summary: "Strength-forward + zone 2, sequenced around meals.",
        items: [
          { tier: "essential", name: "3× strength sessions / week", what: "Muscle is your glucose sink.", status: "Included" },
          { tier: "essential", name: "MetaboGlow pod (small group)", what: "6-week coach-led glucose + habit pod.", status: "Included" },
          { tier: "core", name: "Post-meal walk protocol", what: "10 min after biggest meal.", status: "BYO counts", eligibleToSwap: true },
          { tier: "core", name: "Zone 2 (2× / week)", what: "Mitochondrial base.", status: "Plan credit" },
          { tier: "extra", name: "Therapist match (habit-change)", what: "One session / month.", status: "Plan credit" },
        ],
      },
      nutrition: {
        summary: "Protein floor, fibre first, glucose-aware pantry.",
        items: [
          { tier: "essential", name: "Protein + fibre targets", what: "Daily floors, coach-tracked.", status: "Included" },
          { tier: "essential", name: "MetaboGlow pantry drop", what: "Monthly restock.", status: "Pack-only" },
          { tier: "core", name: "Creatine + collagen powder", what: "Muscle and skin support.", status: "Pack-only", eligibleToSwap: true },
          { tier: "extra", name: "Nava metabolic broth", what: "Weekly delivery, protein-forward.", status: "Member top-up" },
        ],
      },
      passes: {
        summary: "Sauna + cold, CGM device, recovery credits.",
        items: [
          { tier: "essential", name: "CGM (14-day / month)", what: "Two windows per month, coach-annotated.", status: "Plan credit" },
          { tier: "core", name: "Sauna + cold pass", what: "Contrast protocol.", status: "Plan credit", eligibleToSwap: true },
          { tier: "extra", name: "Recovery-massage credit", what: "One session / month.", status: "Member top-up" },
          { tier: "extra", name: "Milestone: Glow pass at month 3", what: "Derm procedure credit unlock.", status: "Locked preview" },
        ],
      },
    },
    discovery: {
      title: "MetaboGlow Discovery Bundle",
      blurb: "One month to see your metabolism talk back — no long commit.",
      items: [
        { kind: "pod", name: "MetaboGlow pod (4 sessions)", what: "Coach-led glucose + habit group.", status: "Included" },
        { kind: "nutrition-lite", name: "Protein + fibre lite kit", what: "Two weeks of pantry starter.", status: "Pack-only" },
        { kind: "pass", name: "First 14-day CGM window", what: "Or bring your own device — we count it.", status: "BYO counts" },
        { kind: "care-route", name: "Lab-upload price-lock", what: "Upload HbA1c / lipids — clinician reads at plan price.", status: "BYO counts" },
        { kind: "future-unlock", name: "Glow pass at month 3", what: "Derm procedure credit unlock.", status: "Locked preview" },
      ],
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
          { tier: "essential", name: "Longevity clinician review", what: "ApoB, Lp(a), fasting insulin, hs-CRP.", status: "Included" },
          { tier: "essential", name: "Cognitive baseline test", what: "Repeatable each quarter.", status: "Included" },
          { tier: "core", name: "Advanced lipid + APOE (optional)", what: "One-time context.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "Lab-upload price-lock", what: "Send existing panels — we price-lock the read.", status: "BYO counts" },
          { tier: "extra", name: "Full-body MRI referral", what: "Partner clinic, at cost.", status: "Locked preview" },
        ],
      },
      movement: {
        summary: "VO₂ block + strength + zone 2 — the classic longevity triad.",
        items: [
          { tier: "essential", name: "2× strength sessions / week", what: "Muscle mass is a survival stat.", status: "Included" },
          { tier: "essential", name: "Zone 2 (3× / week)", what: "Mitochondrial base.", status: "BYO counts" },
          { tier: "essential", name: "Longevity focus pod", what: "6-week coach-led cognitive-stamina pod.", status: "Included" },
          { tier: "core", name: "VO₂ intervals (1× / week)", what: "One hard session, protected.", status: "Plan credit", eligibleToSwap: true },
          { tier: "extra", name: "Therapist match (executive)", what: "One session / month.", status: "Plan credit" },
        ],
      },
      nutrition: {
        summary: "Protein floor, omega-3, creatine, ApoB-aware pantry.",
        items: [
          { tier: "essential", name: "Omega-3 (EPA/DHA)", what: "Third-party tested.", status: "Pack-only" },
          { tier: "essential", name: "Creatine + protein", what: "Daily floors.", status: "Pack-only" },
          { tier: "core", name: "Longevity pantry drop", what: "Monthly restock, low-saturated.", status: "Pack-only", eligibleToSwap: true },
          { tier: "extra", name: "Beej cognitive support powder", what: "Ayurvedic adjunct, clinician-cleared.", status: "Member top-up" },
        ],
      },
      passes: {
        summary: "Sauna is the standout — cardiovascular + cognitive.",
        items: [
          { tier: "core", name: "Sauna pass (4× / month)", what: "Finnish-style, 20 min.", status: "Plan credit", eligibleToSwap: true },
          { tier: "core", name: "VO₂ testing device (annual)", what: "Partner lab, one visit / year.", status: "Plan credit" },
          { tier: "extra", name: "Cold plunge drop-in", what: "As tolerated.", status: "Plan credit" },
          { tier: "extra", name: "Milestone: Executive longevity retreat", what: "Partner event, month 6.", status: "Locked preview" },
        ],
      },
    },
    discovery: {
      title: "Longevity Discovery Bundle",
      blurb: "One month to feel the triad hold before you go full plan.",
      items: [
        { kind: "pod", name: "Longevity focus pod (4 sessions)", what: "Coach-led cognitive-stamina group.", status: "Included" },
        { kind: "nutrition-lite", name: "Omega-3 + creatine starter kit", what: "30-day essentials.", status: "Pack-only" },
        { kind: "pass", name: "2 sauna visits (tier-low)", what: "Or bring your own — we count them.", status: "BYO counts" },
        { kind: "care-route", name: "Lab-upload price-lock", what: "Upload ApoB / Lp(a) — clinician reads at plan price.", status: "BYO counts" },
        { kind: "future-unlock", name: "Executive longevity retreat", what: "Unlocks at month 6.", status: "Locked preview" },
      ],
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
