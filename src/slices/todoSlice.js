import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: JSON.parse(localStorage.getItem("listItems")) || [],
    filter: "all",
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: new Date().toISOString(),
        text: action.payload,
        completed: false,
      });
      localStorage.setItem("listItems", JSON.stringify(state.list));
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("listItems", JSON.stringify(state.list));
    },
    filterTodos: (state, action) => {
      state.filter = action.payload;
    },
    reorderTodos: (state, action) => {
      state.list = action.payload; // Atualiza a lista com a nova ordem
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, filterTodos, reorderTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
