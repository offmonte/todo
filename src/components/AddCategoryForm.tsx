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
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nova categoria"
        className="flex-1 rounded-md border border-black/10 dark:border-white/20 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
        aria-label="Nome da categoria"
      />
      <button
        type="submit"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Adicionar
      </button>
    </form>
  );
}
