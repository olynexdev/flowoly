// src/redux/api/awsApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const awsApi = createApi({
  reducerPath: 'awsApi',
  baseQuery,
  tagTypes: ['AwsImage'],
  endpoints: builder => ({
    deleteAwsImage: builder.mutation({
      query: id => ({
        url: `/aws/delete-image`,
        method: 'POST',
        body: { imageUrls: id },
      }),
      invalidatesTags: [{ type: 'AwsImage', id: 'LIST' }],
    }),
  }),
});

export const { useDeleteAwsImageMutation } = awsApi;
