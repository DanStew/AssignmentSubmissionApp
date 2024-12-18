package com.SpringBootAndReact.LearningSpringBootAndReact.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.Assignment;
import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	
	//Function to get all the assignments belonging to a certain user
	Set<Assignment> findByUser(User user);
}
