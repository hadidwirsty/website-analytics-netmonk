import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions = {}) => {
  const state = api.getState().auth;

  if (state.hasAttemptedRefresh) {
    return baseQuery(args, api, extraOptions);
  }

  const result = await baseQuery(args, api, extraOptions);

  if (typeof args.url === 'string' && result?.error?.status === 401 && args.url.endsWith('/auth')) {
    return result;
  }

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const { user } = state;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      const newHeaders = new Headers(extraOptions.headers);
      newHeaders.set('Authorization', `Bearer ${refreshResult.data.accessToken}`);
      return baseQuery(args, api, { ...extraOptions, headers: newHeaders });
    }
    api.dispatch(logOut());
    window.location.href = '/401';
    return Promise.reject(new Error('Unauthorized, redirecting to /401'));
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({})
});
