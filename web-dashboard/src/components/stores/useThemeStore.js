import { useSyncExternalStore } from "react";

const STORAGE_KEY = "preferred-theme";

const listeners = new Set();

let state = {
  theme: localStorage.getItem(STORAGE_KEY) || "dracula",
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
  localStorage.setItem(STORAGE_KEY, theme);
  state = {
    ...state,
    theme,
  };
  notify();
};

const defaultSelector = (currentState) => currentState;

export const useThemeStore = (selector = defaultSelector) => {
  return useSyncExternalStore(
    subscribe,
    () => selector({
      ...state,
      setTheme,
    }),
    () => selector({
      ...state,
      setTheme,
    })
  );
};
