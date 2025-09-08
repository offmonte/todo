# To‑Do by Categories – Project

Task list application organized by categories, built with Next.js (Pages Router) and Tailwind CSS. It includes status filtering, inline editing, drag‑and‑drop between categories, and localStorage persistence.

## Stack
- Next.js 15 (Pages Router)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (+ @tailwindcss/postcss)
- next/font with Poppins (sans) and Geist Mono
- ESLint (next/core-web-vitals, TS)

## Scripts
- dev: `npm run dev`
- build: `npm run build`
- start: `npm start`
- lint: `npm run lint`

## Folder structure
```
.
├─ src/
│  ├─ components/
│  │  ├─ AddCategoryForm.tsx        # Form for a new category
│  │  ├─ AddTodoForm.tsx            # Form for a new to‑do
│  │  ├─ AppFooter.tsx              # Footer (technologies + author)
│  │  ├─ AppHeader.tsx              # Header
│  │  ├─ BackgroundDecor.tsx        # Background decorative elements
│  │  ├─ CategoryItem.tsx           # Category card (CRUD, counters)
│  │  ├─ CategoryList.tsx           # Category grid/list (empty state)
│  │  ├─ FilterBar.tsx              # Filters: all/pending/completed
│  │  ├─ TodoApp.tsx                # App orchestrator
│  │  └─ TodoItem.tsx               # To‑do item (toggle, edit, delete, DnD)
│  ├─ hooks/
│  │  └─ useLocalStorage.ts         # SSR‑safe hook to persist state
│  ├─ pages/
│  │  ├─ api/hello.ts               # Sample API route
│  │  ├─ _app.tsx                   # Global styles import
│  │  ├─ _document.tsx              # HTML shell
│  │  └─ index.tsx                  # Main page (loads TodoApp)
│  ├─ styles/
│  │  └─ globals.css                # Tailwind + CSS tokens and themes
│  └─ types/
│     └─ todo.ts                    # Types: Todo, Category, Filter
├─ eslint.config.mjs                # ESLint (flat config)
├─ next.config.ts                   # Next.js config (strict mode)
├─ postcss.config.mjs               # PostCSS + Tailwind v4
├─ tsconfig.json                    # TS strict + @/* paths
└─ package.json
```

## Architecture and behavior

### Main page (src/pages/index.tsx)
- Loads fonts via `next/font` (Poppins and Geist Mono) and applies font classes.
- Renders layout: `<AppHeader />`, `<TodoApp />`, `<AppFooter />`, and `<BackgroundDecor />`.

### State and persistence
- `TodoApp.tsx` stores categories and the filter using `useLocalStorage` under keys:
  - `todo.categories`: `Category[]`
  - `todo.filter`: `"all" | "pending" | "completed"`
- The hook is SSR‑safe: it only touches `localStorage` on the client, avoids hydration mismatch, and syncs updates across tabs via the `storage` event.

### Domain (src/types/todo.ts)
- `Todo { id, text, completed }`
- `Category { id, name, todos: Todo[] }`
- `Filter = "all" | "pending" | "completed"`

### Main flows
- Categories: create, rename, remove.
- To‑dos: add, complete/uncomplete, inline edit, delete.
- Filter: three options bar that affects items rendered per category.
- Drag‑and‑drop: move a to‑do between categories. `TodoItem` sets the payload (`fromCategoryId`, `todoId`); `CategoryItem` handles `onDrop` and delegates to `onMoveTodo` in `TodoApp` to move between lists.
- Metrics: per‑category counters and total/completed in the app header.

### UI/Styling
- Tailwind v4 with custom CSS tokens in `src/styles/globals.css`:
  - `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--accent-2`.
  - Mapped to the Tailwind theme via `@theme inline` as `bg-background`, `text-foreground`, etc.
- Themes:
  - Light: defined in `:root` and `[data-theme="light"]`.
  - Dark: defined in `[data-theme="dark"]` with a fallback via `@media (prefers-color-scheme: dark)`.
  - Dark palette adjusted to grayish tones: `background #111827`, `card #1f2937`, `muted #374151`, `foreground #e5e7eb`.
- Accessibility: labels/ARIA on inputs, focus on the new category input, `aria-pressed` on FilterBar buttons.

### Components
- `AddCategoryForm`/`AddTodoForm`: controlled, trim‑validate, clear after submit.
- `CategoryList`: empty state with icon and guidance; renders `CategoryItem`.
- `CategoryItem`: counters, inline rename, DnD, filtered list of to‑dos.
- `TodoItem`: checkbox toggle, inline edit (Enter saves, Esc cancels), delete, DnD origin.
- `AppHeader`/`AppFooter`: page layout; footer lists technologies and author credit.
- `BackgroundDecor`: non‑interactive decorative blobs.

## Development
1. Install dependencies: `npm install`.
2. Run: `npm run dev` and open http://localhost:3000.
3. Build: `npm run build` then `npm start`.

## Customization
- Themes: tweak variables in `src/styles/globals.css`.
- Fonts: change in `src/pages/index.tsx` (sans and mono via `next/font`).
- i18n: extract component strings and centralize in a dictionary to switch locale.
- Remote persistence: replace/augment `useLocalStorage` with API/database (e.g., Neon/Supabase) while keeping domain types.

## Author and credits
- Made by Lucas Monte.
- Technologies: Next.js, React, TypeScript, Tailwind CSS, ESLint, next/font.
