import React from "react";
import type { highlightProps } from "../App/types/post.types.js";

const HighlightText: React.FC<highlightProps> = ({ text, highlight }) => {
  if (!highlight) return <>{text}</>;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-200/70 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-300 px-1 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightText;
