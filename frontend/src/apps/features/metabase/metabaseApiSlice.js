import { apiSlice } from '../../api/apiSlice';

export const metabaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveUsersUrl: builder.query({
      query: () => '/active-users'
    }),
    getCustomerManagementUrl: builder.query({
      query: () => '/customer-management'
    }),
    getDevicePelangganUrl: builder.query({
      query: () => '/device-pelanggan'
    }),
    getOverviewUrl: builder.query({
      query: () => '/overview'
    }),
    getTrackingOrderNcxUrl: builder.query({
      query: () => '/tracking-order-ncx'
    })
  })
});

export const {
  useGetActiveUsersUrlQuery,
  useGetCustomerManagementUrlQuery,
  useGetDevicePelangganUrlQuery,
  useGetOverviewUrlQuery,
  useGetTrackingOrderNcxUrlQuery
} = metabaseApiSlice;
