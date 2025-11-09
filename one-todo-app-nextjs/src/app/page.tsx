import { auth } from "@/lib/auth";
import AddTodo from "../components/AddTodo";
import { addTodo } from "./actions/todoActions";
import TodoList from "@/components/TodoList";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Container, Paper, Typography, Box } from "@mui/material";

export default async function Home() {
  // If not logged in, redirect to login page
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return redirect('/login');
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
        <Paper elevation={2} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            My Todo List
          </Typography>
          
          <Box sx={{ width: '100%' }}>
            <AddTodo addTodoAction={addTodo} />
            <TodoList userId={session.user.id} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
