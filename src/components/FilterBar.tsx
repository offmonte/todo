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
    <div className="inline-flex overflow-hidden rounded-full border border-black/10 dark:border-white/20 bg-card p-1 text-sm">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-3 py-1.5 transition-colors ${
            value === opt.key
              ? "bg-accent text-white"
              : "hover:bg-muted"
          }`}
          aria-pressed={value === opt.key}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
