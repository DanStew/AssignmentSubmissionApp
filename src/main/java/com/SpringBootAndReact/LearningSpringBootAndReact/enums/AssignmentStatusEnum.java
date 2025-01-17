package com.SpringBootAndReact.LearningSpringBootAndReact.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
	//The left hand side is how you assign the enum, right hand side is more user-friendly viewing
	PENDING_SUBMISSION("Pending Submission",1),
	SUBMITTED("Submitted",2),
	IN_REVIEW("In Review",3),
	NEEDS_UPDATE("Needs Update",4),
	COMPLETED("Completed",5);
	
	//Storing the value of the status
	private String status;
	private Integer step;
	
	//Making the constructor
	AssignmentStatusEnum(String status, Integer step) {
		this.status = status;
		this.step= step;	
	}
	
	public String getStatus() {
		return this.status;
	}
}
