import { useCallback, useEffect, useRef, useState } from "react";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const skipFirstPersist = useRef(true);
  const [value, setValue] = useState<T>(initialValue);

  // Load from storage on mount (after SSR) to avoid hydration mismatch
  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const raw = window.localStorage.getItem(key);
      const next = raw ? (JSON.parse(raw) as T) : initialValue;
      setValue(next);
    } catch {
      // ignore parse errors
    }
  }, [key, initialValue]);

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
        const next = e.newValue ? (JSON.parse(e.newValue) as T) : initialValue;
        setValue(next);
      } catch {
        // ignore parse errors
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue]);

  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => (typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater));
    },
    []
  );

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, update, reset] as const;
}
