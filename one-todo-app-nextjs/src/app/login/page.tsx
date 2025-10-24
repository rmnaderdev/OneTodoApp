"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const logUserIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "An unknown error occurred.");
      return;
    }

    console.log("Login successful:", data);

    redirect("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-sm rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={logUserIn} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
          <Link href="/signup" className="text-sm text-blue-600 hover:underline mt-4 text-center">
            Don&apos;t have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
