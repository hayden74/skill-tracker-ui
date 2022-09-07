import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  profile: null,
  items: [],
  status: 'idle',
  error: null,
  totalItems: 0,
  activePage: 1,
  searchCriteria: { criteria: 'skill', keyword: 'AWS' }
}

export const addProfile = createAsyncThunk('profiles/addProfile', async (args) => {
  const response = await client.post(`engineer/add-profile`, args)
  return {
    data: { ...args, id: response.data.id },
    error: response.data.errors
  }
})

export const fetchProfiles = createAsyncThunk('profiles/loadedProfiles', async (args) => {
  const { page, size, criteria, keyword } = args
  const response = await client.get(`admin/${criteria}/${keyword}?page=${page}&size=${size}`)
  return {
    data: response.data,
    headers: Object.fromEntries(response.headers.entries()),
    activePage: page,
    searchCriteria: { criteria, keyword },
    error: response.data.errors
  }
})

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    resetStatus (state) {
      state.status = 'idle'
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchProfiles.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        const { data, headers, activePage, searchCriteria } = action.payload
        state.status = 'succeeded'
        state.items = data.profiles
        state.totalItems = parseInt(headers['x-total-count'], 10)
        state.activePage = activePage
        state.searchCriteria = searchCriteria
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addProfile.pending, (state, action) => {
        state.status = 'submitting'
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        const { data } = action.payload
        state.status = 'succeeded'
        state.profile = data
        console.log(state.profile)
      })
  }
})

export const { resetStatus } = profileSlice.actions

export default profileSlice.reducer

export const loadedProfiles = state => state.profiles.items
