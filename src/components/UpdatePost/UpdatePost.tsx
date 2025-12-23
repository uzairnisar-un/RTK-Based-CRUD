import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../../App/service/PostApi.js";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaCheck, FaPenNib, FaAlignLeft } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ThemeToggle from "../ThemeToggle.js";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: posts, isLoading: loadingPosts } = useGetPostsQuery();
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (posts) {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setTitle(post.title);
        setBody(post.body);
      }
    }
  }, [posts, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id: id, title, body, userId: 1 }).unwrap();
      toast.success("Post updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Update failed! Please try again.");
    }
  };

  // Premium Skeleton Loader
  if (loadingPosts)
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center p-6">
        <div className="w-full max-w-xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded-full w-48 mb-8 mx-auto" />
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="h-4 bg-gray-100 rounded w-20 mb-4" />
            <div className="h-12 bg-gray-50 rounded-xl mb-6" />
            <div className="h-4 bg-gray-100 rounded w-20 mb-4" />
            <div className="h-40 bg-gray-50 rounded-xl mb-6" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFBFF] dark:bg-slate-950 py-12 px-6 transition-colors duration-500">
      <ThemeToggle />
      <div className="max-w-xl mx-auto">
        {/* Top Navigation */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all mb-8 font-semibold"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Feed
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-all">
          {/* Decorative Element - Adjusted for Dark Mode */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-500/10 rounded-bl-[5rem] -mr-16 -mt-16 transition-all group-hover:bg-emerald-100" />

          <header className="relative mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Edit Post<span className="text-emerald-500">.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              Refine your thoughts and update your story.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Title Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                <FaPenNib className="text-emerald-500 dark:text-emerald-400" />{" "}
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A catchy headline..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 focus:border-emerald-200 dark:focus:border-emerald-500/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none px-6 py-4 rounded-2xl text-slate-800 dark:text-slate-100 font-medium transition-all duration-300"
                required
              />
            </div>

            {/* Body Textarea */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                <FaAlignLeft className="text-emerald-500 dark:text-emerald-400" />{" "}
                Content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell your story..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 focus:border-emerald-200 dark:focus:border-emerald-500/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none px-6 py-4 rounded-2xl text-slate-800 dark:text-slate-200 font-medium transition-all duration-300 min-h-[200px] leading-relaxed"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <ClipLoader size={20} color="#ffffff" />
              ) : (
                <>
                  <FaCheck className="group-hover:scale-125 transition-transform" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
