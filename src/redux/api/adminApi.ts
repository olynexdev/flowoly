// src/redux/api/adminApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  tagTypes: ['Admin'], // Add tags for cache invalidation
  endpoints: (builder) => ({
    getAdminRole: builder.query({
      query: (email) => `/users/get-user?email=${email}`
    }),
  }),
});

export const { useGetAdminRoleQuery } = adminApi;
