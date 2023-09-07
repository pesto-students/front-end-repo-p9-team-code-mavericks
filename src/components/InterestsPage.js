import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import "../css/interests_selector.css";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../global";

const InterestsPage = () => {
  const [isGreenVegiesActive, setIsGreenVegiesActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);
  const [isSouthIndianActive, setIsSouthIndianActive] = useState(false);
  const [isStreetFoodActive, setIsStreetFoodActive] = useState(false);
  const [isFranchiseActive, setIsFranchiseActive] = useState(false);
  const [isSweetDishesActive, setIsSweetDishesActive] = useState(false);
  const [isSaladsActive, setIsSaladsActive] = useState(false);
  
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

  const handleSubmitClick = async() => {

    let interestsArray = [];
    if(isGreenVegiesActive)
      interestsArray.push('green vegies');
    if(isNonVegActive)
      interestsArray.push('non veg');
    if(isSouthIndianActive)
      interestsArray.push('south indian');
    if(isStreetFoodActive)
      interestsArray.push('street food');
    if(isFranchiseActive)
      interestsArray.push('franchise');
    if(isSweetDishesActive)
      interestsArray.push('sweet dishes');
    if(isSaladsActive)
      interestsArray.push('salads');

    try {
      const url = BACKEND_URL + '/users/intrests';
      const token = Cookies.get('token');

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({ interests: interestsArray}),
      });

      if (!response.ok) {
        console.log("Failed to skip:");
      }

      const data = await response.json();

      Cookies.set('first_time_login', false, {expires: 7});
      console.log('User first_time_login set to false successfully:', data);
      window.location.href = "/";
    } catch (err) {
      console.error('Error updating user:', err);
    }

  }

  return (
    <>
      <h3>Let us know you a little.</h3>
      <p>Provide your interests here.</p>
      <p><b>Select Categories:</b></p>
      <div className={isGreenVegiesActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleGreenVegiesClick}>
        Vegies
      </div>
      <div className={isNonVegActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleNonVegClick}>
        Non-Veg
      </div>
      <div className={isSouthIndianActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleSouthIndianClick}>
        South Indian
      </div>
      <div className={isStreetFoodActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleStreetFoodClick}>
        Street Food
      </div>
      <div className={isFranchiseActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleFranchiseClick}>
        Franchise
      </div>
      <div className={isSweetDishesActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleSweetDishesClick}>
        Sweet Dishes
      </div>
      <div className={isSaladsActive ? 'checked-selector' : 'unchecked-selector'} onClick={handleSaladsClick}>
        Salads
      </div>
      <div>
        <Button variant="success" onClick={handleSubmitClick}>Submit</Button>
      </div>
    </>
  )
};

export default InterestsPage;