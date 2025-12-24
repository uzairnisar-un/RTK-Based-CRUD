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
export interface highlightProps {
  text: string;
  highlight: string;
}

export interface ShineImageProps {
  src: string;
  alt: string;
  className: string;
}
export interface Annotation {
  id: number;
  postId: number;
  selectedText: string;
  comment: string;
  createdAt: string;
}
