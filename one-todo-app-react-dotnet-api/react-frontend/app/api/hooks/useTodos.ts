import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoItemMutation, deleteTodoItemMutation, getTodosOptions, updateTodoItemMutation } from "../generated/@tanstack/react-query.gen";

export const useTodos = () => {
  return {
    getTodos: () => useQuery({
      ...getTodosOptions()
    }),
    createTodo: () => useMutation({
      ...createTodoItemMutation()
    }),
    updateTodo: () => useMutation({
      ...updateTodoItemMutation()
    }),
    deleteTodo: () => useMutation({
      ...deleteTodoItemMutation()
    }),
  }
};