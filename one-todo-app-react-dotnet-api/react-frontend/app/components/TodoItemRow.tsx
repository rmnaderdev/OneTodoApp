import { useEffect, useState } from "react";
import { Trash, CheckCircle, Circle } from "react-feather";
import { useTodos } from "~/api/hooks/useTodos";
import type { TodoItem } from "~/api/generated";

type Props = {
  todo: TodoItem;
};

export const TodoItemRow = ({ todo }: Props) => {
  const [showDelete, setShowDelete] = useState(false);

  const { deleteTodo, getTodos, updateTodo } = useTodos();
  const todosQuery = getTodos({ listId: 1 });
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
      path: { listItemId: Number(todo.id!) },
      body: {
        title: todo.title!,
        isCompleted: !todo.isCompleted,
      },
    });
    await todosQuery.refetch();
  };

  const onDeleteTodo = async (e: React.MouseEvent<HTMLButtonElement>, todo: TodoItem) => {
    e.stopPropagation();
    
    await deleteTodoMutation.mutateAsync({
      path: { listItemId: Number(todo.id!) },
    });
    await todosQuery.refetch();
  };

  return (
    <li
      onClick={() => handleToggleTodo(todo)}
      className={[
        "flex items-center px-4 py-3 rounded-xl shadow-sm border transition-colors cursor-pointer",
        todo.isCompleted
          ? "bg-primary/10 border-primary/40"
          : "bg-white border-primary/30",
        "hover:bg-primary/10 hover:border-primary/60",
      ].join(" ")}
      aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
    >
      <span className="mr-1">
        {todo.isCompleted ? (
          <CheckCircle className="w-5 h-5 text-primary group-hover:text-accent" />
        ) : (
          <Circle className="w-5 h-5 text-primary/20 group-hover:text-accent" />
        )}
      </span>
      <span
        className={
          "text-base flex-1 " +
          (todo.isCompleted ? "line-through text-primary/40" : "text-primary")
        }
      >
        {todo.title}
      </span>
      {showDelete && (
        <button
          type="button"
          aria-label="Delete todo"
          title="Delete todo"
          onClick={(e) => onDeleteTodo(e, todo)}
          className="ml-2 p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </li>
  );
};
