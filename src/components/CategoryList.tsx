import CategoryItem from "@/components/CategoryItem";
import type { Category } from "@/types/todo";

type Props = {
  categories: Category[];
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (categoryId: string, text: string) => void;
  onToggleTodo: (categoryId: string, todoId: string) => void;
  onEditTodo: (categoryId: string, todoId: string, text: string) => void;
  onDeleteTodo: (categoryId: string, todoId: string) => void;
};

export default function CategoryList({
  categories,
  onRename,
  onDelete,
  onAddTodo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: Props) {
  if (categories.length === 0) {
    return <p className="text-sm opacity-70">Crie sua primeira categoria para começar.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        />
      ))}
    </div>
  );
}
