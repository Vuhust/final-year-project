import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
  token: null,
  page: 'HOME',
  currentUrl : "asdasdas",
  masterKey: null
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
      state.page = action.payload.page;
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
  },


});

export const { login, setPage ,setMasterKey,setCurrentUrl} = appSlice.actions;

export default appSlice.reducer;
