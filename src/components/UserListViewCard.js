import React, {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import profileImg from '../img/profile_pic.jpg';
import Button from '@mui/material/Button';
import '../css/user_list_view_card.css';
import { BACKEND_URL } from "../global";
import Cookies from "js-cookie";

const UserListViewCard = (props) => {

  const [isFollowing, setIsFollowing] = useState(props.followback);

  const followUser = async() => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/follow/' + props.user.username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      console.log(data.message);
      setIsFollowing(true);
    } catch(err) {
      console.log('Error Ocuured '+err);
    }
  }

  const unfollowUser = async() => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/unfollow/' + props.user.username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      console.log(data.message);
      setIsFollowing(false);
    } catch(err) {
      console.log('Error Ocuured '+err);
    }
  }

  const handleViewUserProfileClick = () => {
    window.location.href = '/profile/' + props.user.username;
  };

  const toggleFollowing = (doIFollow) => {
    if(doIFollow)
      unfollowUser();
    else
      followUser();
  };
  

  return (
      <List>
          <ListItem
            style={{borderRadius:'15px', cursor:'pointer', transition: '0.4s'}}
            className='following-list-item'
          >
            <ListItemAvatar onClick={handleViewUserProfileClick}>
            <Avatar alt="Remy Sharp" src={profileImg} />
            </ListItemAvatar>
            <ListItemText
              primary={props.user.firstname + ' ' +props.user.lastname}
              secondary={<i style={{color:'blue'}}>@{props.user.username}</i>}
              onClick={handleViewUserProfileClick}
            />
            <Button
              className={isFollowing? 'following-button': 'follow-button'}
              variant= {isFollowing? 'outlined': 'contained'}
              onClick={() => {toggleFollowing(isFollowing)}}
              >
              {isFollowing? <span>Following</span>: <span>Follow</span>}
            </Button>
          </ListItem>
            {/* <span>First Name: {props.user.firstname}, Last Name: {props.user.lastname}, Username: {props.user.username} &nbsp;&nbsp; <button onClick={handleViewUserProfileClick}>View</button></span> */}

      </List>
  );
}

export default UserListViewCard;