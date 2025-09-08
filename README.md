# To-Do por Categorias – Projeto

Aplicação de lista de tarefas organizada por categorias, construída com Next.js (Pages Router) e Tailwind CSS. Inclui filtro por status, edição inline, drag‑and‑drop entre categorias e persistência em localStorage.

## Stack
- Next.js 15 (Pages Router)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (+ @tailwindcss/postcss)
- next/font com Poppins (sans) e Geist Mono
- ESLint (next/core-web-vitals, TS)

## Scripts
- dev: `npm run dev`
- build: `npm run build`
- start: `npm start`
- lint: `npm run lint`

## Estrutura de pastas
```
.
├─ src/
│  ├─ components/
│  │  ├─ AddCategoryForm.tsx        # Formulário para nova categoria
│  │  ├─ AddTodoForm.tsx            # Formulário para novo to‑do
│  │  ├─ AppFooter.tsx              # Rodapé (tecnologias + autor)
│  │  ├─ AppHeader.tsx              # Cabeçalho
│  │  ├─ BackgroundDecor.tsx        # Elementos decorativos de fundo
│  │  ├─ CategoryItem.tsx           # Card de categoria (CRUD, contadores)
│  │  ├─ CategoryList.tsx           # Lista/grid de categorias (estado vazio)
│  │  ├─ FilterBar.tsx              # Filtros: all/pending/completed
│  │  ├─ TodoApp.tsx                # Orquestrador da aplicação
│  │  └─ TodoItem.tsx               # Item de to‑do (toggle, editar, excluir, DnD)
│  ├─ hooks/
│  │  └─ useLocalStorage.ts         # Hook SSR‑safe para persistir estado
│  ├─ pages/
│  │  ├─ api/hello.ts               # Exemplo de API route
│  │  ├─ _app.tsx                   # Import de estilos globais
│  │  ├─ _document.tsx              # HTML shell
│  │  └─ index.tsx                  # Página principal (carrega TodoApp)
│  ├─ styles/
│  │  └─ globals.css                # Tailwind + tokens CSS e temas
│  └─ types/
│     └��� todo.ts                    # Tipos: Todo, Category, Filter
├─ eslint.config.mjs                # ESLint (flat config)
├─ next.config.ts                   # Next.js config (strict mode)
├─ postcss.config.mjs               # PostCSS + Tailwind v4
├─ tsconfig.json                    # TS strict + paths @/*
└─ package.json
```

## Arquitetura e funcionamento

### Página principal (src/pages/index.tsx)
- Carrega fontes via `next/font` (Poppins e Geist Mono) e aplica classes de fonte.
- Renderiza layout: `<AppHeader />`, `<TodoApp />`, `<AppFooter />` e `<BackgroundDecor />`.

### Estado e persistência
- `TodoApp.tsx` mantém as categorias e o filtro com `useLocalStorage` em chaves:
  - `todo.categories`: `Category[]`
  - `todo.filter`: `"all" | "pending" | "completed"`
- O hook é SSR‑safe: só lê/escreve em `localStorage` no client, evita mismatch de hidratação e sincroniza alterações entre abas via evento `storage`.

### Domínio (src/types/todo.ts)
- `Todo { id, text, completed }`
- `Category { id, name, todos: Todo[] }`
- `Filter = "all" | "pending" | "completed"`

### Fluxos principais
- Categorias: criar, renomear, remover.
- To‑dos: adicionar, concluir/desmarcar, editar inline, excluir.
- Filtro: barra com três opções que afeta os itens renderizados por categoria.
- Drag‑and‑drop: arrastar um to‑do entre categorias. `TodoItem` define o payload (`fromCategoryId`, `todoId`); `CategoryItem` trata `onDrop` e delega para `onMoveTodo` em `TodoApp` para mover entre listas.
- Métricas: contadores por categoria e total/concluídos no cabeçalho do app.

### UI/Estilo
- Tailwind v4 com tokens CSS customizados em `src/styles/globals.css`:
  - `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--accent-2`.
  - Mapeados para o tema Tailwind via `@theme inline` como `bg-background`, `text-foreground`, etc.
- Temas:
  - Light: definido em `:root` e `[data-theme="light"]`.
  - Dark: definido em `[data-theme="dark"]` e fallback por `@media (prefers-color-scheme: dark)`.
  - Paleta dark ajustada para tons acinzentados: `background #111827`, `card #1f2937`, `muted #374151`, `foreground #e5e7eb`.
- Acessibilidade: labels/ARIA em inputs, foco no input de nova categoria, botões com `aria-pressed` na FilterBar.

### Componentes
- `AddCategoryForm`/`AddTodoForm`: controlados, validam `trim`, limpam após submit.
- `CategoryList`: estado vazio com ícone e orientações; renderiza `CategoryItem`.
- `CategoryItem`: contadores, rename inline, DnD, lista filtrada dos to‑dos.
- `TodoItem`: toggle via checkbox, edição inline (Enter salva, Esc cancela), exclusão, origem do DnD.
- `AppHeader`/`AppFooter`: layout da página; rodapé lista tecnologias e crédito do autor.
- `BackgroundDecor`: blobs decorativos não interativos.

## Desenvolvimento
1. Instalar dependências: `npm install`.
2. Rodar: `npm run dev` e abrir http://localhost:3000.
3. Build: `npm run build` e `npm start`.

## Personalização
- Temas: ajuste variáveis em `src/styles/globals.css`.
- Fontes: altere em `src/pages/index.tsx` (fonte sans e mono via `next/font`).
- i18n: extraia strings dos componentes e centralize em um dicionário para alternar idioma.
- Persistência remota: substitua/localmente complemente `useLocalStorage` por API/database (ex.: Neon/Supabase) mantendo os tipos de domínio.

## Autor e créditos
- Feito por Lucas Monte.
- Tecnologias: Next.js, React, TypeScript, Tailwind CSS, ESLint, next/font.
