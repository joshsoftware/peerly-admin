import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { badgesResponse, editBadgeReq, editBadgeResp } from "./types";

export const badgesSlice = createApi({
  reducerPath: "badgesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["badges"],
  endpoints: (builder) => ({
    getBadges: builder.query<badgesResponse,{ authToken: string }>({
      query: ({ authToken }) => ({
        url: "/badges",
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["badges"],
    }),
    editBadge: builder.mutation<editBadgeResp,Partial<editBadgeReq>>({
      query: (payload) => ({
        url: `/badges/${payload.id}`,
        method: "PATCH",
        body: { reward_points: payload.reward_points},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${payload.authToken}`,
        },
      }),
      invalidatesTags: () => [{ type: "badges" }],
    }),
  }),
});

export const {
  useGetBadgesQuery,
  useEditBadgeMutation
} = badgesSlice;