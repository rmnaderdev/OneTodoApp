import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodos } from "~/api/hooks/useTodos";

export const AddTodoItem = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const { getTodos, createTodo } = useTodos();
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
      await createMutation.mutateAsync({ body: { title } });
      await todosQuery.refetch();
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
      />
      <button type="submit">Add Todo</button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
};

const ErrorMessage = styled.p`
  color: red;
`;
