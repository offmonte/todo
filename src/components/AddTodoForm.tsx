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
        placeholder="New to-do"
        className="min-w-0 flex-1 rounded-md border border-black/10 dark:border-white/20 bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="To-do text"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:brightness-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add
      </button>
    </form>
  );
}
