import React from "react";
import '../css/login_signup.css';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usernameSlice';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { BACKEND_URL } from "../global";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const SignupContent = (props) => {
  const dispatch = useDispatch();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const signupUser = async() => {
    try {
      // Make the API call to get the username
      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch(BACKEND_URL + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({ username, password }), // Convert the data to JSON format
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }
      console.log(data);

      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  }

  const handleSignup = () => {
    usernameInputRef.current.value = usernameInputRef.current.value.trim();
    passwordInputRef.current.value = passwordInputRef.current.value.trim();
    confirmPasswordInputRef.current.value = confirmPasswordInputRef.current.value.trim();

    if (usernameInputRef.current.value == "") {
      usernameInputRef.current.style.border = '1px solid red';
      passwordInputRef.current.style.border = '1px solid gray';
      confirmPasswordInputRef.current.style.border = '1px solid gray';
      return;
    }
    else
      usernameInputRef.current.style.border = '1px solid gray';

    if (passwordInputRef.current.value == "") {
      usernameInputRef.current.style.border = '1px solid gray';
      passwordInputRef.current.style.border = '1px solid red';
      confirmPasswordInputRef.current.style.border = '1px solid gray';
    }
    else
      passwordInputRef.current.style.border = '1px solid gray';

    if (confirmPasswordInputRef.current.value == "") {
      usernameInputRef.current.style.border = '1px solid gray';
      passwordInputRef.current.style.border = '1px solid gray';
      confirmPasswordInputRef.current.style.border = '1px solid red';

    }
    else
      confirmPasswordInputRef.current.style.border = '1px solid gray';

    if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      confirmPasswordInputRef.current.style.border = '1px solid red';
      passwordInputRef.current.style.border = '1px solid red';
      usernameInputRef.current.style.border = '1px solid gray';
      return;
    }

    window.location.href = '/getyoustarted/'+usernameInputRef.current.value;

  };

  return (
    <>
      <div><h1><b style={{ color: 'orange' }}>R/\SO!</b></h1></div>
      <div><h3 style={{ color: 'gray' }}>Create New Account!</h3></div><br></br>
      {/* <hr style={{ color: 'white' }} /> */}
      <Card style={{ border: '0' }}>
        <div style={{ padding: '1%' }}>
          <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} type='text' ref={usernameInputRef} placeholder="User Name" />
        </div>
        <div style={{ padding: '1%' }}>
          <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} ref={passwordInputRef} type='password' placeholder="Password" />
        </div>
        <div style={{ padding: '1%' }}>
          <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} ref={confirmPasswordInputRef} type='password' placeholder="Confirm Password" />
        </div>
        <br />
        <div><small style={{ color: 'gray' }}>Already have an account? <i style={{ color: 'blue', cursor: 'pointer' }} onClick={props.handleSlideClick}>Login</i></small></div>
        <hr style={{ color: 'white' }} />


        <div ><button style={{ padding: '1%', width: '30%', backgroundImage: 'linear-gradient(to right, orange , #e7088e)', color: 'white', borderRadius: '15px', border: '0px' }} onClick={handleSignup}>Sign Up</button></div>
      </Card>
      <div>OR</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
          <GoogleOAuthProvider clientId="238627830616-pr2da7gepjeo1qvmuvm9d0eoelug5uko.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={credentialResponse => {
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
                const fetchUsernameFromAPI = async () => {
                  try {
                    // Make the API call to get the username
                    const email = decoded.email;
                    const password = decoded.email;

                    const response = await fetch(BACKEND_URL + '/login', {
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
                fetchUsernameFromAPI();

              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

    </>
  )
}

export default SignupContent;