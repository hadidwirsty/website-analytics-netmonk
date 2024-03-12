import { apiSlice } from '../../api/apiSlice';

export const orderNcxApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersNcx: builder.query({
      query: () => '/order/ncx',
      providesTags: ['OrdersNcx']
    }),
    getOrderNcxById: builder.query({
      query: (id) => `/order/ncx/${id}`,
      providesTags: (result, error, id) => [{ type: 'OrdersNcx', id }]
    })
  })
});

export const { useGetOrdersNcxQuery, useGetOrderNcxByIdQuery } = orderNcxApiSlice;
