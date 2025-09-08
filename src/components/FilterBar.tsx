import type { Filter } from "@/types/todo";

type Props = {
  value: Filter;
  onChange: (f: Filter) => void;
};

const options: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "pending", label: "Pendentes" },
  { key: "completed", label: "Concluídos" },
];

export default function FilterBar({ value, onChange }: Props) {
  return (
    <div className="w-full rounded-full border border-black/10 dark:border-white/20 bg-card p-1 text-sm">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`w-full rounded-full px-4 py-2 transition-all ${
                active
                  ? "bg-gradient-to-r from-accent to-accent-2 text-white shadow-sm ring-1 ring-accent/30"
                  : "text-foreground/80 hover:bg-muted"
              }`}
              aria-pressed={active}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
