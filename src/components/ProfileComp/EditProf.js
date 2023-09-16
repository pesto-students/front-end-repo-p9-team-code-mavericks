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

const EditProf = (props) => {

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();
  const [isFollowingVisible, setIsFollowingVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isFollowersVisible, setIsFollowersVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

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

  useEffect(() => {
    checkScreenSize();
    fetchUserDetails();
  }, []);

  return (
    <>
      {
        console.log(JSON.stringify(userDetails))
      }
      <Container>
        <div style={{ padding: '1%', width: isMobile? '100%': '80%', marginLeft: isMobile? '0': '10%'}}>
          <MDBRow style={{ borderRadius: '15px', padding: isMobile?'2%':'1%', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 14px 0 rgba(0, 0, 0, 0.19)' }}>
          <div style={{ fontSize: '1.3rem', color: 'orange' }}>Personal Info:</div>
            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                <TextField id="outlined-basic" label="User Name" variant="outlined" disabled
                  value={Object.keys(userDetails).length !== 0 ? userDetails.username : ''}
                  style={{ width: '100%' }}
                />
              </div><br></br>
              <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                <TextField id="outlined-basic" label="Email" variant="outlined" disabled type="email"
                  value={Object.keys(userDetails).length !== 0 ? userDetails.email : ''}
                  style={{ width: '100%' }}
                />
              </div><br></br>
              <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                <TextField label="About"
                id="outlined-multiline-flexible"
                multiline
                  value={Object.keys(userDetails).length !== 0 ? userDetails.about? userDetails.about: '' : ''}
                  style={{ width: '100%' }}
                  onChange={
                    (e) => {
                      setUserDetails(prevUserDetails => ({
                        ...prevUserDetails,
                        about: e.target.value
                      })
                      )
                    }
                  }
                />
              </div><br></br>
            </MDBCol>
            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div>
                <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="Contact" variant="outlined"
                    value={Object.keys(userDetails).length !== 0 ? userDetails.contact : ''}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setUserDetails(prevUserDetails => ({
                          ...prevUserDetails,
                          contact: e.target.value
                        })
                        )
                      }
                    }
                  />
                </div>
              </div><br></br>
              <div>
                <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="First Name" variant="outlined"
                    value={Object.keys(userDetails).length !== 0 ? userDetails.firstname : ''}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setUserDetails(prevUserDetails => ({
                          ...prevUserDetails,
                          contact: e.target.value
                        })
                        )
                      }
                    }
                  />
                </div>
              </div><br></br>

              <div>
                <div style={{ width: isMobile?'100%': '90%', padding: '1%' }}>
                  <TextField id="outlined-basic" label="Last Name" variant="outlined"
                    value={Object.keys(userDetails).length !== 0 ? userDetails.lastname : ''}
                    style={{ width: '100%' }}
                    onChange={
                      (e) => {
                        setUserDetails(prevUserDetails => ({
                          ...prevUserDetails,
                          contact: e.target.value
                        })
                        )
                      }
                    }
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>

          <hr style={{color: 'white'}}></hr>

          <MDBRow style={{ borderRadius: '15px', padding: isMobile?'2%':'1%', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 14px 0 rgba(0, 0, 0, 0.19)' }}>
          <div style={{ fontSize: '1.3rem', color: 'orange' }}>Privacy Settings:</div>
            
            <MDBCol lg="6" style={{ padding: '1%' }}>
              <div style={{ width: '100%', padding: '1%' }}>
              <FormControlLabel style={{color:'gray'}} control={<Switch defaultChecked color="warning"/>} label="Make your profile public" />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
              <FormControlLabel style={{color:'gray'}} control={<Switch defaultChecked color="warning"/>} label="Make your email public" />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
              <FormControlLabel style={{color:'gray'}} control={<Switch defaultChecked color="warning"/>} label="Make your contact public" />
              </div><br></br>
            </MDBCol>

            <MDBCol lg="6" style={{ padding: '1%' }}>
            <div style={{ width: '100%', padding: '1%' }}>
              <FormControlLabel style={{color:'gray'}} control={<Switch defaultChecked color="warning"/>} label="Allow others to view your followers" />
              </div><br></br>
              <div style={{ width: '100%', padding: '1%' }}>
              <FormControlLabel style={{color:'gray'}} control={<Switch defaultChecked color="warning"/>} label="Allow others to view people you follow" />
              </div><br></br>
            </MDBCol>
            
          </MDBRow>
        </div>
      </Container>
    </>
  )
};

export default EditProf;