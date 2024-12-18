import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchSerivce";

const AssignmentView = () => {
  //Getting the id of the assigment from the URL
  //There is a way to get it from the route, however this is how he did it
  const assignmentId = window.location.href.split("/assignments/")[1];

  //Getting the jwt from local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

  //Storing the assignment we collected
  const [assignment, setAssignment] = useState(null);

  //Function to update our assignment object with the values input in the form
  //This keeps all our changes in an object, rather than individual variables
  function updateAssignment(prop, value) {
    //Creating an exact copy of the assignment that we have
    //This is needed to force a change and re-render on the webpage
    const newAssignment = { ...assignment };
    //Changing the given property to the new value
    newAssignment[prop] = value;
    //Setting the original assignment to the new assignment
    setAssignment(newAssignment);
  }

  //Function to save our new assignment to the database (updating it)
  function save() {
    //Making the fetch request
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
      //Gathering the data from the response
      .then((assignmentData) => {
        //Saving the assignment again (although should be the same)
        setAssignment(assignmentData);
      });
  }

  //Getting the assignment
  useEffect(() => {
    //Making a GET request asking the system for the assignment
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt, null)
      //Gathering the data from the response
      .then((assignmentData) => {
        //Storing the assignment
        setAssignment(assignmentData);
      });
  }, []);

  return (
    <>
      {assignment ? (
        <div>
          <h1>Assignment {assignmentId}</h1>
          <h2>Status: {assignment.status}</h2>
          {/* Creating the form to allow the user to update the assigmnets */}
          <h3>
            GitHub URL:{" "}
            <input
              type="url"
              id="gitHubUrl"
              value={assignment.githubURL ? assignment.githubURL : ""}
              onChange={(e) => updateAssignment("githubURL", e.target.value)}
            />
          </h3>
          <h3>
            Branch :{" "}
            <input
              type="text"
              id="branch"
              value={assignment.branch ? assignment.branch : ""}
              onChange={(e) => updateAssignment("branch", e.target.value)}
            />
          </h3>
          <button type="button" onClick={() => save()}>
            Submit Assignment
          </button>
        </div>
      ) : (
        <div>Assignment with this Id doesn't exist</div>
      )}
    </>
  );
};

export default AssignmentView;
