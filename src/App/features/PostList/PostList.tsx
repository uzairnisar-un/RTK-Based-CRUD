import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

import type { Post } from "../../types/post.types.js";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../../../components/ThemeToggle.js";
import type { RootState } from "../../store/store.js";
import PostCard from "../../../components/PostCard.js";
import {
  useDeletePostMutation,
  useRetrievePostQuery,
} from "../../service/PostApi.js";
import { useDebounce } from "../../../utils/useDebounce.js";
const PostList = () => {
  const { data: allPosts, isLoading } = useRetrievePostQuery();
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 8;
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const isSearching = debouncedSearch.trim().length > 0;
  const filteredResults =
    allPosts?.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

  const displayPosts = isSearching ? filteredResults : visiblePosts;
  useEffect(() => {
    if (isSearching) {
      setIsFetchingMore(false);
      setPage(1);
    }
  }, [debouncedSearch]);

  // Initial load
  useEffect(() => {
    if (allPosts?.length) {
      const initialPosts = [...allPosts].reverse().slice(0, postsPerPage);
      setVisiblePosts(initialPosts);
    }
  }, [allPosts]);

  // Infinite scroll observer
  useEffect(() => {
    if (isSearching) return; //  stop observer during search

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (
          entry.isIntersecting &&
          !isFetchingMore &&
          allPosts &&
          visiblePosts.length < allPosts.length
        ) {
          setIsFetchingMore(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
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
  }, [isFetchingMore, visiblePosts.length, allPosts?.length, isSearching]);

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
  useEffect(() => {
    if (isSearching) {
      // stop pagination when searching
      setIsFetchingMore(false);
      setPage(1);
    } else if (allPosts?.length) {
      // reset list when search is cleared
      const initialPosts = [...allPosts].reverse().slice(0, postsPerPage);
      setVisiblePosts(initialPosts);
      setPage(1);
    }
  }, [searchQuery, allPosts]);

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

        <div className="flex items-center gap-6 ">
          <div className="flex-1 max-w-xl">
            {" "}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />

              <div className="relative flex items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-2 shadow-xl">
                <FaSearch className="text-slate-400 dark:text-slate-500 mr-4" />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search by title..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Total Posts Badge */}
          <div className="whitespace-nowrap px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold border border-emerald-100 dark:border-emerald-800">
            {allPosts?.length ?? 0} Total Posts
          </div>

          <ThemeToggle />
        </div>
      </header>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              searchQuery={debouncedSearch}
              onDelete={(id) => deletePost(id)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-block p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
              <FaSearch
                size={40}
                className="mx-auto text-slate-200 dark:text-slate-700 mb-4"
              />
              <p className="text-slate-500 dark:text-slate-400 font-bold">
                No stories found matching "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Infinite Scroll Footer */}
      {!isSearching && (
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
      )}
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
