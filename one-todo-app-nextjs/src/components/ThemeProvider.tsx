"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setSystemMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

// Get the actual theme mode for MUI (converts 'system' to 'light' or 'dark')
const getActualMode = (mode: ThemeMode): "light" | "dark" => {
  if (mode === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
  return mode;
};

const createAppTheme = (mode: ThemeMode) => {
  const actualMode = getActualMode(mode);

  return createTheme({
    palette: {
      mode: actualMode,
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: actualMode === "light" ? "#f5f5f5" : "#121212",
        paper: actualMode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: actualMode === "light" ? "#333333" : "#ffffff",
        secondary: actualMode === "light" ? "#666666" : "#b3b3b3",
      },
    },
    typography: {
      fontFamily: "var(--font-roboto)",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.75rem",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: actualMode === "light" ? "#ffffff" : "#1e1e1e",
            color: actualMode === "light" ? "#333333" : "#ffffff",
          },
        },
      },
    },
  });
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Always start with light mode for SSR consistency
  const [mode, setMode] = useState<ThemeMode>("light");

  // Initialize theme preference on first render (client-side only)
  useEffect(() => {
    const initializeTheme = () => {
      const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
      if (savedMode) {
        setMode(savedMode);
      } else {
        // Default to system preference
        setMode("system");
      }
    };

    // Use setTimeout to avoid direct setState in useEffect
    const timeoutId = setTimeout(initializeTheme, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      // Force re-render when system theme changes
      setMode("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  const toggleTheme = () => {
    const newMode =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-mode", newMode);
    }
  };

  const setSystemMode = () => {
    setMode("system");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-mode", "system");
    }
  };

  const theme = createAppTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setSystemMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
