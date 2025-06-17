import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Login = () => {
  //Getting setJwt from User Context
  const { setJwt } = useUser();

  //Storing the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  //Function to send the login request to the server
  function sendLoginRequest() {
    //Defining the object that we are passing to the user
    const reqBody = {
      //Taking the information from the inputs and putting it into this object
      username: username,
      password: password,
    };

    //Fetches data from a source and returns a Promise, that can then be processed
    //Fetch is Asynchronous, meaning fetch can just run in the background and the app doesn't need to wait for Fetch to complete
    //Takes in two parameters, URL and Request
    fetch("api/auth/login", {
      //These are the HTTP headers that you are sending to the URL
      headers: {
        //This is saying that you want a JSON response
        "Content-Type": "application/json",
      },
      //This is defining that you are making a POST request
      //NOTE : In the AuthController, login only has a PostMapping defined
      method: "post",
      //Defining the body of the HTTP Request, what the fetch is giving the server
      body: JSON.stringify(reqBody),
    })
      //Converting the response data and headers
      .then((response) => {
        //If the response is successful
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        }
        //If the response isn't successful
        //By rejecting it, it means the code won't be passed through the second .then
        else {
          return Promise.reject("Invalid login attempt");
        }
      })
      //Using the body and headers from the response
      .then(([body, headers]) => {
        //Getting and storing the JWT
        setJwt(headers.get("authorization"));
        //Move the user to the dashboard
        window.location.href = "dashboard";
      })
      //Code run if the promise is rejected
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col md="6">
            <FormGroup className="mb-3">
              <FormLabel className="fs-4" htmlFor="username">
                Username
              </FormLabel>
              <FormControl
                type="email"
                id="username"
                size="lg"
                placeholder="example@email.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6">
            <FormGroup className="mb-3">
              <FormLabel className="fs-4" htmlFor="password">
                Password
              </FormLabel>
              <FormControl
                type="password"
                id="password"
                size="lg"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-between"
          >
            <Button
              variant="success"
              size="lg"
              id="submit"
              type="button"
              onClick={() => sendLoginRequest()}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              size="lg"
              id="exit"
              type="button"
              onClick={() => {
                navigator("/");
              }}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
