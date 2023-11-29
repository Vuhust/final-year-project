import React from 'react';
import {useDispatch} from "react-redux";

const HomeView = () => {
  const isLoggedIn = true; // Example conditional rendering
  const dispatchApp = useDispatch(state => state.app);

  return (
    <div className="home-view">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomeView;
