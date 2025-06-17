import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* Providing the user to the App Component, so User can be accessed everywhere */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
