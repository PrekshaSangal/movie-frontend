import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://movie-backend-tgvj.onrender.com" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Movies"],
  endpoints: (builder) => ({}),
});
