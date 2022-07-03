import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { BACKEND_URL } from "../../constants";

const baseCreateApi = createApi({
  reducerPath: "api",
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BACKEND_URL,
    }),
    {
      maxRetries: 0,
    }
  ),
  endpoints: () => ({}),
});

export default baseCreateApi;
