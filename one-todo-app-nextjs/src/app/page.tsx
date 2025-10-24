import { auth } from "@/lib/auth";
import AddTodo from "../components/AddTodo";
import { addTodo } from "./actions/todoActions";
import TodoList from "@/components/TodoList";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // If not logged in, redirect to login page
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-black dark:text-zinc-50">
          My Todo List
        </h1>
        <AddTodo addTodoAction={addTodo} />
        <TodoList userId={session.user.id} />
      </main>
    </div>
  );
}
