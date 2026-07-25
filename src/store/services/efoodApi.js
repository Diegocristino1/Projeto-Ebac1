import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const efoodApi = createApi({
  reducerPath: 'efoodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/efood/',
  }),
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => 'restaurantes',
    }),
  }),
})

export const { useGetRestaurantsQuery } = efoodApi
