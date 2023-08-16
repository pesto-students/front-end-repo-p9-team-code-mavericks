import React from "react";
import homeIconImg from '../img/icons8-home-64.png';
import '../css/mobile_nav.css';

const MobileNav = () => {
  return (
    <>
      <div className='mobile-nav-flex-div'>
        <div className="home-icon">
          <img src={homeIconImg} style={{width:'100%', height:'100%', maxHeight:'100%', maxWidth:'100%', objectFit:'contain'}} />
        </div>
        <div className="bookmark-icon"></div>
        <div className="add-icon"></div>
        <div className="profile-icon"></div>
        <div className="logout-icon"></div>
      </div>
    </>
  )
}

export default MobileNav;