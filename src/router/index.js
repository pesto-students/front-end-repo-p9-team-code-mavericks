// router/index.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import Navbar from '../components/Navbar';
import SignupPage from '../components/SignupPage';

const AppRouter = () => {
  const username = useSelector((state) => state.username.username);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={username ? <HomePage />: <LoginPage /> }
        />

        <Route
          path="/signup"
          element={username ? <HomePage />: <SignupPage /> }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
