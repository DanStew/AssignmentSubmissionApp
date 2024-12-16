package com.SpringBootAndReact.LearningSpringBootAndReact.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.repository.UserRepository;
import com.SpringBootAndReact.LearningSpringBootAndReact.util.CustomPasswordEncoder;

//Telling spring this class is a service, so that it manages it
@Service
//Implementing UserDetailsService, as this is needed for configure functions in SecurityConfig
public class UserDetailsServiceImpl implements UserDetailsService{
	
	//Getting the UserRepository
	@Autowired
	private UserRepository userRepo;
	
	//Overriding required method
	@Override
	//This function communicate with the database and return the user with a given username
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//Finding the user by its username
		Optional<User> userOpt = userRepo.findByUsername(username);
		//Returning the user, if there is one, or throw an exception
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials"));
	}
}
