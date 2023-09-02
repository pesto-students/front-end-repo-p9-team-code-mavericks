import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../store/usernameSlice';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import '../css/navbar.css';
import seachIconImg from "../img/icons8-search.svg"
import ListGroup from "react-bootstrap/ListGroup";

const Navbar = () => {
  const username = useSelector((state) => { return state.username.username });
  const cookieUserName = Cookies.get('username');
  const dispatch = useDispatch();
  const searchBar = useRef('');
  const overlayRef = useRef('');
  const navRef = useRef('');
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setNavHeight(getNavHeight());
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

  const activateSearchBarClick = () => {
    setNavHeight(getNavHeight());
    setIsSearchBarClicked(true);
  }

  const deactivateSearchBarClicked = () => {
    setKeyword('');
    setIsSearchBarClicked(false);
  }

  const getNavHeight = () => {
    if (navRef.current) {
      return navRef.current.offsetHeight;
    }
  };

  const fetchSearchResults = async (trimmedKeyword) => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(process.env.REACT_APP_WEBSITE_URL + '/posts/search/'+trimmedKeyword, {
        method: 'GET',
        headers: {
          'authorization': token,
        },
      });

      const data = await response.json();
      console.log('Data is '+JSON.stringify(data));
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      console.log('Data of users is '+JSON.stringify(data.users));

      let resArr = [];
      if(data.users.length !== 0)
        resArr = [...resArr, ...data.users];
      if(data.posts.length !== 0)
        resArr = [...resArr, ...data.posts];
      setSearchResults(resArr);
    } catch(err) {
      console.error('Error fetching search results:', err);
    }
  }

  useEffect(()=>{
    setSearchResults([]);
    const trimmedKeyword = keyword.trim();
    console.log(trimmedKeyword);

    if(trimmedKeyword == ''){
      setSearchResults([]);
      return;
    }

    fetchSearchResults(trimmedKeyword);

  }, [keyword]);

  const goToPage = (result) => {
    console.log(result);
    if(result.username && result.username !== '')
      window.location.href = '/profile/'+result.username;
    else if(result._id && result._id !== '')
      window.location.href = '/post/'+result._id;
  }

  return (
    <>
      <nav className={`desk-nav ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div onClick={deactivateSearchBarClicked} className={!isSearchBarClicked ? 'overlay-hidden' : 'overlay'} ref={overlayRef} style={{ zIndex: '1', backgroundColor: 'black', opacity: '50%', height: '100vh', width: '100%', position: 'fixed', left: '0', top: `${navHeight}px` }}></div>
        <div className={!isSearchBarClicked ? 'search-results-hidden' : 'search-results'}
          style={
            {
              overflow: 'auto',
              zIndex: '2',
              backgroundColor: 'white',
              height: 'auto', width: '50%',
              position: 'absolute',
              left: '25%',
              top: `${navHeight}px`,
              opacity: '100%',
              borderRadius: '14px',
            }
          }>
          <ListGroup>
            {
              searchResults.map((result, index) => {
                return (
                  <ListGroup.Item style={{cursor:'pointer'}} key={index} onClick={()=>{goToPage(result)}}>
                    {
                      result.username?
                        <>
                          <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div  style={{color:'blue'}}>{result.firstname+'  '+result.lastname}</div>
                            <div style={{color:'gray'}}><small>Author</small></div>
                          </div>
                        </>:
                        <>
                          <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div  style={{color:'blue'}}>{result.recipe_title}</div>
                            <div style={{color:'gray'}}><small>Recipe</small></div>
                          </div>
                        </>
                    }
                    </ListGroup.Item>
                );
              })
            }
          </ListGroup>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: '20px' }}>
          <div><h3><b>R/\SO!</b></h3></div>
          {cookieUserName ?
            <>
              <div className={isSearchBarClicked ? 'search-bar-with-outline' : 'search-bar'} ref={searchBar}>
                <div style={{ width: '90%' }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    style={{ width: '100%' }}
                    onFocus={activateSearchBarClick}
                    onChange={(e) => {setKeyword(e.target.value)}}
                    value={keyword}
                  />
                </div>
                <div className='search-icon-inner-div' >
                  <img src={seachIconImg} alt='search-icon' className="image-preview" />
                </div>
              </div>
              <div><Link className='nav-links' to='/'  onClick={deactivateSearchBarClicked} >Home</Link></div>
              <div><Link className='nav-links' to='/bookmarks'  onClick={deactivateSearchBarClicked}>Bookmarks</Link></div>
              <div><Link className='nav-links' to={'/profile/' + Cookies.get('username')} >Profile</Link></div>
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