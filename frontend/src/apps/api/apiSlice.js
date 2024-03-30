import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useNavigate } from 'react-router-dom';
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log('Sending refresh token');
    try {
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      console.log(refreshResult);
      if (refreshResult?.data) {
        const { user } = api.getState().auth;
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        extraOptions.headers.set('Authorization', `Bearer ${refreshResult.data.accessToken}`);
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
        const navigate = useNavigate();
        navigate('/401');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      api.dispatch(logOut());
      const navigate = useNavigate();
      navigate('/401');
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({})
});
