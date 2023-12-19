import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {comopentShow} from "./features/common/common";
import store from "./app/store";
import axios from "axios";
import config from "./features/config/server";
import {toast} from "react-toastify";
import data from "bootstrap/js/src/dom/data";
import {act} from "react-dom/cjs/react-dom-test-utils.production.min";


const initialState = {
  token: window.localStorage.getItem('token'),
  page: window.localStorage.getItem('currentPage') ?  window.localStorage.getItem('currentPage') : comopentShow.LOGIN,
  currentUrl : "asdasdas",
  masterKey: null,
  secret: "IVQZEIOUMEPRZTREA",
  appName: 'PasswordManager',
  email: 'abb@gmail.com',
  setupMasterKey: null,
};



export const doGetUserInfo= async () => {
  console.log(store.getState().app.token)

  try {
    const authorization = "Bearer " + store.getState().app.token;
    const respone = await axios.get(config.userInfoUrl ,
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
          // Add more headers if required
        }}
    );
    if (respone.status === 200) {
      console.log("lấy thông tin thành công");
      console.log(respone.data)
      store.dispatch(setUserInfo(respone.data));
      if(respone.data.setupMasterKey === true ){
        store.dispatch(setPage(comopentShow.FORM_MASTER_KEY));
      } else {
        store.dispatch(setPage(comopentShow.HOME));
      }
    }
  } catch (e) {
    if (e.response.status === 400) {
      toast(e.response.data.errors)
    } else{
      toast(e.response.data.errors)

    }
  }

}






export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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
    setUserInfo:(state, action ) => {
      // Simulating a logout action - resetting loggedIn and user to initial state
      console.log(action.payload,"1111")
      state.email = action.payload.email;
      state.salt = action.payload.salt;
      state.setupMasterKey = action.payload.setupMasterKey;
    },

  },


});

export const { setUserInfo,setToken, setRegister,setPage ,setMasterKey,setCurrentUrl} = appSlice.actions;

export default appSlice.reducer;
