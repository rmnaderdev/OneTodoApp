import { createContext, useContext } from "react"
import type { useTodoList } from "~/api/hooks/useTodoList"

type GetTodosListContextType = ReturnType<typeof useTodoList>;

export const GetTodosListContext = createContext<GetTodosListContextType | null>(null);

export const useGetTodosListContext = () => {
  const context = useContext(GetTodosListContext);
  if (!context) {
    throw new Error("useGetTodosListContext must be used within a GetTodosListContextProvider");
  }
  return context;
};