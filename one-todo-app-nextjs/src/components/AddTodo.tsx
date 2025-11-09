"use client";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        name="content"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        fullWidth
      />
      <Button type="submit" variant="contained" startIcon={<Add />}>
        Add
      </Button>
    </Box>
  );
}
