// components/HomePage.js
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

const HomePage = () => {
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoginClick = () => {
    window.location.href = '/login';
  }

  const handleSignupClick = () => {
    window.location.href = '/signup';
  }

  const handleCreateRecipeClicked = () => {
    console.log("Create recipe clicked");
  }

  const fetchUserFeeds = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/posts/retrieve/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setFeeds(data.feeds);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching feeds:', error);
    }
  }

  useEffect(()=>{
    fetchUserFeeds();
  },[]);

  return (
    <div>
      {cookieUserName ? (
        <div>
          <h2>Welcome, {cookieUserName}!</h2>
          <button onClick={handleCreateRecipeClicked}>Create Recipe</button>
          <h4>FEEDS:</h4>
          {
            feeds?
            feeds.map((feed, index) => {
              return (
                <RecipeCard key={index} feed={feed}/>
              )
            }):
            <>Nothing to show!</>
          }
        </div>
      ) : (
        <div>
          <h2>Welcome to the Homepage!</h2>
          <p>Please either Login or signup</p>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
