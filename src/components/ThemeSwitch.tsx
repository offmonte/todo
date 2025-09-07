import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Mode = "system" | "light" | "dark";

const options: { key: Mode; label: string; icon: JSX.Element }[] = [
  {
    key: "light",
    label: "Claro",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
        <path d="M12 1v3M12 20v3M4.22 4.22 6.34 6.34M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78 6.34 17.66M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    key: "dark",
    label: "Escuro",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    ),
  },
  {
    key: "system",
    label: "Sistema",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4 5h16a1 1 0 0 1 1 1v10H3V6a1 1 0 0 1 1-1Z"/>
        <path d="M2 18h20v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1Z"/>
      </svg>
    ),
  },
];

export default function ThemeSwitch() {
  const [mode, setMode] = useLocalStorage<Mode>("theme.preference", "system");

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", mode);
    }
  }, [mode]);

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-black/10 dark:border-white/20 bg-card p-1 text-sm">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setMode(opt.key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
            mode === opt.key
              ? "bg-accent text-white"
              : "hover:bg-muted"
          }`}
          aria-pressed={mode === opt.key}
        >
          <span className="opacity-90">{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
