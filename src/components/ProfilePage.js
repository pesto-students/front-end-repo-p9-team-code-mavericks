import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import '../css/profile_page.css';
import ProfileInfo from '../components/ProfileComp/ProfileInfo';
import MobileNavbar from '../components/MobileNavbar';
import EditProf from "./ProfileComp/EditProf";
import FollowersContent from "./ProfileComp/FollowersContent";
import FollowingContent from "./ProfileComp/FollowingContent";
import PostedRecipes from "./ProfileComp/PostedRecipes";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState('profInfo');
  const [activeComponent, setActiveComponent] = useState(<ProfileInfo />);
  const [isLoading, setIsLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const compMap = {
    profInfo: <ProfileInfo />,
    editProf: <EditProf />,
    postedRecipes: <PostedRecipes />,
    followers: <FollowersContent />,
    following: <FollowingContent />,
  }

  const username = useSelector((store) => store.username.username);
  const { user } = useParams();

  const viewingUsername = user;


  const handleFollowersClick = () => {
    window.location.href = '/followers/' + user;
  }

  const handleFollowingClick = () => {
    window.location.href = '/followings/' + user;
  }

  const handleBookmarkClick = () => {
    window.location.href = '/bookmarks';
  }

  const handleActivityClick = () => {
    console.log("Activity clicked");
  }

  const handleEditProfileClick = () => {
    console.log("Edit Profile clicked");
  }

  const handlePrivacySettingsClick = () => {
    console.log("Privacy Settings clicked");
  }

  const handleSideNavLinkClick = (val) => {
    setActiveLink(val);
    setActiveComponent(compMap[val]);
    handleClose();
  }

  useEffect(() => {
    checkScreenSize();
  }, []);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} style={{ color: 'white', backgroundColor: 'orange' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>R/\SO!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ width: 'auto', height: 'auto', backgroundColor: 'orange'}}>
            <div style={{ flexDirection: 'column', display: 'flex', padding: '5%' }}>
              <div
                className={activeLink == 'profInfo' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                onClick={() => { handleSideNavLinkClick('profInfo') }}
              >
                <div >PROFILE INFO</div>
              </div>

              <div
                className={activeLink == 'postedRecipes' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                onClick={() => { handleSideNavLinkClick('postedRecipes') }}
              >
                <div >RECIPES</div>
              </div>

              <div
                className={activeLink == 'followers' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                onClick={() => { handleSideNavLinkClick('followers') }}
              >
                <div >FOLLOWERS</div>
              </div>

              <div
                className={activeLink == 'following' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                onClick={() => { handleSideNavLinkClick('following') }}
              >
                <div >FOLLOWING</div>
              </div>

              <div
                style={{display: user != Cookies.get('username')? 'none': 'none'}}
                className={activeLink == 'editProf' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                onClick={() => { handleSideNavLinkClick('editProf') }}
              >
                <div >EDIT PROFILE</div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {!isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <>
          {isMobile ? <MobileNavbar /> : <></>}
          <div style={{ display: 'flex', position: 'relative'}}>
            <div style={{ display: isMobile ? 'none' : 'block', width: '18%', height: '100vh', backgroundColor: 'orange', position: 'fixed' }}>
              <div style={{ flexDirection: 'column', display: 'flex', padding: '5%' }}>
                <div
                  className={activeLink == 'profInfo' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('profInfo') }}
                >
                  <div style={{ marginLeft: '10%' }}>PROFILE INFO</div>
                </div>

                <div
                  className={activeLink == 'postedRecipes' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('postedRecipes') }}
                >
                  <div style={{ marginLeft: '10%' }}>RECIPES</div>
                </div>

                <div
                  className={activeLink == 'followers' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('followers') }}
                >
                  <div style={{ marginLeft: '10%' }}>FOLLOWERS</div>
                </div>

                <div
                  className={activeLink == 'following' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('following') }}
                >
                  <div style={{ marginLeft: '10%' }}>FOLLOWING</div>
                </div>

                <div
                  style={{display: user != Cookies.get('username')? 'none': 'none'}}
                  className={activeLink == 'editProf' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('editProf') }}
                >
                  <div style={{ marginLeft: '10%' }}>EDIT PROFILE</div>
                </div>

              </div>
            </div>
            <div style={{ marginLeft: isMobile ? '0%' : '18%', width: '100%', padding: '1%' }}>
              <div style={{ display: isMobile ? 'block' : 'none', position: 'fixed', top: '10%', zIndex: '101', left: '0' }}>
                <>
                  <Button onClick={handleShow} className="me-2" style={{ zIndex: '101', backgroundColor:'orange', marginTop: '20%', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', border: '0px solid black', boxShadow: '0 4px 8px 0 rgba(255, 165, 0, 0.3), 0 6px 20px 0 rgba(255, 165, 0, 0.19)'}}>
                    <ArrowForwardIosIcon />
                  </Button>
                </>
              </div>
              {activeComponent}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfilePage;