import { useState } from "react";
import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  dragCategoryId?: string;
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete, dragCategoryId }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const submitEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setEditing(false);
  };

  return (
    <li
      className="flex items-center justify-between gap-3 rounded-md border border-black/10 dark:border-white/20 bg-card px-3 py-2 transition-colors hover:bg-muted/60"
      draggable
      onDragStart={(e) => {
        if (!dragCategoryId) return;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({ fromCategoryId: dragCategoryId, todoId: todo.id })
        );
      }}
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-0.5 size-4 rounded-sm border-black/30 dark:border-white/30 accent-foreground"
          aria-label="Concluir to-do"
        />
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
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
            className={`text-sm break-words whitespace-pre-wrap ${todo.completed ? "line-through opacity-60" : ""}`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!editing ? (
          <button
            onClick={() => {
              setDraft(todo.text);
              setEditing(true);
            }}
            className="rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Editar
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={submitEdit}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-2 py-1 text-xs font-medium text-white transition-colors hover:brightness-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m20 6-11 11-5-5" />
              </svg>
              Salvar
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs text-red-600 dark:text-red-400 transition-colors hover:bg-muted"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Excluir
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
