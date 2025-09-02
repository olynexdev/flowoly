// src/redux/api/blogApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery,
  tagTypes: ['Blog', 'Category'],
  endpoints: builder => ({
    // Fetch all blogs
    getBlogs: builder.query({
      query: ({ category, search }) =>
        `/blogs/get-blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`,
      providesTags: ['Blog'],
    }),

    // Fetch blog details by custom URL
    getBlogById: builder.query({
      query: (title: string) => `/blogs/getBlogById?title=${title}`,
      providesTags: ['Blog'],
    }),

    // Fetch blog categories
    getCategories: builder.query({
      query: () => '/blogs/getCategories',
      providesTags: ['Blog', 'Category'],
    }),

    // Create a new blog
    createBlog: builder.mutation({
      query: newBlog => ({
        url: '/blogs/post-blog',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),

    // Update an existing blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/update-blog?id=${encodeURIComponent(id)}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200, // Ensure status fallback
      }),
    }),

    // Delete a blog
    deleteBlog: builder.mutation({
      query: id => ({
        url: `/blogs/delete-blog?id=${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetCategoriesQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
