import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./data-slice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
