import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import userReducer from '../features/user/userSlice'
import loginReducer from '../features/login/loginSlice'
import appReducer from '../appSlice'
import qrReducer from "../features/qr/qrSlice";
import subAccountReducer from "../features/list/listSlice"
import popupReducer from '../features/popup/popupSlice'

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
    login: loginReducer,
    app: appReducer,
    popup : popupReducer,
    qr : qrReducer,
    subAccount : subAccountReducer,
  }
})

export default store

