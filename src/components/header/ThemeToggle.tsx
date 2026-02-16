"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get current theme from HTML element
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    const newIsDark = !isDark;

    // Remove dark class first
    html.classList.remove("dark");
    
    // Add dark class if needed
    if (newIsDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("✓ Theme set to DARK");
    } else {
      localStorage.setItem("theme", "light");
      console.log("✓ Theme set to LIGHT");
    }

    setIsDark(newIsDark);
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-amber-400" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500" />
      )}
    </button>
  );
}
