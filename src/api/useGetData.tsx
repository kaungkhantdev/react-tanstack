import type { Hotel } from '@/Table'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ListResponse<T> {
  metadata: {
    page_per_items: number,
    last_page: number,
    total_items: number,
    current_page: number,
    next_page: number,
    prev_page: number,
 },
  data: T[]
}

// Define the query parameters interface
interface HotelQueryParams {
  page: number;
  size: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/public/' }),
  endpoints: (build) => ({
    listHotels: build.query<ListResponse<Hotel>, HotelQueryParams>({
      query: ({ page, size }) => `hotels?page=${page}&size=${size}`,
    }),
  }),
})

export const { useListHotelsQuery } = api