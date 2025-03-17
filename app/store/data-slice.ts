import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
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
}

const initialState: TodoState = {
  categories: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<{ categoryName: string }>) {
      state.categories.push({
        categoryName: action.payload.categoryName,
        data: [],
      });
    },
    updateCategoryName(state, action: PayloadAction<{ oldName: string; newName: string }>) {
      const category = state.categories.find((cat) => cat.categoryName === action.payload.oldName);
      if (category) {
        category.categoryName = action.payload.newName;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((cat) => cat.categoryName !== action.payload);
    },
    addTodo(state, action: PayloadAction<{ categoryName: string; todo: Todo }>) {
      const category = state.categories.find(
        (cat) => cat.categoryName === action.payload.categoryName
      );
      if (category) {
        category.data.push(action.payload.todo);
      }
    },
    updateTodo(
      state,
      action: PayloadAction<{ categoryName: string; todoId: string; updatedTodo: Partial<Todo> }>
    ) {
      const category = state.categories.find(
        (cat) => cat.categoryName === action.payload.categoryName
      );
      if (category) {
        const todoIndex = category.data.findIndex((todo) => todo.id === action.payload.todoId);
        if (todoIndex !== -1) {
          category.data[todoIndex] = { ...category.data[todoIndex], ...action.payload.updatedTodo };
        }
      }
    },
    deleteTodo(state, action: PayloadAction<{ categoryName: string; todoId: string }>) {
      const category = state.categories.find(
        (cat) => cat.categoryName === action.payload.categoryName
      );
      if (category) {
        category.data = category.data.filter((todo) => todo.id !== action.payload.todoId);
      }
    },
  },
});
export const {
  setCategories,
  addCategory,
  updateCategoryName,
  deleteCategory,
  addTodo,
  updateTodo,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
export const selectTodosByCategory = (state: { todos: TodoState }, categoryName: string) =>
  state.todos.categories?.find((cat) => cat.categoryName === categoryName)?.data || [];
