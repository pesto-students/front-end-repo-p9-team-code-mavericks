// router/index.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import Navbar from '../components/Navbar';
import SignupPage from '../components/SignupPage';
import ProfilePage from '../components/ProfilePage'
import Cookies from 'js-cookie';

const AppRouter = () => {
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');

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
          element={cookieUserName ? <HomePage />: <LoginPage /> }
        />

        <Route
          path="/signup"
          element={cookieUserName ? <HomePage />: <SignupPage /> }
        />

        <Route
          path="/profile"
          element={cookieUserName ? <ProfilePage />: <LoginPage /> }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
