export default function AppFooter() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/20 bg-gradient-to-r from-accent-2/15 to-accent/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-sm opacity-80">
        <p>
          Feito com
          <span className="mx-1">🧩</span>
          para máxima organização
        </p>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><span>✔️</span> Conclua</span>
          <span className="inline-flex items-center gap-1"><span>🗂️</span> Categorize</span>
          <span className="inline-flex items-center gap-1"><span>🔄</span> Sincronize</span>
        </div>
      </div>
    </footer>
  );
}
