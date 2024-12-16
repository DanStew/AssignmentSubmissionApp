package com.SpringBootAndReact.LearningSpringBootAndReact.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBootAndReact.LearningSpringBootAndReact.domain.User;
import com.SpringBootAndReact.LearningSpringBootAndReact.dto.AuthCredentialsRequest;
import com.SpringBootAndReact.LearningSpringBootAndReact.util.JwtUtil;

//I'm guessing this will have something to do with RestFul API later
@RestController
//Setting the base URL endpoint for all URLs in this class
@RequestMapping("/api/auth")
public class LoginController {
	
	//Getting the authenticationManager from SecurityConfig
	@Autowired
	private AuthenticationManager authenticationManager;
	
	//Getting the JwtUtil
	@Autowired
	private JwtUtil jwtUtil;
	
	//URL endpoint : "/api/auth/login"
	@PostMapping("login")
	//@RequestBody is specific for RestController, it specifies that request comes from the RequestBody
	//You need this in order for the system to recognise that and find the needed data
	public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest request){
		try {
			Authentication authenticate = authenticationManager
					.authenticate(
							new UsernamePasswordAuthenticationToken(
									request.getUsername(), request.getPassword()
							)
					);
			
			User user = (User) authenticate.getPrincipal();
			//Hiding the password from being gathered
			user.setPassword(null);
			
			return ResponseEntity.ok()
					.header(
							HttpHeaders.AUTHORIZATION,
							jwtUtil.generateToken(user)
							).body(user);
		} catch (BadCredentialsException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}
