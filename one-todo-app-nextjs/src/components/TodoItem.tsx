"use client";

import { deleteTodo, toggleTodo } from "@/app/actions/todoActions";
import { 
  ListItem, 
  ListItemText, 
  IconButton, 
  Checkbox, 
  Box,
  Typography 
} from "@mui/material";
import { Delete } from "@mui/icons-material";

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
    <ListItem
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        bgcolor: todo.completed ? 'action.hover' : 'background.paper',
      }}
      secondaryAction={
        <Box component="form" onSubmit={handleTodoDelete}>
          <input type="hidden" name="id" value={todo.id} />
          <IconButton type="submit" color="error">
            <Delete />
          </IconButton>
        </Box>
      }
    >
      <Box component="form" onSubmit={handleTodoCompleteToggle} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="completed" value={todo.completed ? "false" : "true"} />
        <Checkbox
          checked={todo.completed}
          onClick={(e) => {
            e.preventDefault();
            (e.target as HTMLElement).closest('form')?.requestSubmit();
          }}
        />
        <ListItemText
          primary={
            <Typography
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault();
                (e.target as HTMLElement).closest('form')?.requestSubmit();
              }}
            >
              {todo.content}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
}
