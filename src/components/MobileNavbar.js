import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
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
import { ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';
import '../css/mobile_navbar.css';
import seachIconImg from "../img/icons8-search.svg";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const searchBar = useRef('');
  const [keyword, setKeyword] = useState('');
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsFixed, setIsSearchResultsFixed] = useState(false);
  const overlayRef = useRef('');
  const navRef = useRef('');


  const fetchSearchResults = async (trimmedKeyword) => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(process.env.REACT_APP_WEBSITE_URL + '/posts/search/' + trimmedKeyword, {
        method: 'GET',
        headers: {
          'authorization': token,
        },
      });

      const data = await response.json();
      console.log('Data is ' + JSON.stringify(data));
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      console.log('Data of users is ' + JSON.stringify(data.users));

      let resArr = [];
      if (data.users.length !== 0)
        resArr = [...resArr, ...data.users];
      if (data.posts.length !== 0)
        resArr = [...resArr, ...data.posts];
      setSearchResults(resArr);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    deactivateSearchBarClicked();
    if (newValue === 'logout')
      handleLogoutClick();
  };

  const getNavHeight = () => {
    if (navRef.current) {
      return navRef.current.offsetHeight;
    }
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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > prevScrollY) {
      // Scrolling down, make the navbar non-sticky
      setIsSticky(false);
      setIsSearchResultsFixed(false);
    } else {
      // Scrolling up, make the navbar sticky
      setIsSticky(true);
      setIsSearchResultsFixed(true);
    }

    if (currentScrollY == 0){
      navRef.current.style.position = 'relative';
    }
    else{
      navRef.current.style.position = 'fixed';
    }

    setPrevScrollY(currentScrollY);
  };

  const activateSearchBarClick = () => {
    setIsSearchBarClicked(true);
  };

  const deactivateSearchBarClicked = () => {
    setKeyword('');
    setIsSearchBarClicked(false);
  }

  const goToPage = (result) => {
    console.log(result);
    if (result.username && result.username !== '')
      window.location.href = '/profile/' + result.username;
    else if (result._id && result._id !== '')
      window.location.href = '/post/' + result._id;
  }

  useEffect(() => {
    setNavHeight(getNavHeight());
    navRef.current.style.position = 'relative';
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes('bookmarks'))
      setValue('bookmarks');
    else if (currentURL.includes('createpost'))
      setValue('post');
    else if (currentURL.includes('profile'))
      setValue('profile');
    else
      setValue('home');

  }, [value]);

  useEffect(() => {
    setSearchResults([]);
    const trimmedKeyword = keyword.trim();
    console.log(trimmedKeyword);

    if (trimmedKeyword == '') {
      setSearchResults([]);
      return;
    }

    fetchSearchResults(trimmedKeyword);

  }, [keyword]);

  return (
    <>
      <div onClick={deactivateSearchBarClicked} className={!isSearchBarClicked ? 'overlay-hidden' : 'overlay'} ref={overlayRef} style={{ zIndex: '1', backgroundColor: 'black', opacity: '50%', height: '100vh', width: '100%', position: 'fixed', left: '0', top: '0' }}></div>

      <div className='mob-top-nav'
        ref={navRef}
        style={{
          transform: isSticky? 'translateY(0%)': 'translateY(-100%)',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '1%',
          top: '0',
          backgroundColor: 'orange',
          width: '100%',
          zIndex: '100',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className={!isSearchBarClicked ? 'mob-search-results-hidden' : 'mob-search-results'}
          style={
            {
              position: 'relative',
              overflow: 'auto',
              zIndex: '99',
              backgroundColor: 'white',
              position: 'fixed',
              top: isSearchResultsFixed? `${navHeight}px`: '0',
              opacity: '100%',
            }
          }>
          <ListGroup>
            {
              searchResults.map((result, index) => {
                return (
                  <ListGroup.Item style={{ cursor: 'pointer' }} key={index} onClick={() => { goToPage(result) }}>
                    {
                      result.username ?
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: 'blue' }}>{result.firstname + '  ' + result.lastname}</div>
                            <div style={{ color: 'gray' }}><small>Author</small></div>
                          </div>
                        </> :
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: 'blue' }}>{result.recipe_title}</div>
                            <div style={{ color: 'gray' }}><small>Recipe</small></div>
                          </div>
                        </>
                    }
                  </ListGroup.Item>
                );
              })
            }
          </ListGroup>
        </div>
        <div style={{ color: 'white' }}><h3><b>R/\SO!</b></h3></div>
        <div className={isSearchBarClicked ? 'mob-search-bar-with-outline' : 'mob-search-bar'} ref={searchBar}>
          <div style={{ width: '90%' }}>
            <input
              type="text"
              placeholder="Search..."
              className="mob-search-input"
              style={{ width: '100%' }}
              onFocus={activateSearchBarClick}
              onChange={(e) => { setKeyword(e.target.value) }}
              value={keyword}
            />
          </div>
          <div className='mob-search-icon-inner-div' >
            <img src={seachIconImg} alt='mob-search-icon' className="image-preview" />
          </div>
        </div>
      </div>

      <BottomNavigation className='mob-nav' style={{ width: '100%', position: 'fixed', bottom: '0', zIndex: '100', height: '6vh' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          href='/'
          style={{ width: '25%' }}
          label="Home"
          value="home"
          icon={<Link to='/' style={{ color: value === 'home' ? 'orange' : 'gray' }}><HomeIcon style={{ borderRadius: '50%', backgroundColor: 'white', fontSize: value === 'home' ? '5rem' : '', padding: value === 'home' ? '1%' : '0', transition: '0.5s', boxShadow: value === 'home' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '', }} /></Link>}
        />
        <BottomNavigationAction
          href='bookmarks'
          style={{ width: '20%' }}
          label="Bookmarks"
          value="bookmarks"
          icon={<Link to='/bookmarks' style={{ color: value === 'bookmarks' ? 'orange' : 'gray' }}><BookmarkIcon style={{ borderRadius: '50%', backgroundColor: 'white', fontSize: value === 'bookmarks' ? '5rem' : '', padding: value === 'bookmarks' ? '1%' : '0', transition: '0.5s', boxShadow: value === 'bookmarks' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '', }} /></Link>}
        />
        <BottomNavigationAction
          style={{ width: '20%' }}
          label="Post"
          value="post"
          icon={<Link to='/createpost' style={{ color: value === 'post' ? 'orange' : 'gray' }}><AddCircleSharpIcon style={{ borderRadius: '50%', backgroundColor: 'white', fontSize: value === 'post' ? '5rem' : '', padding: value === 'post' ? '1%' : '0', transition: '0.5s', boxShadow: value === 'post' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '', }} /></Link>}
        />
        <BottomNavigationAction
          style={{ width: '20%' }}
          label="Profile"
          value="profile"
          icon={<Link to={'/profile/' + Cookies.get('username')} style={{ color: value === 'profile' ? 'orange' : 'gray' }}><Person2SharpIcon style={{ borderRadius: '50%', backgroundColor: 'white', fontSize: value === 'profile' ? '5rem' : '', padding: value === 'profile' ? '1%' : '0', transition: '0.5s', boxShadow: value === 'profile' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '', }} /></Link>}
        />
        <BottomNavigationAction
          style={{ width: '20%' }}
          label="Logout"
          value="logout"
          icon={<PowerSettingsNewSharpIcon style={{ borderRadius: '50%', backgroundColor: 'white', fontSize: value === 'logout' ? '5rem' : '', padding: value === 'logout' ? '1%' : '0', transition: '0.5s', boxShadow: value === 'logout' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '', }} />}
        />
      </BottomNavigation>
    </>
  );
}
