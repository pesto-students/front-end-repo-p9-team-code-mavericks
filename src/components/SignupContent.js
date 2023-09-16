import React, {useEffect} from "react";
import '../css/login_signup.css';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usernameSlice';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { BACKEND_URL } from "../global";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import ErrorMsgBox from "./ErrorMsgBox";
import logo from '../img/rasoi_small_logo.png';

const SignupContent = (props) => {
  const dispatch = useDispatch();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [signUpErr, setSignUpErr] = useState('');

  const signupUser = async () => {
    try {
      // Make the API call to get the username
      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch(BACKEND_URL + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({ username: username, password: password, isGoogleLogin: false }), // Convert the data to JSON format
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        setSignUpErr(data.error);
        return;
      }
      console.log(data);
      if (signUpErr != '')
        window.location.href = '/getyoustarted/' + usernameInputRef.current.value;

    } catch (err) {
      console.error('Error fetching username:', err);
      setSignUpErr(err);
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
      setSignUpErr('Username cannot be empty');
      return;
    }
    else {
      usernameInputRef.current.style.border = '1px solid gray';
      setSignUpErr('');
    }

    if (passwordInputRef.current.value == "") {
      usernameInputRef.current.style.border = '1px solid gray';
      passwordInputRef.current.style.border = '1px solid red';
      confirmPasswordInputRef.current.style.border = '1px solid gray';
      setSignUpErr('Password cannot be empty.');
      return;
    }
    else {
      passwordInputRef.current.style.border = '1px solid gray';
      setSignUpErr('');
    }

    if (confirmPasswordInputRef.current.value == "") {
      usernameInputRef.current.style.border = '1px solid gray';
      passwordInputRef.current.style.border = '1px solid gray';
      confirmPasswordInputRef.current.style.border = '1px solid red';
      setSignUpErr('Confirm password cannot be empty.');
      return;
    }
    else {
      confirmPasswordInputRef.current.style.border = '1px solid gray';
      setSignUpErr('');
    }

    if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      confirmPasswordInputRef.current.style.border = '1px solid red';
      passwordInputRef.current.style.border = '1px solid red';
      usernameInputRef.current.style.border = '1px solid gray';
      setSignUpErr("Password and confirm password didn't matched");
      return;
    }
    else {
      setSignUpErr('')
    }

    signupUser();
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
        <div>{signUpErr ? <ErrorMsgBox errorMsg={signUpErr} /> : <></>}</div>
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
              onSuccess={
                async (credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                  if(decoded.email_verified != true){
                    setSignUpErr('Google Authentication Failed');
                    return;
                  }

                  try {
                    // Make the API call to get the username
                    const email = decoded.email;
                    const username = email.match(/^([^@]+)/)[1];
                    const password = decoded.sub;
                    const firstname = decoded.given_name;
                    const lastname = decoded.family_name;
                    const isGoogleLogin = true;

                    const response = await fetch(BACKEND_URL + '/signup', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json', // Specify that you are sending JSON data
                      },
                      body: JSON.stringify({ username: username, password: password, isGoogleLogin: isGoogleLogin }), // Convert the data to JSON format
                    });
                    const data = await response.json();

                    if (!response.ok) {
                      console.log(data.error);
                      setSignUpErr(JSON.stringify(data.error));
                      return;
                    }
                    console.log(data);
                    window.location.href = '/getyoustarted/' + username + '/' + email + '/' + firstname + '/' + lastname;

                  } catch (err) {
                    console.error('Error fetching username:', err);
                    setSignUpErr(JSON.stringify(err));
                  }
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