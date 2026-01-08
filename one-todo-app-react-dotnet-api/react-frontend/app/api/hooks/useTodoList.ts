import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoListMutation, deleteTodoListMutation, getTodoListByIdOptions, getTodoListsOptions } from "../generated/@tanstack/react-query.gen";
import { getTodoListById, type DeleteTodoListData } from "../generated";

export const useTodoList = () => {
  return {
    getTodoLists: () => useQuery({
      ...getTodoListsOptions()
    }),
    getTodoListById: (options: Parameters<typeof getTodoListById>[0]) => useQuery({
      ...getTodoListByIdOptions(options)
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