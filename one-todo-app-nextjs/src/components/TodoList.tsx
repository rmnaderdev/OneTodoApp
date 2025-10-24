import prisma from "@/lib/db";
import TodoItem from "./TodoItem";

type Props = {
	userId: string;
};

export default async function TodoList({ userId }: Props) {
  const todos = await prisma.todoItem.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });

	return (
		<div className="flex flex-col gap-2">
			{todos.length === 0 ? (
				<div className="text-gray-400 text-center py-4">No todos yet.</div>
			) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
			)}
		</div>
	);
}
