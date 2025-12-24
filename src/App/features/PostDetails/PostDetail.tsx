import React, { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../../types/post.types.js";
import {
  FaArrowLeft,
  FaRegCalendarAlt,
  FaUserCircle,
  FaRegClock,
  FaShareAlt,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ThemeToggle from "../../../components/ThemeToggle.js";
import ReadingProgress from "../../../components/ProgressBar/ReadingProgress.js";
import { useRetrievePostQuery } from "../../service/PostApi.js";
import ShineImage from "../../../components/ShineImage.js";

import { readingTime } from "../../../utils/readingTime.js";

const PostDetail: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useRetrievePostQuery();

  const post = posts?.find((p: Post) =>
    id !== undefined ? p.id.toString() === id : false
  );

  // Modern Loading State
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex flex-col items-center justify-center">
        <ClipLoader size={40} color="#10B981" />
        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Opening Story...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-[2rem] mb-6">
          <FaArrowLeft size={40} className="mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold italic">Oops! Story not found.</h3>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-slate-900 font-bold underline decoration-emerald-400 underline-offset-4"
        >
          Return to Feed
        </button>
      </div>
    );

  return (
    <>
      <ReadingProgress />

      <div className="bg-[#FAFBFF] dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
        <ThemeToggle />

        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-bold text-sm"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Feed
            </button>
            <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
              <FaShareAlt size={16} />
            </button>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto mt-8 px-6">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl mb-12">
            <ShineImage
              src={`https://picsum.photos/seed/${post.id}/1200/800`}
              alt="Hero"
              className="w-full h-full object-cover dark:brightness-90 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Featured Article
              </span>
            </div>
          </div>

          {/* Content Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <FaUserCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Author
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Admin User
                  </p>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-3">
                <FaRegCalendarAlt className="text-emerald-500 dark:text-emerald-400" />
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Published
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Dec 22, 2025
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <FaRegClock className="text-slate-300 dark:text-slate-600" />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {readingTime(post.body)} min read
                </span>
              </div>
            </div>
          </header>

          {/* Post Body */}
          <section className="prose prose-slate dark:prose-invert lg:prose-xl max-w-none">
            <p className="break-words whitespace-norma text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium first-letter:text-5xl first-letter:font-black first-letter:text-emerald-600 dark:first-letter:text-emerald-400 first-letter:mr-3 first-letter:float-left">
              {post.body}
            </p>

            <p className="mt-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              This is a place for deeper reflection. When users click into a
              story, they want to escape the clutter of the main feed. By using
              ample white space and deliberate typography, we respect the
              reader's attention.
            </p>
          </section>

          {/* Footer Section */}
          <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] w-full text-center border border-transparent dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Enjoyed this story?
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Share it with your network or return to the feed for more.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-slate-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:shadow-xl dark:hover:shadow-emerald-900/20 transition-all"
              >
                Explore More Posts
              </button>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default PostDetail;
