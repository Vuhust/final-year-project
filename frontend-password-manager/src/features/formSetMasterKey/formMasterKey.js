import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";
import config from "../config/server";
import data from "bootstrap/js/src/dom/data";
import {ordered} from "../icecream/icecreamSlice";
import {fetchUsers} from "../user/userSlice";
import {comopentShow, getSalt} from "../common/common"
import {register} from "../common/fetchData";
import {setMasterKey, setPage, setRegister, setToken} from "../../appSlice";
import store from "../../app/store";
import {toast} from "react-toastify";
import {setPopUpType, setShow as setShowOtp} from "../popup/popupSlice";
import  {popUpType} from "../common/common"

export const doSetupMasterKey = async (data) => {
  console.log(data,"data")
  const masterKey = encodeURIComponent(data);
  console.log(store.getState().app.token)
  const requestBody = {
    masterKey : data,
  }
  try {
    const authorization = "Bearer " + store.getState().app.token;
    const respone = await axios.post(config.masterKeyUrl,{

      },
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
        },
        params: {
          masterKey: masterKey
        }
      }
    );
    if (respone.status === 200) {
      toast("Thêm key thành công");
      store.dispatch(setMasterKey(data));
      store.dispatch(setPage(comopentShow.HOME));
    }
  } catch (e) {
    if (e.response.status === 400) {
      toast(e.response.data.errors)
    } else{
      toast(e.response.data.errors)
    }
  }
}


export const doCheckMasterKey = async (data) => {
  console.log(data,"data")
  console.log(store.getState().app.token)
  const masterKey = encodeURIComponent(data);

  try {
    const authorization = "Bearer " + store.getState().app.token;
    const respone = await axios.get(config.checkMasterKeyUrl +"?masterKey="+ masterKey ,
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
          // Add more headers if required
        }}
    );
    if (respone.status === 200) {
      toast("Key chinh xac " );
      store.dispatch(setMasterKey({masterKey: data}));
    }
  } catch (e) {
    if (e.response.status === 400) {
      toast(e.response.data.errors)
    } else{
      toast(e.response.data.errors)

    }
  }

}



