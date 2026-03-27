# CronForge

Visual cron job platform with execution history, failure alerts, and team collaboration.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | CSS custom properties |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm lint          # ESLint
pnpm format        # Prettier
pnpm deploy        # Build + deploy to Cloudflare Pages
```

## Project Structure

```
src/
  pages/           # Route-level components
  components/
    ui/            # Reusable UI (CronBuilder, HistoryTable, AlertPanel)
    sections/      # Page sections
  hooks/           # Custom React hooks
  lib/             # Utilities (cron parsing, scheduling)
public/
docs/
  vision.md        # North star vision
  prd.md           # Product requirements
.claude/
  agents/          # Agent definitions
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/index.css`)
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)

## Agent Team

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `frontend-dev` | React, components, pages, styling | `src/` | Yes |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| Agent definitions | `.claude/agents/*.md` |
