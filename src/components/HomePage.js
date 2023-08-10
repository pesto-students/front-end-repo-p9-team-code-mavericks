// components/HomePage.js
import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import InterestsPage from './InterestsPage';
import Spinner from 'react-bootstrap/Spinner';

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

      const response = await fetch('http://127.0.0.1:3000/posts/retrieve/'+pageNo, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      const data = await response.json();
      if(!response.ok){
        console.log(data.error);
        setShouldFetch(false);
        return;
      }
      setPageNo(pageNo+1);
      setFeeds([...feeds,...data.posts]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchUserFeeds();
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
          if(totalPages >= pageNo)
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


  return (
    <div>
      {cookieUserName ?
        firstTimeLogin == 'true' ? <InterestsPage />
          :
          (
            <div>
              <h2>Welcome, {cookieUserName}!</h2>
              <button onClick={handleCreateRecipeClicked}>Create Recipe</button>
              <h4>FEEDS:</h4>
              {feeds && feeds.length > 0 ? (
                feeds.map((feed, index) => {
                  if (index === feeds.length - 1) {
                    return (
                      <div key={index} ref={lastRecipeCardRef}>
                        <RecipeCard feed={feed} />
                      </div>
                    );
                  } else {
                    return <RecipeCard key={index} feed={feed} />;
                  }
                })
              ) : (
                <>Nothing to show!</>
              )}
              {isLoading && <Spinner animation="border" variant="warning" />}
            </div>
          ) : (
          <div style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/food-vector-seamless-pattern-cuisine-fast-food-cafe-wallpaper-with-gastronomy-icons-yellow-gold-color-texture-decorative-textile-wrapping-paper-design-bright-background-menu-receipts_106317-9575.jpg?w=2000')",
          }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400&family=Rum+Raisin&display=swap"
              rel="stylesheet"
            ></link>
            <h2>Welcome to</h2><h2 style={{ fontFamily: "Rum Raisin, sans-serif" }}>Rasoi</h2>
            <p>Please either Login or signup</p>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleSignupClick}>Sign Up</button>
          </div>
        )}
    </div>
  );
};

export default HomePage;
