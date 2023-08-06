import { useDispatch } from "react-redux";
import { login } from "../store/usernameSlice";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import ErrorMsgBox from "./ErrorMsgBox";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import "../css/signupPage.css";

const SignupPage = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const contactInputRef = useRef(null);
  const lastnameInputRef = useRef(null);
  const firstnameInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const fetchUsernameFromAPI = async () => {
    try {
      // Make the API call to get the username
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
      const lastname = lastnameInputRef.current.value;
      const firstname = firstnameInputRef.current.value;
      const contact = contactInputRef.current.value;
      const confirmPassword = confirmPasswordInputRef.current.value;
      const username = usernameInputRef.current.value;

      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !contact ||
        !confirmPassword ||
        !username
      ) {
        setErrorMsg("Some of required fields are not provided");
        return;
      }

      if (confirmPassword != password) {
        setErrorMsg("Password and confirm password not matched");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you are sending JSON data
        },
        body: JSON.stringify({
          email: email,
          password: password,
          contact: contact,
          firstname: firstname,
          lastname: lastname,
          username: username,
        }), // Convert the data to JSON format
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg("Error Creating a user:" + data.error);
        return;
      }

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set("token", data.token, { expires: 7 }); // Set the token to expire in 7 days
      window.location.href = "/";
    } catch (error) {
      setErrorMsg("Error fetching username:" + error);
      console.error("Error fetching username:", error);
    }
  };

  const handleSignup = () => {
    fetchUsernameFromAPI();
  };

  return (
    <>
      <h1>Rasoi</h1>
      <Container style={{ width: "60%" }}>
        <div
          className="signupPage"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div
            className="inputSection"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "50%",
              padding: "2%",
            }}
          >
            <FloatingLabel controlId="floatingUserName" label="Username">
              <Form.Control
                ref={usernameInputRef}
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingFirstName" label="First Name">
              <Form.Control
                ref={firstnameInputRef}
                type="text"
                name="firstname"
                placeholder="firstname"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingLastName" label="Last Name">
              <Form.Control
                ref={lastnameInputRef}
                type="text"
                name="lastname"
                placeholder="lastname"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingContact" label="Contact Number">
              <Form.Control
                ref={contactInputRef}
                type="number"
                name="contact"
                placeholder="contact"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                ref={emailInputRef}
                placeholder="example@domain.com"
                name="userEmail"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                ref={passwordInputRef}
                type="password"
                name="userPass"
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingConfirmPassword"
              label="Confirm Password"
            >
              <Form.Control
                ref={confirmPasswordInputRef}
                type="password"
                name="confirmPass"
                required
              />
            </FloatingLabel>

            {errorMsg ? <ErrorMsgBox errorMsg={errorMsg} /> : <></>}
            <Button
              onClick={handleSignup}
              variant="warning"
              style={{ width: "10vw" }}
            >
              Sign Up
            </Button>
          </div>

          <div
            className="loginImg"
            style={{
              width: "50%",
              height: "100%",
              padding: "2%",
            }}
          >
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHjYnt1gGhdMBz3SRFQv-HI_t6bX-9kN4_bo_mfXsGKDWFSqeM"
              alt="alternatetext"
              style={{ width: "100%", height: "100%", borderRadius: "25px" }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignupPage;
