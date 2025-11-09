import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "One Todo App - Next.js",
  description: "A simple todo app built with Next.js and Tailwind CSS",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
