import { apiSlice } from '../../api/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employees',
      providesTags: ['Employees']
    }),
    getEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Employees', id }]
    }),
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/employees',
        method: 'POST',
        body: newEmployee
      }),
      invalidatesTags: ['Employees']
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employees', id }]
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Employees']
    })
  })
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeesApiSlice;
