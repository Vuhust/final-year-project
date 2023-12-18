import axios from "axios";
import config from "../config/server";
import { toast } from 'react-toastify';
import {comopentShow, getSalt, status} from "../common/common";
import {setPage , setToken} from "../../appSlice";
import store from "../../app/store";




export const doLogin = async (data) => {
    const requestBody = {
        email: data.email,
        password: data.password,
    }
    try {
        const respone = await axios.post(config.loginUrl, requestBody);
        if (respone.status === 200) {
            toast("Đăng nhập thành công");
            store.dispatch(setPage(comopentShow.HOME));
            store.dispatch(setToken(respone.data.data.token))
        } else if (respone.status === 202) {
            toast("Nhập OTP");
            store.dispatch(setToken(respone.data.data.token))
            store.dispatch(setPage(comopentShow.OTP_FORM))
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}