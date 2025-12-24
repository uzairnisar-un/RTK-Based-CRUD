import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFormPost from "../App/features//AddPost/AddPost.js";
import PostDetail from "../App/features/PostDetails/PostDetail.js";
import UpdatePost from "../App/features/UpdatePost/UpdatePost.js";
import toast, { Toaster } from "react-hot-toast";
import PostList from "../App/features/PostList/PostList.js";
const AppRoutes = () => {
  return (
    <div>
      <Toaster containerClassName="toaster_style" />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/addPost" element={<AddFormPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/edit/:id" element={<UpdatePost />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
