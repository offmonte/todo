import { useMemo } from "react";
import AddCategoryForm from "@/components/AddCategoryForm";
import CategoryList from "@/components/CategoryList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Category } from "@/types/todo";

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function TodoApp() {
  const [categories, setCategories, resetCategories] = useLocalStorage<Category[]>(
    "todo.categories",
    []
  );

  const addCategory = (name: string) => {
    const newCategory: Category = { id: generateId(), name, todos: [] };
    setCategories((prev) => [newCategory, ...prev]);
  };

  const renameCategory = (id: string, name: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addTodo = (categoryId: string, text: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, todos: [{ id: generateId(), text, completed: false }, ...c.todos] }
          : c
      )
    );
  };

  const toggleTodo = (categoryId: string, todoId: string) => {
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
  };

  const editTodo = (categoryId: string, todoId: string, text: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, todos: c.todos.map((t) => (t.id === todoId ? { ...t, text } : t)) }
          : c
      )
    );
  };

  const deleteTodo = (categoryId: string, todoId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, todos: c.todos.filter((t) => t.id !== todoId) } : c
      )
    );
  };

  const totalCounts = useMemo(() => {
    const total = categories.reduce((acc, c) => acc + c.todos.length, 0);
    const done = categories.reduce((acc, c) => acc + c.todos.filter((t) => t.completed).length, 0);
    return { total, done };
  }, [categories]);

  return (
    <main className="row-start-2 flex w-full max-w-6xl flex-col items-stretch gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">To-Do por Categorias</h1>
          <p className="text-sm opacity-70">
            {totalCounts.done}/{totalCounts.total} concluídos
          </p>
        </div>
        <div className="sm:min-w-[420px]">
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
      />

      <footer className="row-start-3 mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => resetCategories()}
          className="rounded-full border border-black/10 dark:border-white/20 px-4 py-2 text-sm transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
        >
          Limpar tudo
        </button>
      </footer>
    </main>
  );
}
