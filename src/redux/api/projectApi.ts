import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery,
  tagTypes: ['Project', 'Category'],
  endpoints: builder => ({
    // Fetch all projects
    getProjects: builder.query({
      query: ({ category }) =>
        `/project/get-projects?category=${encodeURIComponent(category)}`,
      providesTags: ['Project'],
    }),

    // Fetch project details by custom URL
    getProjectById: builder.query({
      query: customURL =>
        `/project/get-project-by-id?customURL=${encodeURIComponent(customURL)}`,
      providesTags: ['Project'],
    }),

    // Fetch project categories
    getProjectCategories: builder.query({
      query: () => '/project/get-project-categories',
      providesTags: ['Project'],
    }),

    // Create a new project
    createProject: builder.mutation({
      query: newProject => ({
        url: '/project/post-project',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Project'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200, // Ensure status fallback
      }),
    }),

    // Update an existing project
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update-project?id=${encodeURIComponent(id)}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Project'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200,
      }),
    }),

    // Delete a project
    deleteProject: builder.mutation({
      query: id => ({
        url: `/project/delete-project?id=${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
      transformResponse: (response: any, meta) => ({
        data: response,
        status: meta?.response?.status || 200,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectCategoriesQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
