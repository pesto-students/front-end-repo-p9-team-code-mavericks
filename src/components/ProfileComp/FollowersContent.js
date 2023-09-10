import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "../UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "../ErrorMsgBox";
import { BACKEND_URL } from "../../global";
import { Container } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import '../../css/profile_comp/followers_content.css';


const FollowersContent = () => {

  const [errorMsg, setErrorMsg] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchedFollwersList, setSearchedFollwersList] = useState({});
  const [inpDivWidth, setInpDivWidth] = useState(20);


  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

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
      setSearchedFollwersList(data.followers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  const searchFollowers = (e) => {
    console.log(e.target.value);
    setSearchVal(e.target.value);
    setSearchedFollwersList(followersList.filter(item => {
      const { username, firstname, lastname } = item;
      return username.startsWith(e.target.value) || firstname.startsWith(e.target.value) || lastname.startsWith(e.target.value);
    }));
  }

  useEffect(() => {
    fetchFollowersList();
    checkScreenSize();
  }, [])

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '0.8% 2% 0.8% 2%', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4), 0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <div><i style={{ color: 'blue' }}>{user} / <span>followers</span></i></div>
        <div style={{ alignItems:'flex-end', justifyContent: 'space-between', display: 'flex', width: isMobile?'100%':`${inpDivWidth}%`, transition:'0.6s'}}>
          <span style={{width: 'auto'}}><SearchIcon style={{color:'#e7088e'}} /></span>&nbsp;
          <span style={{width: '100%'}}>
          <input
            value={searchVal}
            onChange={searchFollowers}
            className="search-followers-input"
            placeholder="Search..."
            onFocus={(e) => {setInpDivWidth(35)}}
            onBlur = {(e) => {setInpDivWidth(20)}}
            style={{width: '100%'}}
          />
        </span>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : !searchedFollwersList || searchedFollwersList.length === 0 ? (
        !errorMsg ? <p>No followers</p> : <ErrorMsgBox errorMsg={errorMsg} />
      ) : (
        <Container>
          {searchedFollwersList.map((user, index) => (
            <UserListViewCard followback={user.followback ? true : false} key={index} user={user} />
          ))}
        </Container>
      )}
    </Container>
  );
}

export default FollowersContent;