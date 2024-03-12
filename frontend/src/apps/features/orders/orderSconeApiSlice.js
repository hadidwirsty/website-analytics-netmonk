import { apiSlice } from '../../api/apiSlice';

export const orderSconeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersScone: builder.query({
      query: () => '/order/scone',
      providesTags: ['OrdersScone']
    }),
    getOrderSconeById: builder.query({
      query: (id) => `/order/scone/${id}`,
      providesTags: (result, error, id) => [{ type: 'OrdersScone', id }]
    }),
    addOrderScone: builder.mutation({
      query: (newOrder) => ({
        url: '/order/scone',
        method: 'POST',
        body: newOrder
      }),
      invalidatesTags: ['OrdersScone']
    }),
    updateOrderScone: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/order/scone/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OrdersScone', id }]
    })
  })
});

export const {
  useGetOrdersSconeQuery,
  useGetOrderSconeByIdQuery,
  useAddOrderSconeMutation,
  useUpdateOrderSconeMutation
} = orderSconeApiSlice;
