import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link, Navigate } from "react-router-dom";
import ajax from "../Services/fetchSerivce";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const CodeReviewerDashboard = () => {
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
    <Container>
      <Row>
        <Col>
          {/* Creating a logout button on the website */}
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              //Removing the JWT and moving the user to the login page
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1"> Code Reviewer Dashboard</div>
        </Col>
      </Row>
      {/* <div className="assignment-wrapper in-review"></div> */}
      <div className="assignment-wrapper submitted">
        <div
          className="h3 px-2"
          style={{
            width: "min-content",
            whiteSpace: "nowrap",
            marginTop: "-2em",
            marginBottom: "1em",
            backgroundColor: "white",
          }}
        >
          Awaiting Review
        </div>
        {assignments ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {/* Above is a grid div that makes as many 18rem wide columns as it needs */}
            {assignments.map((assignment) => (
              <Card
                key={assignment.number}
                style={{ width: "18rem", height: "18rem" }}
              >
                {/* Making a card to display each assignment and it's information */}
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>
                    Assignment Number : #{assignment.number}
                  </Card.Title>
                  <div className="d-flex justify-content-start">
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                      {assignment.status}
                    </Badge>
                  </div>
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
      {/*<div className="assignment-wrapper needs-update"></div> */}
    </Container>
  );
};

export default CodeReviewerDashboard;
