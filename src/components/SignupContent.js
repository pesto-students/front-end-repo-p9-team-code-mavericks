import React from "react";
import '../css/login_signup.css';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usernameSlice';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';

const SignupContent = (props) => {
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);


  const fetchUsernameFromAPI = async () => {
    try {
      // Make the API call to get the username
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({ email, password }), // Convert the data to JSON format
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }
      console.log(data);

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set('token', data.token, { expires: 7 }); // Set the token to expire in 7 days
      Cookies.set('username', data.username, { expires: 7 });
      Cookies.set('first_time_login', data.first_time_login, { expires: 7 });

    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };


  const handleSignup = () => {
    fetchUsernameFromAPI();
  };

  return (
    <>
      <div><h1><b style={{ color: 'orange' }}>R/\SO!</b></h1></div>
      <div><h3 style={{ color: 'gray' }}>Create New Account!</h3></div>
      <hr style={{ color: 'white' }} />
      <div>
        <Card style={{ border: '0' }}>
          <div style={{ padding: '1%' }}>
            <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} type='email' ref={emailInputRef} placeholder="Email" />
          </div>
          <div style={{ padding: '1%' }}>
            <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} ref={passwordInputRef} type='password' placeholder="Password" />
          </div>
          <div style={{ padding: '1%' }}>
            <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} ref={confirmPasswordInputRef} type='password' placeholder="Confirm Password" />
          </div>
          <br />
          <div><small style={{ color: 'gray' }}>Already have an account? <i style={{ color: 'blue', cursor:'pointer'}} onClick={props.handleSlideClick}>Login</i></small></div>
          <hr style={{ color: 'white' }} />
          <div ><button style={{ padding: '1%', width: '30%', backgroundImage: 'linear-gradient(to right, orange , #e7088e)', color: 'white', borderRadius: '15px', border: '0px' }} onClick={handleSignup}>Sign Up</button></div>
        </Card>
      </div>
    </>
  )
}

export default SignupContent;