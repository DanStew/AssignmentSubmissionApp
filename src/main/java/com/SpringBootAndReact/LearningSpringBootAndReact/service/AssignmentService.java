package com.SpringBootAndReact.LearningSpringBootAndReact.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AssignmentStatusEnum;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AuthorityEnum;
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
		assignment.setNumber(findNextAssignmentToSubmit(user));
		//Returning the newly made assignment object, back to the controller
		return assignmentRepo.save(assignment);
	}
	
	//Function to find the next number of assignment to submit
	public Integer findNextAssignmentToSubmit(User user) {
		Set<Assignment> assigmentsByUser = assignmentRepo.findByUser(user);
		//If the user has no assignments, return 1
		if (assigmentsByUser == null) {
			return 1;
		}
		//Sorting the Assignments set
		Optional<Integer> nextAssignmentNumOpt = assigmentsByUser.stream()
			.sorted((a1,a2) -> {
				//Ensuring no null values
				if (a1.getNumber() == null) return 1;
				if (a2.getNumber() == null) return 1;
				//Comparing the two values
				//This code will sort the list in DESCENDING order, as a2 is first and a1 second
				return a2.getNumber().compareTo(a1.getNumber());
				})
			//The above gives you a stream of assignments, with assignment numbers sorted in order
			//This will take that assignment and get the number from the assignment
			.map( assignment -> {
				if (assignment.getNumber() == null) return 1;
				return assignment.getNumber() + 1;
				}).findFirst();
		//Returning the next assignment number, or 1
		return nextAssignmentNumOpt.orElse(1);
	}
	
	//Service to return all the user's assignments
	public Set<Assignment> findByUser(User user){
		//Checking the user's role
		//This goes through all the authorities, checks if it has Code_Reviewer Role
		//It then counts the number of times, if it's more than 0, then we have a code reviewer
		boolean hasCodeReviewerRole = user.getAuthorities()
											.stream()
											.filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name()
																.equals(auth.getAuthority()))
											.count() > 0;
		//If the user is a Code Reviewer
		if(hasCodeReviewerRole) {
			return assignmentRepo.findByCodeReviewer(user);
		}
		//If the user is a student
		else {		
			return assignmentRepo.findByUser(user);
		}
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
