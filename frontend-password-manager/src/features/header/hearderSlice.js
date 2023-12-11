import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import config from "../config/server";

const initialState = {
  currentUrl: null
};

export const loginSlice = createSlice({
  name: 'currentUrl',
  initialState,
  reducers: {
    setCurrentUrl: (state, action) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      state.currentUrl = action.payload.currentUrl;
    },
  },


});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
