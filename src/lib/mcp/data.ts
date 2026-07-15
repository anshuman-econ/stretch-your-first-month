// Prototype data mirrored for MCP tool responses. Kept in sync with
// StretchPrototype.tsx by hand — this is a demo prototype, not persisted data.

export const PATHWAY_KEYS = ["peri", "endo", "metabo", "longevity"] as const;
export type PathwayKey = (typeof PATHWAY_KEYS)[number];

export const pathways: Record<
  PathwayKey,
  {
    title: string;
    bestFor: string;
    firstUnlock: string;
    futureUnlock: string;
    monthlyPromise: string;
    strongestPack: string;
    futureDevice: string;
  }
> = {
  peri: {
    title: "Peri Sleep + Energy",
    bestFor: "Rest, temperature shifts, steady days",
    firstUnlock: "Sleep reset with your coach",
    futureUnlock: "Focus and strength support",
    monthlyPromise: "Better sleep, steadier energy, calmer mood, clearer next steps.",
    strongestPack: "Sleep Reset Pack",
    futureDevice: "Smart Ring",
  },
  endo: {
    title: "Endo Relief + Function",
    bestFor: "Pain, flares, GI, daily function",
    firstUnlock: "Flare map + pacing plan",
    futureUnlock: "Endo Relief Burst Pack + EndoShield",
    monthlyPromise: "Fewer flare-derailed days and clearer next steps.",
    strongestPack: "Endo Relief Burst Pack",
    futureDevice: "EndoShield",
  },
  metabo: {
    title: "MetaboGlow Skin + Rhythm",
    bestFor: "Skin, camera-ready glow, light metabolic support",
    firstUnlock: "Derma review + glow routine",
    futureUnlock: "Camera-Ready Sprint + DermaShield+",
    monthlyPromise: "Visible skin change and steady daily rhythm.",
    strongestPack: "Camera-Ready Sprint",
    futureDevice: "DermaShield+",
  },
  longevity: {
    title: "Longevity Brain + Performance",
    bestFor: "Focus, energy, prevention, performance",
    firstUnlock: "Focus + workday setup",
    futureUnlock: "Brain Sprint + Longevity Lab Rider",
    monthlyPromise: "Sharper focus, cleaner energy, a real prevention loop.",
    strongestPack: "Brain Sprint Pack",
    futureDevice: "Smart Ring",
  },
};

export const perkStore = {
  title: "Perk Store",
  copy: "Small extras that make your month feel more useful — demos, challenges, pod passes, tonic moments, partner perks, and workshops.",
  featured: [
    { name: "Friend Pod Pass", status: "top-up" },
    { name: "Masterclass Access", status: "preview" },
    { name: "Partner Demo", status: "preview" },
    { name: "Step / Stretch Challenge", status: "included" },
  ],
};

export const packStore = {
  title: "Pack Store",
  copy: "Packs are optional boosts for a specific need. Your core month still works without them.",
  recommendedByPathway: {
    peri: { name: "Sleep Reset Pack", when: "When sleep, temperature, or mood is the main friction.", status: "pack-only" },
    endo: { name: "Endo Relief Burst Pack", when: "During flare-heavy weeks or before travel.", status: "pack-only" },
    metabo: { name: "Camera-Ready Sprint", when: "Before events, shoots, or visible-skin milestones.", status: "pack-only" },
    longevity: { name: "Brain Sprint Pack", when: "For a focus / performance push or heavy workload weeks.", status: "pack-only" },
  } satisfies Record<PathwayKey, { name: string; when: string; status: string }>,
};
