import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@djthoms/pretty-checkbox';

import { useSelector, useDispatch } from 'react-redux'
import HomeView from "./features/home/HomeView";
import Header from "./features/header/header";
import React, {useEffect} from "react";
import ListView from "./features/list/ListView";
import ListUserView  from "./features/listuser/listuserView";
import CheckMasterKey from "./features/checkMasterkey/MasterKeyView";
import Login from "./features/formLogin/FormloginView";
import Register from "./features/formRegister/FormRegisterView";
import {comopentShow, } from "./features/common/common";
import FormOtp from "./features/formOtp/jormOtp";
import Qr from "./features/qr/qrView"
import formMasterKey from "./features/formSetMasterKey/FormSetMasterKeyView";
import FormSetMasterKey from "./features/formSetMasterKey/FormSetMasterKeyView";
import FormSubAcc from "./features/formSubAcc/formSubAcc"
import SweetAlert from "react-bootstrap-sweetalert";
import QRCode from "react-qr-code";
import ConfirmView from "./features/confirm/ConfirmView";
import SettingFormView from "./features/settingForm/SettingFormView";
import {doGetUserInfo, setCurrentUrl} from "./appSlice";
import changeMasterKeyView from "./features/changeMasterKeyForm/ChangeMasterKeyView";
import ChangeMasterKeyVieW from "./features/changeMasterKeyForm/ChangeMasterKeyView";
function App() {
  const app = useSelector(state => state.app)
  const formSubAcc = useSelector(state => state.formSubAcc)
  const dispatch = useDispatch();
  console.log(app, "app")

  useEffect(() => {
    doGetUserInfo();
    // Get the current tab's URL
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // tabs[0] will contain information about the active tab
        const currentUrl = tabs[0].url;
        console.log("Current URL:", currentUrl);
        dispatch(setCurrentUrl(currentUrl));
        // You can use the URL here or pass it to another function
      });
    } catch (e){
      console.log("web ui")
    }



  }, []);

  const style = {
    minWidth: '400px',
    minHeight: '400px'


  };
    return (
    <div className='App' style={style}>
      <ToastContainer/>
      {app.page !== comopentShow.LOGIN && <Header/>}
      <ConfirmView/>

        {/*{app.page === comopentShow.FORM_SETTING && <SettingFormView/>}*/}
        {app.page=== comopentShow.FORM_SETTING && <SettingFormView/>}
        <Qr/>
        <CheckMasterKey/>
      {app.page === 'HOME' && <HomeView /> }
      {formSubAcc.show && <FormSubAcc /> }

      {/*<MyForm />*/}
        {app.page === comopentShow.REGISTER && <Register />}
        {app.page === comopentShow.LOGIN && <Login />}
        {app.page === comopentShow.OTP_FORM && <FormOtp/>}
        {app.page === comopentShow.FORM_SET_MASTER_KEY  && !app.isAdmin  && <FormSetMasterKey/>}
        {app.page === comopentShow.FROM_CHANGE_MASTER_KEY   && <ChangeMasterKeyVieW/>}

    {/*<OtpPopUp/>*/}
      {/*  <IcecreamView />*/}
      {/*<UserView />*/}
      {/*/!*<LoginView/>*!/*/}


      {/*{ (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <Form/> }*/}

      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT"  && !app.isAdmin ) && <ListView/> }
      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" && app.isAdmin  ) && <ListUserView/> }
      {/*<ListView></ListView>*/}
        {/*<Otp/>*/}

    </div>
  )
}

export default App
