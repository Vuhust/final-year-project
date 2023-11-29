import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginSlice.js'; // Importing the login action from loginSlice
import  {setPage} from '../../appSlice'
const Login = () => {
  const dispatchApp = useDispatch(state => state.app);
  const [page] = useState('login');
  // const [password, setPassword] = useState('');

  const handleLogout = () => {
    // Dispatching the login action with the username and password
    dispatchApp(setPage({ page}));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogout();
      }}>
        <button type="submit">Logidsdfasdfasefsdfasen</button>
      </form>
    </div>
  );
};

export default Login;
