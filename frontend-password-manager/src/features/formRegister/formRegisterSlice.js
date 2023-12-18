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

export const doRegister = async (data) => {
    const requestBody = {
        email : data.email,
        password : data.password,
        salt : getSalt(6),
    }
    try {
        const respone = await axios.post(config.registerUrl, requestBody);
        if (respone.status === 200) {
            toast("Check email")
            store.dispatch(setPage(comopentShow.LOGIN));
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}
