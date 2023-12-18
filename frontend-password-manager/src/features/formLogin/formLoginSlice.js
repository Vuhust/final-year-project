import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import config from "../config/server";
import data from "bootstrap/js/src/dom/data";
import {ordered} from "../icecream/icecreamSlice";
import {fetchUsers} from "../user/userSlice";
import { toast } from 'react-toastify';
import {comopentShow, getSalt, status} from "../common/common";
import {setPage , setToken} from "../../appSlice";
import store from "../../app/store";
import {login} from "../common/fetchData";

const initialState = {
    status :"",
    message : 'sas',
    isSubmitting : false
}



export const doLogin = (data) =>{
  const requestBody = {
    email : data.email,
    password : data.password
  }
  let doPost = new Promise((resolve, reject) => {
    login(resolve,reject,requestBody)
  });
  doPost
    .then((response) => {
      if(response.status === 400){
        response.json().then((jsonData) => {
          toast.error(jsonData["msg"]);
        })
      }
      if(response.status === 202){
        response.json().then((jsonData) => {
          const token = jsonData.token;
          window.localStorage.setItem("token", token);
          store.dispatch(setToken(comopentShow.HOME));
          console.log(jsonData); // Log the JSON data
        })
      }

      if(response.status === 200){
        response.json().then((jsonData) => {
          console.log(jsonData); // Log the JSON data
        })
      }
    }).catch((err) => {
    console.log(err,"error");
  });
}


const formLoginSlice = createSlice({
    name: 'form',
    initialState,



});

export const { saveForm } = formLoginSlice.actions;

export default formLoginSlice.reducer;
