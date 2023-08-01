import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../store/usernameSlice';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const username = useSelector((state)=>{return state.username.username});
  const cookieUserName = Cookies.get('username');
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    const cookieTokenVal = Cookies.get('token');
    if(!cookieTokenVal){
      dispatch(logout());
      Cookies.remove('username');
      Cookies.remove('first_time_login')
      window.location.href = '/';
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/users/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': Cookies.get('token'),
        },
      });
      const data = await response.json();
      if(response.ok){
        dispatch(logout());
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('first_time_login');
        window.location.href = '/';
      }
      else{
        console.log("Error with logout response");
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  const handleProfileClick = () => {
    console.log(cookieUserName);
    window.location.href = '/profile/'+Cookies.get('username');
    return;
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {cookieUserName?
            <>
              <li>
                <Link onClick={handleLogoutClick}>LogOut</Link>
              </li>
              <li>
                <Link onClick={handleProfileClick}>Profile</Link>
              </li>
            </>
          :
          <>
            <li>
              <Link to="/login">LogIn</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar;