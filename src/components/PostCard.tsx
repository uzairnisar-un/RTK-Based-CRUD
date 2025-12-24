import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegClock, FaArrowRight } from "react-icons/fa";
import type { Post } from "../App/types/post.types.js";
import HighlightText from "./HighlightText.js";
import ShineImage from "./ShineImage.js";
import { readingTime } from "../utils/readingTime.js";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  searchQuery: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, searchQuery }) => {
  const navigate = useNavigate();

  return (
    <div
      key={post.id}
      className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-4">
        <ShineImage
          src={`https://picsum.photos/seed/${post.id}/600/400`}
          alt="Post"
          //   loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Floating Action Buttons (Show on Hover) */}
        <div className="absolute top-4 right-4 flex gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {/* Delete Button - Glowing Red */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
            className="group/btn relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white dark:border-slate-700/50 transition-all duration-300 hover:scale-110 active:scale-90"
          >
            {/* Realistic Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />

            <FaTrash
              size={16}
              className="relative z-10 text-red-500 dark:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] group-hover/btn:text-red-600 transition-colors"
            />
          </button>

          {/* Edit Button - Glowing Blue/Emerald */}
          <button
            onClick={() => navigate(`/post/edit/${post.id}`)}
            className="group/btn relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white dark:border-slate-700/50 transition-all duration-300 hover:scale-110 active:scale-90"
          >
            {/* Realistic Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />

            <FaEdit
              size={16}
              className="relative z-10 text-blue-500 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover/btn:text-blue-600 transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
          <FaRegClock />
          {readingTime(post.body)} min
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight mb-3 line-clamp-2">
          <HighlightText text={post.title} highlight={searchQuery} />
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
          <button
            onClick={() => navigate(`/post/${post.id}`)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Read Story <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
