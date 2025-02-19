// jobApi.ts
import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

import { resetTokens, setTokens } from "../store/reducer/authReducer";

const baseUrl = "http://localhost:3000/api";

// Standard base query that sets the Authorization header.
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom base query that handles token refresh
const baseQueryWithReauth = async (args: string | any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/users/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        api.dispatch(
          setTokens({
            accessToken: (refreshResult.data as { accessToken: string; refreshToken: string }).accessToken,
            refreshToken: (refreshResult.data as { accessToken: string; refreshToken: string }).refreshToken,
          })
        );
        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, clear tokens (log out)
        api.dispatch(resetTokens());
      }
    }
  }
  return result;
};

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Create a job
    createJob: builder.mutation<ApiResponse<Job>, Partial<Job>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
    }),
    // Get jobs based on a query (using GET with query params)
    getJobByQuery: builder.query<ApiResponse<Job[]>, JobQuery>({
      query: (params) => ({
        url: "/jobs/query",
        method: "GET",
        params,
      }),
    }),
    // Update a job
    updateJob: builder.mutation<ApiResponse<Job>, { jobId: string; data: Partial<Job> }>({
      query: ({ jobId, data }) => ({
        url: `/jobs/${jobId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Search jobs (example using GET and query params)
    searchJob: builder.query<ApiResponse<Job[]>, JobQuery>({
      query: (params) => ({
        url: "/jobs/search",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobByQueryQuery,
  useUpdateJobMutation,
  useSearchJobQuery,
} = jobApi;
