import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  //Storing the JWT from the HTTP Response
  const [jwt, setJwt] = useLocalState("", "jwt");

  //Making the UseEffect to get the JWT
  useEffect(() => {
    if (!jwt) {
      //Defining the object that we are passing to the user
      const reqBody = {
        username: "daniel",
        password: "Password123",
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
        //NOTE : In the LoginController, login only has a PostMapping defined
        method: "post",
        //Defining the body of the HTTP Request, what the fetch is giving the server
        body: JSON.stringify(reqBody),
      })
        //Converting the response data and headers
        .then((response) => Promise.all([response.json(), response.headers]))
        //Using the body and headers from the response
        .then(([body, headers]) => {
          //Getting and storing the JWT
          setJwt(headers.get("authorization"));
        });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
