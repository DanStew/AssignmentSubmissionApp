package com.SpringBootAndReact.LearningSpringBootAndReact.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AssignmentStatusEnum;
import com.SpringBootAndReact.LearningSpringBootAndReact.repository.AssignmentRepository;

@Service
@Transactional
public class AssignmentService {
	
	//Getting the assignment repository
	@Autowired
	public AssignmentRepository assignmentRepo;
	
	//Saving a default empty assignment
	public Assignment save(User user) {
		Assignment assignment  = new Assignment();
		assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assignment.setUser(user);
		//Returning the newly made assignment object, back to the controller
		return assignmentRepo.save(assignment);
	}
	
	//Service to return all the user's assignments
	public Set<Assignment> findByUser(User user){
		return assignmentRepo.findByUser(user);
	}

	//Finding an assignment by an Id
	public Optional<Assignment> findById(Long assignmentId) {
		//Using assignmentRepo default function for this
		return assignmentRepo.findById(assignmentId);
	}

	//Function to save an updated assignment to the database
	public Assignment save(Assignment assignment) {
		return assignmentRepo.save(assignment);
	}
}
