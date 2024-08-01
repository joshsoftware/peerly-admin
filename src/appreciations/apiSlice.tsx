import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { response } from './types';

export const appreciationSlice = createApi({
  reducerPath: 'appreciationSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:33001',
  }),
  tagTypes: ['appreciation'],
  endpoints: (builder) => ({
    getAppreciations: builder.query<response, { page: number; page_size: number }>({
        query: ({ page, page_size }) => ({
          url: `/appreciations?page=${page}&page_size=${page_size}`,
          method: 'GET',
          headers: {
            'Accept-Version': 'application/vnd.peerly.v1',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NTQsIlJvbGUiOiJ1c2VyIiwiZXhwIjoxNzI0MjI1MzEyfQ.dPvo969X1KfLS_PxXMfULBJHSpQyhFZbCXBeGNWTtVg'
          },
        }),
      }),
    getReportedAppreciations: builder.query<response, void>({
        query: () => ({
          url: `/report_appreciations`,
          method: 'GET',
          headers: {
            'Accept-Version': 'application/vnd.peerly.v1',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NTQsIlJvbGUiOiJ1c2VyIiwiZXhwIjoxNzI0MjI1MzEyfQ.dPvo969X1KfLS_PxXMfULBJHSpQyhFZbCXBeGNWTtVg'
          },
        }),
      }),
  }),
})

export const { useGetAppreciationsQuery, useGetReportedAppreciationsQuery } = appreciationSlice