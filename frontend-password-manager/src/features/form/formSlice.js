import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {}
const formSlice = createSlice({

    name: 'form',
    initialState,
    reducers: {
        saveForm: (state, action) => {
                       // Simulating a login action - setting loggedIn to true and storing the user data
            var  account = JSON.parse(window.localStorage.getItem("account")) ;
            const url = action.payload.url;
            if(!account){
                account = {};
            }
            if(!account[url]){
                account[url] = {}

            }
            account[url][action.payload.username] = ({id : 0 , password : action.payload.password , username : action.payload.username});
            window.localStorage.setItem("account",JSON.stringify(account))
            state.user = action.payload;
        }
    },


});

export const { saveForm } = formSlice.actions;

export default formSlice.reducer;