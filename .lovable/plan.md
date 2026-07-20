## Goal

Break the 1851-line `src/components/StretchPrototype.tsx` into the requested layered folders without changing any visible behavior, copy, or pathway logic. Replace the internal `step` string state with real React Router routes.

## New folder layout

```text
src/
  app/
    router.tsx           # Route table + step<->URL sync
  domain/
    types.ts             # PathwayKey, JourneyTab, Pathway, MonthBlock, StackStatus, PassportStamp, CatalogOption, ControlledSwap, MonthCardSummary, DemoTile, KitCategory, PackMeta, PodDetail
    pathways.ts          # pathways, pathwayKeys, previewCards, lockedCards, pathwayDefaults, pathwayKeyFromTitle, detectPathway
    prices.ts            # kits, pods, passes, passCatalog, highTierPasses, stickyPerks, featuredPerks, perkStatusMap, recommendedPackForPathway, packMeta, packMetaFor, pathwayPacks
    credits.ts           # passportStamps, MBC copy
    planComposition.ts   # blockWhy, blockPlain, planPlain, buildMonthStack, buildPlanCards, builderSummaries
    catalogs.ts          # specialistCatalog, functionalCatalog, coachingCatalog, mentalCatalog, reviewCatalog, diagnosticsCatalog, podCatalog, podAgendas, podDetails, kitCategoriesFor, kitCatalog, packsCatalog, futureCatalog, optionExplainers, aliasExplainers, keywordExplainers, explainOption, controlledSwapOptions, swapTargetName, catalogForBlock, rebalanceOptions, goals, quiz, demoTiles
    index.ts             # Barrel re-export
  components/
    shell/
      SoftCard.tsx
      SectionTitle.tsx
    cards/               # (README stub for now; screens keep inline cards)
    drawers/             # (README stub for now; drawer components stay co-located with StretchPrototype until a follow-up refactor)
  features/
    stretch/
      StretchPrototype.tsx   # The current giant component, minus the extracted domain and shell modules
      index.ts               # export { default } from "./StretchPrototype"
  components/
    StretchPrototype.tsx     # Thin re-export shim → features/stretch (keeps existing imports working)
```

## Router

`src/App.tsx` mounts `<AppRouter />` from `src/app/router.tsx`.

Route → initial `step` mapping:

| Path            | Step        |
|-----------------|-------------|
| `/`             | `landing`   |
| `/quiz`         | `quiz`      |
| `/blueprint`    | `built`     |
| `/customize`    | `builder`   |
| `/home`         | `home`      |
| `/credits`      | `wallet`    |
| `/pathways`     | `pathways`  |
| `/journey`      | `journey`   |
| `/operator`     | `care`      |
| `/*`            | `NotFound`  |

`StretchPrototype` accepts `initialStep?: Step`, and a `useEffect` calls `navigate(pathForStep(step))` whenever `step` changes so URL and internal state stay in sync. This preserves the existing in-component navigation (`setStep(...)`) verbatim.

## Preservation guarantees

- No copy, pathway data, credit rules, or recommendation logic is edited — only relocated.
- All drawers, quiz routing, plan reveal, month builder, home, credits, pathway dashboards, coach modal, and operator preview keep the same behavior.
- `src/lib/mcp/data.ts` is unchanged (its inline mirror stays as-is; a follow-up can dedupe against `src/domain`).
- No backend changes, no visual redesign.

## Verification

- `tsgo` typecheck passes.
- Load `/`, click through quiz → blueprint → customize → home, open a blueprint drawer, open coach modal, toggle operator preview — all identical to today.
- URL updates as the user moves between screens; back button walks the flow.

## Technical notes

- Extraction is mechanical cut/paste; imports in `features/stretch/StretchPrototype.tsx` replace deleted local declarations.
- `pathwayKey` param placement in `PathwayKey = ...` type stays at the top of `types.ts` so `Pathway` can reference it.
- Circular-import risk: `catalogs.ts` depends on `pathways.ts` (for `PathwayKey`); one-way, safe.
- The `components/StretchPrototype.tsx` shim keeps `src/pages/Index.tsx` and any other importers working with no edits.
- Router uses the existing `BrowserRouter` in `App.tsx`; no new dependency.
