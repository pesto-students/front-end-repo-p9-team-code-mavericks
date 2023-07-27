import { useDispatch } from 'react-redux';
import { login } from '../store/usernameSlice';
import React, {useRef} from 'react';
import Cookies from 'js-cookie';

const LoginPage = () =>{

  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set('token', data.token, { expires: 7 }); // Set the token to expire in 7 days
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  
  const handleLogin = () => {
    fetchUsernameFromAPI();
  };
  
  return (
    <>
      <input type='email' ref={emailInputRef} placeholder="example@domain.com"/>
      <input ref={passwordInputRef} type='password' />
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default LoginPage;