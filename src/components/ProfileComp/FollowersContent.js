import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "../UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "../ErrorMsgBox";
import { BACKEND_URL } from "../../global";
import { Container } from 'react-bootstrap'

const FollowersContent = () => {

  const [errorMsg, setErrorMsg] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchFollowersList = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(BACKEND_URL + '/users/followers/' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      });

      const data = await response.json();
      if (data.error)
        setErrorMsg(data.error);
      else { }
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
    <Container>
      <div style={{ backgroundColor: 'white', padding: '1%', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4), 0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <i style={{ color: 'blue' }}>{user} / <span>followers</span></i>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : !followersList || followersList.length === 0 ? (
        !errorMsg ? <p>No followers</p> : <ErrorMsgBox errorMsg={errorMsg} />
      ) : (
        <Container>
          {followersList.map((user, index) => (
            <UserListViewCard followback={user.followback ? true : false} key={index} user={user} />
          ))}
        </Container>
      )}
    </Container>
  );
}

export default FollowersContent;