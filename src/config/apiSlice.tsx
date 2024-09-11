import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { editGradeReq, editGradeResp, editRenewalFrequencyReq, editRenewalFrequencyResp, gradesResponse, orgConfigResponse } from "./types";

export const configSlice = createApi({
  reducerPath: "configSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["gradesConfig","orgConfig"],
  endpoints: (builder) => ({
    getGrades: builder.query<gradesResponse,{ authToken: string }>({
      query: ({ authToken }) => ({
        url: "/grades",
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["gradesConfig"],
    }),
    getOrgConfig: builder.query<orgConfigResponse,{ authToken: string }>({
      query: ({ authToken }) => ({
        url: "/organizationconfig",
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["orgConfig"],
    }),
    editRenewalFrequency: builder.mutation<editRenewalFrequencyResp,Partial<editRenewalFrequencyReq>>({
      query: (payload) => ({
        url: "/organizationconfig",
        method: "PUT",
        body: { reward_quota_renewal_frequency: payload.reward_quota_renewal_frequency},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
      invalidatesTags: () => [{ type: "orgConfig" }],
    }),
    editGrade: builder.mutation<editGradeResp,Partial<editGradeReq>>({
      query: (payload) => ({
        url: `/grades/${payload.id}`,
        method: "PATCH",
        body: { points: payload.points},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
      invalidatesTags: () => [{ type: "gradesConfig" }],
    }),
  }),
});

export const {
  useGetGradesQuery,
  useGetOrgConfigQuery,
  useEditRenewalFrequencyMutation,
  useEditGradeMutation
} = configSlice;