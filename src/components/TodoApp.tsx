import { useCallback, useMemo } from "react";
import AddCategoryForm from "@/components/AddCategoryForm";
import CategoryList from "@/components/CategoryList";
import FilterBar from "@/components/FilterBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Category, Filter } from "@/types/todo";

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function TodoApp() {
  const [categories, setCategories, resetCategories] = useLocalStorage<Category[]>(
    "todo.categories",
    []
  );
  const [filter, setFilter] = useLocalStorage<Filter>("todo.filter", "all");

  const addCategory = useCallback((name: string) => {
    const newCategory: Category = { id: generateId(), name, todos: [] };
    setCategories((prev) => [newCategory, ...prev]);
  }, [setCategories]);

  const renameCategory = useCallback((id: string, name: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }, [setCategories]);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, [setCategories]);

  const addTodo = useCallback((categoryId: string, text: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, todos: [{ id: generateId(), text, completed: false }, ...c.todos] }
          : c
      )
    );
  }, [setCategories]);

  const toggleTodo = useCallback((categoryId: string, todoId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              todos: c.todos.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t)),
            }
          : c
      )
    );
  }, [setCategories]);

  const editTodo = useCallback((categoryId: string, todoId: string, text: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, todos: c.todos.map((t) => (t.id === todoId ? { ...t, text } : t)) }
          : c
      )
    );
  }, [setCategories]);

  const deleteTodo = useCallback((categoryId: string, todoId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, todos: c.todos.filter((t) => t.id !== todoId) } : c
      )
    );
  }, [setCategories]);

  const moveTodo = useCallback((fromCategoryId: string, toCategoryId: string, todoId: string) => {
    if (fromCategoryId === toCategoryId) return;
    setCategories((prev) => {
      let moved: { id: string; text: string; completed: boolean } | undefined;
      const removed = prev.map((c) => {
        if (c.id !== fromCategoryId) return c;
        const idx = c.todos.findIndex((t) => t.id === todoId);
        if (idx === -1) return c;
        moved = c.todos[idx];
        const nextTodos = [...c.todos.slice(0, idx), ...c.todos.slice(idx + 1)];
        return { ...c, todos: nextTodos };
      });
      if (!moved) return prev;
      return removed.map((c) => (c.id === toCategoryId ? { ...c, todos: [moved!, ...c.todos] } : c));
    });
  }, [setCategories]);

  const totalCounts = useMemo(() => {
    const total = categories.reduce((acc, c) => acc + c.todos.length, 0);
    const done = categories.reduce((acc, c) => acc + c.todos.filter((t) => t.completed).length, 0);
    return { total, done };
  }, [categories]);

  return (
    <main className="row-start-2 flex w-full max-w-6xl flex-col items-stretch gap-6">
      <header className="flex flex-col gap-4 rounded-xl border border-black/10 dark:border-white/20 bg-background/80 p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">To-Do by Categories</h1>
          <p className="text-sm opacity-70">
            {totalCounts.done}/{totalCounts.total} completed
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-[520px]">
          <FilterBar value={filter} onChange={setFilter} />
          <AddCategoryForm onAdd={addCategory} />
        </div>
      </header>

      <CategoryList
        categories={categories}
        onRename={renameCategory}
        onDelete={deleteCategory}
        onAddTodo={addTodo}
        onToggleTodo={toggleTodo}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo}
        filter={filter}
        onMoveTodo={moveTodo}
      />

      <footer className="row-start-3 mt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => resetCategories()}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/20 px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Clear all
        </button>
      </footer>
    </main>
  );
}
