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
    <div className="inline-flex overflow-hidden rounded-full border border-black/10 dark:border-white/20 bg-background p-1 text-sm">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-3 py-1.5 transition-colors ${
            value === opt.key
              ? "bg-foreground text-background"
              : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          }`}
          aria-pressed={value === opt.key}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
