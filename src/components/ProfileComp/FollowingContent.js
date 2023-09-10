import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "../UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "../ErrorMsgBox";
import { Container } from 'react-bootstrap';
import { BACKEND_URL } from "../../global";

const FollowingContent = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [followingsList, setFollowingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchFollowingsList = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(BACKEND_URL + '/users/followings/' + user, {
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
    <Container>
      <div style={{ backgroundColor: 'white', padding: '1%', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4), 0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <i style={{ color: 'blue' }}>{user} / <span>followings</span></i>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : !followingsList || followingsList.length === 0 ? (
        !errorMsg ? <p>No followings</p> : <ErrorMsgBox errorMsg={errorMsg} />
      ) :
        <Container>
          {followingsList.map((user, index) => (
            <UserListViewCard followback={true} key={index} user={user} />
          ))
          }
        </Container>
      }
    </Container>
  );

}

export default FollowingContent;