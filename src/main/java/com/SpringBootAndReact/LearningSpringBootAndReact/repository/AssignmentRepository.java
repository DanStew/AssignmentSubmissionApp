package com.SpringBootAndReact.LearningSpringBootAndReact.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.enums.AssignmentStatusEnum;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	
	//Function to get all the assignments belonging to a certain user
	Set<Assignment> findByUser(User user);

	//Finding all assignments that have a submitted status
	@Query("SELECT a FROM Assignment a WHERE a.status = 'submitted'")
	Set<Assignment> findByCodeReviewer(User user);
}
