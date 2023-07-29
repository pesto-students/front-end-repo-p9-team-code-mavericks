import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "./UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "./ErrorMsgBox";

const Followings = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [followingsList, setFollowingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {ofuser} = useParams();

  const fetchFollowingsList = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://127.0.0.1:3000/users/followings/'+ofuser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      });
      
      const data = await response.json();
      if(data.error)
        setErrorMsg(data.error);
      else{}
        setFollowingsList(data.followings);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchFollowingsList();
  }, [])

  return (
    <>
      <h2>Followings:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : !followingsList || followingsList.length === 0? (
        !errorMsg? <p>No followings</p>: <ErrorMsgBox errorMsg={errorMsg}/>
      ) : (
        <ul>
          {followingsList.map((user, index) => (
            <UserListViewCard key={index} user={user} />
          ))}
        </ul>
      )}
    </>
  );

}

export default Followings;