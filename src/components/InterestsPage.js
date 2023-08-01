import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import "../css/interests_selector.css";
import { async } from "q";

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

  const handleSkipClick = async() => {
    // Some code;
  }

  const handleSubmitClick = async() => {
    // Some code;
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
        <Button variant="danger" onClick={handleSkipClick}>Skip</Button>
        <Button variant="success" onClick={handleSubmitClick}>Submit</Button>
      </div>
    </>
  )
};

export default InterestsPage;