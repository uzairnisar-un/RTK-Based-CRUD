// src/components/ThemeToggle.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../App/redux/slices/themeSlice.js";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-7 right-7  z-50 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 text-emerald-500 transition-all duration-300 hover:scale-110 active:scale-95"
      title="Toggle Dark Mode"
    >
      {mode === "light" ? (
        <FaMoon size={20} />
      ) : (
        <FaSun size={20} className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
