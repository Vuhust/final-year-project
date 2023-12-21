import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import {comopentShow} from "./features/common/common";
import FormOtp from "./features/formOtp/jormOtp";
import Qr from "./features/qr/qrView"
import formMasterKey from "./features/formSetMasterKey/FormMasterKeyView";
import FormMasterKey from "./features/formSetMasterKey/FormMasterKeyView";
import FormSubAcc from "./features/formSubAcc/formSubAcc"
import SweetAlert from "react-bootstrap-sweetalert";
import QRCode from "react-qr-code";
import ConfirmView from "./features/confirm/ConfirmView";

function App() {
  const app = useSelector(state => state.app)
  const formSubAcc = useSelector(state => state.formSubAcc)

  console.log(app, "app")

  return (
    <div className='App'>
      <ToastContainer/>
      {app.page !== comopentShow.LOGIN && <Header/>}
      <ConfirmView/>

        <Qr/>
        <MasterKey/>
      {app.page === 'HOME' && <HomeView /> }
      {formSubAcc.show && <FormSubAcc /> }

      {/*<MyForm />*/}
        {app.page === comopentShow.REGISTER && <Register />}
        {app.page === comopentShow.LOGIN && <Login />}
        {app.page === comopentShow.OTP_FORM && <FormOtp/>}
        {app.page === comopentShow.FORM_MASTER_KEY && <FormMasterKey/>}

    {/*<OtpPopUp/>*/}
      {/*  <IcecreamView />*/}
      {/*<UserView />*/}
      {/*/!*<LoginView/>*!/*/}


      {/*{ (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <Form/> }*/}

      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <ListView/> }
      {/*<ListView></ListView>*/}
        {/*<Otp/>*/}
    </div>
  )
}

export default App
