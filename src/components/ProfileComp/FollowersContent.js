import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "../UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "../ErrorMsgBox";

const FollowersContent = () => {

  const [errorMsg, setErrorMsg] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useParams();

  const fetchFollowersList = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(process.env.REACT_APP_WEBSITE_URL + '/users/followers/'+user, {
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
        setFollowersList(data.followers);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchFollowersList();
  }, [])

  return (
    <>
      <h2>Followers:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : !followersList || followersList.length === 0? (
        !errorMsg? <p>No followers</p>: <ErrorMsgBox errorMsg={errorMsg}/>
      ) : (
        <ul>
          {followersList.map((user, index) => (
            <UserListViewCard key={index} user={user} />
          ))}
        </ul>
      )}
    </>
  );
}

export default FollowersContent;