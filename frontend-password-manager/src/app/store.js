import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import userReducer from '../features/user/userSlice'
import loginReducer from '../features/login/loginSlice'
import appReducer from '../appSlice'
import formReducer from '../features/form/formSlice'

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
    login: loginReducer,
    app: appReducer,
    form: formReducer,
  }
})

export default store

