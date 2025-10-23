"use client";

import { deleteTodo, toggleTodo } from "@/app/actions/todoActions";

export type TodoItemProps = {
  todo: {
    id: string;
    content: string;
    completed: boolean;
  };
};

export default function TodoItem({ todo }: TodoItemProps) {

  const handleTodoCompleteToggle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await toggleTodo(formData);
  };

  const handleTodoDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await deleteTodo(formData);
  };

  return (
    <div
      key={todo.id}
      className={`flex items-center gap-3 p-2 rounded border transition-colors duration-150
        ${
          todo.completed
            ? "bg-green-50 border-green-300 text-gray-400 line-through"
            : "bg-white border-gray-300 text-gray-800"
        }`}
    >
      {todo.completed && (
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-400 text-white mr-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8l3 3 5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      <form onSubmit={handleTodoCompleteToggle} className="flex-1">
        <input type="hidden" name="id" value={todo.id} />
        <input
          type="hidden"
          name="completed"
          value={todo.completed ? "false" : "true"}
        />
        <button
          type="submit"
          className={`w-full text-left px-2 py-1 rounded transition-colors duration-150
            ${todo.completed ? "text-gray-400" : "text-gray-800"}
            hover:bg-blue-100 active:bg-blue-200`}
        >
          {todo.content}
        </button>
      </form>
      <form onSubmit={handleTodoDelete} className="flex-1">
        <input type="hidden" name="id" value={todo.id} />
        <button
          type="submit"
          className={`w-full text-left px-2 py-1 rounded transition-colors duration-150
            text-red-600 hover:bg-red-100 active:bg-red-200`}
        >
          Delete
        </button>
      </form>
    </div>
  );
}
