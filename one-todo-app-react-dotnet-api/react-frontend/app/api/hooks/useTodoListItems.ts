import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoItemMutation, deleteTodoItemMutation, getTodoListByIdOptions, updateTodoItemMutation } from "../generated/@tanstack/react-query.gen";

export const useTodoListItems = ({ listId }: { listId: number }) => {
  return {
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