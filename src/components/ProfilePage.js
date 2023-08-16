import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import '../css/profile_page.css';
import ProfileInfo from '../components/ProfileComp/ProfileInfo';

import EditProf from "./ProfileComp/EditProf";
import FollowersContent from "./ProfileComp/FollowersContent";
import FollowingContent from "./ProfileComp/FollowingContent";
import Activities from "./ProfileComp/Activities";

const ProfilePage = () => {
  const [activeLink, setActiveLink] = useState('profInfo');
  const [activeComponent, setActiveComponent] = useState(<ProfileInfo />);
  const [isLoading, setIsLoading] = useState(true);

  const compMap = {
    profInfo: <ProfileInfo />,
    editProf: <EditProf />,
    activities: <Activities />,
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
  }



  return (
    <>
      {!isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        // <>
        //   Welcome to your profile {viewingUsername}!
        //   Here are your details:
        //   <ul>
        //   {Object.entries(userDetails).map(([key, value]) => (
        //   <li key={key}>
        //     <strong>{key}: </strong>
        //     {value}
        //   </li>
        // ))}
        //   </ul>
        //   <button onClick={handleFollowersClick}>Followers</button>
        //   <button onClick={handleFollowingClick}>Following</button>
        //   {
        //     Cookies.get('username') == user?
        //     (
        //       <>
        //         <button onClick={handleBookmarkClick}>Bookmarks</button>
        //         <button onClick={handleEditProfileClick}>Edit Profile</button>
        //         <button onClick={handlePrivacySettingsClick}>Privacy Settings</button>
        //         <button onClick={handleActivityClick}>Activity</button>
        //       </>
        //     ):
        //     (<></>)
        //   }

        // </>
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '18%', height: '100vh', backgroundColor: 'orange', position: 'fixed' }}>
              <div style={{ flexDirection: 'column', display: 'flex', padding: '5%' }}>
                <div
                  className={activeLink == 'profInfo' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('profInfo') }}
                >
                  <div style={{ marginLeft: '10%' }}>PROFILE INFO</div>
                </div>

                <div
                  className={activeLink == 'activities' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('activities') }}
                >
                  <div style={{ marginLeft: '10%' }}>ACTIVITIES</div>
                </div>

                <div
                  className={activeLink == 'followers' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('followers') }}
                >
                  <div style={{ marginLeft: '10%' }}>FOLLOWERS</div>
                </div>

                <div
                  className={activeLink == 'editProf' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('editProf') }}
                >
                  <div style={{ marginLeft: '10%' }}>EDIT PROFILE</div>
                </div>

                <div
                  className={activeLink == 'following' ? 'profile-side-nav-link-active' : 'profile-side-nav-links'}
                  onClick={() => { handleSideNavLinkClick('following') }}
                >
                  <div style={{ marginLeft: '10%' }}>FOLLOWING</div>
                </div>

              </div>
            </div>
            <div style={{ marginLeft: '18%', width: '100%', padding: '1%'}}>
              {activeComponent}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfilePage;