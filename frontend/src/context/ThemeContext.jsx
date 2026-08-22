import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Enforce unified luxury dark obsidian mode across entire platform
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("kevalbio_theme", "dark");
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    // Keep consistent dark theme
    setThemeState("dark");
  };

  const setTheme = () => {
    setThemeState("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme, setTheme, isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
