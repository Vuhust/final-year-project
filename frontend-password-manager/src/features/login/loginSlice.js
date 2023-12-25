import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import config from "../config/server";

const initialState = {
  loggedIn: false,
  user: null,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get(config.apiUrl)
    .then(response => response.data)
})

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      // Simulating a login action - setting loggedIn to true and storing the user data
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      state.loggedIn = false;
      state.user = null;
    },
  },


});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
