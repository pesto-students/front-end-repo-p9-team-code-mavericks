import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../store/usernameSlice';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import '../css/navbar.css';
import seachIconImg from "../img/icons8-search.svg"

const Navbar = () => {
  const username = useSelector((state) => { return state.username.username });
  const cookieUserName = Cookies.get('username');
  const dispatch = useDispatch();
  const searchInp = useRef('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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
      const response = await fetch('http://127.0.0.1:3000/users/logout', {
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

  const handleProfileClick = () => {
    window.location.href = '/profile/' + Cookies.get('username');
    return;
  };

  return (
    <>

      <nav className={`desk-nav ${scrolled ? 'scrolled' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: '20px' }}>
          <div><h3><b>R/\SO!</b></h3></div>
          {cookieUserName ?
            <>
              <div className="search-bar">
                <div style={{ width: '90%' }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className='search-icon-inner-div' >
                  <img src={seachIconImg} alt='search-icon' className="image-preview" />
                </div>
              </div>
              <div><Link className='nav-links' to='/' >Home</Link></div>
              <div><Link className='nav-links' to='/bookmarks'>Bookmarks</Link></div>
              <div><Link className='nav-links' onClick={handleProfileClick}>Profile</Link></div>
              <div><Link className='nav-links' onClick={handleLogoutClick}>Logout</Link></div>

            </>
            :
            <>
              <div><Link style={{ textDecoration: 'none', color: 'white' }} to="/login">LogIn</Link></div>
              <div><Link style={{ textDecoration: 'none', color: 'white' }} to="/signup">Sign Up</Link></div>
            </>
          }


        </div>
      </nav>
    </>
  )
}

export default Navbar;