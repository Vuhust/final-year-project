import {createSlice} from "@reduxjs/toolkit";

const initialState = {}
const url  = "a.com.vn"
const masterKeySlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveMasterKey: (state, action) => {
            // Simulating a login action - setting loggedIn to true and storing the user data
            console.log(action.payload.masterKey);
            state.app.masterKey = action.payload;
        }
    },


});

export const { saveForm } = masterKeySlice.actions;

export default masterKeySlice.reducer;