import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaRegClock,
  FaArrowRight,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../App/service/PostApi.js";
import type { Post } from "../../App/types/post.types.js";
import { ClipLoader } from "react-spinners";
import { RiMoonClearLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../App/redux/slices/themeSlice.js";
import ThemeToggle from "../ThemeToggle.js";
import type { RootState } from "../../App/store/store.js";

const PostList = () => {
  const { data: allPosts, isLoading } = useGetPostsQuery();
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 8;
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Initial load
  useEffect(() => {
    if (allPosts?.length) {
      const initialPosts = [...allPosts].reverse().slice(0, postsPerPage);
      setVisiblePosts(initialPosts);
    }
  }, [allPosts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (
          entry.isIntersecting &&
          !isFetchingMore &&
          (allPosts ? visiblePosts.length < allPosts.length : false)
        ) {
          setIsFetchingMore(true);
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
          }, 300);
        }
      },
      { threshold: 1 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isFetchingMore, visiblePosts.length, allPosts?.length]);

  // Load more posts when page increases
  useEffect(() => {
    if (allPosts?.length && page > 1) {
      const start = (page - 1) * postsPerPage;
      const end = page * postsPerPage;
      const morePosts = allPosts.slice(start, end);
      setVisiblePosts((prev) => [...prev, ...morePosts]);
      setIsFetchingMore(false);
    }
  }, [page, allPosts]);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-3xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="bg-gray-200 h-44 rounded-2xl mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!allPosts || !allPosts.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <FaPlus size={40} className="text-gray-300" />
        </div>
        <p className="text-xl font-medium">No posts found yet.</p>
        <button
          onClick={() => navigate("/addPost")}
          className="mt-4 text-emerald-600 font-semibold hover:underline"
        >
          Create your first post
        </button>
      </div>
    );
  }
  return (
    <div className="p-6 md:p-10 bg-[#FAFBFF] dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {" "}
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Feed <span className="text-emerald-500">.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Explore the latest stories from the community.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold border border-emerald-100 dark:border-emerald-800">
            {allPosts?.length ?? 0} Total Posts
          </div>

          <ThemeToggle />
        </div>
      </header>
      {/* Grid */}
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-4">
              <img
                src={`https://picsum.photos/seed/${post.id}/600/400`}
                alt="Post"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Floating Action Buttons (Show on Hover) */}
              <div className="absolute top-4 right-4 flex gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                {/* Delete Button - Glowing Red */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id);
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
                <FaRegClock /> 2 mins read
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight mb-3 line-clamp-2">
                {post.title}
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
        ))}
      </div>
      {/* Infinite Scroll Footer */}
      <div ref={observerRef} className="py-20 flex justify-center">
        {visiblePosts.length < (allPosts?.length ?? 0) ? (
          <div className="flex flex-col items-center gap-3">
            <ClipLoader size={28} color="#10B981" speedMultiplier={0.8} />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Loading More
            </span>
          </div>
        ) : (
          <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent relative">
            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#FAFBFF] dark:bg-slate-950 px-4 text-slate-400 text-sm italic">
              You've reached the end
            </span>
          </div>
        )}
      </div>
      {/* Modern Floating Action Button */}
      <button
        onClick={() => navigate("/addPost")}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-2xl flex items-center justify-center group 
             bg-slate-900 dark:bg-emerald-600 
             shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(16,185,129,0.3)]
             hover:-translate-y-2 transition-all duration-500 overflow-hidden"
      >
        {/* Glassy Shine Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Shimmer Beam */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-[-20deg]" />

        {/* Outer Glow Ring (Pulse) */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/20 scale-100 group-hover:scale-110 group-hover:opacity-0 transition-all duration-700" />

        {/* Icon with Neon Glow */}
        <FaPlus
          size={24}
          className="relative z-10 text-white group-hover:rotate-90 transition-transform duration-500 
               drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />

        {/* Inner Bezel Effect */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none" />
      </button>
    </div>
  );
};

export default PostList;
