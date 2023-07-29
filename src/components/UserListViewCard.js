import React from "react";

const UserListViewCard = (props) => {

  const handleViewUserProfileClick = () => {
    console.log("View clicked");
    window.location.href = '/profile/'+props.user.username;
  };

  return (
    <li>
      <p>First Name: {props.user.firstname}, Last Name: {props.user.lastname}, Username: {props.user.username} &nbsp;&nbsp; <button onClick={handleViewUserProfileClick}>View</button></p>
    </li>
  );
}

export default UserListViewCard;