import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchSerivce";

const Dashboard = () => {
  //Storing the JWT from the HTTP Response
  const [jwt, setJwt] = useLocalState("", "jwt");

  //Storing the assignments
  const [assignments, setAssignments] = useState(null);

  //UseEffect to get the assignments from the system
  useEffect(() => {
    //Making the fetch call
    ajax("api/assignments", "GET", jwt, null)
      //Storing the assignments received
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      });
  }, []);

  //Function to create a default Assigment
  function createAssigment() {
    //Making the fetch call
    ajax("api/assignments", "POST", jwt, null)
      //Gathering the data from the response
      .then((assignment) => {
        //Going to the webpage of the assignment that we just made
        //This website is unique to the assignmentId
        window.location.href = `/assignments/${assignment.id}`;
      });
  }

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <Link to={`/assignments/${assignment.id}`}>
              Assignment ID : {assignment.id}
            </Link>
          </div>
        ))
      ) : (
        <></>
      )}
      <button onClick={() => createAssigment()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
