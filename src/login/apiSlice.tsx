import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoginBody, userLoginResp } from './types'

export const loginSlice = createApi({
  reducerPath: 'loginSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:33001',
  }),
  tagTypes: ['Login'],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<userLoginResp, Partial<userLoginBody>>({
      query: (payload) => ({
        url: '/admin/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Accept-Version': 'application/vnd.peerly.v1'
        },
      }),   
      invalidatesTags: ['Login'],
    }),
  }),
})

export const { useAdminLoginMutation } = loginSlice