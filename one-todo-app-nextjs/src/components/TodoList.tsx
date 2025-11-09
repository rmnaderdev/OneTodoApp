import prisma from "@/lib/db";
import TodoItem from "./TodoItem";
import { List, Typography, Box } from "@mui/material";

type Props = {
	userId: string;
};

export default async function TodoList({ userId }: Props) {
  const todos = await prisma.todoItem.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });

	return (
		<Box>
			{todos.length === 0 ? (
				<Box sx={{ textAlign: 'center', py: 4 }}>
					<Typography color="text.secondary">
						No todos yet. Add one above!
					</Typography>
				</Box>
			) : (
				<List>
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</List>
			)}
		</Box>
	);
}
