import React from 'react';
import profileImg from '../../img/default_profile2.png';
import settingsIcon from '../../img/icons8-settings.svg';
import '../../css/profile_comp/profile_info.css';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { BACKEND_URL } from '../../global';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

import { useParams } from "react-router-dom";

export default function ProfilePage() {

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();
  const [isFollowingVisible, setIsFollowingVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isFollowersVisible, setIsFollowersVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [followersCnt, setFollowersCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [postsCnt, setPostsCnt] = useState(0);
  const [bookmarksCnt, setBookmarksCnt] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);


  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/username/' + user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });
      const data = await response.json();
      setUserDetails(data.user_details);
      setIsFollowersVisible(!Boolean(data.user_details.followers_hidden));
      setIsFollowingVisible(!Boolean(data.user_details.following_hidden));
      setIsEmailVisible(Boolean(data.user_details.email || false));
      setIsContactVisible(Boolean(data.user_details.contact || false));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  const fetchNumbers = async () => {
    // Retrieve and set followers count.
    try {
      setIsLoading(true);
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/' + user + '/count/followers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      setFollowersCnt(data.followers_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error counting followers:', error);
    }

    // Retrieve and set followings.
    try {
      setIsLoading(true);
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/' + user + '/count/following', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      setFollowingCnt(data.following_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error counting followings:', error);
    }

    // Retrieve and set number of posts.
    try {
      setIsLoading(true);
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/' + user + '/count/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      setPostsCnt(data.posts_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error counting posts:', error);
    }

    // Retrieve number of bookmarks
    try {
      setIsLoading(true);
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/' + user + '/count/bookmarks', {
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
      setBookmarksCnt(data.bookmarks_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error counting bookmarks:', error);
    }

  };

  const followingVisibilityToggle = () => {
    console.log("Toggle following")
    setIsFollowingVisible(!isFollowingVisible);
  }

  const emailVisibilityToggle = () => {
    console.log("Toggle email");
    setIsEmailVisible(!isEmailVisible);
  }

  const followersVisibilityToggle = () => {
    console.log("Toggle Followers");
    setIsFollowersVisible(!isFollowersVisible);
  }

  const contactVisibilityToggle = () => {
    console.log("Toggle contact");
    setIsContactVisible(!isContactVisible);
  }

  const getIsFollowing = async () => {

    try {
      setIsLoading(true);
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/isfollowing/'+user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      if (!response.ok) {
        console.log("Error occured : " + data.error);
        return;
      }

      const data = await response.json();
      setIsFollowing(Boolean(data.is_following));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error getting if following user of not:', error);
    }
  }

  const followUser = async() => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/follow/' + user, {
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

      const response = await fetch(BACKEND_URL + '/users/unfollow/'+user, {
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

  useEffect(() => {
    fetchUserDetails();
    fetchNumbers();
    getIsFollowing();
  }, []);



  return (
    <section>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profileImg}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  fluid
                /><br></br><br></br>
                <p className="text-muted mb-1">
                  <b style={{ color: 'gray', fontSize: '254x' }}>
                    {!isLoading ? userDetails.firstname + ' ' + userDetails.lastname : <>Loading</>}
                  </b>
                </p>
                <div className="d-flex justify-content-center mb-2">
                  {
                    Cookies.get('username') == userDetails.username ? <></ >:
                      (isFollowing)? <Button onClick={unfollowUser} style={{backgroundColor:'orange', boxShadow: '0 4px 8px 0 rgba(255, 165, 0, 0.3), 0 6px 20px 0 rgba(255, 165, 0, 0.19)', border: '0px solid black'}}>Unfollow</Button> :<Button style={{backgroundColor:'orange', boxShadow: '0 4px 8px 0 rgba(255, 165, 0, 0.3), 0 6px 20px 0 rgba(255, 165, 0, 0.19)', border: '0px solid black'}} onClick={followUser}>Follow</Button>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: 'gray' }}>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><i style={{ color: 'blue' }}>{userDetails.username}</i></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: 'gray' }}>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><i style={{ color: 'blue' }}>{userDetails.email}</i></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{ color: 'gray' }}>Contact</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><i style={{ color: 'blue' }}>{userDetails.contact}</i></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <div style={{ paddingTop: '2%', paddingBottom: '2%' }}>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>{followersCnt}</b></span>
                        </div>
                        <div>
                          <small style={{ color: 'gray' }}>Followers</small>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>{followingCnt}</b></span>
                        </div>
                        <div>
                          <small style={{ color: 'gray' }}>Following</small>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
            <div>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>{postsCnt}</b></span>
                        </div>
                        <div>
                          <small style={{ color: 'gray' }}>Posts</small>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>{bookmarksCnt}</b></span>
                        </div>
                        <div>
                          <small style={{ color: 'gray' }}>Bookmarks</small>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}