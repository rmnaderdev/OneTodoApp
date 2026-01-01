import type { Route } from "./+types/home";
import { useTodos } from "~/api/hooks/useTodos";
import { TodoItemRow } from "~/components/TodoItemRow";
import { AddTodoItem } from "~/components/AddTodoItem";
import { CheckCircle } from "react-feather";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { getTodos } = useTodos();

  const todosQuery = getTodos({ listId: 1 });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-primary/10 flex items-center justify-center">
      {todosQuery.data ? (
        <div className="w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <CheckCircle className="text-primary" />
            Todos
          </h2>
          <div className="mb-6">
            <AddTodoItem />
          </div>
          <span className="text-sm text-gray-500 mb-4 block">
            (Hold <kbd className="border border-gray-300 rounded px-1 py-0.5 bg-gray-100">Ctrl</kbd> to show delete buttons)
          </span>
          <ul className="space-y-3">
            {todosQuery.data.map((todo) => (
              <TodoItemRow key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-primary text-lg font-medium animate-pulse">Loading Todos...</div>
      )}
    </div>
  );
}
