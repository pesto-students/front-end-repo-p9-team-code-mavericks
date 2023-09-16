import React, {useEffect} from "react";
import '../css/login_signup.css';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usernameSlice';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { BACKEND_URL } from "../global";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import ErrorMsgBox from "./ErrorMsgBox";
import logo from '../img/rasoi_small_logo.png';

const LoginContent = (props) => {
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loginErr, setLoginErr] = useState('');

  const fetchUsernameFromAPI = async () => {
    try {
      // Make the API call to get the username
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch(BACKEND_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({ email, password }), // Convert the data to JSON format
      });
      const data = await response.json();

      if (!response.ok) {
        // console.log(data.error);
        setLoginErr(data.error);
        return;
      }

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set('token', data.token, { expires: 7 }); // Set the token to expire in 7 days
      Cookies.set('username', data.username, { expires: 7 });
      Cookies.set('first_time_login', data.first_time_login, { expires: 7 });
      Cookies.set('signup_complete', data.signup_completed, { expires: 7 });
      window.location.href = '/';
    } catch (error) {
      setLoginErr(error);
      console.error('Error logging in:', error);
    }
  };

  const handleLogin = () => {
    if(emailInputRef.current.value == ''){
      setLoginErr('Email cannot be empty.');
      return;
    } else {
      setLoginErr('');
    }

    if(passwordInputRef.current.value == ''){
      setLoginErr('Password cannot be empty');
      return;
    } else {
      setLoginErr('');
    }
    setLoginErr('');
    fetchUsernameFromAPI();
  };

  useEffect(() => {
    document.body.style.backgroundColor = 'white'; // Set your desired background color here

    return () => {
      document.body.style.backgroundColor = ''; // Reset background color when component unmounts
    };
  }, []);

  return (
    <>
      <div>
        <h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '100%', maxHeight: '100%', }}>
              <img src={logo} style={{ borderRadius: '10px', width: '50px', maxWidth: '100%', maxHeight: '100%' }} />
            </div>&nbsp;
            <div style={{color: 'orange'}}>R/\SO!</div>
          </div>
        </h1>
      </div>
      <div><h3 style={{ color: 'gray' }}>Login To Your Rasoi!</h3></div>
      <hr style={{ color: 'white' }} />
      <div>
        <Card style={{ border: '0' }}>
          <div style={{ padding: '1%' }}>
            <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} type='email' ref={emailInputRef} placeholder="Email" />
          </div>
          <div style={{ padding: '1%' }}>
            <input style={{ width: '90%', padding: '1% 2vw 1%', border: '1px solid gray', borderRadius: '10px' }} ref={passwordInputRef} type='password' placeholder="Password" />
          </div>
          <ErrorMsgBox errorMsg={loginErr} />
          <br />
          <div><small style={{ color: 'gray' }}>Don't have an account? <i style={{ color: 'blue', cursor: 'pointer' }} onClick={props.handleSlideClick}>Create One</i></small></div>
          <hr style={{ color: 'white' }} />
          <div ><button style={{ padding: '1%', width: '30%', backgroundImage: 'linear-gradient(to right, orange , #e7088e)', color: 'white', borderRadius: '15px', border: '0px' }} onClick={handleLogin}>Login</button></div>
        </Card>
        <div>OR</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
            <GoogleOAuthProvider clientId="238627830616-pr2da7gepjeo1qvmuvm9d0eoelug5uko.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={
                  async (credentialResponse) => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded);
                    if (decoded.email_verified != true) {
                      setLoginErr('Google Authentication Failed');
                      return;
                    }
                    try {
                      // Make the API call to get the username
                      const email = decoded.email;
                      const password = decoded.sub;

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
                      Cookies.set('signup_complete', data.signup_completed, { expires: 7 });
                      window.location.href = '/';
                    } catch (error) {
                      setLoginErr('Error logging in.')
                      console.error('Error logging in', error);
                    }
                  }
                }
                onError={() => {
                  console.log('Login Failed');
                  setLoginErr('Login Failed.')
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>

      </div>
    </>
  )
}

export default LoginContent;