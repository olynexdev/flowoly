// src/redux/api/employeeApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export interface Employee {
  _id: string;
  userId: string;
  name: string;
  department: string;
  image: string;
}

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery,
  tagTypes: ['Employee'],
  endpoints: builder => ({
    getEmployees: builder.query({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: `/employees/get-employees?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      }),
      providesTags: ['Employee'],
    }),
    addEmployee: builder.mutation({
      query: newEmployee => ({
        url: '/employees/add-employee',
        method: 'POST',
        body: newEmployee,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employees/update-employee?id=${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation({
      query: id => ({
        url: `/employees/delete-employee?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
