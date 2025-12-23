import React, { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emrald-500 via-cyan-400 to-blue-500 transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 15px rgba(16 ,185,129,0.5)",
        }}
      ></div>
    </div>
  );
};

export default ReadingProgress;
