import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {comopentShow} from "./features/common/common";
import store from "./app/store";


const initialState = {
  token: window.localStorage.getItem('token'),
  page: window.localStorage.getItem('currentPage') ?  window.localStorage.getItem('currentPage') : comopentShow.LOGIN,
  currentUrl : "asdasdas",
  masterKey: null,
  secret: "IVQZEIOUMEPRZTREA",
  appName: 'PasswordManager',
  email: 'abb@gmail.com'
};



export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action) => {
      // Simulating a login action - setting loggedIn to true and storing the user data
      window.alert(1);
      state.satus = 1111;
      state.user = action.payload;
    },
    logout: (state) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      state.loggedIn = false;
      state.user = null;
    },

    setPage:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload)
      state.page = action.payload;
    },

    setToken:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload)
      state.token = action.payload;
      state.page = comopentShow.HOME;
    },



    setCurrentUrl:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload)
      state.currentUrl = action.payload.currentUrl;
    },


    setMasterKey:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload,"1111")
      state.masterKey = action.payload.masterKey;
      // state.masterKey = action.payload.masterKey;
    },

    setRegister:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload,"1111")
      state.token = action.payload.data.token;
      console.log("hehe");
    },

  },


});

export const { login,setToken, setRegister,setPage ,setMasterKey,setCurrentUrl} = appSlice.actions;

export default appSlice.reducer;
