import { createSlice } from '@reduxjs/toolkit'
import data from '../../app/data.json'

const initialState = {
  items: data,
  status: 'idle',
  error: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileAdded (state, action) {
      state.push(action.payload)
    },
  }
})

export const { profileAdded } = profileSlice.actions

export default profileSlice.reducer

export const selectAllProfiles = state => state.profile.items
