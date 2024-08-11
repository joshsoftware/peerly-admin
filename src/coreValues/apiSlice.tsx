import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { coreValuesResp } from "./types";

export const coreValueSlice = createApi({
  reducerPath: "coreValueSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:33001/peerly",
  }),
  tagTypes: ["coreValues"],
  endpoints: (builder) => ({
    getCoreValues: builder.query<coreValuesResp,{ authToken: string }>({
      query: ({ authToken }) => ({
        url: "/core_values",
        method: "GET",
        headers: {
          "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["coreValues"],
    }),
  }),
});

export const {
  useGetCoreValuesQuery
} = coreValueSlice;
