import { FormEvent, useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Novo to-do"
        className="min-w-0 flex-1 rounded-md border border-black/10 dark:border-white/20 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
        aria-label="Texto do to-do"
      />
      <button
        type="submit"
        className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Adicionar
      </button>
    </form>
  );
}
