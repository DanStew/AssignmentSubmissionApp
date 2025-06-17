import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ajax from "../Services/fetchSerivce";
import { useUser } from "../UserProvider";

const PrivateRoute = ({ children }) => {
  //Getting the jwt from the Context
  const { jwt, setJwt } = useUser();

  //State to define whether we are loading (waiting for the fetch) or not
  const [isLoading, setIsLoading] = useState(true);

  //State to store whether JWT valid or not
  const [isValid, setIsValid] = useState(null);

  //Checking if there is a current JWT
  if (jwt) {
    //Calling the validate endpoint to check if the JWT is valid or not
    ajax(`/api/auth/validate?token=${jwt}`, "GET", jwt).then((isValid) => {
      //Storing isValid and setting loading to false
      setIsValid(isValid);
      setIsLoading(false);
    });
  }
  //If no JWT, go to login
  else {
    return <Navigate to="/login" />;
  }

  //If we are loading, wait. If we have finished loading, then go to the correct location
  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
