import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "../../css/profile_comp/user_posts.css";
import tempImg from '../../img/profile_pic2.jpg';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const UserPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchAllPosts = async () => {

    const token = Cookies.get('token');

    // Fetch user info
    try {
      const response = await fetch('http://127.0.0.1:3000/posts/allposts/' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setAllPosts(data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const cardStyle = {
    width: '300px',
    height: '250px', // You can adjust this height as needed
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden', // To ensure image doesn't exceed card boundaries
  };

  const imageStyle = {
    width: '100%',
    height: '100%', // Image will fill the container without changing card's height
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const contentStyle = {
    marginTop: '10px',
    fontSize: '16px',
    color: '#333',
  };

  return (
    <>
      <div style={cardStyle}>
        <div style={{ width: '100%', height: '75%', position: 'relative' }}>
          <img
            src={tempImg}
            alt="Card"
            style={imageStyle}
          />
        </div>
        <div style={contentStyle}>
          <h2>Card Title</h2>
          <p>
            This is a beautiful looking card with some content written below the
            image. You can customize the styles to make it even more appealing!
          </p>
        </div>
      </div>
    </>
  );
}

export default UserPosts;
