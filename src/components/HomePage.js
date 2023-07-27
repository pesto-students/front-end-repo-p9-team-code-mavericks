// components/HomePage.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const username = useSelector((state) => state.username.username);

  const handleLoginClick = () => {
    window.location.href = '/login';
  }


  return (
    <div>
      {username ? (
        <div>
          <h2>Welcome, {username}!</h2>
        </div>
      ) : (
        <div>
          <h2>Welcome to the Homepage!</h2>
          <p>Please either Login or signup</p>
          <button onClick={handleLoginClick}>Login</button>
          <button>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
