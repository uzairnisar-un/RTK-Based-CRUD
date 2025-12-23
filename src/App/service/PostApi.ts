import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/post.types.js";

const baseurl = "http://localhost:3031/";
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation<Post, Partial<Post> & { userId?: number }>({
      query: (addNewPost) => ({
        url: "posts",
        method: "POST",
        body: addNewPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = postApi;
