import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://flowoly.com/api"
    : "http://localhost:3001/api";

export const baseQuery = fetchBaseQuery({ baseUrl });
