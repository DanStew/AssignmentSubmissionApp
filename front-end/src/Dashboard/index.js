import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link, Navigate } from "react-router-dom";
import ajax from "../Services/fetchSerivce";
import { Button, Card, Col, Row } from "react-bootstrap";

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
      <div className="mb-5">
        <Button size="lg" onClick={() => createAssigment()}>
          Submit New Assignment
        </Button>
      </div>
      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
        >
          {/* Above is a grid div that makes as many 18rem wide columns as it needs */}
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              style={{ width: "18rem", height: "18rem" }}
            >
              {/* Making a card to display each assignment and it's information */}
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment Number : #{assignment.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle>
                <Card.Text style={{ marginTop: "1em" }}>
                  <p>
                    <b>Github URL :</b> {assignment.githubURL}
                  </p>
                  <p>
                    <b>Branch :</b> {assignment.branch}
                  </p>
                </Card.Text>
                {/* Button to allow the user to edit the assignment */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
