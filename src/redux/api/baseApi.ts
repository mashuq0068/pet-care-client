/* eslint-disable @typescript-eslint/no-explicit-any */

// baseApi.ts
import { createApi, fetchBaseQuery, BaseQueryApi, BaseQueryFn, FetchArgs, DefinitionType } from '@reduxjs/toolkit/query/react';
import Cookies from  'js-cookie'
import { logout } from '../features/auth/authSlice'; 


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://pet-care-server-pi.vercel.app/api/',
  prepareHeaders: (headers) => {
    const token = Cookies.get('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },

});


const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 401 || result.error?.status === 403) {
    api.dispatch(logout());
    Cookies.remove('token', { path: '/' });
  }
  return result;
};

// API slice definition
const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: ['post', 'user', 'auth'], // Adjust tagTypes according to your needs
  endpoints: () => ({}), // Add endpoints here later
  
});

export default baseApi;