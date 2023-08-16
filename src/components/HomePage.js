// components/HomePage.js
import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import InterestsPage from './InterestsPage';
import Spinner from 'react-bootstrap/Spinner';
import LoginContent from './LoginContent';
import SignupContent from './SignupContent';
import { Container } from 'react-bootstrap';
import '../css/homepage.css';
import addRecipeImage from '../img/recipe_add_icon.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

const HomePage = () => {
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');
  const firstTimeLogin = Cookies.get('first_time_login');
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastRecipeCardRef = useRef();
  const [shouldFetch, setShouldFetch] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoginFormActive, setIsLoginFormActive] = useState(true);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);

  const handleSlideClick = () => {
    setIsLoginFormActive(!isLoginFormActive);
  };
  const handleLoginClick = () => {
    window.location.href = '/login';
  }

  const handleSignupClick = () => {
    window.location.href = '/signup';
  }

  const handleCreateRecipeClicked = () => {
    window.location.href = '/createpost';
  }

  const fetchUserFeeds = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/posts/retrieve/' + pageNo, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setShouldFetch(false);
        return;
      }
      setPageNo(pageNo + 1);
      setFeeds([...feeds, ...data.posts]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setIsLoading(false);
    }
  }


  const fetchMostLikedPosts = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/posts/mostliked', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      setMostLikedPosts([...mostLikedPosts, ...data.most_liked_posts]);
    } catch (error) {
      console.error('Error fetching most liked posts:', error);
    }
  }

  const goToProfile = (e) => {
    window.location.href = '/profile/'+e.target.innerText;
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchUserFeeds();
      fetchMostLikedPosts();
      setShouldFetch(false);
    }
  }, [shouldFetch]);


  useEffect(() => {
    // Create the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && !isLoading) {
          // If the last RecipeCard is in the viewport and no loading in progress, fetch next recipes
          if (totalPages >= pageNo)
            fetchUserFeeds();
        }
      },
      { threshold: 0.1 }
    );

    // Attach the observer to the last RecipeCard element
    if (lastRecipeCardRef.current) {
      observer.observe(lastRecipeCardRef.current);
    }

    // Cleanup function
    return () => {
      if (lastRecipeCardRef.current) {
        observer.unobserve(lastRecipeCardRef.current);
      }
    };
  }, [isLoading]);

  const createdTime = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);

    const timeDifferenceInHours = (currentTime - createdTime) / (1000 * 60 * 60);

    if (timeDifferenceInHours < 24) {
      return createdTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      return `${createdTime.getDate()} ${createdTime.toLocaleString('default', { month: 'short' })} ${createdTime.getFullYear()}`;
    }
  }



  return (
    <div>
      {cookieUserName ?
        firstTimeLogin == 'true' ? <InterestsPage />
          :
          (
            <>
              <div className='homepage-flex-div'>
                <div className='feeds-flex-div'>
                  {feeds && feeds.length > 0 ? (
                    feeds.map((feed, index) => {
                      if (index === feeds.length - 1) {
                        return (
                          <div style={{}} key={feed._id} ref={lastRecipeCardRef}>
                            <RecipeCard feed={feed} />
                          </div>
                        );
                      } else {
                        return (
                          <div style={{ padding: '1%' }}>
                            <RecipeCard key={feed._id} feed={feed} />
                          </div>
                        );
                      }
                    })
                  ) : (
                    <>Nothing to show!</>
                  )}
                  {isLoading && <Spinner animation="border" variant="warning" />}
                </div>
                <div className='most-liked-flex-div'>
                  <div className='most-liked-text'><b>Most Liked</b></div>
                  {
                    mostLikedPosts.map((post) => {
                      return (
                        <ToastContainer
                          className="position-static toast-cont"
                          key={post._id}
                          style={{ zIndex: 1}}
                        >
                          <Toast className='actual-toast'>
                            <Toast.Header closeButton={false}>
                              <img
                                src=""
                                className="rounded me-2"
                                alt=""
                              />
                              <strong className="me-auto">Author: &nbsp;<i style={{ color: 'blue', cursor:'pointer'}} onClick={goToProfile}>{post.author_username}</i></strong>
                              <small>{createdTime(post.createdAt)}</small>
                            </Toast.Header>
                            <Toast.Body>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div value={post._id} style={{ width: '80%'}}>{post.recipe_title}</div>
                                <div style={{ width: '20%' }}>{post.recipe_likes} <span style={{ color: 'blue' }}>Likes</span></div>
                              </div>

                            </Toast.Body>
                          </Toast>
                        </ToastContainer>
                      )
                    })
                  }

                </div>
                <div className='create-post-flex-div'>
                  <div style={{ width: '95%', alignItems: 'center', backgroundColor: 'rgb(231, 8, 142)', height: 'auto', color: 'white', borderRadius: '14px', textAlign: 'center', padding: '5% 3% 3% 3%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ fontSize: '1.5rem' }}>
                      <b>Lets Create Recipe</b>
                    </div>
                    <div className='floating-add-post-icon' style={{ cursor: 'pointer', borderRadius: '25px', }} onClick={handleCreateRecipeClicked}>
                      <label
                        className='add-post-img-icon'
                        style={{ backgroundImage: `url(${addRecipeImage})`, borderRadius: '25px' }}
                      ></label>
                    </div >
                  </div>
                </div>
              </div>
            </>

          ) : (
          <Container className='login-signup-container'>
            <div className='login-signup-flexbox'>
              <div className={isLoginFormActive ? "login-signup-div active" : "login-signup-div"}>
                {isLoginFormActive ? <LoginContent handleSlideClick={handleSlideClick} /> : <SignupContent handleSlideClick={handleSlideClick} />}
              </div>
              <div className={
                isLoginFormActive ? "wallpaper-div active2 wallpaper-img2" : "wallpaper-div wallpaper-img1"
              }>
                <div style={{ backgroundImage: 'linear-gradient(to right, orange, #e7088e)', position: 'absolute', width: '100%', height: '80vh', opacity: '40%', zIndex: '2', borderRadius: '13px' }}></div>
              </div>
            </div>
          </Container>
        )}
    </div>
  );
};

export default HomePage;
