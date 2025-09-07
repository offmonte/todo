import { useMemo, useState } from "react";
import type React from "react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoItem from "@/components/TodoItem";
import type { Category, Filter } from "@/types/todo";

type Props = {
  category: Category;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (categoryId: string, text: string) => void;
  onToggleTodo: (categoryId: string, todoId: string) => void;
  onEditTodo: (categoryId: string, todoId: string, text: string) => void;
  onDeleteTodo: (categoryId: string, todoId: string) => void;
  filter: Filter;
  onMoveTodo: (fromCategoryId: string, toCategoryId: string, todoId: string) => void;
};

export default function CategoryItem({
  category,
  onRename,
  onDelete,
  onAddTodo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  filter,
  onMoveTodo,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(category.name);

  const counts = useMemo(() => {
    const total = category.todos.length;
    const done = category.todos.filter((t) => t.completed).length;
    return { total, done };
  }, [category.todos]);

  const visibleTodos = useMemo(() => {
    if (filter === "pending") return category.todos.filter((t) => !t.completed);
    if (filter === "completed") return category.todos.filter((t) => t.completed);
    return category.todos;
  }, [category.todos, filter]);

  const submitRename = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onRename(category.id, trimmed);
    setEditing(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { fromCategoryId, todoId } = payload as { fromCategoryId: string; todoId: string };
      if (!fromCategoryId || !todoId) return;
      onMoveTodo(fromCategoryId, category.id, todoId);
    } catch {
      // ignore
    }
  };

  return (
    <section className="group rounded-xl border border-black/10 dark:border-white/20 bg-card p-5 shadow-sm transition-shadow hover:shadow-md" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="-mx-5 -mt-5 mb-4 h-1 rounded-t-xl bg-gradient-to-r from-accent to-accent-2" />
      <header className="mb-4 flex items-center justify-between gap-3">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitRename();
              if (e.key === "Escape") setEditing(false);
            }}
            className="min-w-0 flex-1 rounded border border-black/10 dark:border-white/20 bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            aria-label="Editar nome da categoria"
          />
        ) : (
          <h2 className="truncate text-base font-semibold">
            {category.name}
            <span className="ml-2 rounded-full border border-black/10 dark:border-white/20 px-2 py-0.5 text-xs font-normal opacity-80">{counts.done}/{counts.total}</span>
          </h2>
        )}
        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              onClick={() => {
                setDraft(category.name);
                setEditing(true);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs transition-colors hover:bg-muted"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              Editar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={submitRename}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-2 py-1 text-xs font-medium text-white transition-colors hover:brightness-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m20 6-11 11-5-5" />
                </svg>
                Salvar
              </button>
              <button
                onClick={() => onDelete(category.id)}
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
      </header>

      <div className="mb-4">
        <AddTodoForm onAdd={(text) => onAddTodo(category.id, text)} />
      </div>

      {visibleTodos.length === 0 ? (
        <p className="text-sm opacity-70">Nenhum to-do para este filtro.</p>
      ) : (
        <ul className="flex flex-col gap-2" onDragOver={onDragOver} onDrop={onDrop}>
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={(todoId) => onToggleTodo(category.id, todoId)}
              onEdit={(todoId, text) => onEditTodo(category.id, todoId, text)}
              onDelete={(todoId) => onDeleteTodo(category.id, todoId)}
              dragCategoryId={category.id}
            />
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs opacity-60">Dica: arraste um to-do para outra categoria.</p>
    </section>
  );
}
