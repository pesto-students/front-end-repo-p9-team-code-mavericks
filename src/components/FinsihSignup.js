import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const FinishSignup = () => {

  const [isMobile, setIsMobile] = useState(false);
  const {username} = useParams();

  const [isGreenVegiesActive, setIsGreenVegiesActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);
  const [isSouthIndianActive, setIsSouthIndianActive] = useState(false);
  const [isStreetFoodActive, setIsStreetFoodActive] = useState(false);
  const [isFranchiseActive, setIsFranchiseActive] = useState(false);
  const [isSweetDishesActive, setIsSweetDishesActive] = useState(false);
  const [isSaladsActive, setIsSaladsActive] = useState(false);

  
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const handleGreenVegiesClick = () => {
    setIsGreenVegiesActive(!isGreenVegiesActive);
  };

  const handleNonVegClick = () => {
    setIsNonVegActive(!isNonVegActive);
  };

  const handleSouthIndianClick = () => {
    setIsSouthIndianActive(!isSouthIndianActive);
  };

  const handleStreetFoodClick = () => {
    setIsStreetFoodActive(!isStreetFoodActive);
  };

  const handleFranchiseClick = () => {
    setIsFranchiseActive(!isFranchiseActive);
  };

  const handleSweetDishesClick = () => {
    setIsSweetDishesActive(!isSweetDishesActive);
  };

  const handleSaladsClick = () => {
    setIsSaladsActive(!isSaladsActive);
  };


  useEffect(()=>{
    checkScreenSize();
  })

  return (
    <>
      <Container style={{ textAlign: 'center', padding: '2% 1% 2% 1%' }}>
        <p style={{ fontSize: '2.5rem', fontFamily: "'Josefin Sans', sans-serif" }}>
          Welcome {username.charAt(0).toUpperCase() + username.slice(1) + '!'}<br></br>
          <span style={{ color: 'orange', fontSize: '1.5rem', fontFamily: "'Delicious Handrawn', cursive" }}>Let's Know more about you ^_^</span>
        </p>
        <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
          <div style={{ color: 'gray' }}>What's your first name and last name?</div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: isMobile?'column': 'row' }}>
            <span style={{ padding: '1%' }}><input type="text" placeholder="First Name" />&nbsp;&nbsp;</span>
            <span style={{ padding: '1%' }}><input type="text" placeholder="Last Name" /></span>
          </div>
        </div>
        <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
          <div style={{ color: 'gray' }}>What's your email id?</div>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ padding: '1%', width: '100%' }}><input type="email" placeholder="Email"/>&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif", textAlign:'center', justifyContent:'center'}}>
          <div style={{ color: 'gray'}}>Let's get your favorite food types!</div>

          <div style={{display:'flex', alignItems: 'center', flexWrap:'wrap', justifyContent:'center', width: isMobile? '100%': '50%', padding: '1%'}}>
            <div
              onClick={handleGreenVegiesClick}
              style={
                {
                  boxShadow: isGreenVegiesActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isGreenVegiesActive?'white': 'orange',
                  backgroundColor: isGreenVegiesActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isGreenVegiesActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Veg
            </div>&nbsp;&nbsp;

            <div
              onClick={handleNonVegClick}
              style={
                {
                  boxShadow: isNonVegActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isNonVegActive?'white': 'orange',
                  backgroundColor: isNonVegActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isNonVegActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Non Veg
            </div>&nbsp;&nbsp;

            <div
              onClick={handleSouthIndianClick}
              style={
                {
                  boxShadow: isSouthIndianActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isSouthIndianActive?'white': 'orange',
                  backgroundColor: isSouthIndianActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isSouthIndianActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              South Indian
            </div>&nbsp;&nbsp;

            <div
              onClick={handleStreetFoodClick}
              style={
                {
                  boxShadow: isStreetFoodActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isStreetFoodActive?'white': 'orange',
                  backgroundColor: isStreetFoodActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isStreetFoodActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Steet Food
            </div>&nbsp;&nbsp;
          
            <div
              onClick={handleFranchiseClick}
              style={
                {
                  boxShadow: isFranchiseActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isFranchiseActive?'white': 'orange',
                  backgroundColor: isFranchiseActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isFranchiseActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Franchise Food
            </div>&nbsp;&nbsp;
          
            <div
              onClick={handleSweetDishesClick}
              style={
                {
                  boxShadow: isSweetDishesActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isSweetDishesActive?'white': 'orange',
                  backgroundColor: isSweetDishesActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isSweetDishesActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Sweet Dishes
            </div>&nbsp;&nbsp; 

            <div
              onClick={handleSaladsClick}
              style={
                {
                  boxShadow: isSaladsActive?'0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)': 'none',
                  borderRadius: '15px',
                  color: isSaladsActive?'white': 'orange',
                  backgroundColor: isSaladsActive?'orange': 'white',
                  padding: isMobile?'2%': '1% 2%',
                  border: isSaladsActive?'none':'1px solid orange',
                  transition: '0.5s',
                }
              }
            >
              Salads
            </div>&nbsp;&nbsp;                        
          </div>
        </div>
      </Container>
    </>
  )
}

export default FinishSignup;