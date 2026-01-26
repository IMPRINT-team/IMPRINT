<!-- Suggested use: Outline how to run and extend the web dashboard UI. -->
# Web Dashboard

## Overview
The web dashboard is the IMPRINT front-end experience. It is scaffolded as a Vite-powered React application intended to visualize real-time activity and device status.

## Responsibilities
- Display scan activity, device status, and operational metrics.
- Consume backend APIs to present real-time updates.
- Provide UI workflows for operators and administrators.

## Local Development
- Run `npm run dev -w web-dashboard` from the repo root.
- Use `npm run build -w web-dashboard` for production builds.
- Configure API endpoints via environment variables or Vite config as the UI grows.

## Key Files
- `package.json`: Front-end build and lint scripts.
- `src/`: UI components and application logic (to be implemented).

## Tailwind Theme Tokens (single source of truth)
Use the same names as the proposal to keep everything consistent.

### `tailwind.config.js` (tokens)
```js
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0F172A",     // app background
        bureau: "#1E293B",   // main surface
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          900: "#164E63",
        },
        amber: "#F59E0B",
        magenta: "#EC4899",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        sheet: "0 0 50px -10px rgba(0,0,0,0.7)",
        glowCyan: "0 0 12px rgba(6,182,212,0.55)",
      },
    },
  },
  plugins: [],
};
```

### Global base classes
- App shell background: `bg-void text-slate-300 font-mono`
- Default text: `text-[11px] leading-[1.35]`

### Semantic Color Rules (AI-friendly)
These are hard rules so color meanings stay stable:
- Cyan (`cyan-500/400`) = interactive / active / selected / “system running”
- Amber = warning / constraint / degraded-but-working
- Magenta = error / destructive / revoked / denied
- Slate = neutral / inactive / background

Never use cyan for warnings or errors. Never use amber/magenta for normal links.

## Component Class Recipes (copy/paste ready)
1) App Shell  
`min-h-screen bg-void text-slate-300 font-mono antialiased`

2) Page Header (console identity)  
`flex items-center gap-5 border-b border-cyan-500/30 pb-4`

**Title:**  
`font-serif text-slate-100 font-black uppercase tracking-tight`

**Subtitle / system line:**  
`text-cyan-500 text-[10px] uppercase tracking-[0.3em] font-bold border-l-2 border-cyan-500 pl-3`

3) Grid Layout (12-col, 8/4)  
`grid grid-cols-12 gap-6`

**Main column:**  
`col-span-8 flex flex-col gap-4`

**Right rail:**  
`col-span-4 flex flex-col gap-3`

4) Panel (default)  
`border border-slate-600/30 bg-slate-800/20 p-3`

**Panel title (indexed like the doc):**  
`font-serif text-slate-100 font-bold uppercase text-xs tracking-wider flex items-center gap-2`

**Index prefix:**  
`text-cyan-500`

5) “Primary” Panel (with cyber corners)  
Use for: Live device health, live event stream, critical status.  
`relative border border-slate-700/50 bg-slate-800/30`

Corners implemented as absolutely-positioned spans (see “Cyber Corners” snippet below).

6) Badge / Tag (architecture chips)  
`px-2 py-1 bg-slate-800 border border-slate-600 rounded text-[9px] text-cyan-200`

7) List rows (audit-like entries)  
`flex items-center gap-2 bg-slate-800/20 px-2 py-1 border-l border-slate-700`

**Leading dot:**  
`w-1 h-1 bg-cyan-500 rounded-full`

## State Styling (drop-in utility classes)
Use a single mapping so status is consistent across the app.

**Suggested mapping**

**Online / Active**
- container: `border-cyan-500/40`
- highlight: `shadow-glowCyan`
- text/icon: `text-cyan-400`

**Warning**
- container: `border-amber/30 bg-amber-900/10`
- title: `text-amber`

**Error**
- container: `border-magenta/30 bg-magenta/10`
- title: `text-magenta`

**Neutral**
- container: `border-slate-600/30 bg-slate-800/20`
- text: `text-slate-300`

Rule: Color never stands alone — pair with label text (“ONLINE”, “WARNING”, “ERROR”).

## Cyber Corners (Tailwind + React snippet)
```jsx
function CyberCorners() {
  const base =
    "absolute w-[6px] h-[6px] border-cyan-500 border";
  return (
    <>
      <span className={`${base} top-0 left-0 border-t border-l border-r-0 border-b-0`} />
      <span className={`${base} top-0 right-0 border-t border-r border-l-0 border-b-0`} />
      <span className={`${base} bottom-0 left-0 border-b border-l border-r-0 border-t-0`} />
      <span className={`${base} bottom-0 right-0 border-b border-r border-l-0 border-t-0`} />
    </>
  );
}
```

**Usage:**
```jsx
<div className="relative p-3 bg-slate-800/30 border border-slate-700/50">
  <CyberCorners />
  {/* content */}
</div>
```

## “AI-friendly” React Conventions (implementation rules)
These rules make it easy for an AI (or future-you) to generate consistent UI:
- Every panel is a component with a named role:
  - `DeviceStatusPanel`, `EventStreamPanel`, `ConstraintsPanel`, `AuditLogPanel`
- Every component accepts semantic props (not “colors”):
  - `severity="neutral|info|warning|error"`
  - `status="online|offline|degraded"`
- Class composition is centralized
  - e.g. `ui/panelStyles.ts` exporting `panelVariants`
- No one-off hex values in JSX
  - only Tailwind tokens (`bg-void`, `text-cyan-400`, etc.)
- Stable DOM markers
  - use `data-testid` / `data-role` like `data-role="audit-log"`

## Quick “Starter Skeleton” Page Structure
- Header: system identity + current view name
- Main (8 cols):
  - Live Event Stream (primary, cyber corners)
  - Device table
  - Recent activity / analytics
- Rail (4 cols):
  - Status summary
  - Constraints / warnings
  - Authorization / user role
  - Architecture tags

If you want, I can output:
- a `src/ui/` component kit (Panel, Badge, SectionHeader, StatusPill, LogRow) + class variants, OR
- a full dashboard page scaffold (`Dashboard.tsx`) that matches this style exactly.
