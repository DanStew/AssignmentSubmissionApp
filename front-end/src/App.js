import { useEffect, useState } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";

function App() {
  //Getting the JWT
  const [jwt, setJwt] = useLocalState("", "jwt");
  //Storing the user's role
  const [roles, setRoles] = useState(getRolesFromJwt());

  //Function to get the user's role from JWT Claims
  function getRolesFromJwt() {
    //Decoding the JWT
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              {/* If the role is Code Reviewer, display CodeReviewerDashboard */}
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              {/* If the role isn't code reviewer, display studentDashboard */}
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
