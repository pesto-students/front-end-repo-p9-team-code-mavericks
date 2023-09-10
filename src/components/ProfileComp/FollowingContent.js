import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserListViewCard from "../UserListViewCard";
import { useParams } from "react-router-dom";
import ErrorMsgBox from "../ErrorMsgBox";
import { Container } from 'react-bootstrap';
import { BACKEND_URL } from "../../global";
import SearchIcon from '@mui/icons-material/Search';
import '../../css/profile_comp/following_content.css';

const FollowingContent = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [followingsList, setFollowingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();
  const [searchVal, setSearchVal] = useState('');
  const [searchedFollwoingList, setSearchedFollwoingList] = useState({});
  const [inpDivWidth, setInpDivWidth] = useState(20);
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

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
      setSearchedFollwoingList(data.followings);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  const searchFollowings = (e) => {
    console.log(e.target.value);
    setSearchVal(e.target.value);
    setSearchedFollwoingList(followingsList.filter(item => {
      const { username, firstname, lastname } = item;
      return username.startsWith(e.target.value) || firstname.startsWith(e.target.value) || lastname.startsWith(e.target.value);
    }));
  }

  useEffect(() => {
    fetchFollowingsList();
    checkScreenSize();
  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '0.8% 2% 0.8% 2%', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4), 0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <div><i style={{ color: 'blue' }}>{user} / <span>followings</span></i></div>
        <div style={{ alignItems:'flex-end', justifyContent: 'space-between', display: 'flex', width: isMobile?'100%':`${inpDivWidth}%`, transition:'0.6s'}}>
          <span style={{width: 'auto'}}><SearchIcon style={{color:'#e7088e'}} /></span>&nbsp;
          <span style={{width: '100%'}}>
          <input
            value={searchVal}
            onChange={searchFollowings}
            className="search-followings-input"
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
      ) : !searchedFollwoingList || searchedFollwoingList.length === 0 ? (
        !errorMsg ? <p>No followings</p> : <ErrorMsgBox errorMsg={errorMsg} />
      ) :
        <Container>
          {
            searchedFollwoingList.map((user, index) => (
              <UserListViewCard followback={true} key={index} user={user} />
            ))
          }
        </Container>
      }
    </Container>
  );

}

export default FollowingContent;