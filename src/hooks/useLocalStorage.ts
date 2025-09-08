import { useCallback, useEffect, useRef, useState } from "react";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialRef = useRef(initialValue);
  const skipFirstPersist = useRef(true);
  const [value, setValue] = useState<T>(initialRef.current);

  // Load from storage on mount (after SSR) to avoid hydration mismatch
  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const raw = window.localStorage.getItem(key);
      const next = raw ? (JSON.parse(raw) as T) : initialRef.current;
      setValue(next);
    } catch {
      // ignore parse errors
    }
  }, [key]);

  // Persist changes (skip first to not clobber stored value before initial load)
  useEffect(() => {
    if (!isBrowser()) return;
    if (skipFirstPersist.current) {
      skipFirstPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  // Storage sync across tabs
  useEffect(() => {
    if (!isBrowser()) return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== key) return;
      try {
        const next = e.newValue ? (JSON.parse(e.newValue) as T) : initialRef.current;
        setValue(next);
      } catch {
        // ignore parse errors
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => (typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater));
    },
    []
  );

  const reset = useCallback(() => setValue(initialRef.current), []);

  return [value, update, reset] as const;
}
