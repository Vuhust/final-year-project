
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from "../config/server";
import store from "../../app/store";
import {encrypt, decrypt} from '../common/common'

import {loginSlice} from "../login/loginSlice";
import data from "bootstrap/js/src/dom/data";
const initialState = {
    data: [],
}

// Generates pending, fulfilled and rejected action types
export const fetchSubUser = async ()=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;


        const respone = await axios.get(config.userList ,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                }}
        );
        if (respone.status === 200) {
            console.log(Array.isArray(respone.data))
            console.log(Array.from(respone.data))
            store.dispatch(setSubUserData(respone.data));
        }
    } catch (e) {
        console.log("err",e.response.status)
        window.alert("error api")
    }

}


export const fetchEditSubUser = async (data)=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;
        const requestBody = {
            "id" :data.id,
            "url": data.url,
            "desc": data.desc,
            "subUserName": data.username,
            "subUserPwdEncrypt":  encrypt(data.password)

        };

        const respone = await axios.put(config.userDetail ,requestBody,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                },

            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            fetchSubAccount();
            store.dispatch(setData(respone.data));
        }
    } catch (e) {
        console.log("err",e.response.status)
    }



}





const subUserSlice = createSlice({
    name: 'meclgt',
    initialState,
    reducers: {
        setSubUserData: (state, action) => {
            state.data =  action.payload;
            },

    },
})

export const { setSubUserData } = subUserSlice.actions;

export default subUserSlice.reducer
