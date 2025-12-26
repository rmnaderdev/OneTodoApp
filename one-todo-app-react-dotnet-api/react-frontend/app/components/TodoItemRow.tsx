import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { TodoItem } from "~/api";
import { Trash } from "react-feather";
import { useTodos } from "~/api/hooks/useTodos";

type Props = {
  todo: TodoItem;
};

export const TodoItemRow = ({ todo }: Props) => {
  const [showDelete, setShowDelete] = useState(false);

  const { deleteTodo, getTodos, updateTodo } = useTodos();
  const todosQuery = getTodos();
  const updateTodoMutation = updateTodo();
  const deleteTodoMutation = deleteTodo();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) setShowDelete(true);
    };
    const onKeyUp = () => setShowDelete(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const handleToggleTodo = async (todo: TodoItem) => {
    await updateTodoMutation.mutateAsync({
      id: todo.id!,
      todo: { title: todo.title, isCompleted: !todo.isCompleted },
    });
    await todosQuery.refetch();
  };

  const onDeleteTodo = async (todo: TodoItem) => {
    await deleteTodoMutation.mutateAsync(todo.id!);
    await todosQuery.refetch();
  };

  return (
    <li
      key={todo.id}
      className="text-gray-700 dark:text-gray-200 flex items-center gap-2"
    >
      <TodoToggle onClick={() => handleToggleTodo(todo)}>
        {todo.title} {todo.isCompleted ? "✔️" : "❌"}
      </TodoToggle>
      {showDelete && (
        <IconButton
          type="button"
          aria-label="Delete todo"
          title="Delete todo"
          onClick={() => onDeleteTodo(todo)}
        >
          <Trash className="w-4 h-4" />
        </IconButton>
      )}
    </li>
  );
};

const TodoToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: inherit;
  background: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    border-color: currentColor;
  }
`;
