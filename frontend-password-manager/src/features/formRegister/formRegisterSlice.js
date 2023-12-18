import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";
import config from "../config/server";
import data from "bootstrap/js/src/dom/data";
import {ordered} from "../icecream/icecreamSlice";
import {fetchUsers} from "../user/userSlice";
import {comopentShow, getSalt} from "../common/common"
import {register} from "../common/fetchData";
import {setPage , setRegister} from "../../appSlice";
import store from "../../app/store";
import {toast} from "react-toastify";
import {setPopUpType, setShow as setShowOtp} from "../popup/popupSlice";
import  {popUpType} from "../common/common"

const initialState = {
    status :"",
    isSubmitting : false,
}

export const doRegister = (data) =>{
  toast("Đang đăng ký")
  const requestBody = {
    email : data.email,
    password : data.password,
    salt : getSalt(6),
  }
  let doPost = new Promise((resolve, reject) => {
    register(resolve,reject,requestBody)
  });

  doPost
    .then((response) => {
      if(response.status === 400){
        response.json().then((jsonData) => {
          toast.error(jsonData.errors);
        })
      }
      if(response.status === 200){
        response.json().then((jsonData) => {
          store.dispatch(setRegister(jsonData));
          store.dispatch(setShowOtp(true));
          store.dispatch(setPopUpType(popUpType.otp));
          store.dispatch()
          console.log(jsonData); // Log the JSON data
        })
      }
    }).catch((err) => {
    console.log(err,"error");
  });

}

const formRegisterSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      setIsSubmitting: (state, action) => {
        console.log("set..." , action.payload)
        state.isSubmitting = action.payload;
      },
    },


});

export const { saveForm, setIsSubmitting } = formRegisterSlice.actions;

export default formRegisterSlice.reducer;
