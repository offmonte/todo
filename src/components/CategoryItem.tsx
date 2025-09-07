import { useMemo, useState } from "react";
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

  const onDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent<HTMLUListElement>) => {
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
    <section className="rounded-lg border border-black/10 dark:border-white/20 bg-background p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between gap-3">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={submitRename}
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
            <span className="ml-2 text-xs font-normal opacity-70">{counts.done}/{counts.total}</span>
          </h2>
        )}
        <div className="flex items-center gap-2">
          {!editing && (
            <button
              onClick={() => {
                setDraft(category.name);
                setEditing(true);
              }}
              className="rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            >
              Renomear
            </button>
          )}
          <button
            onClick={() => onDelete(category.id)}
            className="rounded-md border border-black/10 dark:border-white/20 px-2 py-1 text-xs text-red-600 dark:text-red-400 transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Excluir
          </button>
        </div>
      </header>

      <div className="mb-3">
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
