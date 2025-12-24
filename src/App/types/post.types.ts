import type { ReactNode } from "react";

export interface Post {
  id: string;
  title: string;
  body: string;
  author?: string;
  category?: string;
  createdAt?: string;
  userId?: number;
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
