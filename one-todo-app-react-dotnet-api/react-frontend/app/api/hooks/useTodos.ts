import { useMutation, useQuery } from "@tanstack/react-query";
import { NewTodoItem, useApiClient, type INewTodoItem } from "..";

export const useTodos = () => {
  const api = useApiClient();

  return {
    getTodos: () => useQuery({
      queryKey: ["todos"],
      queryFn: async () => {
        return await api.getTodos();
      },
    }),
    createTodo: () => useMutation({
      mutationKey: ["createTodo"],
      mutationFn: async (newTodo: INewTodoItem) => {
        return await api.createTodoItem(new NewTodoItem(newTodo));
      },
    }),
    updateTodo: () => useMutation({
      mutationKey: ["updateTodo"],
      mutationFn: async ({ id, todo }: { id: number; todo: INewTodoItem }) => {
        return await api.updateTodoItem(id, new NewTodoItem(todo));
      },
    }),
    deleteTodo: () => useMutation({
      mutationKey: ["deleteTodo"],
      mutationFn: async (id: number) => {
        return await api.deleteTodoItem(id);
      },
    }),
  }
};