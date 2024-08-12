import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeSlice = createApi({
  reducerPath: "homeSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:33001/peerly",
  }),
  tagTypes: ["downloadReport"],
  endpoints: (builder) => ({
    downloadReport: builder.query<ArrayBuffer, {authToken: string}>({
      query: ({authToken}) => ({
        url: "/admin/report",
        method: "GET",
        headers: {
          // "Accept-Version": "application/vnd.peerly.v1",
          Authorization: `Bearer ${authToken}`,
        },
        responseHandler: (response) => response.arrayBuffer(),
      }),
      // transformResponse: (response: Blob) => response,
      
    }),
  }),
});

export const {
  useDownloadReportQuery
} = homeSlice;
