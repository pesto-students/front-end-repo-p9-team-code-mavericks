import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import '../css/profile_page.css';
import ProfileInfo from '../components/ProfileComp/ProfileInfo';

const ProfilePage = () => {
  const username = useSelector((store) => store.username.username);
  const { user } = useParams();

  const viewingUsername = user;
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/username/' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setUserDetails(data.user_details);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {isLoading ? (
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
            <div style={{width: '18%', height: '100vh', backgroundColor: 'orange', position: 'fixed'}}>
              <div style={{ flexDirection: 'column', display: 'flex', padding: '5%'}}>
                <div className="profile-side-nav-links"><div style={{marginLeft: '10%'}}>PROFILE INFO</div></div>
                <div className="profile-side-nav-links"><div style={{marginLeft: '10%'}}>ACTIVITIES</div></div>
                <div className="profile-side-nav-links"><div style={{marginLeft: '10%'}}>FOLLOWERS</div></div>
                <div className="profile-side-nav-links"><div style={{marginLeft: '10%'}}>FOLLOWING</div></div>
                <div className="profile-side-nav-links"><div style={{marginLeft: '10%'}}>EDIT PROFILE</div></div>
              </div>
            </div>
            <div style={{ border: '1px solid black', width: '82%', backgroundColor: 'blue', marginLeft: '18%' }}>
              <ProfileInfo />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfilePage;