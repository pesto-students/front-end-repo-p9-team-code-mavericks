import React from 'react';
import profileImg from '../../img/profile_pic.jpg';
import settingsIcon from '../../img/icons8-settings.svg';
import '../../css/profile_comp/profile_info.css';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

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

import waveImg from '../../img/ocean-wave3.svg';

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
  

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/username/' + user, {
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
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/users/'+user+'/count/followers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
      });

      if(!response.ok){
        console.log("Error occured : "+data.error);
      }

      const data = await response.json();
      setFollowersCnt(data.followers_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
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

  useEffect(() => {
    fetchUserDetails();
    fetchNumbers();
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
                    Cookies.get('username') == userDetails.username?
                      <MDBBtn>Unfollow</MDBBtn> :
                      <MDBBtn>Follow</MDBBtn>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>

            {Cookies.get('username') == user ?
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className='visibility-settings-card'>
                  <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <div style={{ fontSize: '5vh:', color: 'gray' }}>Visibility Settings</div>
                      <div className='settings-icon' style={{ backgroundImage: `url(${settingsIcon})` }}>
                      </div>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2%', paddingTop: '1%' }}>
                      <div style={{ color: 'orange' }}>Followers</div>
                      <div>
                        <Form>
                          <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            checked={isFollowersVisible}
                            onChange={followersVisibilityToggle}
                          /></Form>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2%', paddingTop: '1%' }}>
                      <div style={{ color: 'orange' }}>Following</div>
                      <div>
                        <Form>
                          <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            checked={isFollowingVisible}
                            onChange={followingVisibilityToggle}
                          /></Form>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2%', paddingTop: '1%' }}>
                      <div style={{ color: 'orange' }}>Email</div>
                      <div><Form><Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        checked={isEmailVisible}
                        onChange={emailVisibilityToggle}
                      /></Form></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2%', paddingTop: '1%' }}>
                      <div style={{ color: 'orange' }}>Contact</div>
                      <div><Form><Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        checked={isContactVisible}
                        onChange={contactVisibilityToggle}
                      /></Form></div>
                    </div>
                  </div>

                </MDBCardBody>
              </MDBCard> :
              <></>
            }
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
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>149</b></span>
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
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>122</b></span>
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
                          <span style={{ color: 'orange', fontSize: '5vh' }}><b>566</b></span>
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