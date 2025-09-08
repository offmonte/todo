import CategoryItem from "@/components/CategoryItem";
import type { Category, Filter } from "@/types/todo";

type Props = {
  categories: Category[];
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (categoryId: string, text: string) => void;
  onToggleTodo: (categoryId: string, todoId: string) => void;
  onEditTodo: (categoryId: string, todoId: string, text: string) => void;
  onDeleteTodo: (categoryId: string, todoId: string) => void;
  filter: Filter;
  onMoveTodo: (fromCategoryId: string, toCategoryId: string, todoId: string) => void;
};

export default function CategoryList({
  categories,
  onRename,
  onDelete,
  onAddTodo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  filter,
  onMoveTodo,
}: Props) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-black/10 dark:border-white/20 bg-card p-10 text-center">
        <div className="mb-3 grid size-16 place-items-center rounded-full bg-accent/15 text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 12H2" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /><path d="M9 12V7a3 3 0 1 1 6 0v5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Nenhuma categoria criada</h3>
        <p className="mt-1 max-w-md text-sm opacity-70">Comece criando sua primeira categoria para organizar suas tarefas.</p>
        <button
          onClick={() => {
            const el = document.getElementById("add-category-input") as HTMLInputElement | null;
            if (el) { el.focus(); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Criar Categoria
        </button>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          onRename={onRename}
          onDelete={onDelete}
          onAddTodo={onAddTodo}
          onToggleTodo={onToggleTodo}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
          filter={filter}
          onMoveTodo={onMoveTodo}
        />
      ))}
    </div>
  );
}
