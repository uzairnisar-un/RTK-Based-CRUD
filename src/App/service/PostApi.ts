import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/post.types.js";

const baseurl = "http://localhost:5000/api/";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    retrievePost: builder.query<Post[], void>({
      query: () => "retrievePost",
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "createPost",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation<Post, { id: string } & Partial<Post>>({
      query: ({ id, ...body }) => ({
        url: `updatePost/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `deletePost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useRetrievePostQuery,
  useUpdatePostMutation,
} = postApi;
