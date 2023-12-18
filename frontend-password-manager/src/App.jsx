import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpPopUp from "./features/popup/popupView";

import { CakeView } from './features/cake/CakeView'
import { IcecreamView } from './features/icecream/IcecreamView'
import { UserView } from './features/user/UserView'
import LoginView from './features/login/LoginView'
import { useSelector, useDispatch } from 'react-redux'
import HomeView from "./features/home/HomeView";
import Header from "./features/header/header";
import React from "react";
import ListView from "./features/list/ListView";
import MasterKey from "./features/masterkey/MasterKeyView";
import Login from "./features/formLogin/FormloginView";
import Register from "./features/formRegister/FormRegisterView";
import {comopentShow} from "./features/common/common"
import Popup from "./features/popup/popupView"

function App() {
  const app = useSelector(state => state.app)
  console.log(app.page)

  return (
    <div className='App'>
      <ToastContainer/>
      <Header />
        <MasterKey/>
      {app.page === 'HOME' && <HomeView /> }

      {/*<MyForm />*/}
        {app.page === comopentShow.REGISTER && <Register />}
        {app.page === comopentShow.LOGIN && <Login />}

    {/*<OtpPopUp/>*/}
      {/*  <IcecreamView />*/}
      {/*<UserView />*/}
      {/*/!*<LoginView/>*!/*/}


      {/*{ (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <Form/> }*/}

      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <ListView/> }
        <Popup/>
        {/*<Otp/>*/}
    </div>
  )
}

export default App
