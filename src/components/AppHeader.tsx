export default function AppHeader() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/20 bg-gradient-to-r from-accent/15 to-accent-2/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-accent text-white shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-sm opacity-70">Get organized</p>
            <h1 className="text-lg font-semibold">ToolDo</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
