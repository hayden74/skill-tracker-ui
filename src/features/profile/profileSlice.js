import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchProfiles = createAsyncThunk('profiles/searchProfiles', async () => {
  const response = await client.get('admin/Skill/REACT?page=0&size=5')
  return response.data.profiles
})

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    profileAdded (state, action) {
      state.push(action.payload)
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchProfiles.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { profileAdded } = profileSlice.actions

export default profileSlice.reducer

export const searchProfiles = state => state.profiles.items
