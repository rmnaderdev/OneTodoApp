import { createContext, useContext } from "react"
import type { useTodoListItems } from "~/api/hooks/useTodoListItems"

type GetTodosListItemsContextType = ReturnType<typeof useTodoListItems>;

export const GetTodosListItemsContext = createContext<GetTodosListItemsContextType | null>(null);

export const useGetTodosListItemsContext = () => {
  const context = useContext(GetTodosListItemsContext);
  if (!context) {
    throw new Error("useGetTodosListItemsContext must be used within a GetTodosListItemsContextProvider");
  }
  return context;
};