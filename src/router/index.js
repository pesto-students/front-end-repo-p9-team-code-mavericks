// router/index.js
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import SignupPage from '../components/SignupPage';
import ProfilePage from '../components/ProfilePage'
import Cookies from 'js-cookie';
import InterestsPage from '../components/InterestsPage';
import BookmarksListPage from '../components/BookmarksListPage'
import CreatePostPage from '../components/CreatePostPage';
import RecipeDetail from '../components/RecipeDetail';
import MobileNavbar from '../components/MobileNavbar';

const AppRouter = () => {
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');
  const [isMobile, setIsMobile] = useState(false);
  const [mobActiveTab, setMobActiveTab] = useState('home');

  const updateMobActiveTab = (tabName) => {
    console.log('This is value '+tabName);
    setMobActiveTab(tabName);
  };


  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <BrowserRouter>
      {cookieUserName ?
       isMobile ? <MobileNavbar /> : <Navbar />: <></>
      }
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/profile/:user"
          element={cookieUserName ? <ProfilePage /> : <HomePage />}
        />

        <Route
          path="/interests"
          element={cookieUserName ? <InterestsPage /> : <HomePage />}
        />

        <Route
          path="/bookmarks"
          element={cookieUserName ? <BookmarksListPage /> : <HomePage />}
        />

        <Route
          path="/createpost"
          element={cookieUserName ? <CreatePostPage /> : <HomePage />}
        />

        <Route
          path="/post/:id"
          element={cookieUserName ? <RecipeDetail /> : <HomePage />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
