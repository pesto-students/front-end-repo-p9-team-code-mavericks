import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const username = useSelector((store) => store.username.username);
  const cookieUserName = Cookies.get('username');
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/getloggedinuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setUserDetails(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  },[]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          Welcome to your profile {cookieUserName}!
          Here are your details:
          <ol>
          <li>Username: {userDetails.user_details.username}</li>
          <li>First Name: {userDetails.user_details.firstname}</li>
          <li>Last Name: {userDetails.user_details.lastname}</li>
          <li>Contact: {userDetails.user_details.contact}</li>
          <li>Email: {userDetails.user_details.email}</li>
          </ol>
          
        </>
      )}
    </>
  )
}

export default ProfilePage;