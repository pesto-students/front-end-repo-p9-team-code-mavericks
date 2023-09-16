import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usernameSlice';
import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import HomePage from './HomePage';
import '../css/login_signup.css';
import { Button, Card, Container } from 'react-bootstrap';
import LoginContent from './LoginContent';
import ErrorMsgBox from './ErrorMsgBox';
import SignupContent from './SignupContent';

const LoginSignupPage = () => {

  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get('username');
  const [isLoginFormActive, setIsLoginFormActive] = useState(true);

  const handleSlideClick = () => {
    setIsLoginFormActive(!isLoginFormActive);
  };



  return (
    <>
      {
        cookieUserName ?
          <HomePage />
          :
          <>
            <Container className='login-signup-container'>
              <div className='login-signup-flexbox'>
                <div className={isLoginFormActive ? "login-signup-div active" : "login-signup-div"}>
                {isLoginFormActive?<LoginContent handleSlideClick={handleSlideClick}/>:<SignupContent handleSlideClick={handleSlideClick}/>}
                </div>
                <div className={
                  isLoginFormActive ? "wallpaper-div active2 wallpaper-img2" : "wallpaper-div wallpaper-img1"
                }>
                  <div style={{ backgroundImage: 'linear-gradient(to right, orange, #e7088e)', position: 'absolute', width: '100%', height: '80vh', opacity: '40%', zIndex: '2', borderRadius: '13px' }}></div>
                </div>
              </div>
            </Container>
          </>
      }
    </>
  )
}

export default LoginSignupPage;