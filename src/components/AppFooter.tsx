export default function AppFooter() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/20 bg-gradient-to-r from-accent-2/15 to-accent/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-sm opacity-80">
        <p className="whitespace-pre-wrap">
          Feito por <span className="font-medium">Lucas Monte</span>
        </p>
        <p className="text-right">
          Tecnologias: <span className="opacity-90">Next.js</span>, <span className="opacity-90">React</span>, <span className="opacity-90">TypeScript</span>, <span className="opacity-90">Tailwind CSS</span>, <span className="opacity-90">ESLint</span>, <span className="opacity-90">next/font</span>
        </p>
      </div>
    </footer>
  );
}
