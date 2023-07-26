// router/index.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../components/HomePage';
import Page1 from '../components/Page1';

const AppRouter = () => {
  const username = useSelector((state) => state.username.username);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page1">Page 1</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/page1"
          element={username ? <Page1 /> : <HomePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
