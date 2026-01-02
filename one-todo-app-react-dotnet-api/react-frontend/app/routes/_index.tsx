import type { Route } from "./+types/_index";
import { TodoItemRow } from "~/components/TodoItemRow";
import { AddTodoItem } from "~/components/AddTodoItem";
import { CheckCircle } from "react-feather";
import { useTodo } from "~/api/hooks/useTodos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OneTodo App" },
    { name: "description", content: "Welcome to One Todo app." },
  ];
}

export default function Page() {
  const { getTodoLists } = useTodo();

  const todosQuery = getTodoLists();

  // TODO: List todo lists

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-primary/10 flex items-center justify-center">
      {todosQuery.data ? (
        <div className="w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <CheckCircle className="text-primary" />
            Todos
          </h2>
        </div>
      ) : (
        <div className="text-center text-primary text-lg font-medium animate-pulse">Loading Todos...</div>
      )}
    </div>
  );
}
