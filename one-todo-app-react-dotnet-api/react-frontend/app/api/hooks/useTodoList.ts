import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoItemMutation, deleteTodoItemMutation, getTodosOptions, updateTodoItemMutation } from "../generated/@tanstack/react-query.gen";

export const useTodoList = ({ listId }: { listId: number }) => {
  return {
    getTodos: () => useQuery({
      ...getTodosOptions({ 
        path: { listId },
      })
    }),
    createTodo: () => useMutation({
      ...createTodoItemMutation({
        path: { listId },
      })
    }),
    updateTodo: () => useMutation({
      ...updateTodoItemMutation()
    }),
    deleteTodo: () => useMutation({
      ...deleteTodoItemMutation()
    }),
  }
};