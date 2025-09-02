// src/redux/api/templateApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery,
  tagTypes: ['template', 'template-category'],
  endpoints: builder => ({
    // Fetch all templates
    getTemplates: builder.query({
      query: ({ category, search }) =>
        `/templates/get-templates?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`,
      providesTags: ['template'],
    }),

    // Fetch template details by custom URL
    getTemplateBySlug: builder.query({
      query: (slug: string) => `/templates/get-template-by-slug?slug=${slug}`,
      providesTags: ['template'],
    }),

    // Fetch template categories
    getTemplateCategories: builder.query({
      query: () => '/templates/get-template-categories',
      providesTags: ['template', 'template-category'],
    }),

    // Create a new template
    createTemplate: builder.mutation({
      query: newTemplate => ({
        url: '/templates/post-template',
        method: 'POST',
        body: newTemplate,
      }),
      invalidatesTags: ['template'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200, // Ensure status fallback
      }),
    }),

    // Update an existing template
    updateTemplate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/templates/update-template?id=${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['template'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200, // Ensure status fallback
        success: meta?.response?.ok,
      }),
    }),

    // Delete a template
    deleteTemplate: builder.mutation({
      query: id => ({
        url: `/templates/delete-template?id=${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['template'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200,
      }),
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateBySlugQuery,
  useGetTemplateCategoriesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;
