import { useState } from "react";
import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const submitEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-black/10 dark:border-white/20 bg-background px-3 py-2">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="size-4 rounded-sm border-black/30 dark:border-white/30 accent-foreground"
          aria-label="Concluir to-do"
        />
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitEdit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="min-w-0 flex-1 rounded border border-black/10 dark:border-white/20 bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            aria-label="Editar to-do"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`truncate text-sm ${todo.completed ? "line-through opacity-60" : ""}`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!editing && (
          <button
            onClick={() => {
              setDraft(todo.text);
              setEditing(true);
            }}
            className="rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Editar
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs text-red-600 dark:text-red-400 transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
