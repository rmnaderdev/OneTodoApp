import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoListMutation, deleteTodoListMutation, getTodoListsOptions } from "../generated/@tanstack/react-query.gen";
import { type DeleteTodoListData } from "../generated";

export const useTodo = () => {
  return {
    getTodoLists: () => useQuery({
      ...getTodoListsOptions()
    }),
    createTodoList: () => useMutation({
      ...createTodoListMutation()
    }),
    deleteTodoList: (path: DeleteTodoListData['path'] ) => useMutation({
      ...deleteTodoListMutation({
        path
      })
    })
  }
};