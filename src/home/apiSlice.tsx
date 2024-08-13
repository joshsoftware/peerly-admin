import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { listUsersResp, sendNotificationReq, sendNotificationResponse } from "./types";
import { baseUrl } from "../constants";

export const homeSlice = createApi({
  reducerPath: "homeSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["downloadReport", "users"],
  endpoints: (builder) => ({
    downloadReport: builder.query<ArrayBuffer, { authToken: string }>({
      query: ({ authToken }) => ({
        url: "/admin/report",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseHandler: (response) => response.arrayBuffer(),
      }),
    }),

    getUsers: builder.query<listUsersResp,{ page: number; page_size: number; authToken: string }>({
      query: ({ page, page_size, authToken }) => ({
        url: `/users?page=${page}&page_size=${page_size}`,
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["users"],
    }),

    sendNotification: builder.mutation<
      sendNotificationResponse,
      Partial<sendNotificationReq>
    >({
      query: (payload) => ({
        url: "/admin/notification",
        method: "POST",
        body: {
          message: {
            title: payload.message?.title,
            body: payload.message?.body,
          },
          all: payload.all,
          id: payload.id,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
    }),
  }),
});

export const { 
  useDownloadReportQuery,
  useSendNotificationMutation,
  useGetUsersQuery
 } = homeSlice;
