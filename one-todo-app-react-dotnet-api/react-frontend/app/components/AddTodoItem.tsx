import React, { useState } from "react";
import { useGetTodosListContext } from "~/containers/GetTodosListContextProvider";

export const AddTodoItem = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const { getTodos, createTodo } = useGetTodosListContext();
  const todosQuery = getTodos();
  const createMutation = createTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    try {
      await createMutation.mutateAsync({ path: { listId: 1 }, body: { title } });
      await todosQuery.refetch();
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className={`flex-1 rounded-lg border px-4 py-2 text-primary bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${error ? 'border-red-400' : 'border-primary/30'}`}
        aria-label="Todo title"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary cursor-pointer hover:bg-accent text-white font-semibold px-5 py-2 shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!title.trim()}
      >
        Add Todo
      </button>
      {error && (
        <span className="text-red-500 text-sm mt-1 sm:mt-0 sm:ml-2 self-start">{error}</span>
      )}
    </form>
  );
};

