import type { ReactNode } from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
