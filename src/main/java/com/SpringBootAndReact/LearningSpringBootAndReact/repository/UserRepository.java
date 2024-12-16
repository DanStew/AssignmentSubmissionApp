package com.SpringBootAndReact.LearningSpringBootAndReact.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;

//UserRepository extends JpaRepository, to implement most of the CRUD operations
//JpaRepository requires two generic values : 1. Type of object we are working with, 2. Data type of the objects ID
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
