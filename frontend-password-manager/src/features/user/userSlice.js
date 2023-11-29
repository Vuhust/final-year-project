import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from "../config/server";
const initialState = {
  loading: false,
  users: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/', () => {
  return axios
    .get(config.apiUrl)
    .then(response => response.data)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer
