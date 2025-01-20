package com.SpringBootAndReact.LearningSpringBootAndReact.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AssignmentEnum;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	//Storing the assignment
	private Assignment assignment;
	//Storing all of the AssignmentEnum values
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	//Storing the status of the Assignment
	private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
	
	//Constructor to set the assignment
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
	}
	
	public AssignmentStatusEnum[] getStatusEnums() {
		return statusEnums;
	}

	//Getters and Setters
	//We don't need to get or set assignmentEnum, hence why no functions
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}

	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}
}
