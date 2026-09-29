"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * useTheme
 * --------
 * A clean, self-contained theme hook. No external dependency.
 *
 * The initial `dark` class is applied by an inline <script> in the
 * root layout BEFORE paint (no flash). This hook simply:
 *   - reads the current state from the DOM on mount
 *   - provides a `toggle()` that updates the class + localStorage
 *   - keeps a React state mirror so consumers re-render on change
 *
 * There is no next-themes, no context provider, no hydration mismatch,
 * and no dual-system conflict. The class on <html> is the single
 * source of truth.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  // Read the actual DOM state on mount (the inline script may have
  // added `.dark` before React hydrated). This is an intentional
  // sync between pre-hydration DOM state and React state.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const setDark = useCallback((dark) => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      /* private mode — ignore */
    }
    setIsDark(dark);
  }, []);

  const toggle = useCallback(() => {
    setDark(!document.documentElement.classList.contains("dark"));
  }, [setDark]);

  return { isDark, toggle, setDark };
}
