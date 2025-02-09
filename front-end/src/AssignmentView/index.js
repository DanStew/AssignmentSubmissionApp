import React, { useEffect, useRef, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchSerivce";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

const AssignmentView = () => {
  //Getting the id of the assigment from the URL
  //There is a way to get it from the route, however this is how he did it
  const assignmentId = window.location.href.split("/assignments/")[1];

  //Getting the jwt from local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

  //Storing the assignment we collected
  const [assignment, setAssignment] = useState({
    branch: "",
    githubURL: "",
    number: null,
    status: null,
  });

  //Storing the different assignments, from enum
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  //Storing the different Assignment Statuses
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  //Using useRef to store the previous assignment value
  const prevAssignmentValue = useRef(assignment);

  //Updating the value of prevAssignmentValue, using a UseEffect
  useEffect(() => {
    //If the two statuses are not equal to eachother, we need to save the assignment
    if (
      prevAssignmentValue.current.status !== assignment.status &&
      prevAssignmentValue.current.status != null
    ) {
      save();
    }
    //Updating the value of the prevAssignment
    prevAssignmentValue.current = assignment;
  }, [assignment]);

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
    //Seeing if we need to change the status value
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
    }
    //If we don't need to change the status, run the save
    else {
      console.log(assignment);
      //Making the fetch request
      ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
        //Gathering the data from the response
        .then((assignmentData) => {
          //Saving the assignment again (although should be the same)
          setAssignment(assignmentData);
        });
    }
  }

  //Getting the assignment
  useEffect(() => {
    //Making a GET request asking the system for the assignment
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt, null)
      //Gathering the data from the response
      .then((assignmentResponse) => {
        //Storing the assignment
        setAssignment(assignmentResponse.assignment);
        //Storing the assignment enums
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        //Storing the statuses
        setAssignmentStatuses(assignmentResponse.statusEnums);
      });
  }, []);

  return (
    <>
      {assignment ? (
        <Container className="mt-5">
          {/* Aligning the items center in the row */}
          <Row className="d-flex align-items-center">
            <Col>
              {assignment.number ? (
                <h1>Assignment {assignment.number} </h1>
              ) : (
                <h1>No Assignment Selected</h1>
              )}
            </Col>
            <Col>
              <Badge pill bg="info" className="fs-5">
                {assignment.status}
              </Badge>
            </Col>
          </Row>
          {/* Creating the form to allow the user to update the assignments */}
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3" md="2">
              AssignmentNumber
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                onSelect={(e, evtKey) => {
                  updateAssignment("number", evtKey.target.text);
                }}
                title={
                  assignment.number
                    ? `Assignment : ${assignment.number}`
                    : "Select an Assignment"
                }
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item key={assignmentEnum.assignmentNum}>
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="gitHubUrl">
            <Form.Label column sm="3" md="2">
              Github URL :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="https://github.com/username/repoName"
                value={assignment.githubURL ? assignment.githubURL : ""}
                onChange={(e) => updateAssignment("githubURL", e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                placeholder="example_branch_name"
                value={assignment.branch ? assignment.branch : ""}
                onChange={(e) => updateAssignment("branch", e.target.value)}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button size="lg" type="button" onClick={() => save()}>
              Submit Assignment
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
            </Button>
          </div>
        </Container>
      ) : (
        <div>Assignment with this Id doesn't exist</div>
      )}
    </>
  );
};

export default AssignmentView;
