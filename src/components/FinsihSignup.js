import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../global";
import UploadSingleImgComponent from "./UploadSingleImgComponent";

const FinishSignup = () => {

  const [isMobile, setIsMobile] = useState(false);
  const { username } = useParams();

  const [isGreenVegiesActive, setIsGreenVegiesActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);
  const [isSouthIndianActive, setIsSouthIndianActive] = useState(false);
  const [isStreetFoodActive, setIsStreetFoodActive] = useState(false);
  const [isFranchiseActive, setIsFranchiseActive] = useState(false);
  const [isSweetDishesActive, setIsSweetDishesActive] = useState(false);
  const [isSaladsActive, setIsSaladsActive] = useState(false);

  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const firstname = useRef('');
  const lastname = useRef('');
  const email = useRef('');
  const contact = useRef('');

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const handleGreenVegiesClick = () => {
    setIsGreenVegiesActive(!isGreenVegiesActive);
  };

  const handleNonVegClick = () => {
    setIsNonVegActive(!isNonVegActive);
  };

  const handleSouthIndianClick = () => {
    setIsSouthIndianActive(!isSouthIndianActive);
  };

  const handleStreetFoodClick = () => {
    setIsStreetFoodActive(!isStreetFoodActive);
  };

  const handleFranchiseClick = () => {
    setIsFranchiseActive(!isFranchiseActive);
  };

  const handleSweetDishesClick = () => {
    setIsSweetDishesActive(!isSweetDishesActive);
  };

  const handleSaladsClick = () => {
    setIsSaladsActive(!isSaladsActive);
  };

  // const verifyUsername = async() => {
  //   try {
  //     const response = await fetch(BACKEND_URL + '/posts/img/upload', {
  //       method: 'POST',
  //       headers: {
  //         'authorization': token,
  //       },
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       return data;
  //     }
  //     setFiles([]);
  //     setSelectedFiles([]);
  //     // return data.filePaths;
  //     return data;
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //   }
  // };


// const handleLetsGoClick = async () => {
//   if (!verifyUsername) {
//     console.log('Username already exists');
//   }


//   const token = Cookies.get('token');
//   const handleUploadImgResp = await handleUpload(token);
//   console.log('data' + JSON.stringify(handleUploadImgResp));
//   if (handleUploadImgResp.error) {
//     console.log(handleUploadImgResp.error);
//     return;
//   }
//   console.log('Ret files:', handleUploadImgResp);
//   let recipePictures = [];

//   handleUploadImgResp.map((item) => {
//     recipePictures = [...recipePictures, item];
//   });
//   console.log('pic array ', recipePictures);

//   const response = await fetch(BACKEND_URL + '/posts/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': token,
//     },

//     body: JSON.stringify(
//       {
//         firstname: firstname.current.value,
//         interests: [],
//         lastname: lastname.current.value,
//         email: email.current.value,
//         recipe_picture: handleUploadImgResp.map(item => item.location),
//         contact: contact.current.value,
//       }),
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     console.log(data.error);
//     return;
//   }
//   console.log(data);
//   window.location.href = '/';

// }

// const handleUpload = async (token) => {
//   const formData = new FormData();
//   for (let i = 0; i < files.length; i++) {
//     formData.append('files', files[i]);
//   }

//   try {
//     const response = await fetch(BACKEND_URL + '/posts/img/upload', {
//       method: 'POST',
//       headers: {
//         'authorization': token,
//       },
//       body: formData,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return data;
//     }
//     setFiles([]);
//     setSelectedFiles([]);
//     // return data.filePaths;
//     return data;
//   } catch (error) {
//     console.error('Error uploading files:', error);
//   }
// };

useEffect(() => {
  checkScreenSize();
})

// Cookies.set('first_time_login', false, {expires: 7});
return (
  <>
    <Container style={{ textAlign: 'center', padding: '2% 1% 2% 1%', boxShadow: '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' }}>
      <p style={{ fontSize: '2.5rem', fontFamily: "'Josefin Sans', sans-serif" }}>
        Welcome {username.charAt(0).toUpperCase() + username.slice(1) + '!'}<br></br>
        <span style={{ color: 'orange', fontSize: '1.5rem', fontFamily: "'Delicious Handrawn', cursive" }}>Let's Know more about you ^_^</span>
      </p>
      <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
        <div style={{ color: 'gray' }}>What's your first name and last name?</div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
          <span style={{ padding: '1%' }}><input type="text" placeholder="First Name" ref={firstname} />&nbsp;&nbsp;</span>
          <span style={{ padding: '1%' }}><input type="text" placeholder="Last Name" ref={lastname} /></span>
        </div>
      </div>

      <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
        <div style={{ color: 'gray' }}>What's your email id?</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ padding: '1%', width: '100%' }}><input type="email" placeholder="Email" ref={email} />&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
      <hr style={{ color: 'white' }}></hr>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif", textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'gray' }}>Let's get your favorite food types!</div>

        <div style={{ alignContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: isMobile ? '100%' : '40%', padding: '1%' }}>
          <div
            onClick={handleGreenVegiesClick}
            style={
              {
                boxShadow: isGreenVegiesActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isGreenVegiesActive ? 'white' : 'orange',
                backgroundColor: isGreenVegiesActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isGreenVegiesActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Veg
          </div>&nbsp;&nbsp;

          <div
            onClick={handleNonVegClick}
            style={
              {
                boxShadow: isNonVegActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isNonVegActive ? 'white' : 'orange',
                backgroundColor: isNonVegActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isNonVegActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Non Veg
          </div>&nbsp;&nbsp;

          <div
            onClick={handleSouthIndianClick}
            style={
              {
                boxShadow: isSouthIndianActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isSouthIndianActive ? 'white' : 'orange',
                backgroundColor: isSouthIndianActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isSouthIndianActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            South Indian
          </div>&nbsp;&nbsp;

          <div
            onClick={handleStreetFoodClick}
            style={
              {
                boxShadow: isStreetFoodActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isStreetFoodActive ? 'white' : 'orange',
                backgroundColor: isStreetFoodActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isStreetFoodActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Steet Food
          </div>&nbsp;&nbsp;

          <div
            onClick={handleFranchiseClick}
            style={
              {
                boxShadow: isFranchiseActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isFranchiseActive ? 'white' : 'orange',
                backgroundColor: isFranchiseActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isFranchiseActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Franchise Food
          </div>&nbsp;&nbsp;

          <div
            onClick={handleSweetDishesClick}
            style={
              {
                boxShadow: isSweetDishesActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isSweetDishesActive ? 'white' : 'orange',
                backgroundColor: isSweetDishesActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isSweetDishesActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Sweet Dishes
          </div>&nbsp;&nbsp;

          <div
            onClick={handleSaladsClick}
            style={
              {
                boxShadow: isSaladsActive ? '0 4px 8px 0 rgba(255, 165, 0, 0.2), 0 6px 20px 0 rgba(255, 165, 0, 0.19)' : 'none',
                borderRadius: '15px',
                color: isSaladsActive ? 'white' : 'orange',
                backgroundColor: isSaladsActive ? 'orange' : 'white',
                padding: isMobile ? '2%' : '1% 2%',
                border: isSaladsActive ? 'none' : '1px solid orange',
                transition: '0.5s',
              }
            }
          >
            Salads
          </div>&nbsp;&nbsp;
        </div>
      </div>
      <hr style={{ color: 'white' }}></hr>
      <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
        <div style={{ color: 'gray' }}>How can we contact you?</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ padding: '1%', width: '100%' }}><input type="email" placeholder="Contact Number" ref={contact} />&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>

      <hr style={{ color: 'white' }}></hr>
      <div style={{ fontSize: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
        <div style={{ color: 'gray' }}>Say Cheese! Let's upload your profile pic.</div>
        <div>
          <UploadSingleImgComponent files={files} selectedFiles={selectedFiles} setFiles={setFiles} setSelectedFiles={setSelectedFiles} />
        </div>
      </div>

      <div>
        <Button
          style={{ backgroundColor: 'orange', color: 'white' }}
          // onClick={handleLetsGoClick}
        >
          Lets Go
        </Button>
      </div>

    </Container>
  </>
)
}

export default FinishSignup;