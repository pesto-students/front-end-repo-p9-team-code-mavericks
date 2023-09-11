import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../../global";
import SearchIcon from '@mui/icons-material/Search';
import { Container, Spinner } from "react-bootstrap";
import MobileNavbar from '../MobileNavbar';
import RecipeCard from "../RecipeCard";
import { placeholder } from "@babel/types";

const PostedRecipes = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchedAllPosts, setSearchedAllPosts] = useState({});


  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const fetchAllPosts = async () => {
    const token = Cookies.get('token');
    // Fetch user info
    try {
      const response = await fetch(BACKEND_URL + '/posts/allposts/' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setAllPosts(data.posts);
      setSearchedAllPosts(data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  const searchAllPosts = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value == '')
      setSearchedAllPosts(allPosts);
    else {
      setSearchedAllPosts(allPosts.filter(item => {
        console.log('item is ' + item.author_username + ' ' + item.recipe_title);
        if (item.author_username && item.author_username.startsWith(e.target.value))
          return item;
        else if (item.recipe_title) {
          const regex = new RegExp(`\\b${e.target.value}\\w*\\b`, 'i'); // Create a regular expression pattern
          const match = item.recipe_title.match(regex);
          if(match)
            return item;
        }
        // return author_username.startsWith(e.target.value) || recipe_title.startsWith(e.target.value);
      }));
    }
  }

  useEffect(() => {
    checkScreenSize();
    fetchAllPosts();
  }, []);

  return (
    <>
      <Container className='bookmark-container'>
        <div style={{ marginTop: '1%', marginBottom: isMobile ? '3.5%' : '1%', width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(231, 8, 142, 0.2), 0 6px 20px 0 rgba(231, 8, 142, 0.19)', padding: '1% 0.5% 1% 0.5%', display: 'flex' }}>
          <div style={{ width: 'auto' }}><SearchIcon style={{ color: '#e7088e' }} /></div>
          <div style={{ width: '92%' }}>
            <input value={searchVal} onChange={searchAllPosts} type="text" style={{ outline: 'none', color: 'gray', width: '100%', border: 'none' }} placeholder="Search..." />
          </div>
        </div>
        
        <div className="" style={{ paddingTop: '1%', display: 'flex', flexDirection: 'column', gap: '1vh', justifyContent: 'space-around', alignItems: 'center' }}>
          {isLoading ? (
            <Spinner />
          ) : (
            !searchedAllPosts || searchedAllPosts.length === 0 ? <><div style={{ padding: '1%', color: 'darksalmon' }}>No Recipie Posts</div></> :
              searchedAllPosts.map((post, index) => (
                <RecipeCard key={index} feed={post} />
              ))
          )}
        </div>
      </Container>
    </>
  )
}

export default PostedRecipes;