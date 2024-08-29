import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { moderationReq, moderationResponse, response } from "./types";

export const appreciationSlice = createApi({
  reducerPath: "appreciationSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["appreciation", "reported", "moderation"],
  endpoints: (builder) => ({
    getAppreciations: builder.query<response,{ page: number; page_size: number; authToken: string }>({
      query: ({ page, page_size, authToken }) => ({
        url: `/appreciations?page=${page}&page_size=${page_size}`,
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["appreciation"],
    }),
    getReportedAppreciations: builder.query<response, { authToken: string }>({
      query: ({ authToken }) => ({
        url: `/report_appreciations`,
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["reported"],
    }),

    deleteAppreciation: builder.mutation<moderationResponse,Partial<moderationReq>>({
      query: (payload) => ({
        url: `/moderate_appreciation/${payload.id}`,
        method: "PUT",
        body: { moderator_comment: payload.moderator_comment },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
      invalidatesTags: () => [{ type: "reported" }],
    }),

    resolveAppreciation: builder.mutation<moderationResponse,Partial<moderationReq>>({
      query: (payload) => ({
        url: `/resolve_appreciation/${payload.id}`,
        method: "PUT",
        body: { moderator_comment: payload.moderator_comment },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
      invalidatesTags: () => [{ type: "reported" }],
    }),

    appreciationReport: builder.query<ArrayBuffer, { authToken: string }>({
      query: ({ authToken }) => ({
        url: "/admin/appreciation_report",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseHandler: (response) => response.arrayBuffer(),
      }),
    }),

    reportedAppreciationReport: builder.query<ArrayBuffer, { authToken: string }>({
      query: ({ authToken }) => ({
        url: "/admin/reported_appreciation_report",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseHandler: (response) => response.arrayBuffer(),
      }),
    }),
  }),
});

export const {
  useGetAppreciationsQuery,
  useGetReportedAppreciationsQuery,
  useDeleteAppreciationMutation,
  useAppreciationReportQuery,
  useReportedAppreciationReportQuery,
  useResolveAppreciationMutation,
} = appreciationSlice;
