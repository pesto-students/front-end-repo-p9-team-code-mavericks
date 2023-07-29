// components/HomePage.js
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');

  const handleLoginClick = () => {
    window.location.href = '/login';
  }

  const handleSignupClick = () => {
    window.location.href = '/signup';
  }

  const handleCreateRecipeClicked = () => {
    console.log("Create recipe clicked");
  }

  return (
    <div>
      {cookieUserName ? (
        <div>
          <h2>Welcome, {cookieUserName}!</h2>
          <button onClick={handleCreateRecipeClicked}>Create Recipe</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to the Homepage!</h2>
          <p>Please either Login or signup</p>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
