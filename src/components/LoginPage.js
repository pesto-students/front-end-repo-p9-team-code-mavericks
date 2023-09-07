import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/usernameSlice";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import HomePage from "./HomePage";
import ErrorMsgBox from "./ErrorMsgBox";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { BACKEND_URL } from "../global";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const username = useSelector((state) => state.username.username);
  const cookieUserName = Cookies.get("username");

  const fetchUsernameFromAPI = async () => {
    try {
      // Make the API call to get the username
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch(BACKEND_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you are sending JSON data
        },
        body: JSON.stringify({ email, password }), // Convert the data to JSON format
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        setErrorMsg("Enter the right email and password");
        return;
      }
      console.log(data);

      // Set the username in the Redux store
      dispatch(login(data.username));

      // Set the cookie in browser.
      Cookies.set("token", data.token, { expires: 7 }); // Set the token to expire in 7 days
      Cookies.set("username", data.username, { expires: 7 });
      Cookies.set("first_time_login", data.first_time_login, { expires: 7 });
    } catch (error) {
      setErrorMsg("Error fetching username:" + error);
      console.error("Error fetching username:", error);
    }
  };

  const handleLogin = () => {
    fetchUsernameFromAPI();
  };

  return (
    <>
      {cookieUserName ? (
        <HomePage />
      ) : (
        <>
          <div
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-vector/food-vector-seamless-pattern-cuisine-fast-food-cafe-wallpaper-with-gastronomy-icons-yellow-gold-color-texture-decorative-textile-wrapping-paper-design-bright-background-menu-receipts_106317-9575.jpg?w=2000')",
            }}
          >
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400&family=Rum+Raisin&display=swap"
              rel="stylesheet"
            ></link>
            <h1 style={{ fontFamily: "Rum Raisin, sans-serif" }}>Rasoi</h1>
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

                  {errorMsg ? <ErrorMsgBox errorMsg={errorMsg} /> : <></>}
                  <Button
                    onClick={handleLogin}
                    variant="secondary"
                    style={{ width: "10vw" }}
                  >
                    Log In
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
                    src="https://thumbs.dreamstime.com/z/indian-food-curry-banquet-17901041.jpg?w=576"
                    alt="alternatetext"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "25px",
                    }}
                  />
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;

