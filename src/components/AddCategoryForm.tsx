import { FormEvent, useState } from "react";

type Props = {
  onAdd: (name: string) => void;
};

export default function AddCategoryForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl items-center gap-2">
      <input
        id="add-category-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category"
        className="flex-1 rounded-md border border-black/10 dark:border-white/20 bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="Category name"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add
      </button>
    </form>
  );
}
