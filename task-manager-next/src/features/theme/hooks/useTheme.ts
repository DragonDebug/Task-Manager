"use client";

import { useEffect, useState } from "react";

import {
  resolveThemePreference,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/features/theme/constants";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => resolveThemePreference());

  function updateTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme);
  }

  function toggleTheme() {
    updateTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return {
    theme,
    setTheme: updateTheme,
    toggleTheme,
  };
}