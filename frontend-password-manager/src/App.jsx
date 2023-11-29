import './App.css'
import { CakeView } from './features/cake/CakeView'
import { IcecreamView } from './features/icecream/IcecreamView'
import { UserView } from './features/user/UserView'
import LoginView from './features/login/LoginView'
import { useSelector, useDispatch } from 'react-redux'
import HomeView from "./features/home/HomeView";
import React from "react";

function App() {
  const app = useSelector(state => state.app)

  return (
    <div className='App'>
      {app.page === 'home' && <HomeView /> }

      <IcecreamView />
      <UserView />
      <LoginView/>
    </div>
  )
}

export default App
