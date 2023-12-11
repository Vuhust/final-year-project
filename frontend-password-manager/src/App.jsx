import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~hover.css/css/hover-min.css"; /* Adjust the path based on your project structure */

import { CakeView } from './features/cake/CakeView'
import { IcecreamView } from './features/icecream/IcecreamView'
import { UserView } from './features/user/UserView'
import LoginView from './features/login/LoginView'
import { useSelector, useDispatch } from 'react-redux'
import HomeView from "./features/home/HomeView";
import Header from "./features/header/header";
import React from "react";
import Form from "./features/form/form";
import ListView from "./features/list/ListView";
import MasterKey from "./features/masterkey/MasterKeyView";
function App() {
  const app = useSelector(state => state.app)
  console.log(app.page)

  return (
    <div className='App'>
      <Header />
        <MasterKey/>
      {app.page === 'HOME' && <HomeView /> }

      {/*<IcecreamView />*/}
      {/*<UserView />*/}
      {/*<LoginView/>*/}


      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <Form/> }

      { (app.page === 'SUB_ACCOUNT' ||  app.page === "ALL_SUB_ACCOUNT" ) && <ListView/> }
    </div>
  )
}

export default App
