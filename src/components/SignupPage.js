import { useDispatch } from 'react-redux';
import { login } from '../store/usernameSlice';
import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import ErrorMsgBox from './ErrorMsgBox';

const SignupPage = () => {

  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const contactInputRef = useRef(null);
  const lastnameInputRef = useRef(null);
  const firstnameInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const usernameInputRef = useRef(null);


  const fetchUsernameFromAPI = async () => {

    try {
      // Make the API call to get the username
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
      const lastname = lastnameInputRef.current.value;
      const firstname = firstnameInputRef.current.value;
      const contact = contactInputRef.current.value;
      const confirmPassword = confirmPasswordInputRef.current.value;
      const username = usernameInputRef.current.value;

      if(!firstname || !lastname || !email || !password || !contact || !confirmPassword || !username){
        setErrorMsg('Some of required fields are not provided');
        return;
      }

      if (confirmPassword != password) {
        setErrorMsg('Password and confirm password not matched');
        return;
      }

      const response = await fetch('http://127.0.0.1:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({ email: email, password: password, contact: contact, firstname: firstname, lastname: lastname, username: username }), // Convert the data to JSON format
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg('Error Creating a user:'+data.error);
        return;
      }

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set('token', data.token, { expires: 7 }); // Set the token to expire in 7 days
      window.location.href = '/';
    } catch (error) {
      setErrorMsg('Error fetching username:' + error);
      console.error('Error fetching username:', error);
    }
  };


  const handleSignup = () => {
    fetchUsernameFromAPI();
  };

  return (
    <>
      <input type='email' ref={emailInputRef} placeholder="example@domain.com" naem='userEmail' required/>
      <input ref={passwordInputRef} type='password' name='userPass' required/>
      <input ref={confirmPasswordInputRef} type='password' name='confirmPass' required/>
      <input ref={firstnameInputRef} type='text' name='firsname' placeholder='firstname' required/>
      <input ref={lastnameInputRef} type='text' name='lastname' placeholder='lastname' required/>
      <input ref={contactInputRef} type='text' name='contact' placeholder='contact' />
      <input ref={usernameInputRef} type='text' name='username' placeholder='Username' required/>
      {
        errorMsg?
        <ErrorMsgBox errorMsg={errorMsg} />:
        <></>
      }
      <button onClick={handleSignup}>Sign Up</button>
    </>
  )
}

export default SignupPage;