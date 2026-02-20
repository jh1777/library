# SKILL: Public API and Barrel Integrity

## Use when

- New component/sub-component is added
- Component files are renamed/moved
- Public symbols are changed

## Required files

- Local barrel: `projects/ui/src/lib/components/<component>/index.ts`
- Top-level barrel: `projects/ui/src/public-api.ts`

## Procedure

1. Export component + models from local `index.ts`
2. Export sub-components intended for public use from local `index.ts`
3. Export component entry point from `public-api.ts`
4. Check demo imports still compile

## Breaking change warning signs

- Removed export names
- Renamed classes/interfaces/enums used by consumers
- Moved symbols without alias/backward export

## Acceptance checklist

- All intended symbols exported exactly once
- No missing exports for changed component tree
- No accidental export removals
