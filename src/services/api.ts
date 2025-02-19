import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

import { resetTokens, setTokens } from "../store/reducer/authReducer";

const baseUrl = "http://localhost:3000/api";

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

const baseQueryWithReauth = async (
  args: string | any,
  api: any,
  extraOptions: any
) => {
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
        // Update the store with the new tokens
        api.dispatch(
          setTokens({
            accessToken: (refreshResult.data as { accessToken: string; refreshToken: string }).accessToken,
            refreshToken: (refreshResult.data as { accessToken: string; refreshToken: string }).refreshToken,
          })
        );
        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, clear stored tokens (logout)
        api.dispatch(resetTokens());
      }
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/users/me`,
    }),
    login: builder.mutation<ApiResponse<{ accessToken: string; refreshToken: string }>, { email: string; password: string }>({
      query: (body) => ({
        url: `/auth/authenticate`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<ApiResponse<User>, Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }>({
      query: (body) => ({
        url: `/users/`,
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => ({
        url: `/users/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = api;
