interface Todo {
  id: string;
  category?: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}
interface Category {
  categoryName: string;
  data: Todo[];
}

interface TodoState {
  categories: Category[];
  aboutToMiss: Todo[];
}
export type { Todo, TodoState, Category };
