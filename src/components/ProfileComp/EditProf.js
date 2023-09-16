import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BACKEND_URL } from "../../global";
import Cookies from "js-cookie";
import TextField from '@mui/material/TextField';

import {
  MDBCol,
  MDBRow,

} from 'mdb-react-ui-kit';
import { Container } from "react-bootstrap";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const EditProf = (props) => {

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isEmailPublic, setIsEmailPublic] = useState(true);
  const [isContactPublic, setIsContactPublic] = useState(true);
  const [isFollowersPublic, setIsFollowersPublic] = useState(true);
  const [isFollowingPublic, setIsFollowingPublic] = useState(true);
  const [firstnameVal, setFirstNameVal] = useState('');
  const [lastnameVal, setlastNameVal] = useState('');
  const [contactVal, setContactVal] = useState('');
  const [aboutVal, setAboutVal] = useState('');


  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching username:', error);
    }
  };

  const saveProfileChanges = async () => {
    console.log('values '+isProfilePublic);
    try {
      const token = Cookies.get('token');

      const response = await fetch(BACKEND_URL + '/users/save/profile/' + user, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          'authorization': token,
        },
        body: {
          firstname : firstnameVal,
          lastname : lastnameVal,
          contact : contactVal,
          about : aboutVal,
          is_contact_public : isContactPublic,
          is_profile_public : isProfilePublic,
          is_email_public : isEmailPublic,
          is_followers_public : isFollowersPublic,
          is_following_public : isFollowingPublic,
        }
      });
      const data = await response.json();
      setUserDetails(data.user_details);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error Saving Changes: '+ error);
    }
  }

  useEffect(() => {
    checkScreenSize();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    setIsProfilePublic(userDetails.ispublic);
    setIsEmailPublic(userDetails.email ? true : false);
    setIsContactPublic(userDetails.contact ? true : false);
    setIsFollowersPublic(userDetails.followers_hidden ? false : true);
    setIsFollowingPublic(userDetails.following_hidden ? false : true);
    setAboutVal(userDetails.about? userDetails.about: '');
    setFirstNameVal(userDetails.firstname);
    setlastNameVal(userDetails.lastname);
    setContactVal(userDetails.contact);
  }, [userDetails]);


  return (
    <>
      <Container>
        <div style={{ padding: '1%', width: isMobile ? '100%' : '80%', marginLeft: isMobile ? '0' : '10%' }}>
          <MDBRow style={{ borderRadius: '15px', padding: isMobile ? '2%' : '1%', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 14px 0 rgba(0, 0, 0, 0.19)' }}>
            <div style={{ fontSize: '1.3rem', color: 'orange' }}>Personal Info:</div>
            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                <TextField id="outlined-basic" label="User Name" variant="outlined" disabled
                  value={Object.keys(userDetails).length !== 0 ? userDetails.username : ''}
                  style={{ width: '100%' }}
                />
              </div><br></br>
              <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                <TextField id="outlined-basic" label="Email" variant="outlined" disabled type="email"
                  value={Object.keys(userDetails).length !== 0 ? userDetails.email : ''}
                  style={{ width: '100%' }}
                />
              </div><br></br>
              <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                <TextField label="About"
                  id="outlined-multiline-flexible"
                  multiline
                  value={aboutVal}
                  style={{ width: '100%' }}
                  onChange={((e)=>{setAboutVal(e.target.value)})}
                />
              </div><br></br>
            </MDBCol>
            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div>
                <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="Contact" variant="outlined"
                    value={contactVal}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setContactVal(e.target.value)
                      }
                    }
                  />
                </div>
              </div><br></br>
              <div>
                <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="First Name" variant="outlined"
                    value={firstnameVal}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setFirstNameVal(e.target.value)
                      }
                    }
                  />
                </div>
              </div><br></br>

              <div>
                <div style={{ width: isMobile ? '100%' : '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="Last Name" variant="outlined"
                    value={lastnameVal}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setlastNameVal(e.target.value)
                      }
                    }
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>

          <hr style={{ color: 'white' }}></hr>

          <MDBRow style={{ borderRadius: '15px', padding: isMobile ? '2%' : '1%', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 14px 0 rgba(0, 0, 0, 0.19)' }}>
            <div style={{ fontSize: '1.3rem', color: 'orange' }}>Privacy Settings:</div>

            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div style={{ width: '100%', padding: '1%' }}>
                <FormControlLabel style={{ color: 'gray' }}
                  control={<Switch color="warning" checked={isProfilePublic} onChange={() => { setIsProfilePublic(!isProfilePublic) }} />}
                  label="Keep your profile public"
                />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
                <FormControlLabel style={{ color: 'gray' }}
                  control={<Switch color="warning" checked={isEmailPublic} onChange={() => { setIsEmailPublic(!isEmailPublic) }} />}
                  label="Make your email public"
                />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
                <FormControlLabel style={{ color: 'gray' }}
                  control={<Switch color="warning" checked={isContactPublic} onChange={() => { setIsContactPublic(!isContactPublic) }} />}
                  label="Make your contact public"
                />
              </div><br></br>
            </MDBCol>

            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div style={{ width: '100%', padding: '1%' }}>
                <FormControlLabel style={{ color: 'gray' }}
                  control={<Switch color="warning" checked={isFollowersPublic} onChange={() => { setIsFollowersPublic(!isFollowersPublic) }} />}
                  label="Allow others to view your followers"
                />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
                <FormControlLabel style={{ color: 'gray' }}
                  control={<Switch color="warning" checked={isFollowingPublic} onChange={() => { setIsFollowingPublic(!isFollowingPublic) }} />}
                  label="Allow others to view people you follow"
                />
              </div><br></br>
            </MDBCol>

          </MDBRow>
          <br></br>
          <Button variant="contained" color="warning"
            onClick={saveProfileChanges}
          >
            SAVE CHANGES
          </Button>
          <br></br>
        </div>

      </Container>
    </>
  )
};

export default EditProf;