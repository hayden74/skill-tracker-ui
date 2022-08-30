import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:9090/skill-tracker/api/v1/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getProfiles: builder.query({
      query: () => '/admin/Skill/REACT?page=0&size=5'
    })
  })
})

export const { useGetProfilesQuery } = apiSlice