'use client';
import { authClient } from "@/lib/auth-client";
import { 
  Button, 
  TextField, 
  Container, 
  Paper, 
  Box, 
  Typography,
  Alert
} from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0],
    });
    if (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.message || "An unknown error occurred.");
      return;
    }

    console.log("Signup successful:", data);

    redirect("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 64px)', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Sign Up
          </Typography>
          
          <Box component="form" onSubmit={signup} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            
            <Box textAlign="center">
              <Link href="/login">
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}