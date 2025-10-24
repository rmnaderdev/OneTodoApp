"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();

  const { data, isPending } = authClient.useSession();

  const name = useMemo(() => {
    if (!data) return null;
    return data.user.name ?? data.user.email;
  }, [data]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-semibold text-slate-900">
              OneTodo
            </Link>
            <nav aria-label="Primary" className="hidden sm:flex gap-2">
              <Link
                href="/"
                className="px-3 py-1 rounded text-sm text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/todos"
                className="px-3 py-1 rounded text-sm text-slate-700 hover:bg-slate-100"
              >
                Todos
              </Link>
              <Link
                href="/about"
                className="px-3 py-1 rounded text-sm text-slate-700 hover:bg-slate-100"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex-1" />

          {!isPending && (
            <div className="flex items-center gap-3">
              {data && name ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden
                      className="h-8 w-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-medium"
                      title={name}
                    >
                      {name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="text-slate-900 font-medium leading-none">
                        {name}
                      </div>
                      <div className="text-slate-500 text-xs">Signed in</div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-1 rounded-md bg-red-50 text-red-700 text-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3 py-1 rounded-md text-sm bg-slate-700 text-white hover:bg-slate-800"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
