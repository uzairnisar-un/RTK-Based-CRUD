import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { ThemeProviderProps } from "../App/types/post.types.js";

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const mode = useSelector((state: any) => state.theme.mode);

  useEffect(() => {
    // Select the root html element
    const root = window.document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;
