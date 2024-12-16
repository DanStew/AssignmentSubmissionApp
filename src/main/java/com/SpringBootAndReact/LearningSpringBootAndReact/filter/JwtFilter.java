package com.SpringBootAndReact.LearningSpringBootAndReact.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.SpringBootAndReact.LearningSpringBootAndReact.repository.UserRepository;
import com.SpringBootAndReact.LearningSpringBootAndReact.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
//OncePerRequestFilter means that this filter will be checked once every time, before being validated
public class JwtFilter extends OncePerRequestFilter{
	
	//Getting access to the UserRepo
	@Autowired
	private UserRepository userRepo;
	
	//Getting the JwtUtil
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	//This is where the functionality for the filter will be
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		
		//A JWT token will look like what can be seen below (Key -> Content)
		//Authorization -> Bearer Token
		
		//Get authorization header and validate
		//This is testing whether the token is a JSON web token or not
		//If it is not, move on
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		//All our JWTs will start with Bearer 
		if (!StringUtils.hasText(header) || (StringUtils.hasText(header) && header.startsWith("Bearer "))) {
			chain.doFilter(request,response);
			return;
		}
		
		//Getting the token from the header
		final String token = header.split(" ")[1].trim();
		
		//Getting the user identity
		//If it finds the user in the repo, it will set it to userDetails. Otherwise, userDetails is null
		UserDetails userDetails = userRepo
				.findByUsername(jwtUtil.getUsernameFromToken(token))
				.orElse(null);
		
		//Get jwt token and validate
		//Checks whether the token is valid for the current user, or not
		//Also checks whether the token is expired or not
		if (!jwtUtil.validateToken(token,userDetails)) {
			chain.doFilter(request,response);
			return;
		}
		
		//Code below is only run if the token is valid
		UsernamePasswordAuthenticationToken
			//This token has principal (userDetails), credentials (currently null) and authorities (from userDetails)
			authentication = new UsernamePasswordAuthenticationToken(
					userDetails,null,
					userDetails == null ? 
							List.of() : userDetails.getAuthorities()
			);
		
		//Adding the request details to the authenticated user
		authentication.setDetails(
				new WebAuthenticationDetailsSource().buildDetails(request)
		);
		
		//This is telling Spring Security that this is a valid user, and in the authenticated context
		//Basically saying someone is valid and logged in
		SecurityContextHolder.getContext().setAuthentication(authentication);
		//Moving to the next filter in the Security Chain
		chain.doFilter(request, response);
	}
}
