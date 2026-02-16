import { useSyncExternalStore } from "react";

const STORAGE_KEY = "preferred-theme";

const listeners = new Set();

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return "dracula";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "dracula";
};

let snapshot = {
  theme: getStoredTheme(),
  setTheme: () => {},
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const setTheme = (theme) => {
  if (snapshot.theme === theme) {
    return;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  snapshot = {
    ...snapshot,
    theme,
  };

  notify();
};

snapshot = {
  ...snapshot,
  setTheme,
};

const getSnapshot = () => snapshot;

const defaultSelector = (state) => state;

export const useThemeStore = (selector = defaultSelector) => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return selector(state);
};
