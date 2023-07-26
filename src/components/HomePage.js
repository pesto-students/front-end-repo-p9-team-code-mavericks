// components/HomePage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, login } from '../store/usernameSlice';

const HomePage = () => {
  const [inputUsername, setInputUsername] = useState('');
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username.username);

  const handleSetUsername = () => {
    dispatch(signup(inputUsername));
  };

  const handleClearUsername = () => {
    dispatch(login());
  };

  return (
    <div>
      {username ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleClearUsername}>Clear Username</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to the Homepage!</h2>
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          <button onClick={handleSetUsername}>Set Username</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
