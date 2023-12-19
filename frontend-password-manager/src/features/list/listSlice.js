import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from "../config/server";
import store from "../../app/store";
import {loginSlice} from "../login/loginSlice";
const initialState = {
  data: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchSubAccount = async ()=>{

  const token = store.getState().app.token;
  console.log(token);

  try {
    const authorization = "Bearer " + token;


    const respone = await axios.get(config.subAccountListUrl ,
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
          // Add more headers if required
        }}
    );
    if (respone.status === 200) {
      console.log(respone.data)
      store.dispatch(setData(respone.data));
    }
  } catch (e) {
    console.log("err",e.response.status)
  }

}

export const fetchDeleteSubAccount = async (data)=>{

  const token = store.getState().app.token;
  console.log(token);

  try {
    const authorization = "Bearer " + token;


    const respone = await axios.delete(config.subAccountUrl ,
        {
          headers : {
            'Authorization': authorization ,
            'Content-Type': 'application/json'
            // Add more headers if required
          },
          params: {
            id : data,
          }

        }
    );
    if (respone.status === 200) {
      console.log(respone.data);
      fetchSubAccount();
      // store.dispatch(setData(respone.data));
    }
  } catch (e) {
    console.log("err",e.response.status)
  }

}



const subAccountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      // Simulating a login action - setting loggedIn to true and storing the user data
      console.log(action.payload)
      state.data = action.payload;
    },

  },
})

export const { login, setData } = subAccountSlice.actions;

export default subAccountSlice.reducer
