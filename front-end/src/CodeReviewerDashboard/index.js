import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajax from "../Services/fetchSerivce";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const CodeReviewerDashboard = () => {
  //Storing the JWT from the HTTP Response
  const { jwt, setJwt } = useUser();

  //Storing the assignments
  const [assignments, setAssignments] = useState(null);

  const navigator = useNavigate();

  //UseEffect to get the assignments from the system
  useEffect(() => {
    //Making the fetch call
    ajax("api/assignments", "GET", jwt, null)
      //Storing the assignments received
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      });
  }, []);

  //Function to claim an assignment
  function claimAssignment(assignment) {
    const decodedJwt = jwtDecode(jwt);
    const user = {
      id: null,
      username: decodedJwt.sub,
      authorities: decodedJwt.authorities,
    };
    assignment.codeReviewer = user;
    // TODO : Don't hardcode this status
    assignment.status = "In Review";
    ajax(`api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        //Finding the id of the assignment and updating it
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  assignments
    ? assignments.map((assignment) => console.log(assignment.status))
    : console.log("Nothing");

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
              navigator("/login");
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
      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {/* Above is a grid div that makes as many 18rem wide columns as it needs */}
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
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
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>Github URL :</b> {assignment.githubURL}
                      </p>
                      <p>
                        <b>Branch :</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    {/* Button to allow the user to edit their claimed assignment */}
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
          <div>No Assignments Found</div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="h3 px-2 assignment-wrapper-title">Awaiting Review</div>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {/* Above is a grid div that makes as many 18rem wide columns as it needs */}
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => {
                if (a.status === "Resubmitted") return -1;
                else return 1;
              })
              .map((assignment) => (
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
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>Github URL :</b> {assignment.githubURL}
                      </p>
                      <p>
                        <b>Branch :</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    {/* Button to allow the user to claim the assignment */}
                    <Button
                      variant="secondary"
                      onClick={() => claimAssignment(assignment)}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>
      <div class="assignment-wrapper needs-update">
        <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {/* Above is a grid div that makes as many 18rem wide columns as it needs */}
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
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
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>Github URL :</b> {assignment.githubURL}
                      </p>
                      <p>
                        <b>Branch :</b> {assignment.branch}
                      </p>
                    </Card.Text>
                    {/* Button to allow the user to view the Assignment that Needs Update */}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        (window.location.href = `/assignments/${assignment.id}`)
                      }
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
