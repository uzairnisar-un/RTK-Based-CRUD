import React, { useState } from "react";
import type { ShineImageProps } from "../App/types/post.types.js";

const ShineImage = ({ src, alt, className }: ShineImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${className}`}
    >
      {/* Skeleton / Blur Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-slate-100 dark:via-slate-700 to-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-full object-cover transition-all duration-700 ease-in-out
          ${
            isLoaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-lg scale-110"
          }
        `}
      />
    </div>
  );
};

export default ShineImage;
