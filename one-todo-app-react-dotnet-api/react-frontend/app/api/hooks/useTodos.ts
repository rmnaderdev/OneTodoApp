import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoItemMutation, deleteTodoItemMutation, getTodosOptions, updateTodoItemMutation } from "../generated/@tanstack/react-query.gen";
import type { GetTodosData } from "../generated";

export const useTodos = () => {
  return {
    getTodos: ({ listId }: GetTodosData['path']) => useQuery({
      ...getTodosOptions({ path: {
        listId,
      } })
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