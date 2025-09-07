export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Category = {
  id: string;
  name: string;
  todos: Todo[];
};
