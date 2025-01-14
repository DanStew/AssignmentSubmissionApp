package com.SpringBootAndReact.LearningSpringBootAndReact.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

//Solving the issue where Enums are not being converted correctly from backend to frontend
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
	//Defining the different constants that AssignmentEnum can be
	//These constants will call the constructor, that can then be used to get additional information about that Enum
	ASSIGNMENT_1(1,"HTML Assignment"),
	ASSIGNMENT_2(2,"Guessing Game"),
	ASSIGNMENT_3(3,"User Login"),
	ASSIGNMENT_4(4,"Student Course List"),
	ASSIGNMENT_5(5,"Custom Array List"),
	ASSIGNMENT_6(6,"Reports with Streams"),
	ASSIGNMENT_7(7,"Unit Testing"),
	ASSIGNMENT_8(8,"Multi-threading"),
	ASSIGNMENT_9(9,"Spring MVC"),
	ASSIGNMENT_10(10,"RESTful Service"),
	ASSIGNMENT_11(11,"Full-Stack with Thymeleaf"),
	ASSIGNMENT_12(12,"Reports with SQL"),
	ASSIGNMENT_13(13,"Online Bank"),
	ASSIGNMENT_14(14,"Chatting with JS");
	
	//Storing the assignment info
	private int assignmentNum;
	private String assignmentName;
	
	
	//Making an Enum
	AssignmentEnum (int assignmentNum,String assignmentName) {
		this.assignmentNum = assignmentNum;
		this.assignmentName = assignmentName;
	}

	public int getAssignmentNum() {
		return assignmentNum;
	}

	public String getAssignmentName() {
		return assignmentName;
	}
}
