import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  FaArrowLeft,
  FaPlus,
  FaPenNib,
  FaParagraph,
  FaHandSparkles,
} from "react-icons/fa";
import ThemeToggle from "../../../components/ThemeToggle.js";
import { useAddPostMutation } from "../../service/PostApi.js";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost, { isLoading }] = useAddPostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !body) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      await addPost({ title, body, userId: 1 }).unwrap();
      toast.success("Post published successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add post.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] dark:bg-slate-950 py-12 px-6 transition-colors duration-500">
      <ThemeToggle />
      <div className="max-w-xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-all font-semibold"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Cancel
          </button>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/50">
            <FaHandSparkles /> Drafting Mode
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-8 md:p-10 transition-all">
          <header className="mb-10 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Create Post<span className="text-emerald-500">.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Share your thoughts with the world.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title Input */}
            <div className="group space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 group-focus-within:text-emerald-600 transition-colors">
                <FaPenNib /> Headline
              </label>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:border-emerald-200 dark:focus:border-emerald-500/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none px-6 py-4 rounded-2xl text-slate-800 dark:text-slate-100 text-lg font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all duration-300"
                required
              />
            </div>

            {/* Body Textarea */}
            <div className="group space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 group-focus-within:text-emerald-600 transition-colors">
                <FaParagraph /> Story Content
              </label>
              <textarea
                placeholder="Once upon a time..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:border-emerald-200 dark:focus:border-emerald-500/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none px-6 py-4 rounded-2xl text-slate-800 dark:text-slate-200 font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all duration-300 min-h-[180px] leading-relaxed resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  <>
                    <FaPlus size={14} />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 dark:text-slate-600 text-[11px] mt-4 font-medium uppercase tracking-tighter">
                Click publish to make this visible to everyone
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
