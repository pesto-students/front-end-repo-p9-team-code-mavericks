import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import { Link } from "react-router-dom";
import { logout } from '../store/usernameSlice';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 'logout')
      handleLogoutClick();
  };

  const handleLogoutClick = async () => {
    const cookieTokenVal = Cookies.get('token');
    if (!cookieTokenVal) {
      dispatch(logout());
      Cookies.remove('username');
      Cookies.remove('first_time_login')
      window.location.href = '/';
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_WEBSITE_URL + '/users/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': Cookies.get('token'),
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(logout());
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('first_time_login');
        window.location.href = '/';
      }
      else {
        console.log("Error with logout response");
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  useEffect(() => {
    const currentURL = window.location.href;
    if(currentURL.includes('bookmarks'))
      setValue('bookmarks');
    else if(currentURL.includes('createpost'))
      setValue('post');
    else if(currentURL.includes('profile'))
      setValue('profile');
    else
      setValue('home');

  },[value]);

  return (
    <BottomNavigation className='mob-nav' style={{ width: '100%', position: 'fixed', bottom: '0', zIndex: '100', height:'6vh' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        href='/'
        style={{ width: '25%'}}
        label="Home"
        value="home"
        icon={<Link to='/' style={{color: value === 'home' ? 'orange' : 'gray'}}><HomeIcon style={{borderRadius:'50%', backgroundColor:'white', fontSize: value === 'home'? '5rem': '', padding: value==='home'? '1%': '0', transition:'0.5s', boxShadow: value==='home'? '0 4px 6px rgba(0, 0, 0, 0.3)': '', }} /></Link>}
      />
      <BottomNavigationAction
        href='bookmarks'
        style={{ width: '20%'}}
        label="Bookmarks"
        value="bookmarks"
        icon={<Link to='/bookmarks' style={{color: value === 'bookmarks' ? 'orange' : 'gray'}}><BookmarkIcon style={{borderRadius:'50%', backgroundColor:'white', fontSize: value === 'bookmarks'? '5rem': '', padding: value==='bookmarks'? '1%': '0', transition:'0.5s', boxShadow: value==='bookmarks'? '0 4px 6px rgba(0, 0, 0, 0.3)': '',}} /></Link>}
      />
      <BottomNavigationAction
        style={{ width: '20%' }}
        label="Post"
        value="post"
        icon={<Link to='/createpost' style={{color: value === 'post' ? 'orange' : 'gray'}}><AddCircleSharpIcon style={{borderRadius:'50%', backgroundColor:'white', fontSize: value === 'post'? '5rem': '', padding: value==='post'? '1%': '0', transition:'0.5s', boxShadow: value==='post'? '0 4px 6px rgba(0, 0, 0, 0.3)': '',}} /></Link>}
      />
      <BottomNavigationAction
        style={{ width: '20%' }}
        label="Profile"
        value="profile"
        icon={<Link to={'/profile/'+Cookies.get('username')} style={{color: value === 'profile' ? 'orange' : 'gray'}}><Person2SharpIcon style={{borderRadius:'50%', backgroundColor:'white', fontSize: value === 'profile'? '5rem': '', padding: value==='profile'? '1%': '0', transition:'0.5s', boxShadow: value==='profile'? '0 4px 6px rgba(0, 0, 0, 0.3)': '',}} /></Link>}
      />
      <BottomNavigationAction
        style={{ width: '20%'}}
        label="Logout"
        value="logout"
        icon={<PowerSettingsNewSharpIcon style={{borderRadius:'50%', backgroundColor:'white', fontSize: value === 'logout'? '5rem': '', padding: value==='logout'? '1%': '0', transition:'0.5s', boxShadow: value==='logout'? '0 4px 6px rgba(0, 0, 0, 0.3)': '',}} />}
      />
    </BottomNavigation>
  );
}
