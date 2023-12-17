import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import userReducer from '../features/user/userSlice'
import loginReducer from '../features/login/loginSlice'
import appReducer from '../appSlice'
import formLogin from '../features/formLogin/formLoginSlice'
import formRegister from '../features/formRegister/formRegisterSlice'

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
    login: loginReducer,
    app: appReducer,
    formRegister: formRegister,
    formLogin : formLogin
  }
})

export default store

