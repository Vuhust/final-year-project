import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import loginReducer from '../features/login/loginSlice'
import appReducer from '../appSlice'
import qrReducer from "../features/qr/qrSlice";
import subAccountReducer from "../features/list/listSlice"
import popupReducer from '../features/popup/popupSlice'
import formSubAccReduce from "../features/formSubAcc/formSubAccSlice";
import confirmReduce from "../features/confirm/confirmSlice";
import checkMasterKeyReducer from "../features/checkMasterkey/masterKeySlice"
import settingReducer from "../features/settingForm/settingformSlice";
import listUserReducer from "../features/listuser/listuserSlice"

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    login: loginReducer,
    app: appReducer,
    popup : popupReducer,
    qr : qrReducer,
    subAccount : subAccountReducer,
    formSubAcc :formSubAccReduce,
    confirm: confirmReduce,
    checkMasterKey : checkMasterKeyReducer,
    setting : settingReducer,
    user : listUserReducer,
  }
})

export default store

