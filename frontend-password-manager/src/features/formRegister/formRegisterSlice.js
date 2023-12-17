import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";
import config from "../config/server";
import data from "bootstrap/js/src/dom/data";
import {ordered} from "../icecream/icecreamSlice";
import {fetchUsers} from "../user/userSlice";

const initialState = {
    status :"",
    message : ''
}

export const doRegister = createAsyncThunk('user/', (data) => {
    const requestBody = {
        email : data.email,
        password : data.password,
        salt : '0000000'
    }
    console.log(requestBody)
    return axios
        .post(config.loginUrl, data)
        .then(response => response.data)
})

const formRegisterSlice = createSlice({
    name: 'form',
    initialState,
    extraReducers: builder => {
        builder.addCase(doRegister.pending, state => {
                console.log(1)
        })
        builder.addCase(doRegister.fulfilled, (state, action) => {
            console.log(1)
        })
        builder.addCase(doRegister.rejected, (state, action) => {
            console.log("login error")
        })
    }


});

export const { saveForm } = formRegisterSlice.actions;

export default formRegisterSlice.reducer;