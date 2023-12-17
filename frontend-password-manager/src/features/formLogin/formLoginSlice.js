import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import config from "../config/server";
import data from "bootstrap/js/src/dom/data";
import {ordered} from "../icecream/icecreamSlice";
import {fetchUsers} from "../user/userSlice";
import { toast } from 'react-toastify';
import {comopentShow, status} from "../common/common";
import {setPage} from "../../appSlice";
import store from "../../app/store";

const initialState = {
    status :"",
    message : 'sas',
    isSubmitting : false
}

export const doLogin = createAsyncThunk('user/', (dispatch) => {
    const requestBody = {
        email : data.email,
        password : data.password,
        salt : '0000000'
    }
    console.log(requestBody)
    return axios
        .post(config.loginUrl, data)
        .then(response  => response.data)
})

function loginSuccess() {
    setPage(comopentShow.SUB_ACCOUNT);
}


const formLoginSlice = createSlice({
    name: 'form',
    initialState,
    extraReducers: builder => {
        builder.addCase(doLogin.pending, state => {
            state.isSubmitting = true;
                console.log(1)
        })
        builder.addCase(doLogin.fulfilled, (state, action) => {
            state.isSubmitting = false;
            window.location.reload();

        })
        builder.addCase(doLogin.rejected, (state, action) => {
            console.log("login error")
            state.isSubmitting = false;
            toast.error(" Login error ")
            state.status = status.HIDE;
            formLoginSlice.caseReducers.setData(state, action);
            store.dispatch(setPage(comopentShow.SUB_ACCOUNT));
        })
    }


});

export const { saveForm } = formLoginSlice.actions;

export default formLoginSlice.reducer;