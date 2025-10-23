"use client";
import { useState } from "react";

export type AddTodoProps = {
  addTodoAction: (formData: FormData) => Promise<void>;
};

export default function AddTodo({ addTodoAction }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await addTodoAction(formData);
    setText("");
  };

  return (
    <form
      className="flex w-full gap-2 mb-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="content"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 rounded border px-3 py-2 text-base"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
}
