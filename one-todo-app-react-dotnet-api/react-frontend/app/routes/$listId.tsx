import type { Route } from "./+types/$listId";
import { AddTodoItem } from "~/components/AddTodoItem";
import { CheckCircle } from "react-feather";
import { GetTodosListItemsContext } from "~/containers/GetTodosListContextProvider";
import { Link } from "react-router";
import { useTodoList } from "~/api/hooks/useTodoList";
import { TodoItemRow } from "~/components/TodoItemRow";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OneTodo App" },
    { name: "description", content: "Welcome to One Todo app." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { listId: Number(params.listId) };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { listId } = loaderData;

  
  const useTodoListApi = useTodoList();
  const { getTodoListById } = useTodoListApi;

  const todosQuery = getTodoListById({ path: { listId } });

  // TODO: List todo lists

  return (
    <GetTodosListItemsContext.Provider value={useTodoListApi}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-primary/10 flex items-center justify-center">

        <Link to="/" className="absolute top-4 left-4 text-primary hover:underline">← Back to Lists</Link>
      
        {todosQuery.data ? (
          <div className="w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              {}
            </h2>
            <div className="mb-6">
              <AddTodoItem />
            </div>
            <span className="text-sm text-gray-500 mb-4 block">
              (Hold{" "}
              <kbd className="border border-gray-300 rounded px-1 py-0.5 bg-gray-100">
                Ctrl
              </kbd>{" "}
              to show delete buttons)
            </span>
            <ul className="space-y-3">
              {todosQuery.data.items?.map((todo) => (
                <TodoItemRow key={todo.id} todo={todo} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-primary text-lg font-medium animate-pulse">
            Loading Todos...
          </div>
        )}
      </div>
    </GetTodosListItemsContext.Provider>
  );
}
