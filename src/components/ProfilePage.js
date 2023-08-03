import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const ProfilePage = () => {
  const username = useSelector((store) => store.username.username);
  const { user } = useParams();

  const viewingUsername = user;
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/username/'+user, {
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
    window.location.href = '/followers/'+user;
  }

  const handleFollowingClick = () => {
    window.location.href = '/followings/'+user;
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
  },[]);

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <>
          Welcome to your profile {viewingUsername}!
          Here are your details:
          <ul>
          {Object.entries(userDetails).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {value}
          </li>
        ))}
          </ul>
          <button onClick={handleFollowersClick}>Followers</button>
          <button onClick={handleFollowingClick}>Following</button>
          {
            Cookies.get('username') == user?
            (
              <>
                <button onClick={handleBookmarkClick}>Bookmarks</button>
                <button onClick={handleEditProfileClick}>Edit Profile</button>
                <button onClick={handlePrivacySettingsClick}>Privacy Settings</button>
                <button onClick={handleActivityClick}>Activity</button>
              </>
            ):
            (<></>)
          }
          
        </>
      )}
    </>
  )
}

export default ProfilePage;