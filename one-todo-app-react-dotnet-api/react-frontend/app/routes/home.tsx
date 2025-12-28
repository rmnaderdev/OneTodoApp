import type { Route } from "./+types/home";
import { useTodos } from "~/api/hooks/useTodos";
import { TodoItemRow } from "~/components/TodoItemRow";
import { AddTodoItem } from "~/components/AddTodoItem";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { getTodos } = useTodos();

  const todosQuery = getTodos();

  return (
    <>
      {todosQuery.data ? (
        <div className="container mx-auto p-4">
          <h2 className="text-lg font-semibold">Todos</h2>
          <div>
            <AddTodoItem />
          </div>
          <ul className="list-disc list-inside">
            {todosQuery.data.map((todo) => (
              <TodoItemRow key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading Todos...</p>
      )}
    </>
  );
}
