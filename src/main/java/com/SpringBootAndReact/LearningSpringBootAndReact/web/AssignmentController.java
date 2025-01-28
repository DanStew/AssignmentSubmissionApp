package com.SpringBootAndReact.LearningSpringBootAndReact.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.dto.AssignmentResponseDto;
import com.SpringBootAndReact.LearningSpringBootAndReact.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	
	@Autowired
	private AssignmentService assignmentService;
	
	//Mapping to make a default assignment
	@PostMapping("")
	public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
		Assignment newAssignment  = assignmentService.save(user);
		return ResponseEntity.ok(newAssignment);
	}
	
	//Mapping to get the assignments from the database
	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
		Set<Assignment> userAssignments = assignmentService.findByUser(user);
		return ResponseEntity.ok(userAssignments);
	}
	
	//Mapping to get the assignment of a specific ID
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignment(@PathVariable(name="assignmentId") Long assignmentId, @AuthenticationPrincipal User user){
		//Get the assignment with the given id
		//If the assignment with the given id doesn't exist, return null
		Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
		//Making the AssignmentResponseDto
		AssignmentResponseDto assignmentResponse = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
		//Returning the assignment that we received
		//If we don't have an assignment, a blank assignment will be returned (to deal with null values)
		return ResponseEntity.ok(assignmentResponse);
	}
	
	//Mapping to ask the server to Update the given assignment
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment(@PathVariable(name="assignmentId") Long assignmentId, 
			@RequestBody Assignment assignment,
			@AuthenticationPrincipal User user){
	    // Save the updated assignment
	    assignment = assignmentService.save(assignment);
	    
	    //Returning the saved assignment
	    return ResponseEntity.ok(assignment);
	}
}
