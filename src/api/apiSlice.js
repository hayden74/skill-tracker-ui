import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:9090/skill-tracker/api/v1/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getProfiles: builder.query({
      query: (arg) => {
        const { page, size, criteria, keyword } = arg
        return {
          url: `/admin/${criteria}/${keyword}`,
          params: { page, size }
        }
      }
    })
  })
})

export const { useGetProfilesQuery } = apiSlice
